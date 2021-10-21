


const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/registers", (req, res) => {
    const user_id = req.cookies['users.id'];
  const templateVars = {user_id};
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
