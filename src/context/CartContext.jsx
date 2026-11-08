import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ------------------------------------------------------------ */
/*                        CREAMOS CONTEXTO                      */
/* ------------------------------------------------------------ */
const CartContext = createContext();

/* ------------------------------------------------------------ */
/*                           CUSTOM HOOK                        */
/* ------------------------------------------------------------ */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

/* ------------------------------------------------------------ */
/*                             PROVEEDOR                        */
/* ------------------------------------------------------------ */
export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  //Averiguar si hay existencia en el carrito
  const isInCart = (item) => {
    const inCart = cart.some((element) => element.id === item.id);
    return inCart;
  };
  //Agregar al carrito (no permite los duplicados de producto)
  const addItem = (item) => {
    if (isInCart(item)) {
      alert("El producto ya existe en el carrito");
      return;
    }
    //Forma funcional "prev"
    //setCert(prev => [...prev, item])
    setCart([...cart, item]);
    alert("Producto agregado al carrito 🎉");
  };

  //Eliminar del carrito
  const removeItem = (id) => {
    const updatedCart = cart.filter((element) => element.id !== id);
    setCart(updatedCart);
    alert("Producto eliminado ✅");

    //Foma funcional "prev"
    //setCart((prev) => prev.filter((element) => element.id !== id));
  };

  //Vacia el carrito
  const clearCart = () => {
    setCart([]);
  };

  //Total de items en carrito (para este caso sin quantity)
  //Si uso quantity tengo que usar el método reduce
  const getTotalItems = () => {
    return cart.length;
  };

  //Total a pagar (si usé quantity esta parte la tengo que adaptar)
  const getCartTotal = () => {
    return cart.reduce((acc, element) => acc + element.price, 0);
  };

  //Checkout
  const checkout = () => {
    alert("Su compra ha sido realizada 🎉");
    clearCart();
    navigate("/");
  };

  const values = {
    cart,
    addItem,
    clearCart,
    removeItem,
    getCartTotal,
    getTotalItems,
    checkout,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
