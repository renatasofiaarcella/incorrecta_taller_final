import { useState } from "react";
import { API_URL } from "../../config";

function useDeleteUser() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteUser = async (userId) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deletedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error al eliminar el usuario: ${response.status}`
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUser,
    error,
    loading,
  };
}

export default useDeleteUser;