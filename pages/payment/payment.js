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

  onLoad: function() {
    var that = this;
    var userInfo = app.session.get('loginUser');
    if ( typeof userInfo == undefined ) {

      var user = app.tdm.require('User');
      user.login()
      .then( function( userInfo  ){

            wx.setNavigationBarTitle({
              title: '购买 【' +  userInfo.nickName  + '】'
            })
            that.setData({
              userInfo:userInfo
            });
        })

        .catch( function( e ) { 
           console.log('ERROR HELLO', e );
           wx.showModal({
              title: '验证失败',
              content: '用户身份验证失败, 请重试',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
        });
    } else {

      wx.setNavigationBarTitle({
          title: '购买 【' +  userInfo.nickName  + '】'
      });
      this.setData({userInfo:userInfo});
    }
  },

  onReady: function () {

    var that = this;
    

  }  

})
