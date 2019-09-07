var app = getApp();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '点击登录',
    avatar: '/images/avatar.jpg',
    detail:[
      { src:'/images/wfk.png',text:'待付款'},
      { src: '/images/dps.png', text: '待发货'},
      { src: '/images/psz.png', text: '待收货'},
      { src: '/images/pj.png', text: '待评价'}
    ]
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
    if (app.globalData.userInfo != null) {
      this.setData({
        nickname: app.globalData.userInfo.nickName,
        avatar: app.globalData.userInfo.avatarUrl
      })
    }
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
  allOrders:function(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/order/list/list?index='+index,
    })
  },
  bindAddress:function(){
    wx.navigateTo({
      url: '/pages/address/list/list',
    })
  },
  bindHistory:function(){
    wx.navigateTo({
      url: '/pages/member/history/history',
    })
  },
  bindFeek:function(){
    wx.navigateTo({
      url: '/pages/member/feedback/feedback',
    })
  },
  bindLogin:function(){
    wx.navigateTo({
      url: '/pages/member/permission/permission',
    })
  }
})