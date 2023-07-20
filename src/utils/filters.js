/*
 * @Author: your name
 * @Date: 2021-10-06 21:17:50
 * @LastEditTime: 2022-01-09 10:49:14
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
    // 金额千分位
    thousandsFilter(num, len = 2) {
      if(isNaN(num)) return num
      if(num==='') return num
      console.log('num=>',num);
      num = String(num).replace(/[^0-9.-]/ig, '');
      num = Number(num).toFixed(len);
      const numArray = String(num).split('.');
      numArray[0] = parseFloat(numArray[0]).toLocaleString();
      const value = numArray.join('.');
      return value || 0;
    },
  }
}
