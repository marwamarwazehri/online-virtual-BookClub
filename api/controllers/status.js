import { db } from "../db.js";


export const addbookstatus = (req, res) => {
  const { status, userId, bookId } = req.body;

  if (status === 'ADD TO MY SHELVES') {
    return res.status(200).json("Status has not been inserted.");
  }

  const selectQuery = "SELECT * FROM bookstatus WHERE userId = ? AND bookId = ?";
  const selectValues = [userId, bookId];

  db.query(selectQuery, selectValues, (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      // If a status already exists with the same userId and bookId, update the status
      const updateQuery = "UPDATE bookstatus SET status = ? WHERE userId = ? AND bookId = ?";
      const updateValues = [status, userId, bookId];

      db.query(updateQuery, updateValues, (err, data) => {
        if (err) return res.status(500).json(err);

        // Send the response indicating the status has been updated
        return res.status(200).json("Your status has been updated.");
      });
    } else {
      // If no status exists with the same userId and bookId, insert the new status
      const insertQuery = "INSERT INTO bookstatus(`status`, `userId`, `bookId`) VALUES (?)";
      const insertValues = [status, userId, bookId];

      db.query(insertQuery, [insertValues], (err, data) => {
        if (err) return res.status(500).json(err);

        // Send the response after successful insertion
        return res.status(200).json("Status has been created.");
      });
    }
  });
};

export const removebookstatus = (req, res) => {
  const { option, userId, bookId } = req.body;

  // Assuming you have a database connection named `db` configured
  const q = "DELETE FROM bookstatus WHERE `status` = ? AND `userId` = ? AND `bookId` = ?";
  const values = [
    option,
    userId,
    bookId
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    // Send the response after successful deletion
    return res.status(200).json("Status has been removed.");
  });
};

//count the members that already read the book 
export const getCountStatus = (req, res) => {
 const bookId = req.params.id;

  const query = 'SELECT * FROM bookstatus WHERE bookId = ? And status="ADD TO BOOKS I HAVE READ"';

  db.query(query, [bookId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    // Send the book rates as a response
    return res.status(200).json(results);
  });
};


//get  current userstatus on a book

export const getuserstatus = (req, res) => {
  const userId = req.params.userId; // Assuming the userId is passed as a parameter
  const bookId = req.query.bookId; // Assuming the bookId is passed as a query parameter

  const query = 'SELECT status FROM bookstatus WHERE userId = ? AND bookId = ?';

  db.query(query, [userId, bookId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json("Status not found for the user and book.");
    }

    // Send the user's status as a response
    return res.status(200).json(results[0].status);
  });
};


//get books that user is currently reading
export const getBooks = (req, res) => {
const q = `SELECT b.* FROM book AS b JOIN bookstatus AS s ON s.bookId = b.id 
            WHERE s.userId=? AND s.status="ADD TO CURRENTLY READING BOOKS"`;
           
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}

//get books that user is Read
export const getBooksRead = (req, res) => {
const q = `SELECT b.* FROM book AS b JOIN bookstatus AS s ON s.bookId = b.id 
            WHERE s.userId=? AND s.status="ADD TO BOOKS I HAVE READ"`;
           
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}


//get books that user is Want To Read
export const getBooksWantToRead = (req, res) => {
const q = `SELECT b.* FROM book AS b JOIN bookstatus AS s ON s.bookId = b.id 
            WHERE s.userId=? AND s.status="ADD TO BOOKS I WANT TO READ"`;
           
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}





