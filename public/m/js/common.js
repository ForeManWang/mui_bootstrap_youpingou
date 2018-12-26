window.CT = {};
CT.getParamsByUrl = function () {
    /*已对象存储地址栏信息*/
    var params = {};
    var search = location.search;
    if (search) {
        search = search.replace('?', '');
        /*如果有多个键值对*/
        var arr = search.split('&');
        arr.forEach(function (item, i) {
            var itemArr = item.split('=');
            params[itemArr[0]] = itemArr[1];
        });
    };
    return params;
};
CT.serialize2object = function (serializeStr) {
    var obj = {};
    /*key=value&k=v*/
    if(serializeStr){
        var arr = serializeStr.split('&');
        arr.forEach(function (item,i) {
            var itemArr = item.split('=');
            obj[itemArr[0]] = itemArr[1];
        })
    }
    return obj;
}
CT.getItemById = function (arr,id) {
    var obj = null;
    arr.forEach(function (item,i) {
        if(item.id == id){
            obj = item;
        }
    });
    return obj;
}
/*需要登录的ajax请求*/
CT.loginUrl = '/m/user/login.html';
CT.cartUrl = '/m/user/cart.html';
CT.userUrl = '/m/user/index.html';
CT.loginAjax = function (params) {
    /*params====> {} */
    $.ajax({
        type: params.type || 'get',
        url: params.url || '#',
        data: params.data || '',
        dataType: params.dataType || 'json',
        success:function (data) {
            /*未登录的处理 {error: 400, message: "未登录！"}
            所有的需要登录的接口 没有登录返回这个数据*/
            if(data.error == 400){
                /*跳到登录页  把当前地址传递给登录页面  当登录成功按照这个地址跳回来*/
                location.href = CT.loginUrl + '?returnUrl=' + location.href;
                return false;
            }else{
                params.success && params.success(data);
            }
        },
        error:function () {
            mui.toast('服务器繁忙');
        }
    });
};