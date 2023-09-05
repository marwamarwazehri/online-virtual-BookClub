import React, { useState, useContext, useEffect } from 'react'
import './MessageItem.css'
import { AuthContext } from "../../../../context/authContext";
import profile from '../../../../img/square-profile.png'
import moment from "moment";
import {AiOutlineHeart } from 'react-icons/ai';
import {FcLike } from 'react-icons/fc';
import { Link, Navigate, useNavigate } from "react-router-dom";
import {MdModeEdit} from 'react-icons/md'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {FaRegCommentAlt} from 'react-icons/fa'
import {MdOutlineCameraAlt,MdOutlineCancel} from 'react-icons/md'
import {RxFace} from 'react-icons/rx'
import {RiSendPlane2Fill} from 'react-icons/ri'
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import CommentItem from './CommentItem'


//makeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/Messages",
  withCredentials: true,
});

//makeRequest Like
const makeRequestLike = axios.create({
  baseURL: "http://localhost:8800/api/MessageLikes",
  withCredentials: true,
});

//makeRequest comments
const makeRequestComment = axios.create({
  baseURL: "http://localhost:8800/api/MessageComment",
  withCredentials: true,
});


const MessageItem = ({message}) => {

const { currentUser } = useContext(AuthContext);
const queryClient = useQueryClient();
const navigate = useNavigate();
const [showContent,setShowContent]=useState(true);
const [editMessage,setEditMessage]=useState(message.message);
const [messageComment,setMessageComment]=useState([]);
const [showComments,setShowComments]=useState(false);
const [newComment,setNewComment]=useState("");
const [file, setFile] = useState(null);
const [confirmDelete,setConfirmDelete]=useState(false);




  
//edit message
const handleSave = async () => {
  const updatedMessage = {editMessage ,userId: currentUser.id,messageId:message.id};

  try {
    await makeRequest.put(`/editmessage/${currentUser.id}`, updatedMessage);
    queryClient.invalidateQueries(["messages"]);
    setEditMessage("");
    setShowContent(true);
    
  } catch (error) {
    console.error("Error updating message:", error);
  }
  
};

//Delete message
const handleDelete = async () => {
  try {
    await makeRequest.delete(`/deletemessage/${currentUser.id}/${message.id}`);
    queryClient.invalidateQueries(["messages"]);
    setConfirmDelete(false);
  } catch (error) {
    console.error("Error deleting message:", error);
  }
  
};


//Likes

// get likes
  const { isLoading, error, data } = useQuery(["likesmessage",message.id], () =>
   makeRequestLike.get(`/getmessagelike/${message.id}`).then((res) =>{
      return res.data;
    })
  );


   // add or delete like
  const mutation = useMutation(
    (liked) => {
      const requestData = { messageId: message.id, userId: currentUser.id };

      if (liked) {
        return makeRequestLike.delete("/deletemessagelike", { data: requestData });
      }

      return makeRequestLike.post("/addmessagelike", requestData);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likesmessage"]);
      },
    }
  );


   const handleLike = () => {
  if (data && data.includes(currentUser.id)) {
    mutation.mutate(true);
  } else {
    mutation.mutate(false);
  }
};



//get comments
const { isLoading: isLoading2, error: error2, data: data2 } = useQuery(["comments",message.id], () =>
  makeRequestComment.get(`/messageComment/${message.id}`).then((res) => {
    return res.data;
    
  })
);

//add Comments
//Upload Image
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);// 3m zeed 3ala formData lfile 
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      return res.data; /*bada tredele limgeurl eno limage name  */
    } catch (err) {
      console.log(err);
    }
  };

  //post comment
  const mutation2 = useMutation(
    (newComm) => {
      return makeRequestComment.post("/insertcomments", newComm);
    },
    {
      onSuccess: () => {
  queryClient.invalidateQueries(["comments", message.id]);
      },
    }
  );

//add comment
const handleClick = async (e) => {
    e.preventDefault();
   const imgUrl = await upload();
    mutation2.mutate({ newComment,img: file ? imgUrl : "",userId:currentUser.id,messageId:message.id,});
    setNewComment("");
    setFile(null);
    
  };


const handleCreateComment=((e)=>{
e.preventDefault(); // Prevent default form submission behavior
  if (currentUser.ban ==="false") {
    navigate("/BandUser");
  } else {
    handleClick(e); // Pass the event object to handleClick
  }
})

  







//Cancle
const handleCancle=(()=>{
    setShowContent(true);
    setEditMessage(message.message);
})
//handleEdit
const handleEdit=(()=>{
  setShowContent(false);
  setEditMessage(message.message);
})




