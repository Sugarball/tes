var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/timestamp/:time', function(req, res, next) {
	var myDate;
	var reg = /^\d{8,}$/;
	if(reg.test(req.params.time)){
		myDate = moment(req.params.time, "X");
	}else{
		myDate = moment(req.params.time, "MMMM D, YYYY");
	}
	if(myDate.isValid()) {
    	res.json({unix: myDate.format("X"),natural: myDate.format("MMMM D, YYYY")});
  	}else{
    	res.json({unix: null,natural: null});
  }
});

router.get('/timestamp', function(req, res, next) {
  res.render('timestamp', { title: 'Express' });
});

router.get('/getip', function(req, res, next) {
	var ip = req.headers['x-forwarded-for'] || 
 	req.connection.remoteAddress || 
 	req.socket.remoteAddress ||
 	req.connection.socket.remoteAddress;

 	var lan = req.headers["accept-language"].split(',')[0];

 	var pc = req.headers['user-agent'].split(') ')[0].split(' (')[1];

  res.render('getip', {ip : ip, lan : lan, pc : pc});
});


router.get('/', function(req, res, next) {

  res.render('timestamp', { title: 'Express' });
});

module.exports = router;
