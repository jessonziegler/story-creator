const express = require('express');
const router  = express.Router();

//login a user
module.exports = (db) => {

  router.get("/login", (req, res) => {
   /* const user_email = req.body.email;
    const password = req.body.password;
    const values = [user_email, password];
    console.log(values);
    if (user_email === '' || password === '') {
      res.send("Please enter your email and password!");
    } else { */
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
