//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 判断是否登录
    let token = wx.getStorageSync('token');
    if (!token) {
      this.goLoginPageTimeOut()
      return
    }
    wx.request({
      method: 'POST',
      url: this.globalData.baseURL + '/user/check-token',
      data: {
        token
      },
      success: function (res) {
        if (res.data.status != 1) {
          wx.removeStorageSync('token')
          this.goLoginPageTimeOut()
        }
      }
    })
  },
  goLoginPageTimeOut: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/login/login"
      })
    }, 1000)
  },
  globalData: {
    baseURL: 'http://localhost:9300'
    // userInfo: null,
  }
})