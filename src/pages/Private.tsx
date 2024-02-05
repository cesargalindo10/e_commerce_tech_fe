import { Route } from "react-router-dom";
import Sidebar from "../shared/sidebar/Sidebar";
import Header from "../shared/header/Header";
import RoutesWithNotFound from "../utilities/RoutesWithNotFound";
import { Product } from "../components/product/Product";
import Category from "../components/category/Category";
import { Sale } from "../components/sale/Sale";
import UserCrud from "../components/user/UserCrud";


export default function Dashboard() {
  return (
    <Sidebar>
      <Header>
        <RoutesWithNotFound>
          <Route path="/products" element={<Product />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/users" element={<UserCrud />} />
          <Route path="/ventas" element={<Sale />} />
        </RoutesWithNotFound>
      </Header>
    </Sidebar>
  );
}
