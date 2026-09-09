'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Clock3, Keyboard, ListChecks, RotateCcw, Trophy, X } from 'lucide-react';
import fishData from '@/data/fishes.json';
import { fishFacts } from '@/data/fish-facts';

type Mode = 'beginner' | 'expert';
type Phase = 'intro' | 'playing' | 'result';
type FishEntry = {
  id: string;
  nameHu: string;
  scientificName: string;
  image: string;
  alsoKnownAsHu?: string[];
};

const fishes = fishData.fishes as FishEntry[];
const ROUND_TIME = 30;

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLocaleLowerCase('hu-HU')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function editDistance(left: string, right: string) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = previous[0];
    previous[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const above = previous[rightIndex];
      const cost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      previous[rightIndex] = Math.min(previous[rightIndex] + 1, previous[rightIndex - 1] + 1, diagonal + cost);
      diagonal = above;
    }
  }
  return previous[right.length];
}

function acceptsAnswer(answer: string, fish: FishEntry) {
  const candidate = normalizeAnswer(answer);
  if (!candidate) return false;
  return [fish.nameHu, ...(fish.alsoKnownAsHu ?? [])].some((accepted) => {
    const normalized = normalizeAnswer(accepted);
    const tolerance = normalized.length >= 12 ? 2 : 1;
    return candidate === normalized || editDistance(candidate, normalized) <= tolerance;
  });
}

function buildOptions(fish: FishEntry) {
  const distractors = shuffle(fishes.filter((entry) => entry.id !== fish.id)).slice(0, 3);
  return shuffle([fish, ...distractors]).map((entry) => entry.nameHu);
}

