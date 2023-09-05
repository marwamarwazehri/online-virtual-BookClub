import express from "express";
import {
 getCommentReply,
 addReply,
 editReply,
 deleteReply
  } from "../controllers/replyComments.js";

const router = express.Router();

router.get("/replyComment/:commentId", getCommentReply);
router.post("/insertreply", addReply);
router.put("/editreply/:userId", editReply);
router.delete("/deletereply/:userId/:commentId/:replyId", deleteReply);





export default router;
