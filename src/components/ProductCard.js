import React from "react";
import { useHistory } from "react-router-dom";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";

//CSS
import "./Components.scss";

//Assets
import NoImg from "../assets/images/no-img.png";

const ProductCard = ({ product }) => {
  const router = useHistory();

  let APIImg = "https://apis-dev.aspenku.com";
  let prodImg = `${APIImg}${product.SpreeProductImages[0].thumbnail_image}`;

  const addDefaultSrc = (ev) => {
    ev.target.src = NoImg;
  };

  return (
    <Card
      className="default-card-product"
      onClick={() => router.push(`/${product.permalink}`)}
    >
      <div className="img-wrapper">
        <img variant="top" src={prodImg} onError={(e) => addDefaultSrc(e)} />
      </div>

      <div class="card-product-detail">
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              <strong>{product.name}</strong>.
            </Tooltip>
          }
        >
          <div class="product-title">{product.name}</div>
        </OverlayTrigger>

        <div class="product-price">
          $ {product.sell_price} / {product.unit_measure}
        </div>
        <div>
          <div className="store-name">{product.SpreeStore.store_name}</div>
          <div className="star-container">
            <StarRatingComponent
              name="rate2"
              editing={false}
              // renderStarIcon={() => <span></span>}
              starCount={5}
              value={product.SpreeStore.store_average_rating}
            />
            <span>
              (
              {product.SpreeStore.store_review_count
                ? product.SpreeStore.store_review_count
                : 0}
              )
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
