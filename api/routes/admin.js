import express from "express";
import {superAdminPass,
        registerAdmin,
        getAdmins,
        updateAdmin,
        DeleteAdmin,
        updateOuterPassword,
        getCategories,
        addCategory,
        DeleteCategory,
        getAllBooks,
        getRecentBooks,
        getAllReviews,
        getRecentReviews,
        DeleteBook,
        DeleteRecentBook,
        DeleteReview,
        getAllMessages,
        getRecentMessages,
        getAllComments,
        getRecentComments,
        deletemessage,
        deleterecentmessage,
        deleteComment,
        getAllReplies,
        deleteReply,
    } from "../controllers/admin.js";

const router = express.Router();


router.post("/superAdminPass",superAdminPass );
router.post("/registerAdmin", registerAdmin);
router.get("/AdminMembers", getAdmins);
router.put("/updateAdmin/:adminId", updateAdmin);
router.delete("/deleteAdmin/:adminId", DeleteAdmin);
router.put("/changeOuterPassword", updateOuterPassword);
router.get("/getCategories",getCategories);
router.post("/addCategory",addCategory);
router.delete("/deletecategory/:categoryId", DeleteCategory);
router.get("/getAllBooks",getAllBooks);
router.get("/getRecentBooks",getRecentBooks);
router.get("/getAllReviews/:bookId", getAllReviews);
router.get("/getRecentReviews/:bookId", getRecentReviews);
router.delete("/deletebook/:bookId", DeleteBook);
router.delete("/deleterecentbook/:bookId", DeleteRecentBook);
router.delete("/deleteReview/:reviewId", DeleteReview);
router.get("/getAllMessages",getAllMessages);
router.get("/getRecentMessages",getRecentMessages);
router.get("/getAllComments/:messageId", getAllComments);
router.get("/getRecentComments/:messageId", getRecentComments);
router.delete("/deletemessage/:messageId", deletemessage);
router.delete("/deleterecentmessage/:messageId",deleterecentmessage);
router.delete("/deleteComment/:commentId", deleteComment);
router.get("/getAllReplies/:commentId", getAllReplies);
router.delete("/deleteReply/:replyId",deleteReply);

/*router.post("/logout", logout);
router.get("/UserNumberMembers", getUserNumbers);*/



export default router;
