var WS = WS || {};

var GitHub = function(  )
{
    "use strict";

    var API = "https://api.github.com";

    // Routes to select from
    //var activity = "/users/:username/events";
    var publicActivity = "/users/:username/events/public";
    var publicRepos = "/users/:username/repos";
    var publicReadme = "/repos/:owner/:repo/readme";

    var clean = function( string ){
        string = string.replace(/[.]/g, " <span class='dot'>.</span> ");
        return string.replace(/[_-]/g, " ");
    };

    // This converts an activity such as Push into markup
    var formatActivity = function( activity, payload ){
        var a = '';
        switch (activity)
        {
            case 'PushEvent':
                a += 'Pushed to Repository ';
                break;

            case 'WatchEvent':
                a += 'Started watching ';
                break;

            case 'CreateEvent':
                a += 'Created Repository ';
                break;

            default:


        }
        // console.log( activity, payload );
        return a;
    };


    var formatActor = function( actor ){
        var a ='';
        a += '<a class="github--avatar" href="'+actor.url+'" alt="View '+actor.login+'" on Github>';
        a += '<img src="'+actor.avatar_url+'">';
        a += '</a>';
        return a;
    };

    // id:
    // name:
    // "url: "https:
    var formatRepo = function( repo ){
        // checks for certain properties and if available,
        // derives it's expanded state
        var isExpanded = repo.hasOwnProperty( "description" );
        var r = '';

        if (isExpanded)
        {
            r += '<header>';
            r += '<h1>'+clean(repo.name)+'</h1>';
            r += '<p>'+repo.description+'</p>';
            r += '</header>';

            if (repo.homepage) r += '<a>'+repo.homepage+'</a>';

            r += '<footer></footer>';
        }

        r += '<a class="github--repo" href="'+repo.url+'">'+repo.name+'</a>';
        r += '';

        return r;
    };

    // "url: "https:
    var formatDate = function( date, dateFormatterCallback ){
        // check to see if we have a data callback here...
        if (dateFormatterCallback) return dateFormatterCallback.call( this, date );
        return date.toString();
    };

    // Formatting Tools
    var format = function( data, username, type, dateFormatterCallback ){
        // determine what to do with this by what the data is
        var inputType = Object.prototype.toString.call( data ).toLowerCase(),
            isArray = inputType === "[object array]",
            markup = '<ul class="github">',
            actor, date, activity, repo, repos;

        // array / object
        //console.error( "GITHUB =========== " );
        //console.table( data );
        type = type.replace(username, ':username');

        switch( type )
        {

            case publicReadme:
                repos = '';
                if (!isArray) data = [data];
                for ( var i=0, l=data.length; i < l; ++i )
                {
                    var item = data[i];
                    date = new Date( item['created_at'] );
                    repos += '<li class="github--item github--readme">';
                    repos += formatRepo(item);
                    repos += '<div class="github--date">'+formatDate( date,dateFormatterCallback )+'</div>';
                    repos += '</li>';
                    console.error( item );
                }
                markup += repos;

                break;

            case publicRepos:
                repos = '';
                if (!isArray) data = [data];
                for ( var i=0, l=data.length; i < l; ++i )
                {
                    var item = data[i];
                    date = new Date( item['created_at'] );
                    repos += '<li class="github--item github--public github--item_'+i+'">';
                    repos += '<div class="github--date">'+formatDate( date,dateFormatterCallback )+'</div>';
                    repos += formatRepo(item);
                    repos += '</li>';
                }
                markup += repos;
                //console.error( markup );

                break;


            case publicActivity:
            default:

                if (isArray)
                {
                    // loop
                    repos = '';
                    for ( var i=0, l=data.length; i < l; ++i )
                    {
                        var item = data[i];
                        actor = item.actor;
                        repo = item.repo;
                        activity = item.type.replace( 'Event', '').toLowerCase();
                        date = new Date( item['created_at'] );

                        repos += '<li class="github--item github--activity github--'+ activity +' github--item_'+i+'">';
                        repos += '<h5>'+formatActivity( item.type, item.payload )+'</h5>';
                        repos += '<div class="github--date">'+formatDate( date,dateFormatterCallback )+'</div>';
                        repos += formatActor(actor);
                        repos += formatRepo(repo);
                        repos += '</li>';
                        //console.log( item );	// <- Activity
                    }
                    markup += repos;

                }else{
                    // set individual
                    actor = data.actor;
                    repo = data.repo;
                    date = new Date( item['created_at'] );

                    markup += '<li class="github--item">';
                    markup += formatActor(actor);
                    markup += formatActivity( data.type, data.payload );
                    markup += formatRepo(repo);
                    markup += '<p class="github--date">'+formatDate( date )+'</p>';
                    markup += '</li>';

                    //console.log( actor );	// <- Activity
                    //console.log( repo );	// <- ME!
                }

                break;
        }
        markup += '</ul>'
        return markup;
    };

    var load = function( username, path, callback, dateFormatterCallback, repo )
    {
        // :owner/:repo
        var route = path;
        route = route.replace(':username',username );
        route = route.replace(':owner', username );
        route = route.replace(':repo', repo || '' );


        console.error( route );

        var request = new XMLHttpRequest();
        request.open('GET', API + route, true);

        request.onload = function()
        {
            if (request.status >= 200 && request.status < 400)
            {
                // Success!
                var data = JSON.parse(request.responseText);
                callback.apply( null, [format(data, username, route, dateFormatterCallback)] );
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
    };

    /*

    Expose

    */
    return {
        fetchPublicEvents:function(username, callback, dateFormatterCallback){ load(username, publicRepos, callback, dateFormatterCallback) },
        fetchPublicActivity:function(username, callback, dateFormatterCallback){ load(username, publicActivity, callback, dateFormatterCallback) },
        fetchPublicReadme:function(username, repo, callback, dateFormatterCallback){ load(username, publicReadme, callback, dateFormatterCallback, repo) }
    }

}();


WS.GitHub = GitHub;
