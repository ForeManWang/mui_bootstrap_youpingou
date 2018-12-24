/**
 * ITCAST WEB
 * Created by zhousg on 2017/1/2.
 */
$(function(){
    /*渲染*/
    var cityPicker = new mui.PopPicker({layer:3});
        cityPicker.setData(cityData);

    var addressId = location.search;
        addressId = addressId && addressId.split('=');
        addressId = addressId && addressId[1];
    if(addressId){
        $('header .title').html('修改收货地址');
        getAddressData(function(data){
            var detail = LeTao.getObjectFromId(data,addressId);
            $('[name="recipients"]').val(detail.recipients);
            $('[name="postCode"]').val(detail.postCode);
            $('[name="address"]').val(detail.address);
            $('[name="addressDetail"]').val(detail.addressDetail);
        });
    }else{
        $('header .title').html('添加收货地址');
    }


    $('body').on('click','.btn_submit',function(){
        var data = {
            recipients: $.trim($('[name="recipients"]').val()),
            postcode: $.trim($('[name="postCode"]').val()),
            address: $.trim($('[name="address"]').val()),
            addressDetail: $.trim($('[name="addressDetail"]').val())
        };

        if(!data.recipients){
            mui.toast('请输入收货人');
            return false;
        }

        if(!data.postcode){
            mui.toast('请输入邮编');
            return false;
        }

        if(!/^\d{6}$/.test(data.postcode)){
            mui.toast('请输入合法邮编');
            return false;
        }

        if(!data.address){
            mui.toast('请选择省市区');
            return false;
        }

        if(!data.addressDetail){
            mui.toast('请输入详细地址');
            return false;
        }

        var editUrl = '/address/addAddress';
        var tip = '添加';
        if(addressId){
            editUrl = '/address/updateAddress';
            tip = '修改';
            data.id = addressId;
        }
        editAddress(data,editUrl,function(){
            mui.toast(tip+'成功！');
            location.href = 'address.html';
        });
    }).on('click','[name="address"]',function(){
        cityPicker.show(function(items) {
            if(items[0].text == items[1].text){
                items[0].text = '';
            }
            $('[name="address"]').val(items[0].text+items[1].text+(items[2].text||''));
            //返回 false 可以阻止选择框的关闭
        });
    });
});
var editAddress = function(data,url,callback){
    LeTao.ajax({
        type:'post',
        url:url,
        data:data,
        dataType:'json',
        beforeSend:function(){
            $('.btn_submit').html('正在提交...');
        },
        success:function(data){
            callback && callback(data);
        },
        error:function(){
            $('.btn_submit').html('提交');
        }
    });
};
var getAddressData = function(callback){
    LeTao.ajax({
        type:'get',
        url:'/address/queryAddress',
        data:{},
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};
