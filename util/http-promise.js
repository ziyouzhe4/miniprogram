import {
    config,
    fun
} from '../config.js'
import log from "../util/log";

const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey 无效',
    3000: '期刊不存在',
    1000: '输入参数错误',
    1001: '输入的json格式不正确',
    1002: '找不到资源',
    1003: '未知错误',
    1004: '禁止访问',
    1005: '不正确的开发者key',
    1006: '服务器内部错误',
    1000: '输入参数错误',
}

class HTTP {
//  这里 的参数外面加 {} 可以像微信官方那样调用 如下：
// this.request({
//     url: 'book/hot_list'
//     data:{}
// })
    request({url, data = {}, method = 'GET'}) {
        return new Promise((resolve, reject) => {
            this._request(url,resolve,reject, data, method)
        })
    }

    _request(url, resolve, reject, data = {}, method = 'GET') {
        // url,data,method
        wx.request({
            url: config.api_base_url + url,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            method: method,
            success: (res) => {
                const code = res.statusCode.toString()
                log.info(config.api_base_url + url)
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    reject()
                    let error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: (res) => {
                // api 调用失败  断网
                reject()
                this._show_error(1)

            },
            complete: function(res) {},

        })
    }

    // 私有方法，处理toast格式化
    _show_error(error_code) {

        if (!error_code) {
            error_code = 1
        }

        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })

    }


}

export {
    HTTP
}