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
        bounce: true//是否启用回弹
    });

    /*搜索关键字*/
    if(location.search){
        var strs = location.search.substr(1).split("&");
        for(var i = 0; i < strs.length; i ++) {
            var arr = strs[i].split("=");
            if(arr[0] == 'key'){
                /*urlcode 转码*/
                window.proName = decodeURI(arr[1]);
                $('.search_input').val(window.proName);
                break;
            }
        }
    }


    mui.init({
        pullRefresh: {
            container: '.mui-scroll-wrapper',
            down: {
                auto:true,
                callback: function(){
                    var that = this;
                    /*获取数据*/
                    window.pageNum = 1;
                    getProductList($.extend({},window.params),function(data){
                        /*渲染*/
                        $('#product_box').html(template('productTpl',{model:data}));
                        /*结束刷新状态*/
                        that.endPulldownToRefresh();
                        that.refresh(true);
                    });
                }
            },
            up: {
                contentrefresh: '正在加载...',
                contentnomore:'没有更多数据了',
                callback: function(){
                    var that = this;
                    /*获取数据*/
                    window.pageNum ++;
                    getProductList($.extend({},window.params),function(data){
                        if(!data.data.length || data.data.length < 10){
                            that.endPullupToRefresh(true);
                            return false;
                        }
                        /*渲染*/
                        $('#product_box').append(template('productTpl',{model:data}));
                        that.endPullupToRefresh();
                    });
                }
            }
        }
    });

    $('body').on('tap','.cz_orderBar a', function (e) {
        var $this = $(e.currentTarget);

        if($this.hasClass('now')){
            /*排序*/
            var $span = $this.find('span');
            if($span.hasClass('fa-angle-down')){
                $span.removeClass('fa-angle-down').addClass('fa-angle-up');
            }else{
                $span.addClass('fa-angle-down').removeClass('fa-angle-up');
            }
        }else{
            /*样式*/
            $('.cz_orderBar a').removeClass('now').find('span').attr('class','fa fa-angle-down');
        }

        /*条件*/
        $this.addClass('now');
        var key = $this.attr('data-type');
        var value = $this.find('span').hasClass('fa-angle-down')?1:2;

        window.params = {};
        window.params[key] = value;

        /*刷新*/
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    }).on('tap','.search_btn',function(){
        /*搜索*/
        var key = $.trim($('.search_input').val());

        if(!key){
            mui.toast('请输入关键字');
            return false;
        }
        window.proName = key;
        /*刷新*/
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
        return false;
    });
});

var getProductList = function(params,callback){
    LeTao.ajax({
        type:'get',
        url:'/product/queryProduct?_='+Date.now(),
        data:{
            page:window.pageNum||1,
            size:10,
            proName:window.proName||'',

            brandId :params.brandId ||'',
            price :params.price ||'',
            num :params.num ||'',
            sale :params.sale ||'',
            time :params.time || ''
        },
        dataType:'json',
        success:function(data){
            callback && callback(data);
        },
        error:function(){
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
    });
}