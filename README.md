designerzen.github.io
=====================

Umbrella site for some of designerzen's projects hosted on github



Twitter setup
/**
 * ### HOW TO CREATE A VALID ID TO USE: ###
 * Go to www.twitter.com and sign in as normal, go to your settings page.
 * Go to "Widgets" on the left hand side.
 * Create a new widget for what you need eg "user time line" or "search" etc.
 * Feel free to check "exclude replies" if you don't want replies in results.
 * Now go back to settings page, and then go back to widgets page and
 * you should see the widget you just created. Click edit.
 * Look at the URL in your web browser, you will see a long number like this:
 * 345735908357048478
 * Use this as your ID below instead!
 */

/**
 * How to use TwitterFetcher's fetch function:
 *
 * @function fetch(object) Fetches the Twitter content according to
 *     the parameters specified in object.
 *
 * @param object {Object} An object containing case sensitive key-value pairs
 *     of properties below.
 *
 * You may specify at minimum the following two required properties:
 *
 * @param object.id {string} The ID of the Twitter widget you wish
 *     to grab data from (see above for how to generate this number).
 * @param object.domId {string} The ID of the DOM element you want
 *     to write results to.
 *
 * You may also specify one or more of the following optional properties
 *     if you desire:
 *
 * @param object.maxTweets [int] The maximum number of tweets you want
 *     to return. Must be a number between 1 and 20. Default value is 20.
 * @param object.enableLinks [boolean] Set false if you don't want
 *     urls and hashtags to be hyperlinked.
 * @param object.showUser [boolean] Set false if you don't want user
 *     photo / name for tweet to show.
 * @param object.showTime [boolean] Set false if you don't want time of tweet
 *     to show.
 * @param object.dateFunction [function] A function you can specify
 *     to format date/time of tweet however you like. This function takes
 *     a JavaScript date as a parameter and returns a String representation
 *     of that date.
 * @param object.showRetweet [boolean] Set false if you don't want retweets
 *     to show.
 * @param object.customCallback [function] A function you can specify
 *     to call when data are ready. It also passes data to this function
 *     to manipulate them yourself before outputting. If you specify
 *     this parameter you must output data yourself!
 * @param object.showInteraction [boolean] Set false if you don't want links
 *     for reply, retweet and favourite to show.
 * @param object.showImages [boolean] Set true if you want images from tweet
 *     to show.
 * @param object.lang [string] The abbreviation of the language you want to use
 *     for Twitter phrases like "posted on" or "time ago". Default value
 *     is "en" (English).
 */




Flickr
====

API Methods
activity

    flickr.activity.userComments
    flickr.activity.userPhotos

auth

    flickr.auth.checkToken
    flickr.auth.getFrob
    flickr.auth.getFullToken
    flickr.auth.getToken

auth.oauth

    flickr.auth.oauth.checkToken
    flickr.auth.oauth.getAccessToken

blogs

    flickr.blogs.getList
    flickr.blogs.getServices
    flickr.blogs.postPhoto

cameras

    flickr.cameras.getBrandModels
    flickr.cameras.getBrands

collections

    flickr.collections.getInfo
    flickr.collections.getTree

commons

    flickr.commons.getInstitutions

contacts

    flickr.contacts.getList
    flickr.contacts.getListRecentlyUploaded
    flickr.contacts.getPublicList
    flickr.contacts.getTaggingSuggestions

favorites

    flickr.favorites.add
    flickr.favorites.getContext
    flickr.favorites.getList
    flickr.favorites.getPublicList
    flickr.favorites.remove

galleries

    flickr.galleries.addPhoto
    flickr.galleries.create
    flickr.galleries.editMeta
    flickr.galleries.editPhoto
    flickr.galleries.editPhotos
    flickr.galleries.getInfo
    flickr.galleries.getList
    flickr.galleries.getListForPhoto
    flickr.galleries.getPhotos

groups

    flickr.groups.browse
    flickr.groups.getInfo
    flickr.groups.join
    flickr.groups.joinRequest
    flickr.groups.leave
    flickr.groups.search

groups.discuss.replies

    flickr.groups.discuss.replies.add
    flickr.groups.discuss.replies.delete
    flickr.groups.discuss.replies.edit
    flickr.groups.discuss.replies.getInfo
    flickr.groups.discuss.replies.getList

groups.discuss.topics

    flickr.groups.discuss.topics.add
    flickr.groups.discuss.topics.getInfo
    flickr.groups.discuss.topics.getList

groups.members

    flickr.groups.members.getList

groups.pools

    flickr.groups.pools.add
    flickr.groups.pools.getContext
    flickr.groups.pools.getGroups
    flickr.groups.pools.getPhotos
    flickr.groups.pools.remove

