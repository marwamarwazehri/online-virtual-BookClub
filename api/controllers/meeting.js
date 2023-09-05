import { db } from "../db.js";

export const getPostUser = (req, res) => {
const q = `SELECT * FROM book  WHERE userId=?  ORDER BY createdAt DESC`;
           
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}


//addMeeting
export const addMeeting = (req, res) => {
  
  const q = "INSERT INTO meeting(`meetingDate`,`meetingduration`, `meetingLink`, `meetingnote`,`createdAt`,`userId`,`bookId`) VALUES (?)";

    const values = [
    req.body.meetingDate,
    req.body. meetingduration,
    req.body.meetingLink,
    req.body.meetingnote,
    req.body.date,
    req.body.userid,
    req.body.bookId,
   ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Meeting has been created.");
    });
  
};



//edit meeting
// edit meeting
export const updateMeeting = (req, res) => {
  const meetingId = req.params.id;
  const q =
    "UPDATE meeting SET `meetingDate`=?, `meetingLink`=?, `meetingnote`=?, `bookId`=? WHERE `id` = ? AND `userId` = ?";

  const values = [
     req.body.meetingDate,// Update to use the complete meetingDate value
    req.body.meetingLink,
    req.body.meetingnote,
    req.body.bookId,
  ];

  db.query(q, [...values, meetingId, req.body.userid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Meeting has been updated.");
  });
};


  
// get upcoming meetings la8ayta
export const getUpCommingMeetings = (req, res) => {
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get the current date and time in the format 'YYYY-MM-DD HH:mm:ss'

  const q = `
    SELECT m.*, u.id AS userId, u.name AS userName, u.profile AS userProfile, b.id AS IdBook, b.bookname AS bookName, b.author AS bookAuthor, b.bookImg AS bookImage
    FROM meeting AS m
    JOIN users AS u ON u.id = m.userId
    JOIN book AS b ON b.id = m.bookId
    WHERE m.meetingDate >= '${currentDate}'
    ORDER BY m.meetingDate ASC
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// get past meetings la8ayta
export const getUpPastMeetings = (req, res) => {
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get the current date and time in the format 'YYYY-MM-DD HH:mm:ss'

  const q = `
    SELECT m.*, u.id AS userId, u.name AS userName, u.profile AS userProfile, b.id AS IdBook, b.bookname AS bookName, b.author AS bookAuthor, b.bookImg AS bookImage
    FROM meeting AS m
    JOIN users AS u ON u.id = m.userId
    JOIN book AS b ON b.id = m.bookId
    WHERE m.meetingDate < '${currentDate}'
    ORDER BY m.meetingDate DESC
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// get upcoming and past meetings 
/*export const getMeetings = (req, res) => {
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const upcomingMeetingsQuery = `
    SELECT m.*, u.id AS userId, u.name AS userName, u.profile AS userProfile, b.id AS IdBook, b.bookname AS bookName, b.author AS bookAuthor, b.bookImg AS bookImage
    FROM meeting AS m
    JOIN users AS u ON u.id = m.userId
    JOIN book AS b ON b.id = m.bookId
    WHERE m.meetingDate >= '${currentDate}'
    ORDER BY m.meetingDate ASC
  `;

  const pastMeetingsQuery = `
    SELECT m.*, u.id AS userId, u.name AS userName, u.profile AS userProfile, b.id AS IdBook, b.bookname AS bookName, b.author AS bookAuthor, b.bookImg AS bookImage
    FROM meeting AS m
    JOIN users AS u ON u.id = m.userId
    JOIN book AS b ON b.id = m.bookId
    WHERE m.meetingDate < '${currentDate}'
    ORDER BY m.meetingDate DESC
  `;

  const upcomingMeetingsPromise = new Promise((resolve, reject) => {
    db.query(upcomingMeetingsQuery, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

  const pastMeetingsPromise = new Promise((resolve, reject) => {
    db.query(pastMeetingsQuery, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

  Promise.all([upcomingMeetingsPromise, pastMeetingsPromise])
    .then(([upcomingMeetings, pastMeetings]) => {
      // Filter the meetings based on both date and time
      const filteredUpcomingMeetings = upcomingMeetings.filter((meeting) => {
        const meetingDate = new Date(meeting.meetingDate);
        const currentDate = new Date();
        return meetingDate > currentDate;
      });

      const filteredPastMeetings = pastMeetings.filter((meeting) => {
        const meetingDate = new Date(meeting.meetingDate);
        const currentDate = new Date();
        return meetingDate < currentDate;
      });

      const meetings = {
        upcomingMeetings: filteredUpcomingMeetings,
        pastMeetings: filteredPastMeetings,
      };
      res.status(200).json(meetings);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
*/
export const getMeetings = (req, res) => {
  const currentDate = new Date();

  const allMeetingsQuery = `
    SELECT m.*, u.id AS userId, u.name AS userName, u.profile AS userProfile, b.id AS IdBook, b.bookname AS bookName, b.author AS bookAuthor, b.bookImg AS bookImage
    FROM meeting AS m
    JOIN users AS u ON u.id = m.userId
    JOIN book AS b ON b.id = m.bookId
    ORDER BY m.meetingDate ASC
  `;

  db.query(allMeetingsQuery, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    const allMeetings = data;

    const upcomingMeetings = [];
    const pastMeetings = [];

    allMeetings.forEach((meeting) => {
      const meetingDateTime = new Date(meeting.meetingDate);

      // Compare the meeting date with the current date
      if (meetingDateTime > currentDate) {
        upcomingMeetings.push(meeting);
      } else if (
        meetingDateTime.getDate() === currentDate.getDate() && // Compare the meeting date with the current date
        meetingDateTime.getHours() > currentDate.getHours() // Compare the meeting hour with the current hour
      ) {
        upcomingMeetings.push(meeting);
      } else if (
        meetingDateTime.getDate() === currentDate.getDate() && // Compare the meeting date with the current date
        meetingDateTime.getHours() === currentDate.getHours() && // Compare the meeting hour with the current hour
        meetingDateTime.getMinutes() >= currentDate.getMinutes() // Compare the meeting minutes with the current minutes
      ) {
        upcomingMeetings.push(meeting);
      } else {
        pastMeetings.push(meeting);
      }
    });

    const meetings = {
      upcomingMeetings,
      pastMeetings,
    };

    res.status(200).json(meetings);
  });
};










