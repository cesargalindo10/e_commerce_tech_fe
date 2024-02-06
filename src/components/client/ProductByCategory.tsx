import React, { useState, useEffect } from "react";
import ProductForCategory from "./ProductForCategory";
import { ProductBrand } from "../../models/models";
import "./ProductByCategory.css";
import { APISERVICE } from "../../infrastructure/api/api.service";
import { useSelector } from "react-redux";

export default function ScrollInfinito() {
  const clientState = useSelector((store: any) => store.client);
  const [productos, setProductos] = useState<ProductBrand[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);

  const getCategories = async (): Promise<void> => {
    try {
      console.log(clientState.name);
      const url = `api/cate/${clientState.id}`;
      const response = await APISERVICE.get(url);
      console.log(response.data)
      if (response.status === 200) {
        setProductos(response.data.data);
        setPaginaActual(response.data.pageInfo);
      } else {
        console.log("Ocurrio un error al obtener ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container_products">
      
      <h2>Category</h2>
      <div className="fila">
        {productos.map((producto) => (
          <ProductForCategory key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}
