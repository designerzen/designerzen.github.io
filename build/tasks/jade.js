var gulp = require('gulp');

gulp.task('jade', function () {

	var config      = require('../config');
	var jade 		= require('gulp-jade');
	var data 		= require('gulp-data');
	var sourcemaps 	= require('gulp-sourcemaps');
	var path 		= require('path');
	var fs   		= require('fs');
	var gulpif 		= require('gulp-if');				// conditional compiles

	var options 	= config.build;
	var source 		= config.source;
	var destination = config.destinations[ options.destination ];

	return 	gulp.src( source.jade )

			/*
			// load our data file set in config
			.pipe(data(function(file) {
				// check to see if the file exists, if not revert to the main data file
				var fileName = source.json + path.basename(file.path, '.jade') + '.json';
				if ( fs.existsSync(fileName) )
				{
					// return JSON.parse( fs.readFileSync( './src/json/index.json') );
					return JSON.parse( fs.readFileSync( fileName ) );
				}
				// load in data from filename set in config
				return JSON.parse( fs.readFileSync(source.json + config.fileNames.data) );
			}))
			*/
			// save with source maps if debug mode
			.pipe( gulpif( !options.sourceMaps, sourcemaps.init() ) )
			// neatly formatted code
			.pipe( jade( { pretty:!options.compress, debug:false, compileDebug:false } ) )

			.on('error', function(err) {
                console.error( 'Error with Jade.js', err.message);
            })

			//.pipe(validator())
			.pipe( gulpif( !options.sourceMaps, sourcemaps.write() ) )
			.pipe( gulp.dest( destination.html ) );
});
