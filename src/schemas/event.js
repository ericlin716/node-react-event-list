var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Event = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  }
}, { collection: 'event' });

module.exports = Event;