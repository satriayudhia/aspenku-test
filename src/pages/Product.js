import React, { useState, useEffect } from "react";
import { Container, Col, Row, Breadcrumb, Button, Card } from "react-bootstrap";
import { AiTwotoneStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import ReactHtmlParser from "react-html-parser";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { BsPencil } from "react-icons/bs";
import NumberFormat from "react-number-format";

//Assets
import NoImg from "../assets/images/no-img.png";

//Configs
import { APIV3 } from "../configs/API";

const Product = (props) => {
  const { id } = props.match.params;
  const [product, setProduct] = useState(undefined);
  const [subtotal, setSubTotal] = useState(0);

  const getDetail = async () => {
    try {
      const res = await APIV3(`product/${id}`);
      console.log("res", res);
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const addDefaultSrc = (ev) => {
    ev.target.src = NoImg;
  };

  return (
    product !== undefined && (
      <Container className="product-detail-container">
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <Col sm={3}>
            <div className="big-img-wrapper">
              <img
                src={product.SpreeProductImages[0].thumbnail_image}
                alt={product.SpreeProductImages[0].alternative_text}
                onError={(e) => addDefaultSrc(e)}
              />
            </div>
            <div className="small-img-wrapper">
              {product.SpreeProductImages.map((image) => (
                <img
                  src={image.thumbnail_image}
                  alt={image.alternative_text}
                  onError={(e) => addDefaultSrc(e)}
                />
              ))}
            </div>
          </Col>
          <Col sm={6} className="description-container">
            <h1>{product.name}</h1>
            <div className="sub-title-wrapper">
              <div className="sub-text">Sold {product.sold}</div>
              <BsDot size={20} color="grey" />
              <div>
                <AiTwotoneStar color="#FDB813" size={20} />{" "}
                <span className="sub-text">
                  ({parseFloat(product.average_rating)} review)
                </span>
              </div>
              <BsDot size={20} color="grey" />
              <div className="sub-text">View {product.views_count}</div>
            </div>

            <div className="price-text">
              {product.currency} {product.sell_price} / {product.unit_measure}
            </div>

            <div className="desc-text">Description</div>

            <div className="desc-info">
              <div>Condition: {product.is_new == 0 ? "Used" : "New"}</div>
              <div>Weight: {product.weight}</div>
              <div className="mb-3">
                Category: {product.SpreeSubCategory.SpreeCategory.category_name}
              </div>
              {ReactHtmlParser(product.description)}
            </div>

            <hr />

            <div className="store-wrapper">
              <div className="img-wrapper">
                <img
                  src={product.SpreeStore.icon_file_name}
                  alt={product.SpreeStore.store_name}
                  onError={(e) => addDefaultSrc(e)}
                />
                <div>{product.SpreeStore.store_name}</div>
              </div>

              <Button variant="outline-info">Detail</Button>
            </div>

            <div className="store-rating-wrapper">
              <AiTwotoneStar color="#6C727C" size={20} />{" "}
              {product.SpreeStore.store_average_rating} Average Rating | (
              {product.SpreeStore.store_review_count}
              &nbsp;review)
            </div>

            <div className="delivery-wrapper">
              <h4>Delivery</h4>

              <div>
                Send from{" "}
                <span>
                  {product.SpreeStore.district}, {product.SpreeStore.city}
                </span>
              </div>
            </div>
          </Col>
          <Col sm={3}>
            <Card className="card-cart-container">
              <h6>Add to Cart</h6>
              <div>
                <div className="qty-wrapper">
                  <HiMinusCircle size={25} color="grey" />
                  <input value={10} type="number" readOnly />
                  <HiPlusCircle
                    size={25}
                    color="#344b69"
                    className="cursor-pointer"
                  />
                  <div className="ml-2">Stock {product.stock_on_hand}</div>
                </div>

                <div className="min-text mt-3">
                  Min. qty to buy {product.min_qty_order} {product.unit_measure}
                </div>
                <div className="min-text">
                  Max. qty to buy {product.stock_on_hand} {product.unit_measure}
                </div>

                <div className="add-note-wrapper">
                  <BsPencil /> Add Note
                </div>

                <div className="subtotal-wrapper">
                  <div className="subtotal-txt">Subtotal</div>
                  <div className="price-txt">Rp89.000</div>
                </div>

                <Button className="btn-cart">+ Cart</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Product;
