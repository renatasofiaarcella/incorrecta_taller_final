import { useState } from "react";
import { API_URL } from "../../config";

function useDeleteProduct() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteProduct = async (productId) => {
    setError(null);
    setLoading(true);

    try {
      // 1. Obtenemos el Token de Administrador guardado en el Login
      const token = sessionStorage.getItem("token");

      // 2. Extraemos el ID limpio
      const id = typeof productId === "object"
        ? (productId?._id || productId?.id)
        : productId;

      // 3.  URL BLINDADA: limpia barras sobrantes y evita que se duplique "api"
      let cleanBase = String(API_URL).trim().replace(/\/+$/, "");
      const endpoint = cleanBase.endsWith("/api")
        ? `${cleanBase}/productos/${id}`
        : `${cleanBase}/api/productos/${id}`;

      console.log("🔗 Intentando eliminar en la URL:", endpoint);

      // 4. Enviamos la petición DELETE protegida
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // El pase de Administrador
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data.error || `Error al eliminar el producto: ${response.status}`
        );
      }

      return true;
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteProduct,
    error,
    loading,
  };
}

export default useDeleteProduct;