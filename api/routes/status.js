import express from "express";
import {
addbookstatus,
removebookstatus,
getCountStatus,
getuserstatus,
getBooks,
getBooksRead,
getBooksWantToRead,

} from "../controllers/status.js";

const router = express.Router();

router.post("/status", addbookstatus);
router.post("/removestatus", removebookstatus);
router.get("/Ireadstatuscount/:id", getCountStatus);
router.get('/userstatus/:userId', getuserstatus);
router.get("/userBooksReading/:userId", getBooks);
router.get("/userBooksHaveRead/:userId", getBooksRead);
router.get("/userBooksWantToRead/:userId", getBooksWantToRead);





export default router;
