/*
 * @Author: moxuan
 * @Date: 2021-05-19 20:08:08
 * @Description: FRM综合管理
 */

export const tableTitle = [
  {props: 'sapCode', name: 'SAP号', key: 'SUPPLIER_SAPHAO', tooltip: true},
  {
    props: 'nameZh',
    name: '供应商名称',
    key: 'LK_GONGYINGSHANGMINGCHENG',
    width: 200,
    tooltip: true,
  },
  {props: 'isActive', name: '供应商状态', key: 'GONGHUO', width: 120, tooltip: true},
  {
    props: 'takeChargeSection',
    name: '相关科室',
    key: 'SPR_FRM_FRMGL_XGKS',
    tooltip: true,
  },
  {
    props: 'externalAccessScore',
    name: '外评',
    key: 'SPR_FRM_FRMGL_WP',
    tooltip: true,
  },
  {
    props: 'externalAccessDate',
    name: '外评时间',
    key: 'SPR_FRM_FRMGL_WPSJ',
    tooltip: true,
    width: 110,
  },
  {
    props: 'afterGrade',
    name: '调整后评级',
    key: 'SPR_FRM_FRMGL_TZHPJ',
    width: 120,
    tooltip: true,
  },
  {props: 'grade', name: '初步评级', key: 'SUPPLIER_CHUBUPINGJI', tooltip: true},
  {
    props: 'initialCreateDate',
    name: '初评时间',
    key: 'SPR_FRM_FRMGL_CPSJ',
    width: 110,
    tooltip: true,
  },
  {
    props: 'deepCommentResult',
    name: '深入评级',
    key: 'SUPPLIER_SHENRUPINGJI',
    tooltip: true,
  },
  {
    props: 'deepCreateDate',
    name: '深评时间',
    key: 'SPR_FRM_FRMGL_SPSJ',
    width: 110,
    tooltip: true,
  },
  {
    props: 'qualitativeScoreStatus',
    name: '定性打分状态',
    key: 'SPR_FRM_FRMGL_DXDFZT',
    width: 130,
    tooltip: true,
  },
  {
    props: 'qualitativeScoreDate',
    name: '定性打分时间',
    key: 'SPR_FRM_FRMGL_DXDFSJ',
    width: 110,
    tooltip: true,
  },
  {props: 'deepStatus', name: '深评状态', key: 'SPR_FRM_FRMGL_SPZT', tooltip: true},
  {
    props: 'vwagAssessResult',
    name: 'VWAG评级',
    key: 'SPR_FRM_FRMGL_VWAGPJ',
    width: 100,
    tooltip: true,
  },
  {
    props: 'vwagCreateDate',
    name: 'VWAG时间',
    key: 'SPR_FRM_FRMGL_VWAGSJ',
    width: 110,
    tooltip: true,
  },
];

export const confirmedPreliminaryReviewListTableTitle = [
  {props: 'sapCode', name: 'SAP号', key: 'SUPPLIER_SAPHAO'},
  {
    props: 'nameZh',
    name: '供应商名称',
    key: 'LK_GONGYINGSHANGMINGCHENG',
    tooltip: true,
  },
  {props: 'tto', name: '上年TO', key: 'SPR_FRM_FRMGL_SNTO'},
  {props: 'relevantDept', name: '相关科室', key: 'SPR_FRM_FRMGL_XGKS'},
  {props: 'relevantStock', name: '相关股', key: 'SPR_FRM_FRMGL_XGG'},
  {
    props: 'socialcreditNo',
    name: '统一社会信用代码',
    key: 'SUPPLIER_SHEHUITONGYIXINYONGDAIMA',
  },
  {props: 'modelId', name: '适用模型', key: 'SPR_FRM_FRMGL_SYMX'},
];

export const viewModelTableTitle = [
  {props: 'supplierType', name: '供应商类型', key: 'SUPPLIER_SUPPLIERTYPE'},
  {props: 'modelType', name: '模型类型', key: 'SPR_FRM_FRMGL_MXlX'},
  {props: 'modelName', name: '模型名称', key: 'SPR_FRM_FRMGL_MXMC'},
  {props: 'upload', name: '上传', key: 'LK_SHANGCHUAN'},
  {props: 'download', name: '下载', key: 'LK_XIAZAI'},
];
