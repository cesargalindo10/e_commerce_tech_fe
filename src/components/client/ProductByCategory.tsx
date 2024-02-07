import { useState, useEffect,useCallback} from "react";
import debounce from 'just-debounce-it';
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
  const debouncedMoreProducts = useCallback(
    debounce(moreProducts, 500), // Ajusta el tiempo de espera según tus necesidades (300 ms en este ejemplo)
    [moreProducts] // Incluye todas las dependencias necesarias aquí
  );
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
        next={debouncedMoreProducts}
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
