import { Nav } from "../Nav/Nav";
import logo from "../../assets/image.png";
import "./Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to={"/"}>
          <img src={logo} alt="logo tienda de electronica" />
          <span>Tienda de Electronica</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
};
