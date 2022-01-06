const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js')

router.post('/getFavs', controller.getFavs, async (req, res) => {
    console.log('in profile.js router');
    res.status(200).json(res.locals.results.rows);
});

router.post('/addFav', controller.addFav, async (req, res) => {
    console.log('in profile.js router')
    res.status(200).json(res.locals.reply);
});

router.delete('/deleteFav', controller.deleteFav, async (req, res) => {
    console.log('in profile.js router')
    res.status(200).json(res.locals.reply);
});

module.exports = router;
