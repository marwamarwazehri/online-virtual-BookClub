import { db } from "../db.js";


export const getcommentLikes = (req, res) => {
  const q = "SELECT userId FROM commentlikes WHERE commentId = ?";

  db.query(q, [req.params.commentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.userId));
  });
};


export const  addcommentLike = (req, res) => {
  const {commentId, userId } = req.body;
  
  const q = `INSERT INTO commentlikes (userId, commentId) VALUES (?, ?)`;
  
  db.query(q, [userId,commentId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "Like added successfully" });
  });
};



export const deletecommentLike = (req, res) => {
  const { commentId, userId } = req.body;
  
  const q = `DELETE FROM commentlikes  WHERE commentId = ? AND userId = ?`;
  
  db.query(q, [commentId, userId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Like deleted successfully" });
  });
};

