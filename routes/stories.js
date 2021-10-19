
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
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


  // POST /products
  router.post('/', (req, res) => {
    const {title, content} = req.body;
    db.createStoryElement(title, content)
      .then(() => {
        // res.redirect('/products');
        // res.status(201).send();
        res.json({ success: true });
      });
  });



  return router;
};




