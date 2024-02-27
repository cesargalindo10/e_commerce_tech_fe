import Skeleton from "react-loading-skeleton";

export const Card = (
    <div className="card_product-client">
      <div className="card-body-client">
        <div className="image-product-client">
          <Skeleton height={99} width={99} />
        </div>
        <div className="product-info-client">
          <div style={{ width: "90%" }}>
            <Skeleton height={80} />
          </div>
        </div>
        <div className="product-price-name-client">
          <Skeleton width={50} />
        </div>
      </div>
    </div>
  );
  export const esqueleton = (
    <div className="container_products">
      <div className="fila content-page">
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {Card}
          {Card}
          {Card}
          {Card}
          {Card}
          {Card}
          {Card}
          {Card}
        </div>
      </div>
    </div>
  );