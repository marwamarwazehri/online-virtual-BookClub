import { db } from "../db.js";


export const getreplyLikes = (req, res) => {
  const q = "SELECT userId FROM replylikes WHERE replyId = ?";

  db.query(q, [req.params.replyId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.userId));
  });
};


export const  addreplyLike = (req, res) => {
  const {replyId, userId } = req.body;
  
  const q = `INSERT INTO replylikes (userId, replyId) VALUES (?, ?)`;
  
  db.query(q, [userId,replyId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "Like added successfully" });
  });
};



export const deletereplyLike = (req, res) => {
  const { replyId, userId } = req.body;
  
  const q = `DELETE FROM replylikes  WHERE replyId = ? AND userId = ?`;
  
  db.query(q, [replyId, userId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Like deleted successfully" });
  });
};