//get all attending on a specific meeting
export const getAllAttending = (req, res) => {
  const meetingId = req.params.meetingId;

  const q = `SELECT a.*, u.id AS userId, name, profile 
             FROM attending AS a 
             JOIN users AS u ON (u.id = a.userId)
             WHERE a.meetingId=?`;

  db.query(q, [meetingId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


//update attending
export const editattending= (req, res) => {
  const {attendingStatus, userId, meetingId } = req.body;

  const query = `UPDATE attending SET attendingStatus = ? WHERE userId = ? AND meetingId = ?`;
  db.query(query, [attendingStatus, userId, meetingId], (err, data) => {
    if (err) {
      console.error("Error updating attending:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};


//add attending
export const addAttending = (req, res) => {
    const {attendingStatus, userId, meetingId} = req.body;

  // Insert the review into the "bookreview" table
  const query = `INSERT INTO attending (attendingStatus,userId, meetingId) VALUES (?, ?, ?)`;
  db.query(query, [attendingStatus, userId, meetingId], (error, results) => {
    if (error) {
      console.error('Error inserting attending:', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
}


//get attendingStatus on each meeting for currentUser
export const getAttendingStatus = (req, res) => {
 const userId = req.params.userId;
 const meetingId = req.params.meetingId;


  const query = 'SELECT * FROM attending WHERE userId = ? AND meetingId=?';

  db.query(query, [userId,meetingId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    // Send the book rates as a response
    return res.status(200).json(results);
  });
};


//delete  attending
export const deleteAttending= (req, res) => {
 const { userId, meetingId } = req.params;

  const query = `DELETE FROM attending WHERE userId = ? AND meetingId = ?`;

  db.query(query, [userId,meetingId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    // Send the book rates as a response
    return res.status(200).json(results);
  });
};

export const getAllAttendingYes = (req, res) => {
  const { meetingId } = req.params;
  const attendingStatus = 'Yes';

  const query = 'SELECT * FROM attending WHERE attendingStatus = ? AND meetingId = ?';

  db.query(query, [attendingStatus, meetingId], (err, data) => {
    if (err) {
      console.error('Error retrieving attending data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json(data);
  });
};


//delete meeting

export const deleteMeeting= (req, res) => {
 const { userId, meetingId } = req.params;

  const query = `DELETE FROM meeting WHERE userId = ? AND  id= ?`;

  db.query(query, [userId,meetingId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    
    return res.status(200).json(results);
  });
};