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
      wx.navigateTo({
        url: "/pages/login/login"
      })
      return
    }
    // 检查token是否正确
    wx.request({
      method: 'POST',
      url: this.globalData.baseURL + '/user/check-token',
      data: {
        token
      },
      success: function (res) {
        if (res.data.status != 1) {
          wx.removeStorageSync('token')
          wx.navigateTo({
            url: "/pages/login/login"
          })
        }
      }
    })
  },
  globalData: {
    baseURL: 'https://localhost:9300',
    // baseURL: 'https://192.168.31.51:9300',
    // userInfo: null,
  }
})