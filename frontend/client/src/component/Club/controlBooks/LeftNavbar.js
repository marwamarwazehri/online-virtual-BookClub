import React ,{useState}from 'react'
import './LeftNavbar.css'
import magicbook from '../../../img/magic-book.jpg'
import {HiUserGroup} from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios'


//MakeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/auth",
  withCredentials: true,
});




const LeftNavbar = () => {

const queryClient = useQueryClient();


  //get number of members joining the group
const { isLoading, error, data } = useQuery(["Join"], () =>
  makeRequest.get(`/UserNumberMembers`).then((res) => {
    return res.data;
  })
 
);


const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
  setActiveLink(link);
};


return (
<div className='left-navbar'>

 <div className='left-image'>
    <img  src={magicbook} alt='magic'/>
 </div>

 <div className='small-title'>
    <p>CLUB</p>
 </div>

 <div className='big-title'>
    <p>The Magic Book Club</p>
 </div>

 
 <div className='numberMembers'>
<div className='members-icon'>
    <HiUserGroup size={26} color='rgb(65, 62, 62)'/>
</div>

<div>
  {isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className='number'>
      <p>{data && data.length} Members</p>
    </div>
  )}
</div>
</div>



<div className='Left-links'>
<ul>
 <li><Link to='/About'   className={activeLink === '/About' ? 'active' : ''}
  onClick={() => handleLinkClick('/About')}
  >ABOUT OUR CLUB</Link></li> 
 
 <li><Link to='/PostBook' className={activeLink === '/Post' ? 'active' : ''}
  onClick={() => handleLinkClick('/Post')} >POST A BOOK</Link></li>  
 
 <li><Link to='/UserStatus' className={activeLink === '/Status' ? 'active' : ''}
  onClick={() => handleLinkClick('/Status')}>CURRENTLY READING</Link></li> 
 
 <li><Link to='/Messages' className={activeLink === '/Message' ? 'active' : ''}
  onClick={() => handleLinkClick('/Message')}>CLUB MESSAGES</Link></li> 
 
 <li><Link to='/MeetingPosts'   className={activeLink === '/Meetings' ? 'active' : ''}
  onClick={() => handleLinkClick('/Meetings')}>MEETINGS</Link></li> 
</ul>
</div>


<div className='invite-link'>
    <h5>INVITE LINK</h5>
    <input type='text' value='https://bookclubs.com/clubs/13555/join/991997/'/>
    <p>Copy/paste to send friends this link to invite them to The Magic Book Club</p>
</div>


<div className='send-link'>
 <h5>SEND INVITATION VIA EMAIL</h5>
<p>Input the emails of your friends here to send them<br/> an invitation (Separate multiple emails with a comma)</p>
 <input type='text' placeholder='Email(s) of your friend(s)'/>
 <button>Click to send invitation</button>
</div>
      
    </div>
  )
}

export default LeftNavbar
