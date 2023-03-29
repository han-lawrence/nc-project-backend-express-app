const { fetchTopics } = require('../models/3-fetch-topics.models');

function getTopics(req, res, next) {
	fetchTopics()
		.then((topics) => {
			res.status(200).send({ topics });
		})
		.catch((err) => next(err));
}

module.exports = { getTopics };
