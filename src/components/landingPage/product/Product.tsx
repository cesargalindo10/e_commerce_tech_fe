import { RowImage } from '../../../shared/rowImage/RowImage'
import { ProductCat } from '../LandingPage';
import imgDefault from '../../../assets/img/defaulimg.png'
import { Link } from 'react-router-dom';

const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;


interface Props {
  product: ProductCat
}
const widthWindow = window.innerWidth;
const width = widthWindow < 999 ? 99 : 150
function Product({product}: Props) {
  return (
    <Link className='product-card' to={`/product/${product.id}`}>
        {
          product?.url_image === null ? <RowImage url_image={imgDefault} width={width} height={width}/> :
          <RowImage url_image={APIURLIMG + product.url_image} width={width} height={width}/>
        }
        <p className='product-name'>{product.name}</p>
        <p className='product-price'>
            {product?.sale_price?.split(".")[0] } 
          <span className='product-price-after'>00</span>
          <span className='ml'>Bs.</span>
        </p>
        <p className='product-code'>Codigo: {product.code}</p>
    </Link>
  )
}
 
export default Product