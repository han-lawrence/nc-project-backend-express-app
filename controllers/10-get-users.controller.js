const { fetchUsers } = require('../models/10-fetch-users.model.js');

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((data) => {
      const users = data.rows;
      res.status(200).send({ users });
    })
    .catch((err) => next(err));
};
