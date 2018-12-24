## 乐淘电商

### 移动端

#### Mui介绍

- bootstrap 也是一个ui框架  响应式的ui框架  兼容不同终端 可以适配pc端 也可以适配  移动端
- Mui 是一个ui框架 针对移动端开发的ui框架    只能适配移动端（流式布局）
- 学习官网 http://dev.dcloud.net.cn/mui/
- 官方文档 http://dev.dcloud.net.cn/mui/ui/
- 组件展示 http://dcloud.io/hellomui/
 
**特点**

- 最接近原生APP体验的高性能前端框架
- 轻量
追求性能体验，是我们开始启动MUI项目的首要目标，轻量必然是重要特征；
MUI不依赖任何第三方JS库，压缩后的JS和CSS文件仅有100+K和60+K
- 原生UI
鉴于之前的很多前端框架（特别是响应式布局的框架），UI控件看起来太像网页，没有原生感觉，因此追求原生UI感觉也是我们的重要目标
MUI以iOS平台UI为基础，补充部分Android平台特有的UI控件
- 流畅体验
下拉刷新
为实现下拉刷新功能，大多H5框架都是通过DIV模拟下拉回弹动画，在低端android手机上，
DIV动画经常出现卡顿现象（特别是图文列表的情况）； 
mui通过双webview解决这个DIV的拖动流畅度问题；拖动时，拖动的不是div，
而是一个完整的webview（子webview），回弹动画使用原生动画
     
     
#### 首页
 - 充当移动端入口静态的
 - 搭建页面主体架子
 
 具体到页面功能：
 1.顶部通栏
 2.轮播图
 3.导航栏
 4.运动生活专区
 5.底部页签
   
+ 页面架子  
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0"/>
    <title>乐淘首页</title>
    <link rel="stylesheet" href="assets/mui/css/mui.css"/>
    <link rel="stylesheet" href="css/common.css"/>
</head>
<body>
    <div class="lt_container">
        <header class="lt_topBar"></header>
        <div class="lt_content">
            1
        </div>
        <footer class="lt_tabBar"></footer>
    </div>
<script src="assets/mui/js/mui.js"></script>
</body>
</html>
```

+ 初始区域滚动插件
```javascript
    /*初始化区域滚动组件 当超过了父容器大小的时候生效*/
    mui('.mui-scroll-wrapper').scroll();
```

+ 初始化轮播图
```javascript
    /*轮播图的初始化*/
    mui('.mui-slider').slider({
        interval:4000
    });
