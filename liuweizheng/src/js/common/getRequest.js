define(function () {
    var getReq = function() {
        var url = location.search;

        var params = {}

        if (url.indexOf("?") > -1) {
            url = url.substr(1);
            var arr = url.split("&")


            arr.forEach(function (item) {
                var itemArr = item.split("="); //["id",2]['age',18]
                params[itemArr[0]] = itemArr[1];
            })
        }
        return params
    }
})