const db = require('../db/connection');

exports.selectArticle = (article_Id) => {
	return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_Id])
		.then((article) => {
			return article.rows[0];
		});
};
