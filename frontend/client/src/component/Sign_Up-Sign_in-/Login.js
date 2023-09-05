import React from 'react'
import './Login.css'
import siginImg from '../../img/sigin-img.webp'
import { Link, useNavigate } from "react-router-dom";
import { useState , useContext} from 'react'
import { AuthContext } from "../../context/authContext";

const Login = () => {

  

const [inputs, setInputs] = useState({
    username: "",
    password: "",
    selectedType:"",
  });
  
 const [err, setError] = useState(null);
  const navigate = useNavigate()
  const { login ,setCurrentUser} = useContext(AuthContext);
   
  const handleChange = (e) => {
     console.log('Input changed:', e.target.name, e.target.value);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  
 

  
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await login(inputs);
    if (response) {
      if (response.user.userType === 'User') {
        navigate('/');
      } else if (response.user.userType === 'Admin') {
        navigate('/AdminHome');
      } else {
        setError("You can't login as an admin.");
      }
      
      // Set currentUser to otherData
      const { otherData } = response.user;
      setCurrentUser(otherData);
    }
  } catch (err) {
    setError(err.response.data);
  }
};

  


 




 

  return (
    <div className='login-container'>
     <div className='login-container-content'>
         <h5>Booksclub member? Log In</h5>
         {err && <h6>{err}</h6>}
          <div className='login-container-content-form'>
        <input type='text' placeholder='Your username' name="username" onChange={handleChange}/>
       <input type='password' placeholder='Password' name="password" onChange={handleChange}/>

<div className='type-list'>
    <select name='selectedType' onChange={handleChange}>
        <option hidden value="---">Select</option>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        </select>
</div>

          </div>

          <button type='submit' onClick={handleSubmit}>LOG IN NOW</button>
      <p><Link to=''></Link></p>
        <div className='signUp'><Link to='/register'><button type='submit'>SIGN UP</button></Link></div>
    </div>

    <div className='img-container'>
      <img src={siginImg} />
    </div>
    </div>
  )
}

export default Login
