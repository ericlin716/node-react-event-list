var mongoose = require('mongoose'); 
var EventSchema = require('../schemas/event'); 
var EventBox = mongoose.model('EventBox', EventSchema); 

module.exports = EventBox;
