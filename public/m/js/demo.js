
//mui初始化
mui.init({
    swipeBack: true //启用右滑关闭功能
});
var info = document.getElementById("info");
document.getElementById("alertBtn").addEventListener('tap', function() {
    mui.alert('欢迎使用Hello MUI', 'Hello MUI', function() {
        info.innerText = '你刚关闭了警告框';
    });
});
document.getElementById("confirmBtn").addEventListener('tap', function() {
    var btnArray = ['是', '否'];
    mui.confirm('MUI是个好框架，确认？', 'Hello MUI', btnArray, function(e) {
        if (e.index == 0) {
            info.innerText = '你刚确认MUI是个好框架';
        } else {
            info.innerText = 'MUI没有得到你的认可，继续加油'
        }
    })
});
document.getElementById("promptBtn").addEventListener('tap', function(e) {
    e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
    var btnArray = ['确定', '取消'];
    mui.prompt('请输入你对MUI的评语：', '性能好', 'Hello MUI', btnArray, function(e) {
        if (e.index == 0) {
            info.innerText = '谢谢你的评语：' + e.value;
        } else {
            info.innerText = '你点了取消按钮';
        }
    })
});
document.getElementById("toastBtn").addEventListener('tap', function() {
    mui.toast('欢迎体验Hello MUI');
});
