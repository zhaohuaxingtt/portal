/*
 * @Author: moxuan
 * @Date: 2021-05-21 20:08:08
 * @Description: 初步评级
 */

export const tableTitle = [
  { props: 'sapCode', name: 'SAP号', key: 'SUPPLIER_SAPHAO' },
  {
    props: 'nameZh',
    name: '供应商名称',
    key: 'LK_GONGYINGSHANGMINGCHENG',
    width: 200,
    tooltip: true
  },
  {
    props: 'qualitativeScoreStatus',
    name: '状态',
    key: 'LK_ZHUANGTAI',
    tooltip: true
  },
  { props: 'versionNum', name: '版本', key: 'SPR_FRM_CBPJ_BB', tooltip: true },
  {
    props: 'createDate',
    name: '评分发出时间',
    key: 'SPR_FRM_CBPJ_PFFCSJ',
    tooltip: true
  },
  {
    props: 'qualitativeReturnDate',
    name: '评分返回时间',
    key: 'SPR_FRM_CBPJ_PFFHSJ',
    tooltip: true
  },
  { props: 'sectionName', name: '负责科室', key: 'FUZEKESHI', tooltip: true },
  {
    props: 'operateContent',
    name: '最新操作',
    key: 'SPR_FRM_CBPJ_ZXCZ',
    tooltip: true
  },
  { props: 'view', name: '操作记录', key: 'SPR_FRM_CBPJ_CZJL', tooltip: true },
  { props: 'nr', name: 'Nr.', width: 50, tooltip: true },
  {
    props: 'returnReason',
    name: '退回理由',
    key: 'SPR_FRM_CBPJ_THLY',
    tooltip: true
  }
]

export const scroingTitle = [
  {
    props: 'nameZh',
    name: '供应商名称',
    key: 'LK_GONGYINGSHANGMINGCHENG',
    width: 120,
    tooltip: true
  },
  { props: 'dept', name: '负责科室', key: 'FUZEKESHI', tooltip: true },
  {
    props: 'policyImpact',
    name: '政策对行业的影响',
    key: 'SPR_FRM_CBPJ_ZCDHYDYX',
    width: 150,
    required: true,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'industryDemandStatus',
    name: '行业供求状况',
    key: 'SPR_FRM_CBPJ_HYGQZK',
    width: 150,
    required: true,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'managementStandardDegree',
    name: '管理规范程度',
    key: 'SPR_FRM_CBPJ_GLGFCD',
    width: 150,
    required: true,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'projectManagementSkill',
    name: '项目管理能力',
    key: 'SPR_FRM_CBPJ_XMGLNL',
    width: 150,
    required: true,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'industryReputation',
    name: '行业口碑',
    key: 'SPR_FRM_CBPJ_HYDB',
    width: 150,
    required: true,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'mainCustomerStrength',
    name: '主要客户实力',
    key: 'SPR_FRM_CBPJ_ZYKHSL',
    width: 150,
    required: true,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'mainCustomerStableCooperation',
    name: '与主要客户合作稳定性',
    key: 'SPR_FRM_CBPJ_YZYKHHZWDX',
    width: 150,
    required: true,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'mainSupplierStrength',
    name: '主要供应商实力',
    key: 'SPR_FRM_CBPJ_ZYGYSSL',
    width: 150,
    required: true,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'mainSupplierStableCooperation',
    name: '与主要供应商合作稳定性',
    key: 'SPR_FRM_CBPJ_YZYGYSHZWDX',
    width: 170,
    required: true,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'contractCompliance',
    name: '合同履行情况',
    key: 'SPR_FRM_CBPJ_HTLXQK',
    width: 150,
    required: true,
    rule: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    props: 'updateDate',
    name: '最近更新时间',
    key: 'SPR_FRM_CBPJ_ZJGXSJ',
    width: 150
  },
  {
    props: 'updateByName',
    name: '最近更新人',
    key: 'SPR_FRM_CBPJ_ZJGXR',
    width: 150
  }
]

export const operationRecordTableTitle = [
  { props: 'operateContent', name: '操作', key: 'SUPPLIER_CAOZUO' },
  { props: 'deptName', name: '操作科室', key: 'SPR_FRM_CBPJ_CZKS' },
  { props: 'operatorName', name: '操作人', key: 'LK_CAOZUOREN' },
  { props: 'createDate', name: '操作时间', key: 'LK_UpdateDate' }
]
