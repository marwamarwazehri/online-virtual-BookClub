import React, { useState, useContext, useEffect } from 'react'
import './CommentReply.css'
import LeftNavbar from '../LeftNavbar'
import CommentItem from './CommentItem'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';


const CommentReply = ({data2}) => {


useEffect(()=>{
    console.log(data2);
})
  

return (
    <div className='main-CoomentReply-conatner'>
      <div className='nav-CommentReply'>
          <LeftNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     


    <div className='CommentReply-content'>
      
      </div>
      
    </div>
  )
}

export default CommentReply
