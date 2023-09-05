import React,{useState,useEffect,useRef} from 'react'
import './BookDetails.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useContext} from 'react'
import { AuthContext } from "../../context/authContext";
import DOMPurify from "dompurify";
import {AiFillStar} from 'react-icons/ai'
import book1 from '../../img/book1.jpg'
import {RiCloseLine} from 'react-icons/ri'
import booklogo from '../../img/bookshopLogo.jpg'
import amazonlogo from '../../img/amazonLogo.png'
import librollogo from '../../img/libroLogo.png'
import applelogo from '../../img/applelogo.png'
import {RiArrowDropDownLine} from 'react-icons/ri'
import Bookreviws from './BookReviews'
import axios from 'axios'



const BookDetails = () => {
 const [bookPost, setBookPost] = useState({})
 const [request, setRequest] = useState(false)
const location = useLocation();
const navigate = useNavigate();
const bookId = location.pathname.split("/")[2];
 /*const averageRate = location.pathname.split('/')[3];*/
const { currentUser} = useContext(AuthContext);


 useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/bookPost/book/${bookId}`);
        setBookPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

   
    
  }, [bookId]);



 


const [selectedOptions, setSelectedOptions] = useState('ADD TO MY SHELVES');
const [isDropdownOpen, setDropdownOpen] = useState(false);
const [isOptionSelected, setOptionSelected] = useState(false);
const [isOptionSelected2, setOptionSelected2] = useState(false);
const [isOptionSelected4, setOptionSelected4] = useState(false);


const handleDropdownLeave = () => {
    setDropdownOpen(false);
  };



const API_URL = 'http://localhost:8800'; // Replace with your backend API URL

const removeBookStatus = async (option) => {
  try {
    const response = await axios.post(`${API_URL}/api/statusBook/removestatus`, {
      option: option,
      userId: currentUser.id,
      bookId: bookId,
    });
    console.log(response.data); // "Status has been removed."
  } catch (err) {
    console.log(err);
    // Handle any errors that occur during the removal process
  }
};

const [message,setMessage]=useState('');

  


  const handleSubmitStatus = async (status) => {
    try {
      const response = await axios.post(`${API_URL}/api/statusBook/status`, {
        status: status,
        userId: currentUser.id,
        bookId: bookId,
      });

      if (response.status === 200) {
        if (response.data === 'Your status has been updated.') {
          // Handle the case when status is updated successfully
          showMessage('Your status has been updated.');
          } else if (response.data === 'Status has been created.') {
          // Handle the case when status is inserted successfully
          showMessage('Status has been created.');
          fetchDataCountmembers();

        } else if (response.data === 'Status has not been inserted.') {
          // Handle the case when status is not inserted
          showMessage('Status has been removed.');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
const [right,setRight]=useState(false)
const showMessage = (message) => {
  // Display the message in the user interface
  // You can update this part to show the message in your specific UI framework or element
  setMessage(message);
  setTimeout(() => {
     setMessage(null);
    }, 4000);
  setRight(true);

  };





  
  const handleOptionClick = async (option) => {
  let updatedOption = '';

  if (option === 'ADD TO CURRENTLY READING BOOKS') {
    if (isOptionSelected) {
      updatedOption = 'ADD TO MY SHELVES';
      await removeBookStatus(option);
    } else {
      updatedOption = 'ADD TO CURRENTLY READING BOOKS';
      
    }
    setOptionSelected(!isOptionSelected);
  } else if (option === 'ADD TO BOOKS I HAVE READ') {
    if (isOptionSelected2) {
      updatedOption = 'ADD TO MY SHELVES';
      await removeBookStatus(option);
    } else {
      updatedOption = 'ADD TO BOOKS I HAVE READ';
    }
    setOptionSelected2(!isOptionSelected2);
  } else if (option === 'ADD TO BOOKS I WANT TO READ') {
    if (isOptionSelected4) {
      updatedOption = 'ADD TO MY SHELVES';
      await removeBookStatus(option);
    } else {
      updatedOption = 'ADD TO BOOKS I WANT TO READ';
    }
    setOptionSelected4(!isOptionSelected4);
  }

  setSelectedOptions(updatedOption); // Update the value of selectedOptions

  setDropdownOpen(false);
  handleSubmitStatus(updatedOption);

 /*if(right){
  if(option === 'ADD TO CURRENTLY READING BOOKS'){
    if(!isOptionSelected){
      setOptionSelected(true)
       setOptionSelected2(false)
        setOptionSelected4(false) }
  }else if(option === 'ADD TO BOOKS I HAVE READ'){
    if(!isOptionSelected2){
      setOptionSelected(false)
       setOptionSelected2(true)
        setOptionSelected4(false) }
  }else{
     if(!isOptionSelected4){
      setOptionSelected(false)
       setOptionSelected2(false)
        setOptionSelected4(true) }
  }

}*/
};






useEffect(()=>{
 if(selectedOptions=='ADD TO CURRENTLY READING BOOKS'){
  setOptionSelected(true);
  setOptionSelected2(false);
  setOptionSelected4(false);
 }else if(selectedOptions=='ADD TO BOOKS I HAVE READ'){
  setOptionSelected(false);
  setOptionSelected2(true);
  setOptionSelected4(false);
 }else if(selectedOptions=='ADD TO BOOKS I WANT TO READ'){

  setOptionSelected(false);
  setOptionSelected2(false);
  setOptionSelected4(true);

 }else{
  setOptionSelected(false);
  setOptionSelected2(false);
  setOptionSelected4(false);
 }

},[selectedOptions])

  
const [isDropdownOpenrecommend, setDropdownOpenrecommend] = useState(false);
const handleDropdownHoverrecommend = () => {
    setDropdownOpenrecommend(true);
  };

  const handleDropdownLeaverecommend = () => {
    setDropdownOpenrecommend(false);
  };

const[selectedRate, setSelectedRate]=useState("")
 /*const [rDetails,setRDetails]=useState({
    rate:selectedRate,
    userId:currentUser.id,
    bookId:bookId,
  });*/



  const handleDelete = () => {
  fetch(`http://localhost:8800/api/bookRate/deleteRateUser/${currentUser.id}/${bookId}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      // Handle the success case here

      // Refresh the page
      window.location.reload();
      showMessageRate("Rate has been deleted")
    })
    .catch(error => {
      console.log(error);
      // Handle the error case here
    });
};






