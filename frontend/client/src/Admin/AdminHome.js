import React ,{useState,useContext} from 'react'
import './AdminHome.css'
import { AuthContext } from "../context/authContext";
import AdminNavbar from './AdminNavbar'
import adminIcon from '../img/adminicon.jpg'




const AdminHome = () => {

    const { currentUser } = useContext(AuthContext);
  return (
   <div className='main-adminhome-conatner'>
      <div className='nav-adminhome'>
          <AdminNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     


    <div className='adminhome-content'>
    <div className='admin-icon'>
          <p>Hello Admin</p>
        <img src={adminIcon} alt='admin'/>
      
    </div>

    <div className='welcome'>
        <p>WELCOME {currentUser.name}</p>
    </div>
     

     <div className='list-do'>
        <p>Admin can:</p>
        
        <ol>
            <li>Manage Admin acount</li>
             <li>Manage Category</li>
             <li>Manage User</li>
            <li>Manage BookPosts</li>
             <li>Manage BookReviews</li>
             <li>Manage Messages</li>
              <li>Manage Comments</li>
               <li>Manage Replies</li>
</ol>
     </div>
      </div>
     
    </div>
  )
}

export default AdminHome
