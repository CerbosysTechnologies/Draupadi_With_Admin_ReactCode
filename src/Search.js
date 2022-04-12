import React, { useState, useEffect } from "react";
//import ProductItem from "./components/AllProducts/ProductItem.js";
import queryString from "query-string";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Row, Col, Spin } from "antd";

function Search() {
  const { search } = useLocation();
  const { productSearch } = queryString.parse(search);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState("");

  useEffect(async () => {
    setLoading(true);
    
  const { productSearch } = queryString.parse(search);
    await axios
      .get("https://cerbosys.in:4000/draupadi/getProductsData")
      .then((res) => {
       setProducts(res.data.data.filter((product) => {
        if (productSearch) {
          return product.product_name
            .toLowerCase()
            .includes(productSearch.toLowerCase());
        } else {
          return;
        }
      }));
        console.log(res.data.data)
        setLoading(false);
      }).catch(err=>console.log(err))
  }, [search]);

 
  return (
    <div>
      <h2 className="flex justify-center">{` Search result for "${productSearch?productSearch:""}" `}</h2>
     

      {loading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <Container>
          <Row justify="center">
       

            {products && products.length ? (
              products

                // .filter((product) => {
                //   if (productSearch) {
                //     return product.product_name
                //       .toLowerCase()
                //       .includes(productSearch.toLowerCase());
                //   } else {
                //     return;
                //   }
                // })
                .map((product, index) => (
                  <Col lg={4} md={6} sm={12} xs={24}>
                    <div className="mr-4">
                      <ProductItem
                        product={product}
                        key={index}
                    
                      />
                    </div>
                  </Col>
                ))
            ) : (
              <div className="column flex justify-center items-center ">
                <div className="title has-text-grey-light flex justify-center items-center my-4">
                  No products found!
                </div>
              </div>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
}

const ProductItem = (props) => {
  const { product } = props;
  // const[click,setClick] = React.useState(false)

  var myStr = product.product_image;
  var sStr = myStr.substr(8);
  return (
    <div
      className="w-[180px]"
      style={{
        marginTop: 25,
        marginBottom: 35,
        backgroundColor: "transparent",
      }}
    >
      <div
        className="box flex flex-col justify-center space-y-1 mx-auto h-auto"
        style={{ backgroundColor: "transparent" }}
        Style="outline: none;box-shadow: none;"
      >
        <div
          className="card"
          style={{
            borderRadius: 15,
            overflow: "hidden",
            outline: "none",
            backgroundColor: "transparent",
          }}
        >
          <div
            className="card-image"
            Style="box-shadow: 0px 3px 6px #23232300;
-webkit-box-shadow: 0px 3px 6px #23232300;
-moz-box-shadow: 0px 3px 6px #23232300;"
          >
            <figure
              className="image is-1by1"
              style={{ objectFit: "cover", width: "100%" }}
            >
              <Link
                to={{
                  pathname: `/products/${product.product_id}`,
                  query: { id: product.product_id },
                }}
              >
                <img
                  src={`https://cerbosys.in:4000${sStr}`}
                  style={{ width: "100%" }}
                  alt="Placeholder"
                />
              </Link>
            </figure>
          </div>
        </div>
        <div className="container" Style="text-align:center;">
          <h8 className="title" style={{ fontSize: 18, color: "black" }}>
            <strong className="flex justify-center">
              {product.product_name.toUpperCase()}
            </strong>
          </h8>
        </div>
        <div className="flex justify-center">
          <span
            className="text-xl ml-1"
            style={{ fontSize: 18, color: "black" }}
          >
            <strong style={{ fontSize: 15, color: "black" }}>
              ₹ {product.product_price}
            </strong>
          </span>
          {/* <span className="mr-1">
          <p style={{ textDecoration: "line-through",  fontSize: "15px" }}>
            ₹{product.product_actualprice}
          </p>
        </span> */}
        </div>
        <div className="container" Style="text-align:center;"></div>
      </div>
    </div>
  );
};

export default Search;
