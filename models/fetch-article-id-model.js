const db = require('../db/connection');

exports.selectArticle = (article_Id) => {
	return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_Id])
		.then((article) => {
      if (article.rowCount === 0){
        return Promise.reject({ status: 404, msg: 'Invalid ID'})
      }
			 return article.rows[0];
		});
  
};
