const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const mongoKey = require('./keys.json').mongoURI;

const port = process.env.PORT || 3555;
const app = express();

const Link = require('./models/Link');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose
	.connect(mongoKey, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// app.get('/', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
// });

app.get('/links', (req, res) => {
  Link.find().sort({dateAdded: -1}).then(links => {
    res.status(200).send(links);
  });
});

app.post('/links', (req, res) => {
  const { body: {title, url, tags, description} } = req;
  
  Link.create({
    title,
    url,
    tags,
    description
  }).then(data => {
    res.status(200).send({
      "success": data
    });
  });
});

app.listen(port, () => console.log(`Mike's repo server runnning on port ${port}!`));