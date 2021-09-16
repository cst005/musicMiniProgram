// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInput: false,
    inputValue: "",
    hots: [],
    hot_isShow: true,
    suggest: [],
    suggest_isShow: false,
    hotMatchList: [],
    hotSearchSongs: [],
    hotSearchList_isShow: false
  },
  inputChange: function (e) {
    if (e.detail.value != "") {
      this.setData({
        isInput: true,
        hot_isShow: false,
        inputValue: e.detail.value,
        suggest_isShow: true,
        hotSearchList_isShow: false
      })
      // 获取搜索建议
      wx.request({
        url: "http://iwenwiki.com:3000/search/suggest?keywords=" + e.detail.value + "&type=mobile",
        success: (result) => {
          this.setData({
            suggest: result.data.result.allMatch
          })
        }
      })
    } else {
      this.setData({
        isInput: false,
        hot_isShow: true,
        suggest_isShow: false,
        hotSearchList_isShow: false
      })
    }
  },
  isClear: function (e) {
    this.setData({
      inputValue: "",
      isInput: false,
      hot_isShow: true,
      suggest_isShow: false,
      hotSearchList_isShow: false
    })

  },
  hotSearch: function (e) {
    let inputValue = e.currentTarget.dataset.first
    // 获取歌手和专辑信息
    wx.request({
      url: 'http://iwenwiki.com:3000/search/multimatch?keywords=' + inputValue,
      success: (result) => {
        this.setData({
          hotMatchList: result.data.result,
          hotSearchList_isShow: true,
          hot_isShow: false,
          suggest_isShow: false
        })
      }
    })
    // 获取对应的搜索歌曲信息
    wx.request({
      url: 'http://iwenwiki.com:3000/search?keywords=' + inputValue,
      success: (result) => {
        this.setData({
          hotSearchSongs: result.data.result.songs
        })
      }
    })

    this.setData({
      inputValue: inputValue,
      isInput: true
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取热门搜索
    wx.request({
      url: 'http://iwenwiki.com:3000/search/hot',
      success: (result) => {
        this.setData({
          hots: result.data.result.hots
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