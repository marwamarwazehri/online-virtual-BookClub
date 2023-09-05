import React from 'react'
import './Footer.css'
import booklogo from '../../../img/booklogo.svg'
import { Link } from 'react-router-dom';
import {BsFacebook,BsTiktok,BsPinterest,BsLinkedin} from 'react-icons/bs'
import {ImInstagram} from 'react-icons/im'
import {FaTwitter} from 'react-icons/fa'
import {AiFillYoutube} from 'react-icons/ai'




const Footer = () => {
  return (
    <div className='footer-container' id='footer'>

      <div className='inner-container'>
      
      <div className='footer-container-logo'>
          <img  src={booklogo} alt='logo'/>
      </div>

      <div className='footer-container-links'>
      
        <div className='footer-container-links-content'>
          <p> <span>Company</span></p> 
           
          <p><Link to=''>About Bookclubs</Link></p>
           <p><Link to=''>Privacy Policy</Link></p>
            <p><Link to=''>Terms of Use</Link></p>
             <p><Link to=''>Premium Pricing</Link></p>
              <p><Link to=''>Shelf Service</Link></p>
              </div>
             


            <div className='footer-container-links-content'>
           <p> <span>Community</span></p> 
           
          <p><Link to=''>Join a Book Club</Link></p>
           <p><Link to=''>Blog</Link></p>
            <p><Link to=''>Forum</Link></p>
             <p><Link to=''>Events</Link></p>
             </div>


      
          <div className='footer-container-links-content'>
          <p> <span>Support</span></p> 
           
          <p><Link to=''>Discussion Questions</Link></p>
           <p><Link to=''>Contact Us</Link></p>
            <p><Link to=''>How To Guides</Link></p>
             <p><Link to=''>FAQs</Link></p>
             
             </div>


             <div className='footer-container-links-content'>
           <p> <span>BookClubs For...</span></p> 
           
          <p><Link to=''>Business</Link></p>
           <p><Link to=''>Charities</Link></p>
            <p><Link to=''>Bookstores</Link></p>
             <p><Link to=''>Libraries</Link></p>
              <p><Link to=''>Creators</Link></p>
              </div>

          
          <div className='footer-container-links-content'>
          <div className='contect'><p> <span>Connect</span></p> </div> 
           
           <div className='text'><p>Join the Bookclubs newsletter for monthly reading recommendations,
              book club tips, giveaways, and more.</p></div> 

              <div className='contact-icons'>

                <a href='https://www.facebook.com/BookclubsHQ'><BsFacebook size={40} color='#222121'/></a>
                <a href='https://www.instagram.com/bookclubshq/'><ImInstagram size={40} color='#222121'/></a>
                 <a href='https://twitter.com/bookclubshq'><FaTwitter size={40} color='#222121'/></a>
                 <a href='https://www.tiktok.com/@bookclubshq'><BsTiktok size={40} color='#222121'/></a>
                 <a href='https://www.pinterest.com/BookclubsHQ/'><BsPinterest size={40} color='#222121'/></a>
                 <a href='https://www.linkedin.com/company/bookclubs'><BsLinkedin size={40} color='#222121'/></a>
                 <a href='https://www.youtube.com/channel/UCC4sla4QIsuQ96yfyBT2IOw'><AiFillYoutube size={40} color='#222121'/></a>
  </div>
   </div>
</div>
     

     <div className='footer-container-end'>
      <p>© 2023 Bookclubz, Inc. All rights reserved</p>
     </div>

     </div>
    </div>
  )
}

export default Footer



            
             


           










             
             



             









            









             


           
        
              

             












     