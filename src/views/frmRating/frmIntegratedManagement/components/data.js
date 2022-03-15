/*
 * @Author: moxuan
 * @Date: 2021-05-19 20:08:08
 * @Description: FRM综合管理
 */
import { SUPPLIER_STATUS } from '../../../../constants/frmRating/preliminaryRating'

export const tableTitle = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 60,
    label: '序号'
  },
  {
    prop: 'sapCode',
    lable: 'SAP号',
    i18n: 'SUPPLIER_SAPHAO',
    tooltip: true,
    width: 120
  },
  {
    prop: 'nameZh',
    lable: '供应商名称',
    i18n: 'LK_GONGYINGSHANGMINGCHENG1',
    width: 300,
    tooltip: true
  },
  {
    prop: 'isActive',
    lable: '供应商状态',
    i18n: 'GONGHUO1',
    width: 80,
    tooltip: true,
    customRender: (h, scope) => {
      return SUPPLIER_STATUS[scope.row.isActive]
    }
  },
  {
    prop: 'takeChargeSection',
    lable: '相关科室',
    i18n: 'SPR_FRM_FRMGL_XGKS1',
    width: 120,
    tooltip: true
  },
  {
    prop: 'externalAccessScore',
    lable: '外评',
    i18n: 'SPR_FRM_FRMGL_WP1',
    tooltip: true
  },
  {
    prop: 'externalAccessDate',
    lable: '外评时间',
    i18n: 'SPR_FRM_FRMGL_WPSJ',
    tooltip: true,
    width: 110
  },
  {
    prop: 'afterGrade',
    lable: '调整后评级',
    i18n: 'SPR_FRM_FRMGL_TZHPJ',
    width: 120,
    tooltip: true
  },
  {
    prop: 'grade',
    lable: '初步评级',
    width: 120,
    i18n: 'SUPPLIER_CHUBUPINGJI1',
    tooltip: true
  },
  {
    prop: 'initialCreateDate',
    lable: '初评时间',
    i18n: 'SPR_FRM_FRMGL_CPSJ',
    width: 110,
    tooltip: true
  },
  {
    prop: 'deepCommentResult',
    width: 120,
    lable: '深评结果',
    i18n: 'SHENPINGJIEGUO',
    tooltip: true,
    customRender: (h, scope) => {
      var str
      if (scope.row.deepCommentResult == 'GREEN') {
        str = <icon symbol name="iconlvdeng"></icon>
      } else if (scope.row.deepCommentResult == 'YELLOW') {
        str = <icon symbol name="iconhuangdeng"></icon>
      } else if (scope.row.deepCommentResult == 'RED') {
        str = <icon symbol name="iconhongdeng"></icon>
      }
      return str
    }
  },
  {
    prop: 'approvalEndDate',
    width: 120,
    lable: '深评时间',
    i18n: 'SPR_FRM_FRMGL_SPSJ',
    width: 110,
    tooltip: true
  },
  {
    prop: 'qualitativeScoreStatus',
    lable: '定性打分状态',
    i18n: 'SPR_FRM_FRMGL_DXDFZT',
    width: 130,
    tooltip: true
  },
  {
    prop: 'qualitativeScoreDate',
    lable: '定性打分时间',
    i18n: 'SPR_FRM_FRMGL_DXDFSJ',
    width: 130,
    tooltip: true
  },
  {
    prop: 'deepStatus',
    lable: '深评状态',
    i18n: 'SPR_FRM_FRMGL_SPZT',
    width: 160,
    tooltip: true
  },
  {
    prop: 'vwagAssessResult',
    lable: 'VWAG评级',
    i18n: 'SPR_FRM_FRMGL_VWAGPJ',
    width: 160,
    tooltip: true,
    customRender: (h, scope) => {
      var str
      if (scope.row.vwagAssessResult == 'green') {
        str = <icon symbol name="iconlvdeng"></icon>
      } else if (scope.row.vwagAssessResult == 'yellow') {
        str = <icon symbol name="iconhuangdeng"></icon>
      } else if (scope.row.vwagAssessResult == 'red') {
        str = <icon symbol name="iconhongdeng"></icon>
      } else {
        str = <span>{scope.row.vwagAssessResult}</span>
      }
      return str
    }
  },
  {
    prop: 'vwagCreateDate',
    lable: 'VWAG时间',
    i18n: 'SPR_FRM_FRMGL_VWAGSJ',
    width: 160,
    tooltip: true
  }
]

export const confirmedPreliminaryReviewListTableTitle = [
  { props: 'sapCode', name: 'SAP号', key: 'SUPPLIER_SAPHAO' },
  {
    props: 'nameZh',
    name: '供应商名称',
    key: 'LK_GONGYINGSHANGMINGCHENG1',
    tooltip: true
  },
  { props: 'tto', name: '上年TO', key: 'SPR_FRM_FRMGL_SNTO' },
  { props: 'relevantDept', name: '相关科室', key: 'SPR_FRM_FRMGL_XGKS1' },
  { props: 'relevantStock', name: '相关股', key: 'SPR_FRM_FRMGL_XGG' },
  {
    props: 'socialcreditNo',
    name: '统一社会信用代码',
    key: 'SUPPLIER_SHEHUITONGYIXINYONGDAIMA'
  },
  { props: 'modelId', name: '适用模型', key: 'SPR_FRM_FRMGL_SYMX' }
]

export const viewModelTableTitle = [
  { props: 'supplierType', name: '供应商类型', key: 'SUPPLIER_SUPPLIERTYPE' },
  { props: 'modelType', name: '模型类型', key: 'SPR_FRM_FRMGL_MXlX' },
  { props: 'modelName', name: '模型名称', key: 'SPR_FRM_FRMGL_MXMC' },
  { props: 'upload', name: '上传', key: 'LK_SHANGCHUAN' },
  { props: 'download', name: '下载', key: 'LK_XIAZAI' }
]
