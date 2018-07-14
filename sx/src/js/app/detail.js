require(['jquery'], function($) {
    var url = location.search;

    var params = {};

    if (url.indexOf("?") > -1) {
        url = url.substr(1);
        var arr = url.split("&");

        arr.forEach(function(file) {
            var fileArr = file.split('=');
            params[fileArr[0]] = fileArr[1];
        })
    }
    console.log(params);

    var id = params.id;
    $.ajax({
        url: '/api/detail?id=' + id,
        dataType: 'json',
        success: function(res) {
            console.log(res)
            var str = '';
            res.data.forEach(function(file) {
                console.log(file);
                str += '<h3>' + file.title + '</h3><p>' + file.name + '</p>'
            })
            $('body').html(str);
        },
        error: function(error) {
            console.warn(error)
        }
    })
})