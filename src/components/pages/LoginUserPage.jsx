import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../../hooks/user/useLoginUser";
import useAuth from "../../hooks/user/useAuth";

function LoginUserPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const { loginUser } = useLoginUser();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userFound = await loginUser(
      form.email,
      form.password
    );

    if (userFound) {
      login(userFound);

      setForm({
        email: "",
        password: "",
      });

      alert(`Bienvenido/a, ${userFound.name}`);
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <p className="auth-eyebrow">
            Mi cuenta
          </p>

          <h1>Iniciar sesión</h1>

          <p className="auth-intro">
            Ingresá con tu email y contraseña para acceder a tu cuenta.
          </p>
        </header>

        <form
          className="auth-form"
          onSubmit={handleFormSubmit}
        >
          <div className="auth-field">
            <label
              htmlFor="email"
              className="form-label"
            >
              Email
            </label>

            <input
              className="form-control"
              onChange={handleInputChange}
              value={form.email}
              type="email"
              required
              name="email"
              id="email"
              autoComplete="email"
              placeholder="nombre@ejemplo.com"
            />
          </div>

          <div className="auth-field">
            <label
              htmlFor="password"
              className="form-label"
            >
              Contraseña
            </label>

            <input
              className="form-control"
              onChange={handleInputChange}
              value={form.password}
              type="password"
              required
              name="password"
              id="password"
              autoComplete="current-password"
              placeholder="Ingresá tu contraseña"
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginUserPage;