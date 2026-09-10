import { ArrowLeft, ExternalLink, Fish } from 'lucide-react';
import fishData from '@/data/fishes.json';

export const metadata = {
  title: 'Források és impresszum | Zalai halak',
  description: 'A Zalai halak játék előfordulási, fajismereti és képlicenc-forrásai.',
};

export default function SourcesPage() {
  return <>
    <a className="skip-link" href="#forrasok">Ugrás a forrásokhoz</a>
    <header className="game-header wrap">
      <a href="/" className="brand" aria-label="Zalai halak – főoldal"><Fish aria-hidden="true"/><span>Zalai halak<small>HORGÁSZFESZTIVÁL</small></span></a>
      <a className="back-link" href="/"><ArrowLeft size={18} aria-hidden="true"/> Vissza a főoldalra</a>
    </header>
    <main id="forrasok" className="sources-page">
      <section className="sources-hero wrap">
        <p className="eyebrow"><span/> FORRÁSOK ÉS IMPRESSZUM</p>
        <h1>Kik úsznak<br/><em>a képeken?</em></h1>
        <p>A játékban csak Zala vármegye vizeiből szakmai felméréssel dokumentált halak szerepelnek. Itt találod az előfordulási bizonyítékokat, a fajleírások alapját és minden kép szerzőjét.</p>
      </section>

      <section className="research-sources">
        <div className="wrap sources-columns">
          <article>
            <span className="source-number">01</span>
            <p className="mode-kicker">ZALAI ELŐFORDULÁS</p>
            <h2>Kis-Balaton és a Zala</h2>
            <p>Antal László, Csipkés Roland és Müller Zoltán 2008-ban 17 mintavételi helyen 24 halfajt azonosított. A fajlista Zala folyó, Kis-Balaton, Keszthelyi-öböl és környékbeli csatornák adatait tartalmazza.</p>
            <a href={fishData.occurrenceSources['kis-balaton-2008'].url} target="_blank" rel="noreferrer">A tanulmány megnyitása <ExternalLink size={16} aria-hidden="true"/></a>
          </article>
          <article>
            <span className="source-number">02</span>
            <p className="mode-kicker">ZALAI ELŐFORDULÁS</p>
            <h2>Mura mente</h2>
            <p>A Mura mente Natura 2000 fenntartási terve igazolja a széles durbincs és a selymes durbincs jelenlétét a folyó Zala vármegyei szakaszán.</p>
            <a href={fishData.occurrenceSources['mura-natura-2021'].url} target="_blank" rel="noreferrer">A fenntartási terv megnyitása <ExternalLink size={16} aria-hidden="true"/></a>
          </article>
          <article>
            <span className="source-number">03</span>
            <p className="mode-kicker">FAJISMERET</p>
            <h2>Magyarország halfaunája</h2>
            <p>A felismerést segítő rövid leírások és élőhely-összefoglalók alapja Harka Ákos és Sallai Zoltán magyar nyelvű szakkönyve, a Magyar Haltani Társaság anyagai és a FishBase fajlapjai.</p>
            <div className="source-links">
              <a href="https://dtk.tankonyvtar.hu/xmlui/handle/123456789/13419" target="_blank" rel="noreferrer">Digitális szakkönyv <ExternalLink size={16} aria-hidden="true"/></a>
              <a href="https://haltanitarsasag.hu/" target="_blank" rel="noreferrer">Magyar Haltani Társaság <ExternalLink size={16} aria-hidden="true"/></a>
              <a href="https://www.fishbase.se/" target="_blank" rel="noreferrer">FishBase <ExternalLink size={16} aria-hidden="true"/></a>
            </div>
          </article>
        </div>
      </section>

      <section className="image-credits wrap" aria-labelledby="credits-title">
        <div className="credits-heading"><div><p className="eyebrow">KÉPJEGYZÉK</p><h2 id="credits-title">A játék {fishData.fishes.length} hala</h2></div><p>A képek a Wikimedia Commons szabadon felhasználható gyűjteményéből származnak. Az egyes licencek feltételei az eredeti képoldalakon olvashatók.</p></div>
        <div className="credit-grid">
          {fishData.fishes.map((fish, index) => <article className="credit-card" key={fish.id}>
            <figure><img src={fish.image} alt={fish.nameHu} width="420" height="280" loading="lazy"/><span>{String(index + 1).padStart(2, '0')}</span></figure>
            <div><h3>{fish.nameHu}</h3><p className="scientific-name">{fish.scientificName}</p><p>Fotó / illusztráció: <strong>{fish.author}</strong></p><p>Licenc: <a href={fish.licenseUrl} target="_blank" rel="noreferrer">{fish.license}</a></p><a className="original-link" href={fish.imageSource} target="_blank" rel="noreferrer">Eredeti képoldal <ExternalLink size={14} aria-hidden="true"/></a></div>
          </article>)}
        </div>
      </section>
    </main>
    <footer className="wrap"><span>Zalai halak <span className="footer-divider">/</span> Horgászfesztivál 2027</span><a href="/jatek">Játék indítása</a></footer>
  </>;
}
