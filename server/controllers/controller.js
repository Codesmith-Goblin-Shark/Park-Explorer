const db = require('../models/db.js');

const controller = {};

controller.searchPark = async (req, res, next) => {
  console.log('controller is hit', req.params.park)

  try {
    const park = req.params.park;
    // const {search} = req.body;
    const queryOne = `SELECT parks.park_name, parks.state_abbr, parks.latitude, parks.longitude, parks.image, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE LOWER(states.state_name)='${park}' OR (states.state_name)='${park}'`;
    // SELECT parks.park_name, parks.state_abbr, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE states.state_name='Maine'
    const queryTwo = `SELECT parks.park_name, parks.state_abbr, parks.latitude, parks.longitude, parks.image, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE LOWER(states.state_abbr)='${park}' OR (states.state_abbr)='${park}'`;
    const queryThree = `SELECT parks.park_name, parks.state_abbr, parks.latitude, parks.longitude, parks.image, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE LOWER(parks.park_name) LIKE'%${park}%' OR (parks.park_name)='%${park}%'`;
    let result = await db.query(queryOne);
    if (result.rows.length === 0) {
      result = await db.query(queryTwo);
    }
    if (result.rows.length === 0) {
      result = await db.query(queryThree);
    }
    if (result.rows.length === 0) {
      return next({
        log: 'searchPark middleware failed',
        message: {
          err: `Could not find any national parks related to ${park}`,
        },
      });
    }
    res.locals.park = result.rows;
    next();
  } catch (err) {
    res.status(400).json(err, 'this is where i\'m at');
  }
};

controller.signupUser = async (req, res, next) => {
  console.log('signupUser controller is hit');
  try {
    // INSERT INTO users (firstname, lastname, email, encrypted_password) VALUES ('amy', 'liang', 'abc@gmail.com', 'test');
    const { firstname, lastname, email, password } = req.body;
    // const query = {
    //   text: `INSERT INTO users (firstname, lastname, email, encrypted_password) VALUES ($1, $2, $3, $4)`,
    //   values: [firstname, lastname, email, password]
    // };\
    console.log(req.body)
    const query = `INSERT INTO users (firstname, lastname, email, encrypted_password) VALUES ('${firstname}', '${lastname}', '${email}', '${password}')`;
    const newUser = await db.query(query);
    // console.log(res.locals.newUser);
    if (!newUser.command) {
      return next({
        log: 'signupUser middleware failed',
        message: { err: 'Error signing up for a new account' },
      });
    }
    res.locals.newUser = newUser;
    next();
  } catch (err) {
    console.log(err)
    next(err);
  }
};

controller.loginRouter = async (req, res, next) => {
  console.log('loginUser controller is hit');
  try {
    // const email = req.params.email;
    // const password = req.params.password;
    const { email, password } = req.body;
    // const password = req.params.password;

    const emailQuery = `SELECT users.firstname FROM users WHERE email='${email}' AND encrypted_password='${password}'`;

    if (!emailQuery)
      // return res.status(400).send('No user found with this email address ');
      res.locals.isLoggedIn = false;
    else {
      // if (password !== password)
      //   res.send('Username or password is incorrect. Please try again');
      res.locals.isLoggedIn = true;
      // else {
      //   direct('/myParks');
      //   res.send('Success').re;
      // }
    }
    next();
  } catch (err) {
    res.sendStatus(500).json(err);
  }
};

controller.addFav = async (req, res, next) => {
  try {
    const park = req.params.park;
    const email = req.params.email;
    const queryOne = `SELECT users.id FROM users WHERE email='${email}'`;
    // const queryTwo = `SELECT parks.id, parks.park_name FROM parks WHERE park_name='${park}'`;
    const queryTwo = `SELECT parks.park_name FROM parks WHERE park_name='${park}'`;

    const resultOne = await db.query(queryOne);
    const resultTwo = await db.query(queryTwo);

    // const queryThree = `INSERT INTO user_parks (user_id, parks_id) VALUES('${resultOne.rows[0].id}', '${resultTwo.rows[0].id}')`;
    const queryThree = `INSERT INTO user_parks (user_id, park_name) VALUES('${resultOne.rows[0].id}', '${resultTwo.rows[0].park_name}')`;

    const resultThree = await db.query(queryThree);
    // console.log(res.locals.newUser);
    // if (!newUser.command) {
    //   return next({
    //     log: 'signupUser middleware failed',
    //     message: { err: 'Error signing up for a new account' },
    //   });
    // }
    res.locals.fav = resultThree;
    next();
  } catch (err) {
    res.sendStatus(400).json(err);
  }
};

controller.deleteFav = async (req, res, next) => {
  try {
    const park = req.params.park;
    const email = req.params.email;
    const queryOne = `SELECT users.id FROM users WHERE email='${email}'`;
    // const queryTwo = `SELECT parks.id, parks.park_name FROM parks WHERE park_name='${park}'`;
    const queryTwo = `SELECT parks.park_name FROM parks WHERE park_name='${park}'`;

    const resultOne = await db.query(queryOne);
    const resultTwo = await db.query(queryTwo);

    // const queryThree = `INSERT INTO user_parks (user_id, parks_id) VALUES('${resultOne.rows[0].id}', '${resultTwo.rows[0].id}')`;
    const queryThree = `DELETE FROM user_parks WHERE user_id='${resultOne.rows[0].id}' AND park_name='${resultTwo.rows[0].park_name}'`;

    const resultThree = await db.query(queryThree);
    // console.log(res.locals.newUser);
    // if (!newUser.command) {
    //   return next({
    //     log: 'signupUser middleware failed',
    //     message: { err: 'Error signing up for a new account' },
    //   });
    // }
    res.locals.deleted = resultThree;
    next();
  } catch (err) {
    res.sendStatus(400).json(err);
  }
};

module.exports = controller;
