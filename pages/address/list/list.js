// pages/address/list/list.js
var app = getApp();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    receiver:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var skey = wx.getStorageSync('skey');
    wx.request({
      url: that.data.url + '/api/auth/getAddressList',
      data:{skey:skey},
      method:'post',
      success(res) {
        console.log(res)
        that.setData({
          receiver:res.data
        })
      }
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
  addAddress:function(){
    wx.navigateTo({
      url: '/pages/address/add/add',
    })
  }
})