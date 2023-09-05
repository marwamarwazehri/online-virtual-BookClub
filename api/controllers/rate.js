import { db } from "../db.js";
import jwt from "jsonwebtoken";


export const addRate = (req, res) => {
  const rate = req.body.rate;
  const userId = req.body.userId;
  const bookId = req.body.bookId;

  // Check if userId exists in the table
  const checkQuery = 'SELECT * FROM bookrate WHERE userId = ? AND bookId = ?';
  db.query(checkQuery, [userId, bookId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    if (results.length > 0) {
     // User has rated before
        const deleteQuery = 'UPDATE bookrate SET rate = ? WHERE userId = ? AND bookId = ?';
        db.query(deleteQuery, [rate, userId, bookId], (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          }
          return res.status(200).json({ status:"Rate has been updated." });
        });
      }
     else {
      // User has not rated before, insert the rate
      const insertQuery = 'INSERT INTO bookrate(userId, bookId, rate) VALUES (?, ?, ?)';
      db.query(insertQuery, [userId, bookId, rate], (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        return res.status(200).json({ status: "Rate has been created." });
      });
    }
  });
};



export const getAverageRate = (req, res) => {
  const { bookId } = req.query;
  const query = 'SELECT rate FROM bookrate WHERE bookId = ?';
  db.query(query, [bookId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    } else {
      const rates = results.map((row) => row.rate);
      if (rates.length > 0) {
        const totalRates = rates.reduce((sum, rate) => sum + rate, 0);
        const averageRate = totalRates / rates.length;
        res.json(averageRate);
      } else {
        res.json(0); // If there are no rates, return 0 as the average rate
      }
    }
  });
};



//getcount of rate on each book
// Backend
export const getRateCount = (req, res) => {
 const bookId = req.params.id;

  const query = 'SELECT * FROM bookrate WHERE bookId = ?';

  db.query(query, [bookId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    // Send the book rates as a response
    return res.status(200).json(results);
  });
};


//update averagerate in book table 

export const updateAverageRate = (req, res) => {
  const bookId = req.params.bookId;
  const averageRate = req.body.averageRate;

  // Update the averagerate in the book table
  const query = `UPDATE book SET averagerate = ? WHERE id = ?`;
  db.query(query, [averageRate, bookId], (err, result) => {
    if (err) {
      console.error('Error updating averagerate:', err);
      res.status(500).json({ error: 'Failed to update averagerate' });
      return;
    }

    res.json({ message: 'Averagerate updated successfully' });
  });
};


//get userrate that the user enter it
export const getuserRate = (req, res) => {
  const userId = req.params.userId; // Assuming the userId is passed as a parameter
  const bookId = req.query.bookId; // Assuming the bookId is passed as a query parameter

  const query = 'SELECT rate FROM bookrate WHERE userId = ? AND bookId = ?';

  db.query(query, [userId, bookId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json({ status: "Rate not found for the user and book." });

    }

    // Send the user's rate as a response
    return res.status(200).json(results[0].rate);

  });
};



export const deleteRate = (req, res) => {
  const { userId,bookId } = req.params;

  const deleteQuery = 'DELETE FROM bookrate WHERE userId = ? AND bookId = ?';
  db.query(deleteQuery, [userId, bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.status(200).json({ status: "Rate has been deleted." });
  });
};