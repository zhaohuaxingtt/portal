/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 15:41:21
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
 */
import { getDictByCode } from '@/api/dictionary'
export const supplierTableTitle = [
  { props: 'name', name: '供应商名称', key: 'GYSMC' },
  { props: 'toolType', name: '零件数量', key: 'LJSL' },
  { props: 'materialGroup', name: '反馈状态', key: 'FKZ' },
  { props: 'materialGroup', name: '预警值', key: 'YJZ' }
]
export const emergenciesTableTitle = [
  { props: 'eventName', name: '事件类型', key: 'SHIJIANLEIXING' },
  { props: 'occurrenceTime', name: '发生时间', key: 'FASHENGSHIJIAN' },
  { props: 'occurrenceCity', name: '区域', key: 'QUYU', tooltip: true },
  { props: 'influenceNum', name: '影响供应商数目', key: 'YSGYSSM' },
  { props: 'source', name: '数据来源', key: 'SJLY' },
  { props: 'createType', name: '创建方式', key: 'CJFS' }
]
// 数据字典查询
export const dictByCode = async function (key) {
  let dicResult = []
  let res = await getDictByCode(key)
  if (res.data) {
    res.data.filter((result) => {
      if (result.code === key) {
        dicResult = result.subDictResultVo || []
      }
    })
    return dicResult
  }
}
