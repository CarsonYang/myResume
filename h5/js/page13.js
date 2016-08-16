define(function (require) {
    'use strict';
    require('jquery');

    (function(){
        alert(1);
        $("#code").on("click",function(){
            alert(11);
        });
    })();
});



























