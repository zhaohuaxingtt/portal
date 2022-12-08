/*
 * @Author: youyuan
 * @Date: 2021-10-28 16:31:29
 * @LastEditTime: 2022-03-03 16:25:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\data.js
 */
// 导航
export const tabRouterList = [
  {
    value: 1,
    name: '芯片补差',
    url: '',
    activePath: '',
    key: '芯片补差'
  },
  {
    value: 2,
    name: '附件上传',
    url: '',
    activePath: '',
    key: 'FUJIANSHANGCHUAN'
  }
]

// MTZ-规则清单
export const ruleTableTitle1_1 = [
  //决策资料规则清单暂用
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    overlap: true,
    overlapbottom: 'Rule No.'
  },
  {
    // props: 'materialGroup',
    props: 'method',
    name: '补差方式',
    key: '补差方式',
    overlap: true,
    overlapbottom: 'Formal Flag'
  },
  {
    props: 'sapCode',
    name: '供应商编号',
    key: 'GONGYINGSHANGBIANHAO',
    overlap: true,
    overlapbottom: 'Supplier Sap Code',
    minWidth: 120
  },
  {
    props: 'supplierName',
    name: '供应商名称',
    key: '供应商名称',
    overlap: true,
    overlapbottom: 'Supplier Name',
    tooltip: true,
    minWidth: 80
  },
  {
    props: 'materialName',
    name: '原材料描述',
    key: '原材料描述',
    overlap: true,
    overlapbottom: 'Material Division',
    minWidth: 105
  },
  {
    props: 'partNum',
    name: '零件号',
    key: 'LINGJIANHAO',
    overlap: true,
    overlapbottom: 'Part Num',
    minWidth: 70
  },
  {
    props: 'partName',
    name: '零件名称',
    key: 'LINGJIANMINGCHENG',
    overlap: true,
    overlapbottom: 'Part Name',
    width: 120
  },
  {
    props: 'amount',
    name: '补差金额',
    key: '补差金额',
    overlap: true,
    overlapbottom: 'Amount',
    width: 80
  },
  {
    props: 'currency',
    name: '货币',
    key: 'HUOBI',
    overlap: true,
    overlapbottom: 'Currency',
    width: 60
  },
  {
    props: 'exchangeRate',
    name: '汇率',
    key: 'MTZHUILV',
    overlap: true,
    overlapbottom: 'Exchange Rate',
    width: 110
  },
  {
    props: 'startDate',
    name: '有效期起',
    key: 'YOUXIAOQIQI',
    overlap: true,
    overlapbottom: 'Valid From',
    width: 110
  },
  {
    props: 'endDate',
    name: '有效期止',
    key: 'YOUXIAOQIZHI',
    overlap: true,
    overlapbottom: 'Valid To',
    width: 110
  }
]

// 附件上传
export const uploadTableTitle = [
  { props: 'attachmentName', name: '文件名', key: 'WENJIANMING', width: 600 },
  { props: 'createDate', name: '上传日期', key: 'SHANGCHUANRIQI' },
  { props: 'createUserName', name: '上传人', key: 'SHANGCHUANREN' }
]

export const dateFilter = (val, format = "YYYY-MM-DD HH:mm:ss", sourceFormat) => {
  return typeof val === 'string' || typeof val === 'number' ? (val ? window.moment(val, sourceFormat).format(format) : '') : val
}