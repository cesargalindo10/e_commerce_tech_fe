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
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";
import Footer from "../../shared/footer/Footer";
import Skeleton from 'react-loading-skeleton'

export interface ProductDetail extends ProductWithQuantity{
  brand?: string;
}
function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const cartList = useSelector((store: AppStore) => store.shop); 
  useEffect(() => { 
    getDetailProduct();
  }, []);

  const getDetailProduct = async () => {
    try {
      setLoading(true)
      const response = await AxiosService.get("api/product/" + id, "");
      if (response) {
        const { data } = response;
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
    } finally {
      setLoading(false)
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

  if(loading) return <div className='content-page mt-3 mb-3'>
        <div className='d-flex gap-2 align-items-center'>
          <div style={{width: '50px'}}>
            <Skeleton circle width={50} height={50}/>
          </div>
          <div style={{width: '25%'}}>
            <Skeleton height={20}/>
          </div>
        </div>

        <Skeleton height={300}/>
       
        <Skeleton height={25} width={'30%'} className="mb-2"/>
        <Skeleton height={30} width={'50%'}/>

        <Skeleton height={30} width={'15%'} className="mb-2 mt-3"/>
     
        <Skeleton height={30} width={'25%'}/>
        <Skeleton height={100}/>

        <div className="d-flex gap-2 align-items-center mt-2 justify-content-between">
          <Skeleton height={24} width={'100px'}/>
          <Skeleton height={24} width={'40px'}/>
        </div>
    </div>

  return (
    <div>
      <Header />
      <main className="content-page product-detail mb-4">
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

        <p className="product-price-dp product-detail-price mb-0">
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
      <Footer/>
    </div>
  );
}

export default DetailProduct;
