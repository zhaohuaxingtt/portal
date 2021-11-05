/*
 * @Author: moxuan
 * @Date: 2021-04-14 17:50:00
 * @LastEditors: zbin
 * @Description: 财务数据
 */
import { getDictByCode } from "@/api/dictionary";

export const tableTitle = [
  { props: 'year', name: '年份', key: 'SUPPLIER_NIANFEN', width: 100, required: true, rule: [{ required: true, message: '请输入', trigger: 'blur' }] },
  { props: 'dataChannelName', name: '数据渠道', key: 'SUPPLIER_SHUJUQUDAO' },
  { props: 'startAccountCycle', name: '会计周期起', key: 'SUPPLIER_KUAIJIZHOUQIQ', width: 130, required: true, rule: [{ required: true, message: '请输入', trigger: 'blur' }] },
  { props: 'endAccountCycle', name: '会计周期止', key: 'SUPPLIER_KUAIJIZHOUQIZ', width: 130, required: true, rule: [{ required: true, message: '请输入', trigger: 'blur' }] },
  { props: 'isAudit', name: '是否审计', key: 'SUPPLIER_SHIFOUSHENJI', width: 150, required: true, rule: [{ required: true, message: '请输入', trigger: 'blur' }] },
  { props: 'auditUnit', name: '审计单位', key: 'SUPPLIER_SHENJIDANWEI', width: 150, required: true, rule: [{ required: true, message: '请输入', trigger: 'blur' }] },
  { props: 'currency', name: '币种', key: 'BIZHONG', width: 150, required: true, rule: [{ required: true, message: '请输入', trigger: 'blur' }] },
  {
    props: 'currencyUnit', name: '单位', key: 'SUPPLIER_DANWEI', width: 150, required: true,
    rule: [{
      required: true,
      pattern: /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
      message: '请输入正确的格式',
      trigger: 'blur'
    }],
  },
  { props: 'isMergeReport', name: '是否为合并报表', key: 'SUPPLIER_SHIFOUHEBINGBAOBIAO', width: 150, required: true, rule: [{ required: true, message: '请选择', trigger: 'blur' }] },
  { props: 'dataTime', name: '上传时间', key: 'SUPPLIER_SHANGCHUANSHIJIAN' },
  { props: 'operation', name: '操作', key: 'LK_CAOZUO' }
]
export const supplierDataTableTitle = [
  { props: 'file', name: '文件名称', key: 'LK_WENJIANMINGCHENG' },
  { props: 'operation', name: '操作', key: 'SUPPLIER_CAOZUO' }
]

// 数据字典查询
export const dictByCode = async function(key) {
  let dicResult = []
  let res = await getDictByCode(key)
  if (res.data) {
    res.data.filter(result => {
      if (result.code === key) {
        dicResult = result.subDictResultVo || []
      }
    })
    return dicResult
  }
}
// title
export const getComparisonTableTitle = function(tabTitle, data, info) {
  // tabTitle === 'balance' ? '字段' : 
  var dataComparisonTableTitle = [
    { props: 'displayName', name: '字段', key: 'SUPPLIER_ZHIDUAN', width: 400, tooltip: true }
  ]
  data.forEach((item, index) => {
    info && info.forEach((i, x) => {
      if (item.id === i['financeId']) {
        dataComparisonTableTitle.push({ props: 'value' + index, name: item.year, width: 180 })
      }
    })
    if (info === null) {
      dataComparisonTableTitle.push({ props: 'value' + index, name: item.year, width: 180 })
    }
  })
  dataComparisonTableTitle.push({ props: '', name: '' })
  dataComparisonTableTitle[1]['rule'] = [{ pattern: /^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$/, message: '请输入正确的格式', trigger: 'change' }]
  return dataComparisonTableTitle
}