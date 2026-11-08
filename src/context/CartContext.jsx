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

  // Función inteligente para agregar al carrito
  const addItem = (product, quantity) => {
    //Verificamos si existe AFUERA del setCart
    const itemExists = cart.find((item) => item.id === product.id);

    if (itemExists) {
      // Si ya existe, actualizamos su cantidad
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
      alert("El producto ya existe en el carrito, se sumo la cantidad 🛒");
    } else {
      // Si no existe, lo agregamos como nuevo elemento
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
      alert("Producto agregado al carrito con éxito 🎉");
    }
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

  //Si uso quantity tengo que usar el método reduce
  const getTotalItems = () => {
    return cart.reduce((acc, element) => acc + element.quantity, 0);
  };

  //Total a pagar (como usé quantity esta parte fue adaptada)
  const getCartTotal = () => {
    return cart.reduce(
      (acc, element) => acc + element.price * element.quantity,
      0,
    );
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
