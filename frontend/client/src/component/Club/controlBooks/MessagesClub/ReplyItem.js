import React,{ useState, useContext } from 'react'
import './ReplyItem.css'
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AuthContext } from "../../../../context/authContext";
import moment from "moment";
import profile from '../../../../img/profile.jpg';
import {MdModeEdit} from 'react-icons/md'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {RxFace} from 'react-icons/rx'
import {AiOutlineLike,AiFillLike} from 'react-icons/ai'



//makeRequest reply
const makeRequestReply = axios.create({
  baseURL: "http://localhost:8800/api/CommentReply",
  withCredentials: true,
});

//makeRequest Like
const makeRequestReplyLike = axios.create({
  baseURL: "http://localhost:8800/api/ReplyLikes",
  withCredentials: true,
});


const ReplyItem = ({reply,comment}) => {

const { currentUser } = useContext(AuthContext);
const queryClient = useQueryClient();
const [showRep,setShowRep]=useState(true);
const [editReply,setEditReply]=useState(reply.reply);
const [confirmDelete,setConfirmDelete]=useState(false);

//Cancle
const handleCancle=(()=>{
    setShowRep(true);
    setEditReply(reply.reply);
})

//handleEdit
const handleEdit=(()=>{
  setShowRep(false);
  setEditReply(reply.reply);
  
})

//edit reply
const handleSave = async () => {
  const updatedMessage = {editReply ,userId: currentUser.id,commentId:comment.id,replyId:reply.id};

  try {
    await  makeRequestReply .put(`/editreply/${currentUser.id}`, updatedMessage);
    queryClient.invalidateQueries(["reply"]);
    setEditReply("");
    setShowRep(true);
    
  } catch (error) {
    console.error("Error updating Reply:", error);
  }
  
};


//Delete reply
const handleDelete = async () => {
  try {
    await  makeRequestReply .delete(`/deletereply/${currentUser.id}/${comment.id}/${reply.id}`);
    queryClient.invalidateQueries(["reply"]);
    setConfirmDelete(false);
  } catch (error) {
    console.error("Error deleting reply:", error);
  }
  
};



// get likes
  const { isLoading, error, data } = useQuery(["likesreply",reply.id], () =>
  makeRequestReplyLike.get(`/getreplylike/${reply.id}`).then((res) =>{
      return res.data;
    })
  );

  // add or delete like
  const mutation = useMutation(
    (liked) => {
      const requestData = { replyId:reply.id, userId: currentUser.id };

      if (liked) {
        return makeRequestReplyLike.delete("/deletereplylike", { data: requestData });
      }

      return  makeRequestReplyLike.post("/addreplylike", requestData);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likesreply"]);
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

  

return (
  <div  className='short'>
  {confirmDelete && <div>
  <div className='delete-acount-content-2'>
    <p>Are you sure you want to delete this Reply?<br/> This action is irreversible</p>
    <div className='delete-acount-content-buttons'>
      <div className='cancel-account'><button onClick={()=>setConfirmDelete(false)}>CANCEL</button></div>
      <div className='delete-account' onClick={handleDelete}><button>DELETE</button></div>
    </div>


  </div>
  
  
  </div>}  
    <div className='reply-Item'>
  <div className='user-content-message'>
                    <div className='img-name-date'>
                    <div className='picture-user'>{!reply.profile?<img src={profile} />:<img src={`../upload/${reply?.profile}`}/>}</div>
                    <div className='name-postdate-message'>
                        <h5>{reply.name}</h5>
                        <span className="date">
                    {moment(reply.createdAt).format("dddd MMM DD, YYYY hh:mm A")}
              </span>
                    </div>
                    
                    </div>
{currentUser?.id===reply.userId &&<div className='edit-delete  short-try'>
   {showRep &&  <MdModeEdit size={27} onClick={handleEdit}/>}
    <RiDeleteBin5Line size={27}  onClick={()=>setConfirmDelete(true)}/>
</div> }


                </div>



{showRep?<div className='message-like'>
        
        <div className='message-text'><p>{reply.reply}</p></div>
        <div className='message-image'>{reply.replyImg?<img src={`../upload/${reply?.replyImg}`}/>:""}</div>
    </div>:
    <div className='edit-message'>
      
       <div className='ttt'>
       <input type='text'  value={editReply} onChange={(e)=>setEditReply(e.target.value)}/>
        <div className='smile-edit'><RxFace size={27}/></div>
        </div>
         
       <div className='cancle-savechange'>
        <div className='cancle-edit' onClick={handleCancle}>Cancel <span>.</span></div>
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
      
    </div>
    </div>
  )
}

export default ReplyItem
