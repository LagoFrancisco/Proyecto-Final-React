import { useCart } from "../../context/CartContext";
import "./Nav.css";
import { Link } from "react-router-dom";

export const Nav = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Inicio</Link>
        </li>
        <li>
          <Link to={"/cart"}>
            Carrito
            {totalItems > 0 && <span className="incart">{totalItems}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
