import { NavLink } from "react-router-dom";

function Aw26() {
  return (
    <main className="campaign-page">
      <header className="campaign-header">
        <p className="campaign-eyebrow">
          Colección otoño / invierno
        </p>

        <h1>AW 26</h1>

        <p className="campaign-intro">
          Siluetas amplias, texturas protagonistas y prendas
          creadas para habitar lo diferente.
        </p>
      </header>

      <section
        className="campaign-grid"
        aria-label="Campaña AW26"
      >
        <figure className="campaign-item campaign-item--hero">
          <img
            src="/assets/aw26/aw26_11.jpg"
            alt="Modelo usando una prenda de la colección AW26"
          />

          <figcaption>
            <span>01</span>
            Texturas
          </figcaption>
        </figure>

        <figure className="campaign-item campaign-item--portrait">
          <img
            src="/assets/aw26/aw26_12.jpg"
            alt="Detalle de una prenda de la colección AW26"
            loading="lazy"
          />

          <figcaption>
            <span>02</span>
            Movimiento
          </figcaption>
        </figure>

        <figure className="campaign-item campaign-item--landscape">
          <img
            src="/assets/aw26/aw26_4.jpg"
            alt="Modelo de la campaña AW26"
            loading="lazy"
          />

          <figcaption>
            <span>03</span>
            Identidad
          </figcaption>
        </figure>

        <figure className="campaign-item campaign-item--tall">
          <img
            src="/assets/aw26/aw26_5.jpg"
            alt="Prenda de diseño independiente AW26"
            loading="lazy"
          />

          <figcaption>
            <span>04</span>
            Rock
          </figcaption>
        </figure>
      </section>

      <section className="campaign-cta">
        <p>Descubrí todas las prendas de la colección.</p>

        <NavLink
          to="/products"
          className="campaign-button"
        >
          Ver colección
        </NavLink>
      </section>
    </main>
  );
}

export default Aw26;