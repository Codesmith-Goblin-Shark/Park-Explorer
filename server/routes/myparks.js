const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js');

router.get('/:park', controller.searchPark, (req, res) => {
  // console.log('we are in myparks.js router', 'hello')
  console.log('in my parks park route');
  res.status(200).json({ parks: res.locals.park });
});

module.exports = router;
