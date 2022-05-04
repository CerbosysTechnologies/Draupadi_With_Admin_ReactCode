import React from "react";
//import Pcategory from './productCategaory'
//import withContext from "../AllProducts/button";
//import ProductList from './ProductsList'

const DesignItem = props => {

  // const[click,setClick] = React.useState(false)
  const {data} = props
  console.log(data)
  
  return ( 
  <>
     <div className=" column is-3" style={{marginTop:-25,marginBottom:-25,backgroundColor:'transparent'}}>
     <div className='box' style={{backgroundColor:'transparent'}} Style='outline: none;box-shadow: none;'>
     <div className="card" style={{borderRadius:15,overflow:'hidden',outline:'none',backgroundColor:'transparent'}}>
  <div className="card-image"  Style='box-shadow: 0px 3px 6px #23232300;
-webkit-box-shadow: 0px 3px 6px #23232300;
-moz-box-shadow: 0px 3px 6px #23232300;'>
    <figure className="image is-128x128" style={{objectFit:'cover',width:'100%'}}>
      {/* <img src={`https://45.80.152.232:4000${data.designimage.substr(8)}`} style={{width:'100%'}} alt="Placeholder"/> */}
      <img src={`https://cerbosys.in:4000${data.designimage.substr(8)}`} style={{width:'100%'}} alt="Placeholder"/>
    </figure>
  </div>
</div>
<div className="container" Style='text-align:center;'>
<h8 className='title' style={{fontSize:20,color:'#555'}}><strong>{data.design_code.toUpperCase()}</strong></h8>
</div>
<div className="container" Style='text-align:center;'>
<h8 className='title' style={{fontSize:18,color:'black'}} ><strong style={{wordSpacing:10}}>Price {data.price}/-</strong></h8>
</div>
</div>
          </div>

    </>
  );
};

export default DesignItem;