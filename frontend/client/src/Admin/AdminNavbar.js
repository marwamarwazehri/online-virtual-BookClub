import React,{useState,useContext} from 'react'
import './AdminNavbar.css'
import magicbook from '../img/magic-book.jpg'
import {AiOutlineHome} from 'react-icons/ai'
import {RiAdminLine} from 'react-icons/ri'
import {BiCategory,BiLogOutCircle,BiUserCircle} from 'react-icons/bi'
import {MdOutlineRateReview} from 'react-icons/md'
import {GoCommentDiscussion} from 'react-icons/go'
import {BsReplyAll} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";


const AdminNavbar = () => {

const { currentUser ,logout} = useContext(AuthContext);
const navigate = useNavigate()


const signOut=(()=>{
  logout();
  navigate('/login');

})
  return (
    <div className='left-navbar2'>

{/*<div className='welcome-Admin'><p>Welcome {currentUser.username}</p></div>*/}

 <div className='left-title2'>
  
  <div className='left-title-name2'><p> Admin Dashboard</p></div>

 </div>
  

 
 
<div className='Left-links2'>
<ul>

  <li>
<div className='icon'><AiOutlineHome size={27} color='white'/></div>
<Link to='/AdminHome'>Dashboard</Link>
</li> 
 <li>
<div className='icon'><RiAdminLine size={27} color='white'/></div>
<Link to='/AdminRegister'>Manage Admin</Link>
</li> 
 
 <li>
    <div className='icon'><BiCategory size={27} color='white'/></div>
    <Link to='/Category'> Manage Category</Link>
    </li>  
  
 
 <li>
    <div className='icon'><MdOutlineRateReview size={28} color='white'/></div>
    <Link to='/ControlBookReviews'> Manage Book Posts</Link></li> 
 
 <li>
     <div className='icon'><GoCommentDiscussion size={28} color='white'/></div>
    <Link to='/MessageComments'> Manage Message Posts</Link></li> 
 <li>
    <div className='icon'><BiUserCircle size={27} color='white'/></div>
    <Link to='/AdminUser'> Manage User</Link>
    </li>  
    
    <li onClick={signOut}>
     <div className='icon'><BiLogOutCircle size={28} color='white'/></div>
    <Link >Logout</Link></li> 

    
</ul>
</div>

      
    </div>
  )
}

export default AdminNavbar