interestingness

    flickr.interestingness.getList

machinetags

    flickr.machinetags.getNamespaces
    flickr.machinetags.getPairs
    flickr.machinetags.getPredicates
    flickr.machinetags.getRecentValues
    flickr.machinetags.getValues

panda

    flickr.panda.getList
    flickr.panda.getPhotos

people

    flickr.people.findByEmail
    flickr.people.findByUsername
    flickr.people.getGroups
    flickr.people.getInfo
    flickr.people.getLimits
    flickr.people.getPhotos
    flickr.people.getPhotosOf
    flickr.people.getPublicGroups
    flickr.people.getPublicPhotos
    flickr.people.getUploadStatus

photos

    flickr.photos.addTags
    flickr.photos.delete
    flickr.photos.getAllContexts
    flickr.photos.getContactsPhotos
    flickr.photos.getContactsPublicPhotos
    flickr.photos.getContext
    flickr.photos.getCounts
    flickr.photos.getExif
    flickr.photos.getFavorites
    flickr.photos.getInfo
    flickr.photos.getNotInSet
    flickr.photos.getPerms
    flickr.photos.getRecent
    flickr.photos.getSizes
    flickr.photos.getUntagged
    flickr.photos.getWithGeoData
    flickr.photos.getWithoutGeoData
    flickr.photos.recentlyUpdated
    flickr.photos.removeTag
    flickr.photos.search
    flickr.photos.setContentType
    flickr.photos.setDates
    flickr.photos.setMeta
    flickr.photos.setPerms
    flickr.photos.setSafetyLevel
    flickr.photos.setTags

photos.comments

    flickr.photos.comments.addComment
    flickr.photos.comments.deleteComment
    flickr.photos.comments.editComment
    flickr.photos.comments.getList
    flickr.photos.comments.getRecentForContacts

photos.geo

    flickr.photos.geo.batchCorrectLocation
    flickr.photos.geo.correctLocation
    flickr.photos.geo.getLocation
    flickr.photos.geo.getPerms
    flickr.photos.geo.photosForLocation
    flickr.photos.geo.removeLocation
    flickr.photos.geo.setContext
    flickr.photos.geo.setLocation
    flickr.photos.geo.setPerms

photos.licenses

    flickr.photos.licenses.getInfo
    flickr.photos.licenses.setLicense

photos.notes

    flickr.photos.notes.add
    flickr.photos.notes.delete
    flickr.photos.notes.edit

photos.people

    flickr.photos.people.add
    flickr.photos.people.delete
    flickr.photos.people.deleteCoords
    flickr.photos.people.editCoords
    flickr.photos.people.getList

photos.suggestions

    flickr.photos.suggestions.approveSuggestion
    flickr.photos.suggestions.getList
    flickr.photos.suggestions.rejectSuggestion
    flickr.photos.suggestions.removeSuggestion
    flickr.photos.suggestions.suggestLocation

photos.transform

    flickr.photos.transform.rotate

photos.upload

    flickr.photos.upload.checkTickets

photosets

    flickr.photosets.addPhoto
    flickr.photosets.create
    flickr.photosets.delete
    flickr.photosets.editMeta
    flickr.photosets.editPhotos
    flickr.photosets.getContext
    flickr.photosets.getInfo
    flickr.photosets.getList
    flickr.photosets.getPhotos
    flickr.photosets.orderSets
    flickr.photosets.removePhoto
    flickr.photosets.removePhotos
    flickr.photosets.reorderPhotos
    flickr.photosets.setPrimaryPhoto

photosets.comments

    flickr.photosets.comments.addComment
    flickr.photosets.comments.deleteComment
    flickr.photosets.comments.editComment
    flickr.photosets.comments.getList

places

    flickr.places.find
    flickr.places.findByLatLon
    flickr.places.getChildrenWithPhotosPublic
    flickr.places.getInfo
    flickr.places.getInfoByUrl
    flickr.places.getPlaceTypes
    flickr.places.getShapeHistory
    flickr.places.getTopPlacesList
    flickr.places.placesForBoundingBox
    flickr.places.placesForContacts
    flickr.places.placesForTags
    flickr.places.placesForUser
    flickr.places.resolvePlaceId
    flickr.places.resolvePlaceURL
    flickr.places.tagsForPlace

prefs

    flickr.prefs.getContentType
    flickr.prefs.getGeoPerms
    flickr.prefs.getHidden
    flickr.prefs.getPrivacy
    flickr.prefs.getSafetyLevel

