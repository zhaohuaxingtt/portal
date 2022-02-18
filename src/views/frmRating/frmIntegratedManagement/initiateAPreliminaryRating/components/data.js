/*
 * @Author: moxuan
 * @Date: 2021-05-19 20:08:08
 * @Description: FRM综合管理-发起初步评级
 */

export const tableTitle = [
  {
    props: 'nameZh',
    name: '供应商名称',
    key: 'LK_GONGYINGSHANGMINGCHENG1',
    tooltip: true
  },
  {
    props: 'socialcreditNo',
    name: '统一社会信用代码',
    key: 'SUPPLIER_SHEHUITONGYIXINYONGDAIMA'
  },
  { props: 'sapCode', name: 'SAP号', key: 'SUPPLIER_SAPHAO' },
  { props: 'relevantDept', name: '相关科室', key: 'SPR_FRM_FRMGL_XGKS' },
  { props: 'relevantStock', name: '相关股', key: 'SPR_FRM_FRMGL_XGG' },
  { props: 'tto', name: '上年TO', key: 'SPR_FRM_FRMGL_SNTO' },
  { props: 'modelId', name: '适用模型', key: 'SPR_FRM_FRMGL_SYMX' }
]
