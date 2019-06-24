const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const Link = new Schema({
	url: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Link', Link);