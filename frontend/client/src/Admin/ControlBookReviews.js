import React,{useState,useContext,useEffect} from 'react'
import './ControlBookReviews.css'
import AdminNavbar from './AdminNavbar'
import { AuthContext } from "../context/authContext";
import { Link , useNavigate} from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {RiDeleteBin5Line} from 'react-icons/ri'
import {MdOutlineCancel} from 'react-icons/md'
import axios from "axios";
import moment from "moment";
import DOMPurify from 'dompurify';





const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/AdminUser",
  withCredentials: true,
});



const ControlBookReviews = () => {

 const {currentUser} = useContext(AuthContext);
 const queryClient = useQueryClient();

 const [selectedOption,setSelectedOptions]=useState('');
 const [allreviews,setAllReviews]=useState(false);
 const [recentreviews,setRecentReviews]=useState(false);
 const [bookreviewarrays,setBookReviewArrays]=useState([]); //all reviews array
 const [bookRecentreviewarrays,setBookRecentReviewArrays]=useState([]);
 const [isbookdeleted,setIsBookDeleted]=useState(false);
 const [isbookrecentdeleted,setIsRecentBookDeleted]=useState(false);
  const [isreviewdeleted,setIsReviewDeleted]=useState(false);
  const [isreviewrecentdeleted,setIsRecentReviewDeleted]=useState(false);
 




 const handleOptionChange=((e)=>{
    setSelectedOptions(e.target.value);

})
 
//get all books
const { isLoading, error, data } = useQuery(["Books"], () =>
  makeRequest.get(`/getAllBooks`).then((res) => {
    return res.data;
  })
 
);

//get recent 10 books
const { isLoading: isLoading2, error: error2, data: data2} = useQuery(["recentBooks"], () =>
  makeRequest.get(`/getRecentBooks`).then((res) => {
    return res.data;
  })
 
);


// Get all book reviews
 /*const handleAllReviews = (bookId) => {
    setAllReviews(true);
    makeRequest.get(`/getAllReviews/${bookId}`).then((res) => {
      // Process the response data here
      console.log(res.data);
      setBookReviewArrays(res.data);
      setRecentReviews(false);

    });
  };

  //get recent reviews
const handleRecentReviews = (bookId) => {
  setRecentReviews(true);
    makeRequest.get(`/getRecentReviews/${bookId}`).then((res) => {
      // Process the response data here
      console.log(res.data);
      setBookRecentReviewArrays(res.data);
      setAllReviews(false);
      

    });
  };*/


// Get all book reviews
const handleAllReviews = (bookId) => {
  setAllReviews(true);
  makeRequest.get(`/getAllReviews/${bookId}`).then((res) => {
    // Process the response data here
    console.log(res.data);
    setBookReviewArrays(res.data);
    setRecentReviews(false);
  });
};

// Get recent reviews
const handleRecentReviews = (bookId) => {
  setRecentReviews(true);
  makeRequest.get(`/getRecentReviews/${bookId}`).then((res) => {
    // Process the response data here
    console.log(res.data);
    setBookRecentReviewArrays(res.data);
    setAllReviews(false);
  });
};


  
  
  // Mutation to delete a book from the "Books" query
  const deleteBook = useMutation((bookId) => makeRequest.delete(`/deletebook/${bookId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('Books');
      setIsBookDeleted(true);
      setTimeout(() => {
        setIsBookDeleted(false);
      }, 3000);
    },
  });

  // Mutation to delete a book from the "recentBooks" query
  const deleteRecentBook = useMutation((bookId) => makeRequest.delete(`/deleterecentbook/${bookId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('recentBooks');
      setIsRecentBookDeleted(true);
      setTimeout(() => {
        setIsRecentBookDeleted(false);
      }, 3000);
    },
  });





  // Mutation to delete a review
  const deleteReview = useMutation((reviewId) =>
    makeRequest.delete(`/deleteReview/${reviewId}`)
  );

  const handleDeleteReview = (reviewId) => {
  deleteReview.mutate(reviewId, {
    onSuccess: () => {
      queryClient.invalidateQueries('reviews');
      if (allreviews) {
        // If currently viewing all reviews, update the all reviews array
        setBookReviewArrays((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewId)
        );
        setIsReviewDeleted(true);
        setTimeout(() => {
       setIsReviewDeleted(false);
    }, 3000);

      } else if (recentreviews) {
        // If currently viewing recent reviews, update the recent reviews array
        setBookRecentReviewArrays((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewId)
        );
        setIsRecentReviewDeleted(true);
        setTimeout(() => {
   setIsRecentReviewDeleted(false);
    }, 3000);
      }
    },
  });
};

useEffect(()=>{
  
})
 
 return (
    <div className='main-controlBookReviews-conatner'>
      <div className='nav-controlBookReviews'>
          <AdminNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     


    <div className='controlBookReviews-content'>
<div className='left-adminreviewControl'>
   <div className='controlBookReviews-content-title'>
    <h5>Book Posts</h5>
   </div>
   
   
    {/*dropdown List */}  
   {/*<div className='viewBook-list'>
    <p>VIEW</p>
     <select value={selectedOption} onChange={handleOptionChange}>
        <option value="---">Select</option>
        <option value="all books">All BookPosts</option>
        <option value="recent books">Recent BookPosts</option>
        </select>
 </div>*/}
{isbookdeleted && <div className='left-adminreviewControl-message'><p>book has been deleted</p></div>}


{isLoading ? (
  <p>Loading...</p>
) : (
  
<div className='Book-List'>
  <table>
      <thead>
        <tr>
    <th>S.N.</th>
    <th>Image</th>
     <th>name</th>
     <th>author</th>
     <th>category</th>
     <th>description</th>
     <th>Pages nb</th>
     <th>Posted Date</th>
     <th>UserId</th>
      <th>Reviews</th>
     <th>Action</th>

        </tr>
      </thead>
      <tbody>
       {data && data.map((book,index) => {
    return(
    <tr key={book.id}>
        <td>{index + 1}</td>
        <td>{book.bookImg?<img src={`../upload/${book.bookImg}`} alt='bookImg'/>:"no Image"}</td>
        <td>{book.bookname}</td>
        <td>{book.author}</td>
        <td>{book.category}</td>
       <td><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.description) }} className='all-book-desc'></div></td>
         <td>{book.pages}</td>
        <td>{moment(book.createdAt).format("dddd MMM DD, YYYY hh:mm A")}</td>
        <td>{book.userId}</td>
        <td><div className='review-buttons'><button onClick={()=>handleAllReviews(book.id)}>Preview</button>
          </div></td>
       <td ><div className='del-book-btn'><button onClick={() => deleteBook.mutate(book.id)}>Delete</button></div></td>
           </tr>
    );
  })}
      </tbody>
    </table>
  
</div>
)}


