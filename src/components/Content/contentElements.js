import styled from 'styled-components';
import imagbg2 from '../../images/_DSC4710.jpg'


export const Header = styled.h1`
text-align: center;
font-size:20px;
color:#E71E2D;
font-family: Amiri, serif;
`

export const Header1 = styled.h2`
font-family: Amiri, serif;
font-size:20px;
text-align: left;
color:#404040;

@media only screen and (max-width:320px){
 font-size:20px;
}
@media only screen and (max-width:375px) and (min-width:321px) {
 font-size:20px;
}
@media only screen and (max-width:425px) and (min-width:376px) {
 font-size:20px;
}
@media only screen and (max-width:768px) and (min-width:426px) {
 font-size:20px;
}`


export const Para = styled.p`
position: relative;
text-align: justify;
float: left;
font-size:20px;
`

export const ContentContainerImg = styled.img`
     width: 400px;
     height: 442px;
     border-radius: 50%;
    image:  url(${imagbg2});
    position: relative;
    float:right;
    repeat: no-repeat; 
    @media only screen and (max-width:320px){
        height: 200px;
        width: 250px;
        // top: 9px;
        right: 27px;
    }
    @media only screen and (max-width:375px) and (min-width:321px){
        height:250px;
        width:200px;
        // top:-10px;
        // right:20px;
    }
    @media only screen and (max-width:425px) and (min-width:376px){
        height:250px;
        width:200px;
        // top:-10px;
        right:5px;
    }
    @media only screen and (max-width:768px) and (min-width:426px){
        height: 322px;
        width: 279px;
        // top:-10px;
        // right:20px;
    }

`   
export const Container = styled.div`
margin:60px;
@media only screen and (max-width:320px){
    width:320px;
    height:auto;
}
@media only screen and (max-width:375px) and (min-width:321px){
    width:375px;
    height:auto;
}
@media only screen and (max-width:425px) and (min-width:376px){
    width:425px;
    height:auto;
}
@media only screen and (max-width:768px) and (min-width:426px){
    width:768px;
    height:auto;
}`

export const ContentContainer = styled.div`
    min-height: 100px;
    margin: 10px;
    font-size: 15px;
    text-align: center;
    
    @media only screen and (max-width:320px){
    height:120px;
    margin:0px;
    padding-top:0px;
    font-size:12px;
    }
    @media only screen and (max-width:375px) and (min-height:321px){
    height:120px;
    margin:0px;
    padding-top:0px;
    font-size:12px;
    }
     @media only screen and (max-width:425px) and (min-height:376px){
    height:120px;
    margin:0px;
    padding-top:0px;
    font-size:12px;
    }
    @media only screen and (max-width:768px) and (min-height:426px){
    height:120px;
    margin:0px;
    font-size:15px;
    }
     @media only screen and (max-width:1395px) and (min-width:1200px){
    margin-top:0px;
    position:relative;
    }
     @media only screen and (max-width:1440px) and (min-width:1023px){
    position:relative;
    }
    @media only screen and (max-width:2560px) and (min-width:1449px){
}`    

export const ContentContainerChild = styled.div`
    border:2px solid white;
    background-color:white;
    opacity:1;
    position:relative;
    text-align: left;
    font-size: 20px;
    @media only screen and (max-width:320px){
     margin:0px;
     font-size:15px;
     height:650px;
     margin-height:200px;
     padding:0px;
    }
    @media only screen and (max-width:375px) and (min-width:321px){
     margin:0px;
     font-size:15px;
     height:650px;
     margin-height:200px;
     padding:0px;
    }
    @media only screen and (max-width:425px) and (min-width:376px){
     margin:0px;
     font-size:15px;
     height:650px;
     margin-height:200px;
     width:425px;
     padding:0px;
    }
    @media only screen and (max-width:768px) and (min-width:426px){
     margin:0px;
     font-size:15px;
     width:768px;
     padding:0px;
    }
    @media only screen and (max-width:1024px) and (min-width:768px){
     margin:0px;
     font-size:20px;
    }`        

 export const ContentBtn = styled.button`
    height:40px;
    width: 180px;
    border-radius:10px;
    border: 2px solid black;`   

