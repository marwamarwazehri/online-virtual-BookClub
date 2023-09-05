import { db } from "../db.js";

export const addPost = (req, res) => {
  console.log(req.body.cat); 
  
const q = "INSERT INTO book(`bookname`, `category`, `author`, `description`, `bookImg`,`pages`,`createdAt`,`firstlink`,`secondlink`,`thirdlink`,`fourthlink`,`otherlink`,`userId`) VALUES (?)";

    const values = [
    req.body.name,
    req.body.cat,
    req.body.author,
    req.body.desc,
     req.body.img,
    req.body.pages,
    req.body.date,
    req.body.link1,
    req.body.link2,
    req.body.link3,
    req.body.link4,
    req.body.otherlink,
    req.body.userid,
     
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  
};



// backend/controllers/posts.js

export const deletePost = (req, res) => {
  const { userId, postId } = req.params;

  const query = `DELETE FROM book WHERE id = ? AND userId = ?`;
  db.query(query, [postId, userId], (err, data) => {
    if (err) {
      console.error("Error deleting post:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};

/*export const deletePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userid; // Access the `userid` parameter from the request body

  const q = "DELETE FROM book WHERE `id` = ? AND `userId` = ?";

  db.query(q, [postId, userId], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post!");

    return res.json("Post has been deleted!");
  });
};*/


export const updatePost = (req, res) => {
  console.log(req.body.cat); 
     const postId = req.params.id;
    const q =
      "UPDATE book SET `bookname`=?,`category`=?,`author`=?,`description`=?,`bookImg`=?,`pages`=?,`firstlink`=?,`secondlink`=?,`thirdlink`=?,`fourthlink`=?, `otherlink`=? WHERE `id` = ? AND `userId` = ?";

    const values = [
    req.body.name,
    req.body.cat,
    req.body.author,
    req.body.desc,
     req.body.img,
    req.body.pages,
    req.body.link1,
    req.body.link2,
    req.body.link3,
    req.body.link4,
    req.body.otherlink,
   ];

    db.query(q, [...values, postId,  req.body.userid,], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  
};

//update publicstatus for a book
export const updateBookPublicStatus = (req, res) => {
  const { userId, bookId } = req.params;

  const selectQuery = `SELECT public FROM book WHERE id=? AND userId=?`;

  db.query(selectQuery, [bookId, userId], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ error: 'User or book not found.' });
    }

    const currentStatus = data[0].public;
    const newStatus = currentStatus === 'true' ? 'false' : 'true';

    const updateQuery = `UPDATE book SET public=? WHERE id=? AND userId=?`;

    db.query(updateQuery, [newStatus, bookId, userId], (err) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        const message = newStatus === 'true' ? 'Post has been published.' : 'Post has been hidden.';
        return res.status(200).json({ message });
      }
    });
  });
};
