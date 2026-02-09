// compoents/countdown/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 倒计时结束时间戳（毫秒）
    endTimestamp: {
      type: Number,
      value: 0,
      observer: function(newVal) {
        if (newVal) {
          this.startCountDown();
        }
      }
    },
    // 时间偏移量（秒）
    offset: {
      type: Number,
      value: 0
    },
    // 占位符文本，例如："{day} día(s) {hh_mm_ss} left"
    placeholder: {
      type: String,
      value: '{day} {hh_mm_ss}',
      observer: function(newVal) {
        this.parsePlaceholder(newVal);
      }
    },
    // 自定义背景色（圆角标签背景）
    customBackgroundColor: {
      type: String,
      value: '#FFFFFF'
    },
    // 自定义字体大小
    customFontSize: {
      type: Number,
      value: 12
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    // 解析后的文本
    prefixText: '',      // {day}之前的文本
    daySuffixText: '',   // {day}之后、{hh_mm_ss}之前的文本
    finalSuffixText: '', // {hh_mm_ss}之后的文本
    // 是否显示各个部分
    showPrefix: false,
    showDaySuffix: false,
    showFinalSuffix: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 解析占位符文本
     */
    parsePlaceholder(placeholder) {
      if (!placeholder) {
        this.setData({
          prefixText: '',
          daySuffixText: '',
          finalSuffixText: '',
          showPrefix: false,
          showDaySuffix: false,
          showFinalSuffix: false
        });
        return;
      }

      let prefixText = '';
      let daySuffixText = '';
      let finalSuffixText = '';

      // 提取{day}之前的文本
      const dayIndex = placeholder.indexOf('{day}');
      if (dayIndex !== -1) {
        prefixText = placeholder.substring(0, dayIndex).trim();
      }

      // 提取{day}之后、{hh_mm_ss}之前的文本
      const hhMmSsIndex = placeholder.indexOf('{hh_mm_ss}');
      if (dayIndex !== -1 && hhMmSsIndex !== -1) {
        daySuffixText = placeholder.substring(dayIndex + 5, hhMmSsIndex).trim();
      }

      // 提取{hh_mm_ss}之后的文本
      if (hhMmSsIndex !== -1 && hhMmSsIndex + 10 < placeholder.length) {
        finalSuffixText = placeholder.substring(hhMmSsIndex + 10).trim();
      }

      this.setData({
        prefixText: prefixText,
        daySuffixText: daySuffixText,
        finalSuffixText: finalSuffixText,
        showPrefix: prefixText.length > 0,
        showDaySuffix: daySuffixText.length > 0,
        showFinalSuffix: finalSuffixText.length > 0
      });
    },

    /**
     * 开始倒计时
     */
    startCountDown() {
      // 清除之前的定时器
      if (this.timer) {
        clearInterval(this.timer);
      }

      // 立即更新一次
      this.updateCountDown();

      // 启动定时器，每秒更新
      this.timer = setInterval(() => {
        this.updateCountDown();
      }, 1000);
    },

    /**
     * 更新倒计时
     */
    updateCountDown() {
      const endTime = this.data.endTimestamp / 1000 + this.data.offset;
      const currentTime = Date.now() / 1000;
      let remainingTime = endTime - currentTime;

      // 倒计时结束
      if (remainingTime <= 0) {
        remainingTime = 0;
        this.stopCountDown();
        this.triggerEvent('timeup'); // 触发倒计时结束事件
      }

      // 计算天、时、分、秒
      const days = Math.floor(remainingTime / (24 * 3600));
      const hours = Math.floor((remainingTime % (24 * 3600)) / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = Math.floor(remainingTime % 60);

      this.setData({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
    },

    /**
     * 停止倒计时
     */
    stopCountDown() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    /**
     * 格式化两位数字
     */
    formatTwoDigits(num) {
      return num < 10 ? '0' + num : num.toString();
    }
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      // 组件创建时解析占位符
      this.parsePlaceholder(this.data.placeholder);
      if (this.data.endTimestamp) {
        this.startCountDown();
      }
    },
    detached() {
      // 组件销毁时清除定时器
      this.stopCountDown();
    }
  }
})
