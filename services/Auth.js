// Verify token
function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		const bearerToken = bearerHeader.split(' ')[1];
		
		req.token = bearerToken;

		next();

	} else {
		return res.status(403).send({"error": "Not authorized!"})
	}
}

module.exports = verifyToken;