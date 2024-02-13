import { useState, useEffect, useCallback } from "react";
import debounce from "just-debounce-it";
import ProductForCategory from "./ProductForCategory";
import { PageInfo, Product, ProductBrand } from "../../models/models";
import "./ProductByCategory.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Search from "../../shared/search/Search";
import Header from "../../shared/header/Header";
import Loading from "../../shared/loading/Loading";

interface AppState {
  pageInfo: PageInfo | null;
  product: Product[];
}
interface search {
  name: string;
}

export default function SearchProductPage() {
  const [productos, setProductos] = useState<ProductBrand[]>([]);
  const [pageInfo, setPageInfo] = useState<AppState["pageInfo"] | null>(null);
  const [verMas, setVerMas] = useState(false);
  const [loading, setLoading] = useState(true);
  const [siguiente, setSiguente] = useState("");

  const body: search = {
    name: "",
  };
  const getProductsSearch = async (value: string = "", page: string = "1") => {
    try {
      const url = `products?page=${page}`;

      body.name = value;
      const response: any = await APISERVICE.post(body, url);
      if (response.data) {
        setProductos(response.data);
        return response;
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const moreProducts = async () => {
    const response: any = await getProductsSearch(siguiente);
    const next = response.pageInfo?.next?.slice(-1);
    if(response.pageInfo.next !== null){
      setVerMas(true);
      setSiguente(next);
    }else{
      setVerMas(false);
    }  
    
  };
  const debouncedMoreProducts = useCallback(debounce(moreProducts, 500), [
    moreProducts,
  ]);
  const clearFilter = () => {
    setProductos([]);
  };
  useEffect(() => {
    getProductsSearch();
  }, []);
  return (
    <div className="container_products">
      <Header />
      <InfiniteScroll
        dataLength={productos && productos.length}
        next={debouncedMoreProducts}
        hasMore={verMas}
        loader={<Loading />}
        endMessage={<p></p>}
        style={{ overflow: "hidden" }}
      >
        <Search
          placeHolder="Ingrese el nombre del producto"
          filterSomething={getProductsSearch}
          handleClear={clearFilter}
        />
        <div className="fila">
          {productos &&
            productos.map((producto) => (
              <Link
                key={crypto.randomUUID()}
                to={`/product/${producto.id}`}
                className="link-detalle"
              >
                <ProductForCategory producto={producto} loading={loading} />
              </Link>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
