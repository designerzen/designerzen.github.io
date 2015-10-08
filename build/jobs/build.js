var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task( 'build', function(callback) {

	var config 		= require('../config');
	var options 	= config.build;
	options.sourceMaps 		= true;
	options.compress 		= false;

	console.log( "Building to " + options.destination );
	// 'clean',
	runSequence(
					[ 'jade', 'less', 'images', 'fonts','icons','scripts' ],
					'watch',
					callback);
});
