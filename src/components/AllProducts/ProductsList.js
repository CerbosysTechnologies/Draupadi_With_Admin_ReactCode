import React, { useState } from "react";
import ProductItem from "./ProductItem";
import withContext from "../AllProducts/button";
import "./product.css";
import { useLocation } from "react-router-dom";
// import Pcategory from "./productCategaory";
// import authHeaderuser from "../../services/auth-headers";
// import axios from "axios";
// import { Table } from "react-bootstrap";
//import Footer from '../Footer/index'
import queryString from "query-string";
import { WhatsappLogo } from "../Hero/mainElements";
import { whats } from "../Hero/Icons";
const ProductList = (props) => {
  // const [search, setSearch] = useState("");
  const { products } = props.context;
  const { navItems } = props;
  const { search } = useLocation();
  const { productSearch } = queryString.parse(search);

  return (
    <>
    <a href='https://wa.me/+916396173148' target="_blank"><WhatsappLogo>{whats}</WhatsappLogo></a>
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
                        <div className="col-lg-2 "> {/* This is for side spacing reduced */}
                          <h2
                            className="title"
                            style={{
                              color: "#000000",
                              fontSize: 18,
                              fontWeight: 600,
                              margin:"20px"
                            }}
                          >
                            <medium
                              id={`${
                                x.category_name.toLowerCase().split(" ")[0]
                              }`}
                            >
                              {/* Category not in upper case. */}
                              {/* {x.category_name.toUpperCase()}{" "} */}
                              {x.category_name}{" "} 
                            </medium>
                          </h2>
                        </div>
                        <div className="col">
                          <div className="container">
                            {/* Changes Done */}
                            <div className="columns is-multiline is-mobile min-screen-degine">
                            {/* <div className="column columns is-multiline min-screen-degine"> */}
                            {/* <div className="mobile-display"> */}
                              {products && products.length ? (
                                products
                                  .filter(
                                    (cat) => cat.category_id === x.category_id
                                  )
                                  .filter((product) =>
                                {  if(productSearch){
                                        return product.product_name.toLowerCase().includes(productSearch.toLowerCase())
                                  }else{
                                    return product
                                  }
                                    }
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
{/* </div> */}
                            </div> {/* is multiline finish */}
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
