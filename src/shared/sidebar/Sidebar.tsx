import { ReactNode, useState } from "react";
import logo from "../../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { HiUsers, HiOutlineDocumentReport } from "react-icons/hi";
import { TbParking } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import { AppStore } from "../../redux/store";
import { RowImage } from "../rowImage/RowImage";
import { BiCategory } from "react-icons/bi";

interface Props {
  children: ReactNode;
}
const Sidebar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const permission = useSelector((state: AppStore) => state.user.user);
  const icons = {
    productos: <TbParking />,
    categorias: <BiCategory />,
    usuarios: <HiUsers />,
    ventas: <HiOutlineDocumentReport />,
  };

  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "260px" : "50px" }} className="sidebar">
        <div className="top_section">
          <div style={{ display: isOpen ? "block" : "none" }} className="logo-side">
            <RowImage url_image={logo} width={85} height={85} />
          </div>
          <div className="container-bars">
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars "
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
        </div>
        {Object.entries(permission.permissions).map(([clave, item]) => (
          <NavLink
            to={item}
            key={clave}
            className="link-side"
            //activeclassname="active"
          >
            <div className="icon">{icons[item]}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
