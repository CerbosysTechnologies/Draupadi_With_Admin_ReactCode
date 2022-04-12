import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import edit from "./profileIcons/edit.svg";
import loc from "./profileIcons/loc.svg";
import logout from "./profileIcons/logout.svg";
import notes from "./profileIcons/notes.svg";
import { WhatsappLogo } from "../components/Hero/mainElements";
import { whats } from "../components/Hero/Icons";

const FeaturedDiv = styled.div`
  display: flex;
  margin: 30px;
  justify-content: space-between;
  position: relative;
  border-top-style: dashed;
  border-top-width: thin;
  border-top-color: black;
`;
const FeaturedItem = styled.div`
  flex: 1;
  margin: 40px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;

  box-shadow: 8px 10px 18px #00000033;
  -webkit-box-shadow: 8px 10px 18px #00000033;
  -moz-box-shadow: 8px 10px 18px #00000033;
`;

const FeaturedTitle = styled.span`
  font-size: 20px;
`;
const FeaturedTitle1 = styled.span`
  font-size: 13px;
`;

const FeaturedMoneyContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
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
          style={{ display: "flex", flexDirection: "column" }}
        >
          <FeaturedDiv
            className="main-container"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <FeaturedTitle>
              <strong>My Account</strong>
            </FeaturedTitle>
            {/* <div className="container" style={{maxWidth: "260px" , maxHeight: "260px"}}>
              <FeaturedItem className="feature-item">
                <FeaturedMoneyContainer className="edit-info-div">
                  <Link
                    to="/yourinfo"
                    style={{ color: "#BA7D82", position: "relative" }}
                  >
                    <img src={edit} className="edit-user" />
                  </Link>
                </FeaturedMoneyContainer>
                <FeaturedTitle1 className="edit-info-div">
                  <strong>Edit Your Information</strong>
                </FeaturedTitle1>
              </FeaturedItem>
            </div> */}
            <div
              className="container inner-container"
              style={{ maxWidth: "260px", maxHeight: "260px" }}
            >
              <FeaturedItem className="feature-item">
                <FeaturedMoneyContainer className="edit-info-div">
                  <Link
                    to="/address"
                    style={{ color: "#BA7D82", position: "relative" }}
                  >
                    <img src={loc} className="edit-user" />
                  </Link>
                </FeaturedMoneyContainer>
                <FeaturedTitle1 className="edit-info-div">
                  <strong>Modify Your Address</strong>
                </FeaturedTitle1>
              </FeaturedItem>
            </div>
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
                      onClick={() => {
                        dispatch({ type: "LOGOUT_USER" });
                        dispatch({ type: "CLEAR_CART" });
                        dispatch({ type: "CLEAR_WISHLIST" });
                      }}
                      // <RiLogoutCircleRFill
                      //   onClick={() => {
                      //     dispatch({ type: "LOGOUT_USER" });
                      //     dispatch({ type: "CLEAR_CART" });
                      //     dispatch({ type: "CLEAR_WISHLIST" });
                      //   }}
                      // className="log-user"
                    />
                  </Link>
                </FeaturedMoneyContainer>
                <FeaturedTitle1 className="edit-info-div">
                  <strong>Logout</strong>
                </FeaturedTitle1>
              </FeaturedItem>
            </div>
          </FeaturedDiv>
        </div>
        <div className="container">
          <FeaturedDiv className="main-container">
            <FeaturedTitle>
              <strong>My Orders</strong>
            </FeaturedTitle>
            <div
              className="container"
              style={{ maxWidth: 260, maxHeight: 260 }}
            >
              <FeaturedItem className="feature-item">
                {/* <FeaturedTitle1>View Your Last Orders</FeaturedTitle1> */}
                <FeaturedMoneyContainer className="edit-info-div">
                  {/* <Link
                    to="/yourorders"
                    style={{ color: "#BA7D82", position: "relative" }}
                    className="last-order"
                  >
                    <CgNotes style={{ width: 80, height: 80 }} />
                  </Link> */}
                  <Link
                    to="/yourorders"
                    style={{ color: "#BA7D82", position: "relative" }}
                    className="last-order"
                  >
                    {/* <CgNotes style={{ width: 80, height: 80 }} /> */}
                    {/* <div className="edit-user"> */}
                    <img src={notes} />
                    {/* </div> */}
                  </Link>
                </FeaturedMoneyContainer>
                <FeaturedTitle1 className="edit-info-div">
                  <strong>View Your Last Orders</strong>
                </FeaturedTitle1>
              </FeaturedItem>
            </div>
          </FeaturedDiv>
        </div>
      </div>
    </>
  );
}
