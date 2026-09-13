import { ArrowLeft, ExternalLink, Fish } from 'lucide-react';
import fishData from '@/data/fishes.json';
import { fishFacts } from '@/data/fish-facts';

export const metadata = {
  title: 'Források és impresszum | Zalai halak',
  description:
    'A Zalai halak játék előfordulási, fajismereti és képlicenc-forrásai.',
};

export default function SourcesPage() {
  return (
    <>
      <a className="skip-link" href="#forrasok">
        Ugrás a forrásokhoz
      </a>
      <header className="game-header wrap">
        <a href="/" className="brand" aria-label="Zalai halak – főoldal">
          <Fish aria-hidden="true" />
          <span>
            Zalai halak<small>HORGÁSZFESZTIVÁL</small>
          </span>
        </a>
        <a className="back-link" href="/">
          <ArrowLeft size={18} aria-hidden="true" /> Vissza a főoldalra
        </a>
      </header>
      <main id="forrasok" className="sources-page">
        <section className="sources-hero wrap">
          <p className="eyebrow">
            <span /> FORRÁSOK ÉS IMPRESSZUM
          </p>
          <h1>
            Kik úsznak
            <br />
            <em>a képeken?</em>
          </h1>
          <p>
            A játék a zalai fajlista 58 tételét és a korábbi játékból megőrzött
            nyurgapontyot mutatja be. Itt találod az adatokat, a felismerési
            leírásokat és minden kép szerzőjét. A lista hibridet és testformát
            is tartalmaz, ezért a tételek száma nem azonos a fajok számával.
          </p>
        </section>

        <section className="research-sources">
          <div className="wrap sources-columns">
            <article>
              <span className="source-number">01</span>
              <p className="mode-kicker">ZALAI ELŐFORDULÁS</p>
              <h2>Kis-Balaton és a Zala</h2>
              <p>
                Antal László, Csipkés Roland és Müller Zoltán 2008-ban 17
                mintavételi helyen 24 halfajt azonosított. A fajlista Zala
                folyó, Kis-Balaton, Keszthelyi-öböl és környékbeli csatornák
                adatait tartalmazza.
              </p>
              <a
                href={fishData.occurrenceSources['kis-balaton-2008'].url}
                target="_blank"
                rel="noreferrer"
              >
                A tanulmány megnyitása{' '}
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </article>
            <article>
              <span className="source-number">02</span>
              <p className="mode-kicker">ZALAI ELŐFORDULÁS</p>
              <h2>Mura mente</h2>
              <p>
                A Mura mente Natura 2000 fenntartási terve igazolja a széles
                durbincs és a selymes durbincs jelenlétét a folyó Zala vármegyei
                szakaszán.
              </p>
              <a
                href={fishData.occurrenceSources['mura-natura-2021'].url}
                target="_blank"
                rel="noreferrer"
              >
                A fenntartási terv megnyitása{' '}
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </article>
            <article>
              <span className="source-number">03</span>
              <p className="mode-kicker">FAJISMERET</p>
              <h2>Magyarország halfaunája</h2>
              <p>
                A régi felismerési leírásokat megőriztük; az új tételeknél a
                FishBase fajlapjai és a képforrások segítik az azonosítást. Az
                egyes halaknál közvetlen hivatkozást is találsz.
              </p>
              <div className="source-links">
                <a
                  href="https://dtk.tankonyvtar.hu/xmlui/handle/123456789/13419"
                  target="_blank"
                  rel="noreferrer"
                >
                  Digitális szakkönyv{' '}
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
                <a
                  href="https://haltanitarsasag.hu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Magyar Haltani Társaság{' '}
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
                <a
                  href="https://www.fishbase.se/"
                  target="_blank"
                  rel="noreferrer"
                >
                  FishBase <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="dataset-notes wrap" aria-labelledby="dataset-title">
          <h2 id="dataset-title">A fajlista és a jelölések</h2>
          <p>{fishData.dataSources['species-table-2026'].description}</p>
          <p>
            <strong>Eredet:</strong> Ő = őshonos; I = idegenhonos; Ő/telepített
            = őshonos / telepített.
          </p>
          <p>
            <strong>Zalai előfordulás:</strong>{' '}
            {Object.entries(fishData.occurrenceLegend)
              .map(([symbol, label]) => `${symbol} = ${label}`)
              .join('; ')}
            .
          </p>
          <p>
            A „Védelem / státusz” mező a táblázat jelöléseit követi:
            védettséget, inváziós vagy telepített státuszt is tartalmazhat. A
            „–” külön jelölés hiányát jelenti. A maximális méret tájékoztató
            érték, nem átlagos méret és nem helyi fogási rekord.
          </p>
          <p>{fishData.dataSources['nyurgaponty-supplement'].description}</p>
          <div className="supplement-links">
            {fishData.dataSources['nyurgaponty-supplement'].urls.map(
              (url, index) => (
                <a key={url} href={url} target="_blank" rel="noreferrer">
                  {
                    [
                      'Ponty – FishBase',
                      'Zalai horgászszövetség',
                      'Hagyományok, ízek, régiók',
                    ][index]
                  }{' '}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              ),
            )}
          </div>
        </section>

        <section className="image-credits wrap" aria-labelledby="credits-title">
          <div className="credits-heading">
            <div>
              <p className="eyebrow">KÉPJEGYZÉK</p>
              <h2 id="credits-title">A játék {fishData.fishes.length} hala</h2>
            </div>
            <p>
              A fényképek és illusztrációk a Wikimedia Commons, valamint a
              GBIF-en elérhető SNSB-ZSM múzeumi gyűjtemény szabadon
              felhasználható anyagai. Az egyes licencek feltételei az eredeti
              képoldalakon olvashatók.
            </p>
          </div>
          <div className="credit-grid">
            {fishData.fishes.map((fish, index) => (
              <article className="credit-card" key={fish.id} id={fish.id}>
                <figure>
                  <img
                    src={fish.image}
                    alt={fish.nameHu}
                    width="420"
                    height="280"
                    loading="lazy"
                  />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </figure>
                <div>
                  <h3>{fish.nameHu}</h3>
                  <p className="scientific-name">{fish.scientificName}</p>
                  <dl className="catalog-facts">
                    <div>
                      <dt>Eredet</dt>
                      <dd>
                        {
                          fishData.originLegend[
                            fish.origin as keyof typeof fishData.originLegend
                          ]
                        }
                      </dd>
                    </div>
                    <div>
                      <dt>Védelem / státusz</dt>
                      <dd>{fish.protection}</dd>
                    </div>
                    <div>
                      <dt>Zalai előfordulás</dt>
                      <dd>
                        {fish.occurrence}{' '}
                        {
                          fishData.occurrenceLegend[
                            fish.occurrence as keyof typeof fishData.occurrenceLegend
                          ]
                        }
                      </dd>
                    </div>
                    <div>
                      <dt>Fő élőhely Zalában</dt>
                      <dd>{fish.localHabitat}</dd>
                    </div>
                    <div>
                      <dt>Maximális méret</dt>
                      <dd>{fish.maxSize}</dd>
                    </div>
                    <div>
                      <dt>Kategória</dt>
                      <dd>
                        {fish.category === 'kezdő' ? 'Kezdő' : 'Szakértő'}
                      </dd>
                    </div>
                    <div>
                      <dt>Erről ismerheted fel</dt>
                      <dd>{fishFacts[fish.id].identification}</dd>
                    </div>
                  </dl>
                  {'notes' in fish && <p>{fish.notes}</p>}
                  <p>
                    Adatok:{' '}
                    {fish.tableSource === 'species-table-2026'
                      ? 'szerkesztői fajlista, 2026. szeptember 10.'
                      : 'kiegészítő nyurgapontyadatok (lásd fent)'}
                  </p>
                  <a
                    className="original-link"
                    href={fish.factSource}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {fish.id === 'busa-hibrid'
                      ? 'A hibridről szóló tanulmány'
                      : 'Fajismereti forrás'}{' '}
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                  <p>
                    Fotó / illusztráció: <strong>{fish.author}</strong>
                  </p>
                  {'imageNote' in fish && <p>{fish.imageNote}</p>}
                  <p>
                    Licenc:{' '}
                    <a href={fish.licenseUrl} target="_blank" rel="noreferrer">
                      {fish.license === 'Public domain'
                        ? 'Közkincs'
                        : fish.license === 'Attribution'
                          ? 'Szabad felhasználás, szerzőmegjelöléssel'
                          : fish.license}
                    </a>
                  </p>
                  <a
                    className="original-link"
                    href={fish.imageSource}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Eredeti képoldal{' '}
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="wrap">
        <span>
          Zalai halak <span className="footer-divider">/</span> Horgászfesztivál
          2027
        </span>
        <a href="/jatek">Játék indítása</a>
      </footer>
    </>
  );
}
