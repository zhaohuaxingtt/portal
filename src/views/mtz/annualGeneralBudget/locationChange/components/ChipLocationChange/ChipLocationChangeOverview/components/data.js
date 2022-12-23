// 芯片变更查询
export const searchFormData = [
  { props: 'changeNos', name: '申请单号', key: 'SHENQINGDANHAO' },
  { props: 'statusList', name: '申请状态', key: 'SHENQINGZHUANGTAI', type: 'select', selectOption: 'statusList', multiple: true },
  { props: 'makeType', name: '补差类型', key: '补差类型', type: 'select', selectOption: 'makeTypeList' },
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO', type: "iMultiLineInput" },
  { props: 'deptCodes', name: '科室', key: 'KESHI', type: 'select', selectOption: 'deptList', multiple: true },
  { props: 'linieIds', name: '采购员', key: 'CAIGOUYUAN', type: 'select', selectOption: 'linieList', multiple: true },
  { props: 'resolutionPassTime', name: '审批完成时间', key: '审批完成时间', type: 'daterange' },
]