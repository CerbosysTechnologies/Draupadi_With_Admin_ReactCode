import React from "react";
//import Pcategory from './productCategaory'
//import withContext from "../AllProducts/button";
//import ProductList from './ProductsList'
import { Link } from "react-router-dom";
import "./product.css";

const ProductItem = (props) => {
  const { product } = props;
  // const[click,setClick] = React.useState(false)

  var myStr = product.product_image;
  var sStr = myStr.substr(8);
  // console.log(sStr)

  return (
    <>
      <div
        id="differentview"
        //className="column is-half-mobile is-one-third-tablet is-one-fourth-desktop is-one-fifth-widescreen"
        className="column is-half-mobile is-one-third-tablet is-one-fourth-desktop 
        is-one-sixth-widescreen" //This has to be 3for mobile view.
        // style={{
        //   marginTop: 25,
        //   marginBottom: -15,         
        //   backgroundColor: "transparent",
        // }}
      >
        <div
          //className="box flex flex-col justify-center space-y-1 mx-auto h-auto"
          className="space-y-2 mx-auto"
          style={{ backgroundColor: "transparent" }}
          Style="outline: none;box-shadow: none;"
        >
          <div
            className="card-1" //Names Changed for edges previously it was card
            style={{
              //borderRadius: "25px",
              overflow: "hidden",
              outline: "none",
              backgroundColor: "transparent",
            }}
          >
            <div
              className="card-image-1" ////Names Changed for edges previously it was card-image
//               Style="box-shadow: 0px 3px 6px #23232300;
// -webkit-box-shadow: 0px 3px 6px #23232300;
// -moz-box-shadow: 0px 3px 6px #23232300;"
            >
              <figure
                className="image is-by1 figure-size"
               // style={{ objectFit: "cover"}}
              >
                <Link
                  to={{
                    pathname: `/products/${product.product_id}`,
                    query: { id: product.product_id },
                  }}
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                >
                  <img id="img-size"
                  //style={{ width: "100%", height:"320px" }}
                    src={`https://cerbosys.in:4000${sStr}`}                   
                    alt="Placeholder"
                  />
                </Link>
              </figure>
            </div>
          </div>
          <div className="container" Style="text-align:center;">
            <h8 className="title productname" 
            //style={{ fontSize: 18, color: "black"}}
            >
              <strong className="flex justify-center">
                {/* {product.product_name.toUpperCase()} */}
                {product.product_name}
              </strong>
            </h8>
          </div>
          <div className="flex justify-center">
            <span
              //className="text-xl ml-1"
              //style={{ fontSize: 18, color: "black" }}
            >
              <strong className="productprice"
              //style={{ fontSize: 18, color: "black" }}
              >
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
    </>
  );
};

export default ProductItem;
