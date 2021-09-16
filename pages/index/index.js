Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        name: "推荐音乐",
        isActive: true
      },
      {
        id: 0,
        name: "热歌榜",
        isActive: false
      }, {
        id: 0,
        name: "推荐MV",
        isActive: false
      }
    ],
    background: [],
    songList: [],
    newSongList: [],
    HotSongList: [],
    currentMonth: "",
    currentDay: "",
    newMvList:[],
    mvRankingList:[]
  },
  handleItemChange(e) {

    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播图
    wx.request({
      url: 'http://iwenwiki.com:3000/banner?type=1',
      success: (result) => {
        this.setData({
          background: result.data.banners
        })
      }
    })
    // 编辑推荐
    wx.request({
      url: 'http://iwenwiki.com:3000/personalized?limit=6',
      success: (result) => {
        this.setData({
          songList: result.data.result
        })
      }
    })
    // 最新音乐
    wx.request({
      url: 'http://iwenwiki.com:3000/personalized/newsong',
      success: (result) => {
        this.setData({
          newSongList: result.data.result
        })
      }
    })
    // 热歌榜
    wx.request({
      url: 'http://iwenwiki.com:3000/playlist/detail?id=3778678',
      success: (result) => {
        this.setData({
          HotSongList: result.data.playlist.tracks
        })
      }
    })
    // 热歌榜更新日期
    const date = new Date();

    this.setData({
      currentMonth: date.getMonth()+1,
      currentDay: date.getDate(),
    })
    // 最新mv
    wx.request({
      url: 'http://iwenwiki.com:3000/mv/first?limit=10',
      success: (result) => {
        this.setData({
          newMvList: result.data.data
        })
      }
    })
     // MV排行榜
     wx.request({
      url: 'http://iwenwiki.com:3000/top/mv?limit=20',
      success: (result) => {
        this.setData({
          mvRankingList: result.data.data
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