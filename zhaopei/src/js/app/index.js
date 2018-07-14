require(['jquery', 'swiper', 'bscroll', 'handlebars', 'render'], function($, Swiper, BScroll, handlebars, render) {

    var y, maxY, degree = 0;

    // 渲染轮播
    $.ajax({
        url: '/api/mySwiper',
        success: function(data) {
            render('#mySwiper', JSON.parse(data), '.swiper-wrapper', true);
            // 轮播2
            var mySwiper = new Swiper('.ban', {
                loop: true,
                autoplay: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            });
        }
    });

    // Better Scrooll
    var myBScroll = new BScroll('.scroll', {
        click: true,
        scrollY: true,
        probeType: 2
    })

    // 加载更多 
    myBScroll.on('scroll', function() {
        // 赋值
        y = Math.abs(this.y);
        maxY = Math.abs(this.maxScrollY);
    });

    // 渲染内容

    $.ajax({
        url: '/api/list',
        success: function(data) {
            render('#list', JSON.parse(data), '.box', false);
        }
    });

    // 结束滚动
    myBScroll.on('scrollEnd', function() {
        if (y - 44 > maxY) {
            if (degree < 4) {
                degree++;
                $.ajax({
                    url: '/api/list',
                    success: function(data) {
                        var data = JSON.parse(data).slice(0, 2);
                        render('#list', data, '.box', false);
                        myBScroll.refresh();
                    }
                })
            } else {
                $('.add-in').html('暂无更多数据');
            }
        }
    });

    // 详情页
    $('.box').delegate('.con', 'click', function() {
        var id = $(this).data('id');
        // location.href = './page/details.html?id=' + id;
        location.href = "jd.html"
    })
});