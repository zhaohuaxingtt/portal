/**
 * 对象深拷贝
 */
export const getObjType = (obj) => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
export const deepClone = (data) => {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

export const getNowFormatDate = function () {
  //获取时间格式
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate() - 1
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

export function excelExport(name, data, title, Name = new Date().getTime()) {
  let fileName = '补差明细-' + name
  try {
    // eslint-disable-next-line no-undef
    if (!data && !title)
      return console.warn(Vue.$t('LK_MEIYOUKEYIXIAZHAIDEXINXI'))
    let worksheet = window.XLSX.utils.aoa_to_sheet(translateData(data, title))
    // 创建工作簿
    let newWorkbook = window.XLSX.utils.book_new()
    // 将工作表附加到工作簿
    window.XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'SheetJS')

    // 写入数据
    let s = window.XLSX.write(newWorkbook, { type: 'binary' })
    let tmpDown = new Blob([s2ab(s)], { type: '' })
    const href = document.createElement('a')
    href.setAttribute('href', URL.createObjectURL(tmpDown))
    href.setAttribute('download', fileName + '.xlsx')
    document.body.appendChild(href)
    href.click()
    setTimeout(() => {
      // 延时释放
      URL.revokeObjectURL(tmpDown)
    }, 5000)
  } catch (error) {
    console.log(error)
  }
}

function s2ab(s) {
  //  字符串转字符流
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

function translateData(data, title) {
  let baseName = []
  let baseKey = []
  for (let i in title) {
    baseName.push(title[i].name)
    baseKey.push(title[i].props)
  }
  baseName = [baseName]
  data.forEach((element) => {
    let newArray = []
    baseKey.forEach((err) => {
      newArray.push(element[err])
    })
    baseName.push(newArray)
  })

  return baseName
}
