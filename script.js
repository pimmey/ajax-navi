(function () {
    'use strict';

    var $main = $('#main');
    var $loader = $('#loader');
    var $links = $('.ajax-link');
    var currentHash;
    var linkColors = {
        '#/404': 'lightgray'
    };

    for (var i = 0, max = $links.length; i < max; i++) {
        linkColors[$($links[i]).attr('href')] = $($links[i]).data('bg-color');
    }
    console.log('linkColors', linkColors);

    var Loader = {
        on: function () {
            $loader.css('visibility', 'visible');
        },
        off: function () {
            $loader.css('visibility', 'hidden');
        }
    };

    function handleCurrentPage (hash) {
        $links.removeClass('current-page');

    }

    function handleClick (href, bgColor, pushState) {
        var fullHref = href;
        var noHashHref = fullHref.replace(/#\//, '');
        console.log('fullHref', fullHref);
        console.log('noHashHref', noHashHref);

        if (fullHref === currentHash) {
            console.warn('Same page, not loading anything.');
            return;
        }

        currentHash = fullHref;

        if (noHashHref.length === 0) {
            noHashHref = 'home';
        }

        handleCurrentPage(fullHref);
        Loader.on();

        $.ajax({
            url: 'pages/' + noHashHref + '.html'
        }).done(function (resp) {
            if (pushState) {
                window.history.pushState(null, null, fullHref);
            } else {
                window.history.replaceState(null, null, fullHref);
            }
            document.title = noHashHref.charAt(0).toUpperCase() + noHashHref.slice(1);
            $main.html(resp);
            $('body').css('background', bgColor);
        }).fail(function (err) {
            console.error('ajax.fail', err);
            handleClick('#/404', linkColors['#/404'], true);
        }).always(function () {
            Loader.off();
        });
    }

    function handleLoad () {
        var location = window.location;
        var hash = location.hash;
        console.log('location', location);

        if (hash.length > 0) {
            console.log('hash', hash);
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
        console.log('#', $(this).attr('href').indexOf('#'));
        var href = $(this).attr('href');
        var bgColor;
        if (href.indexOf('#') !== -1) {
            bgColor = $(this).data('bg-color');
            console.log('bg-color', bgColor);
            handleClick(href, bgColor, true);
        }
    });

    /*
    * Handling initial window load
    * */
    $(window).on('load popstate', function (e) {
        console.info('popstate', e);
        handleLoad();
    });

}());
