// pages/book-detail/book-detail.js

import {
    BookModel
} from '../../models/book.js'

import {
    LikeModel
} from '../../models/like.js'

import log from "../../util/log";

import shortCommentMockData from '../../mock/short_comment';
import favorMockData from '../../mock/favor';
import detailMockData from '../../mock/detail';


const bookModel = new BookModel()
let likeModel = new LikeModel()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        comments: [],
        detail: null,
        likeStatus: false,
        likeCount: 0,
        posting: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        wx.showLoading()
        const bid = options.bid
        log.info('点击图书的 bid 是 ：' + bid)
        const detailBookModel = bookModel.getDetail(bid)
        const comments = bookModel.getComments(bid)
        const likeStatus = bookModel.getLikeStatus(bid)
        // likeStatus.then(res => {
        //     log.info(res)
        //     this.setData({
        //         likeStatus: res.like_status,
        //         likeCount: res.fav_nums
        //     })
        // })
        //  这里 节省上面的 代码  等待所有结束后 才执行回调    .race 是
        Promise.all([detailBookModel, comments, likeStatus])
            .then(res => {
                wx.hideLoading()
                res[0]=detailMockData;
                res[1]=shortCommentMockData.data;
                res[2]=favorMockData;
                log.info(res)
                this.setData({
                    detail: res[0],
                    comments: res[1].comments,
                    likeStatus: res[2].like_status,
                    likeCount: res[2].fav_nums
                })
            })
    },

    onlike(event) {
        let behavior = event.detail.behavior
        likeModel.like(behavior, this.data.detail.id, 400)
    },

    onFakePost() {
        this.setData({
            posting: true
        })
    },

    onPost(event) {
        const comment = event.detail.text || event.detail.value
        if (comment.length > 12) {
            wx: wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            })
            return
        }

        bookModel.postComment(this.data.detail.id, comment)
            .then(res => {
                wx: wx.showToast({
                    title: '+1',
                    icon: 'none'
                })
                this.data.comments.unshift({
                    content: comment,
                    nums: 1
                })

                this.setData({
                    comments: this.data.comments,
                    posting: false
                })
            })
    },

    onCancel: function(event) {
        this.setData({
            posting: false
        })
    },

    confirm: function(event) {
        this.onPost(event)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
    }
})