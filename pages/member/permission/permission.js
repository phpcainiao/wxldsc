// pages/member/permission/permission.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,  //获取全局变量
    sidebarHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sidebarHeight: getApp().screenHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindgetuserinfo(e){
    let that = this;
    var skey = wx.getStorageSync('skey');  //判断是否是首次登录
    if(e.detail.userInfo){
      console.log(e)
      //用户按了允许按钮
      wx.login({
        success(res){
          if(res.code){
            //console.log(res)
            wx.request({
              url: that.data.url +'/api/auth/wxLogin',
              data: {
                code: res.code,
                // encryptedData: e.detail.encryptedData, 
                // iv: e.detail.iv, 
                // signature: e.detail.signature,
                nickname:e.detail.userInfo.nickName,
                gender: e.detail.userInfo.gender,
                city: e.detail.userInfo.city,
                province: e.detail.userInfo.province,
                country: e.detail.userInfo.country,
                avatarUrl: e.detail.userInfo.avatarUrl
                },
              method:'post',
              success:function(msg){
                if (msg.data[0] == '<'){
                  wx.showToast({
                    title: '服务器错误！',
                    icon: 'none'
                  });
                  return;
                }
                app.globalData.userInfo = e.detail.userInfo;
                wx.setStorage({
                  key: 'skey',
                  data: msg.data[0]
                })
                wx.setStorage({
                  key: 'session_id',
                  data: msg.data[1]
                })
                wx.navigateBack({
                  url:'/pages/member/index/index'
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
         
        }
      })
    }
  }
})