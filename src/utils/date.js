export function datePickOptions({ time, when, params }) {
  if (when === 'start') {
    return time.getTime() > new Date(params).getTime() - 24 * 60 * 60 * 1000
  } else if (when === 'end') {
    return time.getTime() < new Date(params).getTime()
  }
}

export function formatDate(date,fmt) {
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o ={
    'M+': date.getMonth()+1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o){
    if(new RegExp(`(${k})`).test(fmt))
    {
      let str = o[k] + '';
      fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str))
    }

  }
  return fmt
}

function padLeftZero(str){
  return ('00' + str).substr(str.length)
}
