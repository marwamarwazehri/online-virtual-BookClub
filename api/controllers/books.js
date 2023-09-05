import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getBooks = (req, res) => {
const q = `SELECT b.*, u.id AS userId, name, profile FROM book AS b JOIN users AS u ON u.id = b.userId
             ORDER BY b.createdAt DESC`;
  db.query(q,(err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getBook = (req, res) => {
 const q = `SELECT b.*, u.id AS userId, name, profile,username FROM book AS b JOIN users AS u ON (u.id = b.userId) WHERE b.id=?`;
           
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};


//get book according to authorname
export const getBookAuthor = (req, res) => {
 const q = `SELECT b.*, u.id AS userId, name, profile,username FROM book AS b JOIN users AS u ON (u.id = b.userId) WHERE author=?`;
           
  db.query(q, [req.params.authorName], (err, data) => {
    if (err) return res.status(500).json(err);

     return res.status(200).json(data);
  });
};



//get user posts

export const getBookUser = (req, res) => {
const q = `SELECT * FROM book  WHERE userId=?  ORDER BY createdAt DESC`;
           
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}
