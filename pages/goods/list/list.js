var app = getApp();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,  //获取全局变量
    imgurl: '/static/uploads/',
    count: 1, //请求的页数
    cat_id:0, //当前分类id
    selectShow: false,//初始option不显示
    nowText: "综合",//初始内容
    key:0,
    saleFlag:false,
    comText:true,
    animationData:{},
    propArray:['综合','价格升高','价格降低'],
    goodslist: [
      { id: 1, title: '浪莎男士袜子棉袜透气中筒袜', price: '19.8', avator: '/images/good01.jpg' },
      { id: 2, title: '浪莎男士袜子棉袜透气中筒袜', price: '19.8', avator: '/images/good02.jpg' },
      { id: 3, title: '浪莎男士袜子棉袜透气中筒袜', price: '19.8', avator: '/images/good03.jpg' },
      { id: 4, title: '浪莎男士袜子棉袜透气中筒袜', price: '19.8', avator: '/images/good04.jpg' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var num = that.data.count;
    var id = options.id;
    that.setData({
      cat_id:id
    })
    wx.request({
      url: that.data.url + '/api/index/getGoodsList?id=' + id + '&page='+num,
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      success(res) {
        console.log(111)
        console.log(res)
        var data = res.data.data;
        for(var i=0;i<data.length;i++){
          var good_image = data[i]['good_image'].split(',');
          data[i]['good_image'] = good_image[0];
        }
        
        console.log(data)
        that.setData({
          goodslist: data
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
  onReachBottom: function (options) {
    console.log(7878);
    console.log(options)
    // let that = this;
    // var yuan_goodslist = that.data.goodslist;
    // var num = that.data.count;
    // num = num + 1;
    // wx.request({
    //   url: that.data.url + '/api/index/getHotGoods?page=' + num,
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   dataType: 'json',
    //   success(res) {
    //     if (res.data.code == 1) {
    //       var data = res.data.hotList.data;
    //       for (var i = 0; i < data.length; i++) {
    //         var arr = data[i]['good_image'].split(',');
    //         data[i]['good_image'] = arr[0];
    //       }

    //       that.setData({
    //         goods: yuan_goods.concat(data)  //合并数组
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  selectToggle:function(){
    //获取option的显示状态
    var nowShow = this.data.selectShow;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    
    this.animationData = animation;
    if(nowShow){
      animation.rotate(0).step();
      this.setData({
        animationData: animation.export()
      })
    }else{
      animation.rotate(180).step();
      this.setData({
        animationData:animation.export()
      })
    }
    this.setData({
      selectShow: !nowShow,
      saleFlag : false,
      comText : true
    })
  },
  setText:function(e){
    var index = e.currentTarget.dataset.index;
    var nowShow = this.data.selectShow;
    var text = this.data.propArray[index];
    this.setData({
      nowText:text,
      key: index,
      selectShow: !nowShow
    })
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animationData = animation;
    if (nowShow) {
      animation.rotate(0).step();
      this.setData({
        animationData: animation.export()
      })
    } else {
      animation.rotate(180).step();
      this.setData({
        animationData: animation.export()
      })
    }

    //请求数据
    let that = this;
    wx.request({
      url: that.data.url + '/api/index/getGoodsList?index=' + index,
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'json',
      success(res) {
        console.log(111)
        console.log(res)
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          var good_image = data[i]['good_image'].split(',');
          data[i]['good_image'] = good_image[0];
        }

      
        that.setData({
          goodslist: data
        })
      }
    })
  },
  bindSale:function(){
    this.setData({
      saleFlag:true,
      comText:false,
      key:-1
    })
  }
})