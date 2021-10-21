const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    res.clearCookie("users.id");
    res.redirect('/api/login');
  });

  return router;
};
