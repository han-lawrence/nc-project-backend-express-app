const db = require('../db/connection');

exports.getCommentById = (articleID) => {
	return db
		.query(
			`SELECT comment_id, votes, created_at, author, body, article_id
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;`,
			[articleID]
		)
		.then((result) => {
			return result.rows;
		});
};

exports.doesArticleExists = (article_id) => {
	return db
		.query(
			`SELECT * FROM articles
    WHERE article_id = $1;`,
			[article_id]
		)
		.then((result) => {
			if (result.rowCount === 0) {
				return Promise.reject({
					status: 404,
					msg: 'Article not found',
				});
			}
		});
};
