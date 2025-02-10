import {
    HTTP
} from '../../util/http.js'

class KeywordModel extends HTTP {

    key = 'keyword'
    maxLength = 10

    getHistory() {
        const keywords = wx.getStorageSync(this.key)
        if(!keywords){
            return []
        }
        return keywords
    }


    getHot(success) {
        this.request({
            url: '/book/hot_keyword',
            success: success
        })


// promise写法
        // return this.request({
        //     url: '/book/hot_keyword'
        // })

    }


    addToHistory(word) {
        let keywords = this.getHistory()
        if (keywords) {
            const has = keywords.includes(word)
            if (!has) {
                const length = keywords.length
                if (length >= this.maxLength){
                    keywords.pop()
                }

                keywords.unshift(word)
                wx.setStorageSync(this.key, keywords)
            }

        } else {
            keywords = [word]
            wx.setStorageSync(this.key, keywords)
        }
    }

}

export {
    KeywordModel
}