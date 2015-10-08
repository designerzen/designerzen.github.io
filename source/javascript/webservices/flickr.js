var WS = WS || {};

// Fetch latest public photos using the tag XXX

var Flickr = function( options, callback, dateFormatterCallback )
{
    "use strict";

    var HOST = "https://",
        API = HOST + "api.flickr.com/services/rest/";

    var request,
        //method = "flickr.photos.getSizes",
        method = options.method || "flickr.photos.search",
        route = "?";

    // sanitise data
    var apiKey = options.apiKey || '5dd211320e4e065e2dffe2d8525599c1',
        userID = options.userID || "29715296@N02",
        galleryID =  options.galleryID || "72157629519344856",
        tags = options.tags || '';

    // Routes to select from
    route += "method="+method;
    route += "&format=json&";
    route += "&api_key="+apiKey;
    route += "&user_id="+userID;
    route += "&tags="+tags;
    //route += "&in_gallery="+galleryID;
    route += "&nojsoncallback=1";

    /*
    The letter suffixes are as follows:
    s	small square 75x75
    q	large square 150x150
    t	thumbnail, 100 on longest side
    m	small, 240 on longest side
    n	small, 320 on longest side
    -	medium, 500 on longest side
    z	medium 640, 640 on longest side
    c	medium 800, 800 on longest side†
    b	large, 1024 on longest side*
    h	large 1600, 1600 on longest side†
    k	large 2048, 2048 on longest side†
    o	original image, either a jpg, gif or png, depending on source format

    * Before May 25th 2010 large photos only exist for very large original images.
    † Medium 800, large 1600, and large 2048 photos only exist after March 1st 2012.

    */
    var createImageURL = function( farmID, serverID, photoID, secret, type ){
        var url = "http://farm"+farmID+".staticflickr.com/"+serverID+"/";
        var size = 'z';
        //"{id}_{secret}.jpg"
        //"{id}_{secret}_[mstzb].jpg"
        //"{id}_{o-secret}_o.(jpg|gif|png)"
        return url + photoID+'_'+secret+'_'+size+'.'+( type || "jpg" );
    };

    var createImage = function( url ){
        var markup = "<img src='"+url+"'>";
        return markup;
    };

    // "url: "https:
    var formatDate = function( date ){
        // check to see if we have a data callback here...
        if (dateFormatterCallback) return dateFormatterCallback.call( this, date );
        return date.toString();
    };

    /*
    farm: 9
    id: "7358471372"
    isfamily: 0
    isfriend: 0
    ispublic: 1
    owner: "29715296@N02"
    secret: "d1d473596b"
    server: "8006"
    title: "dreamCapturer"
    */
    var format = function(json){
        var markup = '<ul class="flickr">';
        if (json.stat === "ok")
        {
            var photos = json.photos.photo;
            console.table( photos );
            for (var i=0,l=photos.length; i<l;++i)
            {
                // farmID, serverID, photoID, secret
                var photo = photos[i],
                    url = createImageURL( photo.farm, photo.server, photo.id, photo.secret ),
                    image = createImage( url );

                // console.error( image );
                markup += "<li class='flickr--item'>";
                markup += "<figure class='flickr--figure'>";
                markup += image;

                markup += "<figcaption class='flickr--caption'>";
                markup += photo.title;
                markup += "</figcaption>";
                
                markup += "</figure>";
                markup += "</li>";
            }
        }else{
            console.error( 'Flickr data empty' );
        }

        markup += '</ul>';
        return markup;
    }

    request = new XMLHttpRequest();
    request.open('GET', API + route, true);
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
}

/*

Expose

*/
WS.Flickr = Flickr;
