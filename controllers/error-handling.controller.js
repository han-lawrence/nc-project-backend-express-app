
exports.errorMessage = (req, res) => {
	res.status(404).send({ msg: 'Incorrect File Path' });
};

exports.handlePSQL400s = (err, req, res, next) => {
	let statusCode;
	let errorMsg;

	if (err.code === '22P02') {
		statusCode = 400;
		errorMsg = 'Invalid ID';
	} else if (err.code === '23502') {
		statusCode = 400;
		errorMsg = 'Invalid format';
	} else if (err.code === '23503') {
		if (err.constraint === 'comments_article_id_fkey') {
			statusCode = 404;
			errorMsg = 'ID not found';
		} else {
			statusCode = 404;
			errorMsg = 'Username not found';
		}
	}

	if (statusCode) {
		res.status(statusCode).send({ msg: errorMsg });
	} else {
		next(err);
	}
};

exports.handleCustomErrors = (err, req, res, next) => {
	const { status, msg } = err;
	if (status && msg) {
		res.status(status).send({ msg });
	} else {
		next(err);
	}
};

exports.handle500Statuses = (err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: 'Server Error' });
};