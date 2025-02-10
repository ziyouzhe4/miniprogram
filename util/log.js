// utils/log.js

const env = 'development'; // 设置为 'development' 或 'production'

const log = {
  /**
   * 打印信息日志
   * @param {string} message 日志信息
   * @param {any} data 附加数据
   */
  info(message, data = null) {
    if (env === 'development') {
      console.log(`[INFO] ${message}`, data || '');
    }
  },

  /**
   * 打印警告日志
   * @param {string} message 日志信息
   * @param {any} data 附加数据
   */
  warn(message, data = null) {
    if (env === 'development') {
      console.warn(`[WARN] ${message}`, data || '');
    }
  },

  /**
   * 打印错误日志
   * @param {string} message 日志信息
   * @param {any} data 附加数据
   */
  error(message, data = null) {
    if (env === 'development') {
      console.error(`[ERROR] ${message}`, data || '');
    }
  },

  /**
   * 打印调试日志
   * @param {string} message 日志信息
   * @param {any} data 附加数据
   */
  debug(message, data = null) {
    if (env === 'development') {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  },
};

export default log;