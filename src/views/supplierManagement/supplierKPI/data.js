/*
 * @Date: 2022-08-18 16:10:55
 * @LastEditors: caopeng
 * @LastEditTime: 2022-09-28 14:13:24
 * @FilePath: \front-order\src\views\ws2\productionCapacity\Bom\page\detail\contrast\data.js
 */
export const tableTitle2 = [
    {
        props: 'supplierShortNameZh',
        name: '供应商SAP号',
        key: '供应商SAP号',
        align: 'center',
    },
    {
        props: '供应商名称',
        name: '供应商名称',
        key: '供应商名称',
        align: 'center',
    },

    {
        props: 'caozuo',
        name: '操作',
        key: '操作',
        align: 'center',
    },
    
]
export const tableTitle = [
    {
        props: 'supplierShortNameZh',
        name: '版本数据日期',
        key: '版本数据日期',
        align: 'center',
    },
    {
        props: 'modelType',
        name: '类型',
        key: '类型',
        align: 'center',
    },

    {
        props: 'status',
        name: '状态',
        key: '状态',
        align: 'center',
    },
    {
        props: 'tracedPrice',
        name: 'SPI-系统计算状态',
        key: 'SPI-系统计算状态',
        align: 'center',
    },
    {
        props: 'actualTracedPrice',
        name: 'CS主观打分状态',
        key: 'CS主观打分状态',
        align: 'center',
    },
    {
        props: 'updateDate',
        name: '其他部门打分状态',
        key: '其他部门打分状态',
        align: 'center',
    },
    {
        props: 'updateDate',
        name: '版本创建人',
        key: '版本创建人',
        align: 'center',
    },
    {
        props: 'caozuo',
        name: '操作',
        key: '操作',
        align: 'center',
    },
]
export const  pickerOptions={
    shortcuts: [{
      text: '最近一周',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }]
  }
