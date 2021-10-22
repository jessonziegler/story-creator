const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const user_id = req.cookies['users.id'];
    const userId = [user_id];
    let query = (`SELECT contribution FROM contributions WHERE stories_id = stories.${userId}`);
    db.query(query)
      .then(data => {
        const contributions = data.rows;
        res.json(contributions, userId);
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
  const story_id = req.params
  const content = req.body; //passing an object
  let query = `INSERT INTO contributions (contribution, stories_id) VALUES ('${content.submit}', ${story_id.id})`;

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

router.delete("/:id", (req, res) => {
  const story_id = req.cookies['users.id'];
  const userId = story_id;
  let query = `DELETE FROM stories WHERE stories_id = ${userId.id}`;
  db.query(query)
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

return router;
};
