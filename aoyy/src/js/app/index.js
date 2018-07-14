require(['jquery', 'handlebars'], function ($, handlebars) {
    $.ajax({
        url:'/api/anis',
        dataType:'json',
        success : function (res) {
            var source = $('#sins').html();
            var template = handlebars.compile(source);
            var html = template(res.mag);
            $('.bottom').html(html);
        }
    })
})