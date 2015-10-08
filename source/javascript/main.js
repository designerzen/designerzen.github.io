(function() {

	"use strict";

	// SETTINGS --------------------------------------------------

	// load in our external data from our web services...
	var LOAD_QUANTITY = 9,
		FONT_FAMILY = 'bebasregular',
		loadCount = 0,
		dataLoaded = false,

		menu,logo,

		gitHubUserName = 'designerzen',
		gitHubMarkup = '',

		twitterMarkup,
		twitterID = '603913907116318720',

		// 'yayesia',//
		lastfmUserName = 'xe54',
		lastfmUserKey = 'bf5be5cde15f69617c3718c40a912897',
		lastfmMarkup,

		flickrMarkup,
		flickrAPIKey,

		pinterestMarkup;

	// straight away create our preloader!
	FX.add( [ FX_GLOOP, FX_GOO, FX_BLUR, FX_SEPIA ] );

	// var allFX = FX.getFX();
	//console.error( allFX );
	// .getFilters()

	// Loader --------------------------------------------------
	var preloader = new Preloader(),
		onPreloaderStart = function(){
			console.log("BEGIN PRELOADER!");
		},
		onPreloaderComplete = function(){
			console.log("END PRELOADER!");
			//alert('latent bouncer?');
			// MAIN ANIMATION BEGINS HERE...
			menu;

			// reveal logo
			logo.start();
			preloader.destroy();

			document.body.className += 'loaded';
		},
		onPreloaderAnimated = function(){
			//preloader.explode( onPreloaderComplete );
			var duration = preloader.bounce( onPreloaderComplete );
			// animate menu!
			var menu = document.getElementById('main-menu');
			var menuItems = menu.getElementsByClassName('menu-item');
			var menuHeight = menu.offsetHeight;
			// first work out the height of the menu naturally...


			var menuAnimation = new TimelineMax(); // "auto"
			menuAnimation.fromTo( menu, duration*0.6, { height:2, autoAlpha:1 }, { height:menuHeight, ease:Elastic.easeOut }, duration*0.2 );
			menuAnimation.staggerFromTo( menuItems, duration, { autoAlpha:0, y:"+=12" }, { autoAlpha:1, y:0, ease:Elastic.easeOut }, 0.1, duration*0.8 );
			menuAnimation.set( menu, { height:"auto" } );
		};

	preloader.start( null, onPreloaderStart, onPreloaderAnimated );

	// Fonts --------------------------------------------------
	var fontLoaded = false,
		onFontFailed = function(){
			console.error('FONT FAILED!');
			loadCount++;
			onLoadCheck('fonts');
		},
		onFontLoaded = function(){
			if (fontLoaded) return;
			fontLoaded = true;
			loadCount++;
			onLoadCheck('fonts');
		};

	FontFaceOnload(FONT_FAMILY, {
	    success:onFontLoaded,
	    error:onFontFailed// in ms. Optional, default is 10 seconds, timeout: 5000
	});

	// Dates --------------------------------------------------
	// For advanced example which allows you to customize how tweet time is
	// formatted you simply define a function which takes a JavaScript date as a
	// parameter and returns a string!
	// See http://www.w3schools.com/jsref/jsref_obj_date.asp for properties
	// of a Date object.
	var now = new Date();  		//  Date.now();//
	var TIME = now.getTime(),
		TO_HOURS = 60*60*1000,
		TO_DAYS = 24*TO_HOURS;

	// Check : Is it daylight saving time in the UK?
	//t is the date object to check, returns true if daylight saving time is in effect.
	var isDST = function( date ) {
		    var jan = new Date(date.getFullYear(),0,1);
		    var jul = new Date(date.getFullYear(),6,1);
		    return Math.min(jan.getTimezoneOffset(),jul.getTimezoneOffset()) == date.getTimezoneOffset();
		},
		getGMT = function(){
			var localTime = new Date();
			var utc = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
			var offset = isDST(localTime)  ? 1 : 0;	//is daylight saving? or 1 or -1 ?
			return new Date( utc + (3600000*offset) );
		};

	function dateFormatter(date)
	{
		var clockOptions = {
			title : 'A Clock face displaying the time '+date.toString(),
			diameter : 128,
			showNumerals : true
		};
		// if it is over a few days old...
		var daysElapsed = (TIME - date.getTime()) / TO_DAYS;

		// if we aer between 0 -> 1 week 	: clock
		// if we are between 1 week + 		: show days
		// else 							: show calender
		var formatted;
		// Less than 7 days -> CLOCK
		if ( daysElapsed < 7 ) formatted = Clock.get( date, clockOptions );
		// if we are in the same year or not
		else if ( date.getYear() < now.getYear() ) formatted = Calender.getOld( date );
		// latest tweets!
		else formatted = Calender.getRecent( date, true );


		//formatted = Clock.get( date, clockOptions );
		//console.log('Elapsed '+daysElapsed+' days');
		// console.error(formatted);
		return formatted;
	}


	// Images -------------------------------------------------
	var loadImages = function(){
		console.log('Loading images...');
		var elem = document.querySelector('#main-content');
		var imgLoad = imagesLoaded( elem );

		var onAlways = function( instance ) {
		  	console.log('all images are loaded');
			loadCount++;
			onLoadCheck('images');
		};

		// bind with .on()
		imgLoad.on( 'always', onAlways );
		// unbind with .off()
		//imgLoad.off( 'always', onAlways );
		imgLoad.on( 'progress', function( instance, image ) {

		  	var result = image.isLoaded ? 'loaded' : 'broken';
		  // current percentage
			var percent = loadCount / LOAD_QUANTITY;
			var remaining = 1 - percent;
			//preloader.setProgress();

			console.log( 'image is ' + result + ' for ' + image.img.src );

		});
		//console.log( imgLoad );
	};

	// COMPLETED -------------------------------------------------

	var onLoaded = function(){

		dataLoaded = true;
		// make preloader complete!
		preloader.stop();

		// enable smooth scrolling
		smoothScroll.init();

		// reveal menu!
		//FX.setElementFilter( document.getElementById('main-clock') , 'blur(50%)' );
		//FX.setElementFilter( document.getElementById('widget-activity') , FX_GLOOP_ID );
		// FX.setElementFilter( document.getElementById('widget-activity') , 'blur(50%)' );

		// tell screen readers that we have updated the main content
		//aria-live="assertive"
		var main = document.querySelector('#main-content');
		main.setAttribute( "aria-live", "assertive");
		console.log('Data load completed!');
	};
	var inject = function( element, markup ){
		if ( !markup || markup.length < 1 )
		{
			element.innerHTML = "";
			element.className = "fail";
		}else{
			element.innerHTML += markup;
		}
		return element;
	};

	var onLoadCheck = function( type ){

		console.log('Data '+type+' loaded : '+(loadCount+1)+'/'+LOAD_QUANTITY );

		var percent = loadCount / LOAD_QUANTITY;
		preloader.setProgress( percent );

		if (loadCount === LOAD_QUANTITY-1 )
		{
			// populate twitter data
			// show or hide!

			// hide elements!
			var widgetTwitter = document.getElementById('widget-twitter'),
				widgetGitHub = document.getElementById('widget-github'),
				widgetLastFM = document.getElementById('widget-lastfm'),
				widgetFlickr = document.getElementById('widget-flickr'),
				widgetPinterest = document.getElementById('widget-pinterest'),
				widgets = [widgetTwitter,widgetGitHub,widgetLastFM,widgetFlickr,widgetPinterest];

			inject( widgetTwitter, twitterMarkup );
			inject( widgetGitHub, gitHubMarkup );
			inject( widgetLastFM, lastfmMarkup );
			inject( widgetFlickr, flickrMarkup );
			inject( widgetPinterest, pinterestMarkup );

			// now loop through twitter feed and hijack the links!

			var iframe = document.createElement('div');
			document.body.appendChild(iframe);
			//var frame = Frame.request('poo.com','poop');
			//inject( iframe, frame );

			var gits = widgetGitHub.getElementsByClassName('github--activity');
			for ( var t=0,q=gits.length; t<q;++t )
			{
				var git = gits[t];
				git.onclick = function(e){
					//alert('BOYO '+e);

					// determine type of intent...
					var srcElement = e.srcElement;

					srcElement.className += " pressed";

					e.preventDefault();
					return false;
				};
			}
/*
			var tweets = widgetTwitter.getElementsByClassName('tweet--intent');
			// loop through
			for ( var t=0,q=tweets.length; t<q;++t )
			{
				var tweet = tweets[t];
				tweet.onclick = function(e){
					//alert('BOYO '+e);

					// determine type of intent...
					var intent = 'reply';
					var srcElement = e.srcElement;
					var frame = Frame.request( srcElement.href, 'poop' );

					iframe.innerHTML = frame;
					console.error( srcElement );

					e.preventDefault();
					return false;
				};
			}
*/
			// animate elements!
			//TweenMax.staggerFrom( widgets, 4, {autoAlpha:0}, 2 )

			loadImages();

		} else if (loadCount === LOAD_QUANTITY ) {
			// pictures loaded after transclusion
			onLoaded();
		}
	};

	// Github --------------------------------------------------
	var onGithubEvents = function( data ){
		//console.log('github json load : ',data , this );
		// now create our view with our var
		gitHubMarkup += data;

		//console.log( 'GITHUB API ====== ' );
		///console.log( gitHubMarkup );	// <- ME!

		loadCount++;
		onLoadCheck('github');
	};

	GitHub.fetchPublicEvents( gitHubUserName, onGithubEvents, dateFormatter );
	GitHub.fetchPublicActivity( gitHubUserName, onGithubEvents, dateFormatter );
	// GitHub.fetchPublicReadme( gitHubUserName, '19353092', onGithubEvents, dateFormatter );
	//var github = new GitHub( gitHubUserName, onGithubActivity, dateFormatter );
	//console.log('Data loading '+github);

	// Twitter --------------------------------------------------


	var twitterConfig = {

		"id": twitterID,
		"domId": '',
		"maxTweets": 10,
		"lang": 'en',

		"enableLinks": true,

		"showUser": true,
		"showTime": true,
		"showImages": true,
		"showRetweet": false,
		"showInteraction": true,
		"showPermalinks": false,

		"dateFunction": dateFormatter,
		"customCallback": handleTweets
	};


	function handleTweets(tweets)
	{
		var x = tweets.length;
	    var n = 0;
	   	var html = '<ul><h3>Tweets</h3>';
	    while(n < x) {
	      html += '<li>' + tweets[n] + '</li>';
	      n++;
	    }
	    html += '</ul>';
		twitterMarkup = html;

		loadCount++;
		onLoadCheck('twitter');
	}


	//twitterFetcher.fetch( twitterConfig );

	var onTweets = function(data){
		twitterMarkup = data;
		//console.error(data);
		loadCount++;
		onLoadCheck('tweets');
	};
	Tweets.load( twitterID, 'en', onTweets, dateFormatter );
	//console.error(Tweets.load);


	// Last.fm --------------------------------------------------
	var onLastFMActivity = function(data)
	{
		lastfmMarkup = data;
		loadCount++;
		onLoadCheck('last.fm');
	};
	var lastfm = new LastFM( lastfmUserName, lastfmUserKey, onLastFMActivity, 60 );





	// Flickr --------------------------------------------------
	var onFlickrData = function(data)
	{
		flickrMarkup = data;
		loadCount++;
		onLoadCheck('flickr');
	};
	var flickr = new Flickr( { tags:'logo' }, onFlickrData, dateFormatter );



	// Pinteest --------------------------------------------------
	var onPinterestData = function(data)
	{
		console.table( data );
		//flickrMarkup = data;
		loadCount++;
		onLoadCheck('pinterest');
	};
	Pinterest.load( {  }, onPinterestData, dateFormatter );


	var setupClock = function(){
		// element, date, diameter, title, id
		var gmt = getGMT();
		// undefined, 500, undefined, "main-clock"
		var clockOptions = {
			id : "dynamic-clock",
			title : "The Current time in London",
			diameter : 100,
			showNumerals : true
		};
		// create a new element in the DOM?
		var mainClock = Clock.create( document.getElementById('main-clock'), gmt, clockOptions );
		setInterval( function(){ mainClock.set( getGMT() ) }, 1000 );
	};


	// ideally we want the GITHUB widget to ONLY show if scrolled more than a viewport!
	window.onload = function(){

		setupClock();

		// fetch the height of our menu!

		// create our menu based on the nav...
		menu = new FX.menu();
		menu.create( document.getElementById('main-menu').children[0] );

		// logo
		logo = new Logo();




		var didScroll = false;

		window.onscroll = function () {
		    didScroll = true;
		};

		setInterval(function() {
		    if(didScroll)
			{
		        didScroll = false;
		        // do stuff
				// check to see if we have scrolled below our threshold...
				var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		    	// if ( scrollY > viewportHeight ) show github
			}
		}, 100);



		// JS Finished loading into memory,
		// all variables and methods are Available
		// So let us add that as a loading factor

		loadCount++;
		onLoadCheck('javascript');
	};

})();
