const { updateObject } = require("../models/8-fetch-patch-articles.model");

exports.updateComment = (req, res, next) => {
	const { article_id } = req.params;
	const { inc_votes } = req.body;

	updateObject({ inc_votes, article_id })
		.then((comment) => {
      console.log(comment)
			res.status(203).json(comment);
		})
		.catch((err) => {
			console.error(err);
		});
};
