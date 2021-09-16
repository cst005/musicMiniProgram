// pages/artist/artist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artists: [],
    artist:'',
    artistList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id=options.id
    wx.request({
      url: 'http://iwenwiki.com:3000/artists?id='+id,
      success: (result) => {
        this.setData({
          artists: result.data,
          artist:result.data.artist.name
        })
      }
    })
    // 获取歌手歌手榜排行
    wx.request({
      url: 'http://iwenwiki.com:3000/toplist/artist',
      success: (result) => {
        this.setData({
          artistList: result.data.list.artists
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