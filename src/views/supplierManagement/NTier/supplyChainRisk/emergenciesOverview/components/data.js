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
  { prop: 'eventName', lable: '事件类型', i18n: 'SHIJIANLEIXING' },
  { prop: 'occurrenceTime', lable: '发生时间', i18n: 'FASHENGSHIJIAN' },
  { prop: 'occurrenceCity', lable: '区域', i18n: 'QUYU', tooltip: true },
  { prop: 'influenceNum', lable: '影响供应商数目', i18n: 'YSGYSSM',emit: 'go-detail',
    customRender: (h, scope) => {
      return <span class="cursor" style="color:#1763F7">{scope.row.influenceNum}</span>
    }
  },
  { prop: 'source', lable: '数据来源', i18n: 'SJLY',emit: 'go-weather',
    customRender: (h, scope) => {
      var str;
      if(scope.row.sourceLink){
        str = <a class="cursor" style="color:#1763F7" href={scope.row.sourceLink}>{scope.row.source}</a>
      }else{
        str = <span>{scope.row.source}</span>
      }
      return str
    }
  },
  { prop: 'createType', lable: '创建方式', i18n: 'CJFS' }
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
