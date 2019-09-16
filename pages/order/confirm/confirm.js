// pages/order/confirm/confirm.js
var app = getApp(); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,  //获取全局变量
    imgurl: '/static/uploads/',
    address:[],
    goodsInfo:[],
    totalprice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: that.data.url +'/api/order/getConfirmOrder',
      method:'post',
      dataType:'json',
      data: { goodsId: options.goodsId,num:options.num},
      success:function(res){
        var data = res.data.goodsInfo;
        var totalprice = '';
        for (var i = 0; i < data.length; i++) {
          data[i]['evtoprice'] = Number(data[i]['price']) * Number(data[i]['num']).toFixed(2); 
          totalprice += Number(data[i]['evtoprice']).toFixed(2);
        }
        that.setData({
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
    let that = this;
    var skey = wx.getStorageSync('skey');
    wx.request({
      url: that.data.url + '/api/auth/getDefaultAddress',
      method: 'post',
      dataType: 'json',
      data: { skey: skey},
      success: function (res) {
        if(res.data.code == 1){
          that.setData({
            address: res.data.info,
          })
        }
      }
    })
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
    let that = this;
    var skey = wx.getStorageSync('skey');
    wx.chooseAddress({
      success:function(res){
        console.log(res)
        wx.request({
          url: that.data.url + '/api/auth/addWxAddress',
          data: { skey: skey, cityname: res.cityName, countyname: res.countyName, detailinfo: res.detailInfo,provincename:res.provinceName,telnumber:res.telNumber,username:res.userName},
          method: 'post',
          success(msg) {
            console.log(msg)
            if (msg.data.code == 1){
              that.setData({
                address: msg.data.address
              });
            }
            if (msg.data.code == 0){
              wx.showToast({
                title: '服务器错误！',
                icon:'none'
              });
              return;
            }         
          }
        })

      }
    })
  }
})