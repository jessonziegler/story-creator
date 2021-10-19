
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
    console.log(req.body);
    let query = `INSERT INTO stories (content, title) VALUES($1, $2);`;
    db.query(query, [req.body.content, req.body.title])
      .then(() => {
        /* const newStoriesTitle = req.body.title;
        const newStoriesContent = req.body.content;
        res.json({newStoriesTitle, newStoriesContent}); */
        const stories = req.body;
        res.json({ stories });
      });

    res.send("so far,so good")
  })
  return router;
};

/*console.log(req.body);
    let query = `INSERT INTO stories (stories.content, stories.title) VALUES($1, $2);`;
    db.query(query, [stories.title, stories.content])
      .then((data) => {
        /* const newStoriesTitle = req.body.title;
        const newStoriesContent = req.body.content;
        res.json({newStoriesTitle, newStoriesContent}); */
        //const stories = data.rows;
       // res.json({ stories });
   //   });



