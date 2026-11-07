import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";

import useAuth from "../../hooks/user/useAuth";
import { CartContext } from "../../context/CartContext";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa";

function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { cartQuantity } = useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((currentState) => !currentState);
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Navegación principal">
        <NavLink
          to="/"
          className="navbar-logo-link"
          onClick={handleCloseMenu}
        >
          <img
            className="logo"
            src="/logo-blanco.jpg"
            alt="Logo de la marca"
          />
        </NavLink>

        <button
          className="navbar-toggle"
          type="button"
          onClick={handleToggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div
          id="navbar-menu"
          className={`navbar-menu ${isMenuOpen ? "navbar-menu--open" : ""}`}
        >
          <ul className="navbar-links">
            <li>
              <NavLink to="/" onClick={handleCloseMenu}>
                INICIO
              </NavLink>
            </li>

            <li>
              <NavLink to="/aw26" onClick={handleCloseMenu}>
                AW 26
              </NavLink>
            </li>

            <li>
              <NavLink to="/Nosotros" onClick={handleCloseMenu}>
                NOSOTROS
              </NavLink>
            </li>

            <li>
              <NavLink to="/comunidad" onClick={handleCloseMenu}>
                COMUNIDAD
              </NavLink>
            </li>

            <li>
              <NavLink to="/products" onClick={handleCloseMenu}>
                SHOP
              </NavLink>
            </li>

            <li>
              <NavLink to="/cart" onClick={handleCloseMenu}>
                CARRITO ({cartQuantity})
              </NavLink>
            </li>

            {!isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/user/login" onClick={handleCloseMenu}>
                    LOGIN
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/user/register" onClick={handleCloseMenu}>
                    REGISTRO
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="navbar-user">
                  <span>Hola, {user?.name}</span>
                </li>

                {isAdmin && (
                  <li>
                    <NavLink to="/admin/users" onClick={handleCloseMenu}>
                      PANEL ADMIN
                    </NavLink>
                  </li>
                )}

                <li>
                  <button
                    className="navbar-logout"
                    type="button"
                    onClick={handleLogout}
                  >
                    CERRAR SESIÓN
                  </button>
                </li>
              </>
            )}
          </ul>

          <div className="redes">
            <a href= "https://www.instagram.com/incorrectataller?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
              <FaInstagram />
            </a>

            <a href="https://incorrecta.empretienda.com.ar/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnCpfLfr7iRs23abMq93avR3I0A-dzqU5E0uKK_GKJXIKD6TbQax8Gr5zgEeY_aem_eljX32wAOcbrBktmi-A6Dw&utm_id=97760_v0_s00_e0_tv3">
              <FaWhatsapp /> 
            </a>

            <a href= "https://www.facebook.com/incorrectataller/">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;