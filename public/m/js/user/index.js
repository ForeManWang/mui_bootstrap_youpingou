$(function(){
    /*1.显示用户信息*/
    var render = function(){
        getUserData(function(data){
            $('.mui-media-body').html(data.username+'<p class="mui-ellipsis">绑定手机:'+data.mobile+'</p>');
        });
    }
    render();
    /*2.退出操作*/
    $('.mui-block').on('click',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            data:'',
            dataType:'json',
            success:function(data){
                if(data.success){
                    location.href = '/m/user/login.html';
                }
            }
        });
    });
});
/*获取用户信息*/
var getUserData = function(callback){
    lt.ajaxFilter({
        type:'get',
        url:'/user/queryUserMessage',
        data:'',
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
}