import express from "express";
import { register,login, logout,getUserNumbers,updateBookBanStatus} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/UserNumberMembers", getUserNumbers);
router.put("/updateBanStatus/:userId", updateBookBanStatus);



export default router;