push

    flickr.push.getSubscriptions
    flickr.push.getTopics
    flickr.push.subscribe
    flickr.push.unsubscribe

reflection

    flickr.reflection.getMethodInfo
    flickr.reflection.getMethods

stats

    flickr.stats.getCollectionDomains
    flickr.stats.getCollectionReferrers
    flickr.stats.getCollectionStats
    flickr.stats.getCSVFiles
    flickr.stats.getPhotoDomains
    flickr.stats.getPhotoReferrers
    flickr.stats.getPhotosetDomains
    flickr.stats.getPhotosetReferrers
    flickr.stats.getPhotosetStats
    flickr.stats.getPhotoStats
    flickr.stats.getPhotostreamDomains
    flickr.stats.getPhotostreamReferrers
    flickr.stats.getPhotostreamStats
    flickr.stats.getPopularPhotos
    flickr.stats.getTotalViews

tags

    flickr.tags.getClusterPhotos
    flickr.tags.getClusters
    flickr.tags.getHotList
    flickr.tags.getListPhoto
    flickr.tags.getListUser
    flickr.tags.getListUserPopular
    flickr.tags.getListUserRaw
    flickr.tags.getMostFrequentlyUsed
    flickr.tags.getRelated

test

    flickr.test.echo
    flickr.test.login
    flickr.test.null

urls

    flickr.urls.getGroup
    flickr.urls.getUserPhotos
    flickr.urls.getUserProfile
    flickr.urls.lookupGallery
    flickr.urls.lookupGroup
    flickr.urls.lookupUser



