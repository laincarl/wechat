// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserInfo: function (e) {
    if (!e.detail.userInfo) {
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo);
    // wx.switchTab({ url: '/pages/index/index' });
    // wx.reLaunch({ url: '/pages/index/index' });
    this.login();
  },
  login: function () {
    let that = this;
    let token = wx.getStorageSync('token');
    if (token) {
      wx.request({
        method: 'POST',
        url: app.globalData.baseURL + '/user/check-token',
        data: {
          token: token
        },
        success: function (res) {
          if (res.data.code != 0) {
            wx.removeStorageSync('token')
            that.login();
          } else {
            // 回到原来的地方
            // wx.switchTab({ url: '/pages/index/index' });
            wx.navigateBack();
          }
        }
      })
      return;
    }
    wx.login({
      success: function (res) {
        wx.request({
          method: 'POST',
          url: app.globalData.baseURL + '/user/login',
          data: {
            code: res.code
          },
          success: function (res) {
            // if (res.data.code == 10000) {
            //   // 去注册
            //   that.registerUser();
            //   return;
            // }
            if (res.data.status != 1) {
              // 登录错误
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel: false
              })
              return;
            }
            wx.setStorageSync('token', res.data.data.token);
            // 回到原来的地方放
            // wx.switchTab({ url: '/pages/index/index' });
            wx.navigateBack();
          },
          fail: function (err) {
            console.log(err);
            wx.showModal({
              title: "登录错误",
              content: err.errMsg
            })
          }
        })
      }
    })
  },
  onBack: function () {
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   let userInfo = wx.getStorageSync('userInfo')
  //   if (userInfo) {
  //     // wx.switchTab({ url: "/pages/index/index" });
  //     wx.reLaunch({ url: "/pages/index/index" });
  //   }
  // },

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