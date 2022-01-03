const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js')

router.get('/:park',controller.searchPark, async (req, res) => {
    // console.log('we are in myparks.js router', 'hello')
    res.status(200).json({park: res.locals.park})
});

module.exports = router;