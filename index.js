const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const verify = require('./services/Auth');
const { fileParser } = require('express-multipart-file-parser');

const port = process.env.PORT || 3555;
const app = express();





// ---
// Keys
// ---

const keys = require('./private/keys.json');
const mongoKey = keys.mongoURI;
const jwtKey = keys.jwtKey;
const adminUser = keys.adminUser;
const adminPass = keys.adminPass;




// ---
// Utilities
// ---

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(fileParser({
	rawBodyOptions: {
			limit: '2mb',  // Image file size limit
	}
}));





// ---
// Db Connect
// ---

mongoose
	.connect(mongoKey, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log('MongoDB Connection Error: ', err));





// ---
// Data Routes
// ---

app.get('/', express.static(path.join(__dirname, 'client/public')));
app.use('/api/links', require('./controllers/LinksController'));





// ---
// Auth Routes
// ---

app.post('/api/login', (req, res) => {
	const { username, password } = req.body;

	if (username === adminUser && password === adminPass){
		jwt.sign({ username }, jwtKey, {expiresIn: "1h"}, (err, token) => {
			res.json({ token });
		});
	} else {
		return res.status(403).send({"error": "Incorrect login"});
	}
});

app.post('/api/authenticate', verify, (req, res) => {
	jwt.verify(req.token, jwtKey, err => {
    if (err) {
      return res.status(403).send({"error": "User not authorized."});
    } else {
			return res.status(200).send({"success": "User is authenticated."});
		}
  });
});





app.listen(port, () => console.log(`Server runnning on port ${port}!`));