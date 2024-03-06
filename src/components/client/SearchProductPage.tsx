import { useState, useEffect } from "react";
import ProductForCategory from "./ProductForCategory";
import { ProductBrand } from "../../models/models";
import "./ProductByCategory.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
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
  const [load,setLoad]=useState(true)
  const body: search = {
    name: "",
  };
  const getProductsSearch = async (value: string, page: string) => {
    try {
      const url = `api/products?page=${page}`;
      body.name = value;
      const response: any = await APISERVICE.post(body, url);
      if (response.data) {
        setProductos(response.data);
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    }finally{
      setLoad(false)
    }
  };

  const clearFilter = () => {
    setProductos([]);
    getProductsSearch("","1")
  };

  useEffect(() => {
    getProductsSearch("","1");
  }, []);

  if(load) return <div>{esqueleton}</div>
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
      </div>
    </>
  );
}
