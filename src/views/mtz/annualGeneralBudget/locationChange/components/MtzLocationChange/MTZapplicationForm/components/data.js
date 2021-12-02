/*
 * @Author: your name
 * @Date: 2021-10-27 21:42:09
 * @LastEditTime: 2021-12-02 17:18:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\components\data.js
 */
export const TABLE_COLUMNS = [
  {
    type: 'index',
    width: '60px',
    label: '#'
  },
  {
    type: 'selection',
    width: '60px'
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
    type: 'index',
    width: '60px',
    label: '#'
  },
  {
    type: 'selection',
    width: '60px'
  },
  {
    prop: 'approvalUser',
    label: '审批人',
    minWidth: 120
  },
  {
    prop: 'appStatus',
    label: '审批状态',
    minWidth: 160
  },
  {
    prop: 'idea',
    label: '意见',
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
