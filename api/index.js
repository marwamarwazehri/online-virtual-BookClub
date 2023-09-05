import express from "express";
import authRoutes from "./routes/auth.js";
import booksRoutes from "./routes/books.js";
import RateRoutes from "./routes/rate.js";
import statusRoutes from "./routes/status.js";
import ReviewsRoutes from "./routes/reviews.js";
import likesRoutes from "./routes/likes.js";
import CategoryRoutes from "./routes/category.js";
import PostsRoutes from "./routes/posts.js";
import MessagesRoutes from "./routes/messages.js";
import MessagesLikesRoutes from "./routes/messageLike.js";
import MessagesCommentRoutes from "./routes/messageComment.js";
import CommentLikeRoutes from "./routes/commentLikes.js";
import CommentReplyRoutes from "./routes/relyComments.js";
import ReplyLikesRoutes from "./routes/replyLikes.js";
import SettingsRoutes from "./routes/settings.js";
import AdminRoutes from "./routes/admin.js";
import MeetingRoutes from "./routes/meeting.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";






const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // Replace with the URL of your frontend application
  credentials: true, // Allow sending cookies from the frontend
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG and PNG files are accepted!"), false);
    }
  },
}).single("file");

app.post("/api/upload", (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json(err.message);
    }

    next();
  });
}, function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});








app.use("/api/auth", authRoutes);
app.use("/api/bookPost", booksRoutes);
app.use("/api/bookRate", RateRoutes);
app.use("/api/statusBook", statusRoutes);
app.use("/api/reviewsBook", ReviewsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/Categories", CategoryRoutes);
app.use("/api/Post", PostsRoutes);
app.use("/api/Messages", MessagesRoutes);
app.use("/api/MessageLikes", MessagesLikesRoutes);
app.use("/api/MessageComment",MessagesCommentRoutes);
app.use("/api/CommentLike",CommentLikeRoutes);
app.use("/api/CommentReply",CommentReplyRoutes);
app.use("/api/ReplyLikes",ReplyLikesRoutes);
app.use("/api/SettingsUser",SettingsRoutes);
app.use("/api/AdminUser",AdminRoutes);
app.use("/api/Meetings",MeetingRoutes);



app.listen(8800, () => {
  console.log("Connected!");
});
