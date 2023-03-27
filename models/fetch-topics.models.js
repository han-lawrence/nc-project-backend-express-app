const db = require('../db/connection');


const fetchTopics = () => {
	const query = `SELECT * FROM topics;`;
  return db.query(query).then((result) => {
		return result.rows
	});
		
};

module.exports = { fetchTopics };
