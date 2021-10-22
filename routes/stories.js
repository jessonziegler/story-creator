
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let storyquery = `SELECT * FROM stories`;
    const contributionquery = `SELECT * FROM contributions`;

    const myStory = db.query(storyquery)
    const mycontribution = db.query(contributionquery)
    const promises = [myStory, mycontribution]
    Promise.all(promises)

      .then(data => {
        const stories = data[0].rows;
        const contributions = data[1].rows
        res.json({ stories, contributions });
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
    // console.log("console log from edit stories.js " + JSON.stringify(req.params));
    const id = req.params
    const title = req.body.editTitle;
    const content = req.body.editContent;
    let query = `UPDATE stories SET title = '${title}', content = '${content}' WHERE id = ${id.id}`; //user_id hard-coded will get after login is set
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


  //delete
    router.delete("/:id", (req, res) => {
      const id = req.params
      let query = `DELETE FROM stories WHERE id = ${id.id}`;
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






