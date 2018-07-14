define(['jquery', 'swiper', 'bscroll', 'render'], function($, swiper, bscroll, render) {
    var pagenum = 1,
        total = 4;
    var swiper = new swiper('.banner', {
        pagination: {
            el: '.swiper-pagination'
        }
    })
    var listbscroll = new bscroll('.box', {
        click: true,
        scrollY: true,
        probeType: 2
    })
    var _parent = $('.box>div');
    listbscroll.on('scroll', function() {
        if (this.y < this.maxScrollY - 44) {
            if (pagenum < total) {
                _parent.attr('up', "释放加载更多")
            } else {
                _parent.attr('up', "加载完毕");
            }

        } else if (this.y < this.maxScrollY - 22) {
            if (pagenum < total) {
                _parent.attr('up', "上拉加载")
            } else {
                _parent.attr('up', "加载完毕");
            }
            _parent.attr('up', "上拉加载");
        } else if (this.y > 44) {
            _parent.attr('down', '释放刷新')
        }
    })
    listbscroll.on("touchEnd", function() {
        if (_parent.attr("up") === "释放加载更多") {
            if (pagenum < total) {
                pagenum++;
                getlist(pagenum);
                _parent.attr('up', "上拉加载");
            } else {
                _parent.attr('up', "加载完毕");
            }

        } else if (_parent.attr('down') === "释放刷新") {
            location.reload();

        }
    })
    $.ajax({
        url: '/api/swiper',
        dataType: 'json',
        success: function(res) {
            if (res.code === 1) {
                render('#swipertpl', res.data.data, '.swiper-wrapper', true)

            }
        },
        error: function(error) {
            console.warn(error)
        }
    })

    getlist(pagenum);

    function getlist() {
        $.ajax({
            url: '/api/list?pagenum' + pagenum,
            dataType: 'json',
            success: function(data) {
                console.log(data.data.list)
                if (data.code === 1) {
                    render('#listtpl', data.data.list, '.con')
                    listbscroll.refresh()
                }
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }
})
$('.con').on('click', 'dl', function() {
    var id = $(this).data('id')
    location.href = "/detail.html?id=" + id;
})