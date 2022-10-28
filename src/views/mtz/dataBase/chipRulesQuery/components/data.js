/*
 * @Author: your name
 * @Date: 2021-09-13 16:56:57
 * @LastEditTime: 2021-12-03 15:17:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\dataBase\rulesQuery\components\data.js
 */
const renderIcon = (h, column, type) => {
  let content = ``
  switch (type) {
    case 1:
      content = `M01006002-Pt`
      break
    case 2:
      content = `M01006001-Pd`
      break
    case 3:
      content = `M01006003-Rh`
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

// 员工列表Table配置
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
    prop: 'materialGroup',
    label: '材料组',
    i18n: '材料组',
    align: 'center',
    width: 150
  }, {
    prop: 'materialName',
    label: '原材料描述',
    i18n: '原材料描述',
    align: 'center',
    width: 150
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
    width: 150
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
    width: 150
  },
  {
    prop: 'buyerName',
    label: '采购员',
    width: '100px',
    align: 'center',
    i18n: '采购员',
    width: 100
  },
  {
    prop: 'deptCode',
    label: '科室',
    width: '100px',
    align: 'center',
    i18n: '科室',
    width: 100
  }, {
    prop: 'partNameSec',
    label: '二次零件号',
    i18n: '二次零件号',
    align: 'center',
    width: 150
  }, {
    prop: 'partNumSec',
    label: '二次零件名称',
    i18n: '二次零件名称',
    align: 'center',
    width: 150
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
    width: 150
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
    width: 150
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
    width: 150
  },
  {
    prop: 'endDate',
    label: '有效期止',
    align: 'center',
    i18n: 'YOUXIAOQIZHI',
    width: 150
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
    width: 150
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

export const ruleQueryFormData = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZHEBIANHAO' },
  { props: 'method', name: '补差方式', key: '补差方式', type: 'select', selectOption: 'methodList' },
  { props: 'materialGroup', name: '材料组', key: 'LK_CAILIAOZHU' },
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', type: "iMultiLineInput" },
  { props: 'partName', name: '零件名称', key: 'LK_LINGJIANMINGCHENG' },
  { props: 'sapCode', name: '供应商SAP号', key: 'GONGYINGSHANGSAPHAO' },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG' },
  { props: 'deptCode', name: '科室', key: '科室', type: 'select', selectOption: 'deptList' },
  { props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' },
  { props: 'effectFlag', name: '是否生效', key: 'SHIFOUSHENGXIAO', type: 'select', selectOption: 'effectFlagList' },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', type: 'date' },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', type: 'date' }
]
