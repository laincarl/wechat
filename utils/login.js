// function login() {
//   // 登录
//   wx.login({
//     success: res => {
//       console.log(res);
//       if (!res.code) {
//         return;
//       }
//       const code = res.code;
//       // 获取用户信息
//       wx.getSetting({
//         success: res => {
//           if (res.authSetting['scope.userInfo']) {
//             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//             wx.showLoading({
//               title: '登录中'
//             })
//             wx.getUserInfo({
//               withCredentials: true,
//               success: res => {
//                 // 可以将 res 发送给后台解码出 unionId
//                 // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//                 // 所以此处加入 callback 以防止这种情况
//                 if (this.userInfoReadyCallback) {
//                   this.userInfoReadyCallback(res)
//                 }
//                 // 发送 res.code 到后台换取 openId, sessionKey, unionId
//                 const { encryptedData, iv } = res
//                 wx.request({
//                   method: 'POST',
//                   url: 'http://localhost:9000/user/signup',
//                   data: { code, encryptedData, iv },
//                   success: function (res) {
//                     console.log(res.data);
//                     wx.setStorageSync('userInfo', res.userInfo);
//                     wx.hideLoading();
//                   }
//                 })

//               }
//             })
//           }
//         }
//       })
//     }
//   })
// }
function login() {
  // 登录
  wx.login({
    success: res => {
      console.log(res);
      if (!res.code) {
        return;
      }
      const code = res.code;
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.showLoading({
              title: '登录中'
            })
            wx.getUserInfo({
              withCredentials: true,
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                const { encryptedData, iv } = res
                wx.request({
                  method: 'POST',
                  url: 'http://localhost:9000/user/signup',
                  data: { code, encryptedData, iv },
                  success: function (res) {
                    console.log(res.data);
                    wx.setStorageSync('userInfo', res.userInfo);
                    wx.hideLoading();
                  }
                })

              }
            })
          }
        }
      })
    }
  })
}
export default login;