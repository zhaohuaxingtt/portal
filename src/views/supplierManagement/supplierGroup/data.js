export const tableTitle = [
  { name: '供应商组中文名称', props: 'nameZh', key: '', },
  { name: '供应商组英文名称', props: 'nameEn', key: '', },
  { name: '科室', props: 'deptName', key: '', },
  { name: '更新人', props: 'updateByName', key: '', },
  { name: '更新日期', props: 'updateDate', key: '', },
]

export const searchList = [
  {label:'供应商组中文名称',labelKey:'',props:'supplierNameZh',type:'select',selectOption:'zhName',multiple:true,collapse:true,clearable:true,permissionKey:''},
  {label:'供应商组英文名称',labelKey:'',props:'supplierNameEn',type:'select',selectOption:'enName',multiple:true,collapse:true,clearable:true,permissionKey:''},
  {label:'供应商中文名称',labelKey:'',props:'nameZh',type:'input',permissionKey:''},
  {label:'供应商英文名称',labelKey:'',props:'nameEn',type:'input',permissionKey:''},
  {label:'临时号',labelKey:'',props:'supplierTempCode',type:'input',permissionKey:''},
  {label:'SVW号',labelKey:'',props:'supplierSvwCode',type:'input',permissionKey:''},
  {label:'SAP号',labelKey:'',props:'supplierSapCode',type:'input',permissionKey:''},
]

export const detailTitle = [
  { name: '临时号', props: 'supplierTempCode', key: '', },
  { name: 'SVW号', props: 'supplierSvwCode', key: '', },
  { name: 'SAP号', props: 'supplierSapCode', key: '', },
  { name: '供应商名称中文', props: 'supplierNameZh', key: '', },
  { name: '供应商名称英文', props: 'supplierNameEn', key: '', },
  { name: '科室', props: 'deptName', key: '', type: 'select' },
  { name: '更新人', props: 'updateByName', key: '', },
  { name: '更新日期', props: 'updateDate', key: '', },
]

export const addSearchList = [
  {label:'供应商类型',labelKey:'',props:'supplierType',type:'select',selectOption:'supplierType',multiple:true,collapse:true,clearable:true,permissionKey:''},
  {label:'供应商中文名称',labelKey:'',props:'supplierNameZh',type:'input',permissionKey:''},
  {label:'供应商英文名称',labelKey:'',props:'supplierNameEn',type:'input',permissionKey:''},
  {label:'临时号',labelKey:'',props:'supplierTempCode',type:'input',permissionKey:''},
  {label:'SVW号',labelKey:'',props:'supplierSvwCode',type:'input',permissionKey:''},
  {label:'SAP号',labelKey:'',props:'supplierSapCode',type:'input',permissionKey:''},
]

export const addTableTitle = [
  { name: '临时号', props: 'supplierTempCode', key: '', },
  { name: 'SVW号', props: 'supplierSvwCode', key: '', },
  { name: 'SAP号', props: 'supplierSapCode', key: '', },
  { name: '供应商中文名称', props: 'supplierNameZh', key: '', },
  { name: '供应商英文名称', props: 'supplierNameEn', key: '', },
  { name: '供应商类型', props: 'supplierType', key: '', },
]

export const fromRules = (vm) => ({
  zhong:[
    {required: true, message: vm.language('BITIAN','必填'), trigger: ["blur","change"]}
  ],
  ying:[
    {required: true, message: vm.language('BITIAN','必填'), trigger: ["blur","change"]}
  ],
  keshi:[
    {required: true, message: vm.language('BIXUAN','必选'), trigger: ["blur","change"]}
  ],
})