const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js');

/* ADD NEW USER ROUTE */
router.post('/', controller.loginUser, controller.addUser, (req, res) => {
  console.log('in signup.js router');

  // If the client is attempting to add a new user, respond with JSON object indicating the user was successfully created.
  if (res.locals.userAlreadyExists === false) {
    res.status(200).json({ created: true, id: res.locals.id });
  } else {
    // If the client is attempting to add a user that already existed, respond with a JSON object indicating the user was not created.
    // See middleware controller.addUser for more detail. DB will not create a user if user already exists.
    res.json({ created: false });
  }
});

module.exports = router;
