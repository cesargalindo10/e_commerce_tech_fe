import AddDementBtns from "../../shared/addDecrementBtns/AddDementBtns";
import { RowImage } from "../../shared/rowImage/RowImage";
import { ProductDetail } from "../detailProduct/DetailProduct";
import imgDefault from '../../assets/img/defaulimg.png' 
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface Props{
    product: ProductDetail
}
function CartProduct({product}: Props) {

  return (<>
    <li className="cart-product">
      <div className="d-flex align-items-center gap-2">
        <div style={{width: 50, height: 50}}>
        {
          product.url_image ? <RowImage url_image={APIURLIMG + product.url_image} width={50} height={50} /> : <RowImage url_image={imgDefault} width={50} height={50} />
        }
        </div>
        <p className="cart-product-name">{product?.name}</p>
      </div>
      <div className="cart-product-info">
        <p className="product-price">
          {product?.sale_price?.split(".")[0] * product?.quantity}
          <span className="product-price-after">00</span>
          <span className="ml">Bs.</span>
        </p>
        <AddDementBtns item={product} />
      </div>
    </li>
    </>
  );
}

export default CartProduct;
