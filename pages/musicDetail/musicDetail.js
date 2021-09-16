// pages/musicDetail/musicDetail.js
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newSongDetail: [],
    musicUrl: "",
    height: "",
    isPlaying: false,
    audioDuration: '',
    audioCurrent: '',
    myAudioPos: '',
    play_icon: 'https://i.niupic.com/images/2021/09/13/9yS2.png',
    pause_icon: 'https://i.niupic.com/images/2021/09/13/9yVJ.png',
    navHeight: 0,
    capsuleTop: 0
  },
  audioPlay: function () {
    innerAudioContext.startTime = this.data.audioCurrent;
    innerAudioContext.play()
    this.setData({
      isPlaying: !this.data.isPlaying
    })
    innerAudioContext.onTimeUpdate(() => {
      this.setData({
        myAudioPos: innerAudioContext.currentTime / innerAudioContext.duration * 100,
        audioCurrent: format(innerAudioContext.currentTime)
      });
    })

  },
  audioPause: function () {
    innerAudioContext.pause()
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  slider_change: function (e) {
    const position = e.detail.value;
    var currentTime = position / 100 * innerAudioContext.duration;
    innerAudioContext.seek(currentTime);
    this.setData({
      myAudioPos: position,
      audioCurrent: format(currentTime)
    })

  },
  back: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    // 获取歌曲详情
    wx.request({
      url: 'http://iwenwiki.com:3000/song/detail?ids=' + id,
      success: (result) => {
        this.setData({
          newSongDetail: result.data.songs[0]
        })
      }
    })

    wx.request({
      url: 'http://iwenwiki.com:3000/song/url?id=' + id,
      success: (result) => {
        this.setData({
          musicUrl: result.data.data[0].url
        })
        // 获取歌曲url
        innerAudioContext.src = result.data.data[0].url

      }
    })
    // 循环播放
    innerAudioContext.loop = true
    // 监听音频进入可以播放状态的事件
    innerAudioContext.onCanplay(() => {
      innerAudioContext.duration; //必须写，不然获取不到
      setTimeout(() => {
        this.setData({
          audioDuration: format(innerAudioContext.duration),
          audioCurrent: format(innerAudioContext.currentTime),
          duration: innerAudioContext.duration
        })
      }, 0)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let dwObj = wx.getMenuButtonBoundingClientRect()
    let navHeight_ = (dwObj.top + dwObj.height)
    let capsuleTop_ = dwObj.top
    this.setData(
    {
    navHeight: navHeight_,
    capsuleTop:capsuleTop_
    }
    )
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
    this.audioPause()
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

function format(t) {
  let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60);
  t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2);
  return t;
}