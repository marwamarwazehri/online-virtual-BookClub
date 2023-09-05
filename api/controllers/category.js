import { db } from "../db.js";

export const getcategory = (req, res) => {
  const query = 'SELECT * FROM category';

  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    return res.status(200).json(data);
  });
};
