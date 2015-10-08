(function ()  {

    "use strict";
    // An example of how to use the FX class with a groovy animation :)
    FX.menu = function()
    {
        // Constants
        var TAU = Math.PI * 2,
            MAX_RADIUS = 120,
            MAX_SIZE = 60,
            INITIAL_SCALE = 2.9,
            BASE_COLOUR = '#000000',
            // has the animation sequence completed?
            completed = false,
            // elements
            timeline;

        // Useful functions
        var randomColour = function(){ return '#'+Math.floor(Math.random()*16777215).toString(16); };

        // main realtime data
        var details = {
            size : MAX_SIZE,
            radius : MAX_RADIUS - 60,
            rotation : 0,
            opacity: 0.9
        };

        function create( element )
        {
                // fetch elements in nav bar
                var children;
                FX.setElementFilter( element, FX_GOO_ID );
                // timeline = animate();
        }

        function start()
        {

        }


        // Control this later on!
        var f = FX.getFilters( FX_GOO_ID );
        var controlBlur = f[0];
        controlBlur.setAttribute('stdDeviation', 18 );

        return {
            create:create,
            start:start
        };
    }


})();
