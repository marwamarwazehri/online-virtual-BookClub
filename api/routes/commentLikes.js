import express from "express";
import {
 getcommentLikes, 
addcommentLike, 
deletecommentLike, } from "../controllers/commentLikes.js";

const router = express.Router()

router.get("/getcommentlike/:commentId", getcommentLikes);
router.post("/addcommentlike", addcommentLike)
router.delete("/deletecommentlike", deletecommentLike)


export default router
