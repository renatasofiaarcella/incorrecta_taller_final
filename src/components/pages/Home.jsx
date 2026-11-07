
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section
        id="homeHeroCarousel"
        className="carousel slide home-hero"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators home-hero-indicators">
          <button
            type="button"
            data-bs-target="#homeHeroCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Colección AW26"
          />

          <button
            type="button"
            data-bs-target="#homeHeroCarousel"
            data-bs-slide-to="1"
            aria-label="Diseño independiente"
          />

          <button
            type="button"
            data-bs-target="#homeHeroCarousel"
            data-bs-slide-to="2"
            aria-label="Prendas con identidad"
          />
        </div>

        <div className="carousel-inner">
          <article className="carousel-item active home-hero-slide">
            <img
              src="/fotocarrusel1.jpg"
              className="home-hero-image"
              alt="Colección AW26 de Incorrecta Taller"
            />
            <div className="home-brand">
              <h1>
                INCORRECTA
                <span>TALLER</span>
              </h1>
            </div>

            <div className="home-hero-overlay home-hero-overlay--lilac" />

            <div className="home-hero-content">
              <p className="home-hero-eyebrow">
                Nueva colección
              </p>

              

              <p className="home-hero-description">
                Diseño independiente para quienes encuentran
                su identidad en lo diferente.
              </p>

              <div className="home-hero-actions">
                <NavLink
                  to="/products"
                  className="home-hero-button home-hero-button--primary"
                >
                  Ver colección
                </NavLink>

                <NavLink
                  to="/nosotros"
                  className="home-hero-button home-hero-button--secondary"
                >
                  Conocer la marca
                </NavLink>
              </div>
            </div>
          </article>

          <article className="carousel-item home-hero-slide">
            <img
              src="/fotocarrusel2.jpg"
              className="home-hero-image"
              alt="Prendas de diseño independiente"
            />

            <div className="home-hero-overlay home-hero-overlay--orange" />

            <div className="home-hero-content">
              <p className="home-hero-eyebrow">
                Producción limitada
              </p>

              <h2>
                PRENDAS QUE
                <span>NO BUSCAN ENCAJAR</span>
              </h2>

              <p className="home-hero-description">
                Series limitadas, identidad propia y atención
                en cada detalle.
              </p>

              <div className="home-hero-actions">
                <NavLink
                  to="/aw26"
                  className="home-hero-button home-hero-button--primary"
                >
                  Explorar AW26
                </NavLink>
              </div>
            </div>
          </article>

          <article className="carousel-item home-hero-slide">
            <img
              src="/fotocarrusell3.jpg"
              className="home-hero-image"
              alt="Estética y detalles de Incorrecta Taller"
            />

            <div className="home-hero-overlay home-hero-overlay--sepia" />

            <div className="home-hero-content">
              <p className="home-hero-eyebrow">
                Incorrecta Taller
              </p>

              <h2>
                HACÉ DE LO DIFERENTE
                <span>TU IDENTIDAD</span>
              </h2>

              <p className="home-hero-description">
                Una forma distinta de pensar, crear y vestir.
              </p>

              <div className="home-hero-actions">
                <NavLink
                  to="/products"
                  className="home-hero-button home-hero-button--primary"
                >
                  Ir al Shop
                </NavLink>
              </div>
            </div>
          </article>
        </div>

        <button
          className="carousel-control-prev home-hero-control"
          type="button"
          data-bs-target="#homeHeroCarousel"
          data-bs-slide="prev"
          aria-label="Imagen anterior"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          />
        </button>

        <button
          className="carousel-control-next home-hero-control"
          type="button"
          data-bs-target="#homeHeroCarousel"
          data-bs-slide="next"
          aria-label="Imagen siguiente"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          />
        </button>
      </section>
    </main>
  );
}

export default Home;

