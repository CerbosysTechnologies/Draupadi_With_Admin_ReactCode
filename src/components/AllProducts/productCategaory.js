import React, { useEffect, useState } from "react";
import {
  PcategoryContainer,
  Headertwo,
  ImageContainer,
  Image,
  Pheader,
  Pname,
  Plist,
  DetailsContainer,
} from "./productCategoryelem";
import Slider from "react-slick";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import authHeaderuser from "../../services/auth-headers";
import { MdOutlineCancel } from "react-icons/md";
import withContext from "./button";
import { Table } from "react-bootstrap";
import { PaddingTop } from "styled-icons/fluentui-system-filled";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Image } from "antd";

// const cartnoti = {
//   width: "300px",
//   height: "90px",
//   backgroundColor: "rgba(150, 150, 150, 0.9)",
//   borderRadius: "15px",
//   position: "absolute",
//   top: "300px",
//   left: "40%",
//   boxShadow: "3px 3px 6px grey",
//   display: "none",
//   justifyContent: "center",
//   alignItem: "center",
//   fontSize: "40px",
// };

// const items=()=>{
//   axios.get("https://cerbosys.in:4000/draupadi/getProductsData").then(res=>res.json()).then(data=>{
//     console.log("items",data);
// })
// }

// const left = () => {
//   document.getElementById("bus").scrollLeft += 100;
// };

// const right = () => {
//   document.getElementById("bus").scrollLeft -= 100;
// };

