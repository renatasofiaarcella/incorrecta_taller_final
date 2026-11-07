import { useState } from "react";
import { notifySuccess } from "../../utils/notify";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function Comunidad() {
  const [form, setForm] = useState(initialForm);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Datos del formulario:", form);

    notifySuccess(
      "Mensaje enviado",
      `Gracias por contactarnos, ${form.name}.`
    );

    setForm(initialForm);
  };

  const handleReset = () => {
    setForm(initialForm);
  };

  return (
    <section className="contact-page">
      <div className="contact-card">
        <header className="contact-header">
          <p className="contact-eyebrow">
            Comunidad
          </p>

          <h1>Contacto</h1>

          <p className="contact-intro">
            Escribinos para conocer más sobre la marca, colaboraciones o
            disponibilidad de productos.
          </p>
        </header>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="contact-field">
            <label
              htmlFor="name"
              className="form-label"
            >
              Nombre
            </label>

            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
              autoComplete="name"
              placeholder="Ingresá tu nombre"
            />
          </div>

          <div className="contact-field">
            <label
              htmlFor="email"
              className="form-label"
            >
              Email
            </label>

            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
              placeholder="nombre@ejemplo.com"
            />
          </div>

          <div className="contact-field">
            <label
              htmlFor="message"
              className="form-label"
            >
              Mensaje
            </label>

            <textarea
              className="form-control"
              id="message"
              name="message"
              value={form.message}
              onChange={handleInputChange}
              rows="6"
              required
              placeholder="Contanos en qué podemos ayudarte"
            />
          </div>

          <div className="contact-actions">
            <button
              type="submit"
              className="contact-submit"
            >
              Enviar mensaje
            </button>

            <button
              type="button"
              className="contact-reset"
              onClick={handleReset}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Comunidad;