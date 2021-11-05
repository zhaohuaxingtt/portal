/*
 * @Author: moxuan
 * @Date: 2021-05-24 20:08:08
 * @Description: 供应商初评情况
 */

//供应商信息
export const supplierInformationTitle = [
  {props: 'nameZh', name: '供应商名称', key: 'LK_GONGYINGSHANGMINGCHENG'},
  {props: 'svwTempCode', name: '临时号', key: 'SUPPLIER_LINGSHIHAO'},
  {props: 'sapCode', name: 'SAP号', key: 'SUPPLIER_SAPHAO'},
  {props: 'createDate', name: '初评时间', key: 'SPR_FRM_FRMGL_CPSJ'},
  {props: 'source', name: '数据来源', key: 'SPR_FRM_XGYSPJ_SJLY'},
  {props: 'svwCode', name: 'SVW号', key: 'LK_SWHAO'},
  {props: 'socialcreditNo', name: '统一社会信用代码', key: 'UnifySocialCreditCode'},
  {props: 'adjustmentScore', name: '调整前得分', key: 'SPR_FRM_CBPJ_TZQDF'},
  {props: 'afterAdjustScore', name: '调整后得分', key: 'SPR_FRM_CBPJ_TZHDF'},
  {props: 'totalMissingRate', name: '缺失率%', key: 'SPR_FRM_CBPJ_QSL'},
  {props: 'grade', name: '调整前评级', key: 'SPR_FRM_CBPJ_TZQPJ'},
  {props: 'afterGrade', name: '调整后评级', key: 'SPR_FRM_CBPJ_TZHPJ'},
];

//得分详细
export const detailedScoreTableTitle = [
  {props: 'indexName', name: '指标名称', key: 'SPR_FRM_CBPJ_ZBMC'},
  {props: 'preproccess', name: '指标数值', key: 'SPR_FRM_CBPJ_ZBSZ'},
  {props: 'score', name: '指标分值', key: 'SPR_FRM_CBPJ_ZBFZ'},
  {props: 'weight', name: '权重', key: 'SPR_FRM_XGYSPJ_QZ'},
  {props: 'weightedScore', name: '得分', key: 'SPR_FRM_XGYSPJ_DF'},
  {props: 'source', name: '得分来源', key: 'SPR_FRM_CBPJ_DFLY'},
  {props: 'isFill', name: '填补数值', key: 'SPR_FRM_CBPJ_TBSZ'},
  {props: 'isCautiousScore', name: '是否谨慎分', key: 'SPR_FRM_CBPJ_SFJSF'},
  {props: 'remark', name: '备注', key: 'LK_BEIZHU'},
];

//历史初评
export const initialCommentOnHistoryTableTitle = [
  {props: 'createDate', name: '评级时间', key: 'SPR_FRM_XGYSPJ_PJSJ'},
  {props: 'grade', name: '评级结果', key: 'SPR_FRM_XGYSPJ_PJJG'},
  {props: 'view', name: '评级明细', key: 'SPR_FRM_CBPJ_PJMX'},
  {props: 'effectFlag', name: '是否有效', key: 'SPR_FRM_CBPJ_SFYX'},
  {props: 'createBy', name: '评级人员', key: 'SPR_FRM_CBPJ_PJRY'},
];

//风险信号
export const riskSignalTableTitle = [
  {props: 'riskBigTypeName', name: '风险信号-大类', key: 'SPR_FRM_FXXH_FXXHDL'},
  {props: 'riskSmallTypeName', name: '风险信号-小类', key: 'SPR_FRM_FXXH_FXXHXL'},
  {props: 'adjustScore', name: '调整分', key: 'SPR_FRM_FXXH_TZF'},
  {props: 'createDate', name: '风险信号创建日期', key: 'SPR_FRM_FXXH_FXXHCJRQ'},
  {props: 'description', name: '信号说明', key: 'SPR_FRM_FXXH_XHSM'},
  {props: 'progress', name: '进展', key: 'SPR_FRM_FXXH_JZ'},
  {props: 'statusName', name: '状态', key: 'LK_ZHUANGTAI'},
];