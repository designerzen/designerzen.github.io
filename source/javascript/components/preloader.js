"use strict";
// An example of how to use the FX class with a groovy animation :)
var Preloader = function(  )
{
    // Constants
    var TAU = Math.PI * 2,
        MAX_RADIUS = 120,
        MAX_SIZE = 89,
        INITIAL_SCALE = 1.2,
        ROTATIONS = 1,
        PETALS = 6,
        PRELOADER_HEIGHT = 44,
        BASE_COLOUR = '#000000',

        // home for our petal classes
        petals = [],
        headPetal, tailPetal,
        mainPetal,
        // has the animation sequence completed?
        completed = false,
        // elements
        wrapper, loader, progressBar,
        // main time line
        timeline;

    // Useful functions
    // var randomColour = function(){ return '#'+Math.floor(Math.random()*16777215).toString(16); };
    var randomColour = function(brightness){
        brightness = brightness || 150;
        var randomChannel = function(brightness){
            var r = 255-brightness;
            var n = 0|((Math.random() * r) + brightness);
            var s = n.toString(16);
            return (s.length==1) ? '0'+s : s;
        }
        return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
    };

    var rainbow = function(numOfSteps, step) {
        // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
        // Adam Cole, 2011-Sept-14
        // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
        var r, g, b;
        var h = step / numOfSteps;
        var i = ~~(h * 6);
        var f = h * 6 - i;
        var q = 1 - f;
        switch(i % 6){
            case 0: r = 1; g = f; b = 0; break;
            case 1: r = q; g = 1; b = 0; break;
            case 2: r = 0; g = 1; b = f; break;
            case 3: r = 0; g = q; b = 1; break;
            case 4: r = f; g = 0; b = 1; break;
            case 5: r = 1; g = 0; b = q; break;
        }
        var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
        return (c);
    };

    // Linked List Petals
    var Petal = function( ele )
    {
        var self = this,
            settings = {
                scale : 1,
                radius : 0,
                rotation : 1,
                element : ele,
                speed : 1,
                dragging:false
            };

        // connect this petal to another petal...
        this.previous = null;
        this.next = null;


        this.data = settings;

        ele.onmousedown = function(){
            //self.data.dragging = true;
            console.log('petal d!', settings.dragging);
            self.recolour();
        };
        ele.onmouseup = function(){
            //self.data.dragging = false;
            console.log('petal u!', settings.dragging);
            //
        };
        this.recolour = function()
        {
            var colour = rainbow( PETALS, ~~(Math.random()*PETALS) );
            var css = { backgroundColor:colour };
            //TweenMax.to( ele,2, { css:css });
            TweenMax.fromTo( ele, 0.4, {scale:Math.random()+1 }, { scale:1, css:css, ease:Elastic.easeOutIn });
        };
        this.lerp = function(x,y)
        {
            TweenMax.to( settings.element, 0.1, { x:x, y:y } );
        };
        this.position = function(x,y)
        {
            TweenMax.set( settings.element, { x:x, y:y } );
        };
    };

    var ProgressBar = function(){

        //Progress bar at base
        var holder = document.createElement('div');

        holder.style.width = '100%';
        holder.style.height = '4px';
        holder.style.bottom = 0;
        holder.style.position = 'absolute';
        holder.style.margin = 0;
        //holder.style.marginTop = "-24px";
        holder.style.backgroundColor = "white";
        holder.style.borderTop = "black";

        var bar = document.createElement('div');
        bar.style.backgroundColor = "black";
        bar.style.left = 0;
        bar.style.top = 0;
        bar.style.bottom = 0;
        bar.style.position = 'absolute';
        holder.style.margin = 0;holder.appendChild(bar);

        this.element = holder;

        this.setProgress = function(progress)
        {
            var percent = ( progress * 100 );
            width = percent + "%";
            //bar.style.width = width;
            TweenMax.to( bar, 1, {css:{width:width, height:((PRELOADER_HEIGHT*progress)>>0)+'px'} } );
        }
    };

    // main realtime data
    var details = {
        size : MAX_SIZE,
        radius : MAX_RADIUS - 60,
        friction:0.5,
        rotation : 0,
        petals : PETALS,
        opacity: 0.57
    };

    var mouse = { x:0, y:0 };
    var onMouseUpdate = function(e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    };
    //document.addEventListener('mousemove', onMouseUpdate, false);
    //document.addEventListener('mouseenter', onMouseUpdate, false);

    function create( appendTo, onStartCallback, onCompleteCallback )
    {
            var i;

            // create our parent wrapper
            wrapper                 = document.createElement('div');
            wrapper.id              = "preloader-main";
            wrapper.className       = "preloader";
            wrapper.style.top       = 0;
            wrapper.style.left      = 0;
            wrapper.style.bottom    = 0;
            wrapper.style.right     = 0;
            wrapper.style.margin    = 0;
            wrapper.style.position  = 'fixed';
            wrapper.style.backgroundColor = 'rgba(0,0,0,0.93)';

            loader                  = document.createElement('div');
            loader.style.display    = 'block';
            loader.style.width      = MAX_SIZE+'px';
            loader.style.height     = MAX_SIZE+'px';
            loader.style.zIndex     = "909";
            loader.style.top        = "50%";
            loader.style.left       = "50%";
            loader.style.margin     = 0;
            loader.style.marginTop  = -(MAX_SIZE*0.5)+'px';
            loader.style.marginLeft = -(MAX_SIZE*0.5)+'px';
            loader.style.position   = 'fixed';
            loader.style.overflow   = 'visible';
            loader.className        = "preloader--spinner";

            loader.onclick = function(){
                complete();
                bounce();
            };

            // create petal elements and make them circular
            for ( i=0; i<details.petals; ++i )
            {
                // set up our z-stack
                var zIndex = i === 0 ? details.petals - 1 - i : 0;
                // create our element
                var petal = document.createElement('div');
                petal.className = 'petal preloader--spinner-'+i;
                petal.style.width = details.size+'px';
                petal.style.height = details.size+'px';
                petal.style.borderRadius = details.size+'px';
                petal.style.position = 'absolute';
                petal.style.top = 0;
                petal.style.left = 0;
                petal.style.margin = 0;

                petal.style.zIndex = zIndex;
                petal.style.backgroundColor = BASE_COLOUR;
                // and our model method
                var data = new Petal( petal );
                petals.push( data );

                if (i===0) mainPetal = petal;
                else petal.style.opacity = details.opacity;

                // now stick it on the loader element
                loader.appendChild( petal );
            }


            // Link this list
            // now connect these to their previous petals...
            var previousPetal = petals[0];
            for ( i=1; i<details.petals; ++i )
            {
                var currentPetal = petals[i];
                currentPetal.previous = previousPetal;
                previousPetal.next = currentPetal;
                previousPetal = currentPetal;
            }
            headPetal =  petals[0];
            tailPetal =  petals[details.petals-1];

            // inner progress bar
            progressBar = new ProgressBar();
            wrapper.appendChild( progressBar.element );
            wrapper.appendChild( loader );

            //FX.add( FX_GLOOP );
            FX.setElementFilter( loader, FX_GLOOP_ID );

            //FX.setElementFilter( loader, FX_GLOOP_ID );
            //FX.createFilterClass('fx-gloop', FX_GLOOP_ID );
            //loader.className = 'fx-gloop';

            appendTo = appendTo || document.body;

            timeline = animate( onStartCallback, onCompleteCallback );

            document.body.appendChild( wrapper);

            if ( onStartCallback ) onStartCallback.apply( null, [] );
    }

    function progress( percent )
    {
        //timeline.totalProgress( percent );
        progressBar.setProgress(percent);
        console.log('Preloader progress '+percent +'%');
    }
    function destroy( )
    {
        var petal = tailPetal;
        while ( petal )
        {
            petal.next = null;
            petal = petal.previous;
        }
        petals = [];
        // remove preloader from DOM
        wrapper.parentNode.removeChild(wrapper);
    }


    function animate( onStartCallback, onCompleteCallback )
    {
        var acceleration = 1.1;
        var onUpdate = function( e )
        {
            //console.log('UPDATES',controlBlur , loader );
            //this.x = _width  / 2 + this.orbit * Math.cos(angle * Math.PI / 180)
            //this.y = _height / 2 + this.orbit * Math.sin(angle * Math.PI / 180)

            // loop through each petal and update
            var petal = tailPetal;
            while ( petal )
            {
                var x, y,
                    speed = 1,
                    data = petal.data;

                if (!petal.dragging)
                {
                    var percentage = details.friction * ( TAU * ((i+1) / details.petals) + (details.rotation ) + (data.rotation *0.04) );
                    var radius = details.radius*data.radius;
                    // arrange each petal at a point round a circle
                    x = Math.cos(percentage)*radius;
                    y = Math.sin(percentage)*radius;
                    petal.position( x, y );
                    //petal.lerp( x, y );
                    //console.log(i+'.U PDATES', e, petal );
                    //petal.rotation = percentage;
                    // speed of ratation is hampered by low radius
                    data.rotation += i * (0.5+data.radius);
                    //petal.recolour();
                }else{
                    // mouse coords...
                    x = mouse.x;
                    y = mouse.y;
                    petal.position( x, y );
                }
                petal = petal.previous;
            }
            acceleration += 10;
            details.rotation *= acceleration;
            // TweenMax.set( loader, { rotation:"+=1" } );
        };

        var onComplete = function()
        {
            completed = true;
            if ( onCompleteCallback ) onCompleteCallback.apply( null, [] );
            console.log('onComplete',onCompleteCallback);
        };

        var onSpinComplete = function()
        {
            console.log('onSpinComplete');
        };


        // create a timeline {repeat:5 } self
        var t = new TimelineMax( {onUpdate:onUpdate, onUpdateParams:["this"], onUpdateScope:this, onComplete:onComplete, onCompleteParams:[], onCompleteScope:this } );

        // the animation is simple.
        // It starts off as a single coloured circle
        // This circle Back eases in from a small size to a larger size
        // Then the other circles one by one just to their new positions
        // In a circle around the original one
        // then the original circle itself runs to the radius edge
        // Meanwhile the entire loader has begun rotating...
        var petal, i, css, frame, delay, delayFactor, period, scale,
            colour = mainPetal.style.backgroundColor,
            initialRadius = details.radius,
            scaler = ( INITIAL_SCALE - 1) / (details.petals),
            sizer = (MAX_RADIUS - initialRadius )/ (details.petals);

        var intro = new TimelineMax( );
        // screen starts as a full size rectangle
        intro.set( mainPetal, { scale:INITIAL_SCALE }, 'init' );
        //intro.set( wrapper, { css:{ backgroundColor:'black' } }, 'init' );
        //intro.to( wrapper, 2.7, { css:{ borderRadius:"50%" }, ease:Elastic.easeOut }, 'begin' );
        //intro.to( wrapper, 0.7, { css:{ borderRadius:"50%", backgroundColor:'#fff' }, ease:Elastic.easeIn }, 'begin' );

        // this morphs into a square


        // Grow
        //intro.to( wrapper, 0.3, { css:{ backgroundColor:'transparent' }, ease:Linear.easeIn }, 'start'  );
        intro.from( loader, 0.7, { scale:0.1, autoAlpha:0, ease:Elastic.easeIn }, 'start' );
        //intro.set( loader,  { scale:1, opacity:1 }, 'expand' );

        // Rotate and Expand
        delayFactor = 0.35;
        for ( i=0; i < PETALS; ++i )
        {
            // +delay
            delay = i*delayFactor;
            frame = 'expand+='+(1.15);

            petal = petals[PETALS-i-1].data;
            //petal = petals[i].data;

            //css = { backgroundColor:randomColour() };
            css = { backgroundColor:rainbow( PETALS, i ) };

            //t.to( mainPetal, 0.5, { scale:INITIAL_SCALE-(scaler*(1+i)), delay:delay,  ease:Elastic.easeOutIn } , frame );
            // shrink main petal
            intro.to( mainPetal, 0.9, { opacity:details.opacity, scale:INITIAL_SCALE-(scaler*(1+i)), delay:delay,  ease:Elastic.easeOut } , frame );
            // throw new petal into location on radius
            intro.to( petal,3, { radius:1, delay:delay, ease:Elastic.easeOut }, frame );
            // grow the global radius
            intro.to( details,3, { radius:initialRadius+(i*sizer), delay:delay, ease:Elastic.easeOut }, frame );
            intro.to( petal.element,1.5, { css:css, delay:delay+0.5 }, frame );
        }
        intro.to( mainPetal, 0.9, { scale:1, ease:Elastic.easeOut } );
        //intro.to( details, 1, { radius:MAX_RADIUS, ease:Elastic.easeIn }, 'spin' );

        // kludge
        // spin spin spin!
        //t.to( details, 5, { radius:1 }, 'spin+=4' );
        //var main = new TimelineMax( {repeat:-1 } );
        var main = new TimelineMax( {repeat:ROTATIONS, onComplete:onSpinComplete, onCompleteParams:[], onCompleteScope:this } );
        css = { backgroundColor:BASE_COLOUR };
        //main.set( mainPetal, { scale:1 }, 'spin' );
        // colour cycle!
        main.to( loader, 12, { scale:1 } );



        var finish = new TimelineMax( );
        finish.set( mainPetal, { scale:1 }, 'end' );
        // Contract & Shrink
        //t.to( loader, 15, { rotation:360*ROTATIONS }, 'end' );
        period = 1.8;
        delayFactor = 0.21;
        for ( i=0; i < PETALS; ++i )
        {
            scale = INITIAL_SCALE- (scaler*(PETALS-i-1));
            delay = i*delayFactor;
            petal = petals[i].data;
            // Suck back into centre
            finish.to( petal, period, { radius:0, delay:delay, ease:Elastic.easeOut }, 'end' );
            finish.to( mainPetal, period, { scale:scale, delay:delay, ease:Elastic.easeOut } , 'end' );

            if ( petal.element === mainPetal )
            {
                finish.to( mainPetal, 0.5, { css:css, opacity:1 }, 'end' );

            }else{
                finish.to( petal.element,0.5, { css:css, scale:scale, delay:delay-delayFactor }, 'end' );
            }
        }
        finish.to( wrapper, 0.3, { css:{ backgroundColor:'transparent' }, ease:Linear.easeIn }, 'end'  );

        finish.to( details, 1+PETALS*delayFactor, { radius:1, ease:Elastic.easeOutIn }, 'end' );
        // drop to floor and bounce!scale:0.5,
        //finish.to( mainPetal, 1 , {  y:"900%", ease:Elastic.easeOutIn }, '-=1' );

        // consolidate our timelines
        t.add( intro );
        t.addLabel( 'main' );
        t.add( main );
        t.addLabel( 'jump' );
        t.add( finish );

        return t;
    }

    // take all petals and throw them around the screen towards the floor
    function explode( callback )
    {
        //timeline.clear( true );
        timeline.kill();

        var duration = 0.5, petal = headPetal, i=0;
        var exploder = new TimelineMax( { onComplete:callback, onCompleteParams:[], onCompleteScope:this } );
        exploder.to( mainPetal, duration*PETALS, { scale:1 } );
        while ( petal )
        {
            // +delay
            var delay = -i*0.5;
            var element = petal.data.element;
            //petal = petals[i].data;
            exploder.to( element,duration, { x:i * Math.random() * 20, y:200+Math.random() * 200, delay:delay } );
            petal = petal.next;
            i++;
        }
        exploder.to( mainPetal, duration*PETALS, { scale:1, x:Math.random() * 20, y:200+Math.random() * 200 } );

        //timeline.add( exploder );
    };

    // Literally throws the ball up and lets it bounce on the floor...
    // 0. 0 + petalWidth
    // 1. 0 - petalWidth

    // 2. 0 + petalWidth * 2
    // 3. 0 - petalWidth * 2

    // 4. 0 + petalWidth * 3
    // 5. 0 - petalWidth * 3

    function bounce( bounceCallback )
    {
        timeline.kill();
        //timeline.clear( true );

        var i = 0,
            duration = 0.7,
            petalWidth = details.size,
            height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            halfHeight = height / 2,
            endWidth = (PETALS) * petalWidth,
            halfEndWidth = endWidth / 2;

        var bouncer = new TimelineMax( { onComplete:bounceCallback, onCompleteParams:[], onCompleteScope:this } );
        //bouncer.to( loader, duration, { scale:1, y:halfHeight, ease:Bounce.easeOut, overwrite:"all" }, "drop" );

        // now bounce the bubbles to the sides
        // it bounces out from the middle
        // so the order that we need to move them is
        // like a flip flop...
        var positions = [];

        // first goes to the right position 1
        // second goes to the left position 1
        // third goes right to position 2...
        var factor = 1, offsetX = petalWidth/2;
        for ( i=0; i < PETALS-1; i++ )
        {
            var isEven = i%2 === 0;
            if (isEven && i>1)
            {
                factor++;
            }

            var x = (factor* petalWidth);//, scale:1, overwrite:"all"
            var flip = isEven ? 1 : -1;
            positions[i] = (flip * x ) - offsetX;
        }
        // mainPetal ---
        positions[PETALS-1] = -offsetX;


        //console.error( positions.toString() );

        var petal = tailPetal, i=0,
            delayRatio = 0.99,
            partDuration = duration*delayRatio,
            remainingDuration = duration-partDuration,
            delayFactor = partDuration / PETALS;

        while ( petal )
        {
            // +delay
            var delay = (i*delayFactor);
            var element = petal.data.element;
            //petal = petals[i].data; , "bounce+="+duration
            var randomRandom = Math.random() * Math.random();
            var css = { backgroundColor:rainbow( PETALS, i ) };
            // , css:css
            bouncer.to( element, duration, { x: positions[i], scale:1, delay:delay, ease:Elastic.easeIn } , "drop" );
            bouncer.to( element, duration, { y:halfHeight, delay:delay, ease:Back.easeOutIn  } , "drop" );
            // bouncer.to( element, duration, { x:x, css:css, overwrite:"all" } , "bounce"); // "bounce+="+duration
            petal = petal.previous;
            //console.error(element, i+' preloader '+x+' duration '+duration);
            i++;
        }
        //bouncer.to(loader, 1, {autoAlpha:0} );
        //bouncer.to(loader, 100, {autoAlpha:1} );, "drop"
        //bouncer.to( loader, duration, { scale:1, y:halfHeight-32, ease:Back.easeOutIn, overwrite:"all" } );

        //timeline.add( bouncer );
        return bouncer.duration();
    };

    function complete (){
        // allow a certain amount of animation to occurr...
        timeline.seek('jump');
    };


    // Control this later on!
    var f = FX.getFilters( FX_GOO_ID );
    var controlBlur = f[0];
    controlBlur.setAttribute('stdDeviation', 18 );


    // Public Methods
    // show();
    // hide();
    // complete();
    // getTimeLine();
    return {
        start:create,
        stop:complete,
        explode:explode,
        bounce:bounce,
        setProgress:progress,
        destroy:destroy
    };
};
