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
  wsstest: function(e) {
    console.log( 'session: ', app.session.id() , 'connectSocket ' );
    app.wss.bind('close',function(){});

    wx.connectSocket({
     url: 'wss://wxcloud.tuanduimao.cn/ws-server/wxapp' ,
    });

    wx.onSocketOpen(function(res) {
      console.log( 'onSocketOpen' , res );
    });

    wx.onSocketError(function(res){
      console.log( 'onSocketError' , res );
      return;
    });

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
      this.setData({userInfo:userInfo});
    }
  },

  onReady: function () {

    var that = this;
    

  }  

})
