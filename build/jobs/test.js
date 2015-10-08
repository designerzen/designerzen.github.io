var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task( 'test', function(callback) {

	var config 		= require('../config');
	var options 	= config.build;

	options.sourceMaps 		= true;
	options.compress 		= false;

	console.log( "Test Building to " + options.destination );

	runSequence( [ 'jade', 'less', 'images', 'fonts','icons','scripts' ],
					callback);
});
