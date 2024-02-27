
import { ProductBrand } from "../../models/models";
import defatulImg from "../../assets/camara.jpeg"

const APIURL = import.meta.env.VITE_REACT_APP_API_URL_IMG;

interface Props {
  producto: ProductBrand; 
}

export default function ProductForCategory({ producto }: Props) {
  const { name, url_image, sale_price, code, brand } = producto;
  const cero = 0;
  const [integerPart, decimalPart] = sale_price
    ? sale_price.toString().split(".")
    : cero.toString().split(".");

  const superscriptExponent = `${decimalPart}`;
  return (
    <div className="card_product-client">
      <div className="card-body-client">
        <div className="image-product-client">
          <img src={url_image? APIURL + url_image:defatulImg} alt={name} />
        </div>
        <div className="product-info-client">
          <p className="product-info-name-client">{name}</p>
          <p style={{fontSize: '0.85rem'}}>
            <span>Codigo:</span>
            {code}
          </p>
          <p style={{fontSize: '0.85rem'}}> 
            <span>Marca:</span> {brand?.name}
          </p>
        </div>
        <div className="product-price-name-client">
          <span>{integerPart}</span>
          <span className="exponent">{superscriptExponent}</span>
          Bs.
        </div>
      </div>
    </div>
  );
}
