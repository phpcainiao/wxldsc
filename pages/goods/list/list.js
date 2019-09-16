var app = getApp();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,  //获取全局变量
    imgurl: '/static/uploads/',
    currentTab:0,
    displays:'none',
    selected:true,
    selected1:false,
    selected2:false,
    count: 1, //请求的页数
    cat_id:0, //当前分类id
    nowText: "综合",//初始内容
    key:0,
    goodslist: []
  },
  tabNav:function(e){
    let that = this;
    var current = e.currentTarget.dataset.current;
    if(current == 0){
      that.setData({
        currentTab: 0,
        displays:'block'
      })
    }else{
      //销量
      that.setData({
        currentTab:1,
        selected: false,
        selected1: false,
        selected2: false,
        displays: 'none',
        nowText: '综合',
      }),
      that.getGoodsList();
    }
  },
  selected:function(){
    let that = this;
    that.setData({
      selected:true,
      selected1:false,
      selected2:false,
      displays:'none',
      nowText:'综合',
      key:0
    }),
    that.getGoodsList();
  },
  selected1: function () {
    let that = this;
    that.setData({
      selected: false,
      selected1: true,
      selected2: false,
      displays: 'none',
      nowText: '价格升高',
      key: 1
    }),
    that.getGoodsList();
  },
  selected2: function () {
    let that = this;
    that.setData({
      selected: false,
      selected1: false,
      selected2: true,
      displays: 'none',
      nowText: '价格降低',
      key: 2
    }),
    that.getGoodsList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var id = options.id;
    that.setData({
      cat_id:id
    })
    that.getGoodsList();
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
  onReachBottom: function (options) {
    let that = this;
    var num = that.data.count;
    num = num + 1;
    that.setData({
      count:num
    });
    that.getGoodsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  getGoodsList(){
    let that = this;
    var cat_id = that.data.cat_id;
    var num = that.data.count;
    var key = that.data.key;
    var yuan_goodslist = that.data.goodslist;
    wx.request({
      url: that.data.url + '/api/index/getGoodsList',
      data:{id:cat_id,page:num,index:key},
      method:'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      success(res) {
        var data = res.data.data;
        var len = 10;
        for (var i = 0; i <data.length;i++) {
          var title = data[i]['title'];
          data[i]['title'] = title.length <= len ? title : title.substr(0, len)+'...';
        }
        if(num>1){
          data = yuan_goodslist.concat(data);
        }
        
        that.setData({
          goodslist: data
        })
      }
    })
  }
})