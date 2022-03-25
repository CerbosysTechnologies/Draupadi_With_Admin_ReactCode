import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../AllProducts/button";
import { FaShoppingCart } from "react-icons/fa";
import CartItem from "./razor";
import "./cart.css";
import Ships from "./shippingaddress";
import { Radio } from "antd";
import Page from "./paymentPage";
import { MDBInput } from "mdbreact";
import axios from "axios";
import { ImCross } from "react-icons/im";
import authHeaderuser from "../../services/auth-headers";
import { Link } from "react-router-dom";
import Footer from "../Footer/index";
import { InputGroup, Form, FormControl, Button, Table } from "react-bootstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
// import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { MdDeleteForever } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { NoEncryption } from "@material-ui/icons";
const Cart = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modeOfPayment, setModeOfPayment] = useState("online");
  const [loading, setLoading] = useState(false);
  const [wareIQproducts, setwareIQproducts] = useState("");
  const cartitem = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.cart);
  console.log(orders);

  useEffect(async () => {
    if (user?.token == undefined) {
      history.push("/newuserlogin");
    }
    await axios
      .post(
        "https://track.wareiq.com/products/v1/master",
        {
          filters: {},
          page: 1,
          per_page: 250,
          search_key: "",
          sort: "desc",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token f2bcbd0391d34042a10dace27bcda69f`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => console.log("jyotii", res.data.data));

    await axios
      .get(
        "https://cerbosys.in:4000/draupadi/getAllAddress",

        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        console.log("address---ship-", res.data.status);

        if (res.data.status == 200) {
          var i = res.data.data.length - 1;
          dispatch({
            type: "LOGIN_USER",
            payload: { shippingDetails: res?.data?.data[i] },
          });
        } else if (res.data.status == 400) {
          dispatch({
            type: "LOGIN_USER",
            payload: { shippingDetails: undefined },
          });
        }
      });
  }, []);

  let productsToDispatch = [];

  for (var i = 0; i < cartitem.length; i++) {
    productsToDispatch.push({
      id: cartitem[i].WareIQ_ID,
      quantity: "1",
      amount: cartitem[i].product_price,
      tax_lines: [
        {
          title: "IGST",
          rate: 0.05,
        },
      ],
    });
  }
  console.log("-------------prod-buy ", productsToDispatch);

  let totalPrice = 0;
  for (let i = 0; i < cartitem.length; i++) {
    totalPrice += cartitem[i].product_price;
  }

  let totalDiscount = 0;
  for (let i = 0; i < cartitem.length; i++) {
    totalDiscount += cartitem[i].product_discount;
  }

  let productsToBuy = [];

  for (var i = 0; i < cartitem.length; i++) {
    productsToBuy.push({
      product_id: cartitem[i].product_id,
      product_quantity: 1,
      product_price: cartitem[i].product_price,
      offer_id: 3,
      customised_designid: cartitem[i]?.customised_designid,
      design_code: cartitem[i]?.design_code,
      price: cartitem[i].product_price,
    });
  }
  console.log("-------------prod-buy ", productsToBuy);

  console.log(user.token);
  const onlineProceedToCheckOut = async () => {
    await axios
      .post(
        "https://cerbosys.in:4000/draupadi/proceedToCheckout",

        {
          shiprocket_orderid: "",
          totalAmount: totalPrice,
          discount: totalDiscount,
          payableAmount: totalPrice,
          shipping_id: user.shippingDetails.shipping_id,
          status: "Pending", // for online payment
          payment_type: "Online",
          order_date: moment(moment.now()).format("YYYY-MM-DD"), // "2022-03-09", // moment(moment.now()).format("YYYY-MM-DD")
          products: productsToBuy,
        },
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        console.log("-------order id generating", res.data);
        setLoading(false);
        //--------------------------------------------------------------------------------------------------------------------------
        if (res.data.status == 200) {
          function loadScript(src) {
            return new Promise((resolve) => {
              const script = document.createElement("script");
              script.src = src;
              script.onload = () => {
                resolve(true);
              };
              script.onerror = () => {
                resolve(false);
              };
              document.body.appendChild(script);
            });
          }
          async function displayRazorpay() {
            const res = await loadScript(
              "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
              setLoading(false);
              alert("Razorpay failed");
              return;
            }

            const options = {
              key: "rzp_live_YqvALqyXMO07xs", //"rzp_test_2bQ3mYU4FM9qdV", //"rzp_live_MtYL5wjLaA9IKU", // "rzp_test_2bQ3mYU4FM9qdV", // its TESTING ONE
              amount: totalPrice * 100,
              currency: "INR",
              name: "Draupadi",
              description:
                "We upcycle everything from sarees. There's more to her, there's more to sarees.",
              image: "https://cerbosys.in:4000/user/dp1.png",
              order_id: res?.data?.razor_orderId, //UNCOMMENT IT
              handler: async function (response) {
                console.log("response------ ", response);
                console.log("payment-id-", response.razorpay_payment_id);
                console.log("order-id--", response.razorpay_order_id);
                console.log(
                  "razorpay--signature---",
                  response.razorpay_signature
                );
                if (response.response.razorpay_order_id) {
                  setLoading(false);
                  await axios
                    .post(
                      "https://track.wareiq.com/orders/add", //wareIQ implementation for online payment only
                      {
                        order_id: res.data.orderId,
                        full_name: user?.shippingDetails.first_name,
                        customer_email: user?.user_email,
                        customer_phone: user?.shippingDetails.mobilenumber,
                        address1: user?.shippingDetails.address_line1,
                        address2: user?.shippingDetails.address_line2,
                        city: user?.shippingDetails.city,
                        pincode: user?.shippingDetails.postalcode,
                        state: user?.shippingDetails.state_name,
                        country: "India",
                        billing_address: {
                          first_name: user?.shippingDetails.first_name,
                          last_name: user?.shippingDetails.last_name,
                          address1: user?.shippingDetails.address_line1,
                          address2: user?.shippingDetails.address_line2,
                          city: user?.shippingDetails.city,
                          pincode: user?.shippingDetails.postalcode,
                          state: user?.shippingDetails.state_name,
                          country: "India",
                          phone: user?.shippingDetails.mobilenumber,
                        },
                        products: productsToDispatch,
                        payment_method: "PREPAID",
                        total: totalPrice,
                        shipping_charges: 0,
                        warehouse: "281001",
                        // order_date: moment(moment.now()).format("YYYY-MM-DD"),
                        no_of_pieces: orders.length,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Token f2bcbd0391d34042a10dace27bcda69f`,
                        },
                      }
                    )
                    .then((response) => {
                      console.log("Response", response.data.id);
                      var idd = response.data;
                      dispatch({ type: "CLEAR_CART" });
                      // toast(
                      //   `Order has placed successfully, you will receive tracking details shortly 🥰😍 `,
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
                      history.push("/");
                    })
                    .catch((err) => {
                      setLoading(false);
                      console.log(err);
                      // toast.error(`Oops, something went wrong `, {
                      //   position: "top-center",
                      //   autoClose: 3000,
                      //   hideProgressBar: true,
                      //   closeOnClick: true,
                      //   pauseOnHover: false,
                      //   draggable: true,
                      //   progress: undefined,
                      // });
                    });
                }
              },
              prefill: {
                name: user.user_name,
                email: user.user_email,
                contact: user.shippingDetails.mobilenumber,
              },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
          }
          displayRazorpay();
        } else {
          // toast.error(`Oops, something went wrong `, {
          //   position: "top-center",
          //   autoClose: 3000,
          //   hideProgressBar: true,
          //   closeOnClick: true,
          //   pauseOnHover: false,
          //   draggable: true,
          //   progress: undefined,
          // });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        // toast(`Oops, something went wrong `, {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        //   progress: undefined,
        // });
      });
  };

  const offlineProceedToCheckOut = async () => {
    await axios
      .post(
        "https://cerbosys.in:4000/draupadi/proceedToCheckout",

        {
          shiprocket_orderid: "",
          totalAmount: totalPrice,
          discount: totalDiscount,
          payableAmount: totalPrice,
          shipping_id: 2,
          status: "Pending", // for online payment
          payment_type: "COD",
          order_date: moment(moment.now()).format("YYYY-MM-DD"), // new Date().toISOString(),
          products: productsToBuy,
        },
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then(async (res) => {
        console.log("-------order id generating", res.data);

        await axios
          .post(
            "https://track.wareiq.com/orders/add", //wareIQ implementation for online payment only
            {
              order_id: `${res.data.orderId}`,
              full_name: user?.shippingDetails.first_name,
              customer_email: user?.user_email,
              customer_phone: user?.shippingDetails.mobilenumber,
              address1: user?.shippingDetails.address_line1,
              address2: user?.shippingDetails.address_line2,
              city: user?.shippingDetails.city,
              pincode: user?.shippingDetails.postalcode,
              state: user?.shippingDetails.state_name,
              country: "India",
              billing_address: {
                first_name: user?.shippingDetails.first_name,
                last_name: user?.shippingDetails.last_name,
                address1: user?.shippingDetails.address_line1,
                address2: user?.shippingDetails.address_line2,
                city: user?.shippingDetails.city,
                pincode: user?.shippingDetails.postalcode,
                state: user?.shippingDetails.state_name,
                country: "India",
                phone: user?.shippingDetails.mobilenumber,
              },
              products: productsToDispatch,
              payment_method: "POSTPAID",
              total: totalPrice,
              shipping_charges: 0,
              warehouse: "281002",
              // order_date: moment(moment.now()).format("YYYY-MM-DD"),
              no_of_pieces: orders.length,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token f2bcbd0391d34042a10dace27bcda69f`,
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
          .then((response) => {
            setLoading(false);
            console.log("Response", response.data.id);
            // var idd = response.data;
            dispatch({ type: "CLEAR_CART" });
            // toast(
            //   `Order has placed successfully, you will receive tracking details shortly🥰😍 `,
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
            history.push("/");
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            // toast(`Something went wrong `, {
            //   position: "top-center",
            //   autoClose: 3000,
            //   hideProgressBar: true,
            //   closeOnClick: true,
            //   pauseOnHover: false,
            //   draggable: true,
            //   progress: undefined,
            // });
          });
      });
  };
  // const [click, setClick] = React.useState(false);
  // const [online, setOnline] = React.useState(false);
  // const [cash, setCash] = React.useState(false);
  // const [cartitem, setCartitem] = React.useState([]);
  // const [cartvalue, setCartvalue] = React.useState(0);
  // const [address, setAddress] = React.useState([]);
  // const [ordercart, setOrdercart] = React.useState([]);
  // const [data, setData] = React.useState([]);
  // const [message, setMessage] = React.useState("");
  // const [shipcart, setShipcart] = React.useState([]);
  // const [orderid, setOrderid] = React.useState(null);
  // const [status, setStatus] = React.useState(false);
  // const [offer, setOffer] = React.useState();
  // const { cart } = props.context;
  // const cartKeys = Object.keys(cart || {});
  // React.useEffect(() => {
  //   //------------------------------------------ShipRocket-API-------------------------------------------------------
  //   // {email:'arorapr94@gmail.com',password:'123@Pri'}
  //   //    axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", {email:'dev.cerbosys@gmail.com',password:'123@Cer'}).then(res=>{
  //   fetch("https://cerbosys.in:4000/draupadi/getUserCartItems", {
  //     headers: authHeaderuser(),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       var off = localStorage.getItem("offer");
  //       console.log("Its working", data);
  //       setCartitem(data.data.message);
  //       var cartlength = data.data.message.length;
  //       var data = data.data.message;
  //       var value = 0;
  //       var ship = [];
  //       for (let i = 0; i < cartlength; i++) {
  //         value =
  //           value +
  //           data[i].product_price +
  //           data[i].design_price -
  //           data[i].offerdiscount;
  //         var data1 = {
  //           sku: String(i),
  //           name: data[i].product_name,
  //           price: String(value),
  //           weight: data[i].weight,
  //           length: data[i].length,
  //           breadth: data[i].breadth,
  //           height: data[i].height,
  //           amount: String(value),
  //           quantity: "1",
  //         };
  //         ship.push(data1);
  //       }
  //       setShipcart(ship);
  //       setCartvalue(value);
  //       var cartii = [];
  //       console.log("cartiiiiiiiiiiiiiiiiiiiiii", cartii);
  //       localStorage.getItem("payment");
  //       for (let i = 0; i < cartitem.length; i++) {
  //         var data = {
  //           product_id: cartitem[i].product_id,
  //           product_quantity: 1,
  //           product_price: cartitem[i].product_price,
  //           offer_id: cartitem[i].offer_id,
  //           customised_designid: cartitem[i].customised_designid,
  //           design_code: cartitem[i].design_code,
  //           price: cartitem[i].design_price,
  //         };
  //         cartii.push(data);
  //         setOrdercart(cartii);
  //         console.log("datadtad", cartii);
  //       }
  //     });
  //   //------------------------------------------ShipRocket-API-------------------------------------------------------
  //   axios
  //     .get("https://cerbosys.in:4000/draupadi/getAllAddress", {
  //       headers: authHeaderuser(),
  //     })
  //     .then((res) => {
  //       console.log("getAllAddress api response==>", res.data.data);
  //       if (res.data.data) {
  //         setData(res.data.data);
  //         setMessage(res.data);
  //       }
  //     });
  // }, [cartvalue]);
  // function cartValue() {
  //   let total = 0;
  //   const start = cartKeys[0];
  //   localStorage.setItem("cartcount", cartKeys.length);
  //   const limit = parseInt(start) + parseInt(cartKeys.length);
  //   var num = 0;
  //   for (let i = start; i < limit; i++) {
  //     var tick = cartKeys[num];
  //     var vallue = cart[tick].payable;
  //     total += vallue;
  //     localStorage.setItem("paynow", total);
  //     num++;
  //   }
  //   return total;
  // }
  // function onClickOnline(e) {
  //   setOnline(true);
  //   setCash(false);
  // }
  // function onClickCash(e) {
  //   setCash(true);
  //   setOnline(false);
  // }
  // function clearCart() {
  //   axios
  //     .get("https://cerbosys.in:4000/draupadi/clearCart", {
  //       headers: authHeaderuser(),
  //     })
  //     .then((res) => {
  //       console.log("clearCart", res);
  //     })
  //     .catch((err) => {
  //       console.log("cathing errors bro", err);
  //     });
  // }
  // const removefromcart = (e) => {
  //   console.log("cart", e);
  //   axios
  //     .get("https://cerbosys.in:4000/draupadi/deleteCart?cart_id=" + e, {
  //       headers: authHeaderuser(),
  //     })
  //     .then((res) => {
  //       console.log("Deleted from cart", res);
  //     });
  // fetch("https://cerbosys.in:4000/draupadi/getUserCartItems",{
  //   headers:authHeaderuser()
  // }).then(res=>res.json()).then(data=>{
  //   console.log("Its working", data.data.message)
  //   setCartitem(data.data.message);
  //   var cartlength = data.data.message.length;
  //   var data = data.data.message;
  //   var value = 0;
  //   var ship = [];
  //   for(let i=0; i<cartlength; i++){
  //     value = value + data[i].product_price + data[i].design_price ;
  //   }
  //   console.log("shipship", ship);
  //    setCartvalue(value)
  // })
  // };

  // function apple(){
  //   var cartii = [];
  //   console.log("cartiiiiiiiiiiiiiiiiiiiiii", cartii);
  //   for(let i=0; i<=cartitem.length ;i++){
  //       console.log("Length");
  //       var data = {
  //         product_id:cartitem.product_id,
  // //         product_quantity:1,
  // //         product_price:cartitem.product_price,
  // //         offer_id:cartitem.offer_id,
  // //         customised_designid:cartitem.design_id,
  // //         design_code:cartitem.design_code,
  // //         design_price:cartitem.design_price
  // //       }
  // //       cartii.push(data)
  // //   }
  // //   return cartii;
  // // }

  // function checkout() {
  //   // console.log("Checkout")
  //   localStorage.setItem("paynow", cartvalue);
  //   // alert("Clicked");
  //   var user = localStorage.getItem("user");
  //   user = JSON.parse(user);
  //   console.log("Checkout", address);
  //   console.log("Users", user);
  //   var firstname = address.first_name;
  //   var lastname = address.last_name;
  //   var addressline1 = address.address_line1;
  //   var addressline2 = address.address_line2;
  //   // var address_type = address.address_type;
  //   var city = address.city;
  //   var pincode = address.postalcode;
  //   var state = address.state_name;
  //   // var country =
  //   // var email =
  //   var phonenum = address.mobilenumber;

  //   axios
  //     .post(
  //       "https://cerbosys.in:4000/draupadi/proceedToCheckout",
  //       {
  //         shiprocket_orderid: "",
  //         totalAmount: cartvalue,
  //         discount: 100,
  //         payableAmount: cartvalue,
  //         shipping_id: 1,
  //         status: "pending",
  //         payment_type: online ? "prepaid" : "postpaid",
  //         order_date: "2022-02-05",
  //         products: ordercart,
  //       },
  //       { headers: authHeaderuser() }
  //     )
  //     .then((response) => {
  //       console.log("Response", response.data.id);
  //       var idd = response.data.id;
  //       setOrderid(idd);

  //       axios
  //         .post("https://apiv2.shiprocket.in/v1/external/auth/login", {
  //           email: "dev.cerbosys@gmail.com",
  //           password: "123@Cer",
  //         })
  //         .then((res) => {
  //           console.log("Shippop", res.data.token);
  //           console.log("Response-ReCheck", response.data.id);
  //           axios
  //             .post(
  //               "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
  //               {
  //                 order_id: idd,
  //                 full_name: firstname + " " + lastname,
  //                 address1: addressline1,
  //                 address2: addressline2,
  //                 city: city,
  //                 pincode: pincode,
  //                 state: state,
  //                 country: "India",
  //                 //  "billing_email": localStorage.getItem("demail"),
  //                 customer_phone: "0" + phonenum,

  //                 billing_address: {
  //                   first_name: firstname,
  //                   last_name: lastname,
  //                   address1: addressline1,
  //                   address2: addressline2,
  //                   city: city,
  //                   pincode: pincode,
  //                   state: state,
  //                   country: "india",
  //                   phone: "0" + phonenum, //Pad zero at the start of 10 digits
  //                 },

  //                 order_date: new Date(),
  //                 total: "",
  //                 payment_method: localStorage.getItem("payment"),
  //                 products: shipcart,
  //               },
  //               { headers: { Authorization: "Bearer " + res.data.token } }
  //             )
  //             .then((data) => {
  //               console.log("data-data", data);
  //               if (data.status == 200) {
  //                 axios
  //                   .post(
  //                     "https://cerbosys.in:4000/draupadi/updateShipRocketDetails",
  //                     {
  //                       order_id: orderid,
  //                       shiprocket_orderid: data.data.order_id,
  //                       shiprocket_shipmentid: data.data.shipment_id,
  //                     },
  //                     { headers: authHeaderuser() }
  //                   )
  //                   .then((res) => {
  //                     console.log("thanos", res);
  //                     if (res.data.success == true) {
  //                       // alert("true")
  //                       clearCart();
  //                       setStatus(true);
  //                     }
  //                   });
  //               }
  //             })
  //             .catch((err) => {
  //               console.log("error", err);
  //             });
  //         });
  //     });
  // }

  // const addreses = (e) => {
  //   console.log(e);
  //   console.log(data[e]);
  //   setAddress(data[e]);
  // };

  // if (cash) {
  //   localStorage.setItem("payment", "cod");
  // }
  // if (!cash) {
  //   localStorage.setItem("payment", "prepaid");
  // }

  // if (status == true) {
  //   return <Redirect to="/" />;
  // }

  return (
    <>
      <div
        className="hero is-white"
        Style="border-bottom-style:dashed;border-bottom-width:thin;border-bottom-color:#B77304;"
      >
        <div className="hero-body container">
          <h4 className="title" style={{fontSize: "18px"}}>My Cart</h4>
        </div>
      </div>
      <br />
      {cartitem.length ? (
        <div className="container">
          <div className="row">
            <div className="col col-lg-3">
              <div className="container" style={{ minWidth: 150 }}>
                <Link to="/products" Style="text-decoration: none;">
                  <h2
                    className="title"
                    style={{ color: "#000000", fontSize: "18px" }}
                  >
                    <AiOutlineArrowLeft
                      style={{ paddingRight: 15, fontSize: 45 }}
                    />
                    Back To Products
                  </h2>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="container">
                <div className="row">
                  <div className="column" style={{ textAlign: "center" }}>
                    <p
                      className="lead"
                      style={{ color: "green", fontSize: 15 }}
                    >
                      <strong
                        style={{
                          color: "grey",
                          fontSize: 15,
                          textAlign: "right",
                        }}
                      >
                        Cart Value: Rs. {totalPrice}
                      </strong>
                    </p>
                  </div>
                  <div className="column" style={{ textAlign: "center" }}>
                    <p
                      className="lead"
                      style={{ color: "green", fontSize: 15 }}
                    >
                      <strong
                        style={{
                          color: "green",
                          fontSize: 15,
                          textAlign: "right",
                        }}
                      >
                        {cartitem.length} Products in cart
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="container">
                  <div className="column">
                    {/* {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key} 
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
              />
            ))} */}

                    {cartitem.map((data) => {
                      return (
                        <div className="mycart_div">
                          <div className="mycart-productimagedetail-div">
                            <div className="mycart_productimage_div">
                              <img
                                src={`https://cerbosys.in:4000/${data.product_image.substr(
                                  8
                                )}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  backgroundColor: "grey",
                                }}
                              />
                            </div>
                            <div className="mycart_product_detail">
                              <div>{data.product_name}</div>
                              <div className="mycart_product_price">
                                Price ₹{" "}
                                {data.product_price -
                                  (data.price ? data.price : 0)}
                              </div>
                            </div>
                          </div>
                          {data.designimage == null ? (
                            ""
                          ) : (
                            <div className="mycart_design_div">
                              <div
                                className="cart-plus"
                                style={{
                                  fontSize: "30px",
                                  fontWeight: "600",
                                  color: "#808080",
                                }}
                              >
                                +
                              </div>
                              <div className="mycart-productimagedetail-div">
                                <div className="mycart_designimage_div">
                                  <img
                                    src={`https://cerbosys.in:4000/${data.designimage.substr(
                                      8
                                    )}`}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "12px",
                                    }}
                                  />
                                  {/* <figcaption style={{margin:"auto", width:"70px"}}>Design</figcaption> */}
                                </div>
                                <div className="mycart_designdetail_div">
                                  <div
                                    style={{
                                      borderRadius: "5px",
                                      color: "black",
                                      fontSize: "15px",
                                      fontWeight: "500",
                                      padding: "3px",
                                    }}
                                  >
                                    {data.design_code}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      marginTop: "10px",
                                      padding: "3px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Rs.{data.price}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="mycart_totalvalue_div">
                            <div
                              style={{ fontSize: "13px", fontWeight: "500" }}
                            >
                              {/* {"data.design_price +
                                data.product_price -
                                data.offerdiscount"} */}
                            </div>
                          </div>
                          <span
                            className="mycart_cross cursor-pointer"
                            onClick={() => {
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: data.uid,
                              });
                              // toast(
                              //   `${data.product_name} is removed from your cart ! 😥😥 `,
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
                            style={{ color: "#808080" }}
                          >
                            <ImCross />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <br />
              {/* <h1
                style={{
                  fontFamily: "Amiri, Serif",
                  fontSize: 25,
                  color: "#616161",
                  paddingLeft: "30px",
                }}
              >
                Choose Your Address
              </h1> */}
              <br />

              <div>
                <div className="container">
                  <h3 style={{fontSize: "18px", fontWeight:"700", borderBottom: "2px solid #00000080", display: "inline", paddingBottom: -5}}>Your Shipping Address:</h3>
                  {user.shippingDetails ? (
                    <div>
                      <br></br>
                   <b> <p style={{textTransform: "capitalize"}}>
                      {user.shippingDetails.first_name + " "}
                      {user.shippingDetails.last_name + " "}
                    </p> </b>

                    <p style={{marginTop: -15}}>
                      {user.shippingDetails.address_line1 + " "}
                      {user.shippingDetails.address_line2 + " "}
                    </p>

                    <p style={{marginTop: -15}}>
                      {user.shippingDetails.city}, &nbsp;
                      {user.shippingDetails.state_name}, &nbsp;
                      {user.shippingDetails.postalcode}
                    </p>

                    <b> <p style={{marginTop: -15}}>
                      {user.shippingDetails.mobilenumber}
                    </p> </b>
                    </div>
                  ) : (
                    <p>Kindly update Shipping details</p>
                  )}
                  <Link to="/address" className="!text-neutral-700 ">
                    <a style={{color: "blue"}}>
                      Change Shipping Address?
                    </a>
                  </Link>
                </div>
              </div>
              <br />
              <div className="column w-[300px] ">
                <div
                  className="box !h-[100px]"
                  style={{ backgroundColor: "#F4F4F4", borderRadius: 10 }}
                >
                  <div className="container">
                    <Radio.Group
                      onChange={(e) => setModeOfPayment(e.target.value)}
                      value={modeOfPayment}
                    >
                      <Radio value="cash">
                        &nbsp;&nbsp;
                        <span>Cash on Delivery</span>
                      </Radio>
                      <Radio value="online">
                        &nbsp;&nbsp;
                        <span>Online Payment</span>
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              {user?.shippingDetails ? null : (
                <p className="text-red-700 font-bold">
                  *kindly update your shipping details to place an order*
                </p>
              )}
              <div className="column is-12 is-clearfix">
                <br />
                <div className="is-pulled-left">
                  {true && (
                    //<Link to="/paytoOrder">
                    <button
                      className="button is-large"
                      style={{
                        borderRadius: 5,
                        height: 45,
                        fontSize: 15,
                        fontWeight: "bold",
                        backgroundColor: "#BA7D82",
                        color: "white",
                      }}
                      onClick={() => {
                        setLoading(true);
                        if (modeOfPayment == "online") {
                          // displayRazorpay();
                          onlineProceedToCheckOut();
                        } else if (modeOfPayment == "cash") {
                          // displayRazorpay();
                          offlineProceedToCheckOut();
                        }
                      }}
                      disabled={
                        (user.shippingDetails ? false : true) || loading
                      }
                    >
                      <FaShoppingCart style={{ marginRight: 10, paddingBottom: 3 }} />
                      {loading ? "Processing..." : "Proceed to Pay"}
                    </button>
                    // </Link>
                  )}
                </div>
                <div className="is-pulled">
                  <button
                    onClick={() => {
                      dispatch({
                        type: "CLEAR_CART",
                        payload: null,
                      });
                      // toast(`Your cart  has been Cleared 😥😥 `, {
                      //   position: "top-center",
                      //   autoClose: 3000,
                      //   hideProgressBar: true,
                      //   closeOnClick: true,
                      //   pauseOnHover: false,
                      //   draggable: true,
                      //   progress: undefined,
                      // });
                      // toast("Cart is cleared successfully");
                      // message.success("Cart is cleared successfully");
                    }}
                    style={{
                      borderRadius: 5,
                      height: 4500,
                      fontSize: 15,
                      fontWeight: "bold",
                      backgroundColor: "#808080",
                      color: "white",
                      marginLeft: 30,
                      display: "none"
                    }}
                    className="button is-large flex items-center "
                  >
                    <MdDeleteForever size={20} />
                    &nbsp;<span style={{
                      paddingTop: 6 ,
                      
                    }}>Clear Cart</span>
                  </button>
                </div>
              </div>
            </div>
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
      ) : (
        <div className="container" style={{ textAlign: "center" }}>
          <div className="title has-text-grey-light">No item in cart!</div>
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
      )}
    </>
  );
};

export default withContext(Cart);
