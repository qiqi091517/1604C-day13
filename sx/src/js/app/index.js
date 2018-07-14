require(['jquery', 'swiper', 'bscroll', 'handlebars'], function($, swiper, bscroll, handlebars) {
    new swiper('.swiper-container', {
        autoplay: 1000,
        pagination: '.swiper-pagination'
    })
    var newBscroll = new bscroll('.list', {
        probeType: 2,
        click: true,
    })
    var _parent = $('.list>div')
    var pagenum = 1;
    var end = 4;
    newBscroll.on('scroll', function() {
        if (this.y < this.maxScrollY - 22) {
            _parent.attr('down', '松开加载')
            if (pagenum < end) {
                _parent.attr('down', '松开加载')
            } else {
                _parent.attr('down', '已经到底了')
            }
        } else if (this.y < this.maxScrollY) {
            if (pagenum < end) {
                _parent.attr('down', '上拉加载')
            } else {
                _parent.attr('down', '已经到底了')
            }
        } else if (this.y > 30) {
            _parent.attr('up', '松开刷新')
        } else if (this.y > 10) {
            _parent.attr('up', '下拉刷新')
        }
    })
    newBscroll.on('touchEnd', function() {
        if (_parent.attr('up') === '松开刷新') {
            location.reload();
        } else if (_parent.attr('down') === '松开加载') {
            if (pagenum < end) {
                pagenum++;
                $.ajax({
                    url: '/api/list?pagenum=' + pagenum,
                    dataType: 'json',
                    success: function(res) {
                        console.log(res);
                        var tpl = $('#tpl').html();
                        var templeate = handlebars.compile(tpl);
                        var html = templeate(res.msg);
                        $('.hotel').append(html);
                        newBscroll.refresh();
                    },
                    error: function(error) {
                        console.warn(error);
                    }
                })
                _parent.attr('down', '上拉加载')
            } else {
                _parent.attr('down', '已经到底了')
            }
        }
    })
    $.ajax({
        url: '/api/list?pagenum=' + pagenum,
        dataType: 'json',
        success: function(res) {
            console.log(res);
            var tpl = $('#tpl').html();
            var templeate = handlebars.compile(tpl);
            var html = templeate(res.msg);
            $('.hotel').html(html);
            newBscroll.refresh();
        },
        error: function(error) {
            console.warn(error);
        }
    })
    $('.hotel').on('click', 'li', function() {
        var id = $(this).attr('data-id');
        location.href = '../../page/detail.html?id=' + id;
    })
})