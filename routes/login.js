const express = require('express');
const router  = express.Router();

//login a user

module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log('1st one good')
  console.log('Cookies: ', req.cookies['users.id'])
  const user_id = req.cookies['users.id'];
  const templateVars = {user_id};
    // cookie-session
    //req.session.user_id = req.params.id;
    // send the user somewhere
    res.render('login', templateVars);
  });

  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const values = [email, password];
    console.log(values);
    if (email === '' || password === '') {
      res.send("Please enter your email and password!");
    } else {
      db.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, values)
        .then(data => {
          console.log(data.rows);
          res.cookie('users.id', data.rows[0]['id']);
          console.log('letskettit')
          //if(!res.cookie)
          res.redirect('/');
        })
        .catch(err => {
          console.log(err.message);
          res.send("Invalid email or password");
        });
    }
  });

  return router;
};
