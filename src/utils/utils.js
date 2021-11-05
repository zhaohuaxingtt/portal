import dayjs from "./dayjs.js";

// 删除对象空属性
export const deleteString = (e) => {
  if (!e) {
    return e;
  }
  let obj = JSON.parse(JSON.stringify(e));
  if (typeof e === 'object') {
    for (const key in obj) {
      if (obj[key] === '') {
        delete obj[key];
      }
    }
  }
  return obj;
}

// 获取日期
export const datestring = (e) => {
  let yyyy = dayjs(e).year()
  let mm = dayjs(e).month() + 1;
  let dd = dayjs(e).date()
  if (yyyy && mm && dd) {
    if (Number(mm) < 10) {
      mm = '0' + mm.toString();
    }
    if (Number(dd) < 10) {
      dd = '0' + dd.toString();
    }
    return yyyy + '-' + mm + '-' + dd;
  } else {
    yyyy = dayjs(new Date(new Date().valueOf()).year());
    mm = dayjs(new Date(new Date().valueOf()).month()) + 1;
    mm = dayjs(new Date(new Date().valueOf()).date());
    if (Number(mm) < 10) {
      mm = '0' + mm.toString();
    }
    if (Number(dd) < 10) {
      dd = '0' + dd.toString();
    }
    return yyyy + '-' + mm + '-' + dd;
  }
}

/**
 * 
 * 防抖
 */

// export const debounce = (fn, delay, immediate) => {
//   let timer
//   let result
//   return function (...args) {
//     if (timer) clearTimeout(timer)

//     if (immediate) {
//       // 如果timer存在，说明第二次调用的时候还没到delay时间，因为如果超过delay时间
//       // timer会被赋值为null，所以这个时候我们不应该执行fn，应该重新设置一个定时器
//       // 但如果是一次的时候，因为还没有设过定时器，所以这里timer会是undefined
//       if (timer) {
//         timer = setTimeout(() => timer = null, delay)
//       } else {
//         result = fn.apply(this, args)
//         return result
//       }
//     } else {
//       timer = setTimeout(() => fn.apply(this, args), delay)
//     }
//   }
// }

export const debounce = (fn, delay) => {
  // 定时器，用来 setTimeout
  let timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    let context = this
    let args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}