import { Navigate, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import Private from "./pages/Private";
import Login from "./pages/Login/Login";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import AuthGuard from "./guards/auth.guard";
import ProductByCategory from "./components/client/ProductByCategory";
import SearchProductPage from "./components/client/SearchProductPage";
import LandingPage from "./components/landingPage/LandingPage";
import DetailProduct from "./components/detailProduct/DetailProduct";
import ShopCart from "./components/shopcart/ShopCart";

function App() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="product/:id" element={<DetailProduct/>}/>
      <Route path="shop-cart" element={<ShopCart/>}/>
      <Route path="searchproduct" element={<SearchProductPage/>}/>
      <Route path="/category/:id" element={<ProductByCategory />} />
      <Route path="/private" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
      <Route path={PublicRoutes.LOGIN} element={<Login />} />
      <Route element={<AuthGuard privateValidation={true} />}>
        <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
      </Route>
    </RoutesWithNotFound>
  );
}

export default App;
