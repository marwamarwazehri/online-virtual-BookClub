import React from 'react'
import './Appchat.css'
import playstore from './img/playstore.png'
import homemobile from './img/homemobile.jpeg'
import chatmobile from './img/chatmobile.jpeg'


const Appchat = () => {
  return (
    <div className='chat'>
       
   <div className='chat-upperpart'>
    <div className='chat-upperpart-left'>
        <h5 > Our Chat Mobile App </h5>
        <p>Discover a world of book lovers and expand your reading 
            journey with our chat mobile app. Join a vibrant community 
            of book enthusiasts where you can discuss your favorite books, 
            make new friends, and connect with like-minded individuals. 
            Dive into engaging conversations, discover new recommendations, 
            and broaden your literary horizons. Download our mobile chat app 
            now and embark on an exciting adventure of book 
            discussions and connections with fellow book lovers.</p>

    <img  src={playstore} alt='app'/>

    </div>
   
   
    <div className='chat-upperpart-right'>
       <div className='homemobile'><img  src={homemobile} alt='app'/></div> 
        <div className='chatmobile'><img  src={chatmobile} alt='app'/></div> 

    </div>
  
   </div>

  {/*<div className='chat-downpart'>
         <div className='chat-downpart-left'>
            
            <img  src={Apppic} alt='app'/>


         </div>

          <div className='chat-downpart-right'>
            
  </div>
    </div>
  */}
      
    </div>
  )
}

export default Appchat
