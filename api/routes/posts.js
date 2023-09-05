import express from "express";
import {
  addPost,
  deletePost,
  updatePost,
  updateBookPublicStatus,
} from "../controllers/posts.js";

const router = express.Router();

router.post("/", addPost);
router.delete("/:userId/:postId", deletePost);
router.put("/:id", updatePost);
router.put("/updatePubliclStatus/:userId/:bookId", updateBookPublicStatus);


//note:get Posts ana 7tyta bel books.js 

export default router;
