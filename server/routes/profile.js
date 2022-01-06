const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller.js')

router.post('/addFav', controller.addFav, async (req, res) => {
    console.log('in signup.js router')
    res.status(200).json(res.locals.reply);
});

router.delete('/delete/:email/:park', controller.deleteFav, async (req, res) => {
    console.log('in signup.js router')
    res.status(200).json({deleted: res.locals.deleted})
});

module.exports = router;
