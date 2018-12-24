/*初始化区域滚动组件*/
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});

$(function(){
    /*
     * 初始渲染
     * 1.获取数据
     * 2.动态模版渲染
     * */
    var urlParams = lt.getUrlParams();
    var render = function(){
        /*获取id*/
        getProductDetailData({
            id:urlParams.productId
        },function(data){
            $('.mui-scroll').html(template('detail',data));
            /*轮播图的初始化*/
            mui('.mui-slider').slider({
                interval:4000
            });
            /*数量选择初始化*/
            mui('.mui-numbox').numbox();
        });
    };
    render();

    /*重新加载*/
    $('.mui-icon-reload').on('tap',function(){
        $('.mui-scroll').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
        render();
    });

    /*尺码选择*/
    $('.mui-scroll').on('tap','.size',function(){
        var currSize = $(this);
        $('.size').removeClass('now');
        currSize.addClass('now');
    });

    /*数量选择*/

    /*
    加入购物车
    1.需要获取  数据（商品id 尺码 数量） 校验数据
    2.通过接口发送给后台 ajax
    3.成功  提示用户  添加成功  弹出一个对话框  去购物车查看
    4.失败  提示用户  添加失败
    5.防止二次提交
    */
    $('.mui-btn-danger').on('tap',function(){
        /*6.防重复提交*/
        if(window.addCarting){
            return false;
        }
        /*1.需要获取数据*/
        var data = {
            productId:urlParams.productId,
            size:$('.size.now').html(),
            num:$('.mui-input-numbox').val()
        };
        /*2.数据校验*/
        if(!data.productId){
            mui.toast('商品异常');
            return false;
        }
        if(!data.size){
            mui.toast('请选择尺码');
            return false;
        }
        if(!data.num){
            mui.toast('请选择数量');
            return false;
        }
        /*3.发送后台*/
        lt.ajaxFilter({
            type:'post',
            url:'/cart/addCart',
            data:data,
            dataType:'json',
            beforeSend:function(){
                window.addCarting = true;
            },
            success:function(data){
                /*4.成功*/
                if(data.success){
                    mui.confirm('加入购物车成功，去购物车看看？', '温馨提示', ['去看看','继续浏览'], function(e) {
                        if (e.index == 0) {
                            /*按了第一个按钮*/
                            location.href = 'user/cart.html';
                        } else {
                            /*按了其他按钮 暂时处理*/
                        }
                    });
                }
                /*5.失败*/
                else{
                    mui.toast('添加失败，请重试！');
                }
                window.addCarting = false;
            },
            error:function(){
                mui.toast('网络繁忙！');
                window.addCarting = false;
            }
        });

    });

});

/*获取商品详情信息*/
var getProductDetailData = function(params,callback){
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:params,
        dataType:'json',
        success:function(data){
            setTimeout(function(){
                callback && callback(data);
            },500);
        }
    });
};
