import { useState } from "react";
import { API_URL } from "../../config";

function usePostProduct() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postProduct = async (formData) => {
    setError(null);
    setLoading(true);

    try {
      // 1. Obtenemos el Token de Administrador guardado en el Login
      const token = sessionStorage.getItem("token");

      // 2. EL ADAPTADOR: traducimos los nombres de React a los de MongoDB
      const payload = {
        nombre: formData.name,
        descripcion: formData.description,
        precio: Number(formData.price),
        stock: Number(formData.quantity),
        categoria_id: formData.category, // Enviamos "AW26", "ESENCIALES" o "COMUNIDAD"
        imagen: formData.image,
        destacado: Boolean(formData.highlighted),
        estado: formData.status === "AVAILABLE",
      };

      // 3. Enviamos la petición POST protegida a /api/productos
      const response = await fetch(`${API_URL}api/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, //  El pase VIP de Administrador
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error al crear el producto: ${response.status}`);
      }

      // Devolvemos el producto con "name" para que la notificación de éxito muestre el título
      return {
        ...data,
        id: data._id,
        name: data.nombre,
      };
    } catch (error) {
      console.error("Error al crear un nuevo producto:", error);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    postProduct,
  };
}

export default usePostProduct;