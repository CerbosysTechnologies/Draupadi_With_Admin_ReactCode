import styled from 'styled-components';

export const ProductContainer = styled.div`
min-height:200px;
position:relative;
padding:10px;
background-color: #f8f8f8;
opacity:1;


@media only screen and (max-width:320px){
// width:310px;
height:100%; 
// margin:-20px;  
position:relative; 
}
@media only screen and (max-width:375px) and (min-width:321px){
// width:370px;
height:100%; 
// margin:-20px;  
position:relative; 
}
@media only screen and (max-width:425px) and (min-width:376px){
// width:420px;
height:100%; 
// margin:-20px;  
position:relative; 
}
@media only screen and (max-width:1440px) and (min-width:1024px){
height:auto;    
}
`

export const ProductWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin: 0 auto;`

export const ProductCard = styled.div`
margin: 0 2 rem;
min-width: 350px;
border-color:#808080;
padding:20px;
border-radius:10px;
overflow:hidden;
object-fit:cover;
@media only screen and (max-width:320px){
    width:280px;
    height:300px;
    padding-left:0px:
    padding-right:0px;
    margin:0;
}
@media only screen and (max-width:375px) and (min-width:321px){
    width:335px;
    height:355px;
    padding-left:0px:
    padding-right:0px;
    margin:0;
}
@media only screen and (max-width:425px) and (min-width:376px){
    width:385px;
    height:415px;
    padding-left:0px:
    padding-right:0px;
    margin:0;
}
@media only screen and (max-width:1024px) and (min-width:769px){
    width:250px;
    height:auto;
}`

export const ProductImg = styled.img`
height: 380px;
width: 380px;
border-radius:0px;
box-shadow: 0px 2px 2px 0px rgba(35,35,35,0.34);
-webkit-box-shadow:  0px 2px 2px 0px rgba(35,35,35,0.34);
-moz-box-shadow:  0px 2px 2px 0px rgba(35,35,35,0.34);


@media only screen and (max-width:320px){
    height:300px;
    width:280px;
}
@media only screen and (max-width: 375px) and (min-width: 321px){
    height:355px;
    width:335px;
}
@media only screen and (max-width: 425px) and (min-width: 376px){
    height:405px;
    width:385px;
}
@media only screen and (max-width: 768px) and (min-width: 426px){
    height:405px;
    width:385px;
}
@media only screen and (max-width:1024px) and (min-width:769px){
    height:405px;
    width:385px;
}
@media only screen and (max-width:1366px) and (min-width:1024px){
    height:405px;
    width:385px;
}
@media only screen and (max-width:1440px) and (min-width:1367px){
    height:405px;
    width:385px;
}
@media only screen and (max-width:1920px) and (min-width:1441px){
    height:405px;
    width:385px;
}
`

export const ProductHeading = styled.h1`
// font-size: clamp(2rem,2.4vw,3rem);
font-size:20px;
color:#404040;
font-family:Amiri,serif;
//text-transform:uppercase;
text-align: center;
font-weight:700;
padding:20px;
@media only screen and (max-width:320px){
    font-size:25px;
    padding:15px;
}
@media only screen and (max-width:375px) and (min-width:321px){
    font-size:25px;
    padding:15px;
}
@media only screen and (max-width:425px) and (min-width:376px){
    font-size:25px;
    padding:15px;
}`

export const ProductHeader = styled.div`
    width: auto;
    height: 100px;
    font-weight:200px;
    color:dark black;
    font-size:20px;
    text-align: center;
    @media only screen and (max-width:320px){
        font-size:15px;
        width:320px;
        height:200px;
        text-align:justify;
    }
     @media only screen and (max-width:375px) and (min-width:321px){
        font-size:15px;
        width:375px;
        height:200px;
        text-align:justify;
    }
     @media only screen and (max-width:425px) and (min-width:376px){
        font-size:15px;
        width:375px;
        height:200px;
        text-align:justify;
    }`    


    //For Different Images

export const MyWrapper = styled.div`
display: flex;`;

    export const Product1 = styled.img`
    height: 380px;
    width: 480px;
    border-radius:0px;
    box-shadow: 0px 2px 2px 0px rgba(35,35,35,0.34);
    -webkit-box-shadow:  0px 2px 2px 0px rgba(35,35,35,0.34);
    -moz-box-shadow:  0px 2px 2px 0px rgba(35,35,35,0.34);
    @media only screen and (max-width:320px){
        height:300px;
        width:280px;
    }
    @media only screen and (max-width: 375px) and (min-width: 321px){
        height:355px;
        width:335px;
    }
    @media only screen and (max-width: 425px) and (min-width: 376px){
        height:405px;
        width:385px;
    }
    @media only screen and (max-width: 768px) and (min-width: 426px){
        height:405px;
        width:385px;
    }
    @media only screen and (max-width:1024px) and (min-width:769px){
        height:405px;
        width:385px;
    }
    @media only screen and (max-width:1366px) and (min-width:1024px){
        height:405px;
        width:385px;
    }
    @media only screen and (max-width:1440px) and (min-width:1367px){
        height:405px;
        width:385px;
    }
    @media only screen and (max-width:1920px) and (min-width:1441px){
        height:405px;
        width:385px;
        margin: 10px;
    }
    
    `;

    export const Product2 = styled.img`
    height: 380px;
    width: 280px;
    border-radius:0px;
    box-shadow: 0px 2px 2px 0px rgba(35,35,35,0.34);
    -webkit-box-shadow:  0px 2px 2px 0px rgba(35,35,35,0.34);
    -moz-box-shadow:  0px 2px 2px 0px rgba(35,35,35,0.34);
    `;

    export const Product3 = styled.img`
    height: 380px;
    width: 380px;
    border-radius:0px;
    box-shadow: 0px 2px 2px 0px rgba(35,35,35,0.34);
    -webkit-box-shadow:  0px 2px 2px 0px rgba(35,35,35,0.34);
    -moz-box-shadow:  0px 2px 2px 0px rgba(35,35,35,0.34);
    `;