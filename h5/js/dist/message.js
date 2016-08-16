define(function (require) {
    'use strict';
    var $ = require('jquery');
    require('remodal');

    var html = '';

    html += '<div class="remodal" data-remodal-id="modal">';
    html += '<button data-remodal-action="close" class="remodal-close"></button>';
    html += '<p></p>';
    html += '<br>';
    html += '<button data-remodal-action="confirm" class="remodal-confirm">确定</button>';
    html += '</div>';

    $('body').append(html);
    var remodal = $('.remodal'),
        p = remodal.find('p');

    return function (msg) {
        if ( !msg ) {
            return;
        }
        function isIe(){
            return ("ActiveXObject" in window);
        }
        if ( isIe() ) {
            alert(msg);
        } else {
            p.html(msg);
            var inst = remodal.remodal();
            inst.open();
        }
        //inst.destroy();
    };
});