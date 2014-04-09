var lib = require('./lib');
/*
 * GET home page.
 */

exports.index = function(req, res){
  	res.render('index', { title: '#Currently trending' });
};
exports.trending = function(req, res){
	lib.get_trend(function(data){
		res.render('trending',{ 
			title	: '#Currently trending',
			results : data})}
	)
}
exports.search = function(req, res){
	var query = req.query.q
	lib.search(query,function(data){
		if (typeof data != 'undefined') {
			res.render('trending',{ 
				title	: '#Results',
				results : data})}
		else{
			res.render('trending',{ 
				title	: '#Results'
			})}
		}
	)
}
