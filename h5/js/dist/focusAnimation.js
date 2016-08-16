define(function (require) {
    'use strict';
    var $ = require('jquery');

    $.fn.focusAnimation = function (option) {
        var that = $(this),
            clickObj = option.clickObj || {};

        var init = function () {
            that.empty();
            $.each(option.data, function (k,v) {
                that.append('' +
                '<div class="fouceAnimationBox" index="'+k+'">' +
                    '<div class="fouceAnimationOutSide"></div>' +
                    '<div class="fouceAnimationPoint"></div>' +
                    '<div class="fouceAnimationInSide"></div>' +
                '</div>' +
                '<div class="fouceAnimationTitle" index="'+k+'">'+ v.title+'</div>' +
                '');
                that.find('.fouceAnimationBox[index="'+k+'"]').css({
                    'top': v.y-75,
                    'left': v.x-75
                }).find('.fouceAnimationInSide').bind('click', function () {
                    $('.index_load').load(v.url, function () {
                        $('.index_load').css({
                            'height':'100%'
                        });
                    });
                });
                that.find('.fouceAnimationTitle[index="'+k+'"]').css({
                    'top': v.y-75,
                    'left': v.x+130-75
                });
            });
        }();

        var box = that.find('.fouceAnimationBox');


        var zoomAnmationJquery = function (jqObj) {
            var outSide = jqObj.find('.fouceAnimationOutSide'),
                inSide = jqObj.find('.fouceAnimationInSide'),
                point = jqObj.find('.fouceAnimationPoint'),
                title = jqObj.next('.fouceAnimationTitle');
            outSide.animate({
                'background-size':'100%'
            }, 300).animate({
                'background-size':'90%'
            },100, function () {
                point.animate({
                    'background-size':'20%'
                }, 300).animate({
                    'background-size':'15%'
                },100, function () {
                    inSide.animate({
                        'background-size':'60%'
                    }, 300).animate({
                        'background-size':'50%'
                    },100, function () {
                        title.show('fast');
                    });
                });
            });
        };

        var show = function () {
            box.each(function (i) {
                var _self = $(this);
                _self.css('display','block');
                setTimeout(function () {
                    zoomAnmationJquery(_self);
                },300*i);
            });
        };
        
        if (!$.isEmptyObject(clickObj)) {
            clickObj.bind('click', function () {
                show();
            });
        }

        show();

    };

    return $;
});