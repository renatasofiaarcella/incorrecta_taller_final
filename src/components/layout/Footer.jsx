
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <div className="site-footer-brand">
          <NavLink
            to="/"
            className="site-footer-logo"
          >
            INCORRECTA TALLER
          </NavLink>

          <p>
            Diseño independiente, identidad propia y
            series limitadas.
          </p>
        </div>

        <div className="site-footer-column">
          <h2>Navegación</h2>

          <nav aria-label="Navegación del pie de página">
            <NavLink to="/">
              Inicio
            </NavLink>

            <NavLink to="/products">
              Shop
            </NavLink>

            <NavLink to="/aw26">
              AW26
            </NavLink>

            <NavLink to="/nosotros">
              Nosotros
            </NavLink>

            <NavLink to="/comunidad">
              Comunidad
            </NavLink>
          </nav>
        </div>

        <div className="site-footer-column">
          <h2>Contacto</h2>

          <a href="mailto:contacto@incorrectataller.com">
            contacto@incorrectataller.com
          </a>

          <p>
            Buenos Aires, Argentina
          </p>
        </div>

        <div className="site-footer-column">
          <h2>Seguinos</h2>

          <div className="site-footer-social">
            <a
              href="#"
              aria-label="Instagram de Incorrecta Taller"
            >
              Instagram
            </a>

            <a
              href="#"
              aria-label="WhatsApp de Incorrecta Taller"
            >
              WhatsApp
            </a>

            <a
              href="#"
              aria-label="Facebook de Incorrecta Taller"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>
          © 2026 Incorrecta Taller. Todos los derechos reservados.
        </p>

        <p>
          Diseño y desarrollo por Renata Sofía Arcella.
        </p>
      </div>
    </footer>
  );
}

export default Footer;