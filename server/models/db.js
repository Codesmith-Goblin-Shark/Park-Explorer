const { Pool } = require('pg');

const PG_URI = '' // ENTER elephantSQL link here

const pool = new Pool({
  connectionString: PG_URI
});

// Schema for the database can be found below:
// https://docs.google.com/spreadsheets/d/1cbGHavCOYNW9dGgxL1qengdcZUp_8MIkxhllcXzOsGM/edit#gid=0

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
      return pool.query(text, params, callback);
  },
};
