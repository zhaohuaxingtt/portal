// import { iInput } from "@/components"
import lefSelect from './components/leftSelect.vue'
import rightInput from './components/rightInput.vue'
import showLeftText from './components/showLeftText.vue'
import showRightText from './components/showRightText.vue'

export const measurementTable = [
    {
        type:'index',
        label:'序号',
        i18n:'序号'
    },
    {
        prop:'nameZh',
        label:'常用计量单位',
        tooltip:true,
        i18n:'常用计量单位',
        customRender:(h, scope, column, extraData) => {
            return (
                <showLeftText row={scope.row} selections={extraData.unitoptions}></showLeftText>
            )
        }
    },
    {
        prop:'numeratorValue',
        tooltip:true,
        i18n:'计量单位转换关系',
        label:'计量单位转换关系',
        customRender:(h, scope, column, extraData) =>{
            return (
                <showRightText rightInput row={scope.row} materielUnit={extraData.materielUnit}></showRightText>
            )
        }
    }
]
export const itemLabel= {
        number:'零件号',
        nameCh:'零件名称(中)',
        nameD:'零件名称(德)',
        sourceDesc:'零件来源',
        status:'零件状态',
        BMG:'BMG',
        ZP:'ZP',
        time:'图纸日期',
        FOP:'FOP',
        technicalSection:'技术部门',
        materielGroup:'零件材料组',
        commonSourcing:'common sourcing',
        ProfessionalGroup:'专业组',
        SET:'SET号',
        lasteTime:'最近一次修改时间'
}
export const measureEdit = [
    {
        type:'selection',
        width:'50'
    },
    {
        type:'index',
        label:'序号',
        width:'50',
        tooltip:true,
        i18n:'序号',
        customRender:(h,scope) =>{
            return scope.row.index
        }
    },
    {
        prop:'denominatorUnitId',
        label:'常用计量单位',
        tooltip:true,
        i18n:'常用计量单位',
        customRender:(h, scope, column, extraData) =>{
            return (
                <lefSelect row={scope.row} selections={extraData.unitoptions}></lefSelect>
            )
        }
    },
    {
        prop:'numeratorValue',
        label:'计量单位转换关系',
        tooltip:true,
        i18n:'计量单位转换关系',
        customRender:(h, scope, column, extraData) => {
            return (
                <rightInput row={scope.row} extraData={extraData}></rightInput>
            )
        }
    },
]
