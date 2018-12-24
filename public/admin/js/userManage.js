$(function(){
    /*1.数据展示*/
    var currPage = 1;
    var render = function(){
        getUserData({
            page:currPage,
            pageSize:5
        },function(data){
            /*渲染列表*/
            $('tbody').html(template('list',data));
            /*渲染分页*/
            setPaginator(data.page,Math.ceil(data.total/data.size),render);
        });
    };
    render();
    /*2.分页展示*/
    var setPaginator = function(pageCurr,pageSum,callback){
        /*获取需要初始的元素 使用bootstrapPaginator方法*/
        $('.pagination').bootstrapPaginator({
            /*当前使用的是3版本的bootstrap*/
            bootstrapMajorVersion:3,
            /*配置的字体大小是小号*/
            size:'small',
            /*当前页*/
            currentPage:pageCurr,
            /*一共多少页*/
            totalPages:pageSum,
            /*点击页面事件*/
            onPageClicked:function(event, originalEvent, type, page){
                /*改变当前页再渲染 page当前点击的按钮的页面*/
                currPage = page;
                callback && callback();
            }
        });
    }
    /*3.禁用用户*/
    /*4.启用用户*/
    $('tbody').on('click','.btn',function(){
        /*获取数据*/
        var id = $(this).data('id');
        var name = $(this).data('name');
        var isDelete = $(this).hasClass('btn-danger')?0:1;
        /*显示模态框*/
        $('#optionModal').find('strong').html(($(this).hasClass('btn-danger')?'禁用 ':'启用 ')+name);
        $('#optionModal').modal('show');
        $('#optionModal').off('click','.btn-primary').on('click','.btn-primary',function(){
            /*发送请求*/
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                dataType:'json',
                success:function(data){
                    if(data.success){
                        render();
                        $('#optionModal').modal('hide');
                    }
                }
            })
        });
    });
});
/*获取用户数据*/
var getUserData = function(params,callback){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:params,
        datType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};