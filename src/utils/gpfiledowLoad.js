/*
 * @Author: HS
 * @FilePath: \front-portal\src\utils\gpfiledowLoad.js
 */

import fileSaver from 'file-saver'
import XLSX from 'xlsx'
// 导出二进制的excel
export function exportExcel (data, fileName = Date.now(), type = '.xlsx') {
  try {
    fileSaver.saveAs(new Blob([data], { type: 'application/octet-stream' }), fileName + type)
  } catch (e) { if (typeof console !== 'undefined') console.log(e, data) }
  return data
}
export function excelExport (data, title, fileName = new Date().getTime()) {
  try {
    // eslint-disable-next-line no-undef
    if (!data && !title) return console.warn(Vue.$t('LK_MEIYOUKEYIXIAZHAIDEXINXI'))
    let worksheet = XLSX.utils.aoa_to_sheet(translateData(data, title))
    // 创建工作簿
    let newWorkbook = XLSX.utils.book_new()
    // 将工作表附加到工作簿
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'SheetJS')
    // 写入数据
    let s = XLSX.write(newWorkbook, { type: 'binary' })
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

function s2ab (s) {
  //  字符串转字符流
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}


function translateData (data, title) {
  let baseName = []
  let baseKey = []
  for (let i in title) {
    baseName.push(title[i].name)
    baseKey.push(title[i].props)
  }
  baseName = [baseName]
  data.forEach(element => {
    let newArray = []
    baseKey.forEach(err => {
      newArray.push(element[err])
    })
    baseName.push(newArray)
  });

  return baseName
}