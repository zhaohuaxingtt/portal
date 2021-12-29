import dayjs from '@/utils/dayjs.js'
let weekNum = dayjs(dayjs().year()).isoWeeksInYear()
let weekListInit = []
for (let index = 0; index < weekNum; index++) {
  if (index < 9) {
    weekListInit.push({
      label: 'CW0' + (index + 1) + '/' + weekNum,
      value: index
    })
  } else {
    weekListInit.push({
      label: 'CW' + (index + 1) + '/' + weekNum,
      value: index
    })
  }
}
export { weekListInit }

// export const stateObj = {
//   '01': '未进行',
//   '02': '进行中',
//   '03': '已结束',
//   '04': '申请撤回'
// }
export const stateObj = {
  '01': 'MT_WEIJINXING',
  '02': 'MT_JINXINGZHONG',
  '03': 'MT_YIJIESHU',
  '04': 'MT_SHENQINGCHEHUI'
}
// export const themenConclusion = {
//   '01': '待定',
//   '02': '定点',
//   '03': '发LOI',
//   '04': '转TER/TOP-TER',
//   '05': '下次Pre CSC',
//   '06': '转CSC',
//   '07': '关闭'
// }
export const themenConclusion = {
  '01': 'MT_DAIDING',
  '02': 'MT_DINGDIAN',
  '03': 'MT_FALOI',
  '04': 'MT_ZHUANTER',
  '05': 'MT_XIACIPRE',
  '06': 'MT_ZHUANCSC',
  '07': 'MT_GUANBI'
}