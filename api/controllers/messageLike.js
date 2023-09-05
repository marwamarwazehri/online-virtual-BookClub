import { db } from "../db.js";


export const getmessageLikes = (req, res) => {
  const q = "SELECT userId FROM messagelikes WHERE messageId = ?";

  db.query(q, [req.params.messageId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.userId));
  });
};


export const  addmessageLike = (req, res) => {
  const {messageId, userId } = req.body;
  
  const q = `INSERT INTO messagelikes (userId, messageId) VALUES (?, ?)`;
  
  db.query(q, [userId,messageId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "Like added successfully" });
  });
};



export const deletemessageLike = (req, res) => {
  const { messageId, userId } = req.body;
  
  const q = `DELETE FROM messagelikes  WHERE messageId = ? AND userId = ?`;
  
  db.query(q, [messageId, userId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Like deleted successfully" });
  });
};

