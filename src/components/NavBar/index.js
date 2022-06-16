import React, { useState } from "react";

import { NavLink } from "./NavbarElements";
import { Link, useLocation } from "react-router-dom";
import withContext from "../AllProducts/button";
import dp1 from "../../images/dp1.png";
//import { ReactComponent as Logo } from '../../images/dp1.png';
import "../../Pages/products/BagsCategory";
import "../../Pages/products/laptopSleeves";
import "../../Pages/products/wineCovers";
import "../../Pages/products/hairAccessories";
import "../../Pages/products/coverBags";
import "../../Pages/products/potlis";
import "../Home/index";
import "./nav.css";
// import "./navbar.css";
import { Modal, Button, Space } from "antd";
import { CgMenu } from "react-icons/cg";
import "../../component/form.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import authHeaderuser from "../../services/auth-headers";
import AuthService from "../../services/auth.service";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaUserCircle, FaHeart, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
//import ProductList from '../AllProducts/ProductsList'
//import Scroll from '../../services/scroll'
import Scroll from "react-scroll-to-element";
import { NavDropdown } from "react-bootstrap";
import Logintbygoogle from "../../component/loginwithgoogle";
//import { logg } from "./Icons";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
//import { FiUser } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import {FaSearch} from "react-icons/fa";
import Search from "./search_icon.svg";
import Person from "./person_icon_svg.svg";
import Cart from "./cart_icon_svg.svg";
import Logo from "./draupadi.svg.svg"
var scrollToElement = require("scroll-to-element");
const NavBar = (props) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const [navBar, setNavBar] = useState(false);
  const [search, setSearch] = useState("");
  const [side, setSide] = useState(false);

  const [category, setcategory] = useState([]);
  const [toggle, setToggle] = useState(false);
  //const[data,setData] = useState([])
  const location = useLocation();
  const history = useHistory();
  const { navItems } = props;
  console.log(navItems);
  const changeNavBar = () => {
    if (window.scrollY >= 100) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  window.addEventListener("scroll", changeNavBar);

  React.useEffect(() => {
    axios
      .get("https://cerbosys.in:4000/draupadi/getAllCategories")
      .then((res) => {
        console.log("response getallcategory", res.data.data);
        setcategory(res.data.data);
      });
  }, []);

  const cartcount = useSelector((state) => state.cart).length;

  const user = useSelector((state) => state.user).user_name;
  const userToken = useSelector((state) => state.user).token;

  const SearchProduct = () => {
    if (search !== "") {
      history.push({
        pathname: "/search",
        search: `?productSearch=${search}`,
        // state: { detail: 'some_value' }
      });
    }
    hideModal();
    setSearch("");
  };

  return (
    <nav
      style={{ justifyContent: "right", backgroundColor: "white", zIndex: 20 }}
      className="flex h-[90px] justify-center items-center !max-w-screen sticky top-0  bg-[#f1f0f0] px-2 z-10 "

      //   `${
      //   navBar
      //     ? "navbar navbar-expand-lg navbar-light bg-light fixed-top"
      //     : "navbar navbar-expand-lg navbar-light bg-light"
      // }  `
    >
      <div
        id="mobile_sidemenu"
        style={{
          fontSize: "14px",
          fontWeight: "700",
          transition: "transform 0.5s",
        }}
        className={`${toggle ? "open-sidebar" : "close-sidebar"}  `}
      >
        <button
          style={{ backgroundColor: "#e0e0e0" }}
          className="rounded-full"
          onClick={() => {
            if (toggle) {
              setToggle(false);
            } else {
              setToggle(true);
            }
          }}
        >
          <MdOutlineArrowBackIosNew size={22} className="bg-[#e0e0e0]  m-2" />
          {/* <MdOutlineArrowForwardIos size={22} className="bg-[#e0e0e0]  m-2 place-content-start" /> */}
        </button>
        {category.map((data, index) => {
          return (
            // <Link to={`/products`} className=" !no-underline">
            <div
              // className="no-underline  border-t-[1px] border-gray-500 h-11 flex items-center hover:bg-slate-200"
              className="no-underline  border-t-[1px] border-gray-500 h-11 flex items-center hover:bg-slate-200"
              onClick={() => {
                setToggle(!toggle);
                history.push("/products");
                setTimeout(
                  () =>
                    scrollToElement(
                      `#${data.category_name.toLowerCase().split(" ")[0]}`
                    ),
                  10
                );
              }}
            >
              <span
                className="p-2 m-4 !no-underline"
                style={{ color: "black" }}
              >
                {data.category_name}
              </span>
            </div>
            // </Link>
          );
        })}
      </div>
      <div className=" flex w-full justify-between my-auto ">

        <div className="flex justify-left my-auto ">
        <button
            className="md:hidden hamburger-icon"
            //  className={`${toggle ? "open-sidebar"  : "close-sidebar"}`}
            type="button"
            // onClick={sidetoggle}
            onClick={() => {
              if (toggle) {
                setToggle(false);
              } else {
                setToggle(true);
              }
            }}
            // data-toggle="collapse"
            // data-target="#colNav"
            // aria-controls="navbarSupportedContent"
            // aria-expanded="false"
            // aria-label="Toggle navigation"
          >
            <CgMenu size={24} />
          </button>

        </div>


        <div
          className=" lg:ml-[10px] !max-w-screen  flex flex-1 items-center justify-center pl-5"
          // style={{ marginTop: "-50px" }}
          // className="absolute ml-[20px] mr-6 left-0 border-2"
        >

          
          <div
            onClick={() => history.push("/")}
            className="my-auto flex justify-center items-center cursor-pointer "
          >            
            {/* <img src="/Icons.png" className="w-[100px] flex-1 md:!w-40 object-contain" /> */}
            <img src={Logo} className="w-[100px] flex-1 md:!w-40 object-contain" alt="" />
          </div>

          {/* {logg}     */}
        </div>
        {/* {data && data.length ? (LinkNav()):('')} */}

        {/*  */}
        <div className="flex justify-around items-center h-[100px]   md:mr-[160px]">
          {/* //--Header-menu */}
          <div className="hidden  md:!inline md:!flex md:!items-center md:justify-between ">
            {category.map((data, index) => {
              return (
                <div
                  className=" cursor-pointer flex justify-center items-center text-lg"
                  onClick={() => {
                    // if (location.pathname.split("/")[1] == "products") {
                    //   scrollToElement(
                    //     `#${data.category_name.toLowerCase().split(" ")[0]}`
                    //   );
                    // } else {
                    //   history.push("/products");
                    // }
                    history.push("/products");
                    setTimeout(
                      () =>
                        scrollToElement(
                          `#${data.category_name.toLowerCase().split(" ")[0]}`
                        ),
                      10
                    );
                  }}
                >
                  <span
                    className="p-2 !no-underline flex justify-start hover:!text-red-600"
                    style={{ color: "black" }}
                  >
                    {data.category_name}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mobile_useroption ">
            <ul
              className="d-flex items-center"
              style={{ justifyContent: "space-between" }}
            >
              {AuthService.getCurrentUser() ? (
                <li
                  className="nav-item"
                  style={{
                    paddingRight: 10,
                    paddingLeft: 20,
                    paddingTop: 20,
                    paddingBottom: 15,
                    WebkitPaddingAfter: 15,
                    MozPaddingStart: 10,
                    msPaddingBottom: 10,
                    cursor: "pointer",
                  }}
                >
                  <NavLink to="/profile">{/* <FaUserCircle /> */}</NavLink>
                </li>
              ) : (
                <li
                  className="nav-item mt-3"
                  style={{
                     paddingRight: 1,
                     paddingLeft: 10,
                     paddingTop: 5,
                    paddingBottom: 20,
                    WebkitPaddingAfter: 27,
                    MozPaddingStart: 10,
                    msPaddingBottom: 8,
                    cursor: "pointer",
                  }}
                >
                  <strong
                    style={{
                      color: "#555",
                      fontSize: "1.125rem",
                      fontFamily: "Amiri,serif",
                      fontStyle: "normal",
                      texTransform: "capitalize",
                      //padding:"5"
                    }}
                  >
                    {userToken ? (
                      <NavLink to="/profile">
                        {/* <FaUser size={20} className="cursor-pointer mr-4" /> */}
                        <img src={Person} alt="" width={16}  height={16} 
                        style={{
                          marginRight: 22
                        }}/>
                      </NavLink> 
                    ) : (
                      <NavLink
                        to="/login"
                        className="cursor-pointer no-underline mr-4">
                        Login
                      </NavLink>
                    )}
                  </strong>
                </li>
              )}
              <li
                onClick={showModal}
                className="nav-item"
                style={{
                  paddingRight: 10,
                  paddingLeft: 1,
                  paddingTop: 9,
                  paddingBottom: 15,
                  WebkitPaddingAfter: 19,
                  MozPaddingStart: 8,
                  msPaddingBottom: 8,
                  cursor: "pointer",
                }}
              >
                {/* <AiOutlineSearch size={20} className="mr-3" /> */}
                {/* <FaSearch size={18} className="mr-3" /> */}
                <img src={Search} alt="" width={16}  height={16}/>
              </li>
              <li
                onClick={() => {
                  if (userToken == undefined) {
                    history.push("/newuserlogin");
                  }
                }}
                className="nav-item mr-4"
                style={{
                  paddingRight: 10,
                  paddingLeft: 10,
                  paddingTop: 7,
                  paddingBottom: 15,
                  WebkitPaddingAfter: 23,
                  MozPaddingEnd:-8,
                  msPaddingBottom: 10,
                  cursor: "pointer",
                  fontSize: "1.125rem",
                }}
              >
                <NavLink to="/cart">
                  {cartcount ? <div className="pcount">{cartcount} </div> : ""}

                  {/* <FaShoppingCart /> */}
                  <img src={Cart} alt="" width={18}  height={18}/>
                </NavLink>
              </li>
            </ul>
          </div>

         
        </div>
      </div>
      <Modal
        // title="Search product"
        visible={visible}
        onOk={SearchProduct}
        onCancel={hideModal}
        okText="Search"
        cancelText="Cancel"
      >
        <div className="flex items-center  border-1 rounded-md p-1 mt-4">
          <input
            type="text"
            placeholder="Search Products.."
            className="h-8 border-gray-500 w-full pl-2 outline-none"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {/* <AiOutlineSearch size={20} className="mr-3" /> */}
          <FaSearch size={20} className="mr-3" />
        </div>
      </Modal>
    </nav>
  );
};
{
  /* <div
          className="flex"
          id="navbarSupportedContent"
          // style={{marginLeft:'100px'}}
        > */
}
{
  /* {location.pathname === "/products" ? (
            <div className="usericonss">
              <ul
                className="flex"
                style={{
                  fontSize: "13px",
                  listStyleType: "none",
                  justifyContent: "space-between",
                }}
              >
                {search ? (
                  <form className="mx-2 my-auto d-inline w-100">
                    <input
                      type="text"
                      style={{ minWidth: 950, borderRadius: 15 }}
                      onClick={props.context.searchh}
                      className="form-control input-lg border border-right-0"
                      id="searchhh"
                      placeholder="Search..."
                    />
                  </form>
                ) : (
                  <>
                    {" "}
                    {navItems.slice(0, 7).map((x, i) => {
                      return (
                        <li
                          className="nav-item"
                          style={{
                            paddingRight: 10,
                            paddingLeft: 10,
                            paddingTop: 20,
                            paddingBottom: 20,
                            cursor: "pointer",
                          }}
                          key={i}
                        >
                          <Scroll type="id" element={x.category_id}>
                            <medium style={{ color: "#555" }}>
                              {x.category_name.toUpperCase()}
                            </medium>
                          </Scroll>
                        </li>
                      );
                    })}
                    <li
                      className="nav-item"
                      style={{
                        padding: 13,
                        fontSize: "14px",
                        color: "#555",
                        cursor: "pointer",
                      }}
                    ></li>
                  </>
                )}
                <li
                  className="nav-item"
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 20,
                    paddingBottom: 20,
                    cursor: "pointer",
                  }}
                >
                  <BiSearchAlt2 onClick={() => setSearch(!search)} />
                </li>
                {AuthService.getCurrentUser() ? (
                  <li
                    className="nav-item"
                    style={{
                      paddingRight: 10,
                      paddingLeft: 20,
                      paddingTop: 10,
                      paddingBottom: 20,
                      cursor: "pointer",
                    }}
                  >
                    <NavLink to="/profile">
                      <FaUserCircle />
                    </NavLink>
                  </li>
                ) : (
                  <li
                    className="nav-item"
                    style={{
                      paddingRight: 10,
                      paddingLeft: 10,
                      paddingTop: 15,
                      paddingBottom: 20,
                      cursor: "pointer",
                    }}
                  >
                    <strong
                      style={{
                        color: "#555",
                        fontSize: "15px",
                        fontFamily: "Amiri,serif",
                        fontStyle: "normal",
                        texTransform: "capitalize",
                      }}
                    >
                      <NavLink to="/login">Login</NavLink>
                    </strong>
                  </li>
                )}
                <li
                  className="nav-item"
                  style={{
                    paddingRight: 10,
                    paddingLeft: 10,
                    paddingTop: 10,
                    paddingBottom: 20,
                    cursor: "pointer",
                  }}
                >
                  <NavLink to="/Mywishlist">
                    <FaHeart />
                    {wishcount == 0 ? (
                      ""
                    ) : (
                      <div className="pcount">{wishcount} </div>
                    )}
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  style={{
                    paddingRight: 10,
                    paddingLeft: 10,
                    paddingTop: 10,
                    paddingBottom: 20,
                    cursor: "pointer",
                  }}
                >
                  <NavLink to="/cart">
                    <FaShoppingCart />
                    {cartcount == 0 ? (
                      ""
                    ) : (
                      <div className="pcount">{cartcount} </div>
                    )}
                  </NavLink>
                </li>
          //     </ul> */
}
//   </div>

// ) : (

//   // <ul
//   //   class="navbar-nav mr-auto"
//   //   style={{
//     fontSize: "15px",
//     listStyleType: "none",
//     justifyContent: "spaceBetween",
//   }}
// >
//   {search ? (
//     <form className="mx-2 my-auto d-inline w-100">
//       <input
//         type="text"
//         className="form-control input-lg border border-right-0"
//         placeholder="Search..."
//         onClick={props.context.searchh}
//         style={{ minWidth: 950, borderRadius: 15 }}
//       />
//     </form>
//   ) : (
//     <>
//       {navItems.slice(0, 7).map((x, i) => {
//         return (
//           <li
//             className="nav-item"
//             style={{
//               paddingRight: 10,
//               paddingLeft: 10,
//               paddingTop: 20,
//               paddingBottom: 20,
//               cursor: "pointer",
//             }}
//             key={i}
//           >
//             <Link
//               className="aa"
//               style={{
//                 textDecoration: "none",
//                 marginLeft: "10px",
//                 color: "#404040",
//                 fontSize: "12px",
//                 fontFamily: "Amiri, serif",
//                 textTransform: "capitalize",

//                 padding: "0px",
//               }}
//               to={{ pathname: "/products" }}
//             >
//               <medium style={{ fontFamily: "Amiri,serif" }}>
//                 {x.category_name}
//               </medium>
//             </Link>
//           </li>
//         );
//       })}
//       <li
//         className="nav-item"
//         style={{
//           padding: 13,
//           fontSize: "14px",
//           color: "#555",
//           cursor: "pointer",
//           fontFamily: "Amiri,serif",
//         }}
//       ></li>
//     </>
//   )}
//   <li
//     className="nav-item"
//     style={{
//       paddingRight: 10,
//       paddingLeft: 10,
//       paddingTop: 20,
//       paddingBottom: 20,
//       cursor: "pointer",
//     }}
//   >
//     <BiSearchAlt2 onClick={() => setSearch(!search)} />
//   </li>
//   {AuthService.getCurrentUser() ? (
//     <li
//       className="nav-item"
//       style={{
//         paddingRight: 10,
//         paddingLeft: 20,
//         paddingTop: 10,
//         paddingBottom: 20,
//         cursor: "pointer",
//       }}
//     >
//       <NavLink to="/profile">
//         <FaUserCircle />
//       </NavLink>
//     </li>
//   ) : (
//     <li
//       className="nav-item"
//       style={{
//         paddingRight: 10,
//         paddingLeft: 10,
//         paddingTop: 15,
//         paddingBottom: 20,
//         cursor: "pointer",
//       }}
//     >
//       <strong style={{ color: "#555" }}>
//         <NavLink to="/login">Login</NavLink>
//       </strong>
//     </li>
//   )}
//   <li
//     className="nav-item"
//     style={{
//       paddingRight: 10,
//       paddingLeft: 10,
//       paddingTop: 10,
//       paddingBottom: 20,
//       cursor: "pointer",
//     }}
//   >
//     <NavLink to="/Mywishlist">
//       <FaHeart />
//       {wishcount == 0 ? (
//         ""
//       ) : (
//         <div className="pcount">{wishcount} </div>
//       )}
//     </NavLink>
//   </li>
//   <li
//     className="nav-item"
//     style={{
//       paddingRight: 10,
//       paddingLeft: 10,
//       paddingTop: 10,
//       paddingBottom: 20,
//       cursor: "pointer",
//     }}
//   >
//     <NavLink to="/cart">
//       <FaShoppingCart />
//       {cartcount == 0 ? (
//         ""
//       ) : (
//         <div className="pcount">{cartcount} </div>
//       )}
//     </NavLink>
//   </li>
// </ul>
// ""
// )}
// </div>
//   </div>
// </nav>
// );
// };
export default withContext(NavBar);
