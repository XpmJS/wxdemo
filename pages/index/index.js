//index.js


//获取应用实例
var app = getApp()
Page({

  data: {
    userInfo: {avatarUrl:'/res/icons/avt.gif', nickName:'...'},
    wss:{status:'grey', text:'信道未连接', style:'grey'},
    pages: [
      {name:' 用户 ( User)', link:'/pages/404/404' },
      {name:' 数据表格 ( Table )', link:'/pages/404/404' },
      {name:' WebSocket 信道  ( Wss )', link:'/pages/socket/socket' },
      {name:' 微信支付 ( Pay )', link:'/pages/payment/payment?nickName=_p' },
      {name:' 应用接口 ( App )', link:'/pages/app/app' }
    ]
  },

  bindViewTap: function( e){

  },

  linkto: function( e ) {

    var data = e.currentTarget.dataset;
    var link = data.link || '/pages/index/index';
    if ( link != '/pages/404/404') {
      wx.navigateTo({ url: link });
    }

  },

  onShow: function() {
    
    var that = this;

    // 信道状态监听
    app.wss.bind('close', function(event) {
      that.setData({'wss.status':'grey', 'wss.text':'信道未连接', 'wss.style':''});
      wssRetryTimes++;
      var wait = 2000;
      if ( wssRetryTimes > 3 ) {
        wait = wssRetryTimes * 2000;
      } 
      setTimeout(function(){ app.wss.open('/wxapp').catch(function(excp){ console.log('Retry Error', excp);}); }, wait );

    });


    app.wss.bind('open', function(event) {
      wssRetryTimes = 0;
      that.setData({'wss.status':'green', 'wss.text':'信道已连接', 'wss.style':'statusbar-green'});
    });

    // 呈现当前信道状态
    if ( app.wss.isOpen ) {
      that.setData({'wss.status':'green', 'wss.text':'信道已连接', 'wss.style':'statusbar-green'});
    }
  },

  onReady: function () {

    var that = this;
    var wssRetryTimes = 0;

    


    // 用户登录
    var user = app.xpm.require('User');
    // wx.showToast({title:'验证用户身份', icon:'loading', mask:true, duration: 10000});
    user.login()

      .then( function( userInfo ){
          app.session.set('loginUser', userInfo );
          that.setData({
            userInfo:userInfo
          });
      })

      .catch( function( e ) { 
         console.log('ERROR HELLO', e );
         // wx.hideToast();
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