const Pcategory = (props) => {
  const [customdesign, setCustomDesign] = useState("");
  const [customdesigndata, setCustomdesignData] = useState([]);
  const [design, setDesign] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeDiscount, setPromoCodeDiscount] = useState(0);
  const [promoCodeError, setpromoCodeError] = useState("");
  const [promoCodeStatus, setPromoCodeStatus] = useState(false);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [product, setProduct] = useState({
    breadth: "",
    category_id: "",
    category_name: "",
    createdById: "",
    creationDate: "",
    height: "",
    length: "",
    modificationDate: "",
    modifiedById: "",
    product_actualprice: "",
    product_description: "",
    product_discount: "",
    product_id: "",
    product_image: "",
    product_name: "",
    product_price: "",
    statusId: "",
    subcategory_id: "",
    subcategory_name: "",
    weight: "",
  });
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 600,
    rows: 1,
    slidesToShow: 3,
    slidesToScroll: 1,
    slidesPerRow: 1,
    autoplay: true,
    // nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(async () => {
    const data = await axios
      .get(
        "https://cerbosys.in:4000/draupadi/getProductById?product_id=" +
          location.pathname.split("/")[2]
      )
      .then((res) => {
        console.log("----------" + JSON.stringify(res.data.data[0]));
        setProduct(res.data.data[0]);
      })
      .catch((err) => console.log(err));

    await axios
      .get("https://cerbosys.in:4000/draupadi/getAllCustomisedDesigns")
      .then((res) => {
        console.log(res.data.data);
        setCustomdesignData(res.data.data);
      });

    await axios
      .get("https://cerbosys.in:4000/draupadi/getActiveOffers")
      .then((res) => {
        console.log(res.data.data);
        //setCustomdesignData(res.data.data);
      });
  }, []);

  // const { products } = props;
  const location = useLocation();
  // console.log(location);
  // const [data, setData] = React.useState([]);
  // const [designcode, setDesigncode] = React.useState("");
  // const [click, setClick] = React.useState(false);
  // const [heart, setHeart] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user).user_name;
  const item = useSelector((state) => state.wishlist);
  console.log("item------" + JSON.stringify(item));

  const cartitem = useSelector((state) => state.cart);
  let totalPrice = 0;
  for (let i = 0; i < cartitem.length; i++) {
    totalPrice += cartitem[i].product_price;
  }

  const wishlistStatus =
    item?.filter((e) => e.product_id == product.product_id).length > 0
      ? true
      : false;
  console.log("ehhhhhhh", product);
  const checkPromoCode = async (product) => {
    if (promoCode) {
      console.log("clicked");
      await axios
        .get(
          `https://cerbosys.in:4000/draupadi/getOfferByCode?code=${promoCode}`
        )
        .then((res) => {
          try {
            if (res?.data?.data) {
              if (res?.data?.data[0].minimum_cartvalue > totalPrice) {
                setpromoCodeError(
                  `Code valid for more than Rs.${res?.data?.data[0].minimum_cartvalue} cart value`
                );
                setPromoCodeStatus(false);
              } else if (
                res?.data?.data[0].category_id !== product.category_id
              ) {
                setPromoCodeStatus(false);
                setpromoCodeError("Code not valid for this category item");
              } else if (
                res?.data?.data[0].discountType.toLowerCase() === "percent"
              ) {
                setPromoCodeDiscount(
                  product.product_price * (res?.data?.data[0].discount / 100)
                );
                setPromoCodeStatus(true);
                setpromoCodeError("Promo Code Applied !!");
              } else if (
                res?.data?.data[0].discountType.toLowerCase() === "flat"
              ) {
                setPromoCodeDiscount(res?.data?.data[0].discount);
                setPromoCodeStatus(true);
                setpromoCodeError("Promo Code Applied !!");
              }
            } else {
              setPromoCodeStatus(false);
              setpromoCodeError("Promocode not valid");
            }
          } catch (err) {
            console.log(err);
          }
        });
    }
  };
  return (
    <>
      <div Style="text-align:center;position:relative;border-bottom-style:dashed;border-bottom-width:thin;border-bottom-color:#BA7D82;">
        <p style={{ margin: 35 }}>
          <Link
            to="/"
            style={{ color: "black", fontSize: 15, textDecoration: "none" }}
          >
            <strong>HOME</strong>
          </Link>
          &nbsp;/&nbsp;
          <Link
            style={{ color: "black", fontSize: 15, textDecoration: "none" }}
            to="/products"
          >
            <strong>{product?.category_name.toUpperCase()}</strong>
          </Link>
          &nbsp;/&nbsp;
          <span
            style={{ color: "#BA7D82", fontSize: 15, textDecoration: "none" }}
          >
            <strong>{product?.subcategory_name.toUpperCase()}</strong>
          </span>
        </p>
      </div>

      <div
        className="container  md:flex md:justify-center md:items-center  w-auto mx-auto"
        Style="position:relative;margin-top:40px;"
      >
        <img
          className="rounded-md object-contain h-[500px] inline"
          //https://img.starbiz.com/resize/750x-/2020/02/11/amber-heard-2a66.jpg
          src={`https://cerbosys.in:4000${product?.product_image?.substr(8)}`}
          // src="https://img.starbiz.com/resize/750x-/2020/02/11/amber-heard-2a66.jpg"
          alt="fb"
        />
        <Table Style="border:none">
          <tr Style="border:none" className="min-device-getproduct">
            <th Style="border:none">
              {/* <ImageContainer> */}
              {/* <Image src={`https://45.80.152.232:4000${sStr}`} alt='fb'/> */}

              {/* </ImageContainer> */}

              {/* <Scrolldiv>
      <SmallImage src={`http://45.80.152.232:2000${sStr}`} alt='gh'/>
      <SmallImage src={`http://45.80.152.232:2000${sStr}`} alt='gh'/>
      <SmallImage src={`http://45.80.152.232:2000${sStr}`} alt='gh'/>
      <SmallImage src={`http://45.80.152.232:2000${sStr}`} alt='gh'/>
      </Scrolldiv> */}
            </th>
            <th Style="border:none">
              {/* //  <Pheader> */}
              <strong
                className="!ml-[10px]"
                style={{
                  color: "#000000",
                  fontFamily: "Amiri, serif",
                  textTransform: "capitalize",
                  fontSize: "30px",
                }}
              >
                {product?.product_name}
              </strong>
              {/* </Pheader> */}

              <DetailsContainer>
                <div className="container">
                  {/* ////comment start */}
                  {/* <strong  
                    style={{
                      fontSize: 16,
                      fontFamily: "Amiri, serif",
                      textTransform: "capitalize",
                    }}
                  >
                    {product?.subcategory_name}&nbsp;By Draupadi
                  </strong>
                  <br />
                  <br />
                  <p Style="font-size:14px;font-family:Amiri, serif;color:#616161">
                    <strong style={{ color: "black" }}>
                      Category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    </strong>
                    &nbsp;| &nbsp;{product.category_name}
                  </p>
                  <strong Style="font-size:14px;font-family:Amiri, serif;color:#616161;text-transform:capitalize">
                    <strong style={{ color: "black" }}>Subcategory</strong>{" "}
                    &nbsp;|&nbsp; {product.subcategory_name}
                  </strong>
                  <br />
                  <br /> */}
                  {/* <h3 className='title' Style='font-size:15px;'><strong>SKU      | {product.product_id}</strong></h3> */}
                  {/* <label
                    className="checkbox"
                    style={{ fontSize: 16, fontFamily: "Amiri, serif" }}
                  > */}

                  {/* /comment end */}
                  <span className="flex">
                    <input
                      type="checkbox"
                      className="ml-[5px]"
                      onChange={(e) => {
                        setCustomDesign(e.target.checked);
                        setDesign("");
                        console.log(e.target.checked);
                      }}
                    />
                    <strong style={{ paddingLeft: "5px" }}>
                      &nbsp; Choose your design&nbsp;&nbsp;&nbsp;
                    </strong>
                  </span>

                  {/* </label> */}
                  {/* <br /> */}
                  {customdesign ? (
                    <div className="w-[300px] design-scroll h-[180px] flex items-center  overflow-x-scroll rounded-lg  shadow-inner">
                      {customdesigndata?.map((data, index) => {
                        console.log("8888888888888", data);
                        return (
                          <div
                            className={`w-[150px]  design-flex mx-2 cursor-pointer  rounded-md ${
                              design.customised_designid ==
                              data.customised_designid
                                ? "bg-[#bf6b6b] !text-white"
                                : "bg-gray-200"
                            }  border-slate-400 p-1`}
                            onClick={() => {
                              setDesign(data);

                              console.log("custom design data---", data);
                            }}
                          >
                            <img
                              src={`https://cerbosys.in:4000${data?.designimage?.substr(
                                8
                              )}`}
                              className="object-cover !w-full h-[80px]  rounded-md"
                            />

                            <div className="flex flex-col items-center   mt-3">
                              <span>{data.design_code}</span>
                              <span>₹{data.price} </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}
                  {"" ? (
                    <div
                      className="container design_div"
                      style={{
                        maxWidth: 400,
                        justifyContent: "left",
                        padding: "15px",
                      }}
                    >
                      <br />
                      <Link
                        to="/designs"
                        style={{ color: "#BA7D82", textDecoration: "none" }}
                      >
                        View all design
                      </Link>
                      <div className="design-ds_box">
                        <button
                          className="scroll_btn"
                          id="leftbtn"
                          // onClick={left}
                        >
                          <MdArrowBackIosNew />
                        </button>
                        <div
                          className="column columns is-multiline design_scroll_box"
                          id="bus"
                          Style="
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;"
                        >
                          {/* {designDesign()} */}
                        </div>
                        <button
                          className="scroll_btn"
                          id="rightbtn"
                          // onClick={right}
                        >
                          <MdArrowForwardIos />
                        </button>
                      </div>
                      Design Code-
                      {/* <input
              value={props.context.designdetails.design_code}
              Style="padding-left:10px;background: transparent;width:90px;border: none;border-bottom: 2px solid #BA7D82;"
            /> */}
                    </div>
                  ) : (
                    ""
                  )}
                  <br />

                  <p
                    style={{ wordSpacing: 10 }}
                    className="flex flex-col justify-start"
                  >
                    <span>
                      <span>
                        <span className="text-md mr-[5px]">₹</span>
                        <span className="text-md !font-extrabold">
                          {product.product_price +
                            (customdesign
                              ? design?.price
                                ? design?.price
                                : 0
                              : 0) -
                            promoCodeDiscount}
                          /-
                          {console.log("product---", product)}
                        </span>
                      </span>
                      <strong
                        style={{ color: "#555", opacity: 0.6, wordSpacing: 3 }}
                      >
                        &nbsp;All Inclusive
                      </strong>
                    </span>
                    <span className="">
                      {/* {<div className="bg-[#606060] flex items-center space-x-1 inline p-2 rounded-md text-white w-[200px]">
                        <span>ADD TO WISHLIST</span>
                        <span>
                          {wishlistStatus ? (
                            <RiHeart3Fill
                            size={10}
                              onClick={() => {
                                dispatch({
                                  type: "REMOVE_FROM_WISHLIST",
                                  payload: product.product_id,
                                });
                                toast(
                                  `${product.product_name} is removed from your wishlist !   😯😯 `,
                                  {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                  }
                                );
                              }}
                              style={{
                                // paddingLeft: 10,
                                width: 25,
                                height: 35,
                                color: "red",
                              }}
                            />
                          ) : (
                            <RiHeart3Line
                            size={10}
                              style={{
                                // paddingLeft: 10,

                                width: 25,
                                height: 30,
                              }}
                              onClick={() => {
                                if (user) {
                                  dispatch({
                                    type: "ADD_TO_WISHLIST",
                                    payload: product,
                                  });
                                  toast(
                                    `${product.product_name} is added to your wishlist !   ❤🧡 `,
                                    {
                                      position: "top-center",
                                      autoClose: 3000,
                                      hideProgressBar: true,
                                      closeOnClick: true,
                                      pauseOnHover: false,
                                      draggable: true,
                                      progress: undefined,
                                    }
                                  );
                                } else {
                                  toast.error(
                                    `You should login first to perform this action 😥😥 `,
                                    {
                                      position: "top-center",
                                      autoClose: 5000,
                                      hideProgressBar: true,
                                      closeOnClick: true,
                                      pauseOnHover: false,
                                      draggable: true,
                                      progress: undefined,
                                    }
                                  );
                                }
                              }}
                            />
                          )}
                        </span>
                      </div>} */}

                      {/* //------------------------------------- */}
                    </span>
                  </p>
                  <span className="flex flex-col justify-start space-y-2 md:space-x-2 md:space-y-0  md:flex md:flex-row">
                    <button
                      onClick={() => {
                        // if (user) {
                        if (design === {}) {
                          dispatch({
                            type: "ADD_TO_CART",
                            payload: {
                              uid: cart.length,
                              ...product,
                            },
                          });
                        } else {
                          if (customdesign) {
                            dispatch({
                              type: "ADD_TO_CART",
                              payload: {
                                uid: cart.length,
                                ...product,
                                ...design,

                                product_price:
                                  product.product_price +
                                  (customdesign
                                    ? design.price
                                      ? design.price
                                      : 0
                                    : 0) -
                                  promoCodeDiscount,
                              },
                            });
                          } else {
                            dispatch({
                              type: "ADD_TO_CART",
                              payload: {
                                uid: cart.length,
                                ...product,

                                product_price:
                                  product.product_price +
                                  (customdesign
                                    ? design.price
                                      ? design.price
                                      : 0
                                    : 0) -
                                  promoCodeDiscount,
                              },
                            });
                          }
                        }

                        setpromoCodeError("");

                        toast(
                          `${product.product_name} is added to your cart !   😍😍 `,
                          {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                          }
                        );
                        // }

                        // else {
                        //   toast.error(
                        //     `You should login first to perform this action 😥😥 `,
                        //     {
                        //       position: "top-center",
                        //       autoClose: 5000,
                        //       hideProgressBar: true,
                        //       closeOnClick: true,
                        //       pauseOnHover: false,
                        //       draggable: true,
                        //       progress: undefined,
                        //     }
                        //   );
                        // }

                        // {design ? (
                        //   <span className="flex items-center justify-center bg-green-300 w-[110px] p-[1px] rounded-full">
                        //     customised &nbsp;
                        //     <MdOutlineCancel size={17} />
                        //   </span>
                        // ) : (
                        //   ""
                        // )}

                        // props.addToCart({
                        //   id: product.product_id,
                        //   product,
                        //   amount: 1,
                        //   total: 0,
                        //   payable: 0,
                        // });
                      }}
                      className=" p-2"
                      Style="background-color:#000000;color:white;border-radius:5px;height:40px;width:150px;"
                    >
                      <strong style={{ color: "white",fontSize:'16px',fontWeight:'100' }}> ADD TO CART</strong>
                    </button>
                    <span>
                      {wishlistStatus ? (
                        <div
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_WISHLIST",
                              payload: product.product_id,
                            });
                            toast(
                              `${product.product_name} is removed from your wishlist !   😯😯 `,
                              {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                          }}
                          className="bg-[#FFFFFF] cursor-pointer flex items-center space-x-1 inline p-1 rounded-md text-white w-[185px]  " style={{border:"3px solid black"}}
                        >
                          <span>
                            <RiHeart3Fill
                              size={10}
                              style={{
                                // paddingLeft: 10,
                                width: 25,
                                height: 25,
                                color: "red",
                               
                              }}
                            />
                          </span>
                          <span style={{fontWeight:'100', color:"black"}} >ADD TO WISHLIST</span>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            if (user) {
                              dispatch({
                                type: "ADD_TO_WISHLIST",
                                payload: product,
                              });
                              toast(
                                `${product.product_name} is added to your wishlist !   ❤🧡 `,
                                {
                                  position: "top-center",
                                  autoClose: 3000,
                                  hideProgressBar: true,
                                  closeOnClick: true,
                                  pauseOnHover: false,
                                  draggable: true,
                                  progress: undefined,
                                }
                              );
                            } else {
                              toast.error(
                                `You should login first to perform this action 😥😥 `,
                                {
                                  position: "top-center",
                                  autoClose: 5000,
                                  hideProgressBar: true,
                                  closeOnClick: true,
                                  pauseOnHover: false,
                                  draggable: true,
                                  progress: undefined,
                                }
                              );
                            }
                          }}
                      className="bg-[#FFFFFF] cursor-pointer flex items-center space-x-1 p-1 rounded-md text-white w-[185px]" style={{border:"3px solid black"}}
                        >
                          <span>
                            <RiHeart3Line
                              // size={10}
                              style={{
                                // paddingLeft: 10,
                                color:"black",
                                width: 25,
                                height: 25,
                                fontWeight:'100',                              }}
                            />
                          </span>
                          <span style={{fontWeight:'100', color:"black"}}>ADD TO WISHLIST</span>
                        </div>
                      )}
                    </span>
                  </span>
                  <br />
                  <br />
                  <span className="flex flex-col justify-start">
                    {/* <span>
                      <span className="flex items-baseline">
                        <span className="flex border-2 border-[#606060] rounded-[9px]">
                          <span className=" px-1 flex items-center justify-center bg-[#606060] text-white border-2 border-[#606060] rounded-tl-md rounded-bl-md" style={{fontWeight:'100'}}>
                            PROMO CODE
                          </span>

                          <input
                            id="offerbox"
                            onChange={(e) => setPromoCode(e.target.value)}
                            Style="padding-left:2px;background: transparent;width:90px;border: none;border-bottom: 2px solid #fff;outline:none"
                          />
                        </span>
                        &nbsp; &nbsp;
                        <button
                          className="bg-[#BA7D82] px-3 py-1 text-white ml-1 rounded-md"
                          onClick={() => checkPromoCode(product)}
                          style={{fontWeight:'100'}}
                        >
                          APPLY
                        </button>
                      </span>
                      <br />
                      <span
                        className={` ml-[50px] ${
                          promoCodeStatus ? "text-green-500" : "text-red-600"
                        }`}
                      >
                        {promoCodeError ? `*${promoCodeError}*` : ""}
                      </span>
                    </span> */}
                    <span className="">
                      <strong style={{ color: "#000000" }}>Description</strong>
                    <hr></hr>
                    </span>
                    
                  </span>
                  <p style={{ textTransform: "capitalize" }}>
                    {product.product_description}
                  </p>
                </div>
              </DetailsContainer>
            </th>
          </tr>
        </Table>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      {/* <div  id="cartaddnoti">
        <p>Added to Cart</p>
      </div>
      <div  id="wishaddnoti">
        <p>Added to Wishlist</p>
      </div> */}
    </>
  );
};

export default withContext(Pcategory);
