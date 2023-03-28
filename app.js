const express = require('express')
const {getTopics} = require('./controllers/get-topics.controller');
const { getArticleById } = require('./controllers/get-article-by-id-controller.js');
const { getArticle } =require('./controllers/get-api-articles.controller')
const {
	handleCustomErrors,
	handlePSQL400s,
	handle500Statuses,
  errorMessage
} = require('./controllers/error-handling.controller');
const app = express();



app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticle);

app.all('/*', errorMessage);

app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handle500Statuses);


module.exports = app; 