var express = require('express');
var router = express.Router();
var Event = require('../src/models/event')

router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'React Event List'
	});
});

router.get('/getAllEventItems', (req, res, next) => {
	Event.find({}).sort({'date': -1}).exec((err, eventList) => {
		if (err) {
			console.log(err);
		}else {
			res.json(eventList);
		}
	})
});

router.post('/addEventItem', (req, res, next) => {
	let item = req.body;
	Event.create(item, (err) => {
		if (err) {
			console.log(err);
		}else {
			Event.find({}, (err, eventList) => {
				if (err) {
					console.log(err);
				}else {
					res.json(eventList);
				}
			});
		}
	})
});

router.put('/updateEventItem', (req, res, next) => {
	let {_id, title, description, startTime, endTime, category} = req.body;
	let item = {
		title,
		description,
		startTime,
		endTime,
		category
	};
	Event.findByIdAndUpdate(_id, item, (err) => {
		if (err) {
			console.log(err);
		}else {
			Event.find({}, (err, eventList) => {
				if (err) {
					console.log(err);
				}else {
					res.json(eventList);
				}
			});
		}
	})
});

router.delete('/deleteEventItem', (req, res, next) => {
	console.log(req.body);
	let item = req.body
	Event.remove(item, (err, result) => {
		if (err) {
			console.log(err)
		}else {
			res.json(result);
		}
	});
});

module.exports = router;