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
  },
  opinion: {
    type: String
  },
  source: {
    type: String
  },
  related: {
    type: String
  },
  slug: {
    type: String,
    unique: true
  },
  imageUrl: {
    type: String
  },
  isPrivate: {
    type: Boolean
  }
});

module.exports = mongoose.model('Link', Link);