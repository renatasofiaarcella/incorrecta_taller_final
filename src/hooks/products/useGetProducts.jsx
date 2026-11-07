import { useEffect, useState } from "react";
import { API_URL } from "../../config.js";

function useGetProducts() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Apuntamos a la ruta real de tu backend: /api/productos
      const response = await fetch(`${API_URL}api/productos`);

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: no se pudieron obtener los productos`
        );
      }

      const data = await response.json();

      // 2. EL ADAPTADOR: Traducimos de MongoDB a lo que espera React
      const productosAdaptados = data.map((item) => ({
        id: item._id,
        name: item.nombre,
        description: item.descripcion,
        price: item.precio,
        category: item.categoria_id?.nombre || "Sin categoría",
        stock: item.stock,
        quantity: item.stock, // 👈 ¡Para que el botón y el cartel 'Sin stock' funcionen!
        image: item.imagen,   // 👈 ¡Para la foto!
      }));

      // Guardamos la lista lista para usar
      setProducts(productosAdaptados);
    } catch (error) {
      console.error(error);
      setError(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    error,
    loading,
    refetch: getProducts,
  };
}

export default useGetProducts;