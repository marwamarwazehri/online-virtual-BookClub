import React, { useEffect } from 'react'
import './BookItem.css'
import {AiFillStar} from 'react-icons/ai'
import { Link} from 'react-router-dom';
import profile from '../../img/profile.jpg';
import book1 from '../../img/book1.jpg'
import moment from "moment";
import axios from 'axios'



const BookItem = ({book}) => {

  useEffect(()=>{
    console.log(book);
  })
  
  
    return (
     
    <div className='BookProfile'>
      <div className='user-info'>
        <div className='user-img'>{book.profile?<img src={`../upload/${book.profile}`} alt='profile1'/>: <img src={profile} alt='profile2'/>}</div>
        <div className='user-name'>{book.name}</div>
      </div>
       <div className='postdate'>{moment(book.createdAt).format("dddd MMM DD, YYYY hh:mm A")}</div>
    <div className='BookProfile-img'><Link to={`/BookDetails/${book.id}`}><img src={`../upload/${book?.bookImg}`} /></Link></div>
    <div className='BookProfile-name'>{book.bookname}</div>
   <div className='BookProfile-rating'>
     <div> <AiFillStar size={20}/></div>
     <div><p>Average rating:<span>{book.averagerate}</span></p></div>
    </div>
     <div className='writer-catrgory'>
        <h5>by {book.author}</h5>
         {book.category!=="other" && <p>{book.category}</p>} 
     </div>

    
     
    </div>
   
  )
}

export default BookItem
