import express from "express";
import {
getcategory,
} from "../controllers/category.js";

const router = express.Router();
router.get("/category", getcategory);


export default router;
