var WS = WS || {};

var LastFM = function( username, key, callback, limit )
{
    "use strict";
    limit = limit || 50;
    var request;
    var FALLBACK_IMAGE ='images/png/record.png';
    var API = "http://ws.audioscrobbler.com/2.0/";
    var method = "user.getRecentTracks";
    var route = "method="+method;
    route += "&user="+username;
    route += "&api_key="+key;
    route += "&limit="+limit;
    route += "&format=json";

    /*

    @attr: Objectalbum: Object
    artist: Objectimage: Array[4]
    mbid: "09870c38-cc5e-4aab-b679-373e68d5699d"
    name: "Blue Bucket of Gold"streamable: "0"
    url: "http

    */
    var format = function( data, size )
    {
        var tracks = data.recenttracks.track;
        var models = [], model;
        var markup = '<ul>';
        var albums = {};
        size = size || 3;

        var t, len=tracks.length;

        // here we create our little models...
        // one thing we do before
        for( t=0; t < len; ++t )
        {
            var track = tracks[t];
            model = {
                album : track.album['#text'],
                artist : track.artist['#text'],
                title : track.name,
                url : track.url,
                // array of image objects where each index is a different size
                image : track.image[size]['#text'] || FALLBACK_IMAGE
            };

            // now we need to check to see if any of our models share the same album...
            // see if our artist array exists...
            if ( albums.hasOwnProperty( model.album ) )
            {
                // check to see if this song already exists...
                if ( albums[ model.album ].indexOf(model) === -1 ) albums[ model.album ].push( model );
                else console.log('Duplicate track');
            }else{
                albums[ model.album ] = [ model ]
            };

            //console.error( albums[ model.album ]  );
            //models.push(model);
        }
        // now loop through each album...
        for ( var albumName in albums)
        {
            var album = albums[albumName];
            model = album[0];
            //console.error( model );
            var item = '<li class="lastfm--item">';
            item += '<header>';
            item += '<h5><span class="lastfm--album">'+model.album+'</span> by <span class="lastfm--artist">'+model.artist+'</span></h5>';
            item += '</header>';
            item += '<figure class="lastfm--figure">';
            item += '<img class="lastfm--image" src="'+model.image+'"></img>';
            item += '<figcaption>'+model.album+'</figcaption>';
            item += '</figure>';
            item += '<ul class="lastfm--songs">';
            // loop through songs!
            // each album is an array of models!
            for (var a=1, l=album.length; a<l; ++a)
            {
                model = album[a];
                item += '<li class="lastfm--song">'+model.title+'</li>';
            }

            item += '</ul>';
            item += '<p class="lastfm--album">From the album '+model.album+'</p>';
            markup += item;
        }
        /*
        for( t=0; t < len; ++t )
        {
            model = models[t];
            var item = '<li class="lastfm--track">';
            item += '<figure class="lastfm--image" src="'+model.image+'">';
            item += '<img class="lastfm--frontcover" src="'+model.image+'">';
            item += '</figure>';
            item += '<header>';
            item += '<h5>'+model.artist+'</h5>';
            item += '<h6>'+model.title+'</h6>';
            item += '</header>';
            item += '<p>From the album '+model.album+'</p>';
            item += '</li>';
            markup += item;
        }*/
        markup += '</ul>';
        return markup;
    }

    request = new XMLHttpRequest();
    request.open('GET', API + '?' + route, true);

    request.onload = function()
    {
        if (request.status >= 200 && request.status < 400)
        {
            // Success!
            var data = JSON.parse(request.responseText);
            callback.apply( null, [format(data)] );
        } else {
            // We reached our target server, but it returned an error ;(
            callback.apply( null, [null] );
        }
        request = null;
    };

    request.onerror = function(e)
    {
        // There was a connection error of some sort
        callback.apply( null, [null,e] );
        request = null;
    };

    request.send();
};

/*

Expose

*/
WS.LastFM = LastFM;
