# 商城前台接口汇总

###用户模块

- [注册接口](#register)
- [登录接口](#login)
- [登出接口](#logout)
- [修改密码](#update-password)
- [查询个人信息](#query-user-message)
- [注册验证码接口](#v-code)
- [修改密码验证码接口](#v-code-for-update-password)
###产品模块

- [搜索产品](#query-product)  排序 价格、图片、名称
- [产品详情](#query-product-detail) 

###分类模块

- [一级分类查询](#query-top-category)  
- [二级分类查询](#query-second-category)
- [火热的二级分类查询](#query-hot-second-category)


###购物车

- [添加](#add-cart)  件、尺码   尺码 string 区间 ？
- [修改](#update-cart) 件、尺码
- [删除](#delete-cart) 单删、全删
- [查询](#query-cart) 带产品信息
- [查询带分页](#query-cart-paging) 带产品信息
###收货地址模块  三级联动  要一个树状对象

- [添加](#add-address) 
- [修改](#update-address) 
- [删除](#delete-address) 
- [查询](#query-address) 
- [查询](#query-address-tree) 

#网站前台接口描述信息
## 用户模块
### register 
+ 接口名称
  注册接口
+ 接口地址
  /user/register
+ 请求方式
    POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
username|是|用户名
password|是|用户密码
mobile|是|用户手机号
vCode|是|验证码
+ 示例
```javascript
{"username":"zhoushugang","password":"123456","mobile":"15111111111","vCode":"DS7F"}
```
+ 返回说明
参数|说明
--|--
success|注册成功
error|操作失败
+ 示例
```javascript
{"success":true}
{ "error": 401, "message": "验证码错误!" }
{ "error": 403, "message": "用户名未填写！" }
{ "error": 403, "message": "密码未填写！" }
{ "error": 403, "message": "用户名已经存在!!!" }
{ "error": 403, "message": "手机号已注册过!!!" }
{ "error": 403, "message": "数据库异常！" }
```

### login
+ 接口名称
  登录接口
+ 接口地址
   /user/login
+ 请求方式
    POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
username|是|用户名
password|是|用户密码
+ 示例
```javascript
{"username":"zhoushugang","password":"123456"}
```
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
//error 同上个接口
```

### logout
+ 接口名称
  登出接口
+ 接口地址
  /user/logout
+ 请求方式
  GET
+ 参数说明
  无
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
//error 同上个接口
```

### update-password
+ 接口名称
  修改密码 （需要登录）
+ 接口地址
  /user/updatePassword
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
oldPassword|是|用户密码
newPassword|是|用户密码
+ 示例

```javascript
{"oldPassword":"123456","newPassword":"456789"}
```
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"success":true}
//error 同上个接口
```
### query-user-message
+ 接口名称
  查询个人信息 （需要登录）
+ 接口地址
  /user/queryUserMessage
+ 请求方式
  GET
+ 参数说明
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{id: 6, username: "zhoushugang", password: "4QrcOUm6Wau+VuBX8g+IPg==", mobile: "15111311111", isDelete: 1}
//error 同上个接口
```
### v-code
+ 接口名称
  获取注册验证码 （需要登录）
+ 接口地址
  /user/vCode
+ 请求方式
  GET
+ 参数说明
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"vCode":"938004"}
//error 同上个接口
```
### v-code-for-update-password
+ 接口名称
  获取修改密码验证码 （需要登录）
+ 接口地址
  /user/vCodeForUpdatePassword
+ 请求方式
  GET
+ 参数说明
+ 返回说明
参数|说明
--|--
success|注册状态
error|操作失败
+ 示例
```javascript
//success
{"vCode":"938004"}
//error 同上个接口
```
### 产品模块

### query-product
+ 接口名称
  搜索产品
+ 接口地址
  /product/queryProduct
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
proName |否|产品名称
brandId |否|品牌id
price   |否|使用价格排序（1升序，2降序）
num     |否|产品库存排序（1升序，2降序）
page    |是|第几页
pageSize|是|每页的条数
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
 {
  page: 1,
  size: 10,
  data: 
   [  { id: 20, proName: '篮球鞋222', price: 499.1, num: 20 },
      { id: 21, proName: '篮球鞋222', price: 499.1, num: 20 },
      { id: 22, proName: '篮球鞋222', price: 499.1, num: 20 },
      { id: 23, proName: '篮球鞋222', price: 499.1, num: 20, 
        pic: [{
          id: 28,
          picName: '23-2.png',
          productId: 23,
          picAddr: 'product/23-2.png' },{
          id: 27,
          picName: '23-1.png',
          productId: 23,
          picAddr: 'product/23-1.png' } ] },
      { id: 24, proName: '篮球鞋', price: 4969.1, num: 22, 
        pic: [{
          id: 26,
          picName: '24-1.png',
          productId: 24,
          picAddr: 'product/24-1.png' }] } ],
  count: 5 }
```

### query-product-detail
+ 接口名称
  产品详情
+ 接口地址
  /product/queryProductDetail
+ 请求方式
  GET  
+ 参数说明
参数名称|是否必须|说明
--|--|--
id |是|产品id
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{
  "id": 1,
  "proName": "羽绒服",
  "oldPrice": 998,
  "price": 600,
  "pic": "/pic/1.jpg",
  "proDesc": null,
  "size": "170-195",
  "statu": 1,
  "updateTime": "2012-12-01T04:05:23.000Z",
  "num": 1,
  "brandId": 1
}
```

### 分类模块
### query-top-category
+ 接口名称
  一级分类查询
+ 接口地址
   /category/queryTopCategory
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
[
  {
    "id": 1,
    "categoryName": "女装",
    "isDelete": 1
  },
  {
    "id": 2,
    "categoryName": "男装",
    "isDelete": 1
  },
  {
    "id": 3,
    "categoryName": "家电",
    "isDelete": 1
  },
  {
    "id": 4,
    "categoryName": "家具",
    "isDelete": 1
  },
  {
    "id": 5,
    "categoryName": "箱包",
    "isDelete": 1
  },
  {
    "id": 6,
    "categoryName": "珠宝",
    "isDelete": 1
  }
]
```
### query-second-category
+ 接口名称
  二级分类查询
+ 接口地址
   /category/querySecondCategory
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
id |是|一级分类id
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
[
  {
    "id": 1,
    "brandName": "耐克",
    "categoryId": 1,
    "brandLogo": "/pic/1.jpg",
    "isDelete": 1,
    "categoryName":"男鞋",
    "hot":1
  },
  {
    "id": 2,
    "brandName": "阿迪",
    "categoryId": 1,
    "brandLogo": "/pic/2.jpg",
    "isDelete": 1,
    "categoryName":"男鞋",
    "hot":1
  },
  {
    "id": 3,
    "brandName": "新百伦",
    "categoryId": 1,
    "brandLogo": "/pic/3.jpg",
    "isDelete": 1,
    "categoryName":"男鞋",
    "hot":1
  },
  {
    "id": 4,
    "brandName": "哥伦比亚",
    "categoryId": 1,
    "brandLogo": "/pic/4.jpg",
    "isDelete": 1,
    "categoryName":"男鞋",
    "hot":1
  },
  {
    "id": 5,
    "brandName": "匡威",
    "categoryId": 1,
    "brandLogo": "/pic/5.jpg",
    "isDelete": 1,
    "categoryName":"男鞋",
    "hot":1
  }
]
```

### 购物车
### add-cart
+ 接口名称
  添加购物车 （需要登录）
+ 接口地址
   /cart/addCart
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
productId |是|产品id
num|是|产品数量
size|是|产品尺码
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{ "success": true }
```
### update-cart
+ 接口名称
  修改购物车 （需要登录）
+ 接口地址
   /cart/updateCart
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id|是|购物车数据id
size      |是|产品尺码
num      |是|产品数量
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{"success":true}
```

### delete-cart
+ 接口名称
  删除购物车 （需要登录）
+ 接口地址
   /cart/deleteCart
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
id    |是|购物车id 数组
+ 示例
```javascript
{"id":[1,2,3]}
```
+ 返回说明

参数|说明
--|--
+ 示例

```javascript
{"success":true}
```
### query-cart-Paging
+ 接口名称
  查询购物车带分页 （需要登录）
+ 接口地址
   /cart/queryCartPaging
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
page  |是|页数
pageSize  |是|每页条数
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{
  "page": 1,
  "size": 1,
  "count": 2,
  "data":
   [ {
       "id": 1,
       "productId": 23,
       "num": 2,
       "size": '1',
       "proName": '羽绒服',
       "price": 600,
       "pic": [{
  id: 26,
  picName: '23-1.png',
  productId: 23,
  picAddr: 'product/23-1.png' },{
  id: 27,
  picName: '23-1.png',
  productId: 23,
  picAddr: 'product/23-2.png' }]] } ]
   }
```
### query-cart
+ 接口名称
  查询购物车 （需要登录）
+ 接口地址
   /cart/queryCart
+ 请求方式
  GET
+ 参数说明
+ 返回说明
参数|说明
--|--
+ 示例
```javascript

   [ {
       "id": 1,
       "productId": 23,
       "num": 2,
       "size": '1',
       "proName": '羽绒服',
       "price": 600,
       "pic": [{
  id: 26,
  picName: '23-1.png',
  productId: 23,
  picAddr: 'product/23-1.png' },{
  id: 27,
  picName: '23-1.png',
  productId: 23,
  picAddr: 'product/23-2.png' }]] } ]
   
```

###收货地址
### add-address
+ 接口名称
  添加收货地址 （需要登录）
+ 接口地址
  /address/addAddress
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
address  三级联动地址
addressDetail  详细地址
recipients 收货人
postcode 邮编
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{"success":true}
```
### update-address
+ 接口名称
  修改收货地址 （需要登录）
+ 接口地址
   /address/updateAddress
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id  字段id 
address  三级联动地址
addressDetail  详细地址
recipients 收货人
postcode 邮编
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{"success":true}
```

###  delete-address
+ 接口名称
  删除收货地址 （需要登录）
+ 接口地址
   /address/deleteAddress
+ 请求方式
  POST
+ 参数说明
参数名称|是否必须|说明
--|--|--
id|是|地址id 
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
{"success":true}
```
### query-address
+ 接口名称
  查询用户存储的收货地址 （需要登录）
+ 接口地址
  /address/queryAddress
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
[{
    id: 1,
    userId: 2,
    address: '北京市海淀区',
    addressDetail: '西三旗建材城西路',
    isDelete: 1 },
    {
    id: 2,
    userId: 2,
    address: '天津市南开区',
    addressDetail: '红旗南路',
    isDelete: 1 
}]
```
### query-address-tree
+ 接口名称
  查询收货地址树 （需要登录）
+ 接口地址
   /address/queryAddressTree
+ 请求方式
  GET
+ 参数说明
参数名称|是否必须|说明
--|--|--
+ 返回说明
参数|说明
--|--
+ 示例
```javascript
[{
  "id": 1, "areaName": "北京", "child": [
   { "id": 11, "areaName": "东城区", "child": [{ "id": 111, "areaName": "安定门街道" }, { "id": 112, "areaName": "建国门街道" }] },
   { "id": 12, "areaName": "西城区", "child": [{ "id": 121, "areaName": "德外街道" }, { "id": 122, "areaName": "金融街" }] },
   { "id": 13, "areaName": "朝阳区", "child": [{ "id": 131, "areaName": "朝外街道" }, { "id": 132, "areaName": "劲松街道" }] }]
  }, {
   "id": 2, "areaName": "天津", "child": [
     { "id": 21, "areaName": "和平区", "child": [{ "id": 211, "areaName": "南市街道" }, { "id": 212, "areaName": "新兴街道" }] },
     { "id": 22, "areaName": "南开区", "child": [{ "id": 221, "areaName": "八里台街" }, { "id": 222, "areaName": "王顶堤街" }] },
     { "id": 23, "areaName": "红桥区", "child": [{ "id": 231, "areaName": "西于庄街道" }, { "id": 232, "areaName": "双环村街道" }] }]
}]
```
