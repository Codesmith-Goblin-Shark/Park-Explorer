const db = require('../models/db.js');

const controller = {};

controller.getPark = async (req, res, next)=> {
    const query = '';
    res.locals.park = await db.query(query);
    if (!res.locals.park){
        return next({
            log: 'getPark middleware failed',
            message: {err: 'Error querying from database'}
        })
    }
    next();
}





module.exports = controller;