const db = require('../db/connection');

exports.updateObject = (body) => {
  console.log(body)
	return db
		.query(
			`UPDATE comments 
    SET votes = votes+$1
    WHERE article_id = $2
    RETURNING *;`, 
		[ body.inc_votes, body.article_id]
		)
		.then(({ rows }) => {
			console.log(rows[0]);
			return rows[0];
		});
};