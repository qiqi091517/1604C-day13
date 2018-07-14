require(['jquery','getReq'],function($,getReq){
    var id = getReq.id;
    $.ajax({
        url:'/api/detail?id='+id,
        dataType:'json',
        success:function(res){
            
        },
        error:function(err){
            console.log(error)
        }
    })
})