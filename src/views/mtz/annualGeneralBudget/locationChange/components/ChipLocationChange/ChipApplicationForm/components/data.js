/*
 * @Author: your name
 * @Date: 2021-10-27 21:42:09
 * @LastEditTime: 2022-03-03 14:53:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\components\data.js
 */
export const TABLE_COLUMNS = [
  {
    type: 'selection',
    width: '60px'
  },
  {
    type: 'index',
    width: '60px',
    label: '#'
  },
  {
    prop: 'assemblyPartnum',
    label: '零件号',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'supplierCodeName',
    label: '供应商编号-名称',
    minWidth: 160,
    tooltip: true
  },
  {
    prop: 'materialCode',
    label: '原材料牌号',
    minWidth: 180
  },
  {
    prop: 'material',
    label: '原材料名称',
    minWidth: 120,
    tooltip: true
  },
  {
    prop: 'price',
    label: '基价',
    minWidth: 120
  },
  {
    prop: 'priceUnit',
    label: '每',
    minWidth: 120
  },
  {
    prop: 'oldDosage',
    label: '原用量',
    minWidth: 120
  },
  {
    prop: 'newDosage',
    label: '新用量',
    minWidth: 120,
    customRender: (h, scope) => {
      if (scope.row.editRow) {
        return h('div', [
          h('i-input', {
            on: {
              input: (value) => {
                scope.row.newDosage = value
              }
            },
            props: {
              value: scope.row.newDosage
            }
          })
        ])
      } else {
        return <span>{scope.row.newDosage}</span>
      }
    }
  },
  {
    prop: 'dosageMeasureUnit',
    label: '用量计量单位',
    minWidth: 160
  },
  {
    prop: 'startDate',
    label: '有效期起',
    minWidth: 120
    // customRender: (h, scope) => {
    //   if (scope.row.editRow) {
    //     return h('div', [
    //       h('el-date-picker', {
    //         on: {
    //           input: value => {
    //             scope.row.startDate = value
    //           }
    //         },
    //         props: {
    //           value: scope.row.startDate,
    //           valueFormat: 'yyyy-MM-dd',
    //           format: 'yyyy-MM-dd'
    //         }
    //       })
    //     ])
    //   } else {
    //     return <span>{scope.row.startDate}</span>
    //   }
    // }
  },
  {
    prop: 'endDate',
    label: '有效期止',
    minWidth: 160
    // customRender: (h, scope) => {
    //   if (scope.row.editRow) {
    //     return h('div', [
    //       h('el-date-picker', {
    //         model: {
    //           value: scope.row.endDate,
    //           callback: (value) => (scope.row.endDate = value)
    //         },
    //         // on: {
    //         //   input: value => {
    //         //     scope.row.endDate = value
    //         //   }
    //         // },
    //         props: {
    //           valueFormat: 'yyyy-MM-dd',
    //           format: 'yyyy-MM-dd'
    //         }
    //       })
    //     ])
    //   } else {
    //     return <span>{scope.row.endDate}</span>
    //   }
    // }
  },
  {
    prop: 'priceSource',
    label: '市场价来源',
    minWidth: 120
  },
  {
    prop: 'compensationRatio',
    label: '补差系数',
    minWidth: 120
  },
  {
    prop: 'compensationPeriod',
    label: '补差周期',
    minWidth: 120
  },
  {
    prop: 'threshold',
    label: '阈值',
    minWidth: 120
  },
  {
    prop: 'thresholdCompensationLogic',
    label: '阈值补差逻辑',
    minWidth: 120
  }
]

export const TABLE_COLUMNS1 = [
  {
    type: 'selection',
    width: '60px'
  },
  {
    type: 'index',
    width: '60px',
    label: '#'
  },
  {
    prop: 'approvalUser',
    label: '审批人',
    i18n: '审批人',
    minWidth: 120
  },
  {
    prop: 'appStatus',
    label: '审批状态',
    i18n: '审批状态',
    minWidth: 160
  },
  {
    prop: 'idea',
    label: '审批意见',
    i18n: '审批意见',
    minWidth: 120
  },
  {
    prop: 'startDate',
    label: '到达时间',
    minWidth: 120
  },
  {
    prop: 'endDate',
    label: '完成时间',
    minWidth: 120
  },
  {
    prop: 'duration',
    label: '任务持续时间',
    minWidth: 120
  }
  // {
  //   prop: 'explain',
  //   label: '解释',
  //   minWidth: 120
  // }
]

export const tableList = [
  {
    assemblyPartnum: '111',
    compensationPeriod: '11',
    compensationRatio: 0,
    dosageMeasureUnit: '111',
    endDate: '2020-2-4',
    id: 0,
    material: '11111',
    materialCode: '1111111',
    mtzAppId: 0,
    newDosage: '222',
    oldDosage: '44',
    price: 0,
    priceSource: 'string',
    priceUnit: 'string',
    startDate: '2020-2-2',
    supplierCode: 'string',
    supplierCodeName: 'string',
    supplierName: 'string',
    threshold: 0,
    thresholdCompensationLogic: 'string'
  }
]

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
    props: 'materialGroup',
    name: '材料组',
    key: '材料组',
    align: 'center',
    width: 150
  }, {
    props: 'materialName',
    name: '原材料描述',
    key: '原材料描述',
    align: 'center',
    width: 150
  }, {
    props: 'oncePartNum',
    name: '一次零件号',
    key: '一次零件号',
    align: 'center',
    width: 150
  }, {
    props: 'oncePartName',
    name: '一次零件名称',
    key: '一次零件名称',
    align: 'center',
    width: 150
  },
  {
    props: 'onceSapCode',
    name: '一次件供应商编号',
    key: '一次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    props: 'onceSupplierName',
    name: '一次件供应商名称',
    width: '100px',
    align: 'center',
    key: '一次件供应商名称',
    width: 150
  },
  {
    props: 'buyer',
    name: '采购员',
    width: '100px',
    align: 'center',
    key: '采购员',
    width: 100
  },
  {
    props: 'dept',
    name: '科室',
    width: '100px',
    align: 'center',
    key: '科室',
    width: 100
  }, {
    props: 'secondPartNum',
    name: '二次零件号',
    key: '二次零件号',
    align: 'center',
    width: 150
  }, {
    props: 'secondPartName',
    name: '二次零件名称',
    key: '二次零件名称',
    align: 'center',
    width: 150
  },
  {
    props: 'secondSapCode',
    name: '二次件供应商编号',
    key: '二次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    props: 'secondSupplierName',
    name: '二次件供应商名称',
    align: 'center',
    key: '二次件供应商名称',
    width: 150
  },
  {
    props: 'proportion',
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
    props: 'tcCurrence',
    name: '货币',
    align: 'center',
    key: 'HUOBI',
    width: 150
  },
  { props: 'tcExchangeRate', name: '汇率', align: 'center', key: 'HUILV' },
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

// 规则表格编辑校验
export const formRulesGZ = {
  partNum: [{ required: true, message: '请输入', trigger: 'blur' }],
  method: [{ required: true, message: '请选择', trigger: 'change' }],
  startDate: [{ required: true, message: '请选择', trigger: 'change' }], //开始日期
  endDate: [{ required: true, message: '请选择', trigger: 'change' }], //结束日期
  supplier: [{ required: true, message: '请输入', trigger: 'blur' }],//供应商
  currency: [{ required: true, message: '请选择', trigger: 'change' }], //货币
  exchangeRate: [{ required: true, message: '请输入', trigger: 'blur' }], //汇率
  amount: [{ required: true, message: '请输入', trigger: 'blur' }], //市场价来源
}