return (
  <div>
    {confirmDelete && <div>
  <div className='delete-acount-content-2'>
    <p>Are you sure you want to delete this Message?<br/> This action is irreversible</p>
    <div className='delete-acount-content-buttons'>
      <div className='cancel-account'><button onClick={()=>setConfirmDelete(false)}>CANCEL</button></div>
      <div className='delete-account' onClick={handleDelete}><button>DELETE</button></div>
    </div>


  </div>
  
  
  </div>}  
  <div className='message-Item'>
  
        <div className='user-content-message'>
                    <div className='img-name-date'>
                    <div className='picture-user'>{!message.profile?<img src={profile} />:<img src={`../upload/${message?.profile}`} />}</div>
                    <div className='name-postdate-message'>
                        <h5>{message.name}</h5>
                        <span className="date">
                    {moment(message.createdAt).format("dddd MMM DD, YYYY hh:mm A")}
              </span>
                    </div>
                    </div>
{currentUser?.id===message.userId &&<div className='edit-delete'>
   {showContent &&  <MdModeEdit size={23} onClick={handleEdit} color='rgb(59, 58, 58)' />}
    <RiDeleteBin5Line size={23} onClick={()=>setConfirmDelete(true)} color='rgb(59, 58, 58)'/>
</div> }


                </div>

    
   {showContent?<div className='message-like'>
        
        <div className='message-text'><p>{message.message}</p></div>
        <div className='message-image'>{message.messageImg?<img src={`../upload/${message?.messageImg}`}/>:""}</div>
    </div>:
    <div className='edit-message'>
       <div className='edit-text-message'>
        <input type='text'  value={editMessage} onChange={(e)=>setEditMessage(e.target.value)}/>
        <div className='smile-edit'><RxFace size={27}/></div>
         </div>
       <div className='cancle-savechange'>
        <div className='cancle-edit' onClick={handleCancle}><p>Cancel <span>.</span></p></div>
        <div className='save-edit' onClick={handleSave}>Save Changes</div>

       </div>


        </div>} 


{isLoading ? (
  "loading"
) : data && data.includes(currentUser?.id) ? (
  <div className='like-icon-message-red' >
    <FcLike onClick={handleLike} size={23} />
    <p style={{color:'red'}}>{data?.length}</p>
  </div>
) : (
  <div className='like-icon-message'>
    <AiOutlineHeart onClick={handleLike} size={23} />
    <p>{data?.length}</p>
  </div>
)}


<div className='comment-message'>
   
    <div className='comment-write' onClick={()=>setShowComments(!showComments)}>
    
        <div className='comment-icon'><FaRegCommentAlt size={20} color='rgb(54, 53, 53)'/></div>
      <p>Comment</p>
      </div>
      
    
    <div className='commentNumber'>
        <p>{data2?.length} {data2?.length===1?'comment':'comments'}</p>
        </div>
</div>

  

{/*fetch comments */}
{showComments && (
  <div className='comment-component'>

    <div className='comment-box-content'>
   

<div className='inner-box-content'>
  <div className='user-profile-comment'>{!currentUser.profile?<img src={profile} />:<img src={`../upload/${currentUser?.profile}`} />}</div>

<div className='try'>
 {file && (<div className='fake-image-comment1'>
          <img className="file-comment" alt="" src={URL.createObjectURL(file)} />
          <div className='cancel-img-comment1' onClick={()=>setFile(null)}><MdOutlineCancel size={30} color='rgb(211, 208, 208)'/></div>

              </div> 
            )} 
<div className='inputaimage'>
<input type='text' placeholder='Write a comment' value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>

<div className='face-camera-comment'>
    <div className='smile-comment'><RxFace size={27} color='rgb(161, 159, 159)'/></div>

    <div className='upload-content-comment'>
  <input
    type="file"
    id="file2"
    style={{ display: "none" }}
    onChange={(e) => setFile(e.target.files[0])}
    />         
   <label htmlFor="file2">
         <div className="item-cpmment">
         <MdOutlineCameraAlt size={27} color='rgb(161, 159, 159)'/>
           </div>
            </label>   
     </div>  
    <div className='send-icon' onClick={handleCreateComment}>
    <RiSendPlane2Fill size={15} color='rgb(39, 38, 38)'/>
    </div>

</div>
</div>
</div>
</div>


</div>

    <div className='comments-list'>
    {error2 ? (
      <p>Something went wrong</p>
    ) : isLoading2 ? (
      <p>Loading...</p>
    ) : data2 && data2.length > 0 ? (
      data2.map((comment) => (
        <div className='comment-content' key={comment.id}>
          <CommentItem message={message} comment={comment} />
        </div>
      ))
    ) : (
      <div className='not-fount'><p>No Comments yet</p></div>
    )}
    </div>

 

  </div>

)} 





</div> 
</div>


 
    
  )
}

export default MessageItem
