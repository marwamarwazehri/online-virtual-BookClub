import { db } from "../db.js";
import moment from "moment";

export const  getMessageComment = (req, res) => {

const q = `SELECT c.*, u.id AS userId, name, profile FROM comments AS c JOIN users AS u ON (u.id = c.userId)
 WHERE c.messageId = ? ORDER BY c.createdAt DESC `;

  db.query(q,[req.params.messageId] ,(err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });

}


export const addComments = (req, res) => {
  const {  newComment, img, userId, messageId } = req.body;
  const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  const query = `INSERT INTO comments (comment, commentImg, createdAt, userId, messageId) VALUES (?, ?, ?, ?, ?)`;
  
  db.query(query, [ newComment, img, createdAt, userId, messageId], (error, results) => {
    if (error) {
      console.error('Error inserting comment:', error);
      res.status(500).json({ error: error.message }); // Send error message as JSON response
    } else {
      res.sendStatus(200);
    }
  });
};


//edit comment
export const  editComment = (req, res) => {
  const { editComment, userId, messageId,commentId} = req.body;

  const query = `UPDATE comments SET comment = ? WHERE userId = ? AND messageId=? AND id=?`;
  db.query(query, [editComment, userId, messageId,commentId], (err, data) => {
    if (err) {
      console.error("Error updating comment:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};

//Delete comment
export const deleteComment = (req, res) => {
  const { userId,messageId,commentId } = req.params;

  const query = `DELETE FROM comments WHERE userId = ? AND messageId = ? AND id= ?`;
  db.query(query, [userId, messageId, commentId], (err, data) => {
    if (err) {
      console.error("Error deleting comment:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};