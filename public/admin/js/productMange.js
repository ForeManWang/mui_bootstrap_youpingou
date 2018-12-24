$(function () {
    /*1.默认渲染第一页*/
    var currPage = 1;
    var render = function () {
        getProductData({
            page: currPage,
            pageSize: 5
        }, function (data) {
            /*列表渲染*/
            $('tbody').html(template('template', data));
            /*分页渲染*/
            setPaginator(data.page, Math.ceil(data.total / data.size), render);
        });
    };
    render();
    /*2.实现分页渲染*/
    var setPaginator = function (pageCurr, pageSum, callback) {
        /*获取需要初始的元素 使用bootstrapPaginator方法*/
        $('.pagination').bootstrapPaginator({
            /*当前使用的是3版本的bootstrap*/
            bootstrapMajorVersion: 3,
            /*配置的字体大小是小号*/
            size: 'small',
            /*当前页*/
            currentPage: pageCurr,
            /*一共多少页*/
            totalPages: pageSum,
            /*点击页面事件*/
            onPageClicked: function (event, originalEvent, type, page) {
                /*改变当前页再渲染 page当前点击的按钮的页面*/
                currPage = page;
                callback && callback();
            }
        });
    }
    /*3.上架和下架功能*/
    /*4.添加功能 参考二级分类*/
    $('#addBtn').on('click', function () {
        $('#editModal').modal('show');
    });
    initUpload();
    /*加校验*/
    /*进行表单校验*/
    /*扩展一个校验规则*/
    $.fn.bootstrapValidator.validators.checkNum = {
        validate:function (validate, $field, options) {
            /*获取字段对应的值*/
            var text = $.trim($field.val());
            /*不能为空*/
            if (!text) return {valid: false, message: '请输入商品库存'};
            /*必须是大于0的整数*/
            if(!/^[1-9]\d*$/.test(text)) return {valid: false, message: '请输入合法商品库存'};
            return true;
            /*规则：如果 返回true 代ll表校验成功*/
            /*规则：如果 返回false 代表校验失败*/
            /*规则：如果 返回false 自定义提示  ｛valid:false,message:'提示'｝*/
        }
    }
    $.fn.bootstrapValidator.validators.checkPic = {
        validate:function (validate, $field, options) {
            if(picList.length !=3) return {valid: false, message: '请上传三张图片'};
            return true;
        }
    }
    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*设置校验属性*/
        fields: {
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    /*自定义校验规则*/
                    checkNum:{}
                }
            },
            price:{
                validators: {
                    notEmpty: {
                        message: '请输入商品价格'
                    }
                }
            },
            oldPrice:{
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            size:{
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    }
                }
            },
            pic:{
                validators: {
                    checkPic:{}
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var data = $form.serialize();
        /*图片上传的参数名称*/
        /*picName1=picAddr1*/
        /*picName2=picAddr2*/
        /*picName3=picAddr3*/
        /*每次上传成功记录一下  通过数组*/
        $.each(picList,function (i,item) {
            data += '&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
        });
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:data,
            dataType:'json',
            success:function (data) {
                if(data.success){
                    /*关闭模态框*/
                    $('#editModal').modal('hide');
                    /*渲染第一页*/
                    currPage = 1;
                    render();
                    /*重置表单数据和校验样式*/
                    $form[0].reset();
                    $form.data('bootstrapValidator').resetForm();
                    $form.find('img').remove();
                }
            }
        });
    });
});

var getProductData = function (params, callback) {
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetailList',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
}
var picList = [];
var initUpload = function () {
    $('[name="pic1"]').fileupload({
        dataType:'json',
        done:function (e, data) {
            if(picList.length < 3){
                /*追加图片*/
                $(this).parent().parent().next().append('<img width="100" height="100" src="'+data.result.picAddr+'"/> ');
                picList.push(data.result);//{picName:'',picAddr:''}
                /*上传了三张图片 显示合法的提示*/
                if(picList.length == 3){
                    $('#form').data('bootstrapValidator').updateStatus('pic','VALID');
                }
            }
        }
    });
}