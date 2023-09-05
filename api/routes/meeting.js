import express from "express";
import {
getPostUser,
addMeeting,
updateMeeting,
getUpCommingMeetings,
getUpPastMeetings,
getAllAttending,
editattending,
addAttending,
getAttendingStatus,
deleteAttending,
getAllAttendingYes,
deleteMeeting,
getMeetings

} from "../controllers/meeting.js";

const router = express.Router();
router.get("/postUser/:userId", getPostUser);
router.post("/postmeeting", addMeeting);
router.put("/editmeeting/:id", updateMeeting);
router.get("/upcommingmeetings", getUpCommingMeetings);//la8ayta
router.get("/pastmeetings", getUpPastMeetings);//la8ayta
router.get("/meetings", getMeetings);//hay fetching upcomming and past meetings 

router.get("/allattending/:meetingId", getAllAttending);
router.put("/editattending/:userId/:meetingId", editattending);
router.post("/addattending", addAttending);
router.get("/gettingAnattendingStatus/:userId/:meetingId", getAttendingStatus);
router.delete("/deleteAttending/:userId/:meetingId", deleteAttending);
router.get("/allattendingYes/:meetingId", getAllAttendingYes);
router.delete("/deletemeeting/:userId/:meetingId", deleteMeeting);


export default router;
