import { db } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

//check if SUPERUSER Password is true 
export const superAdminPass = (req, res) => {
  // CHECK PASSWORD
  const q = "SELECT * FROM password WHERE password = ?";
  db.query(q, [req.body.superPassword], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      res.status(404).json({ message: "Invalid password!" });
    } else {
      res.status(200).json({ message: "Valid password!" });
    }
  });
};



// register Admin
export const registerAdmin = (req, res) => {
  // CHECK EXISTING USER
  const type = "Admin";
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      // Existing user found
      const existingUser = data[0];

      if (existingUser.email === req.body.email) {
        return res.status(409).json("User with this email already exists");
      } else if (existingUser.username === req.body.username) {
        return res.status(409).json("User with this username already exists!");
      }
    }

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery =
      "INSERT INTO users(`username`, `email`, `password`, `name`, `type`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hash,
      req.body.name,
      type,
    ];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Admin has been created.");
    });
  });
};


//get admins

export const  getAdmins = (req, res) => {
const q = `SELECT * FROM users WHERE type='Admin'`;
           
  db.query(q,(err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}


// UpdateAdmin
export const updateAdmin = (req, res) => {
  const { adminId } = req.params;
  const { username, email, name, password } = req.body;

  const query = `UPDATE users SET name = ?, username = ?, email = ?, password = ? WHERE id = ?`;
  db.query(query, [name, username, email, password, adminId], (err, data) => {
    if (err) {
      console.error("Error updating Admin:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};


//Delete Admin
export const DeleteAdmin = (req, res) => {
 const {adminId} = req.params;

  const query = `DELETE FROM users WHERE id = ?`;
  db.query(query, [adminId], (err, data) => {
    if (err) {
      console.error("Error deleting Admin:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};
//update outerPassword
export const updateOuterPassword = (req, res) => {
 
  const {password } = req.body;

  const query = `UPDATE password SET password = ?`;
  db.query(query, [password], (err, data) => {
    if (err) {
      console.error("Error updating password:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};

//get Categories
export const getCategories = (req, res) => {
const q = `SELECT * FROM category`;
           
  db.query(q,(err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}


//add Category

export const addCategory = (req, res) => {
  const { category } = req.body;

  const checkQuery = `SELECT * FROM category WHERE category = ?`;
  db.query(checkQuery, [category], (error, results) => {
    if (error) {
      console.error('Error checking category:', error);
      res.sendStatus(500);
    } else {
      if (results.length > 0) {
        // Category already exists
        res.status(400).json({ message: 'Category already exists' });
      } else {
        // Category does not exist, add it to the table
        const query = `INSERT INTO category (category) VALUES (?)`;
        db.query(query, [category], (error, results) => {
          if (error) {
            console.error('Error inserting category:', error);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    }
  });
};


//delete category

export const  DeleteCategory = (req, res) => {
 const {categoryId} = req.params;

  const query = `DELETE FROM category WHERE id = ?`;
  db.query(query, [categoryId], (err, data) => {
    if (err) {
      console.error("Error deleting category:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};

//get all books
export const  getAllBooks = (req, res) => {
const q = `SELECT * FROM book  ORDER BY createdAt DESC`;
           
  db.query(q,(err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}


//get RecentBook
export const  getRecentBooks = (req, res) => {
  const q = `SELECT * FROM book ORDER BY createdAt DESC LIMIT 10`;
  
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
}

//get All reviews
export const  getAllReviews = (req, res) => {
const {bookId} = req.params;
  
const q = `SELECT * FROM bookreview  WHERE bookId= ?`;
  
  db.query(q, [bookId],(err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
}


//get recent book review

export const getRecentReviews = (req, res) => {
const {bookId} = req.params;
  
const q = `SELECT * FROM bookreview  WHERE bookId= ? ORDER BY createdAt DESC LIMIT 10`;
  
  db.query(q, [bookId],(err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
}

//delete book
export const   DeleteBook = (req, res) => {
 const {bookId} = req.params;

  const query = `DELETE FROM book WHERE id = ?`;
  db.query(query, [bookId], (err, data) => {
    if (err) {
      console.error("Error deleting book:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};

//delete recent book 

export const DeleteRecentBook = (req, res) => {
 const {bookId} = req.params;

  const query = `DELETE FROM book WHERE id = ?`;
  db.query(query, [bookId], (err, data) => {
    if (err) {
      console.error("Error deleting book:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};



//delete review

export const  DeleteReview = (req, res) => {
 const {reviewId} = req.params;

  const query = `DELETE FROM bookreview WHERE id = ?`;
  db.query(query, [reviewId], (err, data) => {
    if (err) {
      console.error("Error deleting review:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};


//get all Messages 
export const  getAllMessages = (req, res) => {
const q = `SELECT * FROM  messages  ORDER BY createdAt DESC`;
           
  db.query(q,(err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}


//get RecentMessages
export const  getRecentMessages = (req, res) => {
  const q = `SELECT * FROM messages ORDER BY createdAt DESC LIMIT 10`;
  
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
}
//get All comments
export const  getAllComments = (req, res) => {
const {messageId} = req.params;
  
const q = `SELECT * FROM comments WHERE messageId= ?`;
  
  db.query(q, [messageId],(err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });


}


//get recent comment

export const getRecentComments = (req, res) => {
const {messageId} = req.params;
  
const q = `SELECT * FROM comments  WHERE messageId= ? ORDER BY createdAt DESC LIMIT 10`;
  
  db.query(q, [messageId],(err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
}



//delete message
export const  deletemessage = (req, res) => {
 const {messageId} = req.params;

  const query = `DELETE FROM messages WHERE id = ?`;
  db.query(query, [messageId], (err, data) => {
    if (err) {
      console.error("Error deleting message:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};

//delete recent message

export const deleterecentmessage = (req, res) => {
 const {messageId} = req.params;

  const query = `DELETE FROM messages WHERE id = ?`;
  db.query(query, [messageId], (err, data) => {
    if (err) {
      console.error("Error deleting message:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};


//delete comment

export const  deleteComment = (req, res) => {
 const {commentId} = req.params;

  const query = `DELETE FROM comments WHERE id = ?`;
  db.query(query, [commentId], (err, data) => {
    if (err) {
      console.error("Error deleting comment:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};

//get All replies
export const   getAllReplies = (req, res) => {
const {commentId} = req.params;
  
const q = `SELECT * FROM reply  WHERE commentId= ?`;
  
  db.query(q, [commentId],(err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
}

//delete reply

export const  deleteReply = (req, res) => {
 const {replyId} = req.params;

  const query = `DELETE FROM  reply WHERE id = ?`;
  db.query(query, [replyId], (err, data) => {
    if (err) {
      console.error("Error deleting reply:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};
