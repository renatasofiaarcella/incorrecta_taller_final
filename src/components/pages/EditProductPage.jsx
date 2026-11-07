import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import usePatchProduct from "../../hooks/products/usePatchProduct";
import useGetProductById from "../../hooks/products/useGetProductById";
import { notifyError, notifySuccess } from "../../utils/notify";

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

function EditProductPage() {
  const [form, setForm] = useState(initialForm);

  const {
    error: patchError,
    loading: patchLoading,
    patchProduct,
  } = usePatchProduct();

  const {
    error: getByIdError,
    loading: productLoading,
    getProductById,
  } = useGetProductById();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      const product = await getProductById(id);

      if (product) {
        setForm({
          name: product.name || "",
          image: product.image || "",
          description: product.description || "",
          price: product.price || 0,
          quantity: product.quantity || 0,
          category: product.category || "AW26",
          status: product.status || "AVAILABLE",
          highlighted: product.highlighted || false,
        });
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const success = await patchProduct(form, id);

    if (success) {
      await notifySuccess(
        "Producto actualizado",
        `${success.name || form.name} se modificó correctamente`
      );

      navigate("/products");
    } else {
      notifyError(
        "No se pudo editar el producto",
        patchError?.message || "Ocurrió un error inesperado"
      );
    }
  };

  if (productLoading) {
    return <h2>Cargando producto...</h2>;
  }

  if (getByIdError) {
    return (
      <p>
        {getByIdError.message ||
          "No se pudo cargar el producto"}
      </p>
    );
  }

  return (
    <div
      className="container my-4"
      style={{ maxWidth: "600px" }}
    >
      <h1>Editar producto</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
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

        <div className="mb-3">
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
          />
        </div>

        {form.image && (
          <div className="mb-3">
            <h4>Vista previa</h4>

            <img
              style={{
                width: "300px",
                maxWidth: "100%",
              }}
              src={form.image}
              alt={form.name || "Vista previa"}
            />
          </div>
        )}

        <div className="mb-3">
          <label
            htmlFor="description"
            className="form-label"
          >
            Descripción
          </label>

          <textarea
            className="form-control"
            onChange={handleInputChange}
            value={form.description}
            required
            name="description"
            id="description"
            rows="4"
          />
        </div>

        <div className="mb-3">
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

        <div className="mb-3">
          <label
            htmlFor="quantity"
            className="form-label"
          >
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

        <div className="mb-3">
          <label
            htmlFor="category"
            className="form-label"
          >
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
            <option value="ESENCIALES">
              ESENCIALES
            </option>
            <option value="COMUNIDAD">COMUNIDAD</option>
          </select>
        </div>

        <div className="mb-3">
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
            <option value="UNAVAILABLE">
              No disponible
            </option>
          </select>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            onChange={handleInputChange}
            checked={form.highlighted}
            type="checkbox"
            name="highlighted"
            id="highlighted"
          />

          <label
            className="form-check-label"
            htmlFor="highlighted"
          >
            Producto destacado
          </label>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={patchLoading}
        >
          {patchLoading
            ? "Guardando..."
            : "Guardar cambios"}
        </button>

        {patchError && (
          <p className="text-danger mt-3">
            {patchError.message ||
              "Error al editar el producto"}
          </p>
        )}
      </form>
    </div>
  );
}

export default EditProductPage;