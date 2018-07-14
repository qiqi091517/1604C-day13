require(['jquery', 'render', 'bscroll'], function ($, render, bscroll) {
    var pagenum = 1; //默认

    var listScroll = new bscroll('.con', {
        probeType: 2,
        click: true,
        scrollY: true
    });

    //监听滚动事件
    var _parent = $(".con>div");
    listScroll.on("scroll", function () {
        if (this.y < this.maxScrollY - 44) {
            if(pagenum<total){
            _parent.attr("up", "释放加载更多");
            }else{  
            _parent.attr("up", "已经到底");
            }
        } else if (this.y < this.maxScrollY - 22) {
            if(pagenum<total){
                _parent.attr("uo","上拉加载")
            }else{
                _parent.attr("up", "已经到底");
            }
            
        } else if (this.y > 44) {
            _parent.attr("down", "释放刷新")
        }
    })
    listScroll.on('touchEnd', function () {
        if (_parent.attr("up") === "释放加载更多") {
            if(pagenum<total){
            pagenum ++;
            getList(pagenum);
            _parent.attr("up", "上拉加载")
            }else{
                _parent.attr("up", "已经到底")
            }
        } else if (_parent.attr('down') === "释放刷新") {
            location.reload();
        }
    })
    function getList(pagenum){
        $.ajax({
            url:'/api/list?pagenum=' + pagenum,
            dataType:'json',
            success:function(res){
                console.log(res);
                if(res.code === 1){
                    render("#item-tpl",".ul-wrap",res.datas);
                    listScroll.refresh();
                }
            },
            error:function(error){
                console.warn(error)
            }
        })
    }
    getList(pagenum);
    $(".ul-wrap").on("click","li",function(){
        var id = $(this).attr("data-id");
        location.href="../../page/detail.html?id="+id
    })
})