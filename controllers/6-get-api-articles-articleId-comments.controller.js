
const {
	getCommentById,
	doesArticleExists,
} = require('../models/7-fetch-api-articles-articleId-comments.model');

exports.getCommentArr = (req, res, next) => {
	const { article_id } = req.params;

	const promises = [getCommentById(article_id), doesArticleExists(article_id)];

	Promise.all(promises)
		.then(([comments]) => {
			res.status(200).send({ comments });
		})
		.catch((err) => {
			next(err);
		});
};
