import { db } from "../db.js";
import moment from "moment";

export const getCommentReply = (req, res) => {

const q = `SELECT r.*, u.id AS userId, name, profile FROM reply AS r JOIN users AS u ON (u.id = r.userId)
 WHERE r.commentId = ? ORDER BY r.createdAt DESC `;

  db.query(q,[req.params.commentId] ,(err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });

}


export const addReply = (req, res) => {
  const { newReply, img, userId, commentId } = req.body;
  const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  
  const query = `INSERT INTO reply (reply, replyImg, createdAt, userId, commentId) VALUES (?, ?, ?, ?, ?)`;
  
  db.query(query, [ newReply, img, createdAt, userId, commentId], (error, results) => {
    if (error) {
      console.error('Error inserting reply:', error);
      res.status(500).json({ error: error.message }); // Send error message as JSON response
    } else {
      res.sendStatus(200);
    }
  });
};



//edit reply
export const  editReply = (req, res) => {
  const { editReply, userId, commentId,replyId} = req.body;

  const query = `UPDATE reply SET reply = ? WHERE userId = ? AND commentId=? AND id=?`;
  db.query(query, [editReply, userId, commentId,replyId], (err, data) => {
    if (err) {
      console.error("Error updating reply:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};

//Delete reply
export const  deleteReply = (req, res) => {
  const { userId,commentId,replyId } = req.params;

  const query = `DELETE FROM reply WHERE userId = ? AND commentId = ? AND id= ?`;
  db.query(query, [userId, commentId, replyId], (err, data) => {
    if (err) {
      console.error("Error deleting reply:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};