/*
 * @Author: YoHo
 * @Date: 2022-01-11 18:25:50
 * @LastEditTime: 2022-01-27 16:48:39
 * @LastEditors: YoHo
 * @Description: 
 */

export const procurementDialogTableTitle = [
  { prop: 'fileName', name: '文件名称', key: 'SUPPLIER_WENJIANMINGCHENG', minWidth: 120 },
  { prop: 'attachmentSize', name: '大小(MB)', key: 'SUPPLIER_DAXIAOMB' },
  { prop: 'uploadUser', name: '上传人', key: 'SUPPLIER_SHANGCHUANREN' },
  { prop: 'uploadDate', name: '上传日期', key: 'SUPPLIER_SHANGCHUQNRQI' },
]

export const attachmentTableTitle = [
  { prop: 'attachmentName', name: '文件名称', key: 'SUPPLIER_WENJIANMINGCHENG', minWidth: 120 },
  { prop: 'attachmentSize', name: '大小(MB)', key: 'SUPPLIER_DAXIAOMB' },
  { prop: 'updateDate', name: '上传日期', key: 'SUPPLIER_SHANGCHUQNRQI' },
]

export const ClauseDialogTableTitle = [
  { prop: 'termsType', name: '条款类型', key: '', type:'select', select:'typeObj' },
  { prop: 'termsCode', name: '条款编码', key: '' },
  { prop: 'termsName', name: '条款名称', key: '' },
  { prop: 'version', name: '版本号', key: '' },
  { prop: 'signWay', name: '签署方式', key: '', type:'select', select:'signWayObj' },
  { prop: 'termsStatus', name: '条款状态', key: '', type:'select', select:'statusObj' },
  { prop: 'signTime', name: '签署时间', key: '', width: 100 },
  { prop: 'fileUrl', name: '已签署文件', key: '' },
  { prop: 'linieName', name: '条款负责人', key: '' },
]
// 审批中心表格
export const procurementApproveTableTitle = [
  { prop: 'termsType', name: '条款类型' },
  { prop: 'termsCode', name: '条款编码' },
  { prop: 'termsName', name: '标准名称' },
  { prop: 'version', name: '版本号' },
  { prop: 'chargeName', name: '条款负责人' }
]