```

#### 分类页

- 静态页面

左侧边栏   里面的信息内容是  一级分类

右侧内容   里面的信息比尔是  二级分类

```javascript
/*初始左侧滚动*/
mui('.lt_cateLeft').scroll();
/*初始右侧滚动*/
mui('.lt_cateRight').scroll();
```

- 渲染动态
    + 左侧分类  需要获取一级分类数据 渲染在页面当中
    + 默认选中一个分类   加载出第一个分类对应的数据  渲染二级分类（右侧内容）
    + 点击一级分类的时候  需要去加载对应的分类数据   渲染二级分类（右侧内容）

图片如果加载不成功显示默认图片
onerror="失败的时候去替换原来错误的地址 为默认图片的地址"
onerror="this.src = 'images/none.jpg' " 


#### 搜索页

- 静态页面
    + 搜索表单
    包含了搜索框和按钮
    
    + 历史搜索
    两种情况  
    没有历史记录的情况    显示没有搜索历史记录
    有历史记录的情况      显示 历史记录  清空操作  历史列表

- 动态渲染
    + 输入搜索关键字  点击搜索  跳转搜索列表页  （把关键字传递给搜索列表页  同时记录这一次的搜索记录）
    + 需要页面初始化的时候  渲染上一次的搜索记录 （获取本地存储的数据 转换成js可以使用的数据 进行渲染）    
    + 点击搜索记录对应的删除按钮  删除当前对应的历史记录 （获取本机的记录删除一条从新记录到本地存储当中）
    + 点击情况历史记录  情况所有记录  （把本来存储的数据清空）
    
    需求  记录10数据  如果超过加一条 删一条  如果有一样的删除 记录新的
     
     
#### 搜索列表页
     
- 静态页面
    + 搜索表单
    + 搜索排序
    + 搜索列表
     
- 动态渲染

    + 效果
    
    1.下拉刷新
    
    2.上拉加载
    
    3.加载中状态
    
    + 功能
    
    初始化渲染  
    1.获取地址栏关键字  
    2.通过关键字去后台获取和关键字相关的商品数据  
    3.渲染商品列表  
    
    当前页搜索  
    1.点击搜索按钮 获取到关键字  
    2.通过关键字去后台获取和关键字相关的商品数据  
    3.渲染商品列表  
    
    排序展示  
    1.点击排序按钮 获取排序方式  
    2.通过当前的关键字和排序方式去后台获取相关的商品数据  
    3.渲染商品列表  
    
    下拉刷新  
    1.当用户下拉页面   
    2.通过关键字去后台重新获取和关键字相关的商品数据  
    3.渲染商品列表    
    
    上拉加载  
    1.当用户上拉页面  
    2.通过关键字去后台获取和关键字相关的商品数据（而且是根据当前页面进行获取）  
    3.渲染商品列表 当时是追加到页面当中  
    
#### 商品详情页
     
 - 静态页面  
    + 顶部通栏
    + 底部操作栏  以前是切换
    + 商品图片  轮播图
    + 商品名称  只显示两行
    + 商品价格  原价  现价
    + 商品尺寸  选择按钮
    + 商品数量  选择数量
    + 商品详情  描述
   
 - 动态渲染   
    + 默认初始化页面的时候  渲染商品信息
    + 点击重加载按钮  刷新商品信息
    + 尺码选择
    + 数量选择
    + 加入购物车
    
    
#### 登录
    
        
 - 静态页面   
    + 用户名
    + 密码
    + 登录按钮
    + 注册连接
    
 - 动态渲染  
    + 看登录的来源
      1.从需要登录的页面跳转过来   登录成功之后会跳源页面  
      2.直接是登录页面            登录成功之后默认进入用户首页  
      3.一种接口  需要登录才能调通的接口  400 证明需要去登录  需要传递给登录也   回跳的连接
      ```json
        {error: 400, message: "未登录！"}
      ```
#### 用户中心
    
    - 静态页面 
        
    - 动态渲染 
        + 获取个人信息并且展示
        + 点击退出按钮进行退出   
           
#### 购物车

- 静态页面
    + 商品列表
    + 订单
 
    
- 动态渲染 
    + 初始化  展示购物车中的商品
    + 删除购物车当中的商品
    + 修改购物车当中的商品  商品的数量和商品的尺码
    + 计算订单总金额 购物车操作后


### 后台管理端
    
    目录结构：后台的目录全部在admin目录下面
    
    页面基本模板
    
    ```
    <!DOCTYPE html>
    <html>
    <head lang="en">
        <meta charset="UTF-8">
        <title>后台管理系统-登录</title>
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="css/admin.css"/>
    </head>
    <body>
    
    
    <script src="assets/jquery/jquery.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="js/admin.js"></script>
    </body>
    </html>
    
    ```
    
#### 登录
 - 静态的页面
    
 - 动态交互
    + 前端校验功能
    1.用户名不能为空
    2.密码不能为空
    3.密码在6-18个字符内
    + 重置功能（内容、校验）
    + 登录功能
    1.点击按钮  发送登录请求 后台管理员 root 123456
    2.登录成功  前端跳转到首页
    3.登录失败  恢复可提交状态，具体的提示某一个表单元素的错误信息。
    4.进度显示  在ajax请求过程当中使用进度显示功能
    
 -  基于bootstrap的前端校验插件 《bootstrapvalidator》
    + 文档参考 http://blog.csdn.net/nazhidao/article/details/51542508
              http://blog.csdn.net/u013938465/article/details/53507109
              http://www.cnblogs.com/v-weiwang/p/4834672.html?ptvd
              http://bootstrapvalidator.votintsev.ru/api/
    ```html
    
    between：检测输入的值是否在两个指定的值之间。
    callback：通过回调函数返回验证信息。
    creditCard：验证信用卡格式。
    different：如果输入值和给定的值不同返回true。
    digits：如果输入的值只包含数字返回true。
    emailAddress：验证电子邮件格式是否有效。
    greaterThan：如果输入的值大于或等于指定的值返回true。
    hexColor：验证一个hex格式的颜色值是否有效。
    identical：验证输入的值是否和指定字段的值相同。
    lessThan：如果输入的值小于或等于指定的值返回true。
    notEmpty：检测字段是否为空。
    regexp：检测输入值是否和指定的javascript正则表达式匹配。
    remote：通过AJAX请求来执行远程代码。
    stringLength：验证字符串的长度。
    uri：验证URL地址是否有效。
    usZipCode：验证美国的邮政编码格式。  
    
    defaultSubmit	
    默认提交表单	-  
    disableSubmitButtons	
    禁用或启用提交按钮	-  
    enableFieldValidators	
    启用/禁用所有给定的字段验证器 （如果 true,使字段验证器。如果 false禁用字段验证器）	-  
    getFieldElements	
    检索字段元素的名字	-  
    isValid	
    返回 true如果所有的表单字段是有效的。否则,返回 false.	-  
    resetForm	
    重置表单	-  
    updateElementStatus	
    更新验证给定元素的结果	-  
    updateStatus(field, status, validatorName)	
    更新为给定字段验证器的结果，status可以 NOT_VALIDATED, VALIDATING, INVALID或 VALID，validatorName 字符串 验证器的名称。如果 null所有验证器,更新方法有效性的结果
    
    ```
      
 -  基于jquery的前端进度插件 《nprogress》     
    + 文档参考 http://blog.csdn.net/joyhen/article/details/24458427
    
    
    
#### 管理主体结构
 - 静态的页面
    + 侧边栏
        1.顶部logo
        2.用户信息
        3.菜单（一级，二级）
    + 主体内容
        1.顶部通栏
        2.路径导航
        3.不同页面不同的内容
    
 - 动态交互 
    1.手风琴菜单
    2.收起和展开侧边栏
    3.退出  弹出对话狂  确定是否退出
    
#### 首页 
  - 渲染图表
    + 注册人数的柱状图
    + 几款热门的商品销售情况饼图
    
    数据可视化  插件  echarts  http://echarts.baidu.com/
    数据可视化  插件  echarts  https://www.hcharts.cn/demo/highcharts
    
    + 现在后台没有提供对应的数据接口  但是我们可以模拟
    + 给大家带来以后工作当中可能会遇到的问题
    
#### 用户管理
   - 用户信息的展示
     + 序号  用户名  手机号 状态（禁用、正常） 操作（禁用、启用） 
   - 用户信息的分页
     + 基于bootstrap的分页插件  bootstrap-paginator 
   - 禁用某个用户
   - 启用某个用户
    
      