const handleSubmitRate = async (rate) => {
  try {
    
      const response = await axios.post('http://localhost:8800/api/bookRate/rate', {
        rate,
        userId: currentUser.id,
        bookId,
      });

      if (response.data.status ==="Rate has been updated.") {
        // Handle successful rate update
        showMessageRate("Rate has been updated.");
        fetchDataCount();
         
      } 
      else{
        // Handle successful rate creation
        showMessageRate("Rate has been created.");
        fetchDataCount();
        
      }
    
  } catch (err) {
    console.log(err);
    // Handle error
  }
};






const [rateMessage, setRateMessage] = useState('');
const showMessageRate = (message) => {
  setRateMessage(message);

  setTimeout(() => {
    setRateMessage(null);
  }, 2000);
};


  useEffect(()=>{
    console.log(selectedRate);
  },[selectedRate])


const handleOptionChange = (event) => {
  const rate = parseInt(event.target.value);
  setSelectedRate(rate);
  console.log(rate);
  handleSubmitRate(rate);
 
  };



  //count rate
  

const [rateCount, setRateCount] = useState(0); // State to store the number of rates
 
 
const [averagerate,setAverageRate]=useState("");

const fetchDataCount = async () => {
  try {
    const response = await axios.get(`http://localhost:8800/api/bookRate/ratecount/${bookId}`);
    const bookRates = response.data;
    setRateCount(bookRates.length);

    // Calculate the average rate
   const totalRate = bookRates.reduce((sum, rate) => sum + rate.rate, 0);
    const averageRate = totalRate / bookRates.length;

    // Update the average rate in the book table (assuming you have a function to update the book)
    updateBookAverageRate(bookId, averageRate);
    setAverageRate(averageRate);
   
  } catch (err) {
    console.log(err);
    // Handle the error
  }
};

useEffect(() => {
  fetchDataCount();
}, []);



//updating average rate in the table



