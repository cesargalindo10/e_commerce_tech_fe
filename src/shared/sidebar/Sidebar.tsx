import { ReactNode, useState } from "react";
import logo from "../../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import {  MdInsertInvitation } from "react-icons/md";
import { HiUsers, HiOutlineDocumentReport } from "react-icons/hi";
import { BsInfoSquareFill } from "react-icons/bs";
import { TbParking } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import { AppStore } from "../../redux/store";

interface Props {
  children: ReactNode;
}
const Sidebar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const permission = useSelector((state: AppStore) => state.user);
  const icons = {
    productos: <TbParking />,
    categories: <BsInfoSquareFill />,
    users: <HiUsers />,
    products: <MdInsertInvitation />,
    ventas: <HiOutlineDocumentReport />,
  };

  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "260px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            <img style={{ height: "120px" }} src={logo} />
          </h1>
          <div className="container-bars">
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars "
            >
              <FaBars style={{ color: "#000000" }} onClick={toggle} />
            </div>
          </div>
        </div>
        {Object.entries(permission.permissions).map(([clave, item]) => (
          <NavLink
            to={item}
            key={clave}
            className="link"
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
