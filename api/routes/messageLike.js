import express from "express";
import {
 getmessageLikes, 
addmessageLike, 
deletemessageLike } from "../controllers/messageLike.js";

const router = express.Router()

router.get("/getmessagelike/:messageId", getmessageLikes);
router.post("/addmessagelike", addmessageLike)
router.delete("/deletemessagelike", deletemessageLike)


export default router