const updateBookAverageRate = (bookId, averageRate) => {
  
  const updatedBook = {
    bookId: bookId,
    averageRate: averageRate,
    };

  axios.put(`http://localhost:8800/api/bookRate/averagerate/${bookId}`, updatedBook)
    .then(response => {
      // Book updated successfully
      console.log('Book average rate updated:', response.data);
    })
    .catch(err => {
      console.log(err);
      // Handle the error
    });
};


 

  
  


// getcount of members that already read the book 
const [membersstatusCount, setMembersStatusCount] = useState(0); 


  const fetchDataCountmembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/statusBook/Ireadstatuscount/${bookId}`);
      const bookstatus = response.data;
      console.log(bookstatus.length); 
      setMembersStatusCount(bookstatus.length); 
    } catch (err) {
      console.log(err);
      // Handle the error
    }
  };
useEffect(()=>{
  fetchDataCountmembers();
},[selectedOptions,bookId])


//get userstatus
const [userstatus,setUserStatus]=useState('')

const fetchStatus = async () => {
  try {
    const res = await axios.get(`http://localhost:8800/api/statusBook/userstatus/${currentUser.id}?bookId=${bookId}`);
    setSelectedOptions(res.data?res.data:"ADD TO MY SHELVES");
  } catch (err) {
    console.log(err);
  }
};
//getting rate of a user
//get userstatus
const fetchUserRate = async () => {
  try {
    const res = await axios.get(`http://localhost:8800/api/bookRate/userRate/${currentUser.id}?bookId=${bookId}`);
    setSelectedRate(res.data);
    
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
 fetchStatus();
 fetchUserRate();
 }, [bookId]);


