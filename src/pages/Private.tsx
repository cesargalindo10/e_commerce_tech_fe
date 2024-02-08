import { Route } from "react-router-dom";
import Sidebar from "../shared/sidebar/Sidebar";
import RoutesWithNotFound from "../utilities/RoutesWithNotFound";
import { Product } from "../components/product/Product";
import Category from "../components/category/Category";
import { Sale } from "../components/sale/Sale";
import UserCrud from "../components/user/UserCrud";
import HeaderAdmin from "../shared/headerAdmin/HeaderAdmin";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  return (
    <Sidebar>
      <HeaderAdmin>
        <RoutesWithNotFound>
          <Route path="/productos" element={<Product />} />
          <Route path="/categorias" element={<Category />} />
          <Route path="/usuarios" element={<UserCrud />} />
          <Route path="/ventas" element={<Sale />} />
        </RoutesWithNotFound>
      </HeaderAdmin>
      <Toaster />
    </Sidebar>
  );
}
