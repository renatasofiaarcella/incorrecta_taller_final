import { useState } from "react";
import { API_URL } from "../../config";

function useGetProductById() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProductById = async (productId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_URL}products/${productId}`
      );

      if (!response.ok) {
        throw new Error(
          `Error al obtener el producto: ${response.status}`
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
    getProductById,
    error,
    loading,
  };
}

export default useGetProductById;