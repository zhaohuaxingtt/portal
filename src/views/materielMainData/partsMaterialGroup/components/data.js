// import { iSelect } from "@/components"
import BDLSelect from "./BDLSelect.vue"
import CBDSelect from "./CBDSelect.vue"
import presetSelect from "./presetSelect.vue"
import describeInput from "./describeInput.vue"
import measureIselect from "./measureIselect.vue"
export const PART_MATERIAL_COLUMNS = [
  {
    type:'selection',
    width:50
  },
  {
    type:'index',
    width:50
  },
  {
    prop:"categoryCode",
    label:'材料组编号',
    tooltip:true,
    minWidth:'50px',
    openNewPage: true,
    i18n: '',
    emit: 'goDetail',
    customRender: (h, scope) =>{
      return (
        <span class='open-link-text'>
          {scope.row.categoryCode}
        </span>
      )
    }
  },
  {
    prop:"categoryNameZh",
    label:'材料组名称',
    tooltip:true,

    i18n: '',
    
  },
  {
    prop:"categoryMemo",
    label:'材料组说明',
    tooltip:true,

    i18n: ''
  },
  {
    prop:"linieNames",
    label:'Linie',
    tooltip:true,

    i18n: ''
  },
  {
    prop:"deptCodes",
    label:'Linie科室',
    tooltip:true,

    i18n: ''
  },
]

export const TECHNOLOGY_COLUMNS = [
  {
    type:'selection',
    width:50
  },
  {
    type:'index',
    width:50,
    label:'序号'
  },
  {
    prop:"stuffCode",
    label:'工艺组编号',
    tooltip:true,
    minWidth:'50px',
    openNewPage: true,
    i18n: '',
    emit: 'goDetail',
    customRender: (h, scope) =>{
      return (
        <span class='open-link-text'>
          {scope.row.stuffCode }
        </span>
      )
    }
  },
  {
    prop:"stuffName",
    label:'工艺组名称',
    tooltip:true,

    i18n: '',
  },
  {
    prop:"stuffNameDe",
    label:'工艺组名称(德)',
    tooltip:true,

    i18n: ''
  },
  {
    prop:"stuffMemo",
    label:'工艺组说明',
    tooltip:true,

    i18n: ''
  },
]
export const SUPPLIER_TECHNOLOGY = [
  {
    type:'selection',
    width:50
  },
  {
    type:'index',
    width:50,
    label:'序号'
  },
  {
    prop:"supplierName",
    label:'供应商',
    tooltip:true,
    i18n: ''
  },
  {
    label:'SAP号',
    prop:'sapCode',
    tooltip:true
  },
  {
    label:'SVW号',
    prop:'svwCode',
    tooltip:true
  },
  {
    label:'临时号',
    prop:'svwTempCode',
    tooltip:true
  },
  {
    prop:"bdlType",
    label:'BDL属性',
    tooltip:true,
    i18n: '',
    customRender: (h, scope, column, extraData) => {
      if(extraData.tabelSta){
        return (
          <BDLSelect row={scope.row} bdlOption={extraData.bdlOption}>
          </BDLSelect>
        )
      }else if(scope.row.createBy){
        return scope.row.bdlType
      }else{
        return (
          <BDLSelect row={scope.row} bdlOption={extraData.bdlOption}>
          </BDLSelect>
        )
      }
    }
  },
  {
    prop:"cbdLevel",
    label:'CBD要求',
    i18n: '',
    tooltip:true,
    customRender: (h, scope, column, extraData) => {
      let level = ''
      if(extraData.tabelSta){
        return (
          <CBDSelect row={scope.row} cdlOption={extraData.cdlOption}>
          </CBDSelect>
        )
      }else if(scope.row.createBy){
        if(scope.row.cbdLevel == 1){
          level = 'L1'
        }else if(scope.row.cbdLevel == 2){
          level = 'L2'
        }else if(scope.row.cbdLevel == 3){
          level = 'L3'
        }
        return level
      }else{
        return (
          <CBDSelect row={scope.row} cdlOption={extraData.cdlOption}>
          </CBDSelect>
        )
      } 
    }
  },
]

export const CBD_PRESET = [
  {
    type:'selection',
    width:50
  },
  {
    type:'index',
    width:50,
    label:'序号'
  },
  {
    prop:"presetType",
    label:'预设项类别',
    tooltip:true,
    i18n: '',
    customRender: (h, scope, column, extraData) => {
      const {editTable, cbdPreseMap, cbdPreseOptions,restaurants} = extraData
      if( editTable) {
        return(
          <presetSelect row={scope.row} cbdPrese={cbdPreseOptions } restaurant={restaurants}  />
        )
      }
      if(!scope.row.id){
        return(
          <presetSelect row={scope.row} cbdPrese={cbdPreseOptions} restaurant={restaurants}/>
        )
      }
      return  cbdPreseMap[scope.row.presetType]  || ''
    }
  },
  {
    prop:"describe",
    label:'描述',
    tooltip:true,
    i18n: '',
    customRender: (h, scope, column, extraData) => {
      if(extraData.editTable) {
        return(
          <describeInput row={scope.row} restaurants={extraData.restaurants}/>
        )
      }
      if(!scope.row.id){
        return(
          <describeInput row={scope.row} restaurants={extraData.restaurants}/>
        )
      }
      return scope.row.describe
    }
  },
  {
    prop:"unitCode",
    label:'计量单位',
    tooltip:true,

    i18n: '',
    customRender: (h, scope, column, extraData) => {
      const { editTable,unitMap,unitOptions} = extraData
      if(editTable) {
        return(
          <measureIselect row={scope.row} unitOptions={unitOptions} />
        )
      } 
      if(!scope.row.id){
        return(
          <measureIselect row={scope.row} unitOptions={unitOptions} />
        )
      }
      return unitMap[scope.row.unitCode] || ''
    }
  },
 ]
export const SUPPLIER_CHOOSE = [
  {
    type:'selection',
    width:50
  },
  {
    type:'index',
    width:50,
    label:'序号'
  },
  {
    prop:"nameZh",
    label:'供应商中文名',
    tooltip:true,

    i18n: ''
  },
  {
    prop:"nameEn",
    label:'供应商英文名',
    tooltip:true,

    i18n: ''
  },
  {
    prop:"sapCode",
    label:'SAP号',
    tooltip:true,
    i18n: ''
  },
  {
    prop:"svwCode",
    tooltip:true,

    label:'SVW号',
    i18n: ''
  },
  {
    prop:"svwTempCode",
    label:'临时号',
    tooltip:true,
    i18n: ''
  },
  {
    prop:"supplierType",
    label:'供应商类型',
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
    i18n: ''
  },
  {
    prop:"formalStatus",
    label:'供应商身份',
    tooltip:true,
    i18n: '',
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
export const PART_MATERIAL_DATA = {
  categoryCode:'',
  categoryName:'',
  deptNames:'',
  linieNames:'',
  isFixAsset:'',
  sixPartNum:'',
}

export const  MATERIAL_LABEL = {
  categoryCode: '材料组编号',
  categoryName: '材料组名称',
  dept: 'Linie科室',
  linie: 'Linie',
  isFixAsset: '入账是否抽查',
  sixPartNum: '零件六位号',
  inputPlaceholder: '请输入',
  iSelectPlaceholder: '请选择'
}
