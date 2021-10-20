
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM stories`;
    db.query(query) //values
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

  router.post("/", (req, res) => {
    console.log("console log from stories.js " + JSON.stringify(req.params));
    const title = req.body.title;
    const content = req.body.content;
    //const user_id = req.params; use this only after connecting logins to database.
    console.log(title);
    console.log(content);
    let query = `INSERT INTO stories (title, content, user_id) VALUES ('${title}', '${content}',1)`; //user_id hard-coded will get after login is set
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

  //edit
  router.post("/:story_id", (req, res) => {
    console.log("console log from stories.js " + JSON.stringify(req.params));

    const title = req.body.title;
    const content = req.body.content;
    //const user_id = req.params; use this only after connecting logins to database.
    console.log(title);
    console.log(content);
    let query = `INSERT INTO stories (title, content, user_id) VALUES ('${title}', '${content}',1)`; //user_id hard-coded will get after login is set
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






