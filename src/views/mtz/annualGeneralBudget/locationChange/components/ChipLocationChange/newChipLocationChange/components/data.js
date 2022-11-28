
// 沿用补差规则查询
export const QueryFormData = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZHEBIANHAO' },
  { props: 'method', name: '补差方式', key: '补差方式', type: 'select', selectOption: 'methodList' },
  { props: 'materialGroup', name: '材料组', key: 'LK_CAILIAOZHU' },
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', type: "iMultiLineInput" },
  { props: 'partName', name: '零件名称', key: 'LK_LINGJIANMINGCHENG' },
  { props: 'sapCode', name: '供应商SAP号', key: 'GONGYINGSHANGSAPHAO' },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG' },
  { props: 'deptCode', name: '科室', key: 'KESHI', type: 'select', selectOption: 'deptList' },
  { props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' },
  { props: 'effectFlag', name: '是否生效', key: 'SHIFOUSHENGXIAO', type: 'select', selectOption: 'effectFlagList' },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', type: 'date' },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', type: 'date' },
]
// 沿用补差规则表格
export const tableTitle = [
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    align: 'center',
    width: 150
  }, {
    props: 'method',
    name: '补差方式',
    key: '补差方式',
    align: 'center',
    width: 150
  }, {
    //   props: 'materialGroup',
    //   name: '材料组',
    //   key: '材料组',
    //   align: 'center',
    //   width: 150,
    //   tooltip: true
    // }, {
    props: 'materialName',
    name: '原材料描述',
    key: '原材料描述',
    align: 'center',
    width: 150,
    tooltip: true
  }, {
    props: 'partNum',
    name: '一次零件号',
    key: '一次零件号',
    align: 'center',
    width: 150
  }, {
    props: 'partName',
    name: '一次零件名称',
    key: '一次零件名称',
    align: 'center',
    width: 150,
    tooltip: true
  },
  {
    props: 'sapCode',
    name: '一次件供应商编号',
    key: '一次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    props: 'supplierName',
    name: '一次件供应商名称',
    width: '100px',
    align: 'center',
    key: '一次件供应商名称',
    width: 150,
    tooltip: true
  },
  {
    props: 'buyer',
    name: '采购员',
    width: '100px',
    align: 'center',
    key: 'CAIGOUYUAN',
    width: 100
  },
  {
    props: 'dept',
    name: '科室',
    width: '100px',
    align: 'center',
    key: 'KESHI',
    width: 100
  }, {
    props: 'partNumSec',
    name: '二次零件号',
    key: '二次零件号',
    align: 'center',
    width: 150
  }, {
    props: 'partNameSec',
    name: '二次零件名称',
    key: '二次零件名称',
    align: 'center',
    width: 150,
    tooltip: true
  },
  {
    props: 'sapCodeSec',
    name: '二次件供应商编号',
    key: '二次件供应商编号',
    align: 'center',
    width: 150,
    tooltip: true
  },
  {
    props: 'supplierNameSec',
    name: '二次件供应商名称',
    align: 'center',
    key: '二次件供应商名称',
    width: 150
  },
  {
    props: 'secondPrimaryRatio',
    name: '二次件与一次件比例',
    align: 'center',
    key: '二次件与一次件比例',
    width: 150
  },
  {
    props: 'amount',
    name: '补差金额',
    width: '100px',
    align: 'center',
    key: '补差金额',
    width: 150
  },
  {
    props: 'currency',
    name: '货币',
    align: 'center',
    key: 'HUOBI',
    width: 150
  },
  { props: 'exchangeRate', name: '汇率', align: 'center', key: 'HUILV' },
  {
    props: 'startDate',
    name: '有效期起',
    align: 'center',
    key: 'YOUXIAOQIQI',
    width: 150
  },
  {
    props: 'endDate',
    name: '有效期止',
    align: 'center',
    key: 'YOUXIAOQIZHI',
    width: 150
  },
  {
    props: 'effectFlag',
    name: '是否生效',
    align: 'center',
    key: 'SHIFOUSHENGXIAO',
    width: 150
  },
  {
    props: 'updateDate',
    name: '更新时间',
    align: 'center',
    key: '更新时间',
    width: 150
  },
  {
    props: 'sourceCode',
    name: '补差来源',
    align: 'center',
    key: '补差来源',
    width: 150,
  }
]