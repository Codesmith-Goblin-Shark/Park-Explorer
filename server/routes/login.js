const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js');

router.post('/', controller.loginRouter, async (req, res) => {
  console.log('in loginRouter');
  res.status(200).json({ isLoggedIn: res.locals.isLoggedIn });
});

module.exports = router;