</div>


{/*fetch  all reviews */}
{allreviews &&
<div className='right-adminreviewControl'>

<div className='reev'>
<div className='cancel-admin-review'><MdOutlineCancel size={33} color='rgb(77, 73, 73)' onClick={()=>setAllReviews(false)}/></div>
{isreviewdeleted && <div className='controlReviews-messg'><p>review has been deleted</p></div>}

{isLoading ? (
      <p>Loading...</p>
    ) : (
      <>
        {bookreviewarrays.length === 0 ? (
          <div className='controlReviews-no-rev-found'><p>No reviews found.</p></div>
        ) : (
          <div className='review-List'>
             
            <table>
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>Review</th>
                  <th>Posted Date</th>
                  <th>UserId</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookreviewarrays.map((review, index) => {
                  return (
                    <tr key={review.id}>
                      <td>{index + 1}</td>
                      <td className='scrollable-cell'><div>{review.review}</div></td>
                      <td>{moment(review.createdAt).format("dddd MMM DD, YYYY hh:mm A")}</td>
                       <td>{review.userId}</td>
                      <td>
                        <div onClick={() => handleDeleteReview(review.id)}>
                          <RiDeleteBin5Line size={27}  color='red'/>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </>
    )}
  


{/*{recentreviews && (
  <div>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <>
        {bookRecentreviewarrays.length === 0 ? (
          <p>No recent reviews found.</p>
        ) : (
          <div className='review-List2'>
            <table>
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>Review</th>
                  <th>Posted Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookRecentreviewarrays.map((review, index) => {
                  return (
                    <tr key={review.id}>
                      <td>{index + 1}</td>
                      <td>{review.review}</td>
                      <td>{moment(review.createdAt).format('dddd, DD/MM/YYYY')}</td>
                      <td>
                        <div onClick={() => handleDeleteReview(review.id)}>
                          <RiDeleteBin5Line size={27} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </>
    )}
  </div>
              )}*/}


</div>

 </div>
}
      

 
      
      
      </div>
      
    </div>
  )
}

export default ControlBookReviews
