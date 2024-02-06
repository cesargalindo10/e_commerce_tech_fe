import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosService } from "../../service/api.service";
import { ProductWithQuantity } from "../../models/models";
import Header from "../../shared/header/Header";
import { RowImage } from "../../shared/rowImage/RowImage";
import { FaAngleRight } from "react-icons/fa";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
import "./detailProduct.css";
import defaultimg from '../../assets/img/defaulimg.png'
import AddDementBtns from "../../shared/addDecrementBtns/AddDementBtns";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
export interface ProductDetail extends ProductWithQuantity{
  brand?: string;
}
function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const cartList = useSelector((store: AppStore) => store.shop); 
  useEffect(() => { 
    getDetailProduct();
  }, []);

  const getDetailProduct = async () => {
    try {
      const response = await AxiosService.get("product/" + id, "");
      if (response) {
        const { data } = response.data;
        const existsProduct = cartList?.length > 0 && cartList.find((product: ProductDetail) => product?.id === data[0].id);
        let newProduct;
        if(existsProduct){
          newProduct = {...existsProduct};
        }else{
          newProduct = {...data[0],quantity: 0};
          //dispatch(addProduct(newProduct));
        }
        setProduct(newProduct);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateState = ( type : string) => {
    const existsProduct = cartList?.length > 0 && cartList.find((prod: ProductDetail) => prod?.id === product?.id);
    if(existsProduct && product){
      const getValue = (value: number) => type === "increment" ? value + 1 : type === "decrement" ? value - 1 : 0
      setProduct({...product, quantity: existsProduct?.quantity ? getValue(existsProduct?.quantity) : 0});
    }else{
      if(product)
      setProduct({...product, quantity: 1});
    }
  }

  return (
    <div>
      <Header />
      <main className="content-page product-detail">
        {
          product?.url_image ? 
          <RowImage url_image={APIURLIMG + product?.url_image} alt={product?.name} />
          :
          <RowImage url_image={defaultimg} alt="defaultimg"/>
        }

        <div className="product-detail-info">

        <h2 className="product-detail-name">{product?.name}</h2>

        <div>
          <p className="product-detail-code">
            Codigo: <span> {product?.code}</span>
          </p>
          <p className="product-detail-brand">
            Marca: <span> {product?.brand}</span>
          </p>
        </div>

        <div className="dintance-bar"></div>

        <p className="product-price product-detail-price mb-0">
          {product?.sale_price?.split(".")[0]}
          <span className="product-price-after">00</span>
          <span className="ml">Bs.</span>
        </p>

        <div className="dintance-bar"></div>

        <div>
          <h5>Descripción</h5>
          <p className="product-detail-description">{product?.description}</p>
        </div>

        {product?.url_pdf && (
          <>
            <div className="dintance-bar"></div>
            <div className="product-detail-pdf">
              <h5>Decargas</h5>
              <a href={APIURLIMG + product?.url_pdf} target="_blank">
                {/* fICHAR TECNICA */}
                <span>
                  Ficha Tecnica: <span> {product?.code}</span>
                </span>
                <FaAngleRight />
              </a>
            </div>
          </>
        )}

        <div className="dintance-bar"></div>

        <section className="product-detail-footer">
          <div className="product-detail-availability">
            <h5 className="title">Disponibilidad</h5>
            <h5>CBA | Oficina Quintanillla: </h5>
          </div>

          <div className="add-to-cart">
            <h5>Pedido</h5>
            <AddDementBtns updateState={updateState} item={product}/>
          </div>
        </section>
        </div>

      </main>
    </div>
  );
}

export default DetailProduct;
