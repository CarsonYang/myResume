define(function(require){
    'use strict';
    require('touch');
    var page = 0,
        max = $('.bgmove').children().size();
    (function(){
        var o = $('.bgmove');
        o.touch('to', function (result) {
            if ( result.to === 'up' ) {
                moveDown();
            } else if ( result.to === 'down' ) {
                if ( page===0 ) {
                    return;
                }
                page--;
                page = page <= 0 ? 0 : page;
                $('.arrow').show();
                $('.go').hide();
                moveUpDown(page);
            }
        });
    })();
    /* move down */
    var moveDown = function () {
        if ( page===max - 1 ) {
            return;
        }
        if ( page === max - 2 ) {
            $('.arrow').hide();
            $('.go').show();
        }
        page++;
        page = page >= max - 1 ? max - 1 : page;
        moveUpDown(page);
    };
    /* move up or down */
    var moveUpDown = function(page){
        var height = $('body').height(),
            o = $('.bgmove'),
            y = -height * page + 'px';
        o.css({
            'transform': 'translate3d(0, '+ y +', 0)',
            '-webkit-transform': 'translate3d(0, '+ y +', 0)'
        });
    };

    /* arrow */
    (function () {
        var arrow = $('.arrow');
        arrow.bind('click', function () {
            moveDown();
        });
    })();
    /*share*/
    var url = window.location.search.substr(1);
    if ( !!~url.indexOf('type=share') ) {
        $('.share').show();
    }
    (function () {
        $('.share').bind('click', function () {
            $(this).hide();
        });
    })();
    /*loading*/
    var reload = function(){
        $(".bgmove li").height($("body").height());
        $(".bgmove").height($("body").height()*max);
    };
    reload();

    /*music*/
    (function(){
        /*开关*/
        $('.music').bind('click', function () {
            var isPlay = $('.music').hasClass('on');
            if ( isPlay ) {
                $(this).removeClass('on').addClass('off');
                $('#audio')[0].pause();
            } else {
                $(this).removeClass('off').addClass('on');
                $('#audio')[0].play();
            }
        });
    })();
});