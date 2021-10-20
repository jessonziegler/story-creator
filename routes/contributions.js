const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    let query = `SELECT * FROM contributions`;
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


router.post("/", (req, res) => {
  console.log("console log from stories.js " + JSON.stringify(req.body));
  const id = req.body[""]
  const content = req.body.submit
  const query = `INSERT INTO contributions (contribution, stories_id) VALUES ('${content}', '${id}')`; //user_id hard-coded will get after login is set
  db.query(query)
    .then(data => {
      console.log(data.rows)
      res.status(201).send()
      // const stories = data.rows;
      // res.json({ stories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
return router;
};
