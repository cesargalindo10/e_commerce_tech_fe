import { useState, useEffect,useCallback } from "react";
import debounce from 'just-debounce-it';
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
  const [verMas, setVerMas] = useState(true);
  const [loading,setLoading] = useState(true)

  const body: search = {
    name: "",
  };
  const getProductsSearch = async (value: string = '', page: string = "1") => {
    try {
      const url = `products?page=${page}`;

        body.name = value;
        const response: any = await APISERVICE.post(body, url);
        const { data, pageInfo } = response
        if (data) {
          setProductos(data);
          setPageInfo(pageInfo);
          return data;
        } else {
          console.log("Ocurrio un error al obtener ");
        }

    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };
  const moreProducts = async () => {
    const next = pageInfo?.next?.slice(-1);
    const response = await getProductsSearch(next);
    if (response.data && response.data !== undefined) {
      setProductos((prev) => [...prev, ...response.data]);
      response.pageInfo.next === null && setVerMas(false);
    }
  };
  const debouncedMoreProducts = useCallback(
    debounce(moreProducts, 500), // Ajusta el tiempo de espera según tus necesidades (300 ms en este ejemplo)
    [moreProducts] // Incluye todas las dependencias necesarias aquí
  );
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
        loader={<Loading/>}
        endMessage={<h3></h3>}
        className="infinite-scroll"
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
