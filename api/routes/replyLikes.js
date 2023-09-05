import express from "express";
import {
getreplyLikes, 
addreplyLike, 
deletereplyLike, } from "../controllers/replyLikes.js";

const router = express.Router()

router.get("/getreplylike/:replyId", getreplyLikes);
router.post("/addreplylike", addreplyLike)
router.delete("/deletereplylike", deletereplyLike)


export default router
