// pages/classic/classic.js
import {
    ClassicModel
} from '../../models/classic.js'

import {
    LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 这里不定义 classicData 也可以， 在数据返回时候 setData中直接写  就会先创建 在赋值
        classicData: null,
        latest: true,// 是否是最新的
        first: false,
        likeCount: 0,
        likeStatus: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 发起请求, 获取最近一期
        classicModel.getLatest((res) => {
            // 只能在setData中做数据更新
            this.setData({
                // 这里的classicData 可以在上面不先定义，这里直接赋值就可以
                classicData: res,
                likeStatus: res.like_status,
                likeCount: res.fav_nums
            })
        })

    },

    onlike: function(event) {
        let behavior = event.detail.behavior
        likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
    },

    _updateClassic: function(nextOrPrevious) {
        let index = this.data.classicData.index
        classicModel.getClassic(index, nextOrPrevious, (res) => {
            this._getLikeStatus(res.id,res.type)
            this.setData({
                // 这里的classicData 可以在上面不先定义，这里直接赋值就可以
                classicData: res,
                latest: classicModel.isLatest(res.index),
                first: classicModel.isFirst(res.index)

            })
        })
    },

    onPrevious: function(event) {
        //获取当前上一期的周刊，寻找更早一些的文章
        log.info('xxxxx 找上一期周刊');
        this._updateClassic('previous')
    },

    onNext: function(event) {
      //获取当前下一期的周刊，寻找时间更近的文章
      log.info('xxxxx 找下一期周刊');
      this._updateClassic('next')
    },
    _getLikeStatus: function(artId, category) {
        likeModel.getClassicLikeStatus(artId, category, (res) => {
            this.setData({
                likeCount:res.fav_nums,
                likeStatus:res.like_status
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})