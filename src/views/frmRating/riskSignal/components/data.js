/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import { getDictByCode } from "@/api/dictionary";
// 数据字典查询
export const tableTitle = [
  { props: 'tsPpSupplierName', name: '风险供应商', key: 'SPR_FRM_FXXH_FXGYS', tooltip: true, width: 150 },
  { props: 'content', name: '内容', key: 'SUPPLIER_NEIRONG', tooltip: true },
  { props: 'signalFrom', name: '信号来源', key: 'SPR_FRM_FXXH_XHLY', tooltip: true },
  { props: 'relativeDept', name: '反馈部门', key: 'SPR_FRM_FXXH_FKBM', tooltip: true },
  { props: 'supplyingRelationshipName', name: '供货关系', key: 'SPR_FRM_FXXH_GHGX', tooltip: true },
  { props: 'processTypeName', name: '处置方式', key: 'SPR_FRM_FXXH_CZFS', tooltip: true },
  { props: 'furtherRatingResult', name: '深评结果', key: 'SPR_FRM_DEP_DEPRESULT', tooltip: true },
  { props: 'riskBigTypeName', name: '风险信号-大类', key: 'SPR_FRM_FXXH_FXXHDL', tooltip: true, width: 130 },
  { props: 'riskSmallTypeName', name: '风险信号-小类', key: 'SPR_FRM_FXXH_FXXHXL', tooltip: true, width: 130 },
  { props: 'isBreak', name: '是否违约', key: 'SPR_FRM_FXXH_SFWY', tooltip: true },
  { props: 'signalAuthorZh', name: '提交人', key: 'SPR_FRM_FXXH_TJR', tooltip: true },
  { props: 'submitDept', name: '提交人科室', key: 'SPR_FRM_FXXH_TJRKS', tooltip: true },
  { props: 'submitDateTime', name: '提交时间', key: 'SPR_FRM_FXXH_TJSJ', tooltip: true },
  { props: 'processDate', name: '处置时间', key: 'SPR_FRM_FXXH_CZSJ', tooltip: true },
  { props: 'statusName', name: '状态', key: 'SPR_FRM_DEP_STATE', tooltip: true },
  { props: 'principalZh', name: '负责人', key: 'LK_FUZEREN', tooltip: true },
  { props: 'progress', name: '进展', key: 'SPR_FRM_FXXH_JZ', tooltip: true },
  { props: 'effectiveDate', name: '有效期时间', key: 'SPR_FRM_FXXH_YXQSJ', tooltip: true },
  { props: 'oldRiskSignalId', name: '原始风险供应商', key: 'SPR_FRM_FXXH_YSFXGYS', tooltip: true, width: 150 },
]
export const riskTableTitle = [
  { props: 'nameZh', name: '供应商名称', key: 'LK_GONGYINGSHANGMINGCHENG', tooltip: true, },
  { props: 'sapCode', name: 'SAP号', key: 'SUPPLIER_SAPHAO', tooltip: true },
  { props: 'socialcreditNo', name: '统一社会信用代码', key: 'SUPPLIER_TONGYISHEHUIXINGYONGDAIMA', tooltip: true },
]
export const dictByCode = async function(key) {
  let dicResult = []
  let res = await getDictByCode(key)
  if (res.data) {
    res.data.filter(result => {
      if (result.code === key) {
        dicResult = result.subDictResultVo || []
      }
    })
    return dicResult
  }
}
export const baseRules = {
  tsPpSupplierName: [
    { required: true, message: '请输入风险供应商', trigger: 'blur' },
  ],
  riskBigType: [
    { required: true, message: '请选择风险信号大类', trigger: 'change' },
  ],
  riskSmallType: [
    { required: true, message: '请选择风险信号小类', trigger: 'change' },
  ],
  adjustScore: [
    {
      required: false, message: '请输入正确的格式', trigger: 'blur',
      pattern: /^[1-9]\d*$/,
    },
  ],
}