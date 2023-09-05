import React,{useState,useContext,useEffect} from 'react'
import './EditPostMeeting.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios'
import {ImSearch} from 'react-icons/im'
import {SlCalender} from 'react-icons/sl'
import {BiLink,BiTime} from 'react-icons/bi'
import {RiBook3Line} from 'react-icons/ri'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import DateTimePicker from 'react-datetime-picker'
import {MdDelete,MdOutlineCancel} from 'react-icons/md';

import moment from "moment";




//MakeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/Meetings",
  withCredentials: true,
});

const EditPostMeeting = () => {
const navigate = useNavigate();
const state = useLocation().state;
const { currentUser } = useContext(AuthContext);
const queryClient = useQueryClient();
const [results, setResults] = useState([]);
const [search,setSearch]=useState('');
const [bookname, setBookName] = useState('');
const [bookauthor, setBookAuthor] = useState('');
const [bookId, setBookId] = useState();
const [bookimage, setBookImage] = useState('');
const [meetingDate, setMeetingDate] = useState(state?.meetingDate ? moment(state.meetingDate).toDate() : null);
const [meetingduration, setMeetingDuration] = useState(state?.meetingduration ||"");
const [meetingLink, setmeetingLink] = useState(state?.meetingLink || "");
const [meetingnote, setmeetingNote] = useState(state?.meetingnote || "");
const [confirmDelete,setConfirmDelete]=useState(false)
 // Format the meetingDate value before sending it to the backend
  const formattedMeetingDate = moment(meetingDate).format('YYYY-MM-DD HH:mm:ss');

useEffect(()=>{
  if(state){
      setBookName(state.bookName);
        setBookAuthor(state.bookAuthor);
        setBookImage(state.bookImage);
        setBookId(state.IdBook);
  }
},[]);


const handleBookDetails=((book)=>{

    if(book){
        setBookName(book.bookname);
        setBookAuthor(book.author);
        setBookImage(book.bookImg);
        setBookId(book.id);
        setSearch('');
    }
    
})

const removeBookDetails=(()=>{
    setBookName('');
    setBookAuthor('');
    setBookImage('');
    setBookId('');
})



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


// get user bookPosts
const { isLoading, error, data } = useQuery(["posts", currentUser?.id], () =>
  makeRequest.get(`/postUser/${currentUser?.id}`).then((res) => {
    return res.data;
  })
);



//Edit or insert meeting
const [displayedErrors, setDisplayedErrors] = useState([]);//for error messages
 const handleClick = async (e) => {
  e.preventDefault();
  const errors = [];

  const currentDate = moment();
  const selectedDate = moment(formattedMeetingDate);
  
  if (selectedDate.isBefore(currentDate)) {
    errors.push("The selected date and time must be in the future.");
  }

  
  if (!bookname || !bookauthor || !bookimage) {
    errors.push("You Should Select a book");
  }
  if (!meetingDate) {
    errors.push("you should select a date!");
  }
   if (!meetingduration) {
    errors.push("you should select a duration!");
  }
   if (!meetingLink) {
    errors.push("you should enter a link!");
  }
  /*if (!meetingTime) {
    errors.push("you should select a time!");
  }*/
  
// Check if there are any error messages in the array
  if (errors.length > 0) {
    setDisplayedErrors(errors);

    // Clear the error messages after 3 seconds
    setTimeout(() => {
      setDisplayedErrors([]);
    }, 7000);

    return;
  }
  

  try {
    if (state) {
      await axios.put(`http://localhost:8800/api/Meetings/editmeeting/${state.id}`, {
         meetingDate: formattedMeetingDate,
        /*meetingTime,*/
        meetingduration,
        meetingLink,
        meetingnote,
        bookId,
        userid: currentUser.id
      });
      navigate("/MeetingPosts"); 
    } else {
      await axios.post(`http://localhost:8800/api/Meetings/postmeeting`, {
          meetingDate: formattedMeetingDate,
        /*meetingTime,*/
        meetingduration,
        meetingLink,
        meetingnote,
        bookId,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userid: currentUser.id
      });
      navigate("/MeetingPosts"); 
    }
  } catch (err) {
    console.log(err);
  }
};



//delete meeting
const handleDeleteMeeting = async () => {
  try {
    await makeRequest.delete(`/deletemeeting/${currentUser.id}/${state.id}`);
    queryClient.invalidateQueries(["meetings", state.id]);
  } catch (error) {
    console.error("Error deleting meeting:", error);
  }
 navigate('/MeetingPosts');
 setConfirmDelete(false);
};

  
  return (
    <div className='edit-post-meeting'>
    <div className='edit-post-meeting-title'>
       <p>Create a new meeting</p> 
    </div>

<div className='edit-post-meeting-userPosts-search'>
 <div className='form'>
        <form>
          <div className='search-book-met'><RiBook3Line size={35}/></div>
          <div className='search-class'><ImSearch size={27} color='white'/></div>
          <input type='text' placeholder='SEARCH a BOOK FROM YOUR POSTS' className='searchText3' value={search} onChange={handleQueryChange}></input>
         
        </form>
       </div>
  </div>

  {/*fectch  user books */}

<div className='book-user-content-meet'>
    {error ? (
  'Something went wrong'
) : isLoading ? (
  'loading'
) : data !== undefined?
search?(
   results.length > 0 ? (
    results.map((book) => {
      return <div className='userpost' onClick={()=>handleBookDetails(book)}>
        <div className='userpost-Img'>
        <img src={`../upload/${book?.bookImg}`} alt='image' />
        </div>

        <div className='userpost-name'>
           <p>{book.bookname}</p>
        </div>
         <div className='userpost-author'>
           <p>by {book.author}</p>
        </div>
      </div>;
    })
  ) : (
    <div className='nomatch3'>No matching books found</div>
  )
) : (
  ""
):<p>No Posts</p>}

</div>


<div className='Userbook-details'>
<div className='Userbook-details-left'>
 { bookimage && <img src={`../upload/${bookimage}`} alt='image' />}
</div>

{bookname && <div className='Userbook-details-right'>
    <h5>{bookname && bookname}</h5>
    <p> by {bookauthor && bookauthor}</p>
    <button onClick={removeBookDetails}>REMOVE</button>
</div>}

</div>


<div className='meeting-Details'>

<div className='datetime-met'>
<SlCalender size={27} color='rgb(107, 105, 105)'/>
    <DatePicker
  selected={meetingDate}
  onChange={(date) =>setMeetingDate(date)}
  showTimeSelect
  dateFormat="MMMM d, yyyy h:mm aa"
  timeFormat="HH:mm"
  timeIntervals={15}
  timeCaption="Time"
  placeholderText="MEETING DATE Time"
  popperPlacement="bottom-end"
/>
    </div>


<div className='duration-met'>
 
  <div className='duration-met-text'> 
  <BiTime size={35} color='rgb(107, 105, 105)'/>
  <p>MEETING DURATION</p></div>
  
  <div className='items-duration'>
        <input
              type="radio"
              checked={meetingduration=== "30 minutes"}
              name="cat"
              value="30 minutes"
              id="30 minutes"
              onChange={(e) => setMeetingDuration(e.target.value)}
            />
             <label htmlFor="30 minutes">30 minutes</label>

     <input
              type="radio"
              checked={meetingduration=== "60 minutes"}
              name="cat"
              value="60 minutes"
              id="60 minutes"
              onChange={(e) => setMeetingDuration(e.target.value)}
            />
             <label htmlFor="60 minutes">60 minutes</label>
           <input
              type="radio"
              checked={meetingduration=== "90 minutes"}
              name="cat"
              value="90 minutes"
              id="90 minutes"
              onChange={(e) => setMeetingDuration(e.target.value)}
            />
               <label htmlFor="90 minutes">90 minutes</label>
               <input
              type="radio"
              checked={meetingduration=== "120 minutes"}
              name="cat"
              value="120 minutes"
              id="120 minutes"
              onChange={(e) => setMeetingDuration(e.target.value)}
            />
             <label htmlFor="120 minutes">120 minutes</label>
  
  </div>
 
{/*<select value={meetingduration} onChange={(e)=>setMeetingDuration(e.target.value)}>
        <option hidden value="">MEETING DURATION</option>
        <option value="30 minutes">30 minutes</option>
        <option value="1 hour">1 hour</option>
         <option value="1hour 30minutes">1hour 30minutes</option>
          <option value="2hours">2hours</option>
           <option value="2 hours 30minutes">2 hours 30minutes</option>
           <option value="3 hours">3 hours</option>
</select>*/}

</div>
<div className='meeting-link'>
<BiLink size={30} color='rgb(107, 105, 105)'/>
<input type='text' value={meetingLink} placeholder='VIRTUAL MEETING LINK'
 onChange={(e)=>setmeetingLink(e.target.value)}/>
</div>

<div className='note-met'>
    <textarea
              value={meetingnote}
              onChange={(e)=>setmeetingNote(e.target.value)}
              placeholder='Note The Club Members'
              rows={6} // Specify the number of rows you want to display
              cols={70} // Specify the number of columns you want to display
            />
</div>

<div className='error-messages-met'>
  {displayedErrors.map((errorMsg, index) => (
    <p key={index}>{errorMsg}</p>
  ))}
</div>

<div className='meeting-btn'>
    <Link to='/MeetingPosts'><button className='meeting-btn-cancel'>CANCEL</button></Link>
    <button onClick={handleClick} className='meeting-btnCreate'>{state?"EDIT MEETING":"CREATE MEETING"}</button>
</div>
{state && <div className='meeting-btn-delete' onClick={()=>setConfirmDelete(true)}><p>DELETE MEETING</p></div>}

 {confirmDelete && <div className='delete-acount'>
  <div className='delete-acount-content'>
    <p>Are you sure you want to delete this Meeting?<br/> This action is irreversible</p>
    <div className='delete-acount-content-buttons'>
      <div className='cancel-account'><button onClick={()=>setConfirmDelete(false)}>CANCEL</button></div>
      <div className='delete-account' onClick={handleDeleteMeeting}><button>DELETE</button></div>
    </div>


  </div>
  
  
  </div>}

</div>
</div>
  )
}

export default EditPostMeeting
