import React, { useEffect } from 'react'
import './Messages.css'
import LeftNavbar from '../LeftNavbar'
import { useState,useContext } from 'react'
import { AuthContext } from "../../../../context/authContext";
import {MdOutlineCameraAlt,MdOutlineCancel} from 'react-icons/md'
import {RxFace} from 'react-icons/rx'
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import MessageItem from './MessageItem'
import { Link, useNavigate } from "react-router-dom";





//makeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/Messages",
  withCredentials: true,
});

const Messages = () => {

const [newMessage,setNewMessage]=useState(false);
const { currentUser } = useContext(AuthContext);
 const queryClient = useQueryClient();
  const navigate = useNavigate();


const[message,setMessage]=useState('');
const [file, setFile] = useState(null);




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

  //get messages
  const { isLoading, error, data } = useQuery(["messages"], () =>
  makeRequest.get(`/messages`).then((res) => {
    return res.data;
    
  })
);

//post message
  const mutation = useMutation(
    (newMessage) => {
      return makeRequest.post("/insertmessages", newMessage);
    },
    {
      onSuccess: () => {
  queryClient.invalidateQueries(["messages"]);
      },
    }
  );

//add Message

const handleClick = async (e) => {
    e.preventDefault();
     const imgUrl = await upload();

    mutation.mutate({ message, img: file ? imgUrl : "",userId:currentUser.id });
    setMessage("");
    setFile(null);
    setNewMessage(false);
  };

 //handle Cancle
 const handleCancle=(()=>{
  setNewMessage(false);
  setMessage('');
  setFile('');
 }) 

 //control cancel button
 const cancelButton=(()=>{
  setNewMessage(!newMessage);
  handleCancle();
 })


 const handleCreateMessage=(()=>{
  if(currentUser.ban==="false"){
    navigate('/BandUser');
    }else{
      setNewMessage(!newMessage);
    }
 })


return (
    <div className='main-messages-conatner'>
      <div className='nav-messages'>
          <LeftNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     


    <div className='messages-content'>
      
       <div className='messages-content-title'>
        <p>Messages</p>
          <div className='newMessage'>
       {newMessage?<div className='can-messg'><button onClick={cancelButton} >CANCEL</button></div>:<div className='set-message'><button onClick={handleCreateMessage} >POST A NEW MESSAGE</button></div>}
       </div>

        </div>
       
    

{newMessage && <div className='message-box'>
   
    <div className='message-box-content'>
    
    
    {file && (<div className='fake-image-message'>
          <img className="file-message" alt="" src={URL.createObjectURL(file)} />
          <div className='cancel-img' onClick={()=>setFile(null)}><MdOutlineCancel size={30} color='rgb(211, 208, 208)'/></div>

              </div> 
            )} 

<div className='inputandimage'>
<input type='text' placeholder='Write a new message' 
value={message} onChange={(e)=>setMessage(e.target.value)}

/>

<div className='face-camera'>
    <div className='smile'><RxFace size={27} color='rgb(161, 159, 159)'/></div>

    <div className='upload-content-message'>
  <input
    type="file"
    id="file1"
    style={{ display: "none" }}
    onChange={(e) => setFile(e.target.files[0])}
    />         
   <label htmlFor="file1">
         <div className="item-message">
         <MdOutlineCameraAlt size={27} color='rgb(161, 159, 159)'/>
           </div>
            </label>   
     </div>  

</div>

    </div> 
    </div>

    <div className='Post-button'>
        <button onClick={handleClick}>POST</button>
    </div>






    </div>}

{/*fetch messages */}
<div className='fetch-messages'>
        {error
        ? "Something went wrong"
        : isLoading
        ? "loading":data && data.length > 0 ?
        data.map((message)=>{
            return <div className='message-content'>
                <MessageItem message={message}/>
            </div>

            })
       :<div className='no-msseg-posts'><p>No Messages Posts</p></div> }


      </div>
      
      
      
      </div>
      
    
    
    
    
    </div>
  )
}

export default Messages
