// compoents/like/index.js

import log from "../../util/log";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean,
            // value:true
        },

        count: {
            type: Number,
            value: 0
        },

        readOnly:{
            type:Boolean
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        yesSrc: 'images/like.png',
        noSrc: 'images/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onlike: function(event) {
          
            if(this.properties.readOnly){
                return
            }
            var like = this.properties.like;
            var count = this.properties.count;
            log.info(like)
            if (like) {
                if (count != 0) {
                    count -= 1;
                }
            } else {
                count += 1;
            }

            this.setData({
                count: count,
                like: !like
            })

            // 自定义事件
            let behavior = this.properties.like ? 'like' : 'cancel'

            // 激活
            this.triggerEvent('like', {
                behavior: behavior
            }, {})

        }
    }
})