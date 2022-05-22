import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import "./revisedprofile";
import { useDispatch, useSelector } from "react-redux";
import edit from "./edit.png";
import loc from "./shopping-bag.png";
import logout from "./exit.png";
import notes from "../profileIcons/notes.svg";
import { WhatsappLogo } from "../../components/Hero/mainElements";
import { whats } from "../../components/Hero/Icons";

import wave from "./draupadiwave.png";




//Remove box shadow from the icons
// box-shadow: 8px 10px 18px #00000033;
// -webkit-box-shadow: 8px 10px 18px #00000033;
// -moz-box-shadow: 8px 10px 18px #00000033;

//Styled Component
const FeaturedDiv = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-between;
  position: relative;
  border-top-style: dashed;
  border-top-width: 2px;
  border-top-color: black;
`;

const FeaturedTitle = styled.span`
  display: flex;
  font-size: 25px;
  justify-content: center;
  margin-top:10px;
  position: relative;
`;
const FeaturedTitle1 = styled.span`
  font-size: 16px;
  textDecoration:none
`;

const FeaturedItem = styled.div`
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  border: line;
  border-width: 2px;
  border-color: red;
`;

const FeaturedMoneyContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px 0px 0px;
  color: #ff751a;
`;



export default function Profile(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);

    if (user.token == undefined) {
        history.push("/");
    }

    return (
        <>
            <a href='https://wa.me/+916396173148' target="_blank"><WhatsappLogo>{whats}</WhatsappLogo></a>
            <div className="container !!flex-col  md:!flex">
                <div
                    className="container"
                    style={{ display: "flex", flexDirection: "column" }}>
                    <FeaturedTitle>
                        <strong>My Account</strong>
                    </FeaturedTitle>


                    <FeaturedDiv className="main-container"
                        style={{ display: "flex", flexDirection: "column" }}>
                        {/* Image and content div */}
                        <div className="container"
                            style={{ display: "flex", flexDirection: "row", height: "280px", marginTop: "50px" }}>
                            <div className="grid grid-cols-3">
                                <img src={wave} alt="DP" className="col-span-1"
                                    style={{
                                        width: "300px", height: "100px",
                                        position: "relative", justifyContent: "center",
                                        marginLeft: "60px"
                                    }}></img>
                                <span className="col-span-2" style={{ marginTop: "50px", marginLeft: "20px", fontSize: "20px" }}>
                                    She was born out of the fire. With lotus eyes, dense hair, and convex nails, she was as mystical as beautiful. An economist by choice, valiant empress, an outspoken, opinionated, and fearless warrior. She was anything but a 'tragic heroine'.</span>

                            </div>

                        </div> {/* Image and content div ends */}

                        {/* Three Boxes Start */}
                        <div className="threeBoxContainer grid grid-cols-3">
                        {/* Address Box */}
                        <div
                            className="container inner-container"
                            style={{ maxWidth: "260px", maxHeight: "260px" }}
                        >
                            <FeaturedItem className="feature-item">
                                <FeaturedMoneyContainer className="edit-info-div">
                                    <Link
                                        to="/address"
                                        style={{ color: "black", position: "relative", textDecoration: "none" }}>
                                        <img src={edit} className="edit-user"
                                            style={{ width: "50px", height: "50px", marginLeft: "46px", marginBottom:"10px" }} />

                                        <FeaturedTitle1 className="edit-info-div">
                                            <strong>Modify Your Address</strong>
                                        </FeaturedTitle1>
                                    </Link>
                                </FeaturedMoneyContainer>

                            </FeaturedItem>
                        </div>
                        {/* Address Box Ends*/}

                        {/* Orders Box Start */}
                        <div
              className="container"
              style={{ maxWidth: 260, maxHeight: 260 }}>
              <FeaturedItem className="feature-item">
                <FeaturedMoneyContainer className="edit-info-div">
                  <Link
                    to="/yourorders"
                    style={{ color: "#BA7D82", position: "relative" }}
                    className="last-order">
                    <img src={loc} style={{ width: "50px", height: "50px", marginLeft: "1px", marginBottom:"10px" }}/>
                    {/* </div> */}
                  </Link>
                </FeaturedMoneyContainer>
                <FeaturedTitle1 className="edit-info-div">
                  <strong>View Your Last Orders</strong>
                </FeaturedTitle1>
              </FeaturedItem>
            </div>
            {/* Orders Box End */}

            {/* Logout Box */}

            <div
              className="container inner-container"
              style={{ maxWidth: "260px", maxHeight: "260px" }}
            >
              <FeaturedItem className="feature-item">
                <FeaturedMoneyContainer className="edit-info-div">
                  <Link
                    to="/"
                    style={{ color: "#BA7D82", position: "relative" }}
                  >
                    <img
                      className="limgo"
                      src={logout}
                      style={{ width: "50px", height: "50px", marginLeft: "1px", marginBottom:"10px"}}
                      onClick={() => {
                        dispatch({ type: "LOGOUT_USER" });
                        dispatch({ type: "CLEAR_CART" });
                        dispatch({ type: "CLEAR_WISHLIST" });
                      }}/>
                  </Link>
                </FeaturedMoneyContainer>
                <FeaturedTitle1 className="edit-info-div">
                  <strong>Logout</strong>
                </FeaturedTitle1>
              </FeaturedItem>
            </div>



            {/* Logout Box Ends*/}
                        </div>
                        {/* Three Boxes End */}
                        
                    </FeaturedDiv>

                </div>
            </div>
        </>
    );

}