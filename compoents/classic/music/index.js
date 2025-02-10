// compoents/classic/music/index.js
import {
    classicBehavior
} from '../classic-beh.js'


const mMgr = wx.getBackgroundAudioManager()


Component({

    behaviors: [classicBehavior],

    /**
     * 组件的属性列表
     */
    properties: {
        src: String

    },

    /**
     * 组件的初始数据
     */
    data: {
        pauseSrc: 'images/player@pause.png',
        playSrc: 'images/player@play.png',
        playing: false
    },

    detached: function() {
        log.info("detached-music-index.js")
    },

    attached: function() {

        this._recoverStatus()

    },

    /**
     * 组件的方法列表
     */
    methods: {


        onPlay: function() {
            // 图片切换
            if (!this.data.playing) {
                mMgr.title = "papertiger"
                mMgr.src = this.properties.src
            } else {
                mMgr.pause()
            }

            this.setData({
                playing: !this.data.playing
            })


        },

         _recoverStatus: function () {
            if (mMgr.paused) {
                this.setData({
                    playing: false
                })

                return
            }

            if (mMgr.src == this.properties.src) {
                this.setData({
                    playing: true
                })
            }

        }

    }


   


})