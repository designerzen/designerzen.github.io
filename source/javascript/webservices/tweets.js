/*
<li
    class="h-entry tweet with-expansion customisable-border"
    data-tweet-id="619159342688927745"
    data-rendered-tweet-id="619159342688927745"
    data-scribe="component:tweet">

    <!-- BEGIN : Header -->
    <div class="header">

        <a
            class="u-url permalink customisable-highlight"
            href="https://twitter.com/designerzen/status/619159342688927745"
            data-datetime="2015-07-09T15:01:05+0000"
            data-scribe="element:mini_timestamp">

                <time pubdate="" class="dt-updated" datetime="2015-07-09T15:01:05+0000" title="Time posted: 09 Jul 2015, 15:01:05 (UTC)" aria-label="Posted on 09 Jul">09 Jul</time>
        </a>

        <div class="h-card p-author" data-scribe="component:author">
            <a class="u-url profile" href="https://twitter.com/designerzen" aria-label="zen (screen name: designerzen)" data-scribe="element:user_link">
                <img class="u-photo avatar" alt="" src="https://pbs.twimg.com/profile_images/458936627511820289/DcQyN4yW_normal.png" data-src-2x="https://pbs.twimg.com/profile_images/458936627511820289/DcQyN4yW_bigger.png" data-scribe="element:avatar">

                <span class="full-name">
                    <span class="p-name customisable-highlight" data-scribe="element:name">zen</span>
                </span>

                <span class="p-nickname" dir="ltr" data-scribe="element:screen_name">@<b>designerzen</b></span>
            </a>
        </div>

    </div>
    <!-- END : Header -->


    <!-- START : Entry -->
    <div class="e-entry-content">
        <p class="e-entry-title" lang="en" dir="ltr">There has already been a James bond musical in case you didn't know. Music by Bacharach, starring Peter Sellers, Ursulla Andres... 1967!</p>
    </div>
    <!-- END : Entry -->


    <!-- START : Footer -->
    <div class="footer customisable-border" data-scribe="component:footer">

        <span class="stats-narrow">
            <span class="stats" data-scribe="component:stats">
                <a href="https://twitter.com/designerzen/status/619159342688927745" title="View Tweet on Twitter" data-scribe="element:favorite_count">
                    <span class="stats-favorites">
                        <strong>1</strong> favorite
                    </span>
                </a>
            </span>
        </span>

        <a class="expand customisable-highlight" href="https://twitter.com/designerzen/status/619159342688927745" data-toggled-text="Collapse" role="button" aria-expanded="false" data-scribe="element:show_details">
            <b>Expand</b>
        </a>


        <!-- BEGIN : Actions -->
        <ul class="tweet-actions" role="menu" aria-label="Tweet actions" data-scribe="component:actions">
            <li><a href="https://twitter.com/intent/tweet?in_reply_to=619159342688927745" class="reply-action web-intent" title="Reply" data-scribe="element:reply"><i class="ic-reply ic-mask"></i><b>Reply</b></a></li>
            <li><a href="https://twitter.com/intent/retweet?tweet_id=619159342688927745" class="retweet-action web-intent" title="Retweet" data-scribe="element:retweet"><i class="ic-retweet ic-mask"></i><b>Retweet</b></a></li>
            <li><a href="https://twitter.com/intent/favorite?tweet_id=619159342688927745" class="favorite-action web-intent" title="Favorite" data-scribe="element:favorite"><i class="ic-fav ic-mask"></i><b>Favorite</b></a></li>
        </ul>
        <!-- END : Actions -->


        <span class="stats-wide">
            <b>· </b>
            <span class="stats" data-scribe="component:stats">
                <a href="https://twitter.com/designerzen/status/619159342688927745" title="View Tweet on Twitter" data-scribe="element:favorite_count">
                    <span class="stats-favorites">
                        <strong>1</strong> favorite
                    </span>
                </a>
            </span>
        </span>


    </div>
    <!-- END : Footer -->
</li>




https://cdn.syndication.twimg.com/widgets/timelines/?designerzen&lang=en&suppress_response_codes=true&rnd=0.30672402447089553&callback=Tweets.parse

*/
var WS = WS || {};
var Tweets = function( )
{
    "use strict";

    var HOST = "https://",
        API = HOST + "cdn.syndication.twimg.com/widgets/timelines/",
        CALLBACK = "&callback=Tweets.parse";

    var userName = "designerzen",
        callback,
        formatDate;

    var clean = function(data){
        var str = data;
        // remove newline / carriage return
        str = str.replace(/\n/g, "");

        // remove whitespace (space and tabs) before tags
        str = str.replace(/[\t ]+\</g, "<");

        // remove whitespace between tags
        str = str.replace(/\>[\t ]+\</g, "><");

        // remove whitespace after tags
        str = str.replace(/\>[\t ]+$/g, ">");

        //return data.replace(/\s+/g, " ");
        return str;
    }

    // https://cdn.syndication.twimg.com/widgets/timelines/603913907116318720?&amp;lang=en&amp;callback=twitterFetcher.callback&amp;suppress_response_codes=true&amp;rnd=0.9193390330765396
    // https://cdn.syndication.twimg.com/widgets/timelines/603913907116318720?&amp;lang=en&amp;suppress_response_codes=true&amp;callback=Tweets.parse&amp;rnd=0.29173051728866994
    var
        createURL = function(id, language){
            var ARGUMENTS = id + '?'+'&lang='+language+'&suppress_response_codes=true' + CALLBACK + '&rnd=' + Math.random();
            return API +ARGUMENTS;
        },
        addScript = function( id,language ){
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = createURL( id,language );
            document.getElementsByTagName('head')[0].appendChild(script);

        },
        markupTweet = function(tweet,extraClasses){

            var markup = '<li class="tweet '+(extraClasses||'')+'">';
            // Avatar
            markup += tweet.author;
            // Date
            markup += '<div class="tweet--date">' + tweet.date + '</div>';
            markup += tweet.content;

            // Ineractions
            markup += '<div class="tweet--actions">';
            //markup += '<li class="tweet--action">'+tweet.buttons.reply+'</li>';
            //markup += '<li class="tweet--action">'+tweet.buttons.favorite+'</li>';
            //markup += '<li class="tweet--action">'+tweet.buttons.retweet+'</li>';

            markup += tweet.buttons.reply;
            markup += tweet.buttons.favorite;
            markup += tweet.buttons.retweet;
            markup += '</div>';

            //markup += tweet.footer;
            markup += '</li>';
            return markup;
        },

        format = function(data){
            // gah, this is all html!
            var onlyMine = true;

            var div = document.createElement('div');
            div.innerHTML = data;
        //    console.error( div.innerHTML );
            var fetch = function( parent, className ){
                return parent.getElementsByClassName(className)[0];
            };
            // grab stream...
            var
                tweets = [],
                myTweets = [],
                othersTweets = [],
                river = fetch(div,'stream'),
                streams = river.firstElementChild.children;


            // loop through these children...
            for ( var f=0,l=streams.length; f<l; ++f)
            {
                var stream = streams[f];

                // strp out items of significance...
                var
                    header = fetch( stream,'header'),
                    content = fetch( stream,'e-entry-content'),
                    footer = fetch( stream,'footer');

                var permalink = fetch( header, 'permalink'),
                    time = fetch( header,'dt-updated'),
                    author = fetch( header,'p-author'),
                    avatar = fetch( author,'avatar');


                var datetimeText = time.getAttribute('datetime');
                var date = new Date(datetimeText.replace(/-/g,'/').replace('T', ' ').split('+')[0]);

                var stats =  fetch( footer,'stats');
                var buttons = fetch( footer,'tweet-actions');

                var reply = fetch( buttons,'reply-action'),
                    retweet = fetch( buttons,'retweet-action'),
                    favorite = fetch( buttons,'favorite-action');
                // add some marup to these buttons...
                var intent = 'tweet--intent';
                reply.className += ' tweet--reply '+intent;
                retweet.className += ' tweet--retweet '+intent;
                favorite.className += ' tweet--favorite '+intent;

                content.firstElementChild.className += ' tweet--content';

                var tweet = {};
                //tweet.elements = {};
                tweet.header = clean(header.innerHTML);
                tweet.date = formatDate ? formatDate( date ) : date.toString();
                tweet.permalink = permalink.getAttribute('href');

                tweet.author = clean(author.innerHTML);
                tweet.avatar = {
                    small: avatar.getAttribute('src'),
                    large: avatar.getAttribute('data-src-2x')
                };
                tweet.content = clean(content.innerHTML);

                tweet.footer = clean(footer.innerHTML);
                tweet.buttons =
                {
                    markup : clean(buttons.innerHTML),
                    reply:clean(reply.parentNode.innerHTML),
                    favorite:clean(favorite.parentNode.innerHTML),
                    retweet:clean(retweet.parentNode.innerHTML)
                };

                if (onlyMine)
                {
                    var parts = fetch( author,'profile').getAttribute('href').split('/');
                    var user = parts[ parts.length-1];
                    //console.error( user );
                    if ( user.toLowerCase() == userName ) myTweets.push( tweet );
                    else othersTweets.push( tweet );
                }

                tweets.push( tweet );
                // check to see if there is a URL mentioned in the tweet and if so collect...

            }

            // Now create our actual markup
            var t,q,tweet;

            // Mine!
            var markup = '<ul class="twitter tweets-mine">';
            markup += '<h5>'+userName+'</h5>';
            for ( t=0,q=myTweets.length; t < q; ++t)
            {
                var extraClasses= t === 0 ? 'tweet--latest' : '';
                tweet = myTweets[t];
                markup += markupTweet(tweet,extraClasses);
            }
            markup += '</ul>';

            // Theirs!
            markup += '<ul class="twitter tweets-theirs">';
            markup += "<h5>Other stuff that I've liked</h5>";
            for ( t=0,q=othersTweets.length; t < q; ++t)
            {
                tweet = othersTweets[t];
                markup += markupTweet(tweet,'hide--date');
            }
            markup += '</ul>';
            return markup;// div.innerHTML;
        },
        parse = function(data){
            // callback with data!
            var tweets = data.body;
            callback.apply( null, [format(tweets)] );
        },
        load = function( id,language, callbackComplete, dateFormatterCallback ){
            callback = callbackComplete;
            formatDate = dateFormatterCallback;
            addScript( id,language );
        };
    return {
        load:load,
        parse:parse
    }
}();

/*

Expose

*/
WS.Tweets = Tweets;
