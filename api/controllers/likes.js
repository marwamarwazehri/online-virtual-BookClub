import { db } from "../db.js";


export const getLikes = (req,res)=>{
    const q = "SELECT userId FROM reviewlikes WHERE reviewId = ?";

    db.query(q, [req.query.reviewId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(like=>like.userId));
      
    });
}

export const addLike = (req, res) => {
  const { reviewId, userId } = req.body;
  
  const q = `INSERT INTO reviewlikes (reviewId, userId) VALUES (?, ?)`;
  
  db.query(q, [reviewId, userId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "Like added successfully" });
  });
};

export const deleteLike = (req, res) => {
  const { reviewId, userId } = req.body;
  
  const q = `DELETE FROM reviewlikes WHERE reviewId = ? AND userId = ?`;
  
  db.query(q, [reviewId, userId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Like deleted successfully" });
  });
};

