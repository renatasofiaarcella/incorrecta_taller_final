import { useState } from "react";

import useRegisterUser from "../../hooks/user/useRegisterUser";
import useAuth from "../../hooks/user/useAuth";
import {
  notifyError,
  notifySuccess,
} from "../../utils/notify";

const initialForm = {
  email: "",
  name: "",
  password: "",
  role: "cliente",
};

function RegisterUserPage() {
  const [form, setForm] = useState(initialForm);

  const { registerUser } = useRegisterUser();
  const { isAdmin } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormReset = () => {
    setForm(initialForm);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const success = await registerUser(form);

    if (success) {
      setForm(initialForm);

      notifySuccess(
        "Usuario registrado",
        `La cuenta de ${success.name} se creó correctamente`
      );
    } else {
      notifyError(
        "No se pudo registrar",
        "Ocurrió un error al crear la cuenta"
      );
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <p className="auth-eyebrow">
            Crear cuenta
          </p>

          <h1>Registrar usuario</h1>

          <p className="auth-intro">
            Completá tus datos para crear una cuenta en la tienda.
          </p>
        </header>

        <form
          className="auth-form"
          onSubmit={handleFormSubmit}
        >
          <div className="auth-field">
            <label
              htmlFor="name"
              className="form-label"
            >
              Nombre de usuario
            </label>

            <input
              className="form-control"
              onChange={handleInputChange}
              value={form.name}
              type="text"
              required
              name="name"
              id="name"
              autoComplete="name"
              placeholder="Ingresá tu nombre"
            />
          </div>

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
              autoComplete="new-password"
              placeholder="Creá una contraseña"
            />
          </div>

          {isAdmin && (
            <div className="auth-field">
              <label
                htmlFor="role"
                className="form-label"
              >
                Rol
              </label>

              <select
                className="form-select"
                onChange={handleInputChange}
                value={form.role}
                name="role"
                id="role"
              >
                <option value="cliente">
                  Cliente
                </option>

                <option value="admin">
                  Administrador
                </option>
              </select>
            </div>
          )}

          <div className="auth-actions">
            <button
              type="submit"
              className="auth-submit"
            >
              Registrar usuario
            </button>

            <button
              type="button"
              className="auth-reset"
              onClick={handleFormReset}
            >
              Limpiar formulario
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterUserPage;