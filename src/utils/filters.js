/*
 * @Author: your name
 * @Date: 2021-10-06 21:17:50
 * @LastEditTime: 2021-11-01 21:27:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\utils\filters.js
 */
export default {
  filters: {
    // 英文 首字母大写
    capitalizeFilter(val) {
      return typeof val === 'string'
        ? val.slice(0, 1).toUpperCase() + val.slice(1).toLowerCase()
        : val
    },
    dateFilter(val) {
      return typeof val === 'string'
        ? window.moment(val).format('YYYY-MM-DD HH:mm:ss')
        : val
    },
    boolFilter(val) {
      return typeof val === 'boolean' ? (val ? '是' : '否') : val
    },
    format(num) {
      return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
    },
  }

}