// Pinterest
{
    "status": "success",
    "code": 0,
    "host": "coreapp-ngapi-852",
    "generated_at": "Fri, 12 Jun 2015 11:38:09 +0000",
    "message": "ok",
    "data": {
        "pins": [
            {
                "attribution": null,
                "description": "Netronome - synchronised world metronome with unique time signatures",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": "#000000",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ec0.pinimg.com/237x/4c/f1/16/4cf116fe01a4bd0af7230c1807b75349.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653400505093"
            },
            {
                "attribution": null,
                "description": "Lazer Bean Logo for a laser cutting company",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ec0.pinimg.com/237x/90/46/c5/9046c5217a3240b2e5682e66d71e8d0c.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653398318585"
            },
            {
                "attribution": null,
                "description": "Psykick Holiday Logo - For the pop-noir band (formerly Box Office Poison)",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ak0.pinimg.com/237x/72/cf/7f/72cf7fa54bb0e5c9162bd3cb974d80fe.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653398128960"
            },
            {
                "attribution": null,
                "description": "Sense Kettle Logo - A kettle for the visually impaired - the logo is based on the shape of the product and the braille is the name.",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ak0.pinimg.com/237x/24/00/00/240000c97a4feba878072a2e2c0f1a12.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653398128942"
            },
            {
                "attribution": null,
                "description": "Photosynth Logo - A realtime video based audio synthesizer or pop factory if you like. The video camera records your movements and actions and translates it into pop music!",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 2,
                "dominant_color": "#ffffff",
                "like_count": 1,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ec0.pinimg.com/237x/97/53/63/975363cc10adfa2d33179cb721f9e2db.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653398128932"
            },
            {
                "attribution": null,
                "description": "Awesomething - Inclusive music technology startup. A white boy jams with a black girl and the whole icon is based around the inner cogs of an audio casette.",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 1,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ak0.pinimg.com/237x/fe/03/d4/fe03d4097ae23eda52323eb45eebe2f5.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653398128864"
            },
            {
                "attribution": null,
                "description": "The Urban Beekeeper",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ak0.pinimg.com/237x/94/a0/82/94a08231f5223e71c0cb7a1d68a36202.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653398128639"
            },
            {
                "attribution": null,
                "description": "MED Sound Studio logo (made up of musical typefaces) for the audio engineering software app.",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 2,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ec0.pinimg.com/237x/40/3b/0c/403b0c733efef582c0a2ae36e159c975.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653398128638"
            },
            {
                "attribution": null,
                "description": "Romantic Hip Hop brand",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ak0.pinimg.com/237x/b1/de/aa/b1deaa87289210d8b5d3c922065f6a07.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653398128633"
            },
            {
                "attribution": null,
                "description": "DreamCapturer Logo - a machine that converts your dreams into musical soundtracks.",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ec0.pinimg.com/237x/04/e1/e0/04e1e0ecfafbff383a27106b22efe2d9.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653398128632"
            },
            {
                "attribution": null,
                "description": "Personal Brand - its designer zen dz",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ec0.pinimg.com/237x/12/18/15/1218152280c320d3af6414c80913b802.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653398128631"
            },
            {
                "attribution": null,
                "description": "AudioBus Web-Audio Library. Whilst working on an open source audio library I decided it needed a name and a logo and so set about creating the AudioBus brand! It is a very simple logo but is also extremely versatile - great for customisation and as a result lends itself to be easily integrated into most styles.",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 1,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ak0.pinimg.com/237x/7f/15/3b/7f153bd9048d94a01af65d5b5f0c7fa2.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653396942004"
            },
            {
                "attribution": null,
                "description": "Helios : The Solar Powered Portable Freezer. Take anywhere that is hot, and wonder in amazement as your beverages stay cool. From hot to cool in just 8 secoonds!",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": null,
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "",
                    "url": "/designerzen/logos/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ak0.pinimg.com/upload/562879722116112440_board_thumbnail_2013-01-13-16-14-16_71170_60.jpg",
                    "pin_count": 13,
                    "id": "562879722116112440",
                    "name": "Logos"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ak0.pinimg.com/237x/c8/cc/15/c8cc15983a255ffdeb1c2fdaedf73b69.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653396929477"
            },
            {
                "attribution": null,
                "description": "GO on the go! A collaborative work between myself and the Laserbean product company, this is the medium version (13x13) of the classic game with potholes for your stones - which in this case are beautifully weighted spheres. Never be afraid of popping out to make a cup of tea and knocking the board again as the board can handle upto 30 degrees of abuse! Available from Laserbean and with a new Ultra-Elite model on the way soon, be sure to check out www.laserbean.com to buy your own set.",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 2,
                "dominant_color": "#ffffff",
                "like_count": 0,
                "link": "http://www.laserbean.com/",
                "board": {
                    "description": "Some of the products I've worked on over the years",
                    "url": "/designerzen/products/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ec0.pinimg.com/upload/562879722116112342_board_thumbnail_2013-01-10-16-38-13_22642_60.jpg",
                    "pin_count": 5,
                    "id": "562879722116112342",
                    "name": "Products"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ak0.pinimg.com/237x/07/8d/a4/078da429668f861b029c122f8d42bc69.jpg",
                        "width": 237,
                        "height": 129
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653396927493"
            },
            {
                "attribution": null,
                "description": "If you are a fan of the ancient Japanese game GO but have lost games due to bumping your board, head on over to www.laserbean.com and purchase this customised set with dimples for your pieces - weighty spheres that feel reassuring! Never lose focus again and enjoy bringing harmony to chaos once more. Available in a range of sizes and with any design you wish engraved on the back such as a metaphysical quote or your own logo!",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": null,
                "like_count": 0,
                "link": "http://www.laserbean.com/",
                "board": {
                    "description": "",
                    "url": "/designerzen/repins/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ec0.pinimg.com/upload/default_board_thumbnail_60.jpg",
                    "pin_count": 1,
                    "id": "562879722116112669",
                    "name": "Repins"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ec0.pinimg.com/237x/06/61/46/0661467e76c7fb64d2bdb2faf1091e97.jpg",
                        "width": 237,
                        "height": 129
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653396927477"
            },
            {
                "attribution": null,
                "description": "Distress GPS School Trip Whistle. There have been many incidents in the past where kids have wandered off on school trips and gotten lost, injured or even sold! This products is given to each child before any kind of out-of-school trip and contains a whistle for attracting local attention, a panic-button (that activates a GPS warning signal along with realtime coordinates) and also an LCD screen with an SMS compatible messaging system for relaying information back to the worried student.",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": null,
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "Some of the products I've worked on over the years",
                    "url": "/designerzen/products/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ec0.pinimg.com/upload/562879722116112342_board_thumbnail_2013-01-10-16-38-13_22642_60.jpg",
                    "pin_count": 5,
                    "id": "562879722116112342",
                    "name": "Products"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ec0.pinimg.com/237x/a6/79/e9/a679e9bb2964d22563df2c47f75a7e14.jpg",
                        "width": 237,
                        "height": 237
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653396926412"
            },
            {
                "attribution": null,
                "description": "The Pizza Oven Bike. Fast food delivery with a difference, the food gets cooked on its way to you! With a GPS locator, 7 minutes away from your home, the pizza oven rapidly heats up and cooks your pizza from dough to perfection just in time to ring your doorbell! The oven detaches and the pizza can be served directly onto plates in your house - saving on needless packaging and ensuring you get the best tasting, freshest and hottest pizza. When detached, the indicators show when the oven is done.",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 1,
                "dominant_color": "#000000",
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "Some of the products I've worked on over the years",
                    "url": "/designerzen/products/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ec0.pinimg.com/upload/562879722116112342_board_thumbnail_2013-01-10-16-38-13_22642_60.jpg",
                    "pin_count": 5,
                    "id": "562879722116112342",
                    "name": "Products"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ec0.pinimg.com/237x/fb/c6/22/fbc62289a41ad7a61ad339eb73a0d8cb.jpg",
                        "width": 237,
                        "height": 331
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653396924030"
            },
            {
                "attribution": null,
                "description": "The Pro-Active Plantpot is a smart, independent garden based robot who works in harmony with it's host plant to try and give it the best life it can by offering it whatever it wants and needs! With 360 degree tracks, and light, temperature and moisture sensors, the mechapot will seek out the best spot in the garden, be it in the sun, or the shade or even in the wettest part if they need a drink. With multiple mechapots they harmoniously interact to help keep the plants social and safe.",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": null,
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "Some of the products I've worked on over the years",
                    "url": "/designerzen/products/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ec0.pinimg.com/upload/562879722116112342_board_thumbnail_2013-01-10-16-38-13_22642_60.jpg",
                    "pin_count": 5,
                    "id": "562879722116112342",
                    "name": "Products"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ak0.pinimg.com/237x/f8/08/fa/f808fad611dd8fbb63d06c7870084941.jpg",
                        "width": 237,
                        "height": 337
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653396924001"
            },
            {
                "attribution": null,
                "description": "A simple attachment to your glasses that has an accompanying necklace armed with a secret button. When you lose your glasses you can now activate a loudspeaker in the device by clicking the button on the pendant. By following the unique pink noise you can easily locate your glasses from up to 50 metres away! Small and inconspicuous, the widget sits just behind your ear and is extremely lightweight and soft to the touch. Both parts are recharged by the temperature and motion of your body.",
                "pinner": {
                    "about": "Creating stuff since '81",
                    "location": "London",
                    "full_name": "designerzen zen",
                    "follower_count": 0,
                    "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
                    "pin_count": 19,
                    "id": "562879790835569750",
                    "profile_url": "http://www.pinterest.com/designerzen/"
                },
                "repin_count": 0,
                "dominant_color": null,
                "like_count": 0,
                "link": null,
                "board": {
                    "description": "Some of the products I've worked on over the years",
                    "url": "/designerzen/products/",
                    "follower_count": 0,
                    "image_thumbnail_url": "http://media-cache-ec0.pinimg.com/upload/562879722116112342_board_thumbnail_2013-01-10-16-38-13_22642_60.jpg",
                    "pin_count": 5,
                    "id": "562879722116112342",
                    "name": "Products"
                },
                "images": {
                    "237x": {
                        "url": "http://media-cache-ec0.pinimg.com/237x/e3/b6/92/e3b692556598d2858cb13c40681d25e0.jpg",
                        "width": 237,
                        "height": 327
                    }
                },
                "embed": null,
                "is_video": false,
                "id": "562879653396923951"
            }
        ],
        "user": {
            "about": "Creating stuff since '81",
            "location": "London",
            "full_name": "designerzen zen",
            "follower_count": 0,
            "image_small_url": "http://media-cache-ak0.pinimg.com/avatars/designerzen-1357757221_30.jpg",
            "pin_count": 19,
            "id": "562879790835569750",
            "profile_url": "http://www.pinterest.com/designerzen/"
        }
    }
}




// Github
[
  {
    "id": 1296269,
    "owner": {
      "login": "octocat",
      "id": 1,
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "name": "Hello-World",
    "full_name": "octocat/Hello-World",
    "description": "This your first repo!",
    "private": false,
    "fork": true,
    "url": "https://api.github.com/repos/octocat/Hello-World",
    "html_url": "https://github.com/octocat/Hello-World",
    "clone_url": "https://github.com/octocat/Hello-World.git",
    "git_url": "git://github.com/octocat/Hello-World.git",
    "ssh_url": "git@github.com:octocat/Hello-World.git",
    "svn_url": "https://svn.github.com/octocat/Hello-World",
    "mirror_url": "git://git.example.com/octocat/Hello-World",
    "homepage": "https://github.com",
    "language": null,
    "forks_count": 9,
    "stargazers_count": 80,
    "watchers_count": 80,
    "size": 108,
    "default_branch": "master",
    "open_issues_count": 0,
    "has_issues": true,
    "has_wiki": true,
    "has_pages": false,
    "has_downloads": true,
    "pushed_at": "2011-01-26T19:06:43Z",
    "created_at": "2011-01-26T19:01:12Z",
    "updated_at": "2011-01-26T19:14:43Z",
    "permissions": {
      "admin": false,
      "push": false,
      "pull": true
    }
  }
]
