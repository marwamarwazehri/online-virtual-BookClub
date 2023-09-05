import express from "express";
import {
getBooks,
getBook,
getBookAuthor,
getBookUser
} from "../controllers/books.js";

const router = express.Router();
router.get("/books", getBooks);
router.get("/book/:id", getBook);
router.get("/bookauthor/:authorName", getBookAuthor);
router.get("/bookUser/:userId", getBookUser);

export default router;
