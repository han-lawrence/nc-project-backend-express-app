const {deleteCommentById, checkCommentIsPresent} = require('../models/9-delete-comment.model')

exports.deleteComment = (req, res, next) => {
	const { comment_id } = req.params;
	return checkCommentIsPresent(comment_id)
		.then(() => deleteCommentById(comment_id))
		.then(() => res.status(204).send())
		.catch(next);
};
