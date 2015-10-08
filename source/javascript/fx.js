(function ( root, factory ) {

    if ( typeof exports === 'object' ) {
        // CommonJS like
        module.exports = factory(root, root.document);

    } else if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( function() { return factory( root, root.document ); });

    } else {
        // Browser global
        root.FX = factory( root, root.document );
    }

}( typeof window !== "undefined" ? window : this, function ( window, document ) {

    "use strict";

    // Minified shortcuts
    var getElementById = function( id ){ return document.getElementById( id ); };

    var
        body = document.body,
        style,
        sheet,
        defs,
        fxElement,

        hasInjected = false,

        filterIncludes = '',
        filterData = {};


    // CSS ============================================================
    var CSS_HIDDEN = 'visibility:hidden;overflow:hidden:width:0;height:0;padding:0;margin:0';
    var REGEX_ID = /id="([^"]+)"/;
//
    ///////////////////////////////////////////////////////////////////
    // Create and apply our syle proxy - only ever do this once!
    ///////////////////////////////////////////////////////////////////
    var createInternalStyleSheet = function()
    {
        var styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        // WebKit hack :(
        styleSheet.appendChild(document.createTextNode(""));
        document.getElementsByTagName('head')[0].appendChild(styleSheet);
        return styleSheet;
    };

    // POLYFILL : Adds a rule to the style element provided
    // Add a SINGLE Rule to our style sheeet
    // This rule can have as many parameters as you want but they must
    // be concantanated into a string
    var addRule = function( name, rule )
    {
        if(!(style.sheet||{}).insertRule) (style.styleSheet || style.sheet).addRule(name, rule);
        else style.sheet.insertRule(name+"{"+rule+"}",0);
    };

    // add JSON of CSS rules at one level
    // eg. { 'color':'pink', 'background-color':'black' }
    var addRules = function( name, rules )
    {
        var ruleString = '';
        for ( var rule in rules ) ruleString += rule + ':' + rules[rule] +';' ;
        addRule( name, ruleString );
    };


    var addCSSRule = function( selector, rules)
    {
        //Backward searching of the selector matching cssRules
        var index = sheet.cssRules.length-1;
        for(var i=index; i>0; i--)
        {
            var currentStyle = sheet.cssRules[i];
            if(currentStyle.selectorText === selector)
            {
                //Append the new rules to the current content of the cssRule;
                rules= currentStyle.style.cssText + rules;
                sheet.deleteRule(i);
                index=i;
            }
        }
        if(sheet.insertRule)
        {
            sheet.insertRule(selector + "{" + rules + "}", index);
        } else{
            sheet.addRule(selector, rules, index);
        }
        return sheet.cssRules[index].cssText;
    };

    var addClassName = function( element, name )
    {
        if (element.classList) element.classList.add(name);
        else element.className += ' ' + name;
    };


    ///////////////////////////////////////////////////////////////////
    // eg. createClass( '.whatever',"background-color: green;" );
    // eg. createClass( '.whatever',{"background-color": "green"} );
    ///////////////////////////////////////////////////////////////////
    var createSelector = function( name, rules )
    {
        var type = typeof rules;
        switch ( type.toLowerCase() )
        {
            case "string":
                // ir rules is a string
                addRule( name, rules );
                break;

            case "object":
                // if rules is an object, loop through to create string
                addRules( name, rules );
                break;

            default:

        }
    };

    // MARKUP =====================================================================

    ///////////////////////////////////////////////////////////////////
    // Ceate our element that contains filter definitions
    ///////////////////////////////////////////////////////////////////
    var createFilterElement = function( )
    {
        // create our FX element
        var element = document.createElement('div');
        // ensure there is only one instance of it...
        element.id = 'FX';
        // add classes immediately to hide the element when transcluded
        element.className = 'fx fx--hidden';
        // create our css rule to hide this
        createSelector('.fx--hidden', CSS_HIDDEN );
        return element;
    };

    //////////////////////////////////////////////////////////////////
    // Add the singular SVG Markup for wrapping individual filters
    //////////////////////////////////////////////////////////////////
    var createSVGMarkup = function( filterDefinitions, className )
    {
        className = className || 'fx-filters';
        return '<svg class="'+className+'" xmlns="http://www.w3.org/2000/svg" version="1.1">'
                +'<defs>'+filterDefinitions+'</defs>'
                + '</svg>';
    };

    ///////////////////////////////////////////////////////////////////
    // Pass in an array of filter definitions
    // Returns a String with a full SVG wrapped definition
    ///////////////////////////////////////////////////////////////////
    var createFilterMarkup = function( filters )
    {
        // check to see if it is a string...
        if (Object.prototype.toString.call(filters) != '[object Array]') filters = [ filters ];

        // add filters specified in the arguments
        for ( var f = 0, l=filters.length; f<l; ++f )
        {
            var filterMarkup = filters[f];
            var filter = new Filter( filterMarkup );

            if ( filterData[ filter.id ] )
            {
                // already exists!!!
                // REMOVE from DOM>>>
            }else{
                filterIncludes += filterMarkup;

                // check to see if we have one named this already!?
                filterData[ filter.id ] = filter;
                //console.error( filter  );
            }


        }

        // add the required filters to the element
        return filterIncludes;
    };
    // If for whatever reason you do not wish to add a rule (eg. animating)
    var setElementFilterProperty = function(element, property )
    {
        // Vendor prefixes required.
        element.style.filter = property;
        element.style.webkitFilter = property;
        element.style.mozFilter = property;
        element.style.msFilter = property;
        element.style.oFilter = property;
        //console.error( element, element.style.filter, property );
    };

    ///////////////////////////////////////////////////////////////////
    // If for whatever reason you do not wish to add a rule (eg. animating)
    // here we decide on the actual filter code
    // can be either a url(#) or a straight up filter name
    // eg. greyscale(50%)
    ///////////////////////////////////////////////////////////////////
    var setElementFilter = function( element, fx )
    {
        var isSVGFilter = filterData.hasOwnProperty( fx );
        var property = isSVGFilter ? 'url(#' + fx + ')' : fx + '';
        setElementFilterProperty( element, property );
    };

    ///////////////////////////////////////////////////////////////////
    // Pass in either an SVG string
    // or an array of SVG strings
    // or an object or SVGs
    ///////////////////////////////////////////////////////////////////
    var add = function( filters )
    {
        // filters here can be all kinds of file types

        // so let us determine the action based on what type it is...

        // it is an array so add them all together

        // it is a string so append just this one


        // add filters specified in the arguments
        var oldMarkup = filterMarkup;
        filterMarkup = createFilterMarkup( filters );

        // nothing to change
        if ( oldMarkup === filterMarkup ) return fxElement;

        if (!hasInjected)
        {
            // As requested by the initialisation arguments, transclude FX :
            style = createInternalStyleSheet();

            // create a home for our SVG effects
            fxElement = createFilterElement();
            fxElement.innerHTML = createSVGMarkup( filterMarkup );

            // now affix that element
            body.appendChild(fxElement);

            // and save an access point to our definitions
            defs = fxElement.querySelector("defs");

            // run once only
            hasInjected = true;

        }else{

            // write directly into our wrapper if it hass changed
            defs.innerHTML += filterMarkup;
        }

        return fxElement;
    };

    // Fetch a filter definition by ID
    var getFilter = function(name)
    {
        return defs.querySelector("#"+name);
    };


    // Fetch all filter definitions that live within
    var getFilters = function(name)
    {
        return getFilter(name).children;
    };

    // 3. Now create some CSS rules for easy assignment

    ///////////////////////////////////////////////////////////////////
    // FX Function that can e controllled in real time with controls()
    ///////////////////////////////////////////////////////////////////
    var Filter = function( filterMarkup )
    {
        // determine ID from filterMarkup...
        var ID = filterMarkup.match(REGEX_ID)[1];

        this.id = ID;
        this.markup = filterMarkup;

        this.getFilters = function(){
            return getFilters( ID );
        };

        this.getFilter = function(){
            return getFilter( ID );
        };
    };


    // PUBLIC =======================================================================

    return {

        add : add,
        getFilter : getFilter,
        getFilters : getFilters,

        appendElementClass : addClassName,
        setElementFilter : setElementFilter,

        createFilterSelector : function( name, fx )
        {
            // Vendor prefixes required.
            var paramater = 'url("#'+fx+'");';
            var css = '-webkit-filter:'+paramater;
            css += '-moz-filter:'+paramater;
            css += '-ms-filter:'+paramater;
            css += '-o-filter:'+paramater;
            css += 'filter:'+paramater;
            addRule( name, css );
        },

        createFilterClass : function( name, fx )
        {
            this.createFilterSelector( '.'+name, fx );
        },

        getFX : function(){ return filterData; }

    };

    // 2. Create our controls for the specified filters
    //var fxBlurControls = defs.querySelector("#"+FX_BLUR).firstElementChild;
    // now check to see if it has transcluded by seeing if we can refernece the ID inside it
    //var gloop = document.querySelector('fx-goo');
/*
    	blur = defs.querySelector("#"+FX_BLUR), // the blur filter
    	blurFilter = blur.firstElementChild; // the feGaussianBlur primitive

    */


    // create our CSS classes with our FX
    // eg. .fx--goo


    //FX.createFilterSelector('.fx-blur', FX_BLUR_ID );
    //FX.createClass('fx-gloop', FX_GLOOP_ID );

    //FX.setElementFilter( getElementById('main-content'), FX_GLOOP_ID );
    //FX.setElementFilter( getElementById('main-header'), FX_SEPIA_ID );

    //var f = FX.getFilters( FX_GLOOP_ID );

    // now if you want to set certain parameters...
    //f[0].setAttribute('stdDeviation',16);


    //addClassName( gloop, 'fx-gloop', true );
    //addClassName( getElementById('main-header'), 'fx-gloop', true );

}));
