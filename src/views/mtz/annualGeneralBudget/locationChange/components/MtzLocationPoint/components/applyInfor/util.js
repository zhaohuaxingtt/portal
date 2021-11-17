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

export const isNumber = (data) => {
  var isNum = /^\d+(?=\.{0,1}\d+$|$)/;
  if(isNum.test(data)){
      return true
  }else{
      return false;
  }
}

export const timeCoincide = (sData1,eData1,sData2,eData2) => {
  var start1 = (new Date(sData1)).getTime()/1000;
  var end1 = (new Date(eData1)).getTime()/1000;
  var start2 = (new Date(sData2)).getTime()/1000;
  var end2 = (new Date(eData2)).getTime()/1000;

  if(end2 < start1){
    return false;
  }
  if(end1 < start2){
    return false;
  }
  return true;
}