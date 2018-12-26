$(function () {

    $('#submit').on('tap',function () {
        /*1. get form serialize serializeArray(array ) data*/
        /*2. name attr */
        var data = $('form').serialize();
        console.log(data);
        /*3. valid */
        /*4. data type string "key=value&k=v" ====>  {key:value,k:v} */
        var dataObject = CT.serialize2object(data);
        console.log(dataObject);

        /*“JSON”未定义 IE67  https://github.com/douglascrockford/JSON-js (josn2.js)*/
        /*检验*/
        if(!dataObject.username){
            mui.toast('请您输入用户名');
            return false;
        }
        if(!dataObject.password){
            mui.toast('请您输入密码');
            return false;
        }

        $.ajax({
            type:'post',
            url:'/user/login',
            /*对象 serialize serializeArray*/
            data:dataObject,
            dataType:'json',
            success:function (data) {
                /*如果成功 根据地址跳转*/
                /*如果没有地址 默认跳转个人中心首页*/
                if(data.success == true){
                    /*业务成功*/
                    var returnUrl = location.search.replace('?returnUrl=','');
                    if(returnUrl){
                        location.href = returnUrl;
                    }else{
                        location.href = CT.userUrl;
                    }
                }else{
                    /*业务不成功*/
                    mui.toast(data.message);
                }
            }
        });
    })

});