import React, { Component } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import "antd/dist/antd.css";
import "bulma/css/bulma.css";
import NavBar from "./components/NavBar/index";
import TopNav from "./components/NavBar/topPromo";
import Cart from "./components/PaymentGate/cart";
// import {Link} from "react-router-dom"
import WishList from ".//components/PaymentGate/wishListItem";
import ProductList from "./components/AllProducts/ProductsList";
import DesignList from "./components/AllProducts/designList";
import Page from "./components/PaymentGate/paymentPage";
import axios from "axios";
import Context from "./components/AllProducts/inventory";
import authHeaderuser from "./services/auth-headers";
import Pcategory from "./components/AllProducts/productCategaory";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Logintbygoogle from "./component/loginwithgoogle";
import Home from "./components/Home";
import Profile from "./component/profile";
import Ships from "./components/PaymentGate/shippingaddress";
import EditInfo from "./components/PaymentGate/editInfo";
import LastOrder from "./component/lastOrders";
import Footer from "./components/Footer/index";
import "bootstrap/dist/css/bootstrap.min.css";
import Tc from "./t&c/Tc";
import NewUserLogin from "./Pages/NewUserLogin";
import TestCart from "./Pages/TestCart";
import Privacy from "./t&c/Privacy";
import Condition from "./t&c/Condition";
import { DocumentEdit } from "styled-icons/fluentui-system-filled";
import Search from "./Search";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: [],
      sub: [],
      searchw: [],
      products: [],
      getproduct: [],
      total: [],
      address: [],
      date: "",
      order_id: "",
      categoryName: [],
      cartnum: 0,
      designdetails: [],
      deliveraddress: [],
      offerdetail: [],
      len: null,
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    axios
      .get("https://cerbosys.in:4000/draupadi/getAllAddress", {
        headers: authHeaderuser(),
      })
      .then((res) => {
        // console.log("getAllAddress ============>",res.data.data)
        this.setState({ address: res.data.data });
      });
    axios
      .get("https://cerbosys.in:4000/draupadi/getActiveOffers")
      .then((res) => {
        // console.log("getAllOffers", res.data  )
        // setLen(res.data.data.length);
        var len = res.data.message;
        // if(len=!"Detail Found"){
        //   this.setState({len:res.data.data.length})
        //   document.getElementById("topnavdiv").style.display = "none";
        //   // document.getElementById("")
        // }
        if (len == "No Detail Available") {
          document.getElementById("topnavdiv").style.display = "none";
          // document.getElementById("")
        } else {
          this.setState({ offers: res.data.data });
          this.setState({ len: res.data.data.length });
        }
        // setOffer(res.data.data);
      });
    axios.get("https://cerbosys.in:4000/draupadi/getAllOffers").then((res) => {
      console.log("getAllOffers", res.data.data);
    });

    const products = await axios.get(
      "https://cerbosys.in:4000/draupadi/getProductsData"
    );

    const res = await axios.get(
      "https://cerbosys.in:4000/draupadi/getAllCategories"
    );
    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};

    this.setState({
      user: user,
      products: products.data.data,
      cart: cart,
      categoryName: res.data.data,
    });
  }

  getProductBy = (id, id1) => {
    return axios
      .get(
        `https://cerbosys.in:4000/draupadi/getAllProducts?category_id=${id}&subcategory_id=${id1}`,
        { headers: authHeaderuser() }
      )
      .then((res) => {
        console.log("product", res);
        this.setState({
          products: res.data.data,
        });
      });
  };

  update = () => {
    const pay = localStorage.getItem("payment");
    if (pay === "COD" && this.state.order_id) {
      axios
        .post(
          "https://cerbosys.in:4000/draupadi/updatePaymentStatus",
          {
            order_status: "Order Placed",
            payment_status: "pending",
            order_id: this.state.order_id,
          },
          { headers: authHeaderuser() }
        )
        .then((res) => console.log(res));
    }
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }

    console.log("Checkout");

    const product = localStorage.getItem("cart");
    const address = localStorage.getItem("address");
    const address1 = localStorage.getItem("address1");
    const address2 = localStorage.getItem("address2");
    const address3 = localStorage.getItem("address3");
    const address4 = localStorage.getItem("address4");
    const pay = localStorage.getItem("payment");
    const city = localStorage.getItem("city");
    const post = localStorage.getItem("post");
    const mobile = localStorage.getItem("mobile");
    const email = localStorage.getItem("email");
    const line = localStorage.getItem("line");
    const lines = localStorage.getItem("lines");
    const fname = localStorage.getItem("fname");
    const lname = localStorage.getItem("lname");
    const city1 = localStorage.getItem("city1");
    const post1 = localStorage.getItem("post1");
    const mobile1 = localStorage.getItem("mobile1");
    const email1 = localStorage.getItem("email1");
    const line1 = localStorage.getItem("line1");
    const lines1 = localStorage.getItem("lines1");
    const fname1 = localStorage.getItem("fname1");
    const lname1 = localStorage.getItem("lname1");
    const city2 = localStorage.getItem("city2");
    const post2 = localStorage.getItem("post2");
    const mobile2 = localStorage.getItem("mobile2");
    const email2 = localStorage.getItem("email2");
    const line2 = localStorage.getItem("line2");
    const lines2 = localStorage.getItem("lines2");
    const fname2 = localStorage.getItem("fname2");
    const lname2 = localStorage.getItem("lname2");
    const city3 = localStorage.getItem("city3");
    const post3 = localStorage.getItem("post3");
    const mobile3 = localStorage.getItem("mobile3");
    const email3 = localStorage.getItem("email3");
    const line3 = localStorage.getItem("line3");
    const lines3 = localStorage.getItem("lines3");
    const fname3 = localStorage.getItem("fname3");
    const lname3 = localStorage.getItem("lname3");
    const city4 = localStorage.getItem("city4");
    const post4 = localStorage.getItem("post4");
    const mobile4 = localStorage.getItem("mobile4");
    const email4 = localStorage.getItem("email4");
    const line4 = localStorage.getItem("line4");
    const lines4 = localStorage.getItem("lines4");
    const fname4 = localStorage.getItem("fname4");
    const lname4 = localStorage.getItem("lname4");

    console.log(product);
    const products = JSON.parse(product);
    const addresses = JSON.parse(address);
    const addresses1 = JSON.parse(address1);
    const addresses2 = JSON.parse(address2);
    const addresses3 = JSON.parse(address3);
    const addresses4 = JSON.parse(address4);
    const citya = JSON.parse(city);
    const posta = JSON.parse(post);
    const mobilea = JSON.parse(mobile);
    const emaila = JSON.parse(email);
    const linea = JSON.parse(line);
    const linesa = JSON.parse(lines);
    const fnamea = JSON.parse(fname);
    const lnamea = JSON.parse(lname);
    const city1a = JSON.parse(city1);
    const post1a = JSON.parse(post1);
    const mobile1a = JSON.parse(mobile1);
    const email1a = JSON.parse(email1);
    const line1a = JSON.parse(line1);
    const lines1a = JSON.parse(lines1);
    const fname1a = JSON.parse(fname1);
    const lname1a = JSON.parse(lname1);
    const city2a = JSON.parse(city2);
    const post2a = JSON.parse(post2);
    const mobile2a = JSON.parse(mobile2);
    const email2a = JSON.parse(email2);
    const line2a = JSON.parse(line2);
    const lines2a = JSON.parse(lines2);
    const fname2a = JSON.parse(fname2);
    const lname2a = JSON.parse(lname2);
    const city3a = JSON.parse(city3);
    const post3a = JSON.parse(post3);
    const mobile3a = JSON.parse(mobile3);
    const email3a = JSON.parse(email3);
    const line3a = JSON.parse(line3);
    const lines3a = JSON.parse(lines3);
    const fname3a = JSON.parse(fname3);
    const lname3a = JSON.parse(lname3);
    const city4a = JSON.parse(city4);
    const post4a = JSON.parse(post4);
    const mobile4a = JSON.parse(mobile4);
    const email4a = JSON.parse(email4);
    const line4a = JSON.parse(line4);
    const lines4a = JSON.parse(lines4);
    const fname4a = JSON.parse(fname4);
    const lname4a = JSON.parse(lname4);

    var date = new Date();
    var m = date.getMonth() + 1;
    var dateOrder = date.getFullYear() + "-" + m + "-" + date.getDate();
    console.log(dateOrder);
    console.log(products);
    const productList = Object.values(products).map((e) => {
      return {
        product_id: e.product.product_id,
        product_price: e.product.product_price,
        product_quantity: e.amount,
        offer_id: 1,
      };
    });

    const fullAmount = Object.values(products).map((e) => {
      for (let i = 0; i < this.length; i++) {
        e.total += e[i].total;
      }
      return e.total;
    });
    const TotalFull = JSON.parse(fullAmount);
    console.log(JSON.parse(fullAmount));

    const fullAmountPayable = Object.values(products).map((e) => {
      for (let i = 0; i < this.length; i++) {
        e.payable += e[i].payable;
      }
      return e.payable;
      // console.log("payable", e.payable);
    });
    const TotalFullPayable = JSON.parse(fullAmountPayable);
    console.log("fullAmountPayable", fullAmountPayable);

    const fullDiscount = Object.values(products).map((e) => {
      for (let i = 0; i < this.length; i++) {
        e.product.product_discount +=
          e[i].product.product_discount * e[i].amount;
      }
      return e.product.product_discount;
    });
    const TotalFullDiscount = JSON.parse(fullDiscount);
    console.log(JSON.parse(fullDiscount));

    this.setState({ cart: products });
    console.log(this.setState({ cart: products }));

    axios
      .post("https://apiv2.shiprocket.in/v1/external/auth/login", {
        email: "dev.cerbosys@gmail.com",
        password: "123@Cer",
      })
      .then((res) => {
        console.log("Shippop", res);
        axios.post(
          "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
          {
            order_id: "1",
            order_date: "2019-07-24 11:11",
            pickup_location: "Jammu",
            channel_id: "",
            comment: "Reseller: M/s Goku",
            billing_customer_name: "Naruto",
            billing_last_name: "Uzumaki",
            billing_address: "House 221B, Leaf Village",
            billing_address_2: "Near Hokage House",
            billing_city: "New Delhi",
            billing_pincode: "110002",
            billing_state: "Delhi",
            billing_country: "India",
            billing_email: "naruto@uzumaki.com",
            billing_phone: "9876543210",
            shipping_is_billing: true,
            shipping_customer_name:
              fnamea || fname1a || fname2a || fname3a || fname4a,
            shipping_last_name:
              lnamea || lname1a || lname2a || lname3a || lname4a,
            shipping_address: linea || line1a || line2a || line3a || line4a,
            shipping_address_2:
              linesa || lines1a || lines2a || lines3a || lines4a,
            shipping_city: citya || city1a || city2a || city3a || city4a,
            shipping_pincode: posta || post1a || post2a || post3a || post4a,
            shipping_country: "India",
            shipping_state: "",
            shipping_email:
              emaila || email1a || email2a || email3a || email4a || "",
            shipping_phone:
              mobilea || mobile1a || mobile2a || mobile3a || mobile4a,
            order_items: productList,
            payment_method: "Prepaid",
            shipping_charges: 0,
            giftwrap_charges: 0,
            transaction_charges: 0,
            total_discount: TotalFullDiscount,
            sub_total: TotalFull,
            length: 10,
            breadth: 15,
            height: 20,
            weight: 2.5,
          },
          { headers: "Bearer " + res.data.token }
        );
      });
    axios
      .post(
        "https://cerbosys.in:4000/draupadi/proceedToCheckout",
        {
          payableAmount: TotalFullPayable,
          discount: TotalFullDiscount,
          shipping_id:
            addresses || addresses1 || addresses2 || addresses3 || addresses4,
          payment_type: pay,
          status: "pending",
          totalAmount: TotalFull,
          order_date: dateOrder,
          shiprocket_orderid: 12240,
          products: productList,
        },
        { headers: authHeaderuser() }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("orderid", res.data.orderId);
        if (pay === "COD") {
          axios
            .all([
              axios.post(
                "https://cerbosys.in:4000/draupadi/updatePaymentStatus",
                {
                  status: "Order Recieved",
                  order_id: res.data.orderId,
                  payment_type: "pending",
                },
                { headers: authHeaderuser() }
              ),
              axios.post(
                "https://cerbosys.in:4000/draupadi/generateInvoice",
                {
                  order_id: res.data.orderId,
                  shipping_id:
                    addresses ||
                    addresses1 ||
                    addresses2 ||
                    addresses3 ||
                    addresses4,
                  total_amount: TotalFull,
                  amount_payable: TotalFullPayable,
                  payment_mode: "COD",
                },
                { headers: authHeaderuser() }
              ),
            ])
            .then((res) => console.log(res));
        }
      });
    this.clearCart();
  };

  addreses = (index) => {
    console.log("Index addreses", this.state.address[index]);
  };

  designdetail = (e) => {
    console.log("designdetail baba", e);
    axios
      .get(
        `https://cerbosys.in:4000/draupadi/getAllCustomisedDesignsById?customised_designid=${e}`
      )
      .then((res) => {
        console.log("Design detail", res.data.data[0]);
        this.setState({ designdetails: res.data.data[0] });
      });
  };

  promo = (e) => {
    console.log(e.target.value);
    var inn = e.target.value;
    var len = this.state.offers.length;
    var data = this.state.offers;
    for (let i = 0; i < len; i++) {
      console.log("offer", data[i].offer_code);
      var code = data[i].offer_code;
      if (code === inn) {
        console.log("offers_for_products", data[i]);
        document.getElementById("offerbox").style.color = "#0AFC1B";
        var dta = data[i];
        this.setState({ offerdetail: dta });
        localStorage.setItem("offer", dta);
        break;
      } else {
        console.log("false");
        document.getElementById("offerbox").style.color = "black";
        localStorage.removeItem("offer");
      }
    }
  };

  jackproduct = (e) => {
    console.log("jackproduct", e);
  };

  addToCart = async (cartItem) => {
    // let cart = this.state.cart;
    console.log("usertoken", localStorage.getItem("usertoken"));
    var date = new Date().toISOString();
    date = date.substr(0, 10);
    console.log("cartItem", date);

    const data = {
      product_id: cartItem.product.product_id,
      product_name: cartItem.product.product_name,
      product_price: cartItem.product.product_price,
      product_discount: cartItem.product.product_discount,
      product_actualprice: cartItem.product.product_actualprice,
      product_image: cartItem.product.product_image,
      product_quantity: 1,
      dateAdded: date,
      customised_designid: this.state.designdetails.customised_designid,
      design_code: this.state.designdetails.design_code,
      design_price: this.state.designdetails.price,
      designimage: this.state.designdetails.designimage,
      offerdiscount: this.state.offerdetail.discount,
    };
    console.log("datatadtad===>", new Date());

    const user = JSON.parse(localStorage.getItem("user"));

    fetch("https://cerbosys.in:4000/draupadi/addToCart", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      method: "post",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Buddy", res);
        localStorage.removeItem("designId");
      });

    document.getElementById("cartaddnoti").style.display = "flex";
    setTimeout(this.hidenoti, 2000);
  };

  hidenoti = () => {
    document.getElementById("cartaddnoti").style.display = "none";
  };

  //  closer=()=>{
  //   alert("close")
  // }

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  logout = (e) => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  default = () => {
    return (
      <div className="d-flex" id="mainpageapp">
        <div id="mainwindow" style={{ margin: "auto" }}>
          {/* {this.state.len? <div> <TopNav /></div> :""} */}
          <div id="topnavdiv">
            {" "}
            <TopNav />
          </div>
          <NavBar navItems={this.state.categoryName} />
          {/* <Route exact path="/" component={ProductList} /> */}
          <Route exact path="/cart" component={Cart} />

          <Route path="/products/:name">
            <Pcategory
            // products={this.state.products}
            // addToCart={this.addToCart}
            />
          </Route>
          {/* <Route exact path="/add-product" component={AddProduct} /> */}
          <Route exact path="/paytoOrder" component={Page} />
          <Route exact path="/products">
            <ProductList
              navItems={this.state.categoryName}
              jack={this.jackproduct}
            />
          </Route>
          <Route exact path={["/"]} component={Home} />
          {/* <Route exact path="/register" component={Register} /> */}
          <Route exact path="/profile" component={Profile} />
          {/* <Route exact path='/aboutus'component={Condition}/>
            <Route exact path='/cancelandreturn'component={Cancel}/>*/}
          <Route exact path="/privacyPolicy" component={Tc} />
          <Route exact path="/shipping" component={Privacy} />
          <Route exact path="/termsandconditions" component={Condition} />

          <Route exact path="/address" component={Ships} />
          <Route exact path="/yourinfo" component={EditInfo} />
          <Route exact path="/yourorders" component={LastOrder} />
          <Route exact path="/Mywishlist" component={WishList} />
          <Route exact path="/designs" component={DesignList} />
          <Route exact path="/newuserlogin" component={TestCart} />
          <Route exact path="/testcart" component={TestCart} />
          <Route exact path="/search" component={Search} />
          <Footer />
        </div>
        {/* <div
          id="mobile_sidemenu"
          style={{ bakgroundColor: "red", fontSize: "14px", fontWeight: "700" }}
        >
          <div style={{color:"white", fontSize:"50px", backgroundColor:"green"}}  > →</div>
          {this.state.categoryName.map((data, index) => {
            return <div className="side-menu" ><Link to="/products" ><div >{data.category_name}</div></Link></div>;
          })}
        </div> */}
      </div>
    );
  };
  searchh = async (e) => {
    var name = e.target.value;
    // fetch(`https://cerbosys.in:4000/draupadi/searchProduct?name=${name}&page=1&size=10`).then(res => res.json()).then(res => {

    //   console.log("Searchhhhhhinggggggg",res.SearchData);
    //   this.setState({searchw:res.SearchData});
    // })

    const sear = await axios.get(
      `https://cerbosys.in:4000/draupadi/searchProduct?name=${name}&page=1&size=10`
    );
    console.log("search", sear.data.SearchData);
    this.setState({ searchw: sear.data.SearchData });
  };

  loginPage = () => {
    return (
      <div className="container-fluid" style={{ margin: "auto" }}>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={Logintbygoogle} />
        {/* <Route exact path="/login" component={<Logintbygoogle/>} /> */}
      </div>
    );
  };
  render() {
    return (
      <>
        <Context.Provider
          value={{
            ...this.state,
            removeFromCart: this.removeFromCart,
            addToCart: this.addToCart,
            jackproduct: this.jackproduct,
            getproduct: this.getproduct,
            login: this.login,
            addProduct: this.addProduct,
            searchh: this.searchh,
            clearCart: this.clearCart,
            checkout: this.checkout,
            getProductBy: this.getProductBy,
            designdetail: this.designdetail,
            addreses: this.addreses,
            promo: this.promo,
          }}
        >
          <Router ref={this.routerRef}>
            <div>
              <Switch>
                <Route exact path="/(login)" component={this.loginPage} />
                <Route component={this.default} />
              </Switch>
            </div>
          </Router>
        </Context.Provider>
      </>
    );
  }
}
