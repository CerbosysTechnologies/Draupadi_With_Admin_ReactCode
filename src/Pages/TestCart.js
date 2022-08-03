import React, { useEffect, useState } from "react";
// import { Row, Form, Col, Table } from "react-bootstrap";
import axios from "axios";
//import authHeaderuser from "../../services/auth-headers";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
//import { MDBInput } from "mdbreact";
//import NavBar from '../NavBar/index'
//import Footer from "../Footer/index";
import { Link, useHistory } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Refresh } from "styled-icons/boxicons-regular";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import "./cart.css";

import Ships from "../components/PaymentGate/shippingaddress";
import { Radio } from "antd";

import { MDBInput } from "mdbreact";

import { ImCross } from "react-icons/im";

import { InputGroup, FormControl, Button } from "react-bootstrap";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { message } from "antd";

import moment from "moment";
import { MdDeleteForever } from "react-icons/md";

import "./shippingAddress.css";

function TestCart() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [update, setUpdate] = useState(false);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addresstype, setAddresstype] = useState("");
  const statess = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const user = useSelector((state) => state.user);
  const cartitem = useSelector((state) => state.cart);

  var totalPrice = 0;
  if (cartitem) {
    for (let i = 0; i < cartitem.length; i++) {
      totalPrice += cartitem[i].product_price;
    }
  }

  const [modeOfPayment, setModeOfPayment] = useState("online");
  const [loading, setLoading] = useState(false);
  const [wareIQproducts, setwareIQproducts] = useState("");

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
      customised_designid: 1,
      design_code: "AB200",
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
          shipping_id: user?.shippingDetails?.shipping_id,
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
        // console.log("-------order id generating", res.data);
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
                      toast(
                        `Order has placed successfully, you will receive tracking details shortly 🥰😍 `,
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
                      history.push("/");
                    })
                    .catch((err) => {
                      setLoading(false);
                      console.log(err);
                      toast.error(`Oops, something went wrong `, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });
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
          toast.error(`Oops, something went wrong `, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast(`Oops, something went wrong `, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
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
            toast(
              `Order has placed successfully, you will receive tracking details shortly🥰😍 `,
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
            history.push("/");
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            toast(`Something went wrong `, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          });
      });
  };

  const addUpdateAddress = async (e) => {
    //e.preventDefault();
    await axios
      .post(
        "https://cerbosys.in:4000/draupadi/userLoginWT",
        // ` ${
        //   update
        //     ? "https://cerbosys.in:4000/draupadi/updateShippingAddress"
        //     : "https://cerbosys.in:4000/draupadi/insertShippingAddress"
        // } `

        {
          user_name: email,
          // shipping_id: user?.shippingDetails?.shipping_id,
          // user_id: user?.userId,
          first_name: firstname,
          last_name: lastname,
          address_line1: address1,
          address_line2: address2,
          landmark: landmark,
          state_name: state,
          city: city,
          postalcode: zip,
          mobilenumber: mobile,
          address_type: addresstype,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        console.log("new user entry", res, res?.data);
        if (res.data.status == 200) {
          setEmail("");
          setFirstname("");
          setLastname("");
          setAddress1("");
          setAddress2("");
          setMobile("");
          setCity("");
          setZip("");
          setState("");
          setLandmark("");
          setAddresstype("");
          dispatch({
            type: "LOGIN_USER",
            payload: {
              shippingDetails: res?.data?.shippingDetails,
              token: res?.data?.token,
              userId: res?.data?.userId,
              user_email: res?.data?.user,
              user_name: res?.data?.shippingDetails.first_name,
            },
          });

          if (modeOfPayment == "online") {
            // displayRazorpay();
            onlineProceedToCheckOut();
          } else if (modeOfPayment == "cash") {
            // displayRazorpay();
            offlineProceedToCheckOut();
          }

          //  history.push("/cart");
          // toast(`Data saved successfully 🤗 `, {
          //   position: "top-center",
          //   autoClose: 3000,
          //   hideProgressBar: true,
          //   closeOnClick: true,
          //   pauseOnHover: false,
          //   draggable: true,
          //   progress: undefined,
          // });
        }

        if (res.data.status == 400) {
          //history.push("/login");
          console.log(res);
          toast.error(`You are already a registered member , please login `, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Something went wrong `, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="max-w-[1100px] mx-auto px-2   md:!flex  ">
      {/* Address list */}
      <div className=" pr-4 md:border-r-[1px] border-slate-300 mr-9 md:w-1/2 ">
        {/* //<h2>&nbsp;</h2> */}
        <p className="mt-2 text-[18px]  flex justify-between">
          <span>Contact Information</span>{" "}
          <span>
            <span className=" text-[14px] ">Already have an account?</span>{" "}
            <span
              onClick={() => history.push("/login")}
              className=" text-red-500 text-[14px] cursor-pointer "
            >
              Log in
            </span>{" "}
          </span>{" "}
        </p>
        {/* <form onSubmit={(e) => addUpdateAddress(e)} method="POST"> */}
        <Form
          name="basic"
          onFinish={addUpdateAddress}
          //onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="user_name"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid Email!",
              },
            ]}
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px]"
              // required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />
          </Form.Item>
          {/* <span className="flex  space-x-2">
            <input type="checkbox" className="checked:bg-red-700 " />
            <span>Email me with news and offers</span>
          </span> */}
          <p className="mt-4 text-[18px]">Shipping Address</p>
          <div className="flex items-center space-x-1">
            <Form.Item
              name="first_name"
              rules={[
                {
                  required: true,
                  //  type:"first_name",
                  message: "Please Enter First Name!",
                },
              ]}
            >
              <input
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Please Enter First Name"
                type="text"
                placeholder="First Name"
                className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px]"
                // required
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                {
                  required: true,
                  //  type:"first_name",
                  message: "Please Enter Last Name!",
                },
              ]}
            >
              <input
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Please Enter Last Name"
                type="text"
                placeholder="Last Name"
                className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px] "
                // required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Form.Item>
          </div>
          <Form.Item
            name="address_line1"
            rules={[
              {
                required: true,
                //  type:"first_name",
                message: "Please Enter Address line 1!",
              },
            ]}
          >
            <input
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Please Enter Address"
              type="text"
              placeholder="Address Line 1"
              className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px] mt-[8px]"
              // required
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
            />
          </Form.Item>
          <Form.Item
            name="address_line2"
            rules={[
              {
                required: true,
                //  type:"first_name",
                message: "Please Enter Address Line 2!",
              },
            ]}
          >
            <input
              type="text"
              placeholder="Address Line 2"
              className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px] mt-[8px]"
              // required
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
            />
          </Form.Item>
          <Form.Item
            name="mobilenumber"
            rules={[
              {
                required: true,
                message: "Please Enter Mobile Number!",
              },
              {
                max: 10,
                message: "Please Enter valid Mobile Number!",
              },
            ]}
          >
            <input
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Please Enter Mobile Number"
              type="number"
              placeholder="Mobile Number"
              className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px] mt-[8px]"
              // required
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
          </Form.Item>

          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please Enter City Name!",
              },
              {
                max: 20,

                message: "Please Enter City Name!",
              },
            ]}
          >
            <input
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Please Enter City"
              type="text"
              placeholder="City"
              className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px] mt-[8px]"
              // required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="postalcode"
            rules={[
              {
                required: true,

                message: "Please Enter Postal Code!",
              },
              {
                max: 6,

                message: "Please Enter valid Postal Code!",
              },
            ]}
          >
            <input
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Please Enter Postal Code"
              type="number"
              placeholder="Postal Code"
              className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px] mt-[8px]"
              // required
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="state_name"
            rules={[
              {
                required: true,
                // min:10,
                // max:10,
                //  type:"first_name",
                message: "Please Enter State Name!",
              },
            ]}
          >
            <input
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Please Select State"
              type="text"
              placeholder="State"
              className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px] mt-[8px]"
              // required
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="landmark"
            rules={[
              {
                required: true,
                // min:10,
                // max:10,
                //  type:"first_name",
                message: "Please Enter a Landmark near you!",
              },
            ]}
          >
            <input
              type="text"
              placeholder="Land Mark"
              className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px] mt-[8px]"
              // required
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </Form.Item>

          {/* <Form.Item
            name="address_type"
            rules={[
              {
                required: true,
                // min:10,
                // max:10,
                //  type:"first_name",
                message: "Please Enter your Address type!",
              },
            ]}
          >
            <input
              type="text"
              placeholder="Address Type"
              className="w-full h-[45px] p-2 rounded-md outline-red-800 border-[1.5px] mt-[8px]"
              // required
              value={addresstype}
              onChange={(e) => setAddresstype(e.target.value)}
            />
          </Form.Item> */}

          {/* <span className="flex  space-x-2">
            <input type="checkbox" className="checked:bg-red-700 " />
            <span>Save this information for next time</span>
          </span> */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="p-2 bg-black text-white rounded-md font-bold py-2 my-2 mb-4"
              disabled={loading}
            >
              Continue to Shipping
            </button>
          </div>
        </Form>
        {/* </form> */}
      </div>
      <hr />
      {/* Cart part */}
      <div className="flex-grow  pr-2 p-8 ">
        {cartitem.length ? (
          <div className="">
            <div className="row">
              <div className="">
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
              </div>
              <div className="md:!w-[400px]">
                <div className="container ">
                  <div className="row ">
                    <div className="column" style={{ textAlign: "center" }}>
                      <p
                        className="lead"
                        style={{ color: "green", fontSize: 15 }}
                      >
                        <strong
                          style={{
                            color: "black",
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
                        className="lead text-black"
                        style={{ color: "green", fontSize: 15 }}
                      >
                        <strong
                          style={{
                            color: "black",
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
                {/* <br /> */}
                <div className="">
                  <div className="">
                    {/* <div className="column"> */}
                    {/* {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key} 
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
              />
            ))} */}

                    <div className="flex-col max-w-[550px] mx-auto">
                      {cartitem.map((data) => {
                        return (
                          <div className=" relative flex items-center justify-between my-2">
                            <MdCancel
                              className="absolute top-0 right-[-5px]"
                              onClick={() =>
                                dispatch({
                                  type: "REMOVE_FROM_CART",
                                  payload: data.uid,
                                })
                              }
                            />
                            <div className="flex items-center space-x-2">
                              <img
                                src={`https://cerbosys.in:4000/${data.product_image.substr(
                                  8
                                )}`}
                                className="w-[60px] h-[70px] object-cover rounded-md"
                              />
                              <div>
                                <span>{data?.product_name}</span>
                              </div>
                            </div>
                            <div>
                              ₹
                              {data.product_price -
                                (data.price ? data.price : 0)}
                            </div>
                          </div>
                        );
                      })}
                      {/* <hr />
                        <div className="flex justify-between my-4 space-x-2">
                          <input
                            type="text"
                            placeholder="Gift card or discount code"
                            className="h-12 p-2 rounded-md border-1 border-gray-300"
                          />
                          <button className="px-4 bg-slate-400 rounded-lg h-12">
                            Apply
                          </button>
                        </div> */}
                      <hr />
                      <div className="flex justify-between my-2">
                        <span>Subtotal</span>
                        <span>Rs.{totalPrice}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between my-2">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-2xl">
                          Rs {totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <br /> */}
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
                {/* <br /> */}

                <div>
                  {/* <div className="container">
                    <h3>Your Shipping Address:</h3>
                    {user.shippingDetails ? (
                      <p>
                        {user.shippingDetails.first_name + " "}
                        {user.shippingDetails.last_name + " "},
                        {user.shippingDetails.address_line1 + " "},
                        {user.shippingDetails.address_line2 + " "},
                        {user.shippingDetails.city},
                        {user.shippingDetails.state_name},
                        {user.shippingDetails.postalcode},
                        {user.shippingDetails.mobilenumber}
                      </p>
                    ) : (
                      <p>Kindly update Shipping details</p>
                    )}
                    <Link to="/address" className="!text-neutral-700 ">
                      <button className="bg-gray-300 shadow-md rounded-md p-2 px-3 hover:bg-slate-400 hover:text-neutral-700 transition-all duration-200 ">
                        Update shipping address
                      </button>
                    </Link>
                  </div> */}
                </div>
                {/* <br /> */}
                <div className="column w-[300px] ml-5">
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
                {/* {user?.shippingDetails ? null : (
                  <p className="text-red-700 font-bold ml-5">
                    *kindly update your shipping details to place an order*
                  </p>
                )} */}
                <div className="column is-12 is-clearfix flex justify-center mb-4">
                  <br />
                  {/* <div className="is-pulled-left ml-5">
                    {true && (
                      //<Link to="/paytoOrder">
                      <button
                        className="p-2 flex items-center bg-black"
                        style={{
                          borderRadius: 5,
                          height: 45,
                          fontSize: 15,
                          fontWeight: "bold",
                          // backgroundColor: "#eb3434",
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
                        <FaShoppingCart style={{ marginRight: 10 }} />
                        {loading ? "Processing..." : "Proceed to Pay"}
                      </button>
                      // </Link>
                    )}
                  </div> */}
                  <div className="is-pulled flex">
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
                        height: 45,
                        fontSize: 15,
                        fontWeight: "bold",
                        //backgroundColor: "#eb3434",
                        color: "white",
                        // marginLeft: 30,
                      }}
                      className="!ml-9 p-2 flex items-center bg-white text-black border-2 border-black "
                    >
                      <MdDeleteForever size={20} />
                      &nbsp;<span>Clear Cart</span>
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
      </div>
    </div>
  );
}

export default TestCart;
