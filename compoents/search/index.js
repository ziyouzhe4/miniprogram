// compoents/search/index.js
import {
    KeywordModel
} from 'keyword.js'

import {
    BookModel
} from '../../models/book.js'

const keyModel = new KeywordModel()
const bookModel = new BookModel()


Component({
    /**
     * 组件的属性列表
     */
    properties: {

        more: {
            type: String,
            observer: '_load_more'
            // observer: function (newVal, oldVal, changedPath) {
            //    log.info("00000000")
            // }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        dataArray: [],
        searching: false,
        q: '',
        loading: false,
        totalCount: 1,

        loadingCenter: false
    },

    attached: function() {

        this.setData({
            historyWords: keyModel.getHistory()
        })

        keyModel.getHot((data) => {
            this.setData({
                hotWords: data.hot
            })
        })

        // promise 写法
        // const hotwords = keyModel.getHot()
        // hotwords.then(res => {
        //     this.setData({
        //         hotKeys: data.hot
        //     })
        // })
    },

    /**
     * 组件的方法列表
     */
    methods: {

        onCancel(event) {
            this.triggerEvent('cancel', {}, {})
        },

        onDelete(event) {
            this.setData({
                searching: false,
                dataArray:[],
                totalCount:0
            })
        },

        onConfirm(event) {

            this._showLoadingCenter()
            const q = event.detail.value || event.detail.text

            log.info("输入的内容是： " + event.detail.text)
            this.setData({
                searching: true,
            })

            bookModel.search(0, q)
                .then(res => {
                    log.info(res)

                    this.setData({
                        dataArray: res.books,
                        q: q,
                        totalCount: res.total
                    })

                    this._hideLoadingCenter()
                })

            keyModel.addToHistory(q)
        },

        _load_more() {
            const length = this.data.dataArray.length
            if (!length) {
                return
            }
            if (!this.data.q) {
                return
            }
            if (this.data.loading) {
                return
            }

            if (length >= this.data.totalCount) {
                wx.showToast({
                    title: '没有更多数据~',
                })
                return
            }

            this.setData({
                loading:true
            })
            
            log.info('~加载更多数据~')
            bookModel.search(length, this.data.q).then(res => {
                const tempArray = this.data.dataArray.concat(res.books)
                this.setData({
                    dataArray: tempArray,
                    loading: false

                })
            }, () => {
                this.setData({
                    loading: false
                })
            })

        },

        _showLoadingCenter() {
            this.setData({
                loadingCenter: true
            })
        },

        _hideLoadingCenter() {
            this.setData({
                loadingCenter: false
            })
        }
        
    }
})