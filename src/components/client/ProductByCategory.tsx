import { useState, useEffect } from "react";
import ProductForCategory from "./ProductForCategory";
import { Category, PageInfo, ProductBrand } from "../../models/models";
import "./ProductByCategory.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../shared/header/Header";
import useCategory from "../hooks/useCategory";
import CategoryList from "../landingPage/CategoryList";
import { esqueleton } from "./EsqueletonClient";
import { stylesHeader } from "../../utilities/shared";

interface AppState {
  pageInfo: PageInfo | null;
  product: ProductBrand[];
}

export default function ProductByCategory() {
  const [productos, setProductos] = useState<AppState["product"]>([]);
  const [category, setCategory] = useState<Category>();
  const [verMas, setVerMas] = useState(true);
  const [siguiente, setSiguente] = useState("");
  const { loading, categoriesWithProducts } = useCategory();

  const { id } = useParams();
  const getProductsByCategory = async (page: string = "1") => {
    try {
      const url = `api/products/${id}?page=${page}`;
      const response: any = await APISERVICE.get(url);
      if (response.data) {
        if (verMas) {
          const uniqueProducts = Array.from(
            new Set([...productos, ...response.data])
          );
          setProductos(uniqueProducts);
        } else {
          setProductos((prevProducts) => {
            const uniqueProducts = Array.from(
              new Set([...prevProducts, ...response.data])
            );
            return uniqueProducts;
          });
        }
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
    if (response.data.length < 15) {
      setVerMas(false);
    } else {
      setVerMas(true);
    }
    const next = response.pageInfo?.next?.slice(-1);
    response.pageInfo.next == null && setVerMas(false);
    setSiguente(next);
  };

  const getCategoryById = async () => {
    try {
      const url = `api/category/${id}`;
      const { data } = await APISERVICE.get(url);

      if (data) {
        setCategory(data);
        return data;
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setProductos([]);
    getCategoryById();
    moreProducts();
  }, [id]);

  return (
    <>
      <div style={stylesHeader}>
        <Header />
        <CategoryList categories={categoriesWithProducts}/>
      </div>
      <main className="content-page">
        <InfiniteScroll
          dataLength={productos && productos.length}
          next={moreProducts}
          hasMore={verMas}
          loader={esqueleton}
          endMessage={
            <p style={{ textAlign: "center" }}>
              {productos?.length === 0 ? (
                <span>No existen productos</span>
              ) : (
                <span>No existen más productos</span>
              )}
            </p>
          }
          style={{ overflow: "hidden" }}
        >
          <div className="fila ">
            {productos?.map((producto) => (
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
      </main>
    </>
  );
}
