import { NavLink } from "react-router-dom";

function Nosotros() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <img
          className="about-hero-image"
          src="/assets/nosotros/nosotros_1.webp"
          alt="Colección de Incorrecta Taller"
        />

        <div className="about-hero-overlay">
          <p className="about-eyebrow">
            Incorrecta Taller
          </p>

          <h1>NOSOTROS</h1>
        </div>
      </section>

      <section className="about-manifesto">
        <p>
          No diseñamos ropa para seguir tendencias.
        </p>

        <h2>
          Diseñamos prendas para quienes encuentran su
          identidad en lo diferente.
        </h2>
      </section>

      <section className="about-story">
        <div className="about-section-heading">
          <p className="about-eyebrow">
            Nuestra identidad
          </p>

          <h2>Nuestra historia</h2>
        </div>

        <div className="about-story-content">
          <p>
            Incorrecta Taller nace como un espacio de diseño
            independiente donde cada prenda busca transmitir
            una identidad propia. Creamos piezas pensadas para
            personas que no sienten la necesidad de encajar en
            una única forma de vestir.
          </p>

          <p>
            Trabajamos con producciones limitadas, prestando
            atención a cada etapa del proceso. Desde la primera
            idea hasta el último detalle, buscamos que cada
            colección conserve el carácter artesanal del taller.
          </p>

          <p>
            Nuestra propuesta combina diseño, experimentación y
            una mirada personal sobre la indumentaria. No
            perseguimos lo correcto: construimos algo distinto.
          </p>
        </div>
      </section>

      <section className="about-process">
        <div className="about-section-heading">
          <p className="about-eyebrow">
            Cómo trabajamos
          </p>

          <h2>Proceso creativo</h2>
        </div>

        <div className="about-process-grid">
          <article className="about-process-card">
            <span className="about-process-number">
              01
            </span>

            <h3>Diseño</h3>

            <p>
              Cada colección comienza con una idea, una
              referencia y una búsqueda visual propia.
            </p>
          </article>

          <article className="about-process-card">
            <span className="about-process-number">
              02
            </span>

            <h3>Confección</h3>

            <p>
              Trabajamos las prendas en series limitadas,
              cuidando materiales, cortes y terminaciones.
            </p>
          </article>

          <article className="about-process-card">
            <span className="about-process-number">
              03
            </span>

            <h3>Detalles</h3>

            <p>
              Los pequeños elementos son los que terminan de
              construir la identidad de cada pieza.
            </p>
          </article>
        </div>
      </section>

      <section className="about-cta">
        <p className="about-eyebrow">
          Descubrí la colección
        </p>

        <h2>
          Prendas creadas para expresar lo diferente.
        </h2>

        <NavLink
          className="about-cta-button"
          to="/products"
        >
          Ver colección
        </NavLink>
      </section>
    </main>
  );
}

export default Nosotros;