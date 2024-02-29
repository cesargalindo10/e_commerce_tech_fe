import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import "./footer.css";
import { BiHome } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { LuMapPin } from "react-icons/lu";
function Footer() {
  return (
    <footer className="footer">
      <section className="footer-social my-3">
        <Link to={"https://www.facebook.com/sedeelec"} target="_blank">
         <FaFacebook />
        </Link>
        <Link to={'https://www.instagram.com/servicios_de_electrotecnia/'}>
         <FaInstagram />
        </Link>
        <Link to={'https://www.tiktok.com/@sedeelec?lang=es'}>
          <FaTiktok />
        </Link>
        <Link to={'https://maps.app.goo.gl/4TjpCaDobm1wW9rMA'}>
          <LuMapPin />
        </Link>
      </section>

      <div className="footer-container">
        <section className="footer-links">
          <h4>Enlaces</h4>
          <ul>
            <li>
              <Link to={"/searchproduct"}>Buscar</Link>
            </li>
            <li>
              <Link to={"/shop-cart"}>Pedidos</Link>
            </li>

            {/* <li>
              <Link to="#">Términos y Condiciones</Link>
            </li> */}
          </ul>
        </section>
        <section className="footer-contact">
          <h4>Contacto</h4>
          <div>
            <BiHome />
            <p>Av. Villazon km 5</p>
          </div>
          <div>
            <MdEmail />
            <p>sedeelec@hotmail.com</p>
          </div>
          <div>
            <PiPhone />
            <p>+591 79342271</p>
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
