import { Item } from "../Item/Item";
import "./ItemDetail.css";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

export const ItemDetail = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddItem = () => {
    addItem(Item, quantity);
    setQuantity(1);
    alert(`${quantity} productos(s) agregado(s) al carrito.`);
  };
  return (
    <div className="detail-wrapper">
      <Item {...item}>
        <div className="selector-cantidad">
          <button className="btn-decrement" onClick={decrement}>
            -
          </button>
          <span className="selector-cantidad">{quantity}</span>
          <button className="btn-increment" onClick={increment}>
            +
          </button>
        </div>
        <button
          className="btn bg-primary primary"
          onClick={() => addItem(item, quantity)}
        >
          Agregar al carrito
        </button>
      </Item>
    </div>
  );
};
