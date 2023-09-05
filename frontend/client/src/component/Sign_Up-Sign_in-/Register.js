import React,{useState} from 'react'
import './Register.css'
import registerImg from '../../img/register-pic.webp'
import { Link , useNavigate} from 'react-router-dom';
import axios from "axios";

const Register = () => {

 const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setError] = useState(null);
  const [emailField, setEmailField] = useState(false);
  const [field, setField] = useState(false);
  const [showMessagename, setShowMessagename] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
     console.log('Input changed:', e.target.name, e.target.value);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


   const handleSubmit = async (e) => {
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
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
      setTimeout(() => {
     setError(null)
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

 

 
 



 
  
 
  

return (
    <div className='register-container'>
      
     <div className='register-container-content'>
            <img src={registerImg}/>
            <h5>Join a community of readers <br/> <span><div>TRACK YOUR BOOKS, RECEIVE RECOMMENDATIONS, AND BROWSE BOOKS CLUB</div></span> </h5>
             
              {err && <h6>{err}</h6>}
              {field && <h6>there is an empty field</h6>}
           
        <div className='register-container-content-form'>
       <div className='check1'><input 
          required
        type='text' placeholder='Your username'  name="username" 
              onChange={handleChange}/>
             
              </div> 
         <input 
           required
         type='email' placeholder='Your Email'  name="email" 
                 onChange={handleChange}/>

                 {emailField && <h6><span>Invalid email</span></h6>}
              
         <div className='check2'><input 
            required
          type='text' placeholder='Your Name'  name="name" 
               onChange={handleChange}/>
                {showMessagename && <p>name should contain only characters.</p>}
               </div> 
        <input 
          required
        type='password' placeholder='Create a password'  name="password" 
                 onChange={handleChange}/>
        </div>

        <button type='submit' onClick={handleSubmit}>SIGN UP</button>

        <p><span>Already have a Bookclubs account?</span><Link to='/login'>Sign in here.Bookclubs</Link>
              is a free platform that helps thousands
            of book clubs worldwide stay organized and connected.</p>



     </div>
    </div>
  )
}

export default Register
