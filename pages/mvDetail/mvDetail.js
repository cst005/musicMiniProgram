// pages/mvDetail/mvDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvdetail: [],
    hotComments:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let mvid = options.mvid;
    // 获取MV信息
    wx.request({
      url: 'http://iwenwiki.com:3000/mv/detail?mvid='+mvid,
      success: (result) => {
        this.setData({
          mvdetail:result.data.data
        })
      }
    })

    // 获取MV评论
    wx.request({
      url: 'http://iwenwiki.com:3000/comment/mv?id='+mvid,
      success: (result) => {
        this.setData({
          hotComments:result.data.hotComments
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})