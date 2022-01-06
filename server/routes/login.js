const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js');

/* LOGIN USER ROUTE */
router.post('/', controller.loginUser, controller.checkPassword, (req, res) => {
  console.log('in loginRouter');
  // res.status(200).json({ isLoggedIn: res.locals.isLoggedIn });

  // If the client can be authenticated using the email/password combination,
  // respond with a JSON object with properties: isloggedIn: 'true', id: res.locals.id
  if (res.locals.clearance === true) {
    res.status(200).json({ isloggedIn: true, id: res.locals.id });
  } else {
    res.json({ isloggedIn: false });
  }
});

module.exports = router;
