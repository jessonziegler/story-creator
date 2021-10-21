// load .env data into process.env
require("dotenv").config();

const cookieSession = require('cookie-session')
// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


//cookie-session setting key
app.use(cookieSession({
  name: 'session',
  keys: ['SomeKey']
}))

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const storiesRoutes = require("./routes/stories");
const contributionsRoutes = require("./routes/contributions");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/api/stories", storiesRoutes(db));
app.use("/api/contributions", contributionsRoutes(db));
app.use("/api/login", loginRoutes(db));
app.use("/logout", logoutRoutes());

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  console.log('1st one good')
  console.log('Cookies: ', req.cookies['users.id'])
  const user_id = req.cookies['users.id'];
  console.log(user_id);
  console.log(typeof user_id);
  tempVar = {user_id};

  if (user_id !== 'undefined' && user_id !== undefined) {
    const values = [user_id];
    db.query(`SELECT * FROM USERS WHERE id = $1`, values)
    .then((data)=>{
      const user_name = data.rows[0]['users.name'];
      tempVar.user_name = user_name;
    res.render("index", tempVar);
    });
  } else {
    res.redirect('/api/login');
  }
});

app.get('/checklogin', (req, res) => {
  res.send(req.session.user_id);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
