/*
 * @Author: moxuan
 * @Date: 2021-05-22 20:08:08
 * @Description: 初步评级
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
  {props: 'externalAccessAcore', name: '外评', key: 'SPR_FRM_FRMGL_WP', tooltip: true},
  {props: 'grade', name: '初步评级', key: 'SUPPLIER_CHUBUPINGJI', tooltip: true},
  {props: 'preliminaryStatus', name: '初评状态', key: 'SPR_FRM_CBPJ_CPZT', tooltip: true},
  {props: 'afterGrade', name: '调整后评级', key: 'SPR_FRM_FRMGL_TZHPJ', width: 120, tooltip: true},
  {props: 'source', name: '数据来源', key: 'SPR_FRM_XGYSPJ_SJLY', tooltip: true},
  {props: 'createDate', name: '评级时间', key: 'SPR_FRM_XGYSPJ_PJSJ', width: 90, tooltip: true},
  {props: 'score', name: '调整前得分', key: 'SPR_FRM_CBPJ_TZQDF', width: 120, tooltip: true},
  {props: 'adjustmentScore', name: '调整分', key: 'SPR_FRM_CBPJ_TZF', tooltip: true},
  {
    props: 'afterAdjustScore',
    name: '调整后得分',
    key: 'SPR_FRM_CBPJ_TZHDF',
    width: 120,
    tooltip: true
  },
  {
    props: 'qualitativeScoreDate',
    name: '定性打分时间',
    key: 'SPR_FRM_FRMGL_DXDFSJ',
    width: 120,
    tooltip: true
  },
  {props: 'effectFlag', name: '是否有效', key: 'SPR_FRM_CBPJ_SFYX', tooltip: true},
  {props: 'isAddition', name: '有无加减分', key: 'SPR_FRM_CBPJ_YWJJF', width: 120, tooltip: true},
  {props: 'notEvaluatedReason', name: '无法评级原因', key: 'SPR_FRM_CBPJ_WFPJYY', width: 120, tooltip: true},
];
