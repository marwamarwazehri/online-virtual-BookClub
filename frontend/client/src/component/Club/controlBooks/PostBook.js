import React,{useState,useContext} from 'react'
import './PostBook.css'
import LeftNavbar from './LeftNavbar'
import {MdAddCircle} from 'react-icons/md'
import {BsFillSignpostSplitFill} from 'react-icons/bs'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import {ImSearch} from 'react-icons/im'
import PostItem from './postItem'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query';




//MakeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/bookPost",
  withCredentials: true,
});




const PostBook = () => {

const { currentUser } = useContext(AuthContext);
const [search,setSearch]=useState('');
const [results, setResults] = useState([]);
const queryClient = useQueryClient();
const navigate = useNavigate();

//search
const handleQueryChange = (e) => {
    const search = e.target.value;
    setSearch(search);

    const filteredBooks = data.filter(
      (book) =>
        book.bookname.toLowerCase().includes(search.toLowerCase())||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
          book.category.toLowerCase().includes(search.toLowerCase())
        );
    setResults(filteredBooks);
  };



  //get user bookPosts
 // get user bookPosts
const { isLoading, error, data } = useQuery(["posts", currentUser?.id], () =>
  makeRequest.get(`/bookUser/${currentUser?.id}`).then((res) => {
    return res.data;
  })
);

const handleCreatePost=(()=>{
  if(currentUser.ban==="false"){
  navigate("/BandUser");
  }else{
    navigate("/write");
  }

})


  return (
    <div  className='main-post-conatner'>
      <div className='nav'>
       <LeftNavbar/>
    </div>
  {/* ////////////////////////////////////////////////////////////////////////////// */}     
<div className='post-content'>
    <div className='postInto'>
      <div className='post-number'>
        <BsFillSignpostSplitFill size={28}/>
        <p> YOUR POSTS NUMBER: <span>{data ? data.length : 0} books</span></p>
      </div>

      <div className='postIcon'>
        <i><MdAddCircle size={27} color='black' onClick={handleCreatePost}/></i> 
        <p>POST A BOOK</p>
      </div>
</div>


 <div className='search-content-panel'>
 <div className='form'>
        <form>
          <ImSearch size={27} color='rgb(58, 58, 58)'/>
          <input type='text' placeholder='SEARCH BOOKS BY TITLE ,AUTHOR or CATEGORY ' className='searchText2' value={search} onChange={handleQueryChange}></input>
         
        </form>
       </div>
  </div>



{/*fectch  user books */}

<div className='book-user-content'>
    {error ? (
  'Something went wrong'
) : isLoading ? (
  'loading'
) : data !== undefined ? (
  search.toLowerCase() === '' ? (
    data.length > 0 ? (
      data.map((book) => {
        return <PostItem book={book} key={book.id} />;
      })
    ) : (
     <div className='noposts'><p>No Posts Yet</p> </div>
    )
  ) : results.length > 0 ? (
    results.map((book) => {
      return <PostItem book={book} key={book.id} />;
    })
  ) : (
    <div className='nomatch2'>No matching books found</div>
  )
) : (
  <p>No Posts Yet</p>
)}

</div>

      </div>

    
      
    </div>
  )
}

export default PostBook
