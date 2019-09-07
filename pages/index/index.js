//index.js
var app = getApp();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,  //获取全局变量
    count:1, //热卖商品请求的页数
    imgurl:'/static/uploads/',
    banner:[],
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*获取幻灯片信息 */
    let that = this;
    var num = that.data.count;
    wx.request({
      url: that.data.url + '/api/index/getBanner',
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      success(res) {
        if(res.data.code == 1){
          var data = res.data.bannerlist;
          that.setData({
            banner: data
          })
        }
      }
    }),
    /*获取第一次热卖商品信息 */
    wx.request({
      url: that.data.url + '/api/index/getHotGoods?page='+num,
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      success(res) {
        if(res.data.code == 1){
          var data = res.data.hotList.data;
          for (var i = 0; i < data.length; i++) {
            var arr = data[i]['good_image'].split(',');
            data[i]['good_image'] = arr[0];
          }
          that.setData({
            goods: data
          })
        }
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
    let that = this;
    var yuan_goods = that.data.goods;
    var num = that.data.count;
    num = num + 1;
    wx.request({
      url: that.data.url + '/api/index/getHotGoods?page=' + num,
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      success(res) {
        if (res.data.code == 1) {
          var data = res.data.hotList.data;
          for (var i = 0; i < data.length; i++) {
            var arr = data[i]['good_image'].split(',');
            data[i]['good_image'] = arr[0];
          }
          
          that.setData({
            goods: yuan_goods.concat(data)  //合并数组
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  showDetail:function(e){
    var index = e.currentTarget.dataset.index;  //热销商品的索引，从0开始
    var goodId = this.data.goods[index].id;   //对应的商品id
    wx.navigateTo({
      url: '../goods/detail/detail?goodId='+goodId,
    })
  },
  // 小程序底部定义的链接只能使用switchTab跳转
  bindCate:function(){
    console.log(888)
    wx.switchTab({
      url: '../category/category',
      fail:function(e){
        console.log(e)
      }
    })
  }
})
