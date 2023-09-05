import React,{useState,useEffect} from 'react'
import './AdminUser.css'
import AdminNavbar from './AdminNavbar'
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {ImSearch} from 'react-icons/im'
import {FaUserAltSlash,FaUser} from 'react-icons/fa'
import profile from '../img/profile.jpg';

import axios from 'axios'



//MakeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/auth",
  withCredentials: true,
});


const AdminUser = () => {

const queryClient = useQueryClient();
const [search,setSearch]=useState('');
 const [results, setResults] = useState([]);

//get number of members joining the group
const { isLoading, error, data } = useQuery(["ban"], () =>
  makeRequest.get(`/UserNumberMembers`).then((res) => {
    return res.data;
  })
 
);

//Search bt name and writer
  const handleQueryChange = (e) => {
  const search = e.target.value;
  setSearch(search);

  const filteredUsers = data.filter((user) =>
    user.id.toString().toLowerCase().includes(search.toLowerCase())  //hwlna id la string
  );
  setResults(filteredUsers);
};



 /* const handleUpdateBanStatus = async (userId, status) => {
  try {
    const response = await makeRequest.put(`/updateBanStatus/${userId}`, { status });
    const { message } = response.data;

    if (status === "true") {
      alert(`${message}`);
    } else {
      alert(`${message}`);
    }

    queryClient.invalidateQueries(["ban", userId]);
  } catch (error) {
    console.error("Error updating ban status:", error);
  }
};
*/


const handleUpdateBanStatus = async (userId, status) => {
  try {
    const response = await makeRequest.put(`/updateBanStatus/${userId}`, { status });
    const { message } = response.data;

    if (status === "true") {
      alert(`${message}`);
    } else {
      alert(`${message}`);
    }

    // Update the data state
    const updatedData = data.map((user) =>
      user.id === userId ? { ...user, ban: status } : user
    );
    queryClient.setQueryData(["ban"], updatedData);

    // Update the results state if it exists
    if (results.length > 0) {
      const updatedResults = results.map((user) =>
        user.id === userId ? { ...user, ban: status } : user
      );
      setResults(updatedResults);
    }
  } catch (error) {
    console.error("Error updating ban status:", error);
  }
};


  return (
    <div className='main-adminuser-conatner'>
         <div className='nav-adminuser'>
          <AdminNavbar/>
      </div>
   {/* ////////////////////////////////////////////////////////////////////////////// */}     


    <div className='adminuser-content'>

    <div className='adminuser-content-title'><p>Ban Users</p></div>
 {/*SEARCH*/}
       <div className='searchname2  pos-user'>
      <div className='form'>
        <form>
          <ImSearch size={27} color='rgb(58, 58, 58)'/>
          <input type='text' placeholder='SEARCH USER BY ID' className='searchText2' value={search} onChange={handleQueryChange}></input>
         {/*<input type='submit' value='SEARCH' className='button'/>*/}
        </form>
       </div>
      </div>


{isLoading ? (
  <p>Loading...</p>
) : (
  
<div className='Book-List'>
  
    <table>
      <thead>
        <tr>
    <th>S.N.</th>
    <th>UserId</th>
    <th>Profile</th>
    <th>UserName</th>
    <th>Name</th>
    <th>Address</th>
    <th>Phone</th>
    <th>Email</th>
     <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {search.toLowerCase()===''?data.map((user,index)=>{
        
          return  <tr key={user.id}>
        <td>{index + 1}</td>
        <td>{user.id}</td>
       <td  className='tied-img'>{user.profile?<img src={`../upload/${user.profile}`} alt='Img'/>:<img src={profile} alt='Img'/>}</td>
       <td>{user.username}</td>
       <td>{user.name}</td>
       <td>{user.address?user.address:"no address"}</td>
       <td>{user.phone?user.phone:"no phone"}</td>
        <td>{user.email}</td>
       {user.ban==="true"?<td className='adminuser-hover'><FaUser size={27} color='green' onClick={() =>handleUpdateBanStatus(user.id, "false")}/></td>:
       <td className='adminuser-hover'><FaUserAltSlash size={27} color='red' onClick={() =>handleUpdateBanStatus(user.id, "true")}/></td>
       }
       </tr>
}):results.length>0?results.map((user,index)=>{
        return  <tr key={user.id}>
        <td>{index + 1}</td>
        <td>{user.id}</td>
       <td  className='tied-img'>{user.profile?<img src={`../upload/${user.profile}`} alt='Img'/>:<img src={profile} alt='Img'/>}</td>
       <td>{user.username}</td>
       <td>{user.name}</td>
       <td>{user.address?user.address:"no address"}</td>
       <td>{user.phone?user.phone:"no phone"}</td>
        <td>{user.email}</td>
       {user.ban==="true"?<td className='adminuser-hover'><FaUser size={27} color='green' onClick={() =>handleUpdateBanStatus(user.id, "false")}/></td>:
       <td className='adminuser-hover'><FaUserAltSlash size={27} color='red' onClick={() =>handleUpdateBanStatus(user.id, "true")}/></td>
       }
       </tr>
         
          }):<div className='nomatch2'>No Matching User ID</div>}
      </tbody>
    </table>
  
</div>
)}

    </div>
      
    </div>
  )
}

export default AdminUser
