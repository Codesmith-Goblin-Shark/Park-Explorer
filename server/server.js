require('dotenv/config'); // require the dotenv/config at beginning of file
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const db = require('./models/db.js');
const cors = require('cors');
const controller = require('./controllers/controller.js');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Passport config
// require('../config/passport.js')(passport);

/* REQUIRE ROUTERS */
// const parksRouter = require('./routes/parks');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const myParksRouter = require('./routes/myparks');
const profileRouter = require('./routes/profile');
// const parkInfoRouter = require('./routes/parkinfo');

/* ROUTES */
app.use('/login', loginRouter);
app.use('/users/new', signupRouter);
app.use('/myparks', myParksRouter);
app.use('/api/users', profileRouter);
// app.use('/parks/:id', parkInfoRouter);

/* SERVE INDEX HTML */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

/* EXPRESS-SESSION MIDDLEWARE */
app.use(
  session({
    secret: 'keyboard cat',
    resave: false, //dont save session if nothing is modified
    saveUninitialized: true, //dont create session until something is stored
  })
);

app.get('/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

/* PASSPORT MIDDLEWARE */
app.use(passport.initialize());
app.use(passport.session());

/* ALL OTHER ENDPOINTS */
app.get('*', (req, res) => {
  res.sendStatus(404);
});

/* GLOBAL ERROR HANDLER */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  console.log(err);
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  // should the method be send or json here like the commented out below
  // res.status(errorObj.status).json(errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});

/* LISTEN PORT */
app.listen(PORT, () => console.log(`Listening on port ${PORT}.\nMake sure the postgres server is running.`));

module.exports = app;
