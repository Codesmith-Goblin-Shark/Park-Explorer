const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv').config(path.resolve(__dirname, '../../config/config.env'));
// console.log('this is dotenv', dotenv);

const PG_URI = 'postgres://rxhoxumv:UrEvgrn3hkBXk2gy8U5bsmPMqXGpNbaS@castor.db.elephantsql.com/rxhoxumv'; // ENTER elephantSQL link here
// const PG_URI = process.env.PG_URI; // ENTER elephantSQL link here

const pool = new Pool({
  connectionString: PG_URI
});

// Schema for the database can be found below:
// https://docs.google.com/spreadsheets/d/1cbGHavCOYNW9dGgxL1qengdcZUp_8MIkxhllcXzOsGM/edit#gid=0
// or in the 'schema.sql' file 

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
