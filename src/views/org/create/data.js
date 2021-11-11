import { iSelect } from 'rise'
import dimensionLeftSelect from './components/dimensionLeftSelect'
import dimensionRightSelect from './components/dimensionRightSelect'

export const tableSetting = [
  {
    type: 'selection',
    width: '50'
  },
  {
    label: '序号',
    key: '',
    width: '100px',
    tooltip: false,
    align: 'center',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_CREATE.TABLE_INDEX',
    type: 'index'
  },
  {
    prop: 'dimension',
    label: '维度',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_CREATE.TABLE_DIMENSION',
    width: '278px',
    key: '',
    tooltip: false,
    align: 'center',
    customRender: (h, scope, column, extraData) => {
      return (
        <dimensionLeftSelect
          row={scope.row}
          dimensionLeftMenu={extraData.dimensionLeftMenu}
        />
      )
    }
  },
  {
    prop: 'dimensionContent',
    label: '内容',
    i18n: 'ORGANIZATION_MANAGERMENT.ORG_CREATE.TABLE_DESC',
    key: '',
    tooltip: false,
    align: 'center',
    customRender: (h, scope, column, extraData) => {
      return (
        <dimensionRightSelect
          row={scope.row}
          dimensionRightMenu={extraData.dimensionRightMenu}
        />
      )
    }
  }
]

export const dimensionList = []

export const orgLevelList = [
  {
    levelName: 'K1',
    levelID: '1'
  },
  {
    levelName: 'K2',
    levelID: '2'
  },
  {
    levelName: 'K3',
    levelID: '3'
  }
]

//是否 选项
export const trueFalseList = [
  { label: '是', value: true },
  { label: '否', value: false }
]

export const defaultValue = {
  parentId: '', //所属组织部门ID
  parentName: '',
  superDeptId: '', //上级部门id
  subDeptId: '', //下级部门id
  fullCode: '', //组织机构编码
  nameZh: '', //组织机构名称（中）
  nameEn: '', //组织机构名称（英）
  level: '', //组织级别
  svcdCode: '', //SVCD组织编码
  description: '', //组织描述
  tagList: [], //组织标签
  isVisible: '', //是否显示在组织树
  isCommodity: '', //是否为Commodity
  syncStatus: '', //是否同步svcd
  logoName: '', //部门logo名字
  supDeptList: [], //下级组织
  remark: null //备注
}
