import { useState, useEffect } from "react";
import ProductForCategory from "./ProductForCategory";
import { Category, PageInfo, Product, ProductBrand } from "../../models/models";
import "./ProductByCategory.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../shared/header/Header";
import Loading from "../../shared/loading/Loading";

interface AppState {
  pageInfo: PageInfo | null;
  product: Product[];
}
export default function ProductByCategory() {
  const [productos, setProductos] = useState<ProductBrand[]>([]);
  const [category,setCategory] = useState<Category>()
  const [pageInfo, setPageInfo] = useState<AppState["pageInfo"] | null>(null);
  const [verMas, setVerMas] = useState(true);
  const { id } = useParams();
  const getProductsByCategory = async (page: string = "1") => {
    try {
      const url = `api/product/${id}?page=${page}`;
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
    const response = await getProductsByCategory(next);
    setProductos((prev) => [...prev, ...response.data]);
    response.pageInfo.next === null && setVerMas(false);
  };

  const getCategoryById = async () => {
    try {
      const url = `category/${id}`;
      const { data } = await APISERVICE.get(url);

      if (data) {
        setCategory(data.data);
        return data;
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProductsByCategory();
    getCategoryById();
  }, []);

  return (
    <div className="container_products">
      <Header />
      <div className="category">
        <h2>{category?.name}</h2>
      </div>

      <InfiniteScroll
        dataLength={productos.length}
        next={moreProducts}
        hasMore={verMas}
        loader={<Loading/>}
        endMessage={<h3></h3>}
        className="infinite-scroll"
      >
        <div className="fila">
          {productos.map((producto) => (
            <Link
              to={`/product/${producto.id}`}
              className="link-detalle"
              key={crypto.randomUUID()}
            >
              <ProductForCategory producto={producto} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
