/*

ENDPOINTs

users/
search/
domains/
categories/
oauth/
boards/
pins/
batch/
login/

?callback=Pinterest.parse

pins: Array[19]
user: Object__proto__: Object
generated_at: "Sun, 14 Jun 2015 14:36:10 +0000"
host: "coreapp-ngapi-346"message:
"ok"status:

*/
var WS = WS || {};
var Pinterest = function( )
{
    "use strict";

    var HOST = "https://",
        API = HOST + "api.pinterest.com/v3/",
        CALLBACK = "callback=Pinterest.parse";

    var route = "pidgets/users/designerzen/pins/",
        callback;

    var addScript = function( url ){
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = API + url+'?'+CALLBACK;
            document.getElementsByTagName('head')[0].appendChild(script);
        },
        format = function(data){
            var markup = JSON.stringify(data) + '';
            return data;
        },
        parse = function(data){
            //alert('pinterest!'+data.length);
            // callback with data!
            if ( data.status === "success" )
            {
                var pinterest = data.data;
                var pins = pinterest.pins;
                var user = pinterest.user;
                var date = pinterest.generated_at;
                console.table(pins);
                callback.apply( null, [format(pins)] );
            }else{
                console.error(data);
            }

        },
        load = function( options, callbackComplete, dateFormatterCallback ){
            callback = callbackComplete;
            addScript( route );
        };
    return {
        load:load,
        parse:parse
    }
}();

/*

Expose

*/
WS.Pinterest = Pinterest;
