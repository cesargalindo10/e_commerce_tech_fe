import { Navigate, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import AuthGuard from "./guards/auth.guard";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import('./components/landingPage/LandingPage'))
const Private = lazy(() => import('./pages/Private'))
const DetailProduct = lazy(() => import('./components/detailProduct/DetailProduct'))
const ShopCart = lazy(() => import('./components/shopcart/ShopCart'))
const SearchProductPage = lazy(() => import('./components/client/SearchProductPage'))
const ProductByCategory = lazy(() => import('./components/client/ProductByCategory'))
const Login = lazy(() => import('./pages/Login/Login'))
function App() {
  return (
      <Suspense fallback={<div></div>}>
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
    </Suspense>
  );
}

export default App;
