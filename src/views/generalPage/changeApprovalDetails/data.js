/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:24
 * @LastEditTime: 2022-01-11 17:23:54
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\generalPage\changeApprovalDetails\data.js
 */
export const tableTitle = [
  { props: 'fieldName', name: '变更字段', key: 'SUPPLIER_BIANGENGZIDUAN' },
  { props: 'beforeValue', name: '变更前', tooltip: true, key: 'BANGENGQIAN' },
  { props: 'afterValue', name: '变更后', tooltip: true, key: 'BIANGENGHOU' },
  { props: 'updateByZh', name: '修改人', key: 'SUPPLIER_XIUGAIREN' },
  { props: 'updateDate', name: '修改日期', key: 'SUPPLIER_XIUGAIRQI' }
]
export const filTableTitle = [
  { props: 'templateName', name: '附件名称', key: 'SUPPLIER_FUJIANMINGCHENG' },
  {
    props: 'createDate',
    name: '上传/确认日期',
    tooltip: true,
    key: 'SUPPLIER_SHANGCHUANQUERENRQI'
  },
  {
    props: 'attachRemark',
    name: '备注说明',
    tooltip: true,
    key: 'SUPPLIER_BEIZHUSHUOMING'
  },
  {
    props: 'validityOfCertificate',
    name: '证件有效期',
    key: 'SUPPLIER_ZHENGJIANYOUXIAOQI'
  }
]
