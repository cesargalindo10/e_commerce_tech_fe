import { Product } from '../../models/models';

interface Props {
    producto:Product
}

export default function ProductForCategory ({producto}:Props){
  const { name,  url_image, sale_price } = producto;

  return (
    <div className="product-card">
      <img src={url_image} alt={name} />
      <h3>{name}</h3>
      <p>{sale_price}</p>
    </div>
  );
};


