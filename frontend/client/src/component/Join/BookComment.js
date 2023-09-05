import React, { useState, useContext } from 'react';
import './BookComment.css'
import { AuthContext } from "../../context/authContext";
import profile from '../../img/profile.jpg';
import {AiOutlineLike,AiFillLike} from 'react-icons/ai'
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';



//makeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/likes",
  withCredentials: true,
});

const BookComment = ({review,handleEdit}) => {


const { currentUser } = useContext(AuthContext);
const navigate = useNavigate();

  


  // get like
  const { isLoading, error, data } = useQuery(["likes", review.id], () =>
    makeRequest.get("/getlike?reviewId=" + review.id).then((res) => {
      return res.data;
    })
  );

  // add or delete like
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      const requestData = { reviewId: review.id, userId: currentUser.id };

      if (liked) {
        return makeRequest.delete("/deletelike", { data: requestData });
      }

      return makeRequest.post("/addlike", requestData);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );


   const handleLike = () => {
  
   if (!currentUser) {
    // User is not logged in, navigate to '/login'
    navigate('/login');
    return;
  }else {
    // User is not logged in, perform mutation
    if (data && data.includes(currentUser.id)) {
      mutation.mutate(true);
    } else {
      mutation.mutate(false);
    }
  }
};



return (
    <div className='single-review'>

    <div className='user-content'>
                    <div className='picture'>{!review.profile?<img src={profile} />:<img src={`../upload/${review.profile}`} />}</div>
                    <div className='name-postdate'>
                        <h5>{review.name}</h5>
                        <span className="date">
                   {moment(review.createdAt).format("dddd MMM DD, YYYY hh:mm A")}
              </span>
                    </div>
                </div>

    
    <div className='review-like'>
        
        <div className='review-text'><p>{review.review}</p></div>
       {currentUser?.id===review.userId && <div className='edit-btn'>
  <button onClick={() => handleEdit(review.review)}>EDIT REVIEW</button></div>} 
       </div>


       
            {isLoading ? (
              "loading"
            ) :data && data.includes(currentUser?.id) ? (
             <div className='like-icon'><AiFillLike
                style={{ color: "blue"}}
                onClick={handleLike}
                size={23}
              />
               <p>{data?.length} Likes</p>
              </div> 
            ) : (
             currentUser?.id &&<div className='like-icon'>
               <AiOutlineLike onClick={handleLike}  size={23}  />
                <p>{data?.length} Likes</p>
             </div>
            
            )}

         
    </div>
  )
}

export default BookComment
