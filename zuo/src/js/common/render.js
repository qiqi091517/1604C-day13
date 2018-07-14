define(['jquery', 'handlebars'], function($, hand) {
    var render = function(source, target, data, ishtml) {
        var tpl = $(source).html(); // 获取handlebars的模板
        var template = hand.compile(tpl); // 用handlebars。compile方法三来编译模板
        // 有需要写注册帮助  必须在传入数据之前写
        //  注册   handlebars。registerHelper('addindex',function(ind){
        //     return 执行条件
        // })
        var html = template(target) // 传入数据
        if (ishtml) {
            $(data).html(html)
        } else {
            $(data).append(html)
        }



    }
    return render
})