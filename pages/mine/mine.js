// pages/mine/mine.js

import {
    ClassicModel
} from '../../models/classic.js'

import {
    BookModel
} from '../../models/book.js'

import log from "../../util/log";
import countMockData from '../../mock/count';
import favorMockData from '../../mock/minefavor';

let classicModel = new ClassicModel()
let bookModel = new BookModel()

Page({

    data: {
        authorized: false,
        userInfo: null,
        bookCount: 0,
        classic:null
    },

    onLoad: function(options) {
        wx.getUserInfo({
            success: data => {
              log.info('用户信息1 ： ')
              log.info(data)
              log.info(data.rawData)
                this.setData({
                    userInfo: data.rawData
                })
            }
        })

        this.userAuthorized()
        this.getMyBookCount()
        this.getMyFavor()
    },

    onGetUserInfo(event) {
        const userInfo = event.detail.userInfo
        log.info('用户信息2 ： ')
        log.info(userInfo)
        if (userInfo) {
            this.setData({
                userInfo: userInfo,
                authorized: true
            })
        }
    },
   
    userAuthorized() {
        wx.getSetting({
            success: data => {
              log.info('授权信息 ： ')
              log.info(data)
                if (data.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: data => {
                            this.setData({
                                authorized: true,
                                userInfo: data.userInfo
                            })
                        }
                    })
                }
            }
        })
    },

    onJumpToAbout(event) {
        wx.navigateTo({
            url: '/pages/about/about',
        })
    },

    onStudy(event) {
      log.info("跳转")
    },

    getMyBookCount() {
        bookModel.getMyBookCount()
            .then(res => {
                res=countMockData;
                log.info('book/favor/count：'+res)
                this.setData({
                    bookCount: res.count
                })
            })
    },

    getMyFavor(){
        classicModel.getMyFavor(res=>{
            res=favorMockData.data;
            log.info('classic/favor：' + res)
            this.setData({
                classic:res
            })
        })
    },
})