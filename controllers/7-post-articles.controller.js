const { sendObject } = require('../models/7-post-articles.model.js')


exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  sendObject({ author: username, body, article_id })
    .then((comment) => {
      const response = {
        comment: {
          comment,
          article_id,
        },
      };
      res.status(201).json(response);
    })
    .catch((err) => {
      next(err);
    });
};