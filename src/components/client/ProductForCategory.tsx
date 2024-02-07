import { ProductBrand } from "../../models/models";

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
    <div className="card_product">
      <div className="card-body">
        <div className="image-product">
          <img src={url_image} alt={name} />
        </div>
        <div className="product-info">
          <p>{name}</p>
          <p>
            <span>Codigo:</span>
            {code}
          </p>
          <p>
            <span>Marca:</span> {brand?.name}
          </p>
        </div>
        <div className="product-price">
          <span>{integerPart}</span>
          <span className="exponent">{superscriptExponent}</span>
          Bs.
        </div>
      </div>
    </div>
  );
}
