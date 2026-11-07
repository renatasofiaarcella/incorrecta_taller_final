import { useState } from "react";
import { API_URL } from "../../config";

function usePatchProduct() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const patchProduct = async (formData, productId) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Error al editar el producto: ${response.status}`
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    patchProduct,
    error,
    loading,
  };
}

export default usePatchProduct;