export default function FishGame() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [mode, setMode] = useState<Mode>('beginner');
  const [rounds, setRounds] = useState<FishEntry[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [seconds, setSeconds] = useState(ROUND_TIME);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [selected, setSelected] = useState('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [best, setBest] = useState<Record<Mode, number>>({ beginner: 0, expert: 0 });
  const answerInput = useRef<HTMLInputElement>(null);
  const currentFish = rounds[roundIndex];
  const options = useMemo(() => currentFish ? buildOptions(currentFish) : [], [currentFish]);

  useEffect(() => {
    setBest({
      beginner: Number(localStorage.getItem('zalai-halak-best-beginner') ?? 0),
      expert: Number(localStorage.getItem('zalai-halak-best-expert') ?? 0),
    });
  }, []);

  useEffect(() => {
    if (phase !== 'playing' || answered) return;
    if (seconds === 0) {
      setTimedOut(true);
      setCorrect(false);
      setAnswered(true);
      return;
    }
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [answered, phase, seconds]);

  useEffect(() => {
    if (phase === 'playing' && mode === 'expert' && !answered) answerInput.current?.focus();
  }, [answered, mode, phase, roundIndex]);

  function startGame(nextMode: Mode) {
    const total = nextMode === 'beginner' ? 20 : fishes.length;
    setMode(nextMode);
    setRounds(shuffle(fishes).slice(0, total));
    setRoundIndex(0);
    setSeconds(ROUND_TIME);
    setScore(0);
    setAnswered(false);
    setCorrect(false);
    setTimedOut(false);
    setSelected('');
    setTypedAnswer('');
    setPhase('playing');
  }

  function submitAnswer(value: string) {
    if (!currentFish || answered) return;
    const isCorrect = mode === 'beginner' ? value === currentFish.nameHu : acceptsAnswer(value, currentFish);
    setSelected(value);
    setCorrect(isCorrect);
    setTimedOut(false);
    setAnswered(true);
    if (isCorrect) setScore((current) => current + 1);
  }

  function nextRound() {
    if (roundIndex === rounds.length - 1) {
      const key = `zalai-halak-best-${mode}`;
      const nextBest = Math.max(score, best[mode]);
      localStorage.setItem(key, String(nextBest));
      setBest((current) => ({ ...current, [mode]: nextBest }));
      setPhase('result');
      return;
    }
    setRoundIndex((current) => current + 1);
    setSeconds(ROUND_TIME);
    setAnswered(false);
    setCorrect(false);
    setTimedOut(false);
    setSelected('');
    setTypedAnswer('');
  }

  if (phase === 'intro') {
    return <section className="game-intro" aria-labelledby="game-title">
      <div className="game-intro-copy">
        <p className="eyebrow"><span/> ZALAI HALISMERET</p>
        <h1 id="game-title">Ha zalai lennél,<br/><em>milyen hal lennél?</em></h1>
        <p className="game-lead">Nézd meg a képet, és nevezd meg pontosan a halat. Egy kérdésre 30 másodperced van.</p>
        <ul className="game-rules" aria-label="A játék szabályai">
          <li><Check aria-hidden="true"/> Egy hal csak egyszer szerepel</li>
          <li><Check aria-hidden="true"/> Helyes válaszonként egy pont jár</li>
          <li><Check aria-hidden="true"/> A legjobb eredményt ez az eszköz megjegyzi</li>
        </ul>
      </div>
      <div className="mode-panel" aria-labelledby="mode-title">
        <p className="mode-kicker">VÁLASSZ JÁTÉKMÓDOT</p>
        <h2 id="mode-title">Mennyire ismered<br/>Zala halait?</h2>
        <button className="mode-card" type="button" onClick={() => startGame('beginner')}>
          <span className="mode-icon"><ListChecks aria-hidden="true"/></span>
          <span><strong>Kezdő</strong><small>20 hal · 4 válaszlehetőség</small></span>
          <span className="mode-record">Rekord: {best.beginner}/20</span>
        </button>
        <button className="mode-card" type="button" onClick={() => startGame('expert')}>
          <span className="mode-icon"><Keyboard aria-hidden="true"/></span>
          <span><strong>Szakértő</strong><small>Mind a {fishes.length} hal · beírt válasz</small></span>
          <span className="mode-record">Rekord: {best.expert}/{fishes.length}</span>
        </button>
        <a className="credits-link" href="/forrasok">Képek és szakmai források</a>
      </div>
    </section>;
  }

  if (phase === 'result') {
    const total = rounds.length;
    const percent = Math.round((score / total) * 100);
    return <section className="result-panel" aria-labelledby="result-title">
      <span className="result-icon"><Trophy aria-hidden="true"/></span>
      <p className="mode-kicker">A JÁTÉK VÉGET ÉRT</p>
      <h1 id="result-title">{score} / {total}</h1>
      <p className="result-lead">{percent === 100 ? 'Hibátlan! Zala minden halát felismered.' : percent >= 70 ? 'Szép fogás! Már igazán jól ismered a zalai vizeket.' : 'Jó kezdet — minden körrel több jellegzetesség marad meg.'}</p>
      <p className="result-best">Saját rekordod ebben a módban: <strong>{best[mode]} / {total}</strong></p>
      <div className="result-actions">
        <button type="button" className="primary-button" onClick={() => startGame(mode)}><RotateCcw size={18} aria-hidden="true"/> Újra ebben a módban</button>
        <button type="button" className="secondary-button" onClick={() => setPhase('intro')}>Másik mód választása</button>
      </div>
      <a className="credits-link light" href="/forrasok">Képek és szakmai források</a>
    </section>;
  }

  const fact = fishFacts[currentFish.id];
  return <section className="play-area" aria-labelledby="question-title">
    <div className="game-status">
      <div><span>{mode === 'beginner' ? 'KEZDŐ' : 'SZAKÉRTŐ'} MÓD</span><strong>{roundIndex + 1} / {rounds.length}</strong></div>
      <div className="score-counter"><span>PONT</span><strong>{score}</strong></div>
      <div className={`timer ${seconds <= 10 ? 'timer-warning' : ''}`}><Clock3 aria-hidden="true"/><strong>{seconds}</strong><span>mp</span></div>
    </div>
    <div className="timer-track" role="progressbar" aria-label="Hátralévő idő" aria-valuemin={0} aria-valuemax={ROUND_TIME} aria-valuenow={seconds}><span style={{ width: `${(seconds / ROUND_TIME) * 100}%` }}/></div>
    <div className="question-layout">
      <figure className="fish-photo">
        <img src={currentFish.image} alt={answered ? currentFish.nameHu : 'Felismerendő hal a játékban'} width="1100" height="720" fetchPriority="high"/>
        <figcaption>{answered ? currentFish.scientificName : 'Melyik hal látható a képen?'}</figcaption>
      </figure>
      <div className="answer-panel">
        <p className="question-number">{String(roundIndex + 1).padStart(2, '0')} / {String(rounds.length).padStart(2, '0')}</p>
        <h2 id="question-title">Melyik hal van<br/>a képen?</h2>
        {mode === 'beginner' ? <div className="answer-options">
          {options.map((option) => {
            const state = answered && option === currentFish.nameHu ? 'correct' : answered && option === selected ? 'wrong' : '';
            return <button key={option} type="button" className={`answer-option ${state}`} disabled={answered} onClick={() => submitAnswer(option)}>
              <span>{option}</span>{state === 'correct' && <Check aria-hidden="true"/>}{state === 'wrong' && <X aria-hidden="true"/>}
            </button>;
          })}
        </div> : <form className="expert-answer" onSubmit={(event) => { event.preventDefault(); submitAnswer(typedAnswer); }}>
          <label htmlFor="fish-answer">A hal pontos magyar neve</label>
          <input ref={answerInput} id="fish-answer" value={typedAnswer} onChange={(event) => setTypedAnswer(event.target.value)} disabled={answered} autoComplete="off" spellCheck="false" placeholder="Írd ide a megfejtést…"/>
          {!answered && <p>Az ékezeteket és az apró elírásokat elnézzük.</p>}
          <button type="submit" className="primary-button" disabled={answered || !typedAnswer.trim()}>Válasz elküldése</button>
        </form>}
        {answered && <div className={`answer-feedback ${correct ? 'is-correct' : 'is-wrong'}`} aria-live="polite">
          <p className="feedback-label">{correct ? <><Check aria-hidden="true"/> Helyes válasz!</> : timedOut ? <><Clock3 aria-hidden="true"/> Lejárt az idő</> : <><X aria-hidden="true"/> Nem ez az</>}</p>
          <h3>{currentFish.nameHu}</h3>
          <p className="scientific-name">{currentFish.scientificName}</p>
          {!correct && selected && <p className="given-answer">A válaszod: {selected}</p>}
          <dl className="fish-facts">
            <div><dt>Erről ismerheted fel</dt><dd>{fact.identification}</dd></div>
            <div><dt>Élőhelye</dt><dd>{fact.habitat}</dd></div>
            <div><dt>Zalai előfordulás</dt><dd>{fact.occurrence}</dd></div>
          </dl>
          <button type="button" className="primary-button next-button" onClick={nextRound}>{roundIndex === rounds.length - 1 ? 'Eredmény megtekintése' : 'Következő hal'} <span aria-hidden="true">→</span></button>
        </div>}
      </div>
    </div>
  </section>;
}
