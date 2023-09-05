import React,{ useState, useContext }  from 'react'
import './CommentItem.css'
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AuthContext } from "../../../../context/authContext";
import {MdModeEdit} from 'react-icons/md'
import {RiDeleteBin5Line} from 'react-icons/ri'
import profile from '../../../../img/profile.jpg';
import moment from "moment";
import {RxFace} from 'react-icons/rx'
import {FaReplyAll} from 'react-icons/fa'
import {AiOutlineLike,AiFillLike} from 'react-icons/ai'
import ReplyItem from './ReplyItem'
import {MdOutlineCameraAlt,MdOutlineCancel} from 'react-icons/md'
import {RiSendPlane2Fill} from 'react-icons/ri'
import { Link, useNavigate } from "react-router-dom";




//makeRequest comments
const makeRequestComment = axios.create({
  baseURL: "http://localhost:8800/api/MessageComment",
  withCredentials: true,
});


//makeRequest Like
const makeRequestCommentLike = axios.create({
  baseURL: "http://localhost:8800/api/CommentLike",
  withCredentials: true,
});

//makeRequest reply
const makeRequestReply = axios.create({
  baseURL: "http://localhost:8800/api/CommentReply",
  withCredentials: true,
});


const CommentItem = ({message,comment}) => {

const { currentUser } = useContext(AuthContext);
const queryClient = useQueryClient();
const [showComm,setShowComm]=useState(true);
const [editComment,setEditComment]=useState(comment.comment);
const [showReplies,setShowReplies]=useState(false);
const [newReply,setNewReply]=useState("");
const [file, setFile] = useState(null);
const [confirmDelete,setConfirmDelete]=useState(false);
const navigate = useNavigate();



//Cancle
const handleCancle=(()=>{
    setShowComm(true);
    setEditComment(comment.comment);
})

//handleEdit
const handleEdit=(()=>{
  setShowComm(false);
  setEditComment(comment.comment);
  
})

//edit comment
const handleSave = async () => {
  const updatedMessage = {editComment ,userId: currentUser.id,messageId:message.id,commentId:comment.id};

  try {
    await makeRequestComment.put(`/editcomment/${currentUser.id}`, updatedMessage);
    queryClient.invalidateQueries(["comments"]);
    setEditComment("");
    setShowComm(true);
    
  } catch (error) {
    console.error("Error updating comment:", error);
  }
  
};


//Delete comment
const handleDelete = async () => {
  try {
    await makeRequestComment.delete(`/deletecomment/${currentUser.id}/${message.id}/${comment.id}`);
    queryClient.invalidateQueries(["comments"]);
    setConfirmDelete(false);
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
  
};

// get likes
  const { isLoading, error, data } = useQuery(["likescomments",comment.id], () =>
  makeRequestCommentLike .get(`/getcommentlike/${comment.id}`).then((res) =>{
      return res.data;
    })
  );

  // add or delete like
  const mutation = useMutation(
    (liked) => {
      const requestData = { commentId: comment.id, userId: currentUser.id };

      if (liked) {
        return  makeRequestCommentLike.delete("/deletecommentlike", { data: requestData });
      }

      return  makeRequestCommentLike.post("/addcommentlike", requestData);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likescomments"]);
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

//get replies
const { isLoading: isLoading2, error: error2, data: data2 } = useQuery(["reply",comment.id], () =>
   makeRequestReply.get(`/replyComment/${comment.id}`).then((res) => {
    return res.data;
    
  })
);


//add reply
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

  //post reply
  const mutation2 = useMutation(
    (newRep) => {
      return  makeRequestReply.post("/insertreply", newRep);
    },
    {
      onSuccess: () => {
  queryClient.invalidateQueries(["reply", comment.id]);
      },
    }
  );
//add comment
const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    mutation2.mutate({ newReply,img: file ? imgUrl : "",userId:currentUser.id,commentId:comment.id,});
    setNewReply("");
    setFile(null);
  };


  const handleCreateReply = (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  if (currentUser.ban === "false") {
    navigate("/BandUser");
  } else {
    handleClick(e); // Pass the event object to handleClick
  }
};





  return (
    <div>
{confirmDelete && <div>
  <div className='delete-acount-content-2 pos'>
    <p>Are you sure you want to delete this Comment?<br/> This action is irreversible</p>
    <div className='delete-acount-content-buttons'>
      <div className='cancel-account'><button onClick={()=>setConfirmDelete(false)}>CANCEL</button></div>
      <div className='delete-account' onClick={handleDelete}><button>DELETE</button></div>
    </div>


  </div>
  
  
  </div>}  
    <div className='comment-Item'>

         <div className='user-content-message'>
                    <div className='img-name-date'>
                    <div className='picture-user'>{!comment.profile?<img src={profile} />:<img src={`../upload/${comment?.profile}`}/>}</div>
                    <div className='name-postdate-message'>
                        <h5>{comment.name}</h5>
                        <span className="date">
                   {moment(comment.createdAt).format("dddd MMM DD, YYYY hh:mm A")}
              </span>
                    </div>
                    
                    </div>
{currentUser?.id===comment.userId &&<div className='edit-delete edit-delete-messg'>
   {showComm &&  <MdModeEdit size={23} onClick={handleEdit} color='rgb(59, 58, 58)'/>}
    <RiDeleteBin5Line size={23}  onClick={()=>setConfirmDelete(true)} color='rgb(59, 58, 58)'/>
</div> }


                </div>


{showComm?<div className='message-like'>
        
        <div className='message-text'><p>{comment.comment}</p></div>
        <div className='message-image'>{comment.commentImg?<img src={`../upload/${comment?.commentImg}`}/>:""}</div>
    </div>:
    <div className='edit-message'>
       <div className='edit-text-message'>
        <input type='text'  value={editComment} onChange={(e)=>setEditComment(e.target.value)}/>
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
  <div className='like-icon-comment-blue'>
    <AiFillLike onClick={handleLike} size={23}  color='blue'/>
    <p style={{color:'blue'}}>{data?.length}</p>
  </div>
) : (
  <div className='like-icon-comment'>
    <AiOutlineLike onClick={handleLike} size={23} />
    <p>{data?.length}</p>
  </div>
)}

<div className='comment-message'>
    <div className='comment-write' onClick={()=>setShowReplies(!showReplies)}>
    <div className='comment-icon'><FaReplyAll size={20}/></div>
      <p>Reply</p>
      </div>
    
    <div className='commentNumber'>
        <p> {data2?.length} {data2?.length===1?'Reply':'Replys'}</p>
        </div>
</div>




{/*fetch reply */}
{showReplies && (
  <div className='comment-component'>
   
<div className='comment-box-content'>
    <div className='inner-box-content'>
  <div className='user-profile-comment'>{!currentUser.profile?<img src={profile} />:<img src={`../upload/${currentUser?.profile}`} />}</div>
<div className='try'>
  {file && (<div className='fake-image-comment2'>
   <img className="file-comment" alt="" src={URL.createObjectURL(file)} />
    <div className='cancel-img-comment2' onClick={()=>setFile(null)}><MdOutlineCancel size={30} color='rgb(211, 208, 208)'/></div>
          

              </div> 
            )} 
<div className='inputaimage'>
<input type='text' placeholder='reply' value={newReply} onChange={(e)=>setNewReply(e.target.value)}/>

<div className='face-camera-comment'>
    <div className='smile-comment'><RxFace size={27}/></div>

    <div className='upload-content-comment'>
  <input
    type="file"
    id="file3"
    style={{ display: "none" }}
    onChange={(e) => setFile(e.target.files[0])}
    />         
   <label htmlFor="file3">
         <div className="item-cpmment">
         <MdOutlineCameraAlt size={27}/>
           </div>
            </label>   
     </div>  
    <div className='send-icon' onClick={handleCreateReply}>
    <RiSendPlane2Fill size={15}/>
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
      data2.map((reply) => (
        <div className='comment-content' key={reply.id}>
          <ReplyItem reply={reply} comment={comment} />
        </div>
      ))
    ) : (
      <div className='no-rep'><p>No Replies</p></div>
    )}
    </div>




  </div>

)}
      
    </div>
    </div>
  )
}

export default CommentItem
