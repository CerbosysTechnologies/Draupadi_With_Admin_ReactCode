import React from "react";
import {
  ShopContainer,
  ShopContainerImg1,
  ShopContainerImgTwo,
  ShopContainerImg3,
  ShopBtn,
} from "./shopElements";
//import image1 from "../../images/threeInOne.svg";
import img from '../../images/Group 1580.png';
import image2 from "../../images/_DSC4690.jpg";
import image3 from "../../images/_DSC4742.jpg";
import { Link } from "react-router-dom";
import "./shop.css";
const Shop = () => {
  return (
    <ShopContainer id="sdiv" style={{marginBottom:'30px'}}>
      <Link to="/products" className="strong">
      <ShopContainerImg1 src={img} />
      {/* <ShopContainerImgTwo src={image2}/>
       <ShopContainerImg3 src={image3}/> */}
        {/* <ShopBtn>
          <strong style={{ color: "#FFFFFF", fontFamily: "Amiri,serif" }}>
            {" "}
          </strong>
        </ShopBtn> */}
      </Link>
      <p
              style={{
                textAlign: "center",
                fontFamily: "Amiri,serif",
                fontSize: 18,
                color: "#404040",
                marginTop:"8px"
              }}
            >
              <b>Our exquisite bags are upcycled from sarees and handcrafted by women inspired by the
              unspoken will and resilience of Draupadi.</b>
            </p>
    </ShopContainer>
  );
};
export default Shop;