import React, { useState, useContext, useEffect } from 'react';
import './BookReviews.css';
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import profile from '../../img/profile.jpg';
import { RiCloseLine } from 'react-icons/ri';
import { BiLike } from 'react-icons/bi';
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import BookComment  from './BookComment';
import book1 from '../../img/book1.jpg'

//makeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/reviewsBook",
  withCredentials: true,
});

const BookReviews = ({ bookpost , fetchReviewCount,setReviewCount}) => {
  const { currentUser } = useContext(AuthContext);
  const [isShow, setIsShow] = useState(true);
  const [boxreview, setBoxreview] = useState(false);
  const [edit,setEdit]=useState(false);
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Add this line to access the query client
 
  const handlereview = () => {
   
    
    
    if (!currentUser) {
      navigate('/login');
    } else if(currentUser.ban==="false"){
     navigate('/BandUser');
    }else{
     setBoxreview(true);
    }

};
  

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };



   const handleReviewData = (data) => {
    if (currentUser && data && data.some(review => review.userId === currentUser.id)) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  };

  const [getreviewdata,setGetReviewData]=useState([]);

  //get reviews
  const { isLoading, error, data } = useQuery(["reviews", bookpost.id], () =>
  makeRequest.get(`/bookreviews/${bookpost.id}`).then((res) => {
    const reviewData = res.data;
      handleReviewData(reviewData);
      setGetReviewData(res.data);
    return res.data;
    
  })
);

useEffect(()=>{
  fetchReviewCount();
},[getreviewdata])
  //post review
  const mutation = useMutation(
    (newReview) => {
      return makeRequest.post("/reviews", newReview);
    },
    {
      onSuccess: () => {
  queryClient.invalidateQueries(["reviews", bookpost.id]);
      },
    }
  );

//add review
const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ review, bookId:bookpost.id,userId:currentUser.id });
    setReview("");
    setBoxreview(false);
    setIsShow(false)
  };

//edit review
const handleEdit = (reviewText) => {
  setBoxreview(true);
  setEdit(true);
  setReview(reviewText);
};

//edit review

const handleSave = async () => {
  const updatedReview = { review, bookId: bookpost.id, userId: currentUser.id };

  try {
    await makeRequest.put(`/editreview/${currentUser.id}/${bookpost.id}`, updatedReview);
    queryClient.invalidateQueries(["reviews", bookpost.id]);
    setReview("");
    setBoxreview(false);
  } catch (error) {
    console.error("Error updating review:", error);
  }
};

//Delete review

const handleDelete = async () => {
  try {
    await makeRequest.delete(`/deletereview/${currentUser.id}/${bookpost.id}`);
    queryClient.invalidateQueries(["reviews", bookpost.id]);
  } catch (error) {
    console.error("Error deleting review:", error);
  }
  setIsShow(true);
  setBoxreview(false);
  setEdit(false);
  setReview("");
  setConfirmDelete(false);
};


const [confirmdelete,setConfirmDelete]=useState(false);

const HandleDeleteConfirm=(()=>{
   setConfirmDelete(true);
  setBoxreview(false);
  
})





  return (
    <div className='review-container' id="review">
      <div className='review-container-title'>
        <h5>Community Reviews</h5>
      </div>

     {isShow  &&  <div className='Community-Reviews-boxReview'>
        <div className='user-image'>
          {!currentUser?.id? <img src={profile} /> : !currentUser?.profile ? <img src={profile} /> : <img src={`../upload/${currentUser.profile}`} />}
        </div>
      <div className='remark' onClick={handlereview}>
          <h5>Write a review...</h5>
        </div>
      </div>} 

      {/*review box  */}
      {boxreview && (
        <div className='review-box'>
          <div className='box-container1'>
            <div className='close' onClick={() => setBoxreview(false)}>
             <RiCloseLine color='#5b5e5f' size={30} />
            </div>
            <div className='bookimage'>
              <img src={`../upload/${bookpost?.bookImg}`} />
            </div>
            <div className='bookname'><p>{bookpost.bookname}</p></div>
            <div className='bookauthor'><p>by {bookpost.author}</p></div>
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder='Write a review'
              rows={8} // Specify the number of rows you want to display
              cols={40} // Specify the number of columns you want to display
            />

           {!edit?<div className='Add-btn'>
              <button className='submit' onClick={handleClick}>ADD</button>
            </div>:
            <div className='post-Delete'>
                <div className='delete'><button onClick={HandleDeleteConfirm}>DELETE REVIEW</button></div>
                <div className='post'><button onClick={handleSave}>SAVE</button></div>
                </div>} 
          </div>
        </div>
      )}

      {/* fetch reviews*/}
      <div className='fetch-reviews'>
        {error
        ? "Something went wrong"
        : isLoading
        ? "loading":data?
        data.map((review)=>{
            return <div className='review-content'>
            <BookComment review={review} handleEdit={handleEdit}/>
            </div>

            })
       :<p>No Reviews</p> }


      </div>

 {confirmdelete && <div className='delete-acount'>
  
  <div className='delete-acount-content  position-rev-del'>
    <div className='delete-acount-iconn'><RiCloseLine color='#5b5e5f' size={30} onClick={()=>setConfirmDelete(false)}/></div>
    <p>Are you sure you want to delete this Review?</p>
    <div className='delete-acount-content-buttons'>
    <div className='delete-account'><button onClick={handleDelete}>DELETE</button></div>
    </div>


  </div>
  
  
  </div>}
    </div>
  );
};

export default BookReviews
