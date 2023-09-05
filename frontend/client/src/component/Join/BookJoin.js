import React, { useEffect } from 'react'
import './BookJoin.css'
import BookShelf from './BookShelf'
import {useContext} from 'react'
import { AuthContext } from "../../context/authContext";
import {BiMessageAlt} from 'react-icons/bi'
import magicbook from '../../img/magic-book.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios'




//MakeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/auth",
  withCredentials: true,
});

const BookJoin = () => {
  const { currentUser} = useContext(AuthContext);
  const queryClient = useQueryClient();


  //get number of members joining the group
const { isLoading, error, data } = useQuery(["Join"], () =>
  makeRequest.get(`/UserNumberMembers`).then((res) => {
    return res.data;
  })
 
);





  return (
    <div className='join' id="try">
    
    <div className='join-container'>

     <div className='join-container-img'> <img src={magicbook} alt='magic'/></div>
     <div  className='join-container-content'>
        <h5>The Magic Book Club</h5>
       <div className='join-container-content-discuss'>
              <BiMessageAlt size={27} color='#5b5e5f'/>
              <span>Discover more by joining The Magic Book Club</span>
       </div> 
       {isLoading ? (
  <p>Loading...</p>
) : (
  <div className='jion-sentence'>
   <p><span>{data && data.length} members are joining this Club</span></p>
  </div>
)}
</div>
<div className='join-container-button'>
 {currentUser? <button><Link to='/About'>EXPLORE</Link></button>: <button><Link to='/Login'><p>JOIN</p></Link></button>}
</div>
 </div>
   <BookShelf/>
  </div>


   

    
  )
}

export default BookJoin
