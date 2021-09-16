// pages/playList/playList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playList: [],
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let playListId=options.playListId
    // 获取歌单内容
    wx.request({
      url: 'http://iwenwiki.com:3000/playlist/detail?id='+playListId,
      success: (result) => {
        this.setData({
          playList: result.data.playlist
        })
      }
    })
    // 获取歌单评论
    wx.request({
      url: 'http://iwenwiki.com:3000/comment/playlist?id='+playListId,
      success: (result) => {
        this.setData({
          commentList: result.data.comments
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