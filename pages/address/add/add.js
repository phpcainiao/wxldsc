// pages/address/add/add.js
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    address:'所在地区',
    status : 'none',
    url: app.globalData.url,  //获取全局变量
  },
  formSubmit:function(e){
    console.log(e);
    var username = e.detail.value.username; //收货人
    var tel = e.detail.value.tel;
    var address = e.detail.value.address;
    var detailAddress = e.detail.value.detailAddress;
    var switch1 = e.detail.value.switch;
    var skey = wx.getStorageSync('skey');
    var that = this;
    if (username == '') {
      wx.showToast({
        title: '请填写收货人'
      });
      return;
    }

    if (!(/^1[345789]\d{9}$/.test(tel))) {
      wx.showToast({
        title: '请填写正确手机号码'
      });
      return;
    }

    if (address.length == 0) {
      wx.showToast({
        title: '请填写省市区'
      });
      return;
    }

    if (detailAddress == '') {
      wx.showToast({
        title: '请填写详情地址'
      });
      return;
    }
    // 将数据传给后台
    wx.request({
      url: that.data.url +'/api/auth/addAddress',//后台地址
      data:{
        skey:skey,
        username:username,
        tel:tel,
        address:address,
        detailAddress: detailAddress,
        switch1:switch1
      },
      method:'post',
      dataType:'json',
      success:function(res){
        console.log(res)
        if(res.data.code == 1){
          //添加成功
          wx.navigateTo({
            url: '/pages/address/list/list',
          })
        }else{
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
        }
      },
      fail:function(res){

      }
    })
  },
  bindRegionChange(e) {
    let that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var region = e.detail.value;
    that.setData({
        address: region.join('')
    })
  },
  getArea:function(lat,long){
    let that = this;
    that.getPos(); 
    // qqmapsdk.reverseGeocoder({
    //   location: {
    //     latitude: lat,
    //     longitude: long
    //   },
    //   get_poi: 1,
    //   poi_options: 'policy=2',
    //   success: function (res, data) {
    //     var address = res.result.address;
    //     console.log(8888);
    //     console.log(address);
    //     if(address != null){
    //       // that.setData({
    //       //   address: address
    //       // })
    //     }
    //   },
    //   fail:function(res){
    //     console.log(7777);
    //   }
    // })
  
  },
  getPos:function(){
    let that = this;
    wx.getLocation({
      type:'gcj02',
      altitude:true,
      success: function(res) {
        const lat = res.latitude; //纬度
        const long = res.longitude; //经度
        wx.chooseLocation({
          success: function(res) {
            var name = res.name;
            var address = res.address;
            if (name != null && name != '' && name != undefined &&  address != null && address != '' && address != undefined){
              that.setData({
                name: name,
                address: [address]
              })
            }
          },
        })
        //that.getArea(lat,long);
      },
    })
  },
  getLimit:function(){
    let that = this;
    //判断小程序是否有权获取当前用户的地理位置
    wx.getSetting({
      success(res){
        if(res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true){//未授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success:function(result){
              if(result.cancle){
                //取消授权
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none'
                })
              }else if(result.confirm){
                //确认授权,发起授权请求
                wx.openSetting({
                  success:function(res1){
                    if(res1.authSetting['scope.userLocation'] == true){
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success'
                      })
                      //获取用户所在经纬度
                      ttha.getPos();
                    }else{
                      //授权失败
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none'
                      })
                    }
                  }
                })
              }
            }
          })
        }else if(res.authSetting['scope.userLocation' == undefined]){
          //用户首次进入页面
          that.getPos();
        }else{
          //授权成功
          that.getPos()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'NMIBZ-A633G-YZDQQ-IXAC5-FDXP5-7KFKR'
    });
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