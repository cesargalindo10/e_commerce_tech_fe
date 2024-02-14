import { useState, useEffect } from "react";
import ProductForCategory from "./ProductForCategory";
import { Category, PageInfo, ProductBrand } from "../../models/models";
import "./ProductByCategory.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../shared/header/Header";
import Loading from "../../shared/loading/Loading";

interface AppState {
  pageInfo: PageInfo | null;
  product: ProductBrand[];
}
export default function ProductByCategory() {
  const [productos, setProductos] = useState<AppState["product"]>([]);
  const [category, setCategory] = useState<Category>();
  const [verMas, setVerMas] = useState(productos.length<=5? false:true);
  const [loading, setLoading] = useState(true);
  const [siguiente, setSiguente] = useState("");
  const { id } = useParams();
  const getProductsByCategory = async (page: string = "1") => {
    try {
      const url = `products/${id}?page=${page}`;
      const response: any = await APISERVICE.get(url);
      if (response.data) {
        const uniqueProducts = Array.from(
          new Set([...productos, ...response.data])
        );
        setProductos(uniqueProducts);
        return response;
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const moreProducts = async () => {
    const response: any = await getProductsByCategory(siguiente);
    const next = response.pageInfo?.next?.slice(-1);
    response.pageInfo.next == null && setVerMas(false);
    setSiguente(next);
  };

  const getCategoryById = async () => {
    try {
      const url = `category/${id}`;
      const { data } = await APISERVICE.get(url);

      if (data) {
        setCategory(data);
        return data;
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategoryById();
    moreProducts();
  }, []);

  return (
    <div className="container_products">
      <Header />
      <div className="category-client">
        <h2>{category?.name}</h2>
      </div>

      <InfiniteScroll
        dataLength={productos && productos.length}
        next={moreProducts}
        hasMore={verMas}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>¡Yay! Lo has visto todo</b>
          </p>
        }
        style={{ overflow: "hidden" }}
      >
        <div className="fila">
          {productos?.map((producto) => (
            <Link
              to={`/product/${producto.id}`}
              className="link-detalle"
              key={crypto.randomUUID()}
            >
              <ProductForCategory producto={producto} loading={loading} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
