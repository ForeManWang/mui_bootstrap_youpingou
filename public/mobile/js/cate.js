/**
 * ITCAST WEB
 * Created by zhousg on 2016/12/28.
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

    renderSlide(function(data){
        $('.cate_slide').html(template('cate_slide',{model:{list:data,currId:0}})).find('li:first-child').trigger('tap');
        $('.loading').hide();
    });

    $('.cate_slide').on('tap','li',function(e){
        var parentId = e.target.dataset['id'];
        var title = e.target.innerHTML;
        $('.cate_slide').html(template('cate_slide',{model:{list:Window.slideData,currId:parentId}}));

        renderContent(parentId,function(data){
            $('.mui-scroll').html(template('cate_content',{model:{list:data,title:title}}));
        });
    });
});
var renderSlide = function(callback){
    if(Window.slideData){
        callback && callback(Window.slideData);
    }
    LeTao.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        data:'',
        dataType:'json',
        success:function(data){
            Window.slideData = data.rows;
            callback && callback(Window.slideData);
        }
    });
};
var renderContent = function(parentId,callback){
    LeTao.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{id:parentId},
        dataType:'json',
        success:function(data){
            callback && callback(data.rows);
        }
    });
};