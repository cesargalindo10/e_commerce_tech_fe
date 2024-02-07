import { FaFacebook, FaGoogle, FaInstagram, FaTiktok } from "react-icons/fa";
import "./footer.css";
import { BiHome } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <section className="footer-social my-3">
        <FaFacebook />
        <FaInstagram />
        <FaTiktok />
        <FaGoogle />
      </section>

      <div className="footer-container">
        <section className="footer-links">
          <h4>Enlaces</h4>
          <ul>
            <li>
              <Link to={"/search"}>Buscar</Link>
            </li>
            <li>
              <Link to={"/shop-cart"}>Pedidos</Link>
            </li>

            <li>
              <Link to="#">Términos y Condiciones</Link>
            </li>
          </ul>
        </section>
        <section className="footer-contact">
          <h4>Contacto</h4>
          <div>
            <BiHome />
            <p>Av. San Martín 123, Lima 123</p>
          </div>
          <div>
            <MdEmail />
            <p>sedeelec@hotmail.com</p>
          </div>
          <div>
            <PiPhone />
            <p>+51 999 999 999</p>
          </div>
        </section>
      </div>
      <section className="footer-copyright mt-3">
        <p>© 2024. Todos los derechos reservados.</p>
      </section>
    </footer>
  );
}

export default Footer;
