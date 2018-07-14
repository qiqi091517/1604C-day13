define(['jquery', 'handlebars'], function($, handlebars) {
    function render(el, data, parent, isHtml) {
        // 获取模板
        var source = $(el).html();
        // 编译模板
        var tpl = handlebars.compile(source);
        // 传入数据
        var html = tpl(data);
        // 传入数据
        if (isHtml) {
            $(parent).html(html);
        } else {
            $(parent).prepend(html);
        }
    }
    return render;
})