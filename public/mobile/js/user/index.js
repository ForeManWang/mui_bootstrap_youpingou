/**
 * ITCAST WEB
 * Created by zhousg on 2017/1/2.
 */
$(function(){

    getUserIndexData(function(data){
        var mobile = data.mobile||'暂无';
        $('.mui-media-body').html(data.username+'<p class="mui-ellipsis">绑定手机:'+data.mobile+'</p>');
    });

    $('body').on('tap','.btn_outLogin',function(){
        getLoginOutData(function(data){
            if(data.success){
                location.href = LeTao.LOGIN_URL;
            }
        });
    });
});
var getUserIndexData = function(callback){
    LeTao.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        data:'',
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};
var getLoginOutData = function(callback){
    LeTao.ajax({
        type:'get',
        url:'/user/logout',
        data:'',
        dataType:'json',
        beforeSend:function(){
            $('.btn_login').html('正在退出...');
        },
        success:function(data){
            callback && callback(data);
        }
    });
};