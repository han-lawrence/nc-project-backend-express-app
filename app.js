const db = require('./db/connection');
const seed = require('./db/seeds/seed');
const express = require('express')
const {getTopics} = require('./controllers/get-topics.controller');
const app = express();
const {errorMessage} = require('./controllers/error-handling.controller')

app.get('/api/topics', getTopics);

app.all('/*', errorMessage);


module.exports = app; 