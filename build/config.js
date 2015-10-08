var SOURCE_FOLDER 				= './source';				// Source files Root
var BUILD_FOLDER 				= './www';				// Where the initial build occurs (debugable)
var DISTRIBUTION_FOLDER 		= './dist';				// Once debugging is complete, copy to server ready files here

var SQUISH						= false;				// Compress?
var SOURCE_MAPS					= true;					// Source maps for less and js?

var JAVASCRIPT_FILE_NAME		= 'main.js';			// What should the concatted js file be called?
var JAVASCRIPT_LIBS_FILE_NAME	= 'libs.js' ;			// What should the concatted js file be called?


var fileTypes = {
	images:'png|jpg|jpeg|gif|webp|svg|cur',
	icons:'ico|png|jpg|jpeg|gif|webp|svg|json|xml',
	fonts:'svg|eot|woff|woff2|ttf|otf'
};

// Where shall we compile them to?
var structure = {
	scripts : 'javascripts',
	styles 	: 'stylesheets',
	html 	: '',
	images	: 'images',
	icons	: '',
	fonts	: 'fonts'
};

// Where shall we compile them to?
var getDestinations = function( dir, assetSubFolder ) {
	var divider = !!assetSubFolder ? '/' + assetSubFolder + '/' : '/';
	return {
		root 	: dir,
		html 	: dir + '/' + structure.html,
		scripts : dir + divider + structure.scripts,
		styles 	: dir + divider + structure.styles,
		images	: dir + divider + structure.images,
		icons	: dir + divider + structure.icons,
		fonts	: dir + divider + structure.fonts,
		maps	: './maps'
	};
};


module.exports =
{
	source :{
		less:		[SOURCE_FOLDER+'/less/base.less',SOURCE_FOLDER+'/less/style.less'],
		//less:		SOURCE_FOLDER+'/less/test.less',
		jade:		SOURCE_FOLDER+'/jade/*.jade',
		images:		SOURCE_FOLDER+'/images/**/*.+('+fileTypes.images+')',
		icons:		SOURCE_FOLDER+'/icons/**/*.+('+fileTypes.icons+')',
		fonts:		SOURCE_FOLDER+'/fonts/**/*.+('+fileTypes.fonts+')',
		scripts:	[
			// Cross Platform Event System
			SOURCE_FOLDER+'/javascript/vendor/*.js',
			SOURCE_FOLDER+'/javascript/webservices/*.js',
			SOURCE_FOLDER+'/javascript/fx.js',
			SOURCE_FOLDER+'/javascript/fx.*.js',
			SOURCE_FOLDER+'/javascript/components/*.js',
			SOURCE_FOLDER+'/javascript/main.js'
		],
		json:		SOURCE_FOLDER+'/json/'
	},

	watch :{
		less:		SOURCE_FOLDER+'/less/*.less',
		jade:		SOURCE_FOLDER+'/jade/**/*.jade',
		images:		SOURCE_FOLDER+'/images/**/*.+('+fileTypes.images+')',
		icons:		SOURCE_FOLDER+'/icons/**/*.+('+fileTypes.icons+')',
		fonts:		SOURCE_FOLDER+'/fonts/**/*.+('+fileTypes.fonts+')',
		scripts:	SOURCE_FOLDER+'/javascript/**/*.js',
		json:		SOURCE_FOLDER+'/json/*.json'
	},

	destinations:{
		// Where shall we create the building / debug versions
		build : 		getDestinations( BUILD_FOLDER ),
		// Where shall we create the final output
		distribution : 	getDestinations( DISTRIBUTION_FOLDER )
	},

	fileNames:{
		scripts:JAVASCRIPT_FILE_NAME
	},

	browserSync: {
		// Browsersync includes a user-interface that is accessed via a separate port.
		// The UI allows to controls all devices, push sync updates and much more.
		ui: {
			port: 8080
		},
		// Serve files from the app directory with directory listing
		server: {
			// Serve up our build folder
			// You cancelBubble have Mulitpiles like [ here , here , here ]
			baseDir: BUILD_FOLDER,
			directory: true
		},
		// Use a specific port (instead of the one auto-detected by Browsersync)
		port: 303,

		// Clicks, Scrolls & Form inputs on any device will be mirrored to all others.
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		},
		// Or switch them all off in one go
		// ghostMode: false

		// this should change depending on the task!
		logLevel: "debug",
		logPrefix:"Log"
	},

	// -- Do not change, these are set by the command line --
	build:{
		destination:'build',
		sourceMaps:SOURCE_MAPS,
		compress:SQUISH
	}
};
