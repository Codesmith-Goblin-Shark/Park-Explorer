require('dotenv/config'); // require the dotenv/config at beginning of file
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => console.log(`Listening on port ${port}.\nMake sure the postgres server is running.`));
