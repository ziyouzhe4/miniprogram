import {
    HTTP
} from '../util/http.js'

import latestMockData from '../mock/latest';
import previousMockData from '../mock/previous';

class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                res=latestMockData
                sCallback(res)
                // 将最新的期刊写入缓存 index
                this._setLatestIndex(res.index)
                let key = this._getKey(res.index)
                wx.setStorageSync(key, res);
            }
        })
    }

    getClassic(index, nextOrPrevious,sCallback) {
        // 缓存中寻找 or api中请求
        let key =  nextOrPrevious=='next'?this._getKey(index+1):this._getKey(index-1)
        let classic = wx.getStorageSync(key)
        if(!classic){// 缓存中没有，api请求
            this.request({
                // url: 'classic/' + index + '/' + nextOrPrevious,
                // 模板字符串
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    if(nextOrPrevious=='next'){
                        res=latestMockData;
                    } else {
                      res=previousMockData;
                    }
                    // 写入缓存
                    wx.setStorageSync(this._getKey(res.index), res);
                    sCallback(res)
                }
            })
        }else{//缓存中有，直接返回
            sCallback(classic)
        }
    }

    isFirst(index) {
        return index == 1 ? true : false
    }

    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index
    }

    _setLatestIndex(index) {// 设置最新的
        wx.setStorageSync('latest', index)
    }

    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }

    _getKey(index){
        let key = 'classic-' + index
        return key
    }

    getMyFavor(success){
        const params = {
            url:'classic/favor',
            success:success
        }
        this.request(params)
    }
}

export {
    ClassicModel
}