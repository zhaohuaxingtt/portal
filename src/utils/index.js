/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2022-12-01 18:12:07
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 公共utils部分
 * @FilePath: \front-portal\src\utils\index.js
 */

import store from '../store'
import localStoreage from './localstorage'
import JSEncrypt from './jsencrypt.min.js'
const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDtHWBZlZFuWCQmAqWGH5NaYimrmWHI8/BgHcorxAlq+5bCJyVe8VD9Zm4CRksP/yYPAqWB03B0wm1F1ePObs3ddhpk/MJ8GzbXJY0inj2J0n90QEzhebb/GpHt777EmfY/PuA4fGw8WtW6LHwkr+tnluKlR9f5ZgKByf3mBEge0wIDAQAB'

/**
 * Rsa加密
 * @param {String} str
 * @returns String
 */
export function encryptRsa(str) {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(str)
}

/**
 * 密码加密
 * @param {String} str 原始密码
 * @returns 加密后的密码
 */
export function encryptPwd(str) {
  return encryptRsa(str)
}

export function setToken(tokenData) {
  // eslint-disable-next-line no-undef
  return Cookies.set(process.env.VUE_APP_TOKEN_NAME, tokenData)
}

export function setCookie(cookieName, cookieData) {
  // eslint-disable-next-line no-undef
  return Cookies.set(
    cookieName,
    cookieData /* , {
    domain: process.env.VUE_APP_ROOT_DOMAIN
  } */
  )
}
export function removeCookie(cookieName) {
  // eslint-disable-next-line no-undef
  Cookies.remove(cookieName /* , { domain: process.env.VUE_APP_ROOT_DOMAIN } */)
}
export function getCookie(cookieName) {
  // eslint-disable-next-line no-undef
  return Cookies.get(
    cookieName /* , { domain: process.env.VUE_APP_ROOT_DOMAIN } */
  )
}
//获取token
export function getToken() {
  return getCookie(process.env.VUE_APP_TOKEN_NAME)
}
// //settoken
// export function setToken(tokenData) {
//   return setCookie(process.env.VUE_APP_TOKEN_NAME, tokenData)
// }
//removeoken
export function removeToken() {
  const keys = document.cookie.match(/[^ =;]+(?==)/g)
  if (keys) {
    for (let i = keys.length; i--;) {
      document.cookie =
        keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.ratingdog.cn
      document.cookie =
        keys[i] +
        '=0;path=/;domain=' +
        document.domain +
        ';expires=' +
        new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
      document.cookie =
        keys[i] +
        '=0;path=/;domain=csvw.com;expires=' +
        new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
    }
  }
  return 'ok'
  // return removeCookie(process.env.VUE_APP_TOKEN_NAME)
}
//获取token
export function getRefreshToken() {
  return getCookie(process.env.VUE_APP_REFRESH_TOKEN_NAME)
}
//settoken
export function setRefreshToken(tokenData) {
  return setCookie(process.env.VUE_APP_REFRESH_TOKEN_NAME, tokenData)
}
//removeoken
export function removeRefreshToken() {
  return localStoreage.remove(process.env.VUE_APP_REFRESH_TOKEN_NAME)
}
//errorCodeMessage
export function errorCodeMessage(code) {
  const codeMessage = {
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
  }
  return codeMessage[code]
}
export const math = window.math.create(window.math.all, {
  number: 'BigNumber',
  precision: 64
})

export function _getMathNumber(lamda) {
  return Number(math.format(math.evaluate(lamda), 14))
}

export function closeCliantClearStoreage() {
  let beginTime = null
  window.onbeforeunload = function (params) {
    beginTime = new Date().getTime()
  }
  window.onunload = function () {
    let endTime = new Date().getTime()
    if (endTime - beginTime <= 5) {
      removeToken()
      removeRefreshToken()
    }
  }
}

//表头数据权限过滤
export function permissionTitle(key, titleList) {
  const permissionMap = store.state.permission.whiteBtnList[key]
  let newTitleList = JSON.parse(JSON.stringify(titleList))
  if (permissionMap) {
    const a = []
    titleList.forEach((element) => {
      if (
        permissionMap.fieldList.find(
          (items) => items.fieldName == element.props || element.list
        )
      )
        a.push(element)
      if (element.list) {
        element.list = permissionTitle(key, element.list)
      }
    })
    newTitleList = a
  }
  return newTitleList
}

//序列化url参数传递
export function serialize(data) {
  let str = ''
  for (let key in data) {
    str += key + '=' + encodeURIComponent(data[key]) + '&'
  }
  str = str.replace(/&$/, '')
  return str
}

export function px2rem(value) {
  if (value) {
    return value / 16 + 'rem'
  }
  return '0rem'
}
//判断是否需要判断权限
export function isNeedJudgePermission(
  list = ['supplier/register', 'supplier/bkraRegister']
) {
  if (list.some((item) => window.location.href.indexOf(item) > -1)) {
    return true
  }
}
// 数字限制输入
export const numberProcessor = function (val, precision = 4) {
  let result = ''
  if (+precision > 0) {
    result = (val + '')
      .replace(/[^\d.]/g, '')
      .replace(/^\.*/g, '')
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
      .replace(/^0+([0-9].*)/, '$1')
      .replace(new RegExp(`^(.+\\.\\d{0,${precision || 2}})\\d*$`), '$1')
  } else {
    result = (val + '').replace(/\D/g, '').replace(/^0+([0-9])/, '$1')
  }
  return result
}

