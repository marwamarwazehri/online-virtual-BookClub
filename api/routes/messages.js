import express from "express";
import {
 getClubMessages,
  addMessages,
  editMessage,
  deleteMessage,
 
} from "../controllers/messages.js";

const router = express.Router();

router.get("/messages", getClubMessages);
router.post("/insertmessages", addMessages);
router.put("/editmessage/:userId", editMessage);
router.delete("/deletemessage/:userId/:messageId", deleteMessage);




export default router;
