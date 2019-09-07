// pages/goods/detail/detail.js
var app = getApp();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,  //获取全局变量
    imgurl: '/static/uploads/',
    goodId: 0,
    displayStatus: 'none',
    goods: [],
    cate: '选择 ',
    cateflag:[],
    flag: '',/* 弹出框购物车，立即支付标识*/
    galleryHeight: getApp().screenWidth,
    attrinfo: [],
    key: [],
    cateindex: -1,
    selectAttr: 'K303LB（加热）',
    number: 1
  },
  showCart: function (e) {
    let that = this;
    var flag = e.currentTarget.dataset.index;
    that.setData({
      displayStatus: 'block',
      flag: flag
    })
  },
  bindpay(e) {
    let that = this;
    var flag = e.currentTarget.dataset.index;
    that.setData({
      displayStatus: 'block',
      flag: flag
    })
  },
  closeCurrentPage: function () {
    let that = this;
    that.setData({
      displayStatus: 'none'
    })
  },
  bindAttr: function (e) {
    let that = this;
    var index = e.currentTarget.dataset.index;  //属性值index
    var cateindex = e.currentTarget.dataset.cateindex;//属性类index 如颜色分类，尺码的等
    var info = e._relatedInfo.anchorTargetText;
    var key = that.data.key;
    var attrinfo = that.data.attrinfo;
    var cate = '选择 ';
    var cateflag = that.data.cateflag;
    key[cateindex] = index; //属性对应选中的值
    for (var i = 0; i < attrinfo.length; i++) {
      if (key[i] == null || key[i] == undefined) {
        //没选的属性
        cate += attrinfo[i]['attrname'];
      }
    }
    cateflag[cateindex] = attrinfo[cateindex]['attrval'][index];
    if (key.length == 2) {
      cate = '已选 ' + cateflag.join(',');
    }
    that.setData({
      key: key,
      cate: cate,
      cateflag: cateflag,
      selectAttr: info
    })
  },
  getnumber: function (e) {
    let that = this;
    var val = e.detail.value;
    that.setData({
      number: val
    })
  },
  bindJian: function (e) {
    let that = this;
    var num = that.data.number;
    if (num > 1) {
      num--;
      that.setData({
        number: num
      })
    } else {
      wx.showToast({
        title: '该宝贝不能减少了呦',
        icon: 'none',
        duration: 2000
      })
    }

  },
  bindJia: function (e) {
    let that = this;
    var num = that.data.number;
    if(num>=10){
      wx.showToast({
        title: '该宝贝不能增加了呦',
        icon: 'none',
        duration: 2000
      })
    }else{
      num++;
      that.setData({
        number: num
      })
    }
  },
  qdbutton: function (e) {
    let that = this;
    var flag = that.data.flag;
    var goodsId = that.data.goodId;
    var skey = wx.getStorageSync('skey');
    var num = that.data.number;
    if (flag == 'pay') {
      wx.navigateTo({
        url: '/pages/order/confirm/confirm?skey=' + skey + '&goodsId=' + goodsId + '&num=' + num,
      })
    }
    if (flag == 'cart') {
      var num = that.data.number;
      wx.request({
        url: that.data.url + '/api/order/addCart',
        data: { skey: skey, goodsId: goodsId, num: num },
        method: 'post',
        success(res) {
          if (res.data.code) {
            wx.showToast({
              title: res.data.msg
            });
            return;
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var id = options.goodId;
    wx.request({
      url: that.data.url + '/api/index/getGoodsDetail?id=' + id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      success(res) {
        var goodinfo = res.data.goodinfo;
        var attrinfo = res.data.attrinfo;
        var cate = that.data.cate;
        goodinfo['good_image'] = goodinfo['good_image'].split(',');
        for (var i = 0; i < attrinfo.length; i++) {
          attrinfo[i]['attrval'] = attrinfo[i]['attrval'].split(',');
          cate += attrinfo[i]['attrname'];
          if (i < attrinfo.length - 1) {
            cate += '，';
          }
        }
        that.setData({
          goods: goodinfo,
          attrinfo: attrinfo,
          cate: cate,
          goodId: id
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

  }
})