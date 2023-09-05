import express from "express";
import {
getBookReviews,
 addReviews,
 editReview,
 deleteReview,
 getReviewCount
} from "../controllers/reviews.js";

const router = express.Router();

router.get("/bookreviews/:bookId", getBookReviews);
router.post("/reviews", addReviews);
router.put("/editreview/:userId/:bookId", editReview);
router.delete("/deletereview/:userId/:bookId", deleteReview);
router.get("/reviewcount/:id", getReviewCount);




export default router;
