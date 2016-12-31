//app.js

App({

  onHide: function(){
    this.wss.close();
  },
  
  onLaunch: function () {

    var that = this;

    // 创建 xpm 对象
    this.xpm = require('xpm/xpm.js').option({
        'host':'wxcloud.tuanduimao.cn',
        'https':'wxcloud.tuanduimao.cn',
        'wss': 'wxcloud.tuanduimao.cn/ws-server',
        'table.prefix': 'o2o',
        'user.table':'wxuser'
    });

    // 打开默认信道
    this.wss = this.xpm.require('wss');
    this.session = this.xpm.require('session');
    this.stor = this.xpm.require('stor');
    this.stor.clearSync();

    this.wss.listen('payment', function( res, status ){
      if ( status != 'success') return ;
      var u = res.request.b;
      var link = '/pages/payment/payment?nickName=' + u.nickName;
      wx.navigateTo({ url: link });
    });


    // this.wss.open('/wxapp').then( function(){
    
    //     console.log('/wxapp 信道连接成功');
    
    // }).catch(function( excp ){

    //   console.log('/wxapp 信道连接失败', excp );
    // });



    // var user = this.xpm.require('User');
    // var tb = this.xpm.require('Table', 'hello' );

    // user.login().then(function( resp ){
    //   return  user.tab.query()
    //               .where("nickName", "=", "王伟平")
    //               .limit(1)
    //               .fetch('openid', 'nickName', 'isadmin', 'group');

    // }).then(function( resp ){
    //   console.log(resp);
    //   return user.logout();
    //   // return user.tab.create({'user':'user'});
    // }).then(function( resp ){
    //   console.log( 'after logout ', resp );
    // })
    // .catch( function (excp) {
    //     console.log( 'someting error', excp );
    // });

    /*
  
    user.login()  // 验证用户身份 

    .then( function(uinfo) {  
      
      console.log( 'after User Login ', uinfo );

      return tb._schema([  // 创建后端数据表
        {name:"name", type:'string', option:{length:80, require:true }, acl:"rwd:r:-" },
        {name:"company", type:'string', option:{length:100}, acl:"w:-:-" }
      ], { record:"rwd:rw:-", table:"rwd:-:-", field:'rwd:r:-',  user:'admin', group:'member' },  true );

    })

    

    .then( function( data ) {  // 插入一条数据
      console.log( 'after table create ', data );
      return tb.create( {name:'测试一下', company:'有家公司'} )
    })

    .then( function(){
        return tb.create( {name:'测试一下', company:'有家公司2'} )
          .then( function(){ return  tb.create( {name:'测试一下3', company:'有家公司2'} );} )
          .then( function(){ return  tb.create( {name:'测试一下4', company:'有家公司2'} ); })
          .then( function(){ return  tb.create( {name:'测试一下75', company:'有家公司2'} ); })
          .then( function(){ return  tb.create( {name:'测试一下76', company:'有家公司2'} ); })
          .then( function(){ return  tb.create( {name:'测试一下7', company:'有家公司2'} ); })
          .then( function(){ return  tb.create( {name:'测试一下8', company:'有家公司2'} ); });
        
    })


    .then( function( data ) {  // 更新刚刚插入的数据
      console.log( 'after create ', data );
      return tb.update(data['_id'], {name:'测试一下-UP', company:'有家公司-UP'} );
    })
    .then( function( data ) {  // 更新刚刚插入的数据
      console.log( 'after update ', data );
      return tb.updateBy('name', {name:'测试一下7', company:'有家公司-UP-2'} );
    })

    .then ( function(resp) {

      console.log('after update by name',  resp );
      return tb.select('where name like ?', ['%UP%'] );

    })

    .then( function( data  ){ //  Getline 
       console.log('after select',  data );
       return tb.getLine('where name like ?', ['%UP%']);
    })

    .then( function( data  ){ //  Getline 
       console.log('after getline',  data );
       return tb.getVar('name','where name like ?', ['%UP%']);
    })

     .then( function( name  ){ //  Getline 
       console.log('after getvar 1',  name );
       return tb.getVar('company','where company like ? LIMIT 1', ['%UP%']);
    })

    .then( function( company  ){ //  Getline 
       console.log('after getvar 2',  company );
       return tb._run('UPDATE `'+ tb.table() +'` SET company=? WHERE name=? LIMIT 1', ['有家公司-UP-3', name]);
    })

    .then( function( resp  ){ //  Getline 
       console.log('after runSql 1',  resp );
       return tb._run('SELECT * FROM `'+ tb.table() +'` WHERE name=? LIMIT 1', ['测试一下-UP'], true);
    })

    .then( function( resp  ){ // 移除数据
       console.log('after runSql 2',  resp );
    })

    .then(function(){
      return tb.remove('测试一下-UP', 'name');
    })

    .then( function( resp )  {  // 移除完毕
      console.log('after remove by name',  resp );
      return tb.query()
               .where('name', 'like', '%7%')
               .orderby('name', 'asc')
               .limit(2)
               .fetch('name','company');
    })

    .then( function( resp ) {

      console.log('after query 1',  resp );

      return tb.query()
               .where('name', 'like', '%下%')
               .orwhere('name', 'like', '%7%')
               .orderby('name', 'desc')
               .paginate(3, 2)
               .fetch('name','company');

    })

    .then( function( resp ) {

      console.log('after query 2',  resp );
      return tb.getData('where company like ?', ['%公司%']);

    })

    .then( function( data ) {
      console.log('after get data',  data );
      return tb.nextid();

    })

    .then( function( nextid ) {
      console.log('after nextid',  nextid );
      return tb.get(3);

    })

    .then( function( resp ) {
      console.log('after get',  resp );

    })  

    .catch( function(excp){  // 异常处理
      console.log( 'excp',  excp );
    }); */
   
  
    // this.stor = this.xpm.require('Stor');
    // // this.stor.clearSync();

    // this.session = this.xpm.require('Session');
    // this.session.start();
    // this.session.set('user', {hello:'world'});

    // console.log( 'session is work ?',  this.session.isVerified() );
    // this.session.destory();


    // // Load Wss
    // var wss = this.xpm.require('Wss');
    // wss.bind('hello', function( arg1, arg2 ) {
    //     console.log('Hello IS Called', arg1, arg2 );
    // });

    // wss.bind('close', function( res ){
    //     console.log( 'socket close' , res );
    // })
    // .bind('open', function( res ){
    //     console.log( 'socket open' , res );
    // })
    // .bind('message', function( res ){
    //     console.log( 'socket message' , res );
    // })

    // .listen('ping', function( res, status ) {
    //     console.log( 'ping response:',  status,  ' ', res );
    // })

    // .listen('_open', function( res, status ) {
    //     console.log( '_open', res, status);
    // })

    // .listen('echo', function( res, status ) {
    //     console.log( 'echo response:',  status,  ' ', res );
    // })

    // .listen('getClients', function( res, status ) {

    //     var resp = res.response;
    //     for ( var i in resp ) {
    //         var uid = resp[i];
    //         console.log( 'uid', uid );
    //         break;
    //     }

    //     console.log( 'getClients response:',  status,  ' ', res );
    // })




    // var user = this.xpm.require('User');
    // user.login().then(function( u ){
    //   console.log( 'user is', u );
    //   return wss.open('/wxapp')
    // })
    
    // .then( function( res ) {
    //    console.log( 'socket open', res );
    //     that.wss = wss;
    //     return wss.liveUsers()
    // })
    // .then( function( users ){
    //    console.log( 'live-users:', users );
    //    return wss.send('someevent',{info:'美女你好!'}, 2 );
    // })  
    /*
    .then( function( res ) {
       console.log( 'after someevent:' , res );
       wss.close();
    })

    .then( function( res ) {
       console.log( 'after close:' , res );
    }) 

    .catch( function(excp ){
       console.log( 'connectSocket Error:', excp );
    })*/
    
    /*
    // //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs ); */
  },

  xpm:null,
  session:null,
  stor:null,
  wss:null,
  globalData:{
    userInfo:null
  }
})