import express from "express";
import {
 updateUserProfile,
 deleteProfile,
 UpdateSettings,
 UpdateUserPassword,
 deleteAccount,
  
 } from "../controllers/settings.js";

const router = express.Router();

router.put("/Userprofile/:userId",updateUserProfile);
router.put("/deletprofile/:userId", deleteProfile);
router.put("/updateSettings/:userId", UpdateSettings);
router.put("/updateUserPassword/:userId", UpdateUserPassword);
router.delete("/deletaccount/:userId", deleteAccount);





export default router;
