// pages/countdown-test/countdown-test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 设置一个未来的时间戳（当前时间 + 2天）
    endTimestamp: Date.now() + 2 * 24 * 3600 * 1000,
    offset: 0,
    placeholder: 'Queda(n) {day} día(s) {hh_mm_ss} left'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 倒计时结束回调
   */
  onTimeUp: function() {
    wx.showToast({
      title: '倒计时结束',
      icon: 'success'
    });
  }
})
