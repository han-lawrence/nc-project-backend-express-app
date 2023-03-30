const { updateObject } = require("../models/8-fetch-patch-articles.model");

exports.patchComment = (req, res, next) => {
    const {article_id} = req.params;
    const {body} = req;
    return updateObject(article_id, body)
    .then(article =>res.status(200).send({article}))
    .catch(next);
}
