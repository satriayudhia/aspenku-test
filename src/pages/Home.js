import React, { useState, useEffect } from "react";
import { Container, Row, Form, InputGroup } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { FiSearch } from "react-icons/fi";

//CSS
import "./Pages.scss";

//Configs
import { API } from "../configs/API";

//Components
import ProductCardLoading from "../components/ProductCardLoading";

const Home = () => {
  const [products, setProducts] = useState(undefined);
  const [sort, setSort] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);
      let query = `price={"min":"1","max":"1000"}&limit=100&skip=0`;
      const request = await API.get(`product?${query}`);

      let res = request.data.data.rows;

      if (search !== "") {
        res = res.filter((val) =>
          val.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (sort == null) {
        let sortNEW = res.sort(
          (a, b) => parseFloat(a.created_at) - parseFloat(b.created_at)
        );
        setProducts(sortNEW);
      } else if (sort === "ASC") {
        let sortASC = res.sort(
          (a, b) => parseFloat(a.sell_price) - parseFloat(b.sell_price)
        );
        setProducts(sortASC);
      } else if (sort === "DESC") {
        let sortDESC = res.sort(
          (a, b) => parseFloat(b.sell_price) - parseFloat(a.sell_price)
        );
        setProducts(sortDESC);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, [sort]);

  return (
    <Container>
      <Row className="home-title">
        <h1 className="title-h1">Product List</h1>
        <Form className="input-form" onSubmit={(e) => handleSubmit(e)}>
          <InputGroup>
            <div className="input-container">
              <input
                className="input-search"
                type="text"
                autoComplete="off"
                placeholder="Apa yang anda cari.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch
                size={20}
                className="search-icon"
                onClick={(e) => handleSubmit(e)}
              />
            </div>
          </InputGroup>
        </Form>

        <div className="option-sort">
          <Form.Control
            className="option-sort-in"
            as="select"
            value={sort}
            style={{
              borderRadius: "0",
              marginLeft: "1px",
              cursor: "pointer",
            }}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value={null}>Terbaru</option>
            <option value="ASC">Harga Termurah</option>
            <option value="DESC">Harga Termahal</option>
          </Form.Control>
        </div>
      </Row>

      {products === undefined || loading ? (
        <Row className="product-list-container" style={{ padding: "4px" }}>
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
        </Row>
      ) : (
        <Row className="product-list-container" style={{ padding: "4px" }}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
