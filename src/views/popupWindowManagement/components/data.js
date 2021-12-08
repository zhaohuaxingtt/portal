export const TABLE_COLUMNS = [
    {
        type:'selection',
        width:50
    },
    {
      i18n:'序号',
        type:'index',
        width:100
    },
    {
      i18n:'弹窗编码',
        prop:'id',
        width:400
    },
    {
      i18n:'弹窗标题',
        prop:'popupName',
        // width:'400px',
        tooltip:true
    },
    {
      i18n:'弹窗说明',
        prop:'content',
        // width:'500px',
        tooltip:true,
    },
    {
        i18n:'发送时间',
        // prop:'publishTime',//publishPreTime
        customRender:(h,scope)=>{
          if(scope.row.publishTime){
            return scope.row.publishTime
          }else{
            return scope.row.publishPreTime
          }
        }
    }
]

export const INI_SEARCH_FORM={
    content:'',
    sendDate:'',
    popupName:''
}

export const PUBLISH_SCOPE_OPTIONS = [
    {
      label: '全体用户',
      value: 0
    },
    {
      label: '全体采购员工用户',
      value: 1
    },
    {
      label: '全体内部员工用户',
      value: 2
    },
    {
      label: '全体供应商用户',
      value: 3
    },
    {
      label: '全体供应商主联系人用户',
      value: 4
    },
    {
      label: '全体生产采购供应商用户',
      value: 5
    },
    {
      label: '全体生产采购供应商主联系人用户',
      value: 6
    },
    {
      label: '全体生产采购正式供应商用户',
      value: 7
    },
    {
      label: '全体生产采购正式供应商主联系人用户',
      value: 8
    },
    {
      label: '全体一般采购供应商用户',
      value: 9
    },
    {
      label: '全体一般采购供应商主联系人用户',
      value: 10
    },
    {
      label: '全体一般采购正式供应商用户',
      value: 11
    },
    {
      label: '全体一般采购正式供应商主联系人用户',
      value: 12
    },
    {
      label: '全体N_Tier供应商用户',
      value: 13
    },
    {
      label: '全体N_Tier供应商主联系人用户',
      value: 14
    },
    {
      label: '自定义',
      value: 15
    }
]

export const SUPPLIER_TABLE_COLUMNS =[
  {
    type:'selection',
    width:50
  },
  {
    type:'index',
    width:50,
    i18n:'序号'
  },
  {
    prop:"nameZh",
    i18n:'供应商中文名',
    tooltip:true,
  },
  {
    prop:"nameEn",
    label:'供应商英文名',
    tooltip:true,

    i18n: ''
  },
  {
    prop:"sapCode",
    i18n:'SAP号',
    tooltip:true,
  },
  {
    prop:"svwCode",
    tooltip:true,

    i18n:'SVW号',
  },
  {
    prop:"svwTempCode",
    i18n:'临时号',
    tooltip:true,
  },
  {
    prop:"supplierType",
    i18n:'供应商类型',
    tooltip:true,
    customRender:(h,scope)=>{
      if(scope.row.supplierType){
        if(scope.row.supplierType == 'GP'){
          return '一般'
        }else if(scope.row.supplierType == 'PP'){
          return '生产'
        }else if(scope.row.supplierType == 'PD'){
          return '共用'
        }else{
          return ''
        }
      }else{
        return ''
      }
      
    },
  },
  {
    prop:"formalStatus",
    i18n:'供应商身份',
    tooltip:true,
    customRender:(h,scope)=>{
      if(scope.row.formalStatus){
        if(scope.row.formalStatus == 0){
          return '临时'
        }else if(scope.row.formalStatus == 1){
          return '正式'
        }else if(scope.row.formalStatus == 2){
          return '蓄水池'
        }else{
          return <span>{scope.row.formalStatus}</span>
        }
      }else{
        return ''
      }
    }
  },
]