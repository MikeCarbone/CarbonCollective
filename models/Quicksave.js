const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const Quicksave = new Schema({
	url: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quicksave', Quicksave);