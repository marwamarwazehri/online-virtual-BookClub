import { db } from "../db.js";
import moment from "moment";

export const getBookReviews = (req, res) => {

const q = `SELECT r.*, u.id AS userId, name, profile FROM bookreview AS r JOIN users AS u ON (u.id = r.userId)
 WHERE r.bookId = ? ORDER BY r.createdAt DESC
    `;

  db.query(q, [req.params.bookId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });

}


export const addReviews = (req, res) => {
    const { review, userId, bookId } = req.body;

  // Create a timestamp for the review's creation date
  const createdAt =  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  // Insert the review into the "bookreview" table
  const query = `INSERT INTO bookreview (review, createdAt, userId, bookId) VALUES (?, ?, ?, ?)`;
  db.query(query, [review, createdAt, userId, bookId], (error, results) => {
    if (error) {
      console.error('Error inserting review:', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
}





//update review
// Backend code
export const editReview = (req, res) => {
  const { review, userId, bookId } = req.body;

  const query = `UPDATE bookreview SET review = ? WHERE userId = ? AND bookId = ?`;
  db.query(query, [review, userId, bookId], (err, data) => {
    if (err) {
      console.error("Error updating review:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};


//Delete review 

// Backend code
export const deleteReview = (req, res) => {
  const { userId, bookId } = req.params;

  const query = `DELETE FROM bookreview WHERE userId = ? AND bookId = ?`;
  db.query(query, [userId, bookId], (err, data) => {
    if (err) {
      console.error("Error deleting review:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};


//getcount of review on each book
// Backend
export const getReviewCount = (req, res) => {
 const bookId = req.params.id;

  const query = 'SELECT * FROM bookreview WHERE bookId = ?';

  db.query(query, [bookId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    // Send the book rates as a response
    return res.status(200).json(results);
  });
};