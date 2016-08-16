define(function (require) {
    'use strict';
    require('angular1.5.0');
    require('angular1.5.0-animate');
    require('angular1.5.0-route');
    require('touch');
    require('loadimg');

    var app = angular.module('app', ['ngRoute', 'ngAnimate']);
    var max_page = 5; //我的简历目前支持两页
    app.config(function($routeProvider) {
        $routeProvider.otherwise({
           redirectTo: '/page1'
        });
        for (var i = 1 ; i<=max_page ; i++) {
            $routeProvider.when('/page'+i, {
                templateUrl: 'templates/page'+i+'.tpl',
                controller: 'pageCrtl'
            });
        }
    });
    app.controller('pageCrtl', function($scope, $location) {
        $scope.pageClass = '';
        $scope.getPage = function() {
            return +$location.path().replace(/\/page/ig,'');
        }
        $scope.setPage = function (page) {
            if ( page <= 0 ) {
                return max_page;
            } else if ( page > max_page ) {
                return 1;
            } else {
                return page;
            }
        }
        $scope.goto = function (page) {
            window.location.hash = '#/page'+page;
        }
    });
    app.directive('page', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.touch('to', function(result){
                    var page = scope.getPage();
                    if ( result.to ==='up' ) {
                        page++;
                        page = scope.setPage(page);
                        element.removeClass('down');
                        element.addClass('up');
                    } else if ( result.to ==='down' ) {
                        page--;
                        page = scope.setPage(page);
                        element.removeClass('up');
                        element.addClass('down');
                    }
                    scope.goto(page);
                });
            }
        }
    });

    (function(){
        $(".music").on("click",function(){
            if($(this).attr("type")==="on"){
                $(this).attr("type","off");
                $(this).removeClass("musicOn");
                $(this).addClass("musicOff");
                $("audio")[0].pause();
            } else {
                $(this).attr("type","on");
                $(this).removeClass("musicOff");
                $(this).addClass("musicOn");
                $("audio")[0].play();
            }

        });
    })();
});




























