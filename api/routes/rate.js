import express from "express";
import {
addRate,
getAverageRate,
getRateCount,
updateAverageRate,
getuserRate,
deleteRate,
 
} from "../controllers/rate.js";

const router = express.Router();

router.post("/rate", addRate);
router.get("/avaragerate", getAverageRate);
router.get("/ratecount/:id", getRateCount);
router.put("/averagerate/:bookId", updateAverageRate);
router.get('/userRate/:userId', getuserRate);
router.delete("/deleteRateUser/:userId/:bookId", deleteRate);





export default router;
