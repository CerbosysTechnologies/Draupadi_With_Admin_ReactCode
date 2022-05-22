import styled from 'styled-components';

export const SocialContainer = styled.div`
overflow: hidden;
position:relative;
top:-20px;

`

export const SocialWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
position:relative;
@media only screen and (max-width:320px){
    height:auto;
    width:320px;
    padding:20px 20px 20px 20px;
    left:0px;
}
@media only screen and (max-width:375px) and (min-width:321px){
    height:auto;
    width:375px;
    padding:20px 30px 20px 30px;
    left:0px;
}
@media only screen and (max-width:1024px) and (min-width:768px){
    height:auto;
    width:auto;
}
`

export const SocialImg = styled.img`
max-height: 100%;
max-width: 100%;
padding:0px;
display:flex;
display:block;
justify-content:space-around;
postion:relative;
background-position: center;

transition: 4s ease-in-out;
// :hover{
//      transform: scale(1.5);
// }
 `

export const SocialHeading = styled.h1`
// font-size: clamp(2rem,2.4vw,3rem);
font-size: 20px;
text-align: center;
margin-bottom:2rem;
color:#404040;
font-weight:700;
@media only screen and (max-width:320px){
    margin-bottom:2rem;
}
@media only screen and (max-width:375px) and (min-width:321px){
    margin-bottom:2rem;
}
`

export const SocialHeader = styled.div`
    width: auto;
    height: 100px;
    background-size: 50%;
    text-align: center;
    @media only screen and (max-width:320px){
        font-size: 15px;
        text-align:left;
        margin:0px;
    }
    @media only screen and (max-width:375px) and (min-width:321px){
        font-size: 15px;
        text-align:left;
        margin:0px;
    }`    

    export const SocialCard = styled.div`
    height: 300px;
    width: 250px;
    //border:5px solid #BA7D82;
    //border-radius: 35px;
    overflow:hidden;
    `