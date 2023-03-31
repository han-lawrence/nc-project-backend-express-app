const db = require('../db/connection');

exports.sendObject = (body) => {
	return db
		.query(
			`INSERT INTO comments(article_id, author, body)
    VALUES ($1, $2, $3) RETURNING *;`,
			[body.article_id, body.author, body.body]
		)
		.then(({ rows }) => {
			return rows[0];
		});
};
