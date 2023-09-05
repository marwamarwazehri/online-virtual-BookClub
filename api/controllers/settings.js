import { db } from "../db.js";
import moment from "moment";
import bcrypt from 'bcrypt';

//edit userProfile
export const  updateUserProfile = (req, res) => {
  const { img, userId} = req.body;

  const query = `UPDATE users SET profile = ? WHERE id = ?`;
  db.query(query, [img, userId], (err, data) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};

//update profile image user 

export const deleteProfile = (req, res) => {
  const { userId } = req.params;

  const query = `UPDATE users SET profile = NULL WHERE id = ?`;
  db.query(query, [userId], (err, data) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};



// Update Settings
export const UpdateSettings = (req, res) => {
  const { name, username, email, address, phone, userId } = req.body;

  // Check if username already exists
  const checkUsernameQuery = 'SELECT * FROM users WHERE username = ? AND id != ?';
  db.query(checkUsernameQuery, [username, userId], (usernameErr, usernameData) => {
    if (usernameErr) {
      console.error("Error checking username:", usernameErr);
      return res.status(500).json(usernameErr);
    }

    if (usernameData.length > 0) {
      return res.status(400).json({ message: "A member with this username already exists" });
    }

    // Check if email already exists
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ? AND id != ?';
    db.query(checkEmailQuery, [email, userId], (emailErr, emailData) => {
      if (emailErr) {
        console.error("Error checking email:", emailErr);
        return res.status(500).json(emailErr);
      }

      if (emailData.length > 0) {
        return res.status(400).json({ message: "A member with this email already exists" });
      }

      // Update the settings
      const updateQuery = `UPDATE users SET name = ?, username = ?, email = ?, address = ?, phone = ? WHERE id = ?`;
      db.query(updateQuery, [name, username, email, address, phone, userId], (updateErr, updateData) => {
        if (updateErr) {
          console.error("Error updating settings:", updateErr);
          return res.status(500).json(updateErr);
        }

        return res.sendStatus(200);
      });
    });
  });
};



//updat Password
export const UpdateUserPassword = (req, res) => {
  const { userId, currentpassword, newpassword } = req.body;

  // Retrieve the current password from the users table
  const selectQuery = `SELECT password FROM users WHERE id = ?`;
  db.query(selectQuery, [userId], (selectErr, selectData) => {
    if (selectErr) {
      console.error("Error selecting password:", selectErr);
      return res.status(500).json(selectErr);
    }

    if (selectData.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentPasswordFromDB = selectData[0].password;

    // Compare the current password with the provided currentpassword
    bcrypt.compare(currentpassword, currentPasswordFromDB, (compareErr, isMatch) => {
      if (compareErr) {
        console.error("Error comparing passwords:", compareErr);
        return res.status(500).json(compareErr);
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid current password" });
      }

      // Hash the new password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newpassword, salt);

      // Update the password in the users table
      const updateQuery = `UPDATE users SET password = ? WHERE id = ?`;
      db.query(updateQuery, [hashedPassword, userId], (updateErr) => {
        if (updateErr) {
          console.error("Error updating password:", updateErr);
          return res.status(500).json(updateErr);
        }
        return res.sendStatus(200);
      });
    });
  });
};

//deleteAccount
export const deleteAccount = (req, res) => {
  const { userId } = req.params;

  const query = `DELETE FROM users WHERE id = ?`;
  db.query(query, [userId], (err, data) => {
    if (err) {
      console.error("Error deleting account:", err);
      return res.status(500).json(err);
    }
    return res.sendStatus(200);
  });
};
