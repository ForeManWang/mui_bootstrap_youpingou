$(function(){
    /*1.展示购物车商品*/
    /*1.1 完成下拉刷新效果*/
    mui.init({
        /*拉动刷新组件*/
        pullRefresh:{
            /*目标容器*/
            container:".mui-scroll-wrapper",
            /*下拉*/
            down:{
                /*默认下拉一次*/
                auto:true,
                /*下拉操作后的回调函数*/
                callback:function(){
                    /*指向当前下拉组件*/
                    var that = this;
                    /*1.2 完成数据获取*/
                    getCartData(function(data){
                        /*1.3 展示商品*/
                        $('.mui-table-view').html(template('cart',data));
                        /*1.4 清除加载效果*/
                        that.endPulldownToRefresh();
                    });
                }
            }
        }
    });
    /*2.删除操作*/
    $('.mui-table-view').on('tap','.mui-btn-red',function(){
        var id = $(this).attr('data-id');
        /*2.1 弹出提示框*/
        mui.confirm('您是否确定删除？', '温馨提示', ['确定','取消'], function(e) {
            if (e.index == 0) {
                /*2.2 确定之后 发送请求*/
                lt.ajaxFilter({
                    type:'get',
                    url:'/cart/deleteCart',
                    data:{id:id},
                    dataType:'json',
                    success:function(data){
                        if(data.success){
                            mui.toast('操作成功');
                            /*2.3 重新渲染*/
                            getCartData(function(data){
                                $('.mui-table-view').html(template('cart',data));
                            });
                        }
                    }
                });
            }
        });
    });
    /*3.编辑操作*/
    $('.mui-table-view').on('tap','.mui-btn-blue',function(){
        /*3.1 弹出修改框*/
        /*replace(/\n/g,'') 替换标签之间换行*/
        /*3.2 动态渲染*/
        /*3.3 获取数据 {id: "1", size: "50", productsize: "42-50", num: "50", productnum: "5"}*/
        var data = this.dataset;
        mui.confirm(template('edit',data).replace(/\n/g,''), '编辑商品', ['确定','取消'], function(e) {
            if (e.index == 0) {
                /*2.2 确定之后 发送请求*/
                lt.ajaxFilter({
                    type:'post',
                    url:'/cart/updateCart',
                    data:{
                        id:data.id,
                        size:$('.lt_cart_edit span.now').html(),
                        num:$('.mui-numbox input').val()
                    },
                    dataType:'json',
                    success:function(data){
                        if(data.success){
                            mui.toast('操作成功');
                            /*2.3 重新渲染*/
                            getCartData(function(data){
                                $('.mui-table-view').html(template('cart',data));
                            });
                        }
                    }
                });
            }
        });
        mui('.mui-numbox').numbox();
        $('.lt_cart_edit').on('tap','span',function(){
            $('.lt_cart_edit span').removeClass('now');
            $(this).addClass('now');
        });
    });
    /*4.总额计算*/
    $('.mui-table-view').on('change','input',function(){
        /*设置 计算  价格*/
        setAmount();
    });
});
var getCartData = function(callback){
    /*不做分页查询*/
    lt.ajaxFilter({
        type:'get',
        url:'/cart/queryCartPaging',
        data:{
            page:1,
            pageSize:100
        },
        dataType:'json',
        success:function(data){
            setTimeout(function(){
                callback && callback(data);
            },500);

        }
    });
}
var setAmount = function(){
    var amount = 0;
    $('input:checked').each(function(){
        var num = $(this).attr('data-num');
        var price = $(this).attr('data-price');
        amount += num*price;
    })
    $('.lt_cart span').html(Math.ceil(amount*100)/100);
}