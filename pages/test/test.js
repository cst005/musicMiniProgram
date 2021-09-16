// pages/test/test.js
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicUrl: "",
    audioDuration: '',
    audioCurrent: '',
    myAudioPos: '',
    isPlaying: false,
    play_icon: 'https://i.niupic.com/images/2021/09/13/9yS2.png',
    pause_icon: 'https://i.niupic.com/images/2021/09/13/9yVJ.png',
    lyrics: ''
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取歌词

    wx.request({
      url: 'http://iwenwiki.com:3000/lyric?id=1859245776',
      success: (result) => {
        console.log(result.data.lrc.lyric)
        this.setData({
          lyrics: result.data.lrc.lyric
        })
      }
    })
    // 获取歌曲url
    wx.request({
      url: 'http://iwenwiki.com:3000/song/url?id=1859245776',
      success: (result) => {
        console.log(result.data.data[0].url)
        this.setData({
          musicUrl: result.data.data[0].url
        })
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
      }, 1)
    })
  }
})

function format(t) {
  let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60);
  t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2);
  return t;
}