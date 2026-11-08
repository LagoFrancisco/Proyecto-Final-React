import { useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import "./Nav.css";
import { Link } from "react-router-dom";

export const Nav = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  //Cierra el menú se clickeo afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Inicio</Link>
        </li>

        {/* Despegable*/}
        <li className="dropdown" ref={dropdownRef}>
          <span className="dropdown-btn" onClick={() => setOpen(!open)}>
            Categorías {open ? "🔼" : "🔽"}
          </span>
          {open && (
            <ul className="dropdown-menu">
              <li>
                <Link to={"/category/fuentes"} onClick={() => setOpen(false)}>
                  Fuentes
                </Link>
              </li>
              <li>
                <Link
                  to={"/category/osciloscopios"}
                  onClick={() => setOpen(false)}
                >
                  Osciloscopios
                </Link>
              </li>
              <li>
                <Link
                  to={"/category/instrumentos de medición"}
                  onClick={() => setOpen(false)}
                >
                  Instrumentos de medición
                </Link>
              </li>
              <li>
                <Link
                  to={"/category/instrumentos de medición de gases"}
                  onClick={() => setOpen(false)}
                >
                  Gases
                </Link>
              </li>

              <li>
                <Link
                  to={"/"}
                  onClick={() => setOpen(false)}
                  
                >
                  ⬅️ Ver todos / Menú Principal
                </Link>
              </li>
            </ul>
          )}
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
