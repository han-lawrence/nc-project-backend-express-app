const db = require('../db/connection');

exports.deleteCommentById = (id) => {
	return db.query('DELETE FROM comments WHERE comment_id = $1', [id]);
};

exports.checkCommentIsPresent = (id) => {
	return db
		.query('SELECT * FROM comments WHERE comment_id = $1', [id])
		.then(({ rows }) => {
			if (!rows.length)
				return Promise.reject({ status: 404, msg: 'ID not found' });
		});
};
