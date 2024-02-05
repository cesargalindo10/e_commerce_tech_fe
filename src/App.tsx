import { Navigate, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import Private from "./pages/Private";
import Login from "./pages/Login/Login";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import AuthGuard from "./guards/auth.guard";
import ProductByCategory from "./components/client/ProductByCategory";
import Borrar from "./components/client/Borrar";

function App() {
  return (
    <RoutesWithNotFound>
      <Route path="/borrar" element={<Borrar />}/>
      <Route path="/category/:categoryId" element={<ProductByCategory />} />

      <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
      <Route path={PublicRoutes.LOGIN} element={<Login />} />
      <Route element={<AuthGuard privateValidation={true} />}>
        <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
      </Route>
    </RoutesWithNotFound>
  );
}

export default App;
