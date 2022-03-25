import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../AllProducts/button";
import "./product.css";
// import Pcategory from "./productCategaory";
// import authHeaderuser from "../../services/auth-headers";
// import axios from "axios";
// import { Table } from "react-bootstrap";
//import Footer from '../Footer/index'

const ProductList = (props) => {
  const { products } = props.context;
  const { navItems } = props;

  return (
    <>
      <div className="container" Style="position:relative;">
        <>
          <div className="container">
            {false ? (
              <div className="col">
                <div className="container">
                  <div className="column columns is-multiline min-screen-degine">
                    {props.context.searchw.map((product, index) => (
                      <>
                        <ProductItem
                          product={product}
                          key={index}
                          addToCart={props.context.addToCart}
                          //getproduct={getproduct}
                          viewdetailsHandler={(id) => console.log("view", id)}
                        />
                      </>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {navItems.map((x, index) => {
                  return (
                    <div
                      id={x.category_id}
                      key={index}
                      className="container"
                      Style="border-top-style:dashed;border-top-width:thin;border-top-color:#BA7D82; "
                    >
                      <br />
                      <div className="row">
                        <div className="col-lg-2 ">
                          <h2
                            className="title"
                            style={{
                              color: "#000000",
                              fontSize: 18,
                              fontWeight: 600,
                            }}
                          >
                            <medium
                              id={`${
                                x.category_name.toLowerCase().split(" ")[0]
                              }`}
                            >
                              {x.category_name.toUpperCase()}{" "}
                            </medium>
                          </h2>
                        </div>
                        <div className="col">
                          <div className="container">
                            <div className="column columns is-multiline min-screen-degine">
                              {products && products.length ? (
                                products
                                  .filter(
                                    (cat) => cat.category_id === x.category_id
                                  )
                                  .map((product, index) => (
                                    <>
                                      <ProductItem
                                        product={product}
                                        key={index}
                                        addToCart={props.context.addToCart}
                                        jackproduct={(id) => {
                                          props.context.jackproduct(id);
                                        }}
                                        //getproduct={getproduct}
                                        viewdetailsHandler={(id) =>
                                          console.log("view", id)
                                        }
                                      />
                                    </>
                                  ))
                              ) : (
                                <div className="column">
                                  <span className="title has-text-grey-light">
                                    No products found!
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default withContext(ProductList);
