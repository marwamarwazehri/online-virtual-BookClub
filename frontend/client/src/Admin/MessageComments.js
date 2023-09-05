import React, {useState,useContext,useEffect,useRef} from 'react'
import './MessageComments.css'
import AdminNavbar from './AdminNavbar'
import { AuthContext } from "../context/authContext";
import { Link , useNavigate} from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {RiDeleteBin5Line} from 'react-icons/ri'
import {MdOutlineCancel} from 'react-icons/md'
import axios from "axios";
import moment from "moment";



const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/AdminUser",
  withCredentials: true,
});



const MessageComments = () => {


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


const replySectionRef = useRef(null);
const replySectionRefComm=useRef(null);

const handleScrollToReplySection = () => {
    if (replySectionRef.current) {
      replySectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleScrollToReplySectionComm = () => {
    if (replySectionRefComm.current) {
      replySectionRefComm.current.scrollIntoView({ behavior: 'smooth' });
    }
    setAllReplies(false);
  };


//get all messages
const { isLoading, error, data } = useQuery(["messages"], () =>
  makeRequest.get(`/getAllMessages`).then((res) => {
    return res.data;
  })
 
);

//get recent 10 messages
const { isLoading: isLoading2, error: error2, data: data2} = useQuery(["recentmessages"], () =>
  makeRequest.get(`/getRecentMessages`).then((res) => {
    return res.data;
  })
 
);



// Get all message comments
const handleAllReviews = (messageId) => {
  setAllReviews(true);
  makeRequest.get(`/getAllComments/${messageId}`).then((res) => {
    // Process the response data here
    console.log(res.data);
    setBookReviewArrays(res.data);
    setRecentReviews(false);
  });
};

// Get recent message comments
const handleRecentReviews = (messageId) => {
  setRecentReviews(true);
  makeRequest.get(`/getRecentComments/${messageId}`).then((res) => {
    // Process the response data here
    console.log(res.data);
    setBookRecentReviewArrays(res.data);
    setAllReviews(false);
  });
};



 // Mutation to delete a message 
  const deleteBook = useMutation((messageId) => makeRequest.delete(`/deletemessage/${messageId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('messages');
      setIsBookDeleted(true);
      setTimeout(() => {
        setIsBookDeleted(false);
      }, 3000);
    },
  });

  // Mutation to delete a recentMessage
  const deleteRecentBook = useMutation((messageId) => makeRequest.delete(`/deleterecentmessage/${messageId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('recentmessages');
      setIsRecentBookDeleted(true);
      setTimeout(() => {
        setIsRecentBookDeleted(false);
      }, 3000);
    },
  });




  // Mutation to delete a comment
  const deleteReview = useMutation((reviewId) =>
    makeRequest.delete(`/deleteComment/${reviewId}`)
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

const [Commentreplies,setCommentReplies]=useState([]);
const [allreplies,setAllReplies]=useState(false);
//get all comment replies
const handleAllReplies =(commentId) => {
  setAllReplies(true);
  
  makeRequest.get(`/getAllReplies/${commentId}`).then((res) => {
    // Process the response data here
    console.log(res.data);
    setCommentReplies(res.data);
    
  });
};

const [replydeleted,setReplyDeleted]=useState(false);
//delete reply 
// Mutation to delete a reply
  const deleteReply = useMutation((replyId) =>
    makeRequest.delete(`/deleteReply/${replyId}`)
  );

  const handleDeleteReply = (replyId) => {
  deleteReply.mutate(replyId, {
    onSuccess: () => {
      queryClient.invalidateQueries('reviews');
      if (allreplies) {
       
        setCommentReplies((prevReply) =>
          prevReply.filter((reply) => reply.id !== replyId)
        );
        setReplyDeleted(true);
        setTimeout(() => {
       setReplyDeleted(false);
    }, 3000);

      } 
    },
  });
};


const CloseComRep=(()=>{
setAllReviews(false);
setAllReplies(false);
})





useEffect(()=>{
    console.log(data);
     console.log(data2);

})















  return (
<div className='main-MessageComment-conatner'>
      <div className='nav-MessageComment'>
          <AdminNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     


    <div className='MessageComment-content'>
      

      <div className='left-adminreviewControl'>
   <div className='controlBookReviews-content-title'>
    <h5>Club Messages</h5>
   </div>
   
   
    {/*dropdown List */}  
   {/*<div className='viewBook-list'>
    <p>VIEW</p>
     <select value={selectedOption} onChange={handleOptionChange}>
        <option value="---">Select</option>
        <option value="all messages">All Message Posts</option>
        <option value="recent messages">Recent Message Posts</option>
        </select>
  </div>*/}
{isbookdeleted && <div className='left-adminreviewControl-message'><p>message has been deleted</p></div>}

{isLoading ? (
  <p>Loading...</p>
) : (
  
<div className='Book-List'>
  <table>
      <thead>
        <tr>
    <th>S.N.</th>
    <th>Image</th>
     <th>Message</th>
     <th>Posted Date</th>
     <th>UserId</th>
    <th>Comments</th>
     <th>Action</th>

        </tr>
      </thead>
      <tbody>
       {data && data.map((message,index) => {
    return(
    <tr key={message.id}>
        <td>{index + 1}</td>
        <td>{message.messageImg?<img src={`../upload/${message.messageImg}`} alt='messageImg'/>:"no Image"}</td>
        <td className='scrollable-cell'><div>{message.message}</div></td>
        <td>{moment(message.createdAt).format("dddd MMM DD, YYYY hh:mm A")}</td>
         <td>{message.userId}</td>
        <td><div className='review-buttons'>
         
            <button onClick={()=>handleAllReviews(message.id)}>Preview</button>
          </div></td>
       <td><div className='del-book-btn'><button onClick={() => deleteBook.mutate(message.id)}>Delete</button></div></td>
           </tr>
    );
  })}
      </tbody>
    </table>
  
</div>
)}
</div>





{/*fetch comments */}

{allreviews &&
<div className='right-adminreviewControl'>
  
<div className='flexrow'>


<div className='comm'>
<div className='cancel-admin-comments'><MdOutlineCancel size={33} color='rgb(77, 73, 73)' onClick={CloseComRep}/></div>
{isreviewdeleted && <div className='controlReviews-messg'><p>comment has been deleted</p></div>}

    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <>
        {bookreviewarrays.length === 0 ? (
           <div className='controlComments-no-rev-found'><p>No comments found.</p></div>
        ) : (
          <div className='review-List'>
          <table>
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>Image</th>
                  <th>Comment</th>
                  <th>Posted Date</th>
                  <th>UserId</th>
                  <th>Replies</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookreviewarrays.map((comment, index) => {
                  return (
                    <tr key={comment.id}>
                      <td>{index + 1}</td>
                       <td>{comment.commentImg?<img src={`../upload/${comment.commentImg}`} alt='messageImg'/>:"no Image"}</td>
                      <td className='scrollable-cell'><div>{comment.comment}</div></td>
                      <td>{moment(comment.createdAt).format("dddd MMM DD, YYYY hh:mm A")}</td>
                       <td>{comment.userId}</td>
                      
                    <td>
                   <div className="review-buttons">
                    <button onClick={() => handleAllReplies(comment.id)}>Preview</button>
                    </div>
                  </td>
                   
                      
                      <td>
                        <div onClick={() => handleDeleteReview(comment.id)}>
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
    </div>


  
  



  {/*fetch replies */}
  <div className='reep'>
{allreplies && <div className='replyon-comment'>
{replydeleted && <div className='controlReply-messg'><p>reply has been deleted</p></div>}
{Commentreplies.length === 0 ? (
           <div className='no-rep-found'><p>No replies found.</p></div>
        ) : (
          <div className='reply-com-List'>
            <table>
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>Image</th>
                  <th>Reply</th>
                  <th>Posted Date</th>
                  <th>UserId</th>
                 <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Commentreplies.map((reply, index) => {
                  return (
                    <tr key={reply.id}>
                      <td>{index + 1}</td>
                       <td>{reply.replyImg?<img src={`../upload/${reply.replyImg}`} alt='messageImg'/>:"no Image"}</td>
                      <td className='scrollable-cell'><div>{reply.reply}</div></td>
                      <td>{moment(reply.createdAt).format("dddd MMM DD, YYYY hh:mm A")}</td>
                       <td>{reply.userId}</td>
                      
                        <td>
                        <div onClick={() => handleDeleteReply(reply.id)} className='delete-line'>
                          <p>Delete</p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}



<div className='close-rep-com'>
  <button onClick={()=>setAllReplies(false)}>close</button>
</div>

</div>}
</div>


</div>

 
</div>

}

      

      </div>
      
    </div>
  )
}

export default MessageComments
