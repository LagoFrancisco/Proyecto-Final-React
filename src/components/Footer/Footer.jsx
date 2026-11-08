import "./Footer.css";
import facebook from "../../assets/logo-facebook.png";
import social from "../../assets/social.png";
import whatsapp from "../../assets/whatsapp.png";

export const Footer = () => {
  return (
    <footer>
      <div>
        <p>©️ Todos los derechos reservados.</p>
        <p>Sitio realizado por Francisco Lago para Tienda de Electrónica.</p>
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <a
              href="https://wa.me/5491137577718"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={whatsapp} alt="Whatsapp" />
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/@francisco.lago.94"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="Facebook" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/francisco.lago05"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={social} alt="Instagram" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
