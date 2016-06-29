var express = require('express');
var router = express.Router();
var https = require("https");
var google = require('google')

var recentList = [];
var imageList = [{"url":"http://data.whicdn.com/images/26316317/large.png","snippet":"... image include: cat, funny, ...","thumbnail":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ0fy2dGumdeAae-orrRQMRTun237hKKSNiRc8yvj6iqF2du1R1xNQdrifZ","context":"http://weheartit.com/entry/group/718100"},{"url":"https://i.ytimg.com/vi/dWpGC6Fg0io/hqdefault.jpg","snippet":"... LOLCats Funny Cats","thumbnail":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRNMCLSl2dHm87xTU6uMFZD0Jym2E-4lAaSdJzfc_6OkeB_CdF1vjgZZsR2","context":"https://www.youtube.com/watch?v=dWpGC6Fg0io"},{"url":"https://s-media-cache-ak0.pinimg.com/736x/95/1f/90/951f903b1fc9339765d99c5bc1a2da16.jpg","snippet":"More Funny Caption Animal ...","thumbnail":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSiKgGYTRaapXeR9yWuXD2Uc2qhl1bSnETrmg9D0vXWhbiykyT4KocvgFw","context":"https://www.pinterest.com/pin/420734790164012040/"},{"url":"http://s2.favim.com/orig/33/cat-funny-lol-lolcats-mean-Favim.com-261389.jpg","snippet":"cat, funny, lol, lolcats, mean","thumbnail":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTjH2_3xIIzquPGN-GVgivEQ1Ib4T9W9mCRjcYBsvLNB-e_aWb213o2-qo4","context":"http://favim.com/image/261389/"},{"url":"https://s-media-cache-ak0.pinimg.com/564x/35/7e/ff/357effc414856ff1d0b645de26c2518b.jpg","snippet":"... animals, lolcats, funny","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0XispciRDyGCdLQzhhJQp1AkuP6yMXGQlY8mBiK04bYuJUzB13XMBfE3","context":"https://in.pinterest.com/pin/427067977144904653/"},{"url":"http://www.bajiroo.com/wp-content/uploads/2013/06/funny-lol-cats-fun-pics-images-photos-pictures-3.jpg","snippet":"2 funny-lol-cats-fun-pics- ...","thumbnail":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQQguTW_IeeqCkfQYXoUWN_mvVdCTEvcXRwojat4XouvoTlXMDKzUnJ1wCP","context":"http://www.bajiroo.com/2013/06/33-funniest-lolcats-ever/"},{"url":"https://s-media-cache-ak0.pinimg.com/736x/3b/03/24/3b032489f20bd075d9c914963c7342c2.jpg","snippet":"funny animal memes, animal ...","thumbnail":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ1Mp8QuaR4xkLUtuWKQqLMGpD57qlnf8MihSo4uTiKYfE6X7F9fMEAq9A","context":"https://www.pinterest.com/pin/433541901602529793/"},{"url":"http://www.petpinz.com/wp-content/uploads/2014/11/iminyourfoyerheadreadingurmindlolcatsfunnycats-flickr-photo-sharing-1415503826g8nk4.jpg","snippet":"im-in-your-foyer-head-reading- ...","thumbnail":"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSdOZbTDI3dTEsm0vPIwKCvco3yU8ScxFoCvB89DCRCZzDtm-j04g8gmrg","context":"http://www.petpinz.com/pin/im-in-your-foyer-head-reading-ur-mind-lolcats-funny-cats/"},{"url":"https://s-media-cache-ak0.pinimg.com/564x/bc/32/f3/bc32f3896ebe6cfc48d489f5e7674d7a.jpg","snippet":"... #lolcats funny cats: Crazy ...","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx-E2_REo5pS35JFNxsvMQphUAc49ILjIc3LcgksfHnfTfHJTLT3UXN_I","context":"https://in.pinterest.com/pin/556546466425330016/"},{"url":"http://data.whicdn.com/images/12853824/large.jpg","snippet":"lolcat and tattoo image","thumbnail":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRJpQlUkzQqIAwbF0IcDPQygyPm9pBKYNk84wuVmAiSBK6zB985-XqC3N8","context":"http://weheartit.com/entry/12853824"}];

router.get('/recent', function(req, res, next) {
	if(recentList.length > 10)recentList.shift();
	var list = recentList;
	list = list.reverse();
  	res.json(list);
});

/* GET users listing. */
router.get('/:query', function(req, response, next) {
	var query = req.params.query;
	var offset = req.query.offset || 10;
	google.resultsPerPage = offset;
	//google suck
	// google(query, function (err, res){
	//   if (err) console.error(err)
	//   console.log("res",res);	
	//   response.json(res);
	// })
	recentList.push({term : query, when : Date.now()});

	console.log("recentList",recentList)
	setTimeout(function(){
		response.render("imagelist",{list : imageList});
	},2000);
});




router.get('/', function(req, res, next) {
  res.render('image');
});


module.exports = router;
