// 表头icon 未确定icon信息，所以先隐藏
const renderIcon = (h, column, type) => {
  let content = ``
  switch (type) {
    case 1:
      content = `补差金额备注说明，待确定`
      break
    case 2:
      content = ``
      break
  }
  return h('div', [
    h('span', column.label),
    h(
      'el-tooltip',
      {
        props: {
          effect: 'light',
          content: content,
          placement: 'right'
        }
      },
      [
        h('i', {
          class: 'el-icon-warning-outline',
          style:
            'color: #A0BFFC; font-size: 16px; margin-top: 2px; margin-left: 10px;'
        })
      ]
    )
  ])
}

// 调整日期格式
function getDay(date) {
  return date ? date.split(' ')[0] : date
}

// 芯片补差规则表头
export const tableSetting = [
  { type: 'selection', width: 50 },
  { type: 'index', label: '#', i18n: '#', width: 50 },
  {
    prop: 'ruleNo',
    label: '规则编号',
    i18n: 'GUIZEBIANHAO',
    align: 'center',
    width: 150
  }, {
    prop: 'method',
    label: '补差方式',
    i18n: '补差方式',
    align: 'center',
    width: 150,
    customRender: (h, scope) => {
      return <span>{scope.row.method == '1' ? '一次性补差' : '变价单补差'}</span>
    }
  }, {
    //   prop: 'materialGroup',
    //   label: '材料组',
    //   i18n: '材料组',
    //   align: 'center',
    //   width: 150
    // }, {
    prop: 'materialName',
    label: '原材料描述',
    i18n: '原材料描述',
    align: 'center',
    width: 150,
    tooltip: true
  }, {
    prop: 'partNum',
    label: '一次零件号',
    i18n: '一次零件号',
    align: 'center',
    width: 150
  }, {
    prop: 'partName',
    label: '一次零件名称',
    i18n: '一次零件名称',
    align: 'center',
    width: 150,
    tooltip: true
  },
  {
    prop: 'sapCode',
    label: '一次件供应商编号',
    i18n: '一次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    prop: 'supplierName',
    label: '一次件供应商名称',
    width: '100px',
    align: 'center',
    i18n: '一次件供应商名称',
    width: 150,
    tooltip: true
  },
  {
    prop: 'buyerName',
    label: '采购员',
    width: '100px',
    align: 'center',
    i18n: 'CAIGOUYUAN',
    width: 100
  },
  {
    prop: 'deptCode',
    label: '科室',
    width: '100px',
    align: 'center',
    i18n: 'KESHI',
    width: 100
  }, {
    prop: 'partNumSec',
    label: '二次零件号',
    i18n: '二次零件号',
    align: 'center',
    width: 150
  }, {
    prop: 'partNameSec',
    label: '二次零件名称',
    i18n: '二次零件名称',
    align: 'center',
    width: 150,
    tooltip: true
  },
  {
    prop: 'sapCodeSec',
    label: '二次件供应商编号',
    i18n: '二次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    prop: 'supplierNameSec',
    label: '二次件供应商名称',
    width: '100px',
    align: 'center',
    i18n: '二次件供应商名称',
    width: 150,
    tooltip: true
  },
  {
    prop: 'secondPrimaryRatio',
    label: '二次件与一次件比例',
    width: '100px',
    align: 'center',
    i18n: '二次件与一次件比例',
    width: 150
  },
  {
    prop: 'amount',
    label: '补差金额',
    width: '100px',
    align: 'center',
    i18n: '补差金额',
    width: 150,
    // headerRender: (h, { column }) => renderIcon(h, column, 1)
  },
  {
    prop: 'currency',
    label: '货币',
    align: 'center',
    i18n: 'HUOBI',
    width: 150
  },
  { prop: 'exchangeRate', label: '汇率', align: 'center', i18n: 'HUILV' },
  {
    prop: 'startDate',
    label: '有效期起',
    align: 'center',
    i18n: 'YOUXIAOQIQI',
    width: 150,
    customRender: (h, scope) => {
      return <span>{getDay(scope.row.startDate)}</span>
    }
  },
  {
    prop: 'endDate',
    label: '有效期止',
    align: 'center',
    i18n: 'YOUXIAOQIZHI',
    width: 150,
    customRender: (h, scope) => {
      return <span>{getDay(scope.row.endDate)}</span>
    }
  },
  {
    prop: 'effectFlag',
    label: '是否生效',
    align: 'center',
    i18n: 'SHIFOUSHENGXIAO',
    width: 150,
    customRender: (h, scope) => {
      return <span>{scope.row.effectFlag ? '是' : '否'}</span>
    }
  },
  {
    prop: 'updateDate',
    label: '更新时间',
    align: 'center',
    i18n: '更新时间',
    width: 150,
    customRender: (h, scope) => {
      return <span>{getDay(scope.row.updateDate)}</span>
    }
  },
  {
    prop: 'sourceCode',
    label: '补差来源',
    align: 'center',
    i18n: '补差来源',
    width: 150,
    emit: 'go-detail',
    customRender: (h, scope) => {
      if (scope.row.sourceCode == "初始化") {
        return <span>{scope.row?.sourceCode}</span>
      } else {
        return <span class="link-text">{scope.row?.sourceCode}</span>
      }
    }
  },
]

// 查询条件
export const ruleQueryFormData = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZHEBIANHAO' },
  { props: 'method', name: '补差方式', key: '补差方式', type: 'select', selectOption: 'methodList' },
  { props: 'materialGroup', name: '材料组', key: 'LK_CAILIAOZHU' },
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', type: "iMultiLineInput" },
  { props: 'partName', name: '零件名称', key: 'LK_LINGJIANMINGCHENG' },
  { props: 'sapCode', name: '供应商SAP号', key: 'GONGYINGSHANGSAPHAO' },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG' },
  { props: 'deptCode', name: '科室', key: 'KESHI', type: 'select', selectOption: 'deptList', multiple: true },
  { props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' },
  { props: 'effectFlag', name: '是否生效', key: 'SHIFOUSHENGXIAO', type: 'select', selectOption: 'effectFlagList' },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', type: 'date' },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', type: 'date' }
]