export const openUrl = function (url, target) {
  if (url.indexOf('http') === -1) {
    const baseUrl = window.location.href.split('#')[0]
    url = baseUrl + '#' + url
  }
  target = target || '_blank'
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('style', 'display:none')
  a.setAttribute('target', target)
  document.body.appendChild(a)
  a.click()
  a.parentNode.removeChild(a)
}

// 树转数组
export function treeToArray(tree, childrenKey, res) {
  res = res || []
  for (let i = 0; i < tree.length; i++) {
    const item = {}
    for (const key in tree[i]) {
      if (Object.hasOwnProperty.call(tree[i], key)) {
        const element = tree[i][key]
        if (childrenKey !== key) {
          item[key] = element
        }
      }
    }
    res.push(item)
    if (tree[i][childrenKey]) {
      treeToArray(tree[i][childrenKey], childrenKey, res)
    }
  }
  return res
}

// 数组转tree

export function arrayToTree(list, idKey, parentKey, childrenKey) {
  let obj = {}
  for (let i = 0; i < list.length; i++) {
    obj[list[i][idKey]] = list[i]
  }
  const result = []
  list.forEach((node) => {
    if (!obj[node[parentKey]]) {
      result.push(node)
      return
    }
    obj[node[parentKey]][childrenKey] = obj[node[parentKey]][childrenKey] || []
    obj[node[parentKey]][childrenKey].push(node)
  })
  return result
}

export function arrayToMap(array, valueKey, labelKey) {
  if (!array || array.length === 0) {
    return {}
  }
  const res = {}
  array.forEach((e) => {
    res[e[valueKey]] = e[labelKey]
  })
  return res
}

// 过滤对象中null 或 空字符串
export function filterEmptyValue(data) {
  data = data || {}
  const newData = {}
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key]
      if (element !== null && element !== '') {
        newData[key] = element
      }
    }
  }
  return newData
}
//小数点精确
export function toFixedNumber(number, m) {
  number = Number(number)
  let result = Math.round(Math.pow(10, m) * number) / Math.pow(10, m)
  result = String(result)
  if (result.indexOf('.') === -1) {
    result += '.'
    result += new Array(m + 1).join('0')
  } else {
    let arr = result.split('.')
    if (arr[1].length < m) {
      arr[1] = arr[1] += new Array(m - arr[1].length + 1).join('0')
    }
    result = arr.join('.')
  }
  return result
}
//通过url下载文件
export function downloadFileByUrl(href, fileName = '') {
  const aElement = document.createElement('a')
  document.body.appendChild(aElement)
  aElement.style.display = 'none'
  aElement.href = href
  aElement.download = fileName
  aElement.click()
  document.body.removeChild(aElement)
}

/**
 * 数组转树  递归求解
 */
export function toTree(list, parId) {
  let len = list.length
  function loop(parId) {
    let res = []
    for (let i = 0; i < len; i++) {
      let item = list[i]
      if (item.parentId === parId) {
        item.children = loop(item.id)
        res.push(item)
      }
    }
    return res
  }
  return loop(parId)
}

// 数字转千分位
export function toThousands(s, n = 2) {
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  var l = s.split('.')[0].split('').reverse(),
    r = s.split('.')[1]
  var t = ''
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '')
  }
  var t1 = ''
  for (var i = 0; i < r.length; i++) {
    t1 += r[i] + ((i + 1) % 3 == 0 && i + 1 != r.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + t1
}

// 千分位转数字
export function delcommafy(num) {
  if (num && num.indexOf(',') > -1) {
    num = num.replace(/,/gi, '')
  }
  return num
}

export function unique(arr, id) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = arr.length - 1; j > 0; j--) {
      if (arr[i][id] == arr[j][id] && i != j) {
        arr.splice(j, 1)
      }
    }
  }
  return arr
}

/* 左边自动补零 质朴长存法  by lifesinger */
export function pad(num, n) {
  var len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

// window.opener.location.reload
export function reloadOpener() {
  try {
    if (window.opener) {
      window.opener.location.reload()
    }
  } catch (error) {
    console.log('error', error)
  }
}

// 电话号码脱敏
export function desensitizationPhone(phone, dataUserId) {
  if(!phone) return phone
  let userId = store.state.permission.userInfo.id
  if (userId == dataUserId) return email
  if (['string', 'number'].includes(typeof phone)) {
    let result = phone.toString()
    let length = result.length
    let startIndex = parseInt((length - 4) / 2)
    let endIndex = startIndex + 4
    return result.slice(0, startIndex) + '****' + result.slice(endIndex, length)
  } else {
    return phone
  }
}
// 邮箱脱敏 并没有在此校验邮箱格式，默认email格式正确进行处理
export function desensitizationEmail(email, dataUserId) {
  if(!email) return email
  let userId = store.state.permission.userInfo.id
  if (userId == dataUserId) return email
  if (typeof email == 'string') {
    let index = email.indexOf('@')
    if (index < 1) {
      return email
    } else {
      return email.slice(0, 1) + '****' + email.slice(index, email.length)
    }
  } else {
    return email
  }
}