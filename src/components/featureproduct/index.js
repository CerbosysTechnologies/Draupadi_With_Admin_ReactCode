import React from "react";
import { Link } from "react-router-dom";
import {
  ProductContainer,
  ProductHeading,
  ProductWrapper,
  ProductImg,
  ProductCard,
  Product1,
  Product2,
  Product3,
  NewImg,
} from "./fpcss.js";
import { ProductsData } from "./fpdata.js";

import product1 from "../../images/featuredproduct/product1.jpeg";
import product2 from "../../images/featuredproduct/product2.jpeg";
import product3 from "../../images/featuredproduct/product3.jpeg";
import product4 from "../../images/featuredproduct/product4.jpeg";
import product5 from "../../images/featuredproduct/product5.jpeg";
import product6 from "../../images/featuredproduct/product6.jpeg";
import customCss from "./customCss.css";

const FeaturedProducts = React.memo(() => {
  var imgStyle = { width: "100%", height: "430px", objectFit: "contain" };
  return (
    <ProductContainer id="pdiv" className="pcontainer">
      <ProductHeading>Featured Products</ProductHeading>
      <ProductWrapper className="home-product-div">
        {
          //  ProductsData.slice(0,6).map(e=>{
          //return(
          <>
            {/* <div className="flex">
                  <div className="row">
                    <img className="img1" alt="DP" src={product1} />
                    <img className="img2" alt="DP" src={product2} />
                    <img className="img1" alt="DP" src={product3} />
                  </div>
                  <div className="row">
                    <img className="img2" alt="DP" src={product4} />
                    <img className="img3" alt="DP" src={product5} />
                    <img className="img4" alt="DP" src={product6} />
                  </div>
                </div> */}
            <ProductCard>
              <Link to="/products">
      <div className="flexx">
                  <div className="roww">
                    <img className="imgg1" alt="DP" src={product1} />
                    <img className="imgg2" alt="DP" src={product2} />
                    <img className="imgg1" alt="DP" src={product3} />
                  </div>
                  <div className="roww">
                    <img className="imgg3" alt="DP" src={product4} />
                    <img className="imgg5" alt="DP" src={product5} />
                    <img className="imgg4" alt="DP" src={product6} />
                  </div>
                </div>


                {/* <div className='grid grid-cols-7 gap-1'> */}
                
                {/* <div className='grid grid-cols-12 gap-1' style={{marginTop:"10px"}}> */}
                {/* <div className="flex">
                     <img src={product4} alt="DP" className='img4 col-span-6'
                     style={imgStyle}></img>
                     <img src={product5} alt="DP" className='img5 col-span-4'
                     style={imgStyle}></img>
                     <img src={product6} alt="DP" className='img6 col-span-2'
                     style={imgStyle}></img>
                    </div> */}

                {/* <div className="flex">
                  <div className="row">
                    <img className="img1" alt="DP" src={product1} />
                    <img className="img2" alt="DP" src={product2} />
                    <img className="img1" alt="DP" src={product3} />
                  </div>
                  <div className="row">
                    <img className="img2" alt="DP" src={product4} />
                    <img className="img3" alt="DP" src={product5} />
                    <img className="img4" alt="DP" src={product6} />
                  </div>
                </div> */}

                {/* <img src={product4} alt="DP" className='img4'></img>
                     <img src={product5} alt="DP" className='img5'></img>
                     <img src={product6} alt="DP" className='img6'></img> */}
                {/* </div> */}
              </Link>
            </ProductCard>
          </>
          //)
          //  })
        }
      </ProductWrapper>
    </ProductContainer>
  );
});

export default FeaturedProducts;
