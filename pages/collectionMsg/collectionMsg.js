// pages/collectionMsg/collectionMsg.js
Page({
  //事件处理函数
  tapGoList: function (event) {
    wx.navigateTo({
      url: '../collectionList/collectionList'
    })
  },
  prevZp: function () { //上一个展品
    var vm = this

    if (this.data.oIndex > 0) {
      wx.showLoading({
        title: '数据加载中...',
        mask: true
      })
      var index = parseInt(this.data.oIndex) - 1
      var resId = this.data.dataList[index].resId
      wx.request({
        url: this.data.HOST + 'webAppCollection/collectionDetail?id=' + resId + '&resType=CmsCollection&lang=0&clientType=3&platform=3',
        success: function (res) {
          vm.setData({
            collectionMsg: res.data.entity,
            oIndex: vm.data.oIndex - 1
          })
          wx.hideLoading()
        }
      })
    } else {
      wx.showToast({
        title: '已经是第一页',
        icon: 'success',
        duration: 2000
      })
    }
  },
  nextZp: function () {
    var vm = this
    if (this.data.dataList.length >= this.data.oIndex-0+2) {
      wx.showLoading({
        title: '数据加载中...',
        mask: true
      })
      var index = parseInt(this.data.oIndex) + 1
      var resId = this.data.dataList[index].resId
      wx.request({
        url: this.data.HOST + 'webAppCollection/collectionDetail?id=' + resId + '&resType=CmsCollection&lang=0&clientType=3&platform=3',
        success: function (res) {
          vm.setData({
            collectionMsg: res.data.entity,
            oIndex: vm.data.oIndex - 0 + 1
          })
          wx.hideLoading()
        }
      })
    } else {
      wx.showToast({
        title: '已经是最后一页',
        icon: 'success',
        duration: 2000
      })
    }
  },
  //点击视频按钮打开播放视频
  startVideo: function () {
    this.setData({
      video_iss: true
    })
    this.audioPause();
  },
  // 点击关闭视频
  closeVideo: function () {
    this.setData({
      video_iss: false
    })
    //设置数据改变dom
    this.setData({
      condition: !this.data.condition
    })
  },
  isMp3: function (event) {
    //设置数据改变dom
    // this.setData({
    //   condition: !this.data.condition
    // })
    var mb = ++this.data.startNum;
    if (mb % 2 == 1) {
      //播放mp3
      if (event.currentTarget.id === "0") {
        this.audioPlay();
      }
    }
    else {
      this.audioPause();
    }
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  bindfullscreenchanges: function () {
    console.log('全屏触发')
    return;
  },
  /**
   * 页面的初始数据
   */
  data: {
    startNum: 0,
    HOST: getApp().globalData.Host,
    collectionMsg: [], //藏品最终详情
    condition: true,
    video_iss: false,
    classN: '',
    dataList: [],//为上一篇，下一篇的操作做准备
    oIndex: 0,
    isShow:false,
    mp3: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'https://shenbo.artup.com//userfiles//pf//2017/10/10/20171010094853120.mp3',
    },
    video: {
      src: 'https://shenbo.artup.com/userfiles//pf//2017/09/22/20170922055717910.mp4',
      danmuList: [
        {
          text: '第 1s 出现的弹幕',
          color: '#ff0000',
          time: 1
        },
        {
          text: '第 3s 出现的弹幕',
          color: '#ff00ff',
          time: 3
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(wx.getStorageSync('className'))
    var vm = this;
    //
    if (vm.options.index){
      vm.setData({
        isShow: true        
      })
    }
    wx.request({
      url: vm.data.HOST + '/webAppExhibition/getExhibitionDetail?lang=0&platform=2',
      data: {
        clientType: 3,
        resId: vm.options.parentsId
      },
      success: function (res) {
        if (res.data.masg == '成功') {

          vm.setData({
            dataList: res.data.entity.collList,
            oIndex: vm.options.index
          })

        }
        wx.hideLoading()
      }
    })



    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')

    this.videoContext = wx.createVideoContext('myVideo')

    //获得每个的详细信息

    wx.request({
      url: this.data.HOST + 'webAppCollection/collectionDetail?id=' + vm.options.id + '&resType=CmsCollection&lang=0&clientType=3&platform=3',
      success: function (res) {
        vm.setData({
          collectionMsg: res.data.entity,
          classN: wx.getStorageSync('className')
        })
        //动态设置title
        wx.setNavigationBarTitle({
          title: res.data.entity.showName
        })
        wx.hideLoading()
      }
    })
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