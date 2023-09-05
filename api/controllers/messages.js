import { db } from "../db.js";
import moment from "moment";

export const getClubMessages = (req, res) => {

const q = `SELECT m.*, u.id AS userId, name, profile FROM messages AS m JOIN users AS u ON (u.id = m.userId)
  ORDER BY m.createdAt DESC`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });

}


//add messages
export const addMessages = (req, res) => {
    const { message,img ,userId} = req.body;

  // Create a timestamp for the messages creation date
  const createdAt =  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  
  const query = `INSERT INTO messages (message,messageImg ,createdAt, userId) VALUES (?, ?, ?, ?)`;
  db.query(query, [message, img,createdAt, userId], (error, results) => {
    if (error) {
      console.error('Error inserting message:', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
}


//edit message
export const  editMessage = (req, res) => {
  const { editMessage, userId, messageId} = req.body;

  const query = `UPDATE messages SET message = ? WHERE userId = ? AND id=?`;
  db.query(query, [editMessage, userId, messageId], (err, data) => {
    if (err) {
      console.error("Error updating message:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};

//Delete message
export const deleteMessage = (req, res) => {
  const { userId,messageId } = req.params;

  const query = `DELETE FROM messages WHERE userId = ? AND id = ?`;
  db.query(query, [userId, messageId], (err, data) => {
    if (err) {
      console.error("Error deleting messages:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};