const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js')

router.post('/', async (req, res) => {
    res.status(200).json({user: res.locals.signup})
});

module.exports = router;