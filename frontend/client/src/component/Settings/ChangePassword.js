import React,{ useState, useContext, useEffect } from 'react'
import './ChangePassword.css'
import SettingsNavbar from './SettingsNavbar'
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {IoMdSettings} from 'react-icons/io';
import axios from 'axios';


//makeRequest settings
const makeRequestSettings = axios.create({
  baseURL: "http://localhost:8800/api/SettingsUser",
  withCredentials: true,
});

const ChangePassword = () => {


const { currentUser , setCurrentUser} = useContext(AuthContext);
const queryClient = useQueryClient();
const [currentpassword,setCurrentPassword]=useState('');
const [newpassword,setNewPassword]=useState('');
const [confirmpassword,setConfirmPassword]=useState('')
 const [showmessageError,setShowMessageError] =useState(false)
 const [update,setUpdate]=useState(false);
 const [ShowErrorMessage,setShowErrorMessage] =useState(false)
 const  [showfield,setShowField]=useState(false)



//updatePassword
const handleUpdate = async () => {

if(!currentpassword || !newpassword || !confirmpassword){
    setShowField(true);
    setTimeout(() => {
      setShowField(false);
    }, 4000);
    return;
}


  if (confirmpassword !== newpassword) {
    setShowMessageError(true);
    setTimeout(() => {
      setShowMessageError(false);
    }, 4000);
    return;
  }

  const updatedMessage = {
    newpassword,
    userId: currentUser.id,
    currentpassword,
  };

  try {
    const response = await makeRequestSettings.put(`/updateUserPassword/${currentUser.id}`, updatedMessage);

    if (response.status === 200) {
      setUpdate(true);
      setTimeout(() => {
        setUpdate(false);
      }, 3000);
    } else {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 4000);
    }
  } catch (error) {
    console.error("Error updating settings:", error.message); // Log the error message
    console.error("Axios error details:", error.response); // Log the Axios error response
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 4000);
  }
};




const handleCancle=(()=>{
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
})



return (
     <div className='main-changepassword-conatner'>
      <div className='nav-changepassword'>
          <SettingsNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     
 <div className='main-changepassword-content'>
      
 <div className='changepassword-icon'>
        <IoMdSettings  size={27} color='rgb(51, 50, 50)'/>
        <p>CHANGE PASSWORD</p>
    </div>


<div className='changepassword-update'>
    <h5>Change Password</h5>
   
   {ShowErrorMessage && <div className='field'><p>Could not update your password. Invalid current password.</p></div>}
    {showfield && <div className='field'><p>there is an empty field.</p></div>}
    <div className='changepassword-update-input'>
    <input type='password'  placeholder='Current password' value={currentpassword} onChange={(e)=>setCurrentPassword(e.target.value)}/>
    <input type='password'  placeholder='New password' value={newpassword} onChange={(e)=>setNewPassword(e.target.value)}/>
    {showmessageError && <div className='unconfirm'><p>New password and Confirm password fields didn't match.</p></div>}
    <input type='password'  placeholder='Confirm password' value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
     
    </div>
 {update && <div className='sucsses'><p>Password updated successfully</p></div>}
<div className='editProfile-update-buttons'>

    <div className='editProfile-cancel'><button onClick={handleCancle} >CANCEL</button></div>
     <div className='editProfile-change'><button onClick={handleUpdate}>UPDATE</button></div>
</div>
</div>


      </div>
      
    </div>
  )
}

export default ChangePassword
