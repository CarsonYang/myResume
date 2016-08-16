define(function(require){
    'use strict';
    var $ = require('jquery');

    var countDown = function(o,time){
        var d = 0,
            h = 0,
            m = 0,
            s = 0,
            dd = 86400,
            hh = 3600,
            mm = 60,
            str = '',
            count = time;
        var setTime = function(n){
            d = Math.floor( n/dd );
            h = Math.floor( (n - d * dd )/hh );
            m = Math.floor( (n - d * dd - h * hh)/mm );
            s = n % mm;                 
            str = '还有<span>'+d+'</span>天<span>'+h+'</span>时<span>'+m+'</span>分<span>'+s+'</span>秒';
            o.html(str);
        };
        var mar = setInterval(function(){
            count--;
            if( count<0 ){
                clearInterval(mar);
                return;
            } else {
                setTime(count);
            }
        },1000);

    };
    return countDown;
});