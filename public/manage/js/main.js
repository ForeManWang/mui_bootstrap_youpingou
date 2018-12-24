$(function(){
    $('.lt_menu').on('click','li > a',function(){
        var that = $(this);
        if(that.attr('href') == 'javascript:;'){
            that.siblings('.child').slideToggle();
        }
    })
    $('[data-menu]').on('click',function(){
        $('aside').toggle();
        $('section').toggleClass('menu');
    });
    NProgress.configure({ showSpinner: false });
    $(window).ajaxStart(function(){
        NProgress.start();
    });
    $(window).ajaxComplete(function(){
        NProgress.done();
    });
    $('#logoutModal').on('click','.btn-primary',function(){
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            success: function (data) {
                if (data.success) {
                    setTimeout(function(){
                        location.href = "login.html";
                    },500);
                }
            }
        })
    });
});