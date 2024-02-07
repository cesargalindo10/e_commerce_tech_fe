import { useState, useEffect } from "react";
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

  const body: search = {
    name: "",
  };
  const getProductsSearch = async (value: string = "", page: string = "1") => {
    try {
      const url = `api/product?page=${page}`;
      console.log(body);
      if (value !== "") {
        body.name = value;
        const { data, pageInfo } = await APISERVICE.post(body, url);
        console.log(data);
        if (data) {
          setProductos(data);
          setPageInfo(pageInfo);
          return data;
        } else {
          console.log("Ocurrio un error al obtener ");
        }
      }
    } catch (error) {
      console.error(error);
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
  const clearFilter = () => {
    setProductos([]);
  };
  useEffect(() => {
    getProductsSearch((body.name = "we"));
  }, []);

  console.log(productos);
  return (
    <div className="container_products">
      <Header />
      <InfiniteScroll
        dataLength={productos && productos.length}
        next={moreProducts}
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
                <ProductForCategory producto={producto} />
              </Link>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
