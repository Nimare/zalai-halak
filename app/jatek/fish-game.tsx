'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  Clock3,
  Keyboard,
  ListChecks,
  RotateCcw,
  Trophy,
  X,
} from 'lucide-react';
import fishData from '@/data/fishes.json';
import { fishFacts } from '@/data/fish-facts';

import { readRecord, writeRecord } from '@/lib/record-storage';

import {
  acceptsAnswer,
  buildOptions,
  buildRounds,
  fishPool,
  type Mode,
} from '@/lib/game-rules';
type Phase = 'intro' | 'playing' | 'result';
type FishEntry = (typeof fishData.fishes)[number];
const fishes = fishData.fishes;
const beginnerCount = Math.min(20, fishPool(fishes, 'beginner').length);
const expertCount = Math.min(20, fishPool(fishes, 'expert').length);
const ROUND_TIME = 30;
const recordKey = (mode: Mode) =>
  `zalai-halak-best-v${fishData.datasetVersion}-${mode}${mode === 'expert' ? '-20-rounds' : ''}`;

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
  const [best, setBest] = useState<Record<Mode, number>>({
    beginner: 0,
    expert: 0,
  });
  const answerInput = useRef<HTMLInputElement>(null);
  const currentFish = rounds[roundIndex];
  const options = useMemo(
    () => (currentFish ? buildOptions(currentFish, fishes, mode) : []),
    [currentFish, mode],
  );

  useEffect(() => {
    // Hydrate persisted browser state after SSR; this runs only on mount.
    // oxlint-disable-next-line react/react-compiler
    setBest({
      beginner: readRecord(
        () => localStorage,
        recordKey('beginner'),
        beginnerCount,
      ),
      expert: readRecord(() => localStorage, recordKey('expert'), expertCount),
    });
  }, []);

  useEffect(() => {
    if (phase !== 'playing' || answered) return;
    const timer = window.setTimeout(() => {
      setSeconds((value) => Math.max(0, value - 1));
      if (seconds <= 1) {
        setTimedOut(true);
        setCorrect(false);
        setAnswered(true);
      }
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [answered, phase, seconds]);

  useEffect(() => {
    if (phase === 'playing' && mode === 'expert' && !answered)
      answerInput.current?.focus();
  }, [answered, mode, phase, roundIndex]);

  function startGame(nextMode: Mode) {
    setMode(nextMode);
    setRounds(buildRounds(fishes, nextMode));
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
    const isCorrect =
      mode === 'beginner'
        ? value === currentFish.nameHu
        : acceptsAnswer(value, currentFish, fishes);
    setSelected(value);
    setCorrect(isCorrect);
    setTimedOut(false);
    setAnswered(true);
    if (isCorrect) setScore((current) => current + 1);
  }

  function nextRound() {
    if (roundIndex === rounds.length - 1) {
      const key = recordKey(mode);
      const nextBest = Math.max(score, best[mode]);
      writeRecord(() => localStorage, key, nextBest);
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
    return (
      <section className="game-intro" aria-labelledby="game-title">
        <div className="game-intro-copy">
          <p className="eyebrow">
            <span /> ZALAI HALISMERET
          </p>
          <h1 id="game-title">
            Ha zalai lennél,
            <br />
            <em>milyen hal lennél?</em>
          </h1>
          <p className="game-lead">
            Nézd meg a képet, és nevezd meg pontosan a halat. Egy kérdésre 30
            másodperced van.
          </p>
          <ul className="game-rules" aria-label="A játék szabályai">
            <li>
              <Check aria-hidden="true" /> Egy hal csak egyszer szerepel
            </li>
            <li>
              <Check aria-hidden="true" /> Helyes válaszonként egy pont jár
            </li>
            <li>
              <Check aria-hidden="true" /> A legjobb eredményt ez az eszköz
              megjegyzi
            </li>
          </ul>
        </div>
        <div className="mode-panel" aria-labelledby="mode-title">
          <p className="mode-kicker">VÁLASSZ JÁTÉKMÓDOT</p>
          <h2 id="mode-title">
            Mennyire ismered
            <br />
            Zala halait?
          </h2>
          <button
            className="mode-card"
            type="button"
            onClick={() => startGame('beginner')}
          >
            <span className="mode-icon">
              <ListChecks aria-hidden="true" />
            </span>
            <span>
              <strong>Kezdő</strong>
              <small>
                {beginnerCount} hal a {fishPool(fishes, 'beginner').length}{' '}
                kezdő közül · 4 válaszlehetőség, köztük hasonló szakértő halak
                neve is
              </small>
            </span>
            <span className="mode-record">
              Rekord: {best.beginner}/{beginnerCount}
            </span>
          </button>
          <button
            className="mode-card"
            type="button"
            onClick={() => startGame('expert')}
          >
            <span className="mode-icon">
              <Keyboard aria-hidden="true" />
            </span>
            <span>
              <strong>Szakértő</strong>
              <small>
                {expertCount} hal az {fishPool(fishes, 'expert').length} kezdő
                és szakértő közül · beírt válasz
              </small>
            </span>
            <span className="mode-record">
              Rekord: {best.expert}/{expertCount}
            </span>
          </button>
        </div>
      </section>
    );
  }

  if (phase === 'result') {
    const total = rounds.length;
    const percent = Math.round((score / total) * 100);
    return (
      <section className="result-panel" aria-labelledby="result-title">
        <span className="result-icon">
          <Trophy aria-hidden="true" />
        </span>
        <p className="mode-kicker">A JÁTÉK VÉGET ÉRT</p>
        <h1 id="result-title">
          {score} / {total}
        </h1>
        <p className="result-lead">
          {percent === 100
            ? 'Hibátlan! Ebben a körben minden halat felismertél.'
            : percent >= 70
              ? 'Szép fogás! Már igazán jól ismered a zalai vizeket.'
              : 'Jó kezdet — minden körrel több jellegzetesség marad meg.'}
        </p>
        <p className="result-best">
          Saját rekordod ebben a módban:{' '}
          <strong>
            {best[mode]} / {total}
          </strong>
        </p>
        <div className="result-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => startGame(mode)}
          >
            <RotateCcw size={18} aria-hidden="true" /> Újra ebben a módban
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setPhase('intro')}
          >
            Másik mód választása
          </button>
        </div>
      </section>
    );
  }

  const fact = fishFacts[currentFish.id];
  return (
    <section className="play-area" aria-labelledby="question-title">
      <div className="game-status">
        <div>
          <span>{mode === 'beginner' ? 'KEZDŐ' : 'SZAKÉRTŐ'} MÓD</span>
          <strong>
            {roundIndex + 1} / {rounds.length}
          </strong>
        </div>
        <div className="score-counter">
          <span>PONT</span>
          <strong>{score}</strong>
        </div>
        <div className={`timer ${seconds <= 10 ? 'timer-warning' : ''}`}>
          <Clock3 aria-hidden="true" />
          <strong>{seconds}</strong>
          <span>mp</span>
        </div>
      </div>
      <progress
        className="timer-track"
        aria-label="Hátralévő idő"
        max={ROUND_TIME}
        value={seconds}
      />
      <div className="question-layout">
        <figure className="fish-photo">
          <img
            src={currentFish.image}
            alt={answered ? currentFish.nameHu : 'Felismerendő hal a játékban'}
            width="1100"
            height="720"
            fetchPriority="high"
          />
          <figcaption>
            {answered
              ? currentFish.scientificName
              : 'Melyik hal látható a képen?'}
          </figcaption>
        </figure>
        <div className="answer-panel">
          <p className="question-number">
            {String(roundIndex + 1).padStart(2, '0')} /{' '}
            {String(rounds.length).padStart(2, '0')}
          </p>
          <h2 id="question-title">
            Melyik hal van
            <br />a képen?
          </h2>
          {mode === 'beginner' ? (
            <div className="answer-options">
              {options.map((option) => {
                const state =
                  answered && option === currentFish.nameHu
                    ? 'correct'
                    : answered && option === selected
                      ? 'wrong'
                      : '';
                return (
                  <button
                    key={option}
                    type="button"
                    className={`answer-option ${state}`}
                    disabled={answered}
                    onClick={() => submitAnswer(option)}
                  >
                    <span>{option}</span>
                    {state === 'correct' && <Check aria-hidden="true" />}
                    {state === 'wrong' && <X aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          ) : (
            <form
              className="expert-answer"
              onSubmit={(event) => {
                event.preventDefault();
                submitAnswer(typedAnswer);
              }}
            >
              <label htmlFor="fish-answer">A hal pontos magyar neve</label>
              <input
                ref={answerInput}
                id="fish-answer"
                value={typedAnswer}
                onChange={(event) => setTypedAnswer(event.target.value)}
                disabled={answered}
                autoComplete="off"
                spellCheck="false"
                placeholder="Írd ide a megfejtést…"
              />
              {!answered && (
                <p>Az ékezeteket és az apró elírásokat elnézzük.</p>
              )}
              <button
                type="submit"
                className="primary-button"
                disabled={answered || !typedAnswer.trim()}
              >
                Válasz elküldése
              </button>
            </form>
          )}
          {answered && (
            <div
              className={`answer-feedback ${correct ? 'is-correct' : 'is-wrong'}`}
              aria-live="polite"
            >
              <p className="feedback-label">
                {correct ? (
                  <>
                    <Check aria-hidden="true" /> Helyes válasz!
                  </>
                ) : timedOut ? (
                  <>
                    <Clock3 aria-hidden="true" /> Lejárt az idő
                  </>
                ) : (
                  <>
                    <X aria-hidden="true" /> Nem ez az
                  </>
                )}
              </p>
              <h3>{currentFish.nameHu}</h3>
              <p className="scientific-name">{currentFish.scientificName}</p>
              {!correct && selected && (
                <p className="given-answer">A válaszod: {selected}</p>
              )}
              <dl className="fish-facts">
                <div>
                  <dt>Erről ismerheted fel</dt>
                  <dd>{fact.identification}</dd>
                </div>
                <div>
                  <dt>Eredet</dt>
                  <dd>
                    {
                      fishData.originLegend[
                        currentFish.origin as keyof typeof fishData.originLegend
                      ]
                    }
                  </dd>
                </div>
                <div>
                  <dt>Védelem / státusz</dt>
                  <dd>
                    {currentFish.protection === '–'
                      ? '– (nincs külön jelölés a fajlistában)'
                      : currentFish.protection}
                  </dd>
                </div>
                <div>
                  <dt>Zalai előfordulás</dt>
                  <dd>
                    {currentFish.occurrence}{' '}
                    {
                      fishData.occurrenceLegend[
                        currentFish.occurrence as keyof typeof fishData.occurrenceLegend
                      ]
                    }
                  </dd>
                </div>
                <div>
                  <dt>Fő élőhely Zalában</dt>
                  <dd>{currentFish.localHabitat}</dd>
                </div>
                <div>
                  <dt>Maximális méret</dt>
                  <dd>{currentFish.maxSize}</dd>
                </div>
              </dl>
              {'notes' in currentFish && (
                <p className="fish-note">{currentFish.notes}</p>
              )}
              <button
                type="button"
                className="primary-button next-button"
                onClick={nextRound}
              >
                {roundIndex === rounds.length - 1
                  ? 'Eredmény megtekintése'
                  : 'Következő hal'}{' '}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
