import { useState, useEffect, useCallback } from "react";
import debounce from "just-debounce-it";
import ProductForCategory from "./ProductForCategory";
import { ProductBrand } from "../../models/models";
import "./ProductByCategory.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Search from "../../shared/search/Search";
import Header from "../../shared/header/Header";
import { esqueleton } from "./EsqueletonClient";
import { stylesHeader } from "../../utilities/shared";

interface search {
  name: string;
}

export default function SearchProductPage() {
  const [productos, setProductos] = useState<ProductBrand[]>([]);
  const [verMas, setVerMas] = useState(true);
  const [siguiente, setSiguente] = useState("");

  const body: search = {
    name: "",
  };
  const getProductsSearch = async (value: string = "", page: string = "1") => {
    try {
      const url = `api/products?page=${page}`;

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
    }
  };
  const moreProducts = async () => {
    const response: any = await getProductsSearch(siguiente);
    if (response.data.length < 15) {
      setVerMas(false);
    } else {
      setVerMas(true);
    }
    const next = response.pageInfo?.next?.slice(-1);
    response.pageInfo.next == null && setVerMas(false);
    setSiguente(next);
  };
  const debouncedMoreProducts = useCallback(debounce(moreProducts, 500), [
    moreProducts,
  ]);
  const clearFilter = () => {
    setProductos([]);
    getProductsSearch("", "1");
  };
  useEffect(() => {
    getProductsSearch();
  }, []);
  return (
    <>
      <div style={stylesHeader} className="contatiner-header-client">
        <Header />
        <div className="content-page contenedor-buscador">
            <Search
              placeHolder="Ingrese el nombre del producto"
              filterSomething={getProductsSearch}
              handleClear={clearFilter}
            />
          </div>
      </div>
      <div className="container_products">
        <InfiniteScroll
          dataLength={productos && productos.length}
          next={debouncedMoreProducts}
          hasMore={verMas}
          loader={esqueleton}
          endMessage={<p></p>}
          style={{ overflow: "hidden" }}
        >


          <div className="fila content-page">
            {productos && productos.length > 0 ? (
              productos.map((producto) => (
                <Link
                  key={crypto.randomUUID()}
                  to={`/product/${producto.id}`}
                  className="link-detalle"
                >
                  <ProductForCategory producto={producto} />
                </Link>
              ))
            ) : (
              <p className="not-found-result">Resultados no encontrados</p>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
