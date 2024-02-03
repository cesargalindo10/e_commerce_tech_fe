import { Route } from "react-router-dom";
import Category from "../../components/category/Category";
import { Product } from "../../components/product/Product";
import Header from "../../shared/header/Header";
import Sidebar from "../../shared/sidebar/Sidebar";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound";

export default function Dashboard() {
  return (
    <Sidebar>
      <Header>
        <RoutesWithNotFound>
          <Route path="/products" element={<Product />} />
          <Route path="categories" element={<Category />} />
        </RoutesWithNotFound>
      </Header>
    </Sidebar>
  );
}