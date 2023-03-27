const { selectArticle } = require('../models/fetch-article-id-model.js');

exports.getArticleById = (req, res) => {
	const { article_id } = req.params;
	selectArticle(article_id)
		.then((article) => {
			if (!article) {
				res.status(404).send({ msg: 'Invalid ID' });
			} else {
				res.status(200).send({ article });
			}
		})
		.catch((err) => {
			res.status(400).send({ msg: 'Invalid ID' });
		});
};


