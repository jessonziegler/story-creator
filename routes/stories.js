
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
    const title = req.body.title;
    const content = req.body.content;
    //const user_id = req.params; use this only after connecting logins to database.
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
  router.post("/:id", (req, res) => {
    console.log("console log from edit stories.js " + JSON.stringify(req.params));
    const id = req.params
    const title = req.body.editTitle;
    const content = req.body.editContent;
    let query = `UPDATE stories SET title = '${title}', content = '${content}' WHERE id = ${id.id}`; //user_id hard-coded will get after login is set
    console.log(query);
    db.query(query)
      .then(data => {
        console.log(data);
        const stories = data.rows;
        console.log(stories);
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  //delete
    router.delete("/:id", (req, res) => {
      const id = req.params
      const title = req.body.editTitle;
      const content = req.body.editContent;
      let query = `DELETE FROM stories WHERE id = ${id.id}`; //user_id hard-coded will get after login is set
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






