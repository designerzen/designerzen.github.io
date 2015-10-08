var Logo = function()
{

    // UTILS ---
    // convert a hexidecimal color string to 0..255 R,G,B
    var
        hexToRGB = function (hex)
        {
            var r = hex >> 16;
            var g = hex >> 8 & 0xFF;
            var b = hex & 0xFF;
            return [r,g,b];
        },
        RGBToHex = function (r,g,b)
        {
            var bin = r << 16 | g << 8 | b;
            return (function(h){
                return new Array(7-h.length).join("0")+h;
            })(bin.toString(16).toUpperCase());
        };

    // let's minify as much as we can!
    var
        svg = document.getElementById('designerzen_logo'),
        orig = svg.querySelector('path'),
        totalLength = orig.getTotalLength(),
        timer,
        colour = { r:0, g:0, b:0 },
        thickness = 50,
        style = orig.style,
        obj = { length:0, pathLength:totalLength };

    // firstly, let's resize the div to match the size of the screen...
    var size = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.style.width = svg.style.height = size;

    //orig.style.stroke = '#f60';
    console.error( totalLength,size );




    var t = new TimelineMax( {repeat:5, yoyo:true, onReverseComplete:onReversed, onReverseCompleteScope:this } );
    t.fromTo(obj, 2, {length:0}, { length:totalLength*0.75, onUpdate:drawLine, onUpdateParams:['boring'], onUpdateScope:this, ease:Sine.easeIn });
    t.to(obj, 2, { length:totalLength, onUpdate:drawLine, onUpdateScope:this, onUpdateParams:['dotty'], onComplete:onComplete, onCompleteScope:this, ease:Linear.easeNone});
    t.delay( 4 );
    t.pause( );

    //style.strokeDashoffset = totalLength;
    style.strokeLinecap = "round";//"butt";
    style.strokeWidth = 0.015;
    /*
    orig.style.strokeDasharray = totalLength + ' ' + totalLength;
    orig.style.strokeDashoffset = totalLength;
    t.fromTo(obj, 10, {length:0}, { length:totalLength, onUpdate:drawAltLine, onUpdateScope:this, onComplete:onComplete, onCompleteScope:this, ease:Linear.easeNone})
    */
    function drawLine( type )
    {
        var progress = obj.length / totalLength;

        if ( parseFloat(style.strokeWidth) < thickness )
        {
            style.strokeWidth = parseFloat(style.strokeWidth) + 2;
            //console.log('growing! '+style.strokeWidth);
        }

        style.stroke = '#'+RGBToHex( 0,0, (1-progress)*255 );// '#000000';

        switch (type)
        {
            case 'boring':

                style.strokeDasharray = obj.length + ' ' + obj.pathLength;
                //style.strokeDashoffset = totalLength * Math.floor(1-progress);
                break;

            case 'dotty':
                //style.strokeLinecap = "butt";//"butt";
                style.strokeDasharray = obj.length + ' ' + obj.pathLength;
                //style.strokeDasharray = totalLength + ' ' + totalLength;
                //style.strokeDashoffset = Math.floor(totalLength * (1 - progress));
                break;

            default:

        }
    }


    function onReversed()
    {
        //t.start(  ).delay( 4 );
        //t.reversed( !t.reversed() ).delay( 1 );
    }

    function onComplete()
    {
        //thickness--;
        style.strokeWidth = thickness;
        //t.yoyo();
        //{onReverseComplete:onReversed, onCompleteScope:this}
        //t.reversed( !t.reversed() ).delay( 4 );
        //t.restart();
    }


    return {
        start:function(){
            t.play();
        },
        destroy:function(){
            t.stop();
        }
    }
};
