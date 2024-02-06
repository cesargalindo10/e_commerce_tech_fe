import { useState, useEffect } from "react";
import ProductForCategory from "./ProductForCategory";
import { PageInfo, Product, ProductBrand } from "../../models/models";
import "./ProductByCategory.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

interface AppState {
  pageInfo: PageInfo | null;
  product: Product[];
}
export default function ProductByCategory() {
  const clientState = useSelector((store: any) => store.client);
  const [productos, setProductos] = useState<ProductBrand[]>([]);
  const [pageInfo, setPageInfo] = useState<AppState["pageInfo"] | null>(null);
  const [verMas, setVerMas] = useState(true);

  const getProductsByCategory = async (page: string = "1") => {
    try {
      const url = `api/product/${clientState.id}?page=${page}`;
      const { data } = await APISERVICE.get(url);
      console.log(data);
      if (data) {
        setProductos(data.data);
        setPageInfo(data.pageInfo);
        return data;
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const moreProducts = async () => {
    const next = pageInfo?.next?.slice(-1);
    console.log(next);
    const response = await getProductsByCategory(next);
    setProductos((prev) => [...prev, ...response.data]);
    response.pageInfo.next === null && setVerMas(false);
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  return (
    <div className="container_products">
      <h2>Category</h2>
      <InfiniteScroll
        dataLength={productos.length}
        next={moreProducts}
        hasMore={verMas}
        loader={<h2>Cargando</h2>}
        endMessage={<h3>No hay mas</h3>}
        className="infinite-scroll"
      >
        <div className="fila">
          {productos.map((producto) => (
            <Link to={"/detalle"} className="link-detalle" key={crypto.randomUUID()}>
              <ProductForCategory                
                producto={producto}
              />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
