import React from "react";
import Hero from "../Hero";
import Content from "../Content";
import Products from "../Products";
import Shop from "../Shop";
import Social from "../Social";
import Profile from "../../component/profile";
import Footer from "../Footer";
import "./home.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";

const Home = () => {
  const wishcount = useSelector((state) => state.wishlist).length;
  return (
    <>
      <div>
        {/**Wish count start */}
        <div className="fixed z-10 top-1/2 bg-orange-500 p-1 flex items-center  justify-center">
          <NavLink to="/Mywishlist" className="text-white flex no-underline text-md">
            {/* {wishcount ? <div className="pcount ">{wishcount} </div> : ""} */}

            <FaHeart className="hover:text-red-500  text-xl md:!mr-1 " />
            <span className="!hidden md:!inline">MY WISHLIST</span>
          </NavLink>
        </div>
        {/**wish count end */}
        <Hero />
        <Content />
        <Products />
        <Shop />
        <Social />
      </div>
    </>
  );
};
export default Home;
