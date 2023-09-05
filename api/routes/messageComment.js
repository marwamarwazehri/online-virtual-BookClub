import express from "express";
import {
 getMessageComment,
  addComments,
   editComment,
   deleteComment,
  
 
} from "../controllers/messageComment.js";

const router = express.Router();

router.get("/messageComment/:messageId", getMessageComment);
router.post("/insertcomments", addComments);
router.put("/editcomment/:userId", editComment);
router.delete("/deletecomment/:userId/:messageId/:commentId", deleteComment);





export default router;