//get reviewCount
const [reviewcount,setReviewCount]=useState('');


  const fetchReviewCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/reviewsBook/reviewcount/${bookId}`);
      const bookReview = response.data;
      /*console.log(bookRates.length); // Log the length after updating the state*/
      setReviewCount(bookReview.length); 
    } catch (err) {
      console.log(err);
      // Handle the error
    }
  };

  


 ///////////////////////////////////////////////////

 const [rightPosition, setRightPosition] = useState(0);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);


////////////////////////////////
 const [statusPosition, setStatusPosition] = useState({ top: 0, left: 0 });
  

  const handleDropdownClick = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect();

    setStatusPosition({ top: buttonRect.top, left: buttonRect.left });
    setDropdownOpen(!isDropdownOpen);
  };


  
  
  
return (
    <div className='details-container'>
      <div className='details-container-content' >
        <div className='left'>
        <img src={`../upload/${bookPost?.bookImg}`} />
        </div>

        
        
        <div className='right'>
          <div className='status-message'><p>{message}</p></div>
           
         <div className='name'><h5>{bookPost.bookname}</h5></div> 
           <h4>
        By{' '}
        <Link to={`/author/${encodeURIComponent(bookPost.author)}`}>
          {bookPost.author}
        </Link>
      </h4>
           <div dangerouslySetInnerHTML={{ __html: bookPost.description }} className='desc'></div>
          <h3>{membersstatusCount} MEMBERS HAVE ALREADY READ THIS BOOK</h3>
         {/* <div className='dicussQuestions'>
            <button  className='btn-request' onClick={()=>setRequest(true)}>REQUEST DISCUSION QUESTIONS</button>
             {request &&  <div className='request-page'>
              <div className='request-box'>
                <div className='close-icon'  onClick={()=>setRequest(false)}><RiCloseLine size={27} color='#525353'/></div>
                <p>Enter your email to be notified when discussion 
                   questions are added for <span>{bookPost.name}</span></p>
                  <input  type='email' placeholder='Your Email'/>
                   <button  className='btn'>REQUEST DISCUSION QUESTIONS</button>
                </div>
              </div> }
</div>*/}
          <div className='status-rcommend'>
            <div className='status'>
              {!currentUser?<div className='btn-login'>
  <Link to='/login'>
    <button className='btn'>ADD TO MY SHELVES</button>
  </Link>
</div> : <div className="btn-status" onMouseLeave={handleDropdownLeave} ref={buttonRef}>
     <button className="dropdown-toggle"  id="myButton" >{selectedOptions}<RiArrowDropDownLine size={30} color='white' onClick={handleDropdownClick}/></button>
      {isDropdownOpen && (
       <div className='status-list' style={{
      top: statusPosition.top,
      left: statusPosition.left,
      backgroundColor: "white",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
       paddingTop: "0", 
      padding: "10px",
      marginTop: "1rem",
     
    }}
    > <ul className="dropdown-menu">
          <li onClick={() => handleOptionClick('ADD TO CURRENTLY READING BOOKS')}>
            {isOptionSelected?"REMOVE FROM CURRENTLY READING BOOKS": "ADD TO CURRENTLY READING BOOKS"}
          </li>
          <li onClick={() => handleOptionClick('ADD TO BOOKS I HAVE READ')}>
            {isOptionSelected2 ?"REMOVE FROM BOOKS I HAVE READ":"ADD TO BOOKS I HAVE READ"}
          </li>

         
           <li onClick={() => handleOptionClick('ADD TO BOOKS I WANT TO READ')}>
            {isOptionSelected4?"REMOVE FROM BOOKS I WANT TO READ": "ADD TO BOOKS I WANT TO READ"}
          </li>
        </ul>
        </div>
      )}
    </div>
            }
            </div>
         {/*<div className='recommend'>
              {!currentUser?<div className='login-btn'><Link to='/login'><button  className='btn'>RECOMMEND BOOK</button></Link></div> :
               <div className="btn-recomment"  onMouseLeave={handleDropdownLeaverecommend}>
      <button className="dropdown-toggle">RECOMMEND BOOK <RiArrowDropDownLine size={30} color='white' onClick={handleDropdownHoverrecommend}/></button>
      {isDropdownOpenrecommend && (
        <div className='recommend-list'><ul className="dropdown-menu">
          <li>
           RECOMMEND TO MY CLUB
          </li>
          <li>
            RECOMMEND TO MY FRIENDS
          </li>

          
        </ul>
        </div>
      )}
    </div>
              }
            </div>*/}
          </div>

        <div className='buy-book-text'>
          {bookPost.firstlink || bookPost.secondlink || bookPost.thirdlink || bookPost.fourthlink?<p>BUY THE BOOK FROM:</p>:""}</div>
        <div className='buyBooks-websites'>
           {bookPost.firstlink && <div className='logobuy '><a href={bookPost.firstlink}><img src={booklogo}/></a></div>}
           {bookPost.secondlink && <div className='logobuy '><a href={bookPost.secondlink}><img src={librollogo}/></a></div>}
            {bookPost.thirdlink &&<div className='logobuy '><a href={bookPost.thirdlink}><img src={amazonlogo}/></a></div>}
            {bookPost.fourthlink && <div className='logobuy'><div className='logo'><a href={bookPost.fourthlink}><img src={applelogo}/></a></div></div>}
            </div>
           
           {bookPost.otherlink && 
           <div className='lastLogobuy'><a href={bookPost.otherlink}><div className='buy-other-web'>OTHER WEBSITES</div></a></div>} 
         
          
      <div className='rate-message'><p>{rateMessage}</p></div>
      {currentUser &&  <div className='ratingValue'>
        <div className='rating-title'><h3>MY RATING:</h3></div>
      <select value={selectedRate} onChange={handleOptionChange}>
      <option hidden value="">---</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select>

        {selectedRate &&<div onClick={handleDelete} className='remove-rer'><p>remove</p></div>}
      </div>
}   

    <div className='category-detal'> {bookPost.category!=="other" && <p>{bookPost.category}</p>} </div>
      <div className='pages'><h5>{bookPost.pages} pages</h5></div>
      
       <div className='avarege-rating'>
       <div className='star'><AiFillStar size={27} color='#e4301c'/></div>
        <div className='rating'><p>AVERAGE RATING:{averagerate?averagerate:"0"}</p> </div>
</div>

      <div className='bn-rating-reviews'>
        <p>{rateCount} Rates| <a href="#review"> {reviewcount} REVIEWS</a></p>
      </div>

          </div>
</div>


    
    
    
    
    
    <div className='details-container-reviews'>
      
        <Bookreviws  bookpost={bookPost} fetchReviewCount={fetchReviewCount} setReviewCount={setReviewCount}/>
    </div>
      
    </div>
  )
}

export default BookDetails
