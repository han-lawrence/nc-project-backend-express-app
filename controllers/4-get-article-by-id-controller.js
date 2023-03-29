const { selectArticle } = require('../models/4-fetch-article-id-model.js');

exports.getArticleById = (req, res, next) => {
	const { article_id } = req.params;
	selectArticle(article_id)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch((err) => {
			next(err);
		});
};


