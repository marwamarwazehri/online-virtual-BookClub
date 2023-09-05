import React,{useState,useContext,useEffect} from 'react'
import './UserStatus.css'
import LeftNavbar from './LeftNavbar'
import { AuthContext } from "../../../context/authContext";
import {FcReading} from 'react-icons/fc'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios'
import BookItem from '../../Join/BookDetails'
import { Link} from 'react-router-dom';
import bookStatus from '../../../img/ook-status.svg'



//MakeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/statusBook",
  withCredentials: true,
});





const UserStatus = () => {

const { currentUser } = useContext(AuthContext);
const queryClient = useQueryClient();
const [selectedOption,setSelectedOptions]=useState('');

const handleOptionChange=((e)=>{
    setSelectedOptions(e.target.value);

})

//get currently books the user is reading
const { isLoading, error, data } = useQuery(["Reading", currentUser?.id], () =>
  makeRequest.get(`/userBooksReading/${currentUser?.id}`).then((res) => {
    return res.data;
  })
 
);

//get books the user have read
const { isLoading: isLoading2, error: error2, data: data2 } = useQuery(
  ["Read", currentUser?.id],
  () =>
    makeRequest.get(`/userBooksHaveRead/${currentUser?.id}`).then((res) => {
      return res.data;
    })
);

//get books the user want to read
const { isLoading: isLoading3, error: error3, data: data3 } = useQuery(
  ["WantToRead", currentUser?.id],
  () =>
    makeRequest.get(`/userBooksWantToRead/${currentUser?.id}`).then((res) => {
      return res.data;
    })
);


 useEffect(() => {
    if (data3) {
      console.log(data3);
    }
  }, [data3]);




  return (
    <div className='main-useStatus-conatner'>
      <div className='nav-status'>
          <LeftNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     
 <div className='status-content'>
{/*currently reading */}
<div className='currently-reading'>
        <div className='currently-reading-title'>
            <div className='reading-icon'><FcReading size={45}/></div>
            <h5>CURRENTLY READING</h5>
           {data && data.length ? (
  data.length === 1 ? (
    <p>{data.length} book</p>
  ) : (
    <p>{data.length} books</p>
  )
) : (
  <p>0 books</p>
)}
</div>

{/*fetching the currently reading books */}
{/*eza ma raj3le she y3ne ma fe shi ,y3ne 7ata array fadyeh ma be raj3le la eno ma la2a wala row so ntebhe bhal 7ale data.length mesh 0 hye be tkoun aslan undefined  3shen hk 3am n3mal check wfo2kamen  */}
<div className='reading-books'>
  {isLoading ? (
  <p>Loading...</p>
) : data && data.length ? (    
  data.map((book) => (
    <div className='current-book-Item' key={book.id}>
      <div className='right'>
        <Link to={`/BookDetails/${book.id}`}><img src={`../upload/${book?.bookImg}`} alt='image' /></Link>
      </div>
      <div className='left'>
        <h4>{book.bookname}</h4>
        <p>by {book.author}</p>
      </div>
    </div>
  ))
) : (
  <div className='maching-status'>
    <img src={bookStatus} alt='status'/>
    <p>No books currently being read.</p></div>
)}

</div>
</div>

{/*drop down list View*/}
<div className='view-list'>
    <p>VIEW</p>
     <select value={selectedOption} onChange={handleOptionChange}>
        <option hidden value="---">Select Status</option>
        <option value="Books you have read">Books you have read</option>
        <option value="Books you want to read">Books you want to read</option>
        </select>
</div>

{selectedOption === 'Books you have read' && 
<div className='currently-reading'>
        <div className='currently-reading-title'>
            <div className='reading-icon'><FcReading size={27}/></div>
            <h5>BOOKS YOU HAVE READ</h5>
           {data2 && data2.length ? (
  data2.length === 1 ? (
    <p>{data2.length} book</p>
  ) : (
    <p>{data2.length} books</p>
  )
) : (
  <p>0 books</p>
)}
</div>
{/*fetching the the books user have read */}
{/*eza ma raj3le she y3ne ma fe shi ,y3ne 7ata array fadyeh ma be raj3le la eno ma la2a wala row so ntebhe bhal 7ale data.length mesh 0 hye be tkoun aslan undefined  3shen hk 3am n3mal check wfo2kamen  */}
<div className='reading-books'>
  {isLoading2 ? (
  <p>Loading...</p>
) : data2 && data2.length ? (    
  data2.map((book) => (
    <div className='current-book-Item' key={book.id}>
      <div className='right'>
       <Link to={`/BookDetails/${book.id}`}><img src={`../upload/${book?.bookImg}`} alt='image' /></Link>
      </div>
      <div className='left'>
        <h4>{book.bookname}</h4>
        <p>{book.author}</p>
      </div>
    </div>
  ))
) : (
  <div className='maching-status'>
    <img src={bookStatus} alt='status'/>
    <p>No books you have read.</p></div>
)}

</div>
</div>
}

{selectedOption === 'Books you want to read' && 
<div className='currently-reading'>
        <div className='currently-reading-title'>
            <div className='reading-icon'><FcReading size={27}/></div>
            <h5>BOOKS YOU WANT TO READ</h5>
           {data3 && data3.length ? (
  data3.length === 1 ? (
    <p>{data3.length} book</p>
  ) : (
    <p>{data3.length} books</p>
  )
) : (
  <p>0 books</p>
)}
</div>
{/*fetching the the books user have read */}
{/*eza ma raj3le she y3ne ma fe shi ,y3ne 7ata array fadyeh ma be raj3le la eno ma la2a wala row so ntebhe bhal 7ale data.length mesh 0 hye be tkoun aslan undefined  3shen hk 3am n3mal check wfo2kamen  */}
<div className='reading-books'>
  {isLoading3 ? (
  <p>Loading...</p>
) : data3 && data3.length ? (    
  data3.map((book) => (
    <div className='current-book-Item' key={book.id}>
      <div className='right'>
       <Link to={`/BookDetails/${book.id}`}><img src={`../upload/${book?.bookImg}`} alt='image' /></Link>
      </div>
      <div className='left'>
        <h4>{book.bookname}</h4>
        <p>{book.author}</p>
      </div>
    </div>
  ))
) : (
  <div className='maching-status'>
    <img src={bookStatus} alt='status'/>
    <p>No books you want to read.</p></div>
)}

</div>
</div>
}


 </div>
      
    </div>
  )
}

export default UserStatus
