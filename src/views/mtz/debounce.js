/*
 * @Author: youyuan
 * @Date: 2021-10-18 16:18:10
 * @LastEditTime: 2021-10-18 16:21:24
 * @LastEditors: Please set LastEditors
 * @Description: 函数防抖
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\debounce.js
 */
// 请求防抖 
export const debounce = (func, delay = 200) => {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}

export const getNowFormatDate = function() {//获取时间格式
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var secound = date.getSeconds();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + "-" + month + "-" + strDate + " " + hours + ":" + minutes + ":" + secound;
  return currentdate;
}