import express from "express";
import {
 getLikes, 
addLike, 
deleteLike } from "../controllers/likes.js";

const router = express.Router()

router.get("/getlike", getLikes)
router.post("/addlike", addLike)
router.delete("/deletelike", deleteLike)


export default router
