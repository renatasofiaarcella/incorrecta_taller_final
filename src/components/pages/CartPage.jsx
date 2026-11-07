import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { API_URL } from "../../config";
import { notifySuccess, notifyError } from "../../utils/notify";

function CartPage() {
  const {
    cart,
    cartTotal,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // 1. Verificamos si hay un usuario logueado con token
    const token = sessionStorage.getItem("token");

    if (!token) {
      notifyError("Sesión requerida", "Tenés que iniciar sesión para finalizar tu compra");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      // 2. Sincronizamos las prendas de este carrito con el backend
      for (const item of cart) {
        await fetch(`${API_URL}api/carrito`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            producto: item.id,
            cantidad: item.quantityCart
          })
        });
      }

      // 3. Confirmamos la compra: el backend descuenta el stock en MongoDB
      const response = await fetch(`${API_URL}api/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo procesar la compra");
      }

      // 4. Compra confirmada
      notifySuccess(
        "¡Compra confirmada!",
        `Tu pedido fue registrado con éxito por $${cartTotal.toLocaleString("es-AR")}`
      );

      clearCart();
      navigate("/products");
    } catch (error) {
      console.error("Error al finalizar compra:", error);
      notifyError("Error en la compra", error.message || "Ocurrió un error al procesar tu pedido");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-empty">
          <p className="cart-eyebrow">Tu compra</p>

          <h1>Carrito</h1>

          <p className="cart-empty-message">
            Todavía no agregaste productos.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <header className="cart-header">
        <p className="cart-eyebrow">
          Tu compra
        </p>

        <h1>Carrito</h1>

        <p className="cart-intro">
          Revisá los productos antes de finalizar la compra.
        </p>
      </header>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((product) => (
            <article
              className="cart-item"
              key={product.id}
            >
              <div className="cart-item-image-wrapper">
                <img
                  className="cart-item-image"
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="cart-item-info">
                <p className="cart-item-category">
                  {product.category}
                </p>

                <h2 className="cart-item-name">
                  {product.name}
                </h2>

                <p className="cart-item-price">
                  Precio unitario: $
                  {product.price.toLocaleString("es-AR")}
                </p>

                <p className="cart-item-stock">
                  Stock disponible: {product.quantity}
                </p>

                <div className="cart-item-controls">
                  <div
                    className="cart-quantity"
                    aria-label={`Cantidad de ${product.name}`}
                  >
                    <button
                      type="button"
                      className="cart-quantity-button"
                      aria-label="Disminuir cantidad"
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                    >
                      −
                    </button>

                    <span className="cart-quantity-value">
                      {product.quantityCart}
                    </span>

                    <button
                      type="button"
                      className="cart-quantity-button"
                      aria-label="Aumentar cantidad"
                      disabled={
                        product.quantityCart >=
                        product.quantity
                      }
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() =>
                      removeFromCart(product.id)
                    }
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="cart-item-subtotal">
                <span>Subtotal</span>

                <strong>
                  $
                  {(
                    product.price *
                    product.quantityCart
                  ).toLocaleString("es-AR")}
                </strong>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <p className="cart-summary-eyebrow">
            Resumen
          </p>

          <h2>Resumen de compra</h2>

          <div className="cart-summary-row">
            <span>Productos</span>
            <span>{cart.length}</span>
          </div>

          <div className="cart-summary-total">
            <span>Total</span>

            <strong>
              ${cartTotal.toLocaleString("es-AR")}
            </strong>
          </div>

          <button
            type="button"
            className="cart-checkout-button"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Procesando compra..." : "Finalizar compra"}
          </button>

          <button
            type="button"
            className="cart-clear-button"
            onClick={clearCart}
            disabled={loading}
          >
            Vaciar carrito
          </button>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;