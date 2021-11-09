/*
 * @Author: youyuan
 * @Date: 2021-09-09 14:49:02
 * @LastEditTime: 2021-10-21 11:08:01
 * @LastEditors: Please set LastEditors
 * @Description: 处理金额
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\moneyComputation.js
 */
// 计算金额(保留两位小数并且不四舍五入)
function formatDecimal(num, decimal) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
}

// 截断式获取两位小数
export const getMoney = (num) => {
  return formatDecimal(num/1000000, 2)
}

// 计算系数(保留两位小数)
export const getRatio = (initPrice, totalPrice) => {
  return Number(totalPrice / initPrice).toFixed(2)
}

// 将金额按千分位处理
export const getMoneyInfo = (num) => {
  let prefix = '' //前缀
  let suffix = '' //后缀
  let str = num.toString()
  if(str.indexOf('.') > -1) {
    let arr = str.split('.')
    prefix = arr[0]
    suffix = arr[1]
  } else {
    prefix = num.toString()
  }
  const arr = []
  let position = prefix.length
  while (position >= 3) {
    arr.unshift(prefix.slice(position - 3, position));
    position -= 3;
  }
  prefix.length % 3 && arr.unshift(prefix.slice(0, prefix.length % 3))
  return arr.toString() + (suffix ? '.' + suffix : suffix)
}
