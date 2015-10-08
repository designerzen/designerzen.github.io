var Calender = function(){

    var DAY_NAMES = [
            "Monday","Tuesday","Wednesday","Thursday","Friday",
            "Saturday","Sunday"
        ],
        SHORT_DAY_NAMES = [
            "Mon","Tues","Wed","Thurs","Fri",
            "Sat","Sun"
        ],
        MONTH_NAMES = [
            "Jan", "Feb", "Mar",
            "April", "May", "June", "July",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ],
        DIVIDER = '&#47;';
    /*
    var suffix = function(i) {
        var j = i % 10,
            k = i % 100;

        if (j == 1 && k != 11) return i + "st";
        if (j == 2 && k != 12) return i + "nd";
        if (j == 3 && k != 13) return i + "rd";
        return i + "th";
    };
    */

    // https://gist.github.com/furf/986113#file-annotated-js
    var suffix = function(a){return["th","st","nd","rd"][(a=~~(a<0?-a:a)%100)>10&&a<14||(a%=10)>3?0:a]};

    /*

    <div class="calender recent">
        <time datetime="2008-02-14 20:00">Valentines day</time>
        <h6 class="calender--day"></h6>
        <p class="calender--date"></p>
        <p class="calender--month"></p>
    </div>

    */
    // Show Day, Date and Month
    var recent = function( date, short ){
        // pass in a date and this will magically create
        // markup that represents the requested day and month

        var dayNumber = date.getDate()+1;
        var dayName = short ? SHORT_DAY_NAMES[ date.getDay() ] : DAY_NAMES[ date.getDay() ];
        var day = dayNumber + '<sup>'+suffix( dayNumber )+'</sup>';
        var month = MONTH_NAMES[ date.getMonth() ];
        // http://www.brucelawson.co.uk/2012/best-of-time/
        // YEAR-MONTH-DATE
        var dateTime = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
        var markup = '<div class="calender recent">';

        markup += '<h6 class="calender--day">'+dayName+'</h6>';
        markup += '<time class="calender--date" datetime="'+dateTime + '">'+day+'</time>';
        markup += '<p class="calender--month">'+month+'</p>';
        markup += '</div>';
        return markup;
    };
    /*

    <div class="calender old">
        <h6 class="calender--date"></h6>
        <p class="calender--month"></p>
        <p class="calender--year"></p>
    </div>

    */
    // Shows Date, Month and YEAR too
    var ancient = function( date ){
        // pass in a date and this will magically create
        // markup that represents the requested day and month
        var dayNumber = date.getDate()+1;
        var day = dayNumber + '<sup>'+suffix( dayNumber )+'</sup>';
        var month = MONTH_NAMES[ date.getMonth() ];
        var markup = '<aside class="calender old">';
        markup += '<h6 class="calender--month">'+month+'</h6>';
        markup += '<time class="calender--date">'+day+'</time>';
        markup += '<p class="calender--year">'+date.getFullYear()+'</p>';
        markup += '</aside>';
        return markup;
    };

    return {
        getRecent:recent,
        getOld:ancient
    }
}();
