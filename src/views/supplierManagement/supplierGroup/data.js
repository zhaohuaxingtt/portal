export const tableTitle = [
  { name: '供应商组中文名称', props: 'zhong', key: '', },
  { name: '供应商组英文名称', props: '', key: '', },
  { name: '科室', props: '', key: '', },
  { name: '更新人', props: '', key: '', },
  { name: '更新日期', props: '', key: '', },
]

export const searchList = [
  {label:'供应商组中文名称',labelKey:'',props:'zhong',type:'select',selectOption:'zhName',multiple:true,collapse:true,clearable:true,permissionKey:''},
  {label:'供应商组英文名称',labelKey:'',props:'ying',type:'select',selectOption:'enName',multiple:true,collapse:true,clearable:true,permissionKey:''},
  {label:'供应商中文名称',labelKey:'',props:'cn',type:'input',permissionKey:''},
  {label:'供应商英文名称',labelKey:'',props:'en',type:'input',permissionKey:''},
  {label:'临时号',labelKey:'',props:'linshi',type:'input',permissionKey:''},
  {label:'SVW号',labelKey:'',props:'svw',type:'input',permissionKey:''},
  {label:'SAP号',labelKey:'',props:'sap',type:'input',permissionKey:''},
]

export const detailTitle = [
  { name: '临时号', props: 'col1', key: '', },
  { name: 'SVW号', props: 'col2', key: '', },
  { name: 'SAP号', props: 'col3', key: '', },
  { name: '供应商名称中文', props: 'zhong', key: '', },
  { name: '供应商名称英文', props: 'col5', key: '', },
  { name: '科室', props: 'col6', key: '', type: 'select' },
  { name: '更新人', props: 'col7', key: '', },
  { name: '更新日期', props: 'col8', key: '', },
]

export const addSearchList = [
  {label:'供应商类型',labelKey:'',props:'zhong',type:'select',selectOption:'supplierType',multiple:true,collapse:true,clearable:true,permissionKey:''},
  {label:'供应商中文名称',labelKey:'',props:'cn',type:'input',permissionKey:''},
  {label:'供应商英文名称',labelKey:'',props:'en',type:'input',permissionKey:''},
  {label:'临时号',labelKey:'',props:'linshi',type:'input',permissionKey:''},
  {label:'SVW号',labelKey:'',props:'svw',type:'input',permissionKey:''},
  {label:'SAP号',labelKey:'',props:'sap',type:'input',permissionKey:''},
]

export const addTableTitle = [
  { name: '临时号', props: 'zhong', key: '', },
  { name: 'SVW号', props: 'col2', key: '', },
  { name: 'SAP号', props: 'col3', key: '', },
  { name: '供应商中文名称', props: 'col4', key: '', },
  { name: '供应商英文名称', props: 'col5', key: '', },
  { name: '供应商类型', props: 'col6', key: '', },
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