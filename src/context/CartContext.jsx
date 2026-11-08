import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderInFirebase } from "../services/productsService";

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
  const [isProcessing, setIsProcessing] = useState(false);

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
  const checkout = async () => {
    if (cart.length === 0) {
      alert("Elcarrito está vacío.");
      return;
    }

    const name = prompt("Nombre completo:");
    if (!name) return;
    const email = prompt("Correo electrónico:");
    if (!email) return;
    const phone = prompt("Teléfono:");
    if (!phone) return;

    // Enciendo el estado de carga justo antes de viajar a Firebase
    setIsProcessing(true);

    const orderData = {
      buyer: { name, email, phone },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: getCartTotal(),
      status: "generada",
    };

    try {
      // Envío la información a la base de datos
      const orderId = await createOrderInFirebase(orderData);
      alert(`¡Compra exitosa! Código de orden: ${orderId}`);
      clearCart(); // Vacía el carrito localmente tras el éxito
    } catch (error) {
      console.error("Error al procesar en Firestore:", error);
      alert("Error al procesar la compra.");
    } finally {
      // Apago el estado de carga pase lo que pase (éxito o error)
      setIsProcessing(false);
    }
  };

  const values = {
    cart,
    addItem,
    clearCart,
    removeItem,
    getCartTotal,
    getTotalItems,
    checkout,
    isProcessing,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
