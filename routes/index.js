var express = require('express');
var router = express.Router();
var moment = require('moment');

var urlList = [];

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


router.get('/shorturl/:url*', function(req, res, next) {
	// req.params res.json({unix: null,natural: null});
	var url = req.url.slice(10);
	if(validateURL(url)){
		if(urlList.length > 100)urlList = [];
		urlList.push(url);
		res.json({
			original_url: url,
			natural: "https://timestamp-sugarball.herokuapp.com/gourl/" + (urlList.length -1)
		})
	}else{
		res.json({error : "invalid url"});
	}
});

router.get('/shorturl', function(req, res, next) {
  res.render('shorturl');
});

router.get('/gourl/:index', function(req, res, next) {
	if(parseInt(req.params.index) < urlList.length){
		res.redirect(urlList[req.params.index]);
	}else{
		res.json({error : "no shoturl saved"});
	}
  
});


router.get('/', function(req, res, next) {

  res.render('timestamp', { title: 'Express' });
});

function validateURL(url) {
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
}

module.exports = router;
