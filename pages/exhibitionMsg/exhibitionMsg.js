// pages/exhibitionMsg/exhibitionMsg.js
Page({
  //事件处理函数
  tapGoListMsg: function (event) {
    console.log(event)
    wx.setStorageSync('className', '')
    wx.navigateTo({
      url: '../collectionMsg/collectionMsg?id=' + event.currentTarget.id + '&parentsId=' + this.data.resId + '&index=' + event.currentTarget.dataset.indexs
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    HOST: getApp().globalData.Host,
    dataList: [],
    selsetBool: false,
    selectTrueText: '',
    selectFalseText: '',
    resId: '',
    videoSrc: '',
    isShowTitle: 0,
    picList: [] //图片列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    if (wx.getStorageSync('keyzhanlan') == '常设展览') {
      _this.setData({
        isShowTitle: 0
      });
    } else {
      _this.setData({
        isShowTitle: 1
      });
    }
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    this.data.resId = options.resId;
    var resId = options.resId

    wx.request({
      url: _this.data.HOST + '/webAppExhibition/getExhibitionDetail?lang=0&platform=2',
      data: {
        clientType: 3,
        resId: resId
      },
      success: function (res) {
        if (res.data.masg == '成功') {
          if (res.data.entity.videoList[0]) {
            console.log(res.data.entity.videoList[0].showUrl)
          }
          wx.hideLoading()
          var falseText = res.data.entity.exhibitIntroduce.length > 0 ? res.data.entity.exhibitIntroduce.substr(0, 50).concat('....') : ''
          console.log(options.resId)

          _this.setData({
            // title_name: res.data.entity.showName.length > 20 ? res.data.entity.showName.substr(0, 20).concat('....') : res.data.entity.showName,
            title_name: res.data.entity.showName,
            dataList: res.data.entity,
            selectFalseText: falseText,
            selectTrueText: res.data.entity.exhibitIntroduce,
            videoSrc: res.data.entity.videoList[0] ? res.data.entity.videoList[0].showUrl : ''
          })
          console.log(_this.data.videoSrc)
        }
      }
    })

  },
  tapGoList: function (event) {
    wx.navigateTo({
      url: '../exhibitionCollectionList/exhibitionCollectionList?id=' + this.data.resId + '&parentsId=' + this.data.resId
    })
  },
  selectMore() {
    var _this = this
    if (_this.data.selsetBool) {
      console.log(1)
      _this.setData({
        selsetBool: false
      })
    } else {
      console.log(2)
      _this.setData({
        selsetBool: true
      })
    }

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