import { RowImage } from "../rowImage/RowImage";
import logo from "../../assets/img/logo.png";
import { BiSearch } from "react-icons/bi";
import { PiShoppingCart } from "react-icons/pi";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
function Header() {
  const cartList = useSelector((store: AppStore) => store.shop);
  return (
    <header className="header-landing">
      <Link className="header-logo" to={"/"}>
        <RowImage url_image={logo} width={80} />
        <h2>Sedelec</h2>
      </Link> 
      <div className="header-icons">
        <Link to={"/searchproduct"} className="header-icons-cart">
          <BiSearch size={20} />
        </Link>
        <Link to={"/shop-cart"} className="header-icons-cart">
          <PiShoppingCart size={20} />
          <span>{cartList.length}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
