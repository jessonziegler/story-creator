const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const id = req.params
    let query = `SELECT * FROM contributions`;
    // let query = `SELECT contribution FROM contributions WHERE stories_id = ${id.id}`;
    db.query(query) //values
      .then(data => {
        const contributions = data.rows;
        res.json(contributions);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  router.get("/:id", (req, res) => {
    const stories_id = req.params
    let query = `SELECT * FROM contributions`;
    // let query = `SELECT contribution FROM contributions WHERE stories_id = ${stories_id.id}`;
    db.query(query) //values
      .then(data => {
        const contributions = data.rows;
        res.json(contributions);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


 //contributions
 router.post("/:id", (req, res) => {
  console.log("console log from contributions.js " + JSON.stringify(req.body));
  const story_id = req.params
  console.log(story_id.id);
  const content = req.body; //passing an object
  console.log(content.submit);
  let query = `INSERT INTO contributions (contribution, stories_id) VALUES ('${content.submit}', ${story_id.id})`;
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



return router;
};
