import React from 'react'
import './WriteMeeting.css'
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios'


const WriteMeeting = () => {

const navigate = useNavigate();
const state = useLocation().state;





  return (
    <div className='meeting-post-edit'>
      
    </div>
  )
}

export default WriteMeeting
