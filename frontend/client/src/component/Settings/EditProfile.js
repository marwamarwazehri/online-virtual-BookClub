import React,{ useState, useContext, useEffect } from 'react'
import './EditProfile.css'
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

const EditProfile = () => {

const { currentUser , setCurrentUser} = useContext(AuthContext);

const queryClient = useQueryClient();

  const [username, setUserName] = useState(currentUser?.username || "");
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");

const [updateMessage,setUpdateMessage]=useState('');
const [update,setUpdate]=useState(false);
 const [showMessagename, setShowMessagename] = useState(false);
 const [showfieldusername, setShowFieldUserName] = useState(false);
 const [showfieldname, setShowFieldName] = useState(false);
 const [showfieldemail, setShowFieldEmail] = useState(false);
 const [showInvalidEmail, setShowInvalidEmail] = useState(false);

 const [showusernameexist,setShowUsernameExist]=useState(false);
 const [showemailexist,setShowEmailExist]=useState(false);
 



//edit username,name,address,phone,email
const handleUpdate = async () => {
  let errorEncountered = false; // Variable to track errors
  
  const containsNumbers = /\d/.test(name);
  if (containsNumbers) {
    setShowMessagename(true);
    setTimeout(() => {
      setShowMessagename(false);
    }, 4000);
    errorEncountered = true; // Set error flag
  }
  
  if (!username) {
    setShowFieldUserName(true);
    setTimeout(() => {
      setShowFieldUserName(false);
    }, 4000);
    errorEncountered = true; // Set error flag
  }
  
  if (!name) {
    setShowFieldName(true);
    setTimeout(() => {
      setShowFieldName(false);
    }, 4000);
    errorEncountered = true; // Set error flag
  }
  
  if (!email) {
    setShowFieldEmail(true);
    setTimeout(() => {
      setShowFieldEmail(false);
    }, 4000);
    errorEncountered = true; // Set error flag
  }

   const isEmailValid = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(email);
    if (!isEmailValid && email) {
      setShowInvalidEmail(true);
      setTimeout(() => {
        setShowInvalidEmail(false);
      }, 4000);
      errorEncountered = true
    }


  
  if (errorEncountered) {
    return; // Exit the function if any errors occurred
  }
  
  const updatedMessage = {
    username,
    name,
    address,
    phone,
    email,
    userId: currentUser.id,
  };
  
  
    try {
      const response = await makeRequestSettings.put(`/updateSettings/${currentUser.id}`, updatedMessage);

      if (response.status === 200) {
        // Update the currentUser object with the new profile information
        const updatedUser = {
          ...currentUser,
          username,
          name,
          address,
          phone,
          email,
        };
        setCurrentUser(updatedUser); // Assuming there's a setCurrentUser function in the AuthContext
        setUpdateMessage("Profile settings updated successfully");
        setUpdate(true);
        setTimeout(() => {
          setUpdate(false);
        }, 3000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "A member with this username already exists") {
          setShowUsernameExist(true);
        } else if (errorMessage === "A member with this email already exists") {
          setShowEmailExist(true);
        }
        setTimeout(() => {
          setShowUsernameExist(false);
          setShowEmailExist(false);
        }, 4000);
      } else {
        console.error("Error updating settings:", error.message); // Log the error message
        console.error("Axios error details:", error.response); // Log the Axios error response
      }
    }
};


 
 // Function to reset all inputs to their initial values
  const resetInputs = () => {
    setUserName(currentUser.username ? currentUser.username : '');
    setName(currentUser.name ? currentUser.name : '');
    setEmail(currentUser.email ? currentUser.email : '');
    setAddress(currentUser.address ? currentUser.address : '');
    setPhone(currentUser.phone ? currentUser.phone : '');
  };
 

  // Function to handle phone input change and allow only numbers
  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    const formattedPhone = inputPhone.replace(/\D/g, ''); // Remove non-numeric characters
    setPhone(formattedPhone);
  };
 
if (!currentUser) {
    // Render a loading state or return null if the currentUser is not available
    return null;
  }
 
    return (
    <div className='main-editProfile-container'>
      <div className='nav-editProfile'>
          <SettingsNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     


    <div className='editProfile-content'>
    
    <div className='editProfile-icon'>
        <IoMdSettings  size={27} color='rgb(51, 50, 50)'/>
        <p>PROFILE SETTINGS</p>
    </div>

<div className='editProfile-update'>
    <h5>Edit Profile</h5>
   
    <div className='editProfile-update-input'>
    <div className='style-msseg'>
      {showfieldusername && <p>username should not be empty.</p>}
      {showusernameexist && <p>Member with this username already exists.</p>}
      </div>

    <input type='text'  placeholder='username' value={username} onChange={(e)=>setUserName(e.target.value)}/>
    <div className='style-msseg'>{showMessagename && <p>name should contain only characters.</p>}</div> 
     <div className='style-msseg'>{showfieldname && <p>name should not be empty.</p>}</div>
    <input type='text'  placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/>
     <input type='text'  placeholder='address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
    <input type='text'  placeholder='phone' value={phone} onChange={handlePhoneChange}/>
     <div className='style-msseg'>
      {showfieldemail && <p>email should not be empty.</p>}
      {showemailexist && <p>Member with this email already exists.</p>}
      </div>
       <div className='style-msseg'>{showInvalidEmail && <p>Invalid Email.</p>}</div>
    <input type='email'  placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
    
    </div>
 <div className='update-messg'>{update && <p>{updateMessage}</p>}</div>
<div className='editProfile-update-buttons'>

    <div className='editProfile-cancel'><button onClick={resetInputs}>CANCEL</button></div>
     <div className='editProfile-change'><button onClick={handleUpdate}>UPDATE</button></div>
</div>
</div>

       
      </div>
      
    </div>
  )
}

export default EditProfile
