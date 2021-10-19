
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // router.use((req, res, next) => {
  //   const user_id = req.cookies.user_id;
  //   //look them up in the database and send error message.
  //   if(!user_id){
  //     return res.send("Error: User not found. Please login")
  //   }
  //   next();
  // })


  //get all stories from the stories database
  router.get("/", (req, res) => {
    let query = `SELECT * FROM stories`;
    db.query(query)
      .then(data => {
        const stories = data.rows;
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // //GET /stories/:id
  // router.get("/:id", (req, res) => {
  //   id = req.params.id
  //   let query = `SELECT * FROM stories JOIN users ON users_id = users.id WHERE id = $1`, [id]; //FIX THIS QUERY
  //   db.query(query)
  //     .then(data => {
  //       const stories = data.rows[0];
  //       res.json({ stories });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });


  // POST /stories to the stories database
  router.post('/', (req, res) => {
    console.log("console log from stories.js " + JSON.stringify(req.body));
    const title = req.body.title;
    const content = req.body.content;
    console.log(title);
    console.log(content);
    let query = `INSERT INTO stories (title, content, user_id) VALUES ('${title}', '${content}',1)`; //What is user id
    db.query(query)
      .then(data => {
        const stories = data.rows;
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });




  return router;
};




