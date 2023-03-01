/*
 * @Date: 2022-08-18 16:10:55
 * @LastEditors: caopeng
 * @LastEditTime: 2022-09-28 14:13:24
 * @FilePath: \front-order\src\views\ws2\productionCapacity\Bom\page\detail\contrast\data.js
 */
export const tableTitleDept = [
  {
    props: 'sapCode',
    name: 'L1类型',
    key: 'L1类型',
    align: 'center',
    width:300
  },
  {
    props: 'sapCode',
    name: '评分部门/科室',
    key: '评分部门/科室',
    align: 'center',
    width:300

  },
]
export const tableTitleModel = [
  {
    props: 'sapCode',
    name: 'L1类型',
    key: 'L1类型',
    align: 'center',
    width:300

  },
  {
    props: 'sapCode',
    name: '编辑者',
    key: '编辑者',
    align: 'center',
    width:300

  },
]
export const tableTitle2 = [
  {
    props: 'sapCode',
    name: '供应商SAP号',
    key: '供应商SAP号',
    align: 'center'
  },
  {
    props: 'supplierName',
    name: '供应商名称',
    key: '供应商名称',
    align: 'center'
  },
  {
    props: 'supplierName',
    name: 'CS打分科室',
    key: 'CS打分科室',
    align: 'center'
  }
]
export const tableTitle = [
  {
    props: 'dataTime',
    name: '版本数据日期',
    key: '版本数据日期',
    align: 'center'
  },
  {
    props: 'editionType',
    name: '类型',
    key: '类型',
    align: 'center'
  },

  {
    props: 'status',
    name: '状态',
    key: '状态',
    align: 'center'
  },
  // {
  //     props: 'tracedPrice',
  //     name: 'SPI-系统计算状态',
  //     key: 'SPI-系统计算状态',
  //     align: 'center',
  // },
  // {
  //     props: 'actualTracedPrice',
  //     name: 'CS主观打分状态',
  //     key: 'CS主观打分状态',
  //     align: 'center',
  // },
  // {
  //     props: 'updateDate',
  //     name: '其他部门打分状态',
  //     key: '其他部门打分状态',
  //     align: 'center',
  // },
  {
    props: 'createName',
    name: '版本创建人',
    key: '版本创建人',
    align: 'center'
  },
  {
    props: 'caozuo',
    name: '操作',
    key: '操作',
    align: 'center'
  }
]
export const pickerOptions = {
  shortcuts: [
    {
      text: '本月',
      onClick(picker) {
        picker.$emit('pick', [new Date(), new Date()])
      }
    },
    {
      text: '今年至今',
      onClick(picker) {
        const end = new Date()
        const start = new Date(new Date().getFullYear(), 0)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近六个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 6)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}
