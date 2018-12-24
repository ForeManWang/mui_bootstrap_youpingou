/**
 * ITCAST WEB
 * Created by zhousg on 2017/1/2.
 */
$(function(){
    /*页面初始化*/
    $('.search_input').val('');
    $('.cz_history').html(template('searchTpl',{model: getSearchData()}));

    /*绑定事件*/
    $('body').on('tap','.search_btn',function(){
        /*搜索*/
        var key = $.trim($('.search_input').val());

        if(!key){
            mui.toast('请输入关键字');
            return false;
        }

        addSearchData(key);

        window.location.href = LeTao.SEARCH_LIST_URL+'?'+'key='+key;

        return false;
    }).on('tap','.icon_clear ',function(){
        /*清空*/
        localStorage.clear();
        $('.cz_history').html(template('searchTpl',{model: getSearchData()}));
    }).on('tap','.icon_delete',function(){
        /*删除*/
        removeSearchData($(this).parent().find('[data-key]').attr('data-key'));
        $('.cz_history').html(template('searchTpl',{model: getSearchData()}));
    }).on('tap','[data-key]',function(){
        window.location.href = LeTao.SEARCH_LIST_URL+'?'+'key='+$(this).attr('data-key');
    })

});
/*获取搜索记录*/
var getSearchData = function(){
    return JSON.parse(localStorage.getItem('leTaoSearchHistory') || '[]');
};
/*添加搜索记录*/
var addSearchData = function(key){
    var list = getSearchData();

    $.each(list,function(i,item){
        if(item == key){
            list.splice(i,1);
        }
    });

    list.push(key);

    /*最多记录10条*/
    if(list.length > 10){
        list.splice(0,list.length-10);
    }

    localStorage.setItem('leTaoSearchHistory',JSON.stringify(list));
};
/*删除搜索记录*/
var removeSearchData = function(key){
    var list = getSearchData();
    $.each(list,function(i,item){
        if(item == key){
            list.splice(i,1);
        }
    });
    localStorage.setItem('leTaoSearchHistory',JSON.stringify(list));
};