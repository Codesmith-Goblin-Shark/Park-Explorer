const { Pool } = require('pg');

const connectionString = 'postgres://udrgaake:ziEUvTyVs87gBt_XyhctdZ6mGFCMSlpR@castor.db.elephantsql.com/udrgaake';

const pool = new Pool({
  connectionString
});

module.exports = pool;
