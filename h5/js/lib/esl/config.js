var webSet = {
    cdn     : 'http://trendzoneh5.tulindev.com:81',
    /*cdn:"http://maggiedodo.sinaapp.com/h5",*/
    //version : Math.random()
    version : '1.1'
    //version : ''
};
(function (global) {

    if ( webSet.cdn ) {
        var baseUrl = webSet.cdn;
    } else {
        var baseUrl = global.location.protocol + '//' + global.location.host;
    }

    require.baseUrl = baseUrl;

    require.config({

        baseUrl: baseUrl,

        paths: {
            'jquery': 'js/lib/jquery/jquery-1.11.3',
            'loaddata': 'js/dist/loaddata',
            'autodata': 'js/dist/autodata',
            'lazydata': 'js/dist/lazydata',
            'qr': 'js/dist/jquery.qrcode.min',
            'hammer': 'js/lib/hammer/hammer-2.0.4',
            'jquerymobile': 'js/lib/jquerymobile/jquery.mobile-1.4.5',
            'qrcode':'js/lib/qrcode/jquery.qrcode.min',
            'touch': 'js/dist/touch',
            'wxShare': 'js/lib/wx/jweixin/jweixin-1.0.0',
            'wxShareWeb' : 'http://res.wx.qq.com/open/js/jweixin-1.0.0',
            'wxShareSet': 'js/dist/wxShareSet',
            'countDown': 'js/dist/countDown',
            'template': 'js/lib/template/3.0.0/template',
            'autocomplete': 'js/lib/autocomplete/jquery.autocomplete',
            'autocompleter': 'js/lib/autocompleter/jquery.autocompleter',
            'qq': 'js/lib/fileuploader/fileuploader',
            'pagination': 'js/lib/pagination/pagination',
            'lazyload': 'js/lib/lazyload/jquery.lazyload',
            'daBanner1': 'js/dist/daBanner1',
            'public' : 'js/public/public',
            'page' : 'js/dist/page',
            'router' : 'js/dist/router',
            'angular' : 'js/lib/angular/1.2.29/angular',
            'angular1.29' : 'js/lib/angular/1.2.29/angular',
            'angular1.5.0' : 'js/lib/angular/1.5.0/angular',
            'angular1.5.0-animate' : 'js/lib/angular/1.5.0/angular-animate',
            'angular1.5.0-route' : 'js/lib/angular/1.5.0/angular-route',
            'angular1.5.0-touch' : 'js/lib/angular/1.5.0/angular-touch',
            'angular1.29-route' : 'js/lib/angular/1.2.29/angular-route',
            'angular-ui-router' : 'js/lib/angular/angular-ui-router/0.2.15/angular-ui-router',
            'imgpreload' : 'js/lib/imgpreload/jquery.imgpreload',
            'loadimg' : 'js/dist/loadimg',
            'remodal' : 'js/lib/remodal/remodal',
            'message' : 'js/dist/message'
        }
    });

}(this));