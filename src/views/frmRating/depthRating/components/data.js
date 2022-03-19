/*
 * @Author: 舒杰
 * @Date: 2021-05-27 13:57:04
 * @LastEditTime: 2022-02-18 19:58:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal-new\src\views\frmRating\depthRating\components\data.js
 */

export const tableTitle = [
  {
    props: 'name',
    name: '供应商名称',
    key: 'SPR_FRM_DEP_SUPNAME',
    width: 100,
    tooltip: true
  },
  { props: 'sap', name: 'SAP号', key: 'SUPPLIER_SAPHAO' },
  {
    props: 'deepCommentSupplierName',
    name: '集团名称',
    key: 'SPR_FRM_DEP_GROUPPACK'
  },
  {
    props: 'status',
    name: '状态',
    key: 'SPR_FRM_DEP_STATE',
    tooltip: true,
    width: 150
  },
  { props: 'progress', name: '进度', key: 'SPR_FRM_DEP_SPEEDPROGRESS' },
  { props: 'upload', name: '附件', key: 'SPR_FRM_DEP_ENCLOSUER' },
  { props: 'interView', name: '访谈内容', key: 'SPR_FRM_DEP_INTERVIEWCON' },
  { props: 'depthReport', name: '深评报告', key: 'SPR_FRM_DEP_DEPREPORT' },
  { props: 'financialAnalysis', name: '财报分析', key: 'SPR_FRM_DEP_FINANA' },
  {
    props: 'deepCommentResult',
    name: '深评结果',
    key: 'SPR_FRM_DEP_DEPRESULT'
  },
  {
    props: 'approvalEndDate',
    name: '深评时间',
    key: 'SPR_FRM_DEP_DEPTIME',
    width: 120
  },
  { props: 'grade', name: '初评结果', key: 'SPR_FRM_DEP_PREASRESULT' },
  {
    props: 'externalEvaluationLevel',
    name: '外评',
    key: 'SPR_FRM_DEP_OUTRATING'
  },
  {
    props: 'trackingFrequency',
    name: '跟踪频率（月）',
    key: 'SPR_FRM_DEP_TRACKFRE',
    width: 130
  },
  {
    props: 'nextRatingTime',
    name: '下次评级时间',
    key: 'SPR_FRM_DEP_NEXTRATIME',
    width: 180
  },
  {
    props: 'relevantDept',
    name: '相关科室',
    key: 'SPR_FRM_DEP_REKADEP',
    width: 150
  },
  { props: 'remarks', name: '备注', key: 'SPR_FRM_DEP_REMARKS' },
  {
    props: 'distributionObjects',
    name: '已分发对象',
    key: 'SPR_FRM_DEP_DISOBJ',
    width: 150
  },
  {
    props: 'gradeStartMonth',
    name: '评级开始月份',
    key: 'SPR_FRM_DEP_RATSTARTIME',
    width: 150
  },
  {
    props: 'gradeEndMonth',
    name: '评级结束月份',
    key: 'SPR_FRM_DEP_RATENDTIME',
    width: 150
  },
  {
    props: 'estimateCompleteMonth',
    name: '预计完成月份',
    key: 'SPR_FRM_DEP_ESTIMATE',
    width: 150
  },
  {
    props: 'updateUserName',
    name: '深入分析负责人',
    key: 'SPR_FRM_DEP_PICOIDA',
    width: 150
  },
  {
    props: 'deepCommentReasons',
    name: '深评原因',
    key: 'SPR_FRM_DEP_DEPREASON',
    width: 150
  }
]

export const joinGroupTitle = [
  { props: 'sap', name: 'SAP号', key: 'SUPPLIER_SAPHAO' },
  { props: 'name', name: '供应商名称', key: 'SPR_FRM_DEP_SUPNAME' },
  {
    props: 'deepCommentSupplierName',
    name: '集团打包',
    key: 'SPR_FRM_DEP_GROUPPACK'
  },
  { props: 'status', name: '状态', key: 'SPR_FRM_DEP_STATE' },
  {
    props: 'deepCommentResult',
    name: '深评结果',
    key: 'SPR_FRM_DEP_DEPRESULT'
  },
  { props: 'approvalEndDate', name: '深评时间', key: 'SPR_FRM_DEP_DEPTIME' },
  { props: 'trackingFrequency', name: '跟踪频率', key: 'SPR_FRM_DEP_TRACKFRE' },
  {
    props: 'nextRatingTime',
    name: '下次评级时间',
    key: 'SPR_FRM_DEP_NEXTRATIME'
  },
  { props: 'relevantDept', name: '相关科室', key: 'SPR_FRM_DEP_REKADEP' }
]

export const endRatingTitle = [
  { props: 'nameZh', name: '供应商名称/集团', key: 'SPR_FRM_DEP_SUPNAME' },
  { props: 'sapCode', name: 'SAP号', key: 'SUPPLIER_SAPHAO' },
  { props: 'previousTto', name: '上年TO', key: 'SPR_FRM_FRMGL_SNTO' },
  { props: 'relevantDept', name: '相关科室', key: 'SPR_FRM_FRMGL_XGKS1' },
  { props: 'existShareName', name: '相关股', key: 'SPR_FRM_FRMGL_XGG' },
  {
    props: 'deepCommentReasons',
    name: '深评原因',
    key: 'SPR_FRM_DEP_DEPREASON'
  },
  {
    props: 'deepCommentOtherReasons',
    name: '详细原因',
    key: 'SPR_FRM_DEP_XXYY'
  },
  { props: 'isDeepComment', name: '是否深评', key: 'SPR_FRM_DEP_ISDEPTH' },
  { props: 'noDeepCommentReason', name: '不评级原因', key: 'SPR_FRM_DEP_BPJYY' }
]
export const endRatingTitle1 = [
  { props: 'sapCode', name: 'SAP号', key: 'SUPPLIER_SAPHAO' },
  { props: 'previousTto', name: '上年TO', key: 'SPR_FRM_FRMGL_SNTO' },
  { props: 'relevantDept', name: '相关科室', key: 'SPR_FRM_FRMGL_XGKS1' },
  { props: 'existShareName', name: '相关股', key: 'SPR_FRM_FRMGL_XGG' }
]

export const uploadTitle = [
  { props: 'name', name: '文件名称', key: 'LK_WENJIANMINGCHENG' },
  { props: 'sizeStr', name: '大小', key: 'SUPPLIER_DAXIAOMB' },
  { props: 'createDate', name: '上传日期', key: 'SUPPLIER_SHANGCHUQNRQI' },
  { props: 'uploaderName', name: '上传人', key: 'SUPPLIER_SHANGCHUANREN' }
]

export const depthReportRouter = [
  {
    value: 1,
    name: '深评报告',
    url: '/supplier/frmrating/depthRating/depthReport',
    activePath: '/supplier/frmrating/depthRating/depthReport',
    key: '深评报告'
  },
  {
    value: 2,
    name: 'Depth Report',
    url: '/supplier/frmrating/depthRating/EnDepthReport',
    activePath: '/supplier/frmrating/depthRating/EnDepthReport',
    key: 'Depth Report'
  }
]
