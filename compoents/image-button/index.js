// compoents/image-button/index.js
Component({

// 插槽使用必须 设置 true
    options: {
        multipleSlots:true
    },

    /**
     * 组件的属性列表
     */
    properties: {
        openType: {
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        
        onGetUserInfo(event){
            this.triggerEvent('getuserinfo',event.detail,{})
        }

    }
})