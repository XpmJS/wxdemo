//index.js


//获取应用实例
var app = getApp()
Page({

  data: {
    wss:{status:'grey', text:'信道未连接', style:'grey'},
    userInfo: {},
    users:[],
    price:0.50,
  },


  reload:function(e) {
    var that =this;

    wx.showToast({
      title: '在线用户',
      icon: 'loading',
      duration: 100000
    });

    // 在线用户
    app.wss.liveUsers().then(function( users ) {
        wx.showToast({
              title: '完成',
              icon: 'success',
              duration: 200
            })

        var i = 1;
        for( var id in users) {
           users[id]['nickName'] = users[id]['nickName'] || ' 访客' + i;
           users[id]['avatarUrl'] = users[id]['avatarUrl'] || '/res/icons/nopic.png';
        }
        that.setData({'users':users});
      });
  },

  // 发送请求
  send: function(e) {
    var data = e.currentTarget.dataset;
    
    wx.showToast({
      title: '正在发送',
      icon: 'loading',
      duration: 100000
    });
    app.wss.send('payment', this.data.userInfo, data.cid )
       .then( function(){
           wx.showToast({
              title: '发送完毕',
              icon: 'success',
              duration: 2000
            })
       })
  },


  onLoad: function( option ) {
    console.log( option );

    var that = this;
    var userInfo = app.session.get('loginUser');

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


    if (  userInfo == null ) {

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


    // 在线用户
   this.reload();

  },

  onReady: function () {

    var that = this;
    

  }  

})
