define(function () {
    return function (key) {
        var strSearch = window.location.search.substr(1);
        var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
        return strSearch.match(reg)[2];
    };
});