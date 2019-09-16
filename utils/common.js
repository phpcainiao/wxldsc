var app = getApp();  
function checkLogin(){
  var skey = wx.getStorageSync('skey');
  if (!skey) {//未登录或清除缓存
    wx.navigateTo({
      url: '/pages/member/permission/permission',
    })
  } else {
    //检测session_key是否过期
    wx.checkSession({
      success: function () {
        //未过期
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            app.globalData.userInfo = res.userInfo

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (app.userInfoReadyCallback) {
              app.userInfoReadyCallback(res)
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
            
          }

        })
        wx.navigateTo({
          url: '/pages/member/permission/permission',
        })
      }
    })
  }
}
module.exports = {
  checkLogin : checkLogin
}