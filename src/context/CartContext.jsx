import { createContext, useEffect, useState } from "react";

const CART_KEY = "cart";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem(CART_KEY);

    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.find(
        (item) => item.id === product.id
      );

      if (productExists) {         //aca reviso el stock
        return prevCart.map((item) =>
          item.id === product.id &&
          item.quantityCart < item.quantity
            ? {
                ...item,
                quantityCart: item.quantityCart + 1,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantityCart: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantityCart < item.quantity
          ? {
              ...item,
              quantityCart: item.quantityCart + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantityCart: item.quantityCart - 1,
              }
            : item
        )
        .filter((item) => item.quantityCart > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartQuantity = cart.reduce(
    (total, item) => total + item.quantityCart,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantityCart,
    0
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartQuantity,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}