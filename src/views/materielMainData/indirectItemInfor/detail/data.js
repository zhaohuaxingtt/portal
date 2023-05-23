// import { iInput } from "@/components"
import lefSelect from './components/leftSelect.vue'
import rightInput from './components/rightInput.vue'
import showLeftText from './components/showLeftText.vue'
import showRightText from './components/showRightText.vue'

export const measurementTable = [
  {
    type: 'index',
    label: '序号',
    i18n: '序号',
    width: 100
  },
  {
    prop: 'nameZh',
    label: '常用计量单位',
    tooltip: true,
    i18n: '常用计量单位',
    customRender: (h, scope, column, extraData) => {
      return (
        <showLeftText
          row={scope.row}
          selections={extraData.unitoptions}
        ></showLeftText>
      )
    }
  },
  {
    prop: 'numeratorValue',
    required: true,
    tooltip: true,
    i18n: '计量单位转换关系',
    label: '计量单位转换关系',
    customRender: (h, scope, column, extraData) => {
      return (
        <showRightText
          rightInput
          row={scope.row}
          materielUnit={extraData.materielUnit}
        ></showRightText>
      )
    }
  }
]
export const itemLabel = {
  materialNo: '物料号',
  materialNameZh: '物料名称中文名',
  materialNameDe: '物料名称德文名',
  manufacturer: '制造商',
  model: '规格型号',
  unitIdName: '单位',
  brand: '品牌',
}
export const measureEdit = [
  {
    type: 'selection',
    width: '50'
  },
  {
    type: 'index',
    label: '序号',
    width: '100',
    i18n: '序号',
  },
  {
    prop: 'targetUnitId',
    label: '常用计量单位',
    tooltip: true,
    i18n: '常用计量单位',
    customRender: (h, scope, column, extraData) => {
      return (
        <lefSelect
          row={scope.row}
          selections={extraData.unitoptions}
        ></lefSelect>
      )
    }
  },
  {
    prop: 'converseRate',
    label: '计量单位转换关系',
    required: true,
    tooltip: true,
    i18n: '计量单位转换关系',
    customRender: (h, scope, column, extraData) => {
      return <rightInput row={scope.row} extraData={extraData}></rightInput>
    }
  }
]