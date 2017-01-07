//index.js


//获取应用实例
var app = getApp()
Page({

  data: {
    result:"请求结果",
    userInfo: {},
    app:{appn:"", appc:"defaults",appa:"index", param:""}
  },

  htmlfetch: function(){
    var that = this;
    var utils = app.xpm.require('Utils');
    utils.fetch( this.data.app.param )

    .then( function( resp ) {
      
        that.setData({'result':'SUCCESS'});
        console.log('FETCH RESP:', resp );
    })

    .catch( function( excp ) {
      that.setData({'result':'FAILURE'});
      console.log('FETCH EXCP:', excp );
    });

  },

  jsonfetch: function(){
    var that = this;
    var utils = app.xpm.require('Utils');
    utils.fetch( this.data.app.param, {datatype:'json'} )

    .then( function( resp ) {
      
        that.setData({'result':'SUCCESS'});
        console.log('FETCH RESP:', resp );
    })

    .catch( function( excp ) {
      that.setData({'result':'FAILURE'});
      console.log('FETCH EXCP:', excp );
    });
  },

  appget: function() {

    var that = this;

    var appn = app.xpm.require('App', this.data.app.appn );

    appn.api( this.data.app.appc, this.data.app.appa, {'param': this.data.app.param} )
       .get( false )

    .then( function( resp ) {
      that.setData({'result':'SUCCESS'});
      console.log('GET RESP:', resp );
    })

    .catch( function( excp ) {
      that.setData({'result':'FAILURE'});
      console.log('GET EXCP:', excp );
    });


  },


  apppost: function() {
    
    var that = this;
    var appn = app.xpm.require('App', this.data.app.appn );
    var api  =  appn.api( this.data.app.appc, this.data.app.appa );

    api.post( {'param': this.data.app.param} )

    .then( function( resp ) {
      that.setData({'result':'SUCCESS'});
      console.log('POST RESP:', resp );
    })

    .catch( function( excp ) {
      that.setData({'result':'FAILURE'});
      console.log('POST EXCP:', excp );
    });
  },


  appinput: function( e ) {

    var data = e.currentTarget.dataset;
    var name = data.name || '';
    var value = e.detail.value || '';
    if ( name != '') {
      var obj = {};
      obj['app.' + name] = value;
      this.setData(obj);
    }

  },

  onLoad: function( option ) {
    var that = this;
    var user = app.xpm.require('User');

    user.get().then(function( res ){

      if ( option.nickName == '_p' ) {
         return {nickName:title, avatarUrl:'/res/icons/dashi.png' }
      }

      return user.tab.getLine("WHERE nickName=?", [option.nickName] );

    }).then(function( userInfo ) {
        that.setData({userInfo:userInfo});
    });
   
  },

  onReady: function () {

    var that = this;
    

  }  

})
