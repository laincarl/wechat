//index.js
//获取应用实例
const app = getApp()
import store from '../../stores/UserStore';
import { observer } from "../../utils/observer";
Page(observer({ store/*,otherStore*/ })({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tapAdd() {
    store.add();
  },
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({ url: '/pages/login/login' })
    } else {
      this.setData({
        userInfo
      })
    }
  },
  toLogin: function () {
    wx.navigateTo({ url: '/pages/login/login' })
  }
}))
