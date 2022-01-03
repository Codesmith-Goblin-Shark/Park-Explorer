const db = require('../models/db.js');

const controller = {};

controller.searchPark = async (req, res, next) => {
  try{
    const {search} = req.body.search;
    const queryOne = `SELECT parks.park_name, parks.state_abbr, parks.latitude, parks.longitude, parks.image, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE states.state_name='${search}'`;
    // SELECT parks.park_name, parks.state_abbr, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE states.state_name='Maine'
    const queryTwo = `SELECT parks.park_name, parks.state_abbr, parks.latitude, parks.longitude, parks.image, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE states.state_abbrv='${search}'`;
    const queryThree = `SELECT parks.park_name, parks.state_abbr, parks.latitude, parks.longitude, parks.image, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE parks.park_name='${search}'`;
    let park = await db.query(queryOne);
    if (!park) {
      park = await db.query(queryTwo);
    }
    if (!park) {
      park = await db.query(queryThree);
    }
    if (!park) {
      return next({
        log: 'searchPark middleware failed',
        message: { err: 'Error querying from database' },
      });
    }
    res.locals.park = park;
    next();
  }
  catch (err) {
    res.sendStatus(400).json(err);
  }
};

controller.signupUser = async (req, res, next) => {
  const {firstname, lastname, email, password} = req.body
  const query = {
    text: `INSERT INTO users(firstname, lastname, email, password) VALUES ($1, $2, $3, $4)`,
    values: [firstname, lastname, email, password]
  };
  res.locals.park = await db.query(query);
  if (!res.locals.park) {
    return next({
      log: 'getPark middleware failed',
      message: { err: 'Error querying from database' },
    });
  }
  next();
};

module.exports = controller;
