// pages/order/confirm/confirm.js
var app = getApp(); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,  //获取全局变量
    address:[],
    goodsInfo:[],
    totalprice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111)
    console.log(options)
    let that = this;
    wx.request({
      url: that.data.url +'/api/order/getConfirmOrder',
      method:'post',
      dataType:'json',
      data: { goodsId: options.goodsId,skey:options.skey,num:options.num},
      success:function(res){
        console.log(res)
        var data = res.data.goodsInfo;
        var totalprice = 0;
        for (var i = 0; i < data.length; i++) {
          totalprice += data[i]['price'];
        }
        that.setData({
          address: res.data.address,
          goodsInfo:data,
          totalprice: totalprice
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
  /* 获取收货地址 */
  getphone:function(e){
    wx.chooseAddress({
      success:function(res){
        console.log(res)
      }
    })
  }
})