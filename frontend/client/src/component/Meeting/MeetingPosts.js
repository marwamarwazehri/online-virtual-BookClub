import React,{useState,useContext,useEffect} from 'react'
import './MeetingPosts.css'
import LeftNavbar from '../Club/controlBooks/LeftNavbar'
import {MdAddCircle, MdThumbDownOffAlt} from 'react-icons/md'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import moment from "moment";
import profile from '../../img/profile.jpg';
import {BiLink} from 'react-icons/bi'
import {HiUserGroup} from 'react-icons/hi'
import {RiArrowDropDownLine} from 'react-icons/ri'
import  clock from '../../img/clock.webp'



//MakeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/Meetings",
  withCredentials: true,
});

const MeetingPosts = () => {

const { currentUser } = useContext(AuthContext);
const queryClient = useQueryClient();
const [upcommingmeetingList,setUpcommingMeetingList]=useState([]);
const [pastmeetingList,setPastMeetingList]=useState([]);
const [selectRSVPMap, setSelectRSVPMap] = useState(
    JSON.parse(localStorage.getItem('selectRSVPMap')) || {}
  ); // Separate RSVP state for each meeting post
const navigate = useNavigate();
const [showattendinglist,setShowAttendingList]=useState(false);
const [attendingList,setAttendingList]=useState([]);
const [attendingMembersCount, setAttendingMembersCount] = useState(0);



//get upcomming meetings l8yta
  /*const { isLoading, error, data } = useQuery(["meetings"], () =>
  /*makeRequest.get(`/upcommingmeetings`).then((res) => {
    const reviewData = res.data;
      setUpcommingMeetingList(res.data);
    return res.data;
    
  })
);*/


//get past meetings la8ayta
 /* const { isLoading: isLoading2, error: error2, data: data2 } = useQuery(["meetings"], () =>
  makeRequest.get(`/pastmeetings`).then((res) => {
    const reviewData = res.data;
      setPastMeetingList(res.data);
       console.log(pastmeetingList);
    return res.data;
    
  })
);*/


// Fetch upcoming and past meetings
const {
  isLoading,
  error,
  data: { upcomingMeetings, pastMeetings } = {},
} = useQuery(["meetings"], () =>
  makeRequest.get(`/meetings`).then((res) => {
    const currentDate = new Date();
    
    const filteredUpcomingMeetings = res.data.upcomingMeetings.filter((meeting) => {
      const meetingDate = new Date(meeting.meetingDate);
      return meetingDate > currentDate;
    });
    
    const filteredPastMeetings = res.data.pastMeetings.filter((meeting) => {
      const meetingDate = new Date(meeting.meetingDate);
      return meetingDate < currentDate;
    });

    return {
      upcomingMeetings: filteredUpcomingMeetings,
      pastMeetings: filteredPastMeetings,
    };
  })
);


// Set the state with the fetched data
useEffect(() => {
  if (upcomingMeetings) {
    setUpcommingMeetingList(upcomingMeetings);
  }
  if (pastMeetings) {
    setPastMeetingList(pastMeetings);
  }
}, [upcomingMeetings, pastMeetings]);







// Get all attending for a specific meeting
const getAttendingForMeeting = async (meetingId) => {
  try {
    const res = await makeRequest.get(`/allattending/${meetingId}`);
    const attendingData = res.data;
    setAttendingList(attendingData);
  } catch (error) {
    console.error('Error getting attending data:', error);
  }
};

const [attendingyeslist,setAttendingYesList]=useState([]);
// Get all attending for a specific meeting that are Yes
const getAttendingForMeetingYes = async (meetingId) => {
  try {
    const res = await makeRequest.get(`/allattendingYes/${meetingId}`);
    const attendingDataYes = res.data;
    setAttendingYesList(attendingDataYes);
  } catch (error) {
    console.error('Error getting attending data:', error);
  }
};



//Attending edit or insert

  // Function to check if the current user is attending the meeting
  const isUserAttending = (userId, meetingId) => {
    const existingAttendee = attendingList.find(
      (attendee) => attendee.userId === userId && attendee.meetingId === meetingId
    );
    return !!existingAttendee; // Returns true if the attendee exists, false otherwise
  };

  // Function to handle the RSVP selection
  const handleRSVP = async (meetingId, attendingStatus) => {
  if (!currentUser) {
    // User is not logged in, handle as desired
    return;
  }

  const updatedRSVPMap = {
    ...selectRSVPMap,
    [meetingId]: attendingStatus,
  };

  setSelectRSVPMap(updatedRSVPMap);
  localStorage.setItem('selectRSVPMap', JSON.stringify(updatedRSVPMap));

  if (isUserAttending(currentUser.id, meetingId)) {
    // Update the attending status for an existing attendee
    await makeRequest.put(`/editattending/${currentUser.id}/${meetingId}`, {
      userId: currentUser.id,
      meetingId,
      attendingStatus,
    });
  } else {
    // Add a new attendee with attending status
    await makeRequest.post('/addattending', {
      userId: currentUser.id,
      meetingId,
      attendingStatus,
    });
  }
 // Fetch the updated attending list
  await getAttendingForMeeting(meetingId);
  // Refetch the attending list after making changes
  queryClient.invalidateQueries('attending');
};



//delete attending

  // Mutation function for deleting an attendee
  const deleteAttendeeMutation = useMutation(
    (meetingId) => makeRequest.delete(`/deleteAttending/${currentUser.id}/${meetingId}`),
    {
      onSuccess: () => {
        // Invalidate the attending query to trigger automatic refetch
        queryClient.invalidateQueries('attending');
      },
      onError: (error) => {
        console.error('Error deleting attending:', error);
      },
    }
  );

  //...

  
  // Function to handle deleting an attendee
const handleDelete = async (meetingId) => {
  await deleteAttendeeMutation.mutate(meetingId);
// Remove the selected attending from local storage
  const updatedRSVPMap = { ...selectRSVPMap };
  delete updatedRSVPMap[meetingId];
  setSelectRSVPMap(updatedRSVPMap);
  localStorage.setItem('selectRSVPMap', JSON.stringify(updatedRSVPMap));

  // Refresh the page
  window.location.reload();
};




 







const handleCreateMeeting=(()=>{
  if(currentUser.ban==="false"){
    navigate("/BandUser");
  }else{
    navigate("/EditPostMeeting");
  }
})



  return (
    <div className='main-meeting-conatner'>
      <div className='nav-meeting'>
          <LeftNavbar/>
      </div>
  {/* ////////////////////////////////////////////////////////////////////////////// */}     

<div className='meeting-content'>
       
 {/*upcomming meetings*/} 
<div className='fetching-upcommingmeetings'>

<div className='fetching-upcommingmeetings-number'>
  <p>UPCOMING MEETING(S) <span>{upcommingmeetingList?.length} {upcommingmeetingList?.length === 1 ? "meeting" : "meetings"}</span></p>
  <div className='meeting-content-create-meeting'>
          <i><MdAddCircle size={27} color='black' onClick={handleCreateMeeting}/></i> 
        <p>CREATE NEW MEETING</p>

       </div>

</div>
{ upcommingmeetingList.length>0?upcommingmeetingList.map((meeting)=>{
  
  return <div className='details-met-user'>
    <div className='user-meeting'>
      <div className='user-meeting-profile'> 
       {!meeting.userProfile?<img src={profile} /> :<img src={`../upload/${meeting.userProfile}`} />}
      </div>
      <div className='user-meeting-name-date'>
        <h5>{meeting.userName}</h5>
        <p>{moment(meeting.createdAt).format("dddd MMM DD, YYYY hh:mm A")}</p>
      </div>
      {currentUser?.id===meeting.userId && <Link to={`/EditPostMeeting?edit=2`} state={meeting}><button className="edit-edit">EDIT</button></Link>}
    </div>


<div className='details-met-meeting'>
  <div className='details-met-meeting-left'>
   <Link to={`/BookDetails/${meeting.IdBook}`}><img src={`../upload/${meeting.bookImage}`}/></Link>
  </div>

<div className='details-met-meeting-right'>
<div className='book-met'><h5>{meeting. bookName}</h5></div>
<div className='met-by'><p>by {meeting.bookAuthor}</p></div>
<div className='meet-date'><p>{moment(meeting.meetingDate).format("dddd MMM DD, YYYY hh:mm A")}</p></div>
<div className='meet-duration'><p>Meeting Duration {meeting.meetingduration}</p> </div>
<div className='meet-link'>
<BiLink size={26} color='rgb(97, 96, 96)'/>
<p>{meeting.meetingLink}</p>
</div>
{meeting.meetingnote && <div className='meet-note'>
  <p> <span>Notes:</span> {meeting.meetingnote}</p>
  </div>}


{/*attending */}
<div className='attending-met'>
  <div className='attending-met-pepole'>
    <HiUserGroup size={30} color='#444343'/>
    <p> people attending</p>
    <RiArrowDropDownLine size={35} 
    color='#4e4e4e'
   onClick={() => {
    getAttendingForMeeting(meeting.id);
    setShowAttendingList(!showattendinglist);
  }}/>

  </div>

  <div className='select-RSVP'>
    <p>My RSVP:</p>
    <select
  value={selectRSVPMap[meeting.id] || ''}
  onChange={(e) => {
    const updatedRSVPMap = {
      ...selectRSVPMap,
      [meeting.id]: e.target.value,
    };
    setSelectRSVPMap(updatedRSVPMap);
    handleRSVP(meeting.id, e.target.value);
  }}
>
  <option hidden value=''>
    -----
  </option>
  <option value='Yes'>Yes</option>
  <option value='No'>No</option>
  <option value='Maybe'>Maybe</option>
</select>

{selectRSVPMap[meeting.id] && (
  <div onClick={() => handleDelete(meeting.id)} className='remove-remove'><p>remove</p></div>
)}


  </div>

</div>


{/*fetching userattending*/}
{showattendinglist &&<div className='fettching-user-attebding'>
 {attendingList.length>0?
 <table>
    <thead>
     
  <tr>
      <th>Name</th>
      <th>RSVP</th>
  </tr>
</thead>
<tbody>
{attendingList.map((attending)=>{
  return  <tr key={attending.id}>
    <td>{attending.name}</td>
    <td>{attending.attendingStatus}</td>
  </tr>

})}

</tbody>
  </table>:<div className='norsvp'>NO RSVP</div>} 
  </div>}



</div>
</div>
  </div>
}):<div className='no-upcomming'>
  <img src={clock} alt='clock'/>

  <p>The club doesn't have any upcoming meetings.</p></div>}

</div>


{/*past meeting */}
<div className='fetching-upcommingmeetings position-met'>

<div className='fetching-upcommingmeetings-number'>
  <p>PAST MEETING(S) <span>{pastmeetingList?.length} {pastmeetingList?.length === 1 ? "meeting" : "meetings"}</span></p>
  

</div>
{ pastmeetingList.length>0?pastmeetingList.map((meeting)=>{
  
  return <div className='details-met-user'>
    <div className='user-meeting'>
      <div className='user-meeting-profile'> 
       {!meeting.userProfile?<img src={profile} /> :<img src={`../upload/${meeting.userProfile}`} />}
      </div>
      <div className='user-meeting-name-date'>
        <h5>{meeting.userName}</h5>
        <p>{moment(meeting.createdAt).format("dddd MMM DD, YYYY hh:mm A")}</p>
      </div>
      {currentUser?.id===meeting.userId && <Link to={`/EditPostMeeting?edit=2`} state={meeting}><button className="edit-edit">EDIT</button></Link>}
    </div>


<div className='details-met-meeting'>
  <div className='details-met-meeting-left'>
    <Link to={`/BookDetails/${meeting.IdBook}`}><img src={`../upload/${meeting.bookImage}`}/></Link>
  </div>

<div className='details-met-meeting-right'>
<div className='book-met'><h5>{meeting. bookName}</h5></div>
<div className='met-by'><p>by {meeting.bookAuthor}</p></div>
<div className='meet-date'><p>{moment(meeting.meetingDate).format("dddd MMM DD, YYYY hh:mm A")}</p></div>
<div className='meet-duration'><p>Meeting Duration {meeting.meetingduration}</p> </div>
<div className='meet-link'>
<BiLink size={26} color='rgb(97, 96, 96)'/>
<p>{meeting.meetingLink}</p>
</div>
{meeting.meetingnote && <div className='meet-note'>
  <p> <span>Notes:</span> {meeting.meetingnote}</p>
  </div>}


{/*attending */}
<div className='attending-met'>
  <div className='attending-met-pepole'>
    <HiUserGroup size={30} color='#444343'/>
    <p> people attending</p>
    <RiArrowDropDownLine size={35} 
    color='#4e4e4e'
   onClick={() => {
    getAttendingForMeeting(meeting.id);
    setShowAttendingList(!showattendinglist);
  }}/>

  </div>

  {/*<div className='select-RSVP'>
    <p>My RSVP:</p>
    <select
  value={selectRSVPMap[meeting.id] || ''}
  onChange={(e) => {
    const updatedRSVPMap = {
      ...selectRSVPMap,
      [meeting.id]: e.target.value,
    };
    setSelectRSVPMap(updatedRSVPMap);
    handleRSVP(meeting.id, e.target.value);
  }}
>
  <option hidden value=''>
    -----
  </option>
  <option value='Yes'>Yes</option>
  <option value='No'>No</option>
  <option value='Maybe'>Maybe</option>
</select>

{selectRSVPMap[meeting.id] && (
  <div onClick={() => handleDelete(meeting.id)} className='remove-remove'><p>remove</p></div>
)}


</div>*/}

</div>


{/*fetching userattending*/}
{showattendinglist &&<div className='fettching-user-attebding'>
 {attendingList.length>0?
 <table>
    <thead>
     
  <tr>
      <th>Name</th>
      <th>RSVP</th>
  </tr>
</thead>
<tbody>
{attendingList.map((attending)=>{
  return  <tr key={attending.id}>
    <td>{attending.name}</td>
    <td>{attending.attendingStatus}</td>
  </tr>

})}

</tbody>
  </table>:<div className='norsvp'>NO RSVP</div>} 
  </div>}



</div>
</div>
  </div>
}):<div className='no-upcomming'>
  <img src={clock} alt='clock'/>

  <p>The club doesn't have any past meetings.</p></div>}

</div>



        </div>    
      
      </div>
  )
}

export default MeetingPosts
