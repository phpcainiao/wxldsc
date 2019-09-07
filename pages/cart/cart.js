// pages/cart/cart.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,  //获取全局变量
    selectAllStatus : false,
    displayStatus:'none',
    shopStatus:false,
    totalMoney:0,
    attr:[
      {src:'../../images/attr01.jpg',info:'K-303(不加热)'},
      { src:'../../images/attr02.jpg',info:'K-303LB(加热)'},
      { src:'../../images/attr03.jpg',info:'K-303LC（腰部绷带加热款）'}
    ],
    key:0,
    selectAttr:'K303LB（加热）',
    mainAttr: 'K303LB（加热）',
    list:[
      {
        'shopName':'盛世阳光旗舰店',
        'shopId':1,
        'shopChecked':false,
        'detail':[
          {
            'goodsId':1,
            'src':'../../images/cart03.jpg',
            'title':'Q颈椎按摩枕颈椎枕头电动多功能颈部肩部腰部揉捏家用',
            'price':99.88,
            'number':1,
            'checked':false
          },
          {
            'goodsId': 2,
            'src': '../../images/cart03.jpg',
            'title': 'Q颈椎按摩枕颈椎枕头电动多功能颈部肩部腰部揉捏家用',
            'price': 99.00,
            'number': 1,
            'checked': false
          }
        ]
      },
      {
        'shopName': '盛世阳光旗舰店1',
        'shopId': 2,
        'shopChecked': false,
        'detail': [
          {
            'goodsId': 3,
            'src': '../../images/cart03.jpg',
            'title': 'Q颈椎按摩枕颈椎枕头电动多功能颈部肩部腰部揉捏家用',
            'price': 99.00,
            'number': 1,
            'checked': false
          },
          {
            'goodsId': 4,
            'src': '../../images/cart03.jpg',
            'title': 'Q颈椎按摩枕颈椎枕头电动多功能颈部肩部腰部揉捏家用',
            'price': 99.00,
            'number': 1,
            'checked': false
          }
        ]
      }
    ]
  },

  bindSelectAll:function(){
    var selectAllStatus = this.data.selectAllStatus;
    var flag = selectAllStatus === true ? false : true;
    var carts = this.data.list;
    var len = carts.length;//第一层数组长度
    for(var i=0;i<len;i++){
      carts[i].shopChecked = flag;
      for(var j=0;j<carts[i]['detail'].length;j++){
        carts[i]['detail'][j]['checked'] = flag;
      }
    }
  
    this.setData({
      list: carts,
      selectAllStatus : !selectAllStatus
    });
    this.sum();
  },
  showAttr:function(){
    this.setData({
      displayStatus:'block'
    })
  },
  closeCurrentPage:function(){
    this.setData({
      displayStatus: 'none'
    })
  },
  bindAttr:function(e){
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var info = e._relatedInfo.anchorTargetText;
    this.setData({
      key:index,
      selectAttr:info
    })
  },
  qdbutton:function(){
    var selectAttr = this.data.selectAttr;//获取属性
    this.closeCurrentPage();
    this.setData({
      mainAttr: selectAttr
    })
  },
  bindOneRadio:function(e){
    var key = e.currentTarget.dataset.key;  //第一层json的索引
    var index = e.currentTarget.dataset.index; //第二层数组索引
    var arr = this.data.list;
    var checked = this.data.list[key]['detail'][index]['checked'];
    if (checked == true){
      arr[key]['detail'][index]['checked'] = false;

      var shopChecked = arr[key]['shopChecked'];
      if (shopChecked == true) arr[key]['shopChecked'] = false;

      this.setData({
        list: arr
      });
    }else{
      arr[key]['detail'][index]['checked'] = true;
      // 选中一个时看看该店铺下的所有购物车宝贝是否全部选中，如果全选则店铺前面的按钮也是选中状态
      var len = arr[key]['detail'].length;
      var num = 0;
      for(var i=0;i<len;i++){
        var flg = arr[key]['detail'][i]['checked'];
        if(flg == true) num++
      }
      
      if (num == len) arr[key]['shopChecked'] = true;
      this.setData({
        list: arr
      });
    }
    this.sum();
  },
  bindRadio:function(e){
    var key = e.currentTarget.dataset.key;  //第一层json的索引
    var arr = this.data.list;
    var len = arr[key]['detail'].length;
    for (var i = 0; i < len; i++) {
      arr[key]['detail'][i]['checked'] = false;
    }
    arr[key]['shopChecked'] = false;
    this.setData({
      list: arr
    });
    this.sum();
  },
  bindJian:function(e){
    var key = e.currentTarget.dataset.key;  //第一层json的索引
    var index = e.currentTarget.dataset.index; //第二层数组索引
    var carts = this.data.list;
    var num = carts[key]['detail'][index]['number']; //获取当前的数量
    if(num>1){
      num--;
      carts[key]['detail'][index]['number'] = num;
      this.setData({
        list:carts
      })
    }else{
      wx.showToast({
        title: '该宝贝不能减少了呦',
        icon:'none',
        duration:2000
      })
    }
    
  },
  bindJia:function(e){
    var key = e.currentTarget.dataset.key;  //第一层json的索引
    var index = e.currentTarget.dataset.index; //第二层数组索引
    var carts = this.data.list;
    var num = carts[key]['detasil'][index]['number']; //获取当前的数量
    num++;
    carts[key]['detail'][index]['number'] = num;
    this.setData({
      list: carts
    })
  },
  // 总价格
  sum:function(){
    var carts = this.data.list;
    var price = 0;
    var len = carts.length;//第一层数组长度
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < carts[i]['detail'].length; j++) {
          if (carts[i]['detail'][j]['checked']){
            price += carts[i]['detail'][j]['price'];
          }
        }
    }
 
    this.setData({
      totalMoney: price
    })
  },
  bindCheckout:function(e){
    var list = this.data.list;
    var newarr = new Array();
    for(var i=0;i<list.length;i++){
      for(var j=0;j<list[i].detail.length;j++){
        if(list[i].detail[j]['checked'] === true){
          var id = list[i].detail[j]['goodsId'];
          newarr.push(id);
        }      
      }
    }
    var newstr = newarr.join(',');
    // 检查当前账户是否设置了收货地址
    let that = this;
    var skey = wx.getStorageSync('skey');  //登录态
    if(skey){
      //非首次登录
      wx.request({
        url: that.data.url + '/api/auth/getAddressList',
        data: { skey: skey },
        method: 'post',
        success(res) {
          if(res.data){
            //已设置地址
            wx.navigateTo({
              url: '/pages/order/confirm/confirm?newstr' + newstr,
            })
          }else{
            // 没有设置收货地址则提示
            wx.showModal({
              title: '请先设置收货地址',
              content: '您还没有设置收货地址，请点击这里设置',
              success(res) {
                if (res.confirm) {//用户点击确定
                  wx.navigateTo({
                    url: '/pages/address/add/add'
                  })
                } else if (res.cancel) {//用户点击取消

                }
              }
            })
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var skey = wx.getStorageSync('skey');
    wx.request({
      url: that.globalData.url + '/api/order/getCartList',
      //加上session_id判断是同一绘画操作 
      data: { skey: skey },
      method: 'post',
      success(res) {
        console.log(2222)
        console.log(res)
        if (res.data.code == 1) {
          //skey未过期，检查session_key是否过期
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } else {

        }
      }
    })
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