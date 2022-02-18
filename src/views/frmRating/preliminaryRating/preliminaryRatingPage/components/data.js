/*
 * @Author: moxuan
 * @Date: 2021-05-22 20:08:08
 * @Description: 初步评级
 */

import { SUPPLIER_STATUS } from '../../../../../constants/frmRating/preliminaryRating'

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
  { prop: 'sapCode', label: 'SAP号', li8n: 'SUPPLIER_SAPHAO', tooltip: true },
  {
    prop: 'nameZh',
    label: '供应商名称',
    li8n: 'LK_GONGYINGSHANGMINGCHENG1',
    width: 200,
    tooltip: true,
    emit: 'go-detail',
    customRender: (h, scope) => {
      return (
        <span class="cursor" style="color:#1763F7">
          {scope.row.nameZh}
        </span>
      )
    }
  },
  {
    prop: 'isActive',
    label: '供应商状态',
    li8n: 'GONGHUO1',
    width: 120,
    tooltip: true,
    customRender: (h, scope) => {
      var str = SUPPLIER_STATUS[scope.row.isActive]
      return str
    }
  },
  {
    prop: 'externalAccessAcore',
    label: '外评',
    li8n: 'SPR_FRM_FRMGL_WP',
    width: 120,
    tooltip: true
  },
  {
    prop: 'grade',
    label: '初步评级',
    li8n: 'SUPPLIER_CHUBUPINGJI1',
    width: 120,
    tooltip: true
  },
  {
    prop: 'preliminaryStatus',
    label: '初评状态',
    li8n: 'SPR_FRM_CBPJ_CPZT',
    width: 120,
    tooltip: true
  },
  {
    prop: 'afterGrade',
    label: '调整后评级',
    li8n: 'SPR_FRM_FRMGL_TZHPJ',
    width: 120,
    tooltip: true
  },
  {
    prop: 'source',
    label: '数据来源',
    li8n: 'SPR_FRM_XGYSPJ_SJLY',
    width: 120,
    tooltip: true
  },
  {
    prop: 'createDate',
    label: '评级时间',
    li8n: 'SPR_FRM_XGYSPJ_PJSJ',
    width: 150,
    tooltip: true
  },
  {
    prop: 'score',
    label: '调整前得分',
    li8n: 'SPR_FRM_CBPJ_TZQDF',
    width: 120,
    tooltip: true
  },
  {
    prop: 'adjustmentScore',
    label: '调整分',
    li8n: 'SPR_FRM_CBPJ_TZF',
    width: 120,
    tooltip: true
  },
  {
    prop: 'afterAdjustScore',
    label: '调整后得分',
    li8n: 'SPR_FRM_CBPJ_TZHDF',
    width: 120,
    tooltip: true
  },
  {
    prop: 'qualitativeScoreDate',
    label: '定性打分时间',
    li8n: 'SPR_FRM_FRMGL_DXDFSJ',
    width: 150,
    tooltip: true
  },
  {
    prop: 'effectFlag',
    label: '是否有效',
    li8n: 'SPR_FRM_CBPJ_SFYX',
    width: 90,
    tooltip: true,
    customRender: (h, scope) => {
      var str = scope.row.effectFlag === 1 ? '有效' : '无效'
      return str
    }
  },
  {
    prop: 'isAddition',
    label: '有无加减分',
    li8n: 'SPR_FRM_CBPJ_YWJJF',
    width: 120,
    tooltip: true,
    customRender: (h, scope) => {
      var str
      if (scope.row.isAddition == 1) {
        str = '有'
      } else if (scope.row.isAddition == 0) {
        str = '无'
      } else {
        str = scope.row.isAddition
      }
      return str
    }
  },
  {
    prop: 'notEvaluatedReason',
    label: '无法评级原因',
    li8n: 'SPR_FRM_CBPJ_WFPJYY',
    width: 120,
    tooltip: true
  }
]
