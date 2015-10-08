var Frame = function(){

    var counter = 0;
    // simply opens an iFrame with a URL inside it.
    // you can hijack javascript clicks and send them here in a kinda ajaxy way...
    var request = function(url,name){
        var id = "frame_"+counter;
        // so create our iFrame!
        var markup = '<div id="'+id+'" class="iframe"> ';
        // remove node
        var closure = "console.log('poop');";
        closure += "var e=document.getElementById('"+id+"');";
        closure += "e.parentNode.removeChild(e);";
        closure += "return false;";

        // href="#"
        markup += '<a nohref class="iframe--close" onclick="'+closure+'" >Close</a>';
        markup += '<iframe src="'+url+'" name="'+name+'" seamless></iframe>';
        markup += '</div> ';

        return markup;
    };

    // takes a request and displays it on an element
    var inject = function( element ){
        // close any that are open...
        
        // activate the close!
    };

    return {
        request:request
    }
}();
