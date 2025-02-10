// compoents/nav/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String
        },
        first: {
            type: Boolean
        },
        latest: {
            type: Boolean
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        leftSrc: 'images/triangle@left.png',
        disLeftSrc: 'images/triangle.dis@left.png',
        rightSrc: 'images/triangle@right.png',
        disRightSrc: 'images/triangle.dis@right.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {

        onLeft: function() {
            // 如果不是最近的一期期刊， 注册左侧按钮 ，左侧按钮可点击
            if (!this.properties.latest) {
                this.triggerEvent('left', {}, {})
            }

        },
        onRight: function() {
            // 如果不是第一期期刊，注册右侧按钮，右侧按钮可点击
            if (!this.properties.first) {
                this.triggerEvent('right', {}, {})
            }

        }

    }
})