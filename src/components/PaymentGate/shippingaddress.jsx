import React, { useEffect, useState } from "react";
import { Row, Form, Col, Table } from "react-bootstrap";
import axios from "axios";
import authHeaderuser from "../../services/auth-headers";

import { Link, useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "./shippingAddress.css";

const Ships = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [update, setUpdate] = useState(false);
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

  function selectState(postalcode) {
    if (postalcode.length < 6 || postalcode.length > 6) return;

    let data = axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://www.postalpincode.in/api/pincode/${postalcode}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            //'mode':'no-cors'
          },
        }
      )
      .then((res) => {
        let item, i;
        res.data.PostOffice.map((item, i) => {
          console.log(res.data.PostOffice[i].State);
          setState(res.data.PostOffice[i].State);
        });
      });
  }
  const user = useSelector((state) => state.user);

  useEffect(async () => {
    await axios
      .get("https://cerbosys.in:4000/draupadi/getAllAddress", {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          const i = res?.data?.data.length - 1;
          console.log("address--get--", res?.data?.data[i]);
          console.log("address--get--real", res);
          dispatch({
            type: "LOGIN_USER",
            payload: { shippingDetails: res?.data?.data[i] },
          });
          setUpdate(true);

          setFirstname(res?.data?.data[i].first_name);
          setLastname(res?.data?.data[i].last_name);
          setAddress1(res?.data?.data[i].address_line1);
          setAddress2(res?.data?.data[i].address_line2);
          setMobile(res?.data?.data[i].mobilenumber);
          setCity(res?.data?.data[i].city);
          setZip(res?.data?.data[i].postalcode);
          setState(res?.data?.data[i].state_name);
          setLandmark(res?.data?.data[i].landmark);
          setAddresstype(res?.data?.data[i].address_type);
        }
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (false) {
      return axios
        .post(
          "https://cerbosys.in:4000/draupadi/insertShippingAddress",
          {},
          { headers: authHeaderuser() }
        )
        .then((res) => {
          console.log(res);
        });
    } else {
      //return axios.post('https://45.80.152.232:4000/draupadi/updateShippingAddress',{
      return axios
        .post(
          "https://cerbosys.in:4000/draupadi/updateShippingAddress",
          {},
          { headers: authHeaderuser() }
        )
        .then((res) => {
          console.log(res);
        });
    }
  }

  function getAddress(id) {
    //return axios.get(`https://45.80.152.232:4000/draupadi/getAddressByShippingId?shipping_id=${id}`,{headers:authHeaderuser()}).then(res=>{
    return axios
      .get(
        `https://cerbosys.in:4000/draupadi/getAddressByShippingId?shipping_id=${id}`,
        { headers: authHeaderuser() }
      )
      .then((res) => {
        console.log("address", res);
      });
  }

  // function deleteAddress(id) {
  //   //return axios.get(`https://45.80.152.232:4000/draupadi/deleteShippingAddress?shipping_id=${id}`,{headers:authHeaderuser()})
  //   return axios
  //     .get(
  //       `https://cerbosys.in:4000/draupadi/deleteShippingAddress?shipping_id=${id}`,
  //       { headers: authHeaderuser() }
  //     )
  //     .then((res) => console.log(res));
  // }
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
        ` ${
          update
            ? "https://cerbosys.in:4000/draupadi/updateShippingAddress"
            : "https://cerbosys.in:4000/draupadi/insertShippingAddress"
        } `,
        {
          shipping_id: user?.shippingDetails?.shipping_id,
          user_id: user?.userId,
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
        console.log("update/indsert---address---=====", res);
        if (res.data.status == 200) {
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
            payload: { shippingDetails: res?.data?.data[0] },
          });
          toast(`Data saved successfully 🤗 `, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          history.push("/profile");
        }

        if (res.data.status == 400) {
          toast.error(`Something went wrong `, {
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
          <div className="hero-body container">
            <h4 className="title">Manage Your Address</h4>
          </div>
        </div>
        <br />
        <Table Style="border: none;">
          <tr Style="border: none;">
            <td Style="border: none;" className="backUpDiv">
              <div className="container" style={{ minWidth: 100 }}>
                <Link to="/profile" Style="text-decoration: none;">
                  <h2
                    className="title"
                    style={{ color: "#B77304", fontSize: 21 }}
                  >
                    Back to Account
                  </h2>
                </Link>
              </div>
            </td>
            <td Style="border: none;">
              <Form onSubmit={(e) => addUpdateAddress(e)}>
                <Row className="mb-4">
                  <Form.Group as={Col} md="3" controlId="validationCustom01">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      // placeholder="First name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      // placeholder="Last name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Address Line1</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="Address Line1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a address.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Address Line2</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="Address Line2"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a address.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col} md="3" controlId="validationCustom08">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid mobile.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* <Form.Group as={Col} md="3" controlId="validationCustom08">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" value={email} onChange={handleChangeEmail} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group> */}

                  <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="City"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid city.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom07">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="Zip"
                      value={zip}
                      onChange={(e) => {
                        selectState(e.target.value);
                        setZip(e.target.value);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid zip.
                    </Form.Control.Feedback>
                  </Form.Group>
                  {console.log("state--", state)}
                  <Form.Group as={Col} md="3" controlId="validationCustom07">
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      value={state}
                      // defaultValue={state}
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
                </Row>
                <Row className="mb-4">
                  {/*<Form.Group as={Col} md="3" controlId="validationCustom22">
                    <Form.Label>Landmark</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid landmark.
                    </Form.Control.Feedback>
                  </Form.Group> */}
                  {/* <Form.Group as={Col} md="3" controlId="validationCustom23">
                    <Form.Label>Address Type</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="Home , office etc"
                      value={addresstype}
                      onChange={(e) => setAddresstype(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid address type.
                    </Form.Control.Feedback>
                  </Form.Group> */}
                  <Form.Group as={Col} md="3" controlId="validationCustom11">
                    <Form.Control
                      type="hidden"
                      // placeholder="id"
                      value={() => {}}
                    />
                  </Form.Group>
                </Row>
                <button
                  className="button is-normal"
                  Style="background-color:#BA7D82;color:white;border-radius:15px;"
                  style={{ width: 250 }}
                  type="submit"
                >
                  {update ? "Update Address" : "+ Add Address"}
                </button>
              </Form>
            </td>
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
    </>
  );
};

export default Ships;
