const db = require('../db/connection');

exports.updateObject = (id, data) => {
	if (isNaN(data.inc_votes))
		return Promise.reject({ status: 400, msg: 'Invalid Format' });
	return db
		.query(
			'UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *',
			[data.inc_votes, id]
		)
		.then(({ rows }) => {
			if (rows.length) return rows[0];
			else return Promise.reject({ status: 404, msg: 'ID Not Found' });
		});
};