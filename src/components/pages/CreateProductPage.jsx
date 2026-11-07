import { useState } from "react";
import { useNavigate } from "react-router-dom";

import usePostProduct from "../../hooks/products/usePostProduct";
import { notifySuccess, notifyError } from "../../utils/notify";

const initialForm = {
  name: "",
  image: "",
  description: "",
  price: 0,
  quantity: 1,
  category: "AW26",
  status: "AVAILABLE",
  highlighted: false,
};

function CreateProductPage() {
  const [form, setForm] = useState(initialForm);

  const navigate = useNavigate();

  const { error, loading, postProduct } = usePostProduct();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleFormReset = () => {
    setForm(initialForm);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const success = await postProduct(form);

    if (success) {
      await notifySuccess(
        "Producto creado",
        `${success.name} se agregó correctamente`
      );

      setForm(initialForm);
      navigate("/products");
    } else {
      notifyError(
        "No se pudo crear el producto",
        error?.message || "Ocurrió un error inesperado"
      );
    }
  };

    return (
        <section className="product-form-page">
            <div className="product-form-container">
            <header className="product-form-header">
                <p className="product-form-eyebrow">
                Panel administrador
                </p>

                <h1>Crear producto</h1>

                <p className="product-form-intro">
                Completá la información necesaria para incorporar un nuevo
                producto a la tienda.
                </p>
            </header>

            <form
                className="product-form"
                onSubmit={handleFormSubmit}
            >
                <div className="product-form-grid">
                <div className="product-form-field">
                    <label htmlFor="name" className="form-label">
                    Nombre del producto
                    </label>

                    <input
                    className="form-control"
                    onChange={handleInputChange}
                    value={form.name}
                    type="text"
                    required
                    name="name"
                    id="name"
                    />
                </div>

                <div className="product-form-field">
                    <label htmlFor="image" className="form-label">
                    URL de la imagen
                    </label>

                    <input
                    className="form-control"
                    onChange={handleInputChange}
                    value={form.image}
                    type="text"
                    required
                    name="image"
                    id="image"
                    placeholder="/assets/aw26/buso4.jpg"
                    />
                </div>

                <div className="product-form-field product-form-field--full">
                    <label htmlFor="description" className="form-label">
                    Descripción
                    </label>

                    <textarea
                    className="form-control"
                    onChange={handleInputChange}
                    value={form.description}
                    required
                    name="description"
                    id="description"
                    rows="5"
                    />
                </div>

                <div className="product-form-field">
                    <label htmlFor="price" className="form-label">
                    Precio
                    </label>

                    <input
                    className="form-control"
                    onChange={handleInputChange}
                    value={form.price}
                    type="number"
                    min="0"
                    required
                    name="price"
                    id="price"
                    />
                </div>

                <div className="product-form-field">
                    <label htmlFor="quantity" className="form-label">
                    Stock
                    </label>

                    <input
                    className="form-control"
                    onChange={handleInputChange}
                    value={form.quantity}
                    type="number"
                    min="0"
                    required
                    name="quantity"
                    id="quantity"
                    />
                </div>

                <div className="product-form-field">
                    <label htmlFor="category" className="form-label">
                    Categoría
                    </label>

                    <select
                    className="form-select"
                    onChange={handleInputChange}
                    value={form.category}
                    name="category"
                    id="category"
                    >
                    <option value="AW26">AW26</option>
                    <option value="ESENCIALES">ESENCIALES</option>
                    <option value="COMUNIDAD">COMUNIDAD</option>
                    </select>
                </div>

                <div className="product-form-field">
                    <label htmlFor="status" className="form-label">
                    Estado
                    </label>

                    <select
                    className="form-select"
                    onChange={handleInputChange}
                    value={form.status}
                    name="status"
                    id="status"
                    >
                    <option value="AVAILABLE">Disponible</option>
                    <option value="UNAVAILABLE">No disponible</option>
                    </select>
                </div>

                <div className="product-form-field product-form-field--full">
                    <div className="product-form-check">
                    <input
                        className="form-check-input"
                        onChange={handleInputChange}
                        checked={form.highlighted}
                        type="checkbox"
                        name="highlighted"
                        id="highlighted"
                    />

                    <label
                        htmlFor="highlighted"
                        className="form-check-label"
                    >
                        Producto destacado
                    </label>
                    </div>
                </div>
                </div>

                {error && (
                <p className="product-form-error" role="alert">
                    {error.message || "Error al crear el producto"}
                </p>
                )}

                <div className="product-form-actions">
                <button
                    type="submit"
                    className="product-form-submit"
                    disabled={loading}
                >
                    {loading ? "Creando..." : "Crear producto"}
                </button>

                <button
                    type="button"
                    className="product-form-reset"
                    onClick={handleFormReset}
                    disabled={loading}
                >
                    Limpiar formulario
                </button>
                </div>
            </form>
            </div>
        </section>

    );
  
}

export default CreateProductPage;