const { fetchComments, fetchArticle } = require('../models/5-fetch-aticle-objects.model.js');

exports.getOrderedComments = (req, res, next) => {
	const { article_id } = req.params;
	fetchArticle()
		.then((articles) => {
			res.status(200).send({ articles });
		})
		.catch((err) => {
			next(err);
		});
};
