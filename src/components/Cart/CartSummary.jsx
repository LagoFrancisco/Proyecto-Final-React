import { useCart } from "../../context/CartContext";

export const CartSummary = () => {
  const { getCartTotal, checkout, getTotalItems } = useCart();

  const total = getCartTotal();
  const totalUnits = getTotalItems();

  return (
    <>
      <p className="cart-summary-text">TOTAL A PAGAR:👉 $ {total} </p>
      <p className="cart-summary-sub-text">
        Cantidad total: {totalUnits} {totalUnits === 1 ? "unidad" : "unidades"}
      </p>
      <button className="btn bg-success primary" onClick={checkout}>
        FINALIZAR COMPRA
      </button>
    </>
  );
};
