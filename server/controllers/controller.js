const db = require('../models/db.js');

const controller = {};

controller.searchPark = async (req, res, next) => {
  // console.log('controller is hit')
  try {
    const park = req.params.park
    // const {search} = req.body;
    const queryOne = `SELECT parks.park_name, parks.state_abbr, parks.latitutde, parks.longitude, parks.image, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE states.state_name='${park}'`;
    // SELECT parks.park_name, parks.state_abbr, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE states.state_name='Maine'
    const queryTwo = `SELECT parks.park_name, parks.state_abbr, parks.latitutde, parks.longitude, parks.image, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE states.state_abbr='${park}'`;
    const queryThree = `SELECT parks.park_name, parks.state_abbr, parks.latitutde, parks.longitude, parks.image, states.state_name FROM parks JOIN states on parks.state_abbr= states.state_abbr WHERE parks.park_name LIKE'%${park}%'`;
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
        message: { err: `Could not find any national parks related to ${park}` },
      });
    }
    res.locals.park = result.rows;
    next();
  }
  catch (err) {
    res.sendStatus(400).json(err);
  }
};

controller.signupUser = async (req, res, next) => {
  const {firstname, lastname, email, password} = req.body;
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
