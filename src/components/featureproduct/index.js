import React from 'react';
import {Link} from 'react-router-dom'
import { ProductContainer,ProductHeading,ProductWrapper,ProductImg,ProductCard,
     Product1, Product2, Product3, NewImg } from './fpcss.js';
import {ProductsData} from './fpdata.js'

import product1 from '../../images/featuredproduct/product1.jpeg';
import product2 from '../../images/featuredproduct/product2.jpeg';
import product3 from '../../images/featuredproduct/product3.jpeg';
import product4 from '../../images/featuredproduct/product4.jpeg';
import product5 from '../../images/featuredproduct/product5.jpeg';
import product6 from '../../images/featuredproduct/product6.jpeg';


const FeaturedProducts = React.memo(() => 
{
return(
    <ProductContainer id='pdiv' className='pcontainer'>
    <ProductHeading >Featured Products</ProductHeading>
    <ProductWrapper className='home-product-div'>
    {   
        //  ProductsData.slice(0,6).map(e=>{
             //return(
                 <>
                 <ProductCard>
                 <Link to='/products'>
                     
                     <div className='grid grid-cols-7 gap-1'>
                     <img src={product1} alt="DP" className='img1 col-span-3' 
                     style={{width:"100%", height: "430px", objectFit:"cover"}}></img>
                     <img src={product2} alt="DP" className='img2 col-span-2'
                     style={{width:"100%", height: "430px", objectFit:"cover"}}></img>
                     <img src={product3} alt="DP" className='img3 col-span-2' 
                     style={{width:"100%", height: "430px", objectFit:"cover"}}></img>
                     </div>
                     <div className='grid grid-cols-12 gap-1' style={{marginTop:"10px"}}>
                     <img src={product4} alt="DP" className='img4 col-span-6'
                     style={{width:"100%", height: "430px", objectFit:"cover"}}></img>
                     <img src={product5} alt="DP" className='img5 col-span-4'
                     style={{width:"100%", height: "430px", objectFit:"cover"}}></img>
                     <img src={product6} alt="DP" className='img6 col-span-2'
                     style={{width:"100%", height: "430px", objectFit:"cover"}}></img>
                    </div>
                    
                                  

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
)
})

export default FeaturedProducts;