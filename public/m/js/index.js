$(function () {
    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });
    /*轮播图*/
    mui('.mui-slider').slider({
        interval:2000,

    });
});