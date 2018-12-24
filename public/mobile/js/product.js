/**
 * ITCAST WEB
 * Created by zhousg on 2017/1/2.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    mui.init({
        pullRefresh: {
            container: '.mui-scroll-wrapper',
            down: {
                auto:true,
                callback: function(){
                    var that = this;
                    getProductData(function(data){
                        /*渲染*/
                        $('#product_box').html(template('productTpl',{model:data}));
                        /*结束刷新状态*/
                        that.endPulldownToRefresh();
                        /*初始化轮播图*/
                        mui('.mui-slider').slider({ interval:3000});
                        /*图片懒加载*/
                        mui('.p_detail').imageLazyload({
                            placeholder: '/mobile/images/none.jpg'
                        });
                    })
                }
            }
        }
    });

    $('body').on('tap','.btn_addCart',function(){
        if(window.addCarting == 1) return false;
        var data = {
            productId:window.productId,
            size:$('.btn_size.now').html(),
            num:parseInt($('.p_number input').val())
        };
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
        addCart(data,function(){
            window.addCarting = 0;
            mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
                if (e.index == 0) {
                    location.href = LeTao.CART_URL;
                } else {
                    //TODO
                }
            })
        });
    }).on('tap','.btn_pay',function(){
        mui.toast('未实现');
    }).on('tap','.btn_size',function(){
        var $this = $(this);
        $('.btn_size').removeClass('now');
        $this.addClass('now');

    }).on('tap','.p_number span',function(){
        var $this = $(this),$input = $('.p_number input');
        var num = parseInt($input.val()),max = $input.attr('data-max');
        if($this.hasClass('jian')){
            num >0 && $input.val(num-1);
        }
        if($this.hasClass('jia')){
            if(num < max){
                $input.val(num+1);
            }else{
                mui.toast('没有库存了');
            }
        }
    });

});
var getProductData = function(callback){
    window.productId = LeTao.getUrlParam('productId');
    LeTao.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{id:window.productId},
        dataType:'json',
        success:function(data){
            callback && callback(data);
        },
        error:function(){
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
    })
};
var addCart = function(data,callback){
    LeTao.ajax({
        type:'post',
        url:'/cart/addCart',
        data:data,
        dataType:'json',
        beforeSend:function(){
            window.addCarting = true;
        },
        success:function(data){
            callback && callback(data);
        },
        error:function(){
            mui.toast('服务器繁忙');
        }
    })
};