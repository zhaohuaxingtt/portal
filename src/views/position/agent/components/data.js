import language from "@/utils/language"

export const choosePositionForm = {
  code: '',  //岗位编码
  fullNameZh: '', //岗位名称
  users: '', //岗位人员
}

export const choosePositionColumns = [
  // {
  //   type: 'selection',
  //   width: 50,
  // },
  {
    prop: 'id',
    i18n: 'APPROVAL.NO',
    width: 60,
  },
  {
    prop: 'code',
    i18n: 'POSITION.POSITION_CODE',
    label: '岗位编码',
  },
  {
    prop: 'fullNameZh',
    i18n: 'POSITION.POSITION_NAME',
    label: '岗位全称',
  },
  {
    prop: 'positionUser',
    i18n: 'POSITION.POSITION_USER',
    label: '岗位人员',
  },
  {
    i18n: 'APPROVAL.OPRATION',
    label: '选择',
    emit: 'select',
    customRender: (h, scope) => {
      return <iButton>{language('选择')}</iButton>
    },
  },
]

export const choosePositionTable = [
  {
    positionCode: 'CSX-1101',
    positionName: '车灯采购经理1',
    positionUser: '人员1',
    id: 1,
  },
  {
    positionCode: 'CSX-1102',
    positionName: '车灯采购经理2',
    positionUser: '人员2，人员3',
    id: 2,
  },
  {
    positionCode: 'CSX-1103',
    positionName: '车灯采购经理3',
    positionUser: '人员4，人员5',
    id: 3,
  },
]
