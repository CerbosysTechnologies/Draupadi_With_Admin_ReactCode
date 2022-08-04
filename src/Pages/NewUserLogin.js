import React, { useEffect, useState } from "react";
import { Row, Form, Col, Table } from "react-bootstrap";
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

import "./shippingAddress.css";

const NewUserLogin = () => {
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
  var formData = new FormData();
  formData.append("user_id", user?.userId);
  formData.append("first_name", firstname);
  formData.append("last_name", lastname);
  formData.append("address_line1", address1);
  formData.append("address_line2", address2);
  formData.append("landmark", "landmark");
  formData.append("state_name", state);
  formData.append("city", city);
  formData.append("postalcode", zip);
  formData.append("mobilenumber", mobile);
  //formData.append("address_type", addresstype);
  formData.append("address_type", "Home");
  const addUpdateAddress = async (e) => {
    e.preventDefault();
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
          history.push("/cart");
          toast(`Data saved successfully 🤗 `, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
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
    <>
      <div className="container" style={{ position: "relative" }}>
        <div
          className="hero is-white"
          Style="border-bottom-style:dashed;border-bottom-width:thin;border-bottom-color:#BA7D82;"
        >
          {/* <div className="hero-body container"> */}
          <h4 className="title">Draupadi</h4>
          <h3>Contact information</h3>
          {/* </div> */}
        </div>
        <br />
        <p>
          Already have an account?<Link to="/login">Log in</Link>
        </p>
        <h5>Shipping Details (Cart Value:Rs{totalPrice}/-) </h5>
        <Form onSubmit={(e) => addUpdateAddress(e)} className="mr-2">
          <Row className="mb-4">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                className="h-10 my-1"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              {/* <h5>Shipping Details</h5> */}
              <Form.Control
                required
                type="text"
                className="h-10 my-1"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Control
                required
                type="text"
                className="h-10 my-1"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Control
                type="text"
                className="h-10 my-1"
                placeholder="Address line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Control
                type="text"
                className="h-10 my-1"
                placeholder="Address line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a address.
              </Form.Control.Feedback>
            </Form.Group>
            {/* </Row>
                <Row className="mb-4"> */}
            <Form.Group as={Col} md="4" controlId="validationCustom08">
              <Form.Control
                type="text"
                className="h-10 my-1"
                placeholder="Enter Mobile No."
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid mobile.
              </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group as={Col} md="4" controlId="validationCustom08">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" value={email} onChange={handleChangeEmail} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group> */}

            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Control
                type="text"
                className="h-10 my-1"
                placeholder="Enter City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom07">
              <Form.Control
                type="number"
                className="h-10 my-1"
                placeholder="Enter Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom07">
              <Form.Select
                className="h-10 my-1"
                onChange={(e) => setState(e.target.value)}
              >
                {statess.map((data, i) => {
                  return (
                    <option value={data} key={i}>
                      {data}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            {/* </Row>
                <Row className="mb-4"> */}
            {/* <Form.Group as={Col} md="4" controlId="validationCustom22">
              <Form.Control
                type="text"
                className="h-10 my-1"
                placeholder="Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid landmark.
              </Form.Control.Feedback>
            </Form.Group> */}
            {/* <Form.Group as={Col} md="4" controlId="validationCustom23">
              <Form.Control
                type="text"
                className="h-10 my-1"
                placeholder="Home , office etc"
                value={addresstype}
                onChange={(e) => setAddresstype(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address type.
              </Form.Control.Feedback>
            </Form.Group> */}
            <Form.Group as={Col} md="4" controlId="validationCustom11">
              <Form.Control
                type="hidden"
                // placeholder="id"
                value={() => {}}
              />
            </Form.Group>
          </Row>
          <button
            className="button is-normal mb-6"
            Style="background-color:#BA7D82;color:white;border-radius:5px;"
            style={{ width: 250 }}
            type="submit"
          >
            Continue to shipping
          </button>
        </Form>
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
    </>
  );
};

export default NewUserLogin;
