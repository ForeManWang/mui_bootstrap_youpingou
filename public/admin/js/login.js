$(function(){
    /*前端校验功能  bootstrap validator*/
    /*1.完整的表单结构  form   input  submit 这些元素*/
    /*2.表单元素需要对应的名字 name="username" */
    /*3.初始化表单验证组件 插件*/
    /*4.配置组件功能*/
    /*5.配置具体的属性需要的校验规则*/
    $('#login').bootstrapValidator({
        /*提示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*属性对应的是表单元素的名字*/
        fields:{
            /*配置校验规则*/
            username:{
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    /*设置错误信息 和规则无关 和后台校验有关系*/
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:18,
                        message:'密码在6-18个字符内'
                    },
                    callback: {
                        message: '密码不正确'
                    }
                }
            }
        }
        /*7.表单校验成功*/
    }).on('success.form.bv', function(e) {
        /*禁用默认提交的事件 因为要使用ajax提交而不是默认的提交方式*/
        e.preventDefault();
        /*获取当前的表单*/
        var $form = $(e.target);
        /*发送登录请求*/
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            dataType:'json',
            success:function(data){
                if(data.success){
                    /*后台管理员 root 123456*/
                    /*登录成功*/
                    location.href = 'index.html';
                }else{
                    /*登录不成功*/
                    /*8.恢复可提交的按钮*/
                    $form.data('bootstrapValidator').disableSubmitButtons(false);
                    /*9.指定某一个表单元素的错误提示*/
                    /* NOT_VALIDATED, VALIDATING, INVALID or VALID */
                    if(data.error == 1000){
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                    }else if(data.error == 1001){
                        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    }
                }
            }
        });
    });
    /*重置功能*/
    $('[type="reset"]').on('click',function(){
        /*6.重置验证*/
        $('#login').data('bootstrapValidator').resetForm();
    });

});