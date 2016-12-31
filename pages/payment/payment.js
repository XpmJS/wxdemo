//index.js


//获取应用实例
var app = getApp()
Page({

  data: {
    title: '服务器开光',
    userInfo: {},
    price:0.05,
  },

  // 支付按钮
  paynow: function(e) {

    var pay = app.xpm.require('pay');
    var price = this.data.price;
    price = parseFloat(price).toFixed(2) * 100;

    pay.request( {
      total_fee:price, 
      body:this.data.title,
      attach:'HELLO XpmJS.com',
      detail:'{"goods_id":"iphone6s_16G", "wxpay_goods_id":"1001", "goods_name":"iPhone6s 16G", "quantity":1, "price":528800, "goods_category":"123456", "body":"苹果手机" }, { "goods_id":"iphone6s_32G", "wxpay_goods_id":"1002", "goods_name":"iPhone6s 32G", "quantity":1, "price":608800, "goods_category":"123789", "body":"苹果手机" } ] }'
    })


    .then(function( data ){
      wx.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 2000
        })
    })

    .catch( function( excp){
        console.log( 'Request Error', excp );
    });

  },


  // 价格输入框
  price: function(e) {

    var price = e.detail.value || '';
        price = price.replace(/[^0-9\.]*/g,'');  // 仅允许输入数字和小数点


    var pos = price.length;

    if ( isNaN(parseFloat(price).toFixed(2))  || price == undefined ) {
      price=0;
      pos = 0;
    }
    this.setData( {price:parseFloat(price).toFixed(2)} );
    return { value:price, cursor:pos }
    
  },

  onLoad: function( option ) {
    var that = this;
    var user = app.xpm.require('User');
    var title = "时间拍卖:" + option.nickName;

    if ( option.nickName == '_p' ) {
        title = '服务器开光';
    } 
    wx.setNavigationBarTitle({
        title: title
    });

    user.get().then(function( res ){

      if ( option.nickName == '_p' ) {
         return {nickName:title, avatarUrl:'/res/icons/dashi.png' }
      }

      return user.tab.getLine("WHERE nickName=?", [option.nickName] );

    }).then(function( userInfo ) {
        that.setData({userInfo:userInfo, title:title});
    });
   
  },

  onReady: function () {

    var that = this;
    

  }  

})
