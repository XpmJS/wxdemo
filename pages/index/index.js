//index.js


//获取应用实例
var app = getApp()
Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    wss:{status:'grey', text:'信道未连接', style:''},
    price:0.50,
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

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

  price: function(e) {

    var price = parseFloat(e.detail.value);
    var pos = price.toString().length;
    if ( isNaN(price) ) {
      price=0;
      pos = 0;
    }
    this.setData( {price:price.toFixed(2)} );
    return { value:price, cursor:pos }
  },


  onReady: function () {

    var that = this;
    var user = app.tdm.require('User');
    var wssRetryTimes = 0;

    // 信道状态监听
    app.wss.bind('close', function(event) {
      that.setData({'wss.status':'grey', 'wss.text':'信道未连接', 'wss.style':''});
      wssRetryTimes++;
      var wait = 2000;
      if ( wssRetryTimes > 3 ) {
        wait = wssRetryTimes * 2000;
      } 
      setTimeout(function(){ app.wss.open('/wxapp'); }, wait );

    });

    app.wss.bind('open', function(event) {
      wssRetryTimes = 0;
      that.setData({'wss.status':'green', 'wss.text':'信道已连接', 'wss.style':'statusbar-green'});
    });

    // 呈现当前信道状态
    if ( app.wss.isOpen ) {
      that.setData({'wss.status':'green', 'wss.text':'信道已连接', 'wss.style':'statusbar-green'});
    }


    wx.showToast({title:'验证用户身份', icon:'loading', mask:true, duration: 10000});
    user.login()

      .then( function( userInfo ){
          wx.hideToast();
          wx.setNavigationBarTitle({
            title: '购买 【' +  userInfo.nickName  + '】'
          })
          that.setData({
            userInfo:userInfo
          });
      })

      .catch( function( e ) { 
         console.log('ERROR HELLO', e );
         wx.hideToast();
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

  }
})
