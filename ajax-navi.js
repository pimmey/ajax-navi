(function () {
    'use strict';

    /*
    * To enable logs in console uncomment the Logger.useDefaults() line
    * */
    //Logger.useDefaults();

    /*
    * The container where our content is going to be loaded
    * */
    var $main = $('#main');

    /*
    * All the links that need AJAX treatment
    * */
    var $links = $('.ajax-link');

    /*
    * Global current hash variable
    * */
    var currentHash;

    /*
    * Any custom unretrievable colors should be declared first
    * */
    var linkColors = {
        '#/404': 'lightgray'
    };

    /*
    * Populating the linkColors array in order to use it when there's no click
    * */
    for (var i = 0, max = $links.length; i < max; i++) {
        var $link =  $($links[i]);
        linkColors[$link.attr('href')] = $link.data('bg-color');
    }
    Logger.debug('linkColors', linkColors);

    /*
    * Using this function, we can assign a current page class
    * */
    function handleCurrentPage (hash) {
        $links.removeClass('current-page');
        for (var i = 0, max = $links.length; i < max; i++) {
            var $link =  $($links[i]);
            if ($link.attr('href') === hash) {
                $link.addClass('current-page');
            }
        }
    }

    /*
    * This is the click handing function, it substitutes all of the normal clicks
    * as well as page loads and history change */
    function handleClick (href, bgColor, pushState) {
        var fullHref = href;
        var noHashHref = fullHref.replace(/#\//, '');
        Logger.debug('fullHref', fullHref);
        Logger.debug('noHashHref', noHashHref);

        /*
        * A little check to avoid loading anything, if we're trying to access an already open page
        * */
        if (fullHref === currentHash) {
            Logger.warn('Same page, not loading anything.');
            return;
        }

        currentHash = fullHref;

        /*
        * Empty hash means we should go home
        * */
        if (noHashHref.length === 0) {
            noHashHref = 'home';
        }

        /*
        * Assinging the .current-page class to the current page item menu
        * */
        handleCurrentPage(fullHref);

        /*
        * Initializing the AJAX call to fetch the page
        * */
        $.ajax({
            url: 'pages/' + noHashHref + '.html'
        }).done(function (resp) {
            /*
            * A bit of history manipulation
            * */
            if (pushState) {
                window.history.pushState(null, null, fullHref);
            } else {
                window.history.replaceState(null, null, fullHref);
            }

            /*
            * Changing the document title
            * */
            document.title = noHashHref.charAt(0).toUpperCase() + noHashHref.slice(1);

            /*
            * Popuilating the $main container with our contents
            * */
            $main.html(resp);

            /*
            * Changing the body background class according to the data-bg-color information on the link
            * */
            $('body').css('background', bgColor);
        }).fail(function (err) {
            /*
            * When faililng to fetch the page, send to 404 page
            * */
            Logger.error('ajax.fail', err);
            handleClick('#/404', linkColors['#/404'], true);
        });
    }

    /*
    * This function is running on page load and popstate
    * It's checking for the current hash and handles the URL accordingly
    * */
    function handleLoad () {
        var location = window.location;
        var hash = location.hash;
        Logger.debug('location', location);

        if (hash.length > 0) {
            Logger.debug('hash', hash);
            handleClick(hash, linkColors[hash], false);
        } else {
            hash = '#/';
            handleClick(hash, linkColors[hash], false);
        }
    }

    /*
    * Handling clicks
    * */
    $links.on('click', function (e) {
        e.preventDefault();
        Logger.debug('#', $(this).attr('href').indexOf('#'));
        var href = $(this).attr('href');
        var bgColor;
        if (href.indexOf('#') !== -1) {
            bgColor = $(this).data('bg-color');
            Logger.debug('bg-color', bgColor);
            handleClick(href, bgColor, true);
        }
    });

    /*
    * Handling initial window load
    * */
    $(window).on('load popstate', function (e) {
        Logger.info('popstate', e);
        handleLoad();
    });

}());
