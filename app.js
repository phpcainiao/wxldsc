//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //获取设备信息
    wx.getSystemInfo({
      success: function(res) {
        that.screenHeight = res.windowHeight
      },
    })

  var skey = wx.getStorageSync('skey');
  if(!skey){//未登录或清除缓存
    //that.redirectLogin();
  }else{
    //检测session_key是否过期
    wx.checkSession({
      success: function () {
        //未过期
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            that.globalData.userInfo = res.userInfo

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (that.userInfoReadyCallback) {
              that.userInfoReadyCallback(res)
            }

          }
        })
      },
      fail: function () {
        //过期
        wx.request({
          url: that.globalData.url + '/api/auth/destroy',
          //加上session_id判断是同一绘画操作 
          // header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id },
          data: { skey: skey },
          method: 'post',
          success: function (res) {
            console.log(res);
          }

        })
        //that.redirectLogin();
        console.log(222)
      }
    })
  }
 
    // 判断登录态是否过期
    //var skey = wx.getStorageSync('skey'); 
    //如果thridsession存在则取服务器验证登入是否失效 
    //var session_id = wx.getStorageSync('session_id');
    // wx.checkSession({
    //   success() {
    //session_key 未过期，并且在本生命周期一直有效
    // wx.request({
    //   url: that.globalData.url + '/api/auth/check',
    //   //加上session_id判断是同一绘画操作 
    //   header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id },
    //   data: { skey: skey },
    //   method: 'post',
    //   success(res) {
    //     if (res.data.code == 1) {
    //       //skey未过期，检查session_key是否过期
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           that.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (that.userInfoReadyCallback) {
    //             that.userInfoReadyCallback(res)
    //           }

    //         }
    //       })
    //     } else {
    //       // wx.navigateTo({
    //       //   url: '/pages/member/permission/permission',
    //       // })
    //     }
    //   }
    // })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      
      }
    })
   
      //},
      //   // session_key 已经失效，需要重新执行登录流程
      //   wx.login() //重新登录
      // }
    //})
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //  
    
    
    
             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  
  },
  redirectLogin:function(){
    wx.navigateTo({
      url: '/pages/member/permission/permission',
    })
  },
  globalData: {
    userInfo: null,
    url:'http://www.huihuikuaipao.top'
  }
})