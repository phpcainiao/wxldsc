var app = getApp();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,  //获取全局变量
    key:0,
    imgurl: '/static/uploads/',
    categories:[],
    subCategories:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: that.data.url + '/api/index/getTopCategory',
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      success(res) {
        var data = res.data;
        that.setData({
          categories: res.data
        })
        that.getChildren(data[0]['id']);
      }
    }),
    this.setData({
      sidebarHeight: getApp().screenHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;     //先注释掉
    // wx.request({
    //   url: that.data.url +'/api/category/getTopCategories',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   dataType: 'json',
    //   success(res) { 
    //     that.setData({
    //       categories: res.data
    //     })
    //     //获取该类下的子级  获取该类的索引
    //     var key = that.data.key;
    //     //获取该类的id
    //     var id = res.data[key]['id'];
    //     that.getChildren(id);
    //   }
    // })
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

  topCategory:function(e){
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var that = this;
    that.setData({
      key: index
    }),
    that.getChildren(id);
  },

  getChildren(id){
    let that = this;
    //查找该类的子级
    wx.request({
      url: that.data.url + '/api/index/getSubCategory',
      method:'post',
      data:{id:id},
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      success(res) {
      
        that.setData({
          subCategories:res.data
        })
      }
    })
  },
  // 跳转到list页面
  navigateToList:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/list/list?id='+id,
    })
  }
})