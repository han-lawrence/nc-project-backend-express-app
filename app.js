const db = require('./db/connection');
const seed = require('./db/seeds/seed');
const express = require('express')
const {getTopics} = require('./controllers/get-topics.controller');
const { getArticleById } = require('./controllers/get-article-by-id-controller.js');
const app = express();
const {errorMessage} = require('./controllers/error-handling.controller')

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);

app.all('/*', errorMessage);


module.exports = app; 