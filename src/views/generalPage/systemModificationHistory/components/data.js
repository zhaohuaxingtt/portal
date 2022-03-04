/*
 * @Author: moxuan
 * @Date: 2021-04-15 17:50:00
 * @LastEditTime: 2022-03-03 18:38:43
 * @LastEditors: YoHo
 * @Description: 重大事项
 */

export const tableTitle = [
  { props: 'fieldName', name: '修改信息', key: 'SUPPLIER_BIANGENGZIDUAN' },
  {
    props: 'beforeValue',
    name: '变更前',
    tooltip: true,
    key: 'SUPPLIER_YUANNEIRONG',
    width: 300
  },
  {
    props: 'afterValue',
    name: '变更后',
    tooltip: true,
    key: 'SUPPLIER_XINEIRONG',
    width: 300
  },
  { props: 'updateByZh', name: '修改人', key: 'SUPPLIER_XIUGAIREN', width: 150 },
  { props: 'updateDate', name: '修改日期', key: 'SUPPLIER_XIUGAIRQI', width: 180 }
]
