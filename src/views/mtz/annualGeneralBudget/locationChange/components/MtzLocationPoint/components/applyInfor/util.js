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
export const deepClone = (data) => {//深拷贝
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

export const isNumber = (data) => {//判断是否为数字
  var isNum = /^\d+(?=\.{0,1}\d+$|$)/;
  if(isNum.test(data)){
      return true
  }else{
      return false;
  }
}

export const timeCoincide = (sData1,eData1,sData2,eData2) => {//判断两个时间是否重合
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

export const timeTransformation = (data) => {//时间格式转10位数（秒级单位）时间戳
  var time = (new Date(data)).getTime()/1000;

  return time;
}

export const Mul = function(a, b) {//js小数点乘法计算
	var str1 = a.toString(),str2 = b.toString(),m=0;
	try{m += str1.split('.')[1].length;}catch(e){}
	try{m += str2.split('.')[1].length;}catch(e){}
	return Number(str1.replace(".", "")) * Number(str2.replace(".", "")) / Math.pow(10, m)
}

export const numAdd  = function(num1, num2) {//小数点加法运算
  var baseNum, baseNum1, baseNum2;
  try {
  baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
  baseNum1 = 0;
  }
  try {
  baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
  baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
};

export const formatDecimal = function(num, decimal) {//保留小数点后几位，超出截掉
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
  } else {
      num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
}