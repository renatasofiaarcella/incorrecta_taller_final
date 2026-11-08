import { useState } from "react";
import { useNavigate } from "react-router-dom";

import usePostProduct from "../../hooks/products/usePostProduct";
import { notifySuccess, notifyError } from "../../utils/notify";
import { uploadProductImage } from "../../utils/supabaseClient";

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

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

  // Manejar la selección de archivo de imagen
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Creamos una vista previa inmediata para que el admin la vea
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormReset = () => {
    setForm(initialForm);
    setImageFile(null);
    setImagePreview("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalImageUrl = form.image;

      // 1. Si el usuario eligió un archivo de su computadora, lo subimos a Supabase
      if (imageFile) {
        setUploadingImage(true);
        finalImageUrl = await uploadProductImage(imageFile);
        setUploadingImage(false);
      }

      if (!finalImageUrl) {
        notifyError("Falta la imagen", "Por favor seleccioná una imagen para el producto.");
        return;
      }

      // 2. Enviamos el producto con la URL de Supabase a nuestra API
      const productPayload = {
        ...form,
        image: finalImageUrl,
      };

      const success = await postProduct(productPayload);

      if (success) {
        await notifySuccess(
          "Producto creado",
          `${success.name || form.name} se agregó correctamente a la tienda.`
        );

        handleFormReset();
        navigate("/products");
      } else {
        notifyError(
          "No se pudo crear el producto",
          error?.message || "Ocurrió un error inesperado"
        );
      }
    } catch (err) {
      setUploadingImage(false);
      notifyError("Error al subir imagen", err.message);
    }
  };

  return (
    <section className="product-form-page">
      <div className="product-form-container">
        <header className="product-form-header">
          <p className="product-form-eyebrow">Panel administrador</p>
          <h1>Crear producto</h1>
          <p className="product-form-intro">
            Completá la información necesaria para incorporar un nuevo producto a la tienda.
          </p>
        </header>

        <form className="product-form" onSubmit={handleFormSubmit}>
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
                placeholder="Ej. Buzo Oversize"
              />
            </div>

            {/* SECCIÓN DE IMAGEN CON SUPABASE */}
            <div className="product-form-field">
              <label htmlFor="imageFile" className="form-label">
                Foto del producto (Subir archivo)
              </label>
              <input
                className="form-control"
                type="file"
                id="imageFile"
                accept="image/*"
                onChange={handleFileChange}
              />

              {imagePreview && (
                <div style={{ marginTop: "10px" }}>
                  <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "4px" }}>
                    Vista previa:
                  </p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxHeight: "120px",
                      borderRadius: "6px",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}
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
                rows="4"
              />
            </div>

            <div className="product-form-field">
              <label htmlFor="price" className="form-label">
                Precio ($)
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
                Stock (Cantidad)
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
                <label htmlFor="highlighted" className="form-check-label">
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
              disabled={loading || uploadingImage}
            >
              {uploadingImage
                ? "Subiendo foto a Supabase..."
                : loading
                  ? "Guardando producto..."
                  : "Crear producto"}
            </button>

            <button
              type="button"
              className="product-form-reset"
              onClick={handleFormReset}
              disabled={loading || uploadingImage}
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