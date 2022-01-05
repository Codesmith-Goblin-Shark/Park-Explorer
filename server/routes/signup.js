const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js')

router.post('/',controller.signupUser, async (req, res) => {
    console.log('in signup.js router')
    res.status(200).json({user: res.locals.newUser})
});

module.exports = router;
