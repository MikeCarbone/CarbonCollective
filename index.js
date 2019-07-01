const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const mongoKey = require('./private/keys.json').mongoURI;

const port = process.env.PORT || 3555;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const { fileParser } = require('express-multipart-file-parser');
app.use(fileParser({
	rawBodyOptions: {
			limit: '2mb',  //file size limit
	}
}));

mongoose
	.connect(mongoKey, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log('MongoDB Connection Error: ', err));

app.get('/', express.static(path.join(__dirname, 'client/public')));
app.use('/links', require('./controllers/LinksController'));
// app.use('/admin', require('./controllers/AdminController'));

app.listen(port, () => console.log(`Server runnning on port ${port}!`));