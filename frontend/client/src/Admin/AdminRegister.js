import React,{useState,useContext,useEffect} from 'react'
import './AdminRegister.css'
import AdminNavbar from './AdminNavbar'
import { AuthContext } from "../context/authContext";
import { Link , useNavigate} from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {RiDeleteBin5Line} from 'react-icons/ri'
import axios from "axios";


//MakeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/AdminUser",
  withCredentials: true,
});





const AdminRegister = () => {
  const { currentUser} = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [inputs2, setInputs2] = useState({
    usernameEdit: "",
    emailEdit: "",
    passwordEdit: "",
    nameEdit: "",
  });

  const [isPassword,setIsPassword]=useState(true) //superPassword
  const [superPassword,setSuperPassword]=useState("")
  const [superPasswordMessage,setSuperPasswordMessage]=useState(false)
  
  const [isouterPasword,setIsOuterPassword]=useState(false)
  const [outerpassword,setOuterPassword]=useState('')
  const [isdeleted,setIsDeleted]=useState(false)
  const [deletemessage,setDeleteMessage]=useState('')


  const [err, setError] = useState(null);
  const [emailField, setEmailField] = useState(false);
  const [field, setField] = useState(false);
  const [showMessagename, setShowMessagename] = useState(false);
  const [isRegister,setIsRegister]=useState(false)
  const [outerPasswordField,setOuterPasswordField]=useState(false)
  const navigate = useNavigate()



  const handleChange = (e) => {
    // console.log('Input changed:', e.target.name, e.target.value);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [adminInputs, setAdminInputs] = useState({});

 /*const handleChangeEdit = (e, adminId) => {
  const { name, value } = e.target;
  setAdminInputs((prevInputs) => ({
    ...prevInputs,
    [adminId]: {
      ...prevInputs[adminId],
      [name]: value,
    },
  }));
};*/


//handle SuperAdmin Password
const handleSuperUserPassword = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:8800/api/AdminUser/superAdminPass", { superPassword });
    if (response.status === 200) {
      setIsPassword(false);
    }
  } catch (error) {
    console.error("Error:", error.message);
    console.log("Response:", error.response);
    if (error.response && error.response.status === 404) {
      setSuperPasswordMessage(true);
      setTimeout(() => {
        setSuperPasswordMessage(false);
      }, 3000);
      setIsPassword(true); // Keep isPassword as true if the password is invalid
    }
  }
  setSuperPassword("");
};

const registerAdminMutation = useMutation((adminData) =>
  axios.post('http://localhost:8800/api/AdminUser/registerAdmin', adminData)
);
//register Admin

const handleRegister = async (e) => {
   const isEmailValid = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(inputs.email);
    if(isEmailValid && inputs.username  && inputs.email && inputs.name && inputs.password){
       if (/\d/.test(inputs.name)) {
      setShowMessagename(true);
      setTimeout(() => {
        setShowMessagename(false);
      }, 3000);
      return; // Return early if name contains numbers
    }
      
      e.preventDefault();
    try {
     await registerAdminMutation.mutateAsync(inputs);
      setIsRegister(true);
      
      setInputs({
    username: "",
    email: "",
    password: "",
    name: "",
});
 queryClient.invalidateQueries('Admins'); // Invalidate the "Admins" query after successful registration
setTimeout(() => {
    setIsRegister(false);
  }, 3000); 
    } catch (err) {
      setError(err.response.data);
      setTimeout(() => {
     setError('')
    }, 3000);
     
     
    }
  }


  if(!inputs.username  || !inputs.email || !inputs.name || !inputs.password){
    setField(true);
    setTimeout(() => {
     setField(false);
    }, 3000);
  }
  
if(! isEmailValid && inputs.email ){
setEmailField(true);
setTimeout(() => {
     setEmailField(false);
    }, 3000);
}
};

//get Admins

const { isLoading, error, data } = useQuery(["Admins"], () =>
  makeRequest.get(`/AdminMembers`).then((res) => {
    return res.data;
  })
 
);

 

// Update Admin
/*const handleUpdateAdmin = async (adminId) => {
  const updatedAdmin = {};

  // Check if each field in inputs2 has a value and update the corresponding field in updatedAdmin
  if (inputs2.usernameEdit) {
    updatedAdmin.username = inputs2.usernameEdit;
  }
  if (inputs2.emailEdit) {
    updatedAdmin.email = inputs2.emailEdit;
  }
  if (inputs2.nameEdit) {
    updatedAdmin.name = inputs2.nameEdit;
  }
  if (inputs2.passwordEdit) {
    updatedAdmin.password = inputs2.passwordEdit;
  }

  try {
    await axios.put(`http://localhost:8800/api/AdminUser/updateAdmin/${adminId}`, updatedAdmin);
    queryClient.invalidateQueries('Admins'); // Invalidate the query to fetch updated data
  } catch (err) {
    console.error(err);
  }
};*/


 
//delte Admin 
const handleDeleteAdmin = async (adminId) => {
  try {
    await axios.delete(`http://localhost:8800/api/AdminUser/deleteAdmin/${adminId}`);
    queryClient.invalidateQueries("Admins"); // Invalidate the query to fetch updated data
  setIsDeleted(true);
  setTimeout(() => {
     setIsDeleted(false);
    }, 3000);
  
  } catch (error) {
    console.error(error);
  }
};


//change entrence password 

const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
const [passwordChangeError, setPasswordChangeError] = useState(null);

const handleChangeOuterPassword = async () => {
  if(outerpassword===""){
      setOuterPasswordField(true);
      setTimeout(() => {
     setOuterPasswordField(false)
    }, 3000);
    return;
    }
  
  
  try {
    const response = await axios.put("http://localhost:8800/api/AdminUser/changeOuterPassword", { password: outerpassword });
    
  if (response.status === 200) {
      setPasswordChangeSuccess(true);
      setTimeout(() => {
      setPasswordChangeSuccess(false);
      setIsOuterPassword(false);
    }, 3000);
      setPasswordChangeError(null);
      setOuterPassword(""); // Clear the outerpassword field after successful password change
    }
  } catch (error) {
    console.error("Error:", error.message);
    console.log("Response:", error.response);
    if (error.response && error.response.status === 400) {
      setPasswordChangeSuccess(false);
      setPasswordChangeError(error.response.data);
    }
  }
};




  return (
    <div className='main-register-conatner'>
      <div className='nav-admin'>
          <AdminNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     


    <div className='registerAdmin-content'>
       <div className='registerAdmin-content-title'>
       <h4>Create Admin User</h4>
       </div>

       

{isPassword?<div className='enter-password'>
  
  <p>Only Super Admin Can Control This Page</p>
  <div className='enter-password-input'>
    <input type='password' placeholder='Enter Password' value={superPassword} onChange={(e)=>setSuperPassword(e.target.value)} />
  <button type='submit' onClick={handleSuperUserPassword}>Enter</button>
  </div>
  
  {superPasswordMessage && <h5>Invalid Password</h5>}
  </div>:
  <div>
  <div className='register-boxes'>

    {isRegister && <h5>Admin has been created</h5>}
      {err && <h6>{err}</h6>}
      {field && <h6>there is an empty field</h6>}
    <label>Username</label>
   <input type='text' placeholder='Your username'  name="username" value={inputs.username} onChange={handleChange}/>
    {emailField && <h6>Invalid email</h6>}
    <label>Email</label>
    <input type='email' placeholder='Your Email'  name="email" value={inputs.email}  onChange={handleChange}/>
    {showMessagename && <p>name should contain only characters.</p>}
  <label>Name</label>
  <input type='text' placeholder='Your Name'  name="name"  value={inputs.name} onChange={handleChange}/>
    
    <label>Password</label>
    <input type='password' placeholder='Create a password'  name="password"  value={inputs.password} onChange={handleChange}/>

    <button type='submit' onClick={handleRegister}>Save Admin</button>



</div>

{isdeleted && <div className='delte-message'><p>Admin has been Deleted</p></div>}

{/*<div className='admin-titles'>
  <p>username</p>
  <p>email</p>
  <p>name</p>
  <p>password</p>
  </div>*/}
{/*fetch admins */}
{isLoading ? (
  <p>Loading...</p>
) : (
  
<div className='admin-List'>
  
    <table>
      <thead>
        <tr>
          <th>S.N.</th>
          <th>username</th>
          <th>email</th>
          <th>name</th>
         {/*<th>password</th>*/}
           <th>Action</th>
        </tr>
      </thead>
      <tbody>
       {data && data.map((admin,index) => {
    if (admin.username === currentUser.username) {
      return null; // Skip rendering inputs for the current user
    }
return (
    <tr key={admin.id}>
  <td>{index + 1}</td>
  <td>{admin.username}</td>
  <td>{admin.email}</td>
  <td>{admin.name}</td>
  {/*<td>{admin.password}</td>*/}
  <td>
    <RiDeleteBin5Line size={25}  onClick={() => handleDeleteAdmin(admin.id)} color='red'/>
  </td>
  {/* <button type='submit' onClick={() => handleUpdateAdmin(admin.id)}>Edit</button> */}
</tr>

);
  })}
      </tbody>
    </table>
  
</div>
)}

<div className='button-password'>
  <button onClick={()=>setIsOuterPassword(!isouterPasword)}>Change The entrence Password</button>
</div>
{isouterPasword && (
  <div className='changeOuterPassword'>
    <input
      type='password'
      placeholder='Enter a new password'
      value={outerpassword}
      onChange={(e) => setOuterPassword(e.target.value)}
    />
    <button onClick={handleChangeOuterPassword}>Change</button>
    {passwordChangeSuccess && <p>Password has been changed successfully.</p>}
    {outerPasswordField && <p><span>password field is empty</span></p>}
    {passwordChangeError && <p>Error: {passwordChangeError}</p>}
  </div>
)}


</div>




}











      </div>
      
    </div>
  )
}

export default AdminRegister
