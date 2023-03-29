const {fetchArticle} = require('../models/fetch-api-article.model');

exports.getArticle =(req, res, next) => {
 fetchArticle()
		.then((articles) => {
			res.status(200).send({ articles });
		})
		.catch((err) => next(err));
};

