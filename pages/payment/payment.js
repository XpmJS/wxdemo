//index.js


//获取应用实例
var app = getApp()
Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    price:0.50,
  },



  // 支付按钮
  paynow: function(e) {

    var pay = app.tdm.require('pay');
    var price = this.data.price;
    
    pay.request( {price:price} )

    .then(function( data ){
        console.log( data );
    })
    .catch( function( excp){
        console.log( 'Request Error', excp );
    });

    console.log('Pay Now', price);
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
    var user = app.tdm.require('User');
    wx.setNavigationBarTitle({
        title: '购买 【' +  option.nickName  + '】'
    });

    user.login().then(function( res ){
      console.log( res);
      return user.tab.getLine("WHERE nickName=?", [option.nickName] );

    }).then(function( userInfo ) {
        that.setData({userInfo:userInfo});
    });
   
  },

  onReady: function () {

    var that = this;
    

  }  

})
