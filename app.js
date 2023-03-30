const express = require('express')
const {getTopics} = require('./controllers/3-get-topics.controller');
const {
	getArticleById,
} = require('./controllers/4-get-article-by-id-controller');
const { getOrderedComments } = require('./controllers/5-get-comment.controller');
const {getCommentArr} = require('./controllers/6-get-api-articles-articleId-comments.controller')
const { postComment } = require('./controllers/7-post-articles.controller.js');
const { patchComment } = require('./controllers/8-patch-articles.controller');


const {
	handleCustomErrors,
	handlePSQL400s,
	handle500Statuses,
	errorMessage,
} = require('./controllers/error-handling.controller');

const app = express();
app.use(express.json())

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getOrderedComments);
app.get('/api/articles/:article_id/comments', getCommentArr);
app.post('/api/articles/:article_id/comments', postComment);
app.patch('/api/articles/:article_id', patchComment);

app.all('/*', errorMessage);

app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handle500Statuses);


module.exports = app; 