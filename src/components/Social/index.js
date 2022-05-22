import React from 'react';
// import social1 from '../../images/_DSC4862.jpg';
// import social2 from '../../images/_DSC4572.jpg';
// import social3 from '../../images/_DSC4773.jpg';
// import social4 from '../../images/_DSC4797.jpg';

import social1 from '../../images/socialimpressions/si1.jpg';
import social2 from '../../images/socialimpressions/si2.jpg';
import social3 from '../../images/socialimpressions/si3.jpg';
import social4 from '../../images/socialimpressions/si4.jpg';


import { SocialContainer,SocialCard,SocialHeader,SocialHeading,SocialWrapper,SocialImg } from './socialElements';

const Social = React.memo(() => {
    return(
        <div className='container' style={{ marginBottom:"25px"}}>
        <SocialHeading > Social Impressions</SocialHeading>
        {/* <SocialHeader><p>Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad <br/>
        Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </SocialHeader> */}
        <div className='row'>
        <div className='col' style={{marginTop:15}}>
        {/* <SocialCard> */}
        <SocialImg className='img1' src={social1} alt='/'/>
        {/* </SocialCard> */}
        </div>
        <div className='col' style={{marginTop:15}}>
        {/* <SocialCard> */}
        <SocialImg className='img2' src={social2} alt='/'/>
        {/* </SocialCard> */}
        </div>
        <div className='col' style={{marginTop:15}}>
        {/* <SocialCard> */}
        <SocialImg className='img3' src={social3} alt='/'/>
        {/* </SocialCard> */}
        </div>
        <div className='col' style={{marginTop:15}}>
        {/* <SocialCard> */}
        <SocialImg className='img4' src={social4} alt='/'/>
        {/* </SocialCard> */}
        </div>
        </div>
        </div>
    )
})
export default Social;