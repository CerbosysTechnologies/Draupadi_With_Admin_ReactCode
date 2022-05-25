import React from 'react';
import { ProductContainer,ProductHeading,ProductWrapper,ProductImg,ProductCard } from './fpcss';
import {Link} from 'react-router-dom'
import {ProductsData} from './fpdata';


const FeaturedProducts = React.memo(() => {

    return(
        <ProductContainer id='pdiv' className='pcontainer'>
        <ProductHeading >Featured Products</ProductHeading>
        <ProductWrapper className='home-product-div'>
         {   
          ProductsData.slice(0,6).map(e=>{
            return(
                 <>
                 <ProductCard>
                 <Link to='/products'>
                     <ProductImg src={e.picture} alt='NEW DP'/>
                     </Link>
                 </ProductCard>
                 </>
             )
         })}
        </ProductWrapper>
        </ProductContainer>
    )
})
export default FeaturedProducts;