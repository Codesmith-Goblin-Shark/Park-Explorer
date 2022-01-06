const controller = {};
const bcrypt = require('bcryptjs');

/* CONSTANTS */

const db = require('../models/db.js');
const SALT_WORK_FACTOR = 10;

/* SEARCH PARKS MIDDLEWARE */
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
    console.log('this is result', result.rows)
    res.locals.park = result.rows;
    next();
  } catch (err) {
    console.log('searchpark error');
    res.sendStatus(400).json(err);
  }
};

// LOGIN USER FUNCTION //
// controller.loginRouter = async (req, res, next) => {
//   console.log('loginUser controller is hit');
//   try {
//     const { email, password } = req.body;

//     const emailQuery = `SELECT users.firstname FROM users WHERE email='${email}' AND encrypted_password='${password}'`;

//     if (!emailQuery) res.locals.isLoggedIn = false;
//     else {
//       res.locals.isLoggedIn = true;
//     }
//     next();
//   } catch (err) {
//     res.sendStatus(500).json(err);
//   }
// };

/* LOGIN USER MIDDLEWARE */
controller.loginUser = async (req, res, next) => {
  console.log('loginUser controller is hit');

  const { email, password } = req.body;

  // Make an asynchronous call to the database to check whether that username exists.
  const userSelect = `SELECT * from users WHERE email='${email}'`;

  try {
    const queryUser = async () => {
      await db.query(userSelect, (err, result) => {
        if (err) {
          return next({
            log: 'error encountered in loginUser',
            message: {
              err: `error encountered in loginUser: ${err}`,
            },
          });
        } else {
          // if the user exists, then get the associated password and name from the result object (if it exits)

          if (result.rows.length) {
            res.locals.foundUser = true;
            res.locals.encrypted_password = result.rows[0].encrypted_password;
            res.locals.email = result.rows[0].email;
            res.locals.id = result.rows[0].id;

            return next();
          } else {
            // If we didn't hit an error and didn't find the user in the database, save fact that user wasn't found to a variable.
            res.locals.foundUser = false;
            return next();
          }
        }
      });
    };
    await queryUser();
  } catch (error) {
    return next({
      log: 'error encountered in loginUser',
      message: { err: `error encountered in loginUser: ${error}` },
    });
  }
};

/* CHECKPASSWORD USER MIDDLEWARE */
controller.checkPassword = async (req, res, next) => {
  console.log('checkPassword controller is hit');

  const { password } = req.body;
  // Compare req.body.password to hashed password in the DB.
  bcrypt.compare(password, res.locals.encrypted_password, (err, response) => {
    // console.log(password, res.locals.encrypted_password);
    if (response === true) {
      console.log('email and hashed pass match!');
      res.locals.clearance = true;
    } else {
      res.locals.clearance = false;
    }
    return next();
  });
};

// CREATE NEW USER FUNCTION //
// controller.signupUser = async (req, res, next) => {
//   console.log('signupUser controller is hit');

//   try {
//     const { firstname, lastname, email, password } = req.body;

//     console.log(req.body);

//     // FIND USER BY EMAIL QUERY //
//     // const findEmailQuery = `SELECT * FROM users WHERE email = '${email}'`;

//     // FIND USER BY EMAIL QUERY FUNCTION //
//     // const foundUser = await db.query(findEmailQuery);
//     // console.log(foundUser);
//     // if (foundUser.rowCount > 0) {
//     //   // res.send(`user with emai: '${email}' already exists`);
//     //   // res.locals.email = email;
//     //   // res.json({email: email});
//     //   return next({
//     //     log: `user with emai: '${email}' already exists`,
//     //     message: { err: `user with emai: '${email}' already exists` },
//     //   });
//     // }

//     // INSERT USER QUERY STRING //
//     const insertQuery = `INSERT INTO users (firstname, lastname, email, encrypted_password) VALUES ('${firstname}', '${lastname}', '${email}', '${password}')`;

//     // INSERT USER QUERY FUNCTION //
//     const newUser = await db.query(insertQuery);
//     console.log(newUser);
//     if (!newUser.command) {
//       return next({
//         log: 'signupUser middleware failed',
//         message: { err: 'Error signing up for a new account' },
//       });
//     }
//     res.locals.newUser = newUser;
//     next();
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

/* ADD NEW USER MIDDLEWARE */
controller.addUser = async (req, res, next) => {
  console.log('addUser controller is hit');

  const { firstname, lastname, email, password } = req.body;

  // If the user already exists --> set variable so indicating, and return to the route.
  if (res.locals.foundUser === true) {
    res.locals.userAlreadyExists = true;
    return next();
  } else if (res.locals.foundUser === false) {
    // If the user doesn't exist yet, create it (hashing and saving its password.)
    res.locals.userAlreadyExists = false;

    // HASH PASSWORD //
    res.locals.encrypted_password = await bcrypt.hash(password, SALT_WORK_FACTOR);

    // INSERT USER QUERY STRING //
    const insertQuery = `INSERT INTO users (firstname, lastname, email, encrypted_password) VALUES ('${firstname}', '${lastname}', '${email}', '${res.locals.encrypted_password}') RETURNING id`;

    // INSERT USER QUERY FUNCTION //
    try {
      const createUser = async () => {
        await db.query(insertQuery, (err, result) => {
          if (err) {
            return next({
              log: 'error encountered in addUser',
              message: { err: `error encountered in addUser: ${err}` },
            });
          } else {
            console.log(`Successfully created new user for email ' + ${email}`);
            console.log(result);
            res.locals.id = result.rows[0].id;
            return next();
          }
        });
      };
      await createUser();
    } catch (error) {
      return next({
        log: 'error encountered in addUser',
        message: { err: `error encountered in addUser: ${error}` },
      });
    }
  } else {
    return next();
  }
};

/*************** */
// ADD FAV PARK FUNCTION (needs work) //
controller.addFav = async (req, res, next) => {
  console.log('addFav fired');
  try {
    //take user id and park name from request
    //find all matches in favorites table
    //if favorite column is false change to true
    //if no results, add favorite
    const { userID, parkName } = req.body;
    const findQuery = `
      SELECT * FROM favorites
      WHERE user_id = '${userID}'
      AND park_name = '${parkName}';`;
    const insertQuery = `
      INSERT INTO public.favorites(user_id, park_name, favorite) 
      VALUES ('${userID}', '${parkName}', 'true')
      RETURNING favorite;`;
    const changeQuery = `
      UPDATE favorites
      SET favorite = 'true'
      WHERE user_id = '${userID}'
      AND park_name = '${parkName}'
      RETURNING favorite;`;
    res.locals.results = await db.query(findQuery);
    if (res.locals.results.rows.length > 0) {
      res.locals.reply = await db.query(changeQuery);
      return next();
    } else if (res.locals.results.rows == 0) {
      res.locals.reply = await db.query(insertQuery);
      return next();
    } else {
      return next({
        log: 'addFav middleware failed',
        message: { err: 'User or park not found' },
      });
    }

    /*
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
    */
  } catch (err) {
    console.log('addFav err fired');
    // console.log(err)
    // res.sendStatus(400).json(err);
    return next({
      log: 'addFav middleware failed',
      status: 400,
      message: { err: `User or park not found: ${err}` },
    });
  }
};

// DELETE FAV PARK FUNCTION (needs work) //
controller.deleteFav = async (req, res, next) => {
  console.log('deleteFav fired');
  try {
    const { userID, parkName } = req.body;
    const findQuery = `
      SELECT * FROM favorites
      WHERE user_id = '${userID}'
      AND park_name = '${parkName}';`;
    const insertQuery = `
      INSERT INTO public.favorites(user_id, park_name, favorite) 
      VALUES ('${userID}', '${parkName}', 'false')
      RETURNING favorite;`;
    const changeQuery = `
      UPDATE favorites
      SET favorite = 'false'
      WHERE user_id = '${userID}'
      AND park_name = '${parkName}'
      RETURNING favorite;`;
    res.locals.results = await db.query(findQuery);
    if (res.locals.results.rows.length > 0) {
      res.locals.reply = await db.query(changeQuery);
      return next();
    } else if (res.locals.results.rows == 0) {
      res.locals.reply = await db.query(insertQuery);
      return next();
    } else {
      return next({
        log: 'deleteFav middleware failed',
        message: { err: 'User or park not found' },
      });
    }
  } catch (err) {
    console.log('deleteFav err fired');
    // console.log(err)
    // res.sendStatus(400).json(err);
    return next({
      log: 'deleteFav middleware failed',
      status: 400,
      message: { err: `User or park not found: ${err}` },
    });
  }
  // try {
  //   const park = req.params.park;
  //   const email = req.params.email;
  //   const queryOne = `SELECT users.id FROM users WHERE email='${email}'`;
  //   // const queryTwo = `SELECT parks.id, parks.park_name FROM parks WHERE park_name='${park}'`;
  //   const queryTwo = `SELECT parks.park_name FROM parks WHERE park_name='${park}'`;

  //   const resultOne = await db.query(queryOne);
  //   const resultTwo = await db.query(queryTwo);

  //   // const queryThree = `INSERT INTO user_parks (user_id, parks_id) VALUES('${resultOne.rows[0].id}', '${resultTwo.rows[0].id}')`;
  //   const queryThree = `DELETE FROM user_parks WHERE user_id='${resultOne.rows[0].id}' AND park_name='${resultTwo.rows[0].park_name}'`;

  //   const resultThree = await db.query(queryThree);
  //   // console.log(res.locals.newUser);
  //   // if (!newUser.command) {
  //   //   return next({
  //   //     log: 'signupUser middleware failed',
  //   //     message: { err: 'Error signing up for a new account' },
  //   //   });
  //   // }
  //   res.locals.deleted = resultThree;
  //   next();
  // } catch (err) {
  //   console.log('deletefav err fired');
  //   res.sendStatus(400).json(err);
  // }
};

module.exports = controller;
