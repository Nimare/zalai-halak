import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Fish,
  ShoppingCart,
  Presentation,
  FishSymbol,
  Users,
} from 'lucide-react';
const programs = [
  { icon: Fish, title: 'Kiállítók', detail: 'és újdonságok' },
  { icon: ShoppingCart, title: 'Horgászboltok', detail: 'és kedvezmények' },
  { icon: Presentation, title: 'Előadások', detail: 'és szakmai programok' },
  { icon: FishSymbol, title: 'Bemutatók', detail: 'és terméktesztelés' },
  { icon: Users, title: 'Családi', detail: 'programok' },
];
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#tartalom">
        Ugrás a tartalomra
      </a>
      <header className="site-header wrap">
        <a
          href="#tartalom"
          className="brand"
          aria-label="Zalai halak – főoldal"
        >
          <Fish aria-hidden="true" />
          <span>
            Zalai halak<small>HORGÁSZFESZTIVÁL</small>
          </span>
        </a>
        <nav aria-label="Fő navigáció">
          <a href="/jatek">Játék</a>
          <a href="#programok">Programok</a>
          <a href="#helyszin">
            Helyszín <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
        <span className="header-date">2027. MÁRCIUS 5–7.</span>
      </header>
      <main id="tartalom">
        <section className="hero wrap" aria-labelledby="festival-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> TALÁLKOZZUNK A VÍZPARTON!
            </p>
            <h1 id="festival-title">Zalai halak</h1>
            <p className="festival-ribbon">Horgászfesztivál</p>
            <p className="tagline">
              Minden, ami
              <br />
              <em>horgászat!</em>
            </p>
            <div className="event-date">
              <CalendarDays aria-hidden="true" />
              <div>
                <span>2027. MÁRCIUS</span>
                <strong>5–7.</strong>
              </div>
            </div>
            <a
              className="hero-location"
              href="https://maps.app.goo.gl/7AvSLBT1HeYaE9kv8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin aria-hidden="true" />
              <span>
                Lábatlani
                <br />
                <strong>Panoráma Panzió</strong>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <a className="program-link" href="#programok">
              Fedezd fel a programokat{' '}
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
          <figure className="poster">
            <img
              src="/poster.png"
              width="1054"
              height="1492"
              fetchPriority="high"
              alt="A Zalai halak horgászfesztivál plakátja: halak és vízparti horgászok, 2027. március 5–7., Lábatlani Panoráma Panzió. A programok részletei lent olvashatók."
            />
          </figure>
        </section>
        <section className="game-promo" aria-labelledby="game-promo-title">
          <div className="wrap game-promo-inner">
            <div>
              <p className="eyebrow">HALISMERETI JÁTÉK</p>
              <h2 id="game-promo-title">
                Ha zalai lennél,
                <br />
                <em>milyen hal lennél?</em>
              </h2>
              <p>
                Ismerd fel képről Zala vizeinek halait. Válassz négy név közül,
                vagy írd be te magad a pontos megfejtést.
              </p>
              <a className="game-promo-link" href="/jatek">
                Kezdjük a játékot <ArrowRight size={20} aria-hidden="true" />
              </a>
            </div>
            <figure>
              <img
                src="/fish/selymes-durbincs.png"
                alt="Selymes durbincs"
                width="900"
                height="600"
                loading="lazy"
              />
            </figure>
          </div>
        </section>
        <section
          className="program-section"
          id="programok"
          aria-labelledby="program-title"
        >
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">A FESZTIVÁLON</p>
              <h2 id="program-title">Minden, ami horgászat!</h2>
            </div>
            <div className="program-grid">
              {programs.map(({ icon: Icon, title, detail }, index) => (
                <article className="program" key={title}>
                  <span className="program-number">0{index + 1}</span>
                  <Icon size={38} strokeWidth={1.4} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          className="location-section wrap"
          id="helyszin"
          aria-labelledby="location-title"
        >
          <div>
            <p className="eyebrow">
              <MapPin size={18} aria-hidden="true" /> HELYSZÍN
            </p>
            <h2 id="location-title">
              Lábatlani
              <br />
              Panoráma Panzió
            </h2>
            <a
              className="program-link"
              href="https://maps.app.goo.gl/7AvSLBT1HeYaE9kv8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Megnyitás Google Térképen{' '}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="location-details">
            <p>2027. március 5–7.</p>
            <span>Találkozzunk a vízparton!</span>
          </div>
        </section>
      </main>
      <footer className="wrap">
        <span>
          Zalai halak <span className="footer-divider">/</span> Horgászfesztivál
          2027
        </span>
        <span className="footer-links">
          <a href="/poster.png" target="_blank" rel="noreferrer">
            Eredeti plakát <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="/forrasok">Források és impresszum</a>
        </span>
      </footer>
    </>
  );
}
