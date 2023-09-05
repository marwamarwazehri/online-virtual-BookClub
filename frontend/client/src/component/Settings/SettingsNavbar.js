import React ,{ useState, useContext, useEffect }from 'react'
import './SettingsNavbar.css'
import { AuthContext } from "../../context/authContext";
import profile from '../../img/square-profile.png'
import { Link, useNavigate } from "react-router-dom";
import {MdDelete,MdOutlineCancel} from 'react-icons/md';
import {IoMdCamera} from 'react-icons/io';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';


//makeRequest settingss
const makeRequestSettings = axios.create({
  baseURL: "http://localhost:8800/api/SettingsUser",
  withCredentials: true,
});



const SettingsNavbar = () => {

const { currentUser , setCurrentUser ,logout} = useContext(AuthContext);
const queryClient = useQueryClient();
const navigate = useNavigate();
const [file, setFile] = useState(null);
const [deleteaccount,setDeleteAcount]=useState(false);

useEffect(()=>{
  console.log(currentUser);
})


//Upload Image
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);// 3m zeed 3ala formData lfile 
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      return res.data; /*bada tredele limgeurl eno limage name  */
    } catch (err) {
      console.log(err);
    }
  };



  //edit profile
const handleSave = async () => {
  const imgUrl = await upload();
  
  const updatedMessage = { img: file ? imgUrl : "", userId: currentUser.id };

  try {
    await makeRequestSettings.put(`/Userprofile/${currentUser.id}`, updatedMessage);
    setFile(null);
    // Update the currentUser object with the new profile image
    const updatedUser = { ...currentUser, profile: imgUrl };
    setCurrentUser(updatedUser); // Assuming there's a setCurrentUser function in the AuthContext

  } catch (error) {
    console.error("Error updating profile:", error.message); // Log the error message
    console.error("Axios error details:", error.response); // Log the Axios error response
  }
};

//update profile to null(delte profile)

const handleDelete = async () => {
 try {
    await makeRequestSettings.put(`/deletprofile/${currentUser.id}`);
  // Update the currentUser object with the new profile image
    const updatedUser = { ...currentUser, profile: null };
    setCurrentUser(updatedUser); // Assuming there's a setCurrentUser function in the AuthContext

  } catch (error) {
    console.error("Error updating profile:", error.message); // Log the error message
    console.error("Axios error details:", error.response); // Log the Axios error response
  }
};


//delete account
const handleDeleteAccount = async () => {
  try {
    await makeRequestSettings.delete(`/deletaccount/${currentUser.id}`);
    logout();
    navigate('/login');

  } catch (error) {
    console.error("Error deleting account:", error.message);
    console.error("Axios error details:", error.response);
  }
};



const [imagePreview, setImagePreview] = useState(null);
 // Update image preview when a new file is selected
  useEffect(() => {
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }, [file]);

const [zoom, setZoom] = useState(100);// hyde  5asa be zoom line 


  return (
   <div className='left-navbar-settings'>

 <div className='left-image-settings'>
{currentUser && currentUser.profile ? (
          <img src={`../upload/${currentUser.profile}`} alt="Profile" />
        ) : (
          <img src={profile} alt="Default Profile" />
        )}
<div className='small-title-settings'><p>{currentUser && currentUser.name ? (
              <span>{currentUser.name}</span>
            ) : (
              <span>No User</span>
            )}</p></div>
 </div>

 <div className='camera-upload'>
  <input
    type="file"
    id="file"
    style={{ display: "none" }}
    onChange={(e) => setFile(e.target.files[0])}
    /> 
   <label htmlFor="file"> <IoMdCamera size={24} color='rgb(39, 38, 38)'/>
   </label>        
 
 </div>

 {file && (
  <div className='save-profile'>
    <div className='save-profile-inner'>
      <div className='cancel-img-settings' onClick={() => setFile(null)}>
        <MdOutlineCancel size={37} color='rgb(29, 29, 29)' />
      </div>
     <div className='fake-image-settings'>
      <img className="file-settings" alt="" src={imagePreview} style={{ transform: `scale(${zoom / 100})` }} />
      </div>
      <div className='save-userProfile'>
       <div> <label>ZOOM:</label>
         <input
        type="range"
        min="50"
        max="200"
        value={zoom}
        onChange={(e) => setZoom(e.target.value)}
        className="zoom-range"
      />
      </div>
        <button onClick={handleSave}>SAVE</button>
       
      </div>
    </div>
  </div>
)}

 
 {currentUser && currentUser.profile && (
  <div className='remove-profile'>
    <p>Profile Photo</p>
    <MdDelete size={25} color='rgb(39, 38, 38)' onClick={handleDelete}/>
  </div>
)}
 

<div className='Left-links-settings'>
<ul>
 <li><Link to='/EditProfile'>Edit Profile</Link></li> 
 
 <li><Link to='/ChangePassword'>Change Password</Link></li>  
 
 <li><Link onClick={()=>setDeleteAcount(true)}>Delete My Account</Link></li> 
 
 <li><Link to='/' onClickCapture={logout}>Sign Out</Link></li> 
 </ul>
</div>

<div className='show-result'>
  <h5>ADDRESS</h5>
  <p>{currentUser.address}</p>
 
  <h5>PHONE</h5>
   <p>{currentUser.phone}</p>
 
  <h5>EMAIL</h5>
   <p>{currentUser.email}</p>
  
  
</div>


{deleteaccount && 
<div className='delete-acount'>
  <div className='delete-acount-content'>
    {/*<div className='delete-acount-cancelIcon' onClick={()=>setDeleteAcount(false)}><MdOutlineCancel size={35} color='rgb(146, 142, 142)'/></div>*/}
    <h5>Confirm Submission</h5>
    <p>Are you sure you want to delete this account?<br/> This action is irreversible</p>
    <div className='delete-acount-content-buttons'>
      <div className='cancel-account'><button onClick={()=>setDeleteAcount(false)}>CANCEL</button></div>
      <div className='delete-account'><button onClick={handleDeleteAccount}>DELETE</button></div>
    </div>


  </div>
  
  
  </div>}



</div>
  )
}

export default SettingsNavbar
