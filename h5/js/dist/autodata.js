define(function(require){
    'use strict';
    var load = require('loaddata'),
        loadForm = $('form.autodata');
    loadForm.each(function(){
        var o = $(this),
            templateFrom = o.attr('templateFrom'),
            templateTo = $('#'+o.attr('templateTo')),
            debug = !!o.attr('debug'),
            lazyObj = $(o.attr('lazyObj')),
            message =
                ($('#'+templateFrom).length !== 1 && '模板名称错误') ||
                ( templateTo.length !== 1 && '模板插入对象错误' ) ||
                false;
        o.css('display','none');
        if (!!message) {
            if (debug) {
                console.log(message);
            }
            return;
        }
        lazyObj = lazyObj.length === 0 ? null : lazyObj;
        load.loaddata({
            port:'core/corejson.php',
            params:o,
            type: 'POST',
            templateFrom: templateFrom,
            templateTo: templateTo,
            lazyObj: lazyObj,
            doneFn : function(data){
                if (debug) {
                    console.log(data);
                }
            }
        });
    });
    return load;
});