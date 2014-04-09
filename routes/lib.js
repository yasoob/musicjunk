
/*
 * GET users listing.
 */
var request = require('request');

function search(query,callback){
	var _search = 'http://ex.fm/api/v3/song/search/'+query+'?start=0&results=60';
	request.get(_search,function(req,res,body){
		if (typeof body == 'undefined'){
			callback()
		}
		try {
			results = JSON.parse(body)['songs'];
		} catch(e) {
			callback();
		}
		parse_it(results,callback);
	});
}

function parse_it(results,callback){
	var parsed = []
	for (var i in results){
		if(results[i]['url'].indexOf("api.soundcloud.com") != -1){
			var url = results[i]['url']+"?consumer_key=leL50hzZ1H8tAdKCLSCnw";
			console.log(url);
		} else {
			var url = results[i]['url'];
		}
	 	parsed.push({
	 		'title' : results[i]['title'],
	 		'url' : url,
	 		'album' : results[i]['album'],
	 		'artist' : results[i]['artist'],
	 		'img'	: results[i]['image']['medium']
	 });
	};
	callback(parsed);
}

function get_trend(callback){
	var _search = 'http://ex.fm/api/v3/trending?start=0&results=20'
	request.get(_search,function(req,res,body){
		try {
			results = JSON.parse(body)['songs'];
		} catch(e) {
			callback();
		}
		parse_it(results,callback);
	});
}

module.exports = {	
	get_trend 	: get_trend,
	search 		: search
}
