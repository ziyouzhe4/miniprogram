import {config,fun} from '../config.js'
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

class HTTP{
  request(params){
    // url,data,method
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      header: {
        'content-type':'application/json',
        'appkey':config.appkey
      },
      method: params.method,
      success: (res)=>{
        let code = res.statusCode.toString()
        log.info(config.api_base_url + params.url)
        
        if (code.startsWith('2')){
            params.success && params.success(res.data)
        }
        else{
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(res)=>{
        // api 调用失败  断网
        this._show_error(1)

      },
      complete: function(res) {},

// es6 之前
      // fail:function(res){}

    })
  }

// 私有方法，处理toast格式化
  _show_error(error_code){

    if(!error_code){
      error_code = 1
    }

    wx.showToast({
      title: tips[error_code],
      icon:'none',
      duration:2000
    })

  }


}

export {HTTP}