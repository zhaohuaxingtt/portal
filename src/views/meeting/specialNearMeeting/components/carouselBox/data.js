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

export const stateObj = {
  '01': '未进行',
  '02': '进行中',
  '03': '已结束',
  '04': '申请撤回'
}
export const themenConclusion = {
  '01': '待定',
  '02': '定点',
  '03': '发LOI',
  '04': '转TER/TOP-TER',
  '05': '下次Pre CSC',
  '06': '转CSC',
  '07': '关闭'
}
