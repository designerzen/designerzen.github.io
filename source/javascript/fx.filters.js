
/*

grayscale
very fast

sepia
very fast

saturate
very fast

hue-rotate
fast

invert
very fast

opacity
can be slow

brightness
fast

contrast
fast

blur
slow unless accelerated

drop-shadow
can be slow

// added as such
FX.setElementFilter( element , "blur(50%)" );

*/

// This is a class that allows filters to be added and removed
//var FX = FX || {};

var filters = [];

var filterMarkup = function( id, defs )
{
    // defs is either a string or an array...
    return '<filter id="'+id+'">'+defs+'</filter>';
};


// These are the FX that we transclude into DOM and reference in CSS
var fxGloop = '';
fxGloop += '<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />';
fxGloop += '<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />';
fxGloop += '<feComposite in="SourceGraphic" in2="goo" operator="atop"/>';
var FX_GLOOP_ID = 'fx-goo';
var FX_GLOOP = filterMarkup( FX_GLOOP_ID, fxGloop );

var fxGoo = '';
fxGoo += '<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />';
fxGoo += '<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />';
var FX_GOO_ID = 'fx-goo';
var FX_GOO = filterMarkup( FX_GOO_ID, fxGoo );


var fxPosterize = '';
fxPosterize += '<feComponentTransfer>';
fxPosterize += '<feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1"/>';
fxPosterize += '<feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1"/>';
fxPosterize += '<feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1"/>';
fxPosterize += '</feComponentTransfer>';
var FX_POSTERIZE_ID = 'fx-posterize';
var FX_POSTERIZE = filterMarkup( FX_POSTERIZE_ID, fxPosterize );


var fxBlur = '<feGaussianBlur in="SourceGraphic" stdDeviation="4,0" />';
var FX_BLUR_ID = 'fx-blur';
var FX_BLUR = filterMarkup( FX_BLUR_ID, fxBlur );


var fxSepia = '<feColorMatrix type="matrix" values=".343 .669 .119 0 0 .249 .626 .130 0 0 .172 .334 .111 0 0 .000 .000 .000 1 0 "/>';
var FX_SEPIA_ID = 'fx-sepia';
var FX_SEPIA = filterMarkup( FX_SEPIA_ID, fxSepia );
/*

return {

    createFilter:function( name, type ){

    },

    getFilters:function(){
        return filters;
    }

}
*/
