import React from "react";
import withContext from "../AllProducts/button";
import { FaShoppingCart } from "react-icons/fa";
import WishItem from "./wishList";
import axios from "axios";
import authHeaderuser from "../../services/auth-headers";
import { Link } from "react-router-dom";
import Footer from "../Footer/index";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { InputGroup, Form, FormControl, Button, Table } from "react-bootstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import "./wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import { WhatsappLogo } from "../Hero/mainElements";
import { whats } from "../Hero/Icons";

export default function WishList() {
  const dispatch = useDispatch();
  // const [data, setData] = React.useState([]);
  // React.useEffect(() => {
  //   //axios.get('https://45.80.152.232:4000/draupadi/getAllWishlist',{headers:authHeaderuser()}).then(res=>setData(res.data.data))
  //   axios
  //     .get("https://cerbosys.in:4000/draupadi/getAllWishlist", {
  //       headers: authHeaderuser(),
  //     })
  //     .then((res) => {
  //       setData(res.data.data);
  //       console.log("Wishhiii", res.data.data);
  //     });
  // }, []);

  const tocart = (key) => {
    var date = new Date().toISOString();
    var date = date.substr(0, 10);
    console.log("key", key);
  };

  const data = useSelector((state) => state.wishlist);
  console.log(data, "909090990909");
  // const data = {
  //   product_id: key.product_id,
  //   product_name: key.product_name,
  //   product_price: key.product_price,
  //   product_discount: key.product_discount,
  //   product_actualprice: key.product_actualprice,
  //   product_image: key.product_image,
  //   product_quantity: 1,
  //   dateAdded: date,
  // };
  // console.log("datadatddatadta", data);
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   fetch("https://cerbosys.in:4000/draupadi/addToCart", {
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: "Bearer " + user.token,
  //     },
  //     method: "post",
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("Buddy", res);
  //       localStorage.removeItem("designId");
  //     });

  //   axios
  //     .get(
  //       `https://cerbosys.in:4000/draupadi/deleteWishlist?wishlist_id=${key.wishlist_id}`,
  //       { headers: authHeaderuser() }
  //     )
  //     .then((res) => console.log("Wishlist response", res));
  // };

  return (
    <>
    <a href='https://wa.me/+916396173148' target="_blank"><WhatsappLogo>{whats}</WhatsappLogo></a>
      <div className="container" Style="position:relative;">
        <div
          className="hero is-white"
          Style="border-bottom-style:dashed;border-bottom-width:thin;border-bottom-color:#BA7D82;"
        >
          <div className="hero-body container">
            <h4 className="title" style={{fontSize: "18px"}}>My WishList</h4>
          </div>
        </div>
        <br />
        <div className="container">
          <Table Style="border: none;">
            <tr Style="border: none;">
              <td Style="border: none;">
                {/* <div className="container" style={{ minWidth: 100 }}>
                  <Link Style="text-decoration: none;" to="/products">
                    <h2
                      className="title"
                      style={{ color: "#B77304", fontSize: "18px" }}
                    >
                      <FaLongArrowAltLeft />
                      Back to Products
                    </h2>
                  </Link>
                </div> */}
                <div className="container text-black" style={{ minWidth: 150 }}>
                  <Link to="/products" Style="text-decoration: none;">
                    <h2
                      className="title flex w-full items-center mt-2"
                      style={{ color: "#B77304", fontSize: 18 }}
                    >
                      <AiOutlineArrowLeft
                        style={{
                          paddingRight: 15,
                          fontSize: 30,
                          color: "black",
                        }}
                      />
                      <span className="flex-1 text-md block text-black">
                        Products
                      </span>
                    </h2>
                  </Link>
                </div>
              </td>
              <td Style="border: none;">
                <div className="container">
                  {data && (
                    <div className="column columns is-multiline">
                      {console.log("---------" + JSON.stringify(data))}
                      {data.map((product, key) => {
                        return (
                          <div className=" column is-full">
                            <div
                              className="box"
                              style={{
                                backgroundColor: "#F4F4F4",
                                borderRadius: 10,
                              }}
                            >
                              <div className="media">
                                <div className="media-left">
                                  <div className="card">
                                    <div className="card-image">
                                      <figure className="image is-128x128">
                                        <img
                                          src={`https://cerbosys.in:4000${product.product_image.substr(
                                            8
                                          )}`}
                                          alt={product.product_description}
                                          style={{ objectFit: "cover" }}
                                        />
                                      </figure>
                                    </div>
                                  </div>
                                </div>
                                <div className="media-content">
                                  <br />
                                  <b style={{ textTransform: "capitalize" }}>
                                    {product.product_name.toUpperCase()}
                                  </b>
                                  <br />
                                  <br />
                                  <p
                                    className="lead"
                                    style={{ color: "grey", fontSize: 15 }}
                                  >
                                    Price-
                                    <strong
                                      style={{ color: "black", fontSize: 15 }}
                                    >
                                      {product.product_price}/-
                                    </strong>
                                  </p>
                                </div>
                                <div
                                  className="media-right"
                                  style={{ position: "relative" }}
                                >
                                  <button
                                    className="button is-normal"
                                    Style="background-color:#BA7D82;color:white;border-radius:15px;"
                                    onClick={() => {
                                      dispatch({
                                        type: "ADD_TO_CART",
                                        payload: product,
                                      });
                                      dispatch({
                                        type: "REMOVE_FROM_WISHLIST",
                                        payload: product.product_id,
                                      });
                                      // toast(
                                      //   `${product.product_name} is added to your cart ! 🥰🥰 `,
                                      //   {
                                      //     position: "top-center",
                                      //     autoClose: 3000,
                                      //     hideProgressBar: true,
                                      //     closeOnClick: true,
                                      //     pauseOnHover: false,
                                      //     draggable: true,
                                      //     progress: undefined,
                                      //   }
                                      // );
                                    }}
                                  >
                                    Move to cart
                                  </button>
                                </div>
                                <div
                                  className="media-right"
                                  onClick={() => {
                                    dispatch({
                                      type: "REMOVE_FROM_WISHLIST",
                                      payload: product.product_id,
                                    });

                                    // toast(
                                    //   `${product.product_name} is removed from your wishlist ! 😥😥 `,
                                    //   {
                                    //     position: "top-center",
                                    //     autoClose: 3000,
                                    //     hideProgressBar: true,
                                    //     closeOnClick: true,
                                    //     pauseOnHover: false,
                                    //     draggable: true,
                                    //     progress: undefined,
                                    //   }
                                    // );
                                  }}
                                >
                                  <span className="delete is-large"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </Table>
        </div>
        {/* <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
      </div>
    </>
  );
}
