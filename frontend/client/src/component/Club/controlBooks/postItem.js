import React,{useContext, useState} from 'react'
import './PostItem.css'
import book1 from '../../../img/book1.jpg'
import {MdModeEdit} from 'react-icons/md'
import { Link, useLocation, useNavigate } from "react-router-dom";
import {RiDeleteBin5Line} from 'react-icons/ri'
import { AuthContext } from "../../../context/authContext";
import moment from "moment";
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {AiFillStar} from 'react-icons/ai'
import {BsFillEyeFill,BsFillEyeSlashFill} from 'react-icons/bs'



const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/Post",
  withCredentials: true,
});




const PostItem = ({book}) => {


const { currentUser } = useContext(AuthContext);
const navigate = useNavigate();
const queryClient = useQueryClient();
const [confirmDelete,setConfirmDelete]=useState(false);

//Delete a Book

const deleteMutation = useMutation(
  ({ postId, userId }) => {
    return makeRequest.delete(`/${userId}/${postId}`);
  },
  {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
      setConfirmDelete(false);
    },
  }
);

const handleDelete = (postId, userId) => {
  deleteMutation.mutate({ postId:book.id, userId:currentUser.id });

};





const handleUpdatePublicStatus = async (bookId, status) => {
  try {
    const response = await makeRequest.put(`/updatePubliclStatus/${currentUser.id}/${bookId}`, { status });
    const { message } = response.data;

    if (status === "true") {
      alert(`${message}`);
    } else {
      alert(`${message}`);
    }

    queryClient.invalidateQueries(["posts", bookId]);
  } catch (error) {
    console.error("Error updating public status:", error);
  }
};




  return (
   <div>
  {confirmDelete && <div>
  <div className='delete-acount-content-2'>
    <p>Are you sure you want to delete this BookPost?<br/> This action is irreversible</p>
    <div className='delete-acount-content-buttons'>
      <div className='cancel-account'><button onClick={()=>setConfirmDelete(false)}>CANCEL</button></div>
      <div className='delete-account' onClick={handleDelete}><button>DELETE</button></div>
    </div>


  </div>
  
  
  </div>}    
  <div className='book-container'>  
 <div className='right'>
    <Link to={`/BookDetails/${book.id}`}><img src={`../upload/${book?.bookImg}`} alt='image' /></Link>
    </div>

<div className='left'>
    <div className='bookName-icon'>
        <h5>{book.bookname}</h5>
        <Link to={`/write?edit=2`} state={book} className='editedit'><MdModeEdit size={27} color='rgb(54, 53, 53)'/></Link>
       <Link ><RiDeleteBin5Line  size={27} onClick={()=>setConfirmDelete(true)} color='rgb(54, 53, 53)'/></Link>
        {book.public==="true"?<div className='eye'><BsFillEyeFill
  size={27}
  onClick={() => handleUpdatePublicStatus(book.id, "false")}
/></div>:<div className='eye'><BsFillEyeSlashFill
  size={27}
  onClick={() => handleUpdatePublicStatus(book.id, "true")}
/></div>}
    </div>
  

    
    <div className='author'>
        <p><span>by</span> {book.author}</p>
    </div>
 
 <div className='category'>
       {book.category!=="other" &&<p>{book.category}</p>} 
    </div>
 
 
 <div className='pages'>
        <p><span>{book.pages} </span>pages</p>
    </div>
    
    <div className='averageRate'>
      <div className='star'><AiFillStar size={27} color='#e4301c'/></div>
        <p>Average rating:{book.averagerate}</p>
    </div>


<div dangerouslySetInnerHTML={{ __html: book.description }} className='desc'></div>

 <div className='time'>
     <p>{moment(book.createdAt).format("dddd MMM DD, YYYY hh:mm A")}</p>
    </div>

    </div>
    </div>
        

   
        
 </div>

  )
}

export default PostItem
