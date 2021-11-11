/*
 * @Author: your name
 * @Date: 2021-11-02 15:40:25
 * @LastEditTime: 2021-11-02 17:57:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\approverRecord\components\data.js
 */
export const TABLE_COLUM = [
  {
    type: 'selection',
    width: 60
  },
  {
    type: 'index',
    label: '#',
    width: 60
  },
  {
    prop: 'approvalDepartment',
    label: '审批部门',
    tooltip: true
    // customRender: (h, scope) => {
    //   if (scope.row.editRow) {
    //     return h('div', [
    //       h(
    //         'el-select',
    //         {
    //           model: {
    //             value: scope.row.endDate,
    //             callback: (value) => (scope.row.endDate = value)
    //           },
    //           props: {
    //             valueFormat: 'yyyy-MM-dd',
    //             format: 'yyyy-MM-dd'
    //           }
    //         },
    //         [
    //           h('el-option', {
    //             props: {
    //               value: item.id,
    //               label: item.description,
    //               disabled: !!_.find(_self.dimensions, (d) => {
    //                 return d.dimension === item.id
    //               })
    //             }
    //           })
    //         ]
    //       )
    //     ])
    //   } else {
    //     return <span>{scope.row.endDate}</span>
    //   }
    // }
  },
  {
    prop: 'approvalSection',
    label: '审批科室',
    tooltip: true
  },
  {
    prop: 'approvalName',
    label: '审批人',
    tooltip: true
  },
  {
    prop: 'startDate',
    label: '生成时间',
    tooltip: true
  },
  {
    prop: 'endDate',
    label: '截止时间',
    tooltip: true
  }
]
