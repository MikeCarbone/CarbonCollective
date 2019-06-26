const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const mongoKey = require('./keys.json').mongoURI;

const port = process.env.PORT || 3555;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose
	.connect(mongoKey, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));


app.use('/links', require('./controllers/LinksController'));

app.listen(port, () => console.log(`Mike's repo server runnning on port ${port}!`));