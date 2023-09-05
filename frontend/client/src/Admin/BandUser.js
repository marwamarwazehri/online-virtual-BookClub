import React,{useContext} from 'react'
import './BandUser.css'
import { AuthContext } from "../context/authContext";
import band  from '../img/ban.png';

const BandUser = () => {
    const { currentUser } = useContext(AuthContext);
  return (
    <div className='banduser-dtails'>
    
    <div className='banduser-dtails-img'>
        <img src={band}/>
    </div>
   <div className='banduser-dtails-userName'>
   <p>Dear {currentUser.name}</p> 
   </div>
   <div className='banduser-dtails-text'>
    We regret to inform you that your account has been suspended from our platform, 
    effective immediately. This decision has been made due to the repeated posting 
    of content that is both inappropriate and unrelated to the purpose of our website.
    As a user, it is essential to adhere to our community guidelines and contribute positively to our platform.
    We value the quality and relevance of content shared within our community, 
    ensuring a positive user experience for all. 


   </div>
      
    </div>
  )
}

export default BandUser
