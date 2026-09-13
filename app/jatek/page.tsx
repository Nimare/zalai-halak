import { ArrowLeft, Fish } from 'lucide-react';
import FishGame from './fish-game';

export const metadata = {
  title: 'Ha zalai lennél, milyen hal lennél? | Zalai halak',
  description:
    'Ismerd fel Zala vármegye halait képről kezdő vagy szakértő módban.',
};

export default function GamePage() {
  return (
    <>
      <a className="skip-link" href="#jatek">
        Ugrás a játékhoz
      </a>
      <header className="game-header wrap">
        <a href="/" className="brand" aria-label="Zalai halak – főoldal">
          <Fish aria-hidden="true" />
          <span>
            Zalai halak<small>HORGÁSZFESZTIVÁL</small>
          </span>
        </a>
        <a className="back-link" href="/">
          <ArrowLeft size={18} aria-hidden="true" /> Vissza a fesztiválhoz
        </a>
      </header>
      <main id="jatek" className="game-shell wrap">
        <FishGame />
      </main>
    </>
  );
}
