import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import useAuth from "../hooks/user/useAuth";
import useDeleteProduct from "../hooks/products/useDeleteProduct";
import {
  confirmAction,
  notifyError,
  notifySuccess,
} from "../utils/notify";

function ProductCard({ product, onProductDeleted }) {
  const { addToCart } = useContext(CartContext);
  const { isAdmin } = useAuth();
  const { deleteProduct, loading } = useDeleteProduct();

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/products/edit/${product.id}`);
  };

  const handleDelete = async () => {
    const confirmed = await confirmAction(
      `¿Eliminar "${product.name}"?`,
      "Esta acción eliminará el producto.",
      "Sí, eliminar"
    );

    if (!confirmed) return;

    const success = await deleteProduct(product.id);

    if (success) {
      notifySuccess(
        "Producto eliminado",
        `${product.name} se eliminó correctamente`
      );

      if (onProductDeleted) {
        onProductDeleted(product.id);
      }
    } else {
      notifyError(
        "No se pudo eliminar",
        "Ocurrió un error al eliminar el producto"
      );
    }
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {product.quantity === 0 && (
          <span className="product-stock-badge">
            SIN STOCK
          </span>
        )}
      </div>

      <div className="product-card-content">
        <p className="product-category">
          {product.category}
        </p>

        <h3 className="product-name">
          {product.name}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <h4 className="product-price">
          ${product.price.toLocaleString("es-AR")}
        </h4>

        <button
          className="btn-product"
          type="button"
          onClick={() => addToCart(product)}
          disabled={product.quantity === 0}
        >
          {product.quantity === 0
            ? "Sin stock"
            : "Agregar al carrito"}
        </button>

        {isAdmin && (
          <div className="product-admin-actions">
            <button
              className="btn-product-admin btn-product-edit"
              type="button"
              onClick={handleEdit}
            >
              Editar
            </button>

            <button
              className="btn-product-admin btn-product-delete"
              type="button"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductCard;