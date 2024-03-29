/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
const express = require("express");
const app = express();
const env = require("dotenv").config();
const staticRoutes = require("./routes/static");
const expressLayout = require("express-ejs-layouts");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const accountRoute = require('./routes/accountRoute');
const errorRoute = require("./routes/errorRoute");
const session = require("express-session");
const pool = require('./database/');
const utilities = require('./utilities/')
const bodyParser = require("body-parser")


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "./layouts/layout"); // not at views root


/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',  
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
});

app.get('/favicon.ico', (req, res) => res.status(204));


/* *********************** a
 * Routes
 *************************/
app.use(staticRoutes);
// Index route
app.get('/', utilities.handleErrors(baseController.buildHome));
// All Other Routes
app.use("/inv", inventoryRoute);
app.use("/errors", errorRoute); 
app.use("/account", accountRoute);
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})



/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("error", {
    title: err.status || 'Server Error',
    message,
    nav,
  })
})
/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;


/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
