import ActionRow from './actionRow'
//todo key 中英文显示。
export const tableColumns = [
  {
    type: 'selection',
    width: 50
  },
  {
    prop: 'serialNo',
    label: '流程序号',
    i18n: 'APPROVAL.FLOW_NO',
    tooltip: false,
    customRender: (h, scope) => {
      const res = []
      if (scope.row.modelId) {
        res.push(scope.row.modelId)
      }
      if (scope.row.serialNo) {
        res.push(scope.row.serialNo)
      }
      return res.join('-')
    }
  },
  {
    prop: 'modelName',
    label: '流程标题',
    i18n: 'APPROVAL.FLOW_NAME',
    tooltip: true,
    openNewPage: true,
    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.modelName}</span>
    },
    emit: 'go-detail'
  },
  {
    prop: 'createBy',
    label: '创建者',
    i18n: 'APPROVAL.CREATE_BY',
    tooltip: false
  },
  {
    prop: 'createDate',
    label: '创建时间',
    i18n: 'APPROVAL.CREATE_TIME',
    tooltip: false
  },
  {
    prop: 'status',
    label: '流程状态',
    i18n: 'APPROVAL.FLOW_STATUS',
    tooltip: false
  },
  {
    prop: 'description',
    label: '流程说明',
    i18n: 'APPROVAL.FLOW_DESCRIPTION',
    tooltip: false
  }
]

//流程模块管理列表入参
export const searchForm = {
  creater: '',
  modelName: '',
  serialNo: '',
  status: 0
}

export const templateStatus = [
  {
    value: '',
    label: '全部'
  },
  {
    value: 0,
    label: '有效'
  },
  {
    value: 1,
    label: '无效'
  },
  {
    value: 2,
    label: '草稿'
  }
]

//todo key 中英文显示。
export const testColumns = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'fullIndex',
    width: 50
  },
  {
    prop: 'id',
    label: '流程序号',
    i18n: 'APPROVAL.FLOW_NO',
    tooltip: false,
    headerAlign: 'center',
    align: 'left',
    type: 'expanded'
  },
  {
    prop: 'name',
    label: '创建者',
    i18n: 'APPROVAL.CREATE_BY',
    align: 'left',
    tooltip: false,

    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.name}</span>
    }
  }
]

export const testData = [
  {
    id: 1,
    name: 1,
    children: []
  },
  {
    id: 2,
    name: 2,
    children: [
      {
        id: 21,
        name: 12
      },
      {
        id: 22,
        name: 22,
        children: [
          {
            id: 221,
            name: 221
          },
          {
            id: 222,
            name: 222
          },
          {
            id: 223,
            name: 223
          },
          {
            id: 224,
            name: 224
          }
        ]
      },
      {
        id: 23,
        name: 23
      },
      {
        id: 24,
        name: 24
      }
    ]
  },
  {
    id: 3,
    name: 3
  },
  {
    id: 4,
    name: 4
  }
]

export const form = {
  modelName: '',
  description: '',
  status: 0,
  url: '',
  formNo: ''
}

export const templateFormStatus = [
  {
    value: 0,
    label: '有效'
  },
  {
    value: 1,
    label: '无效'
  },
  {
    value: 2,
    label: '草稿'
  }
]

export const formUrlColumns = [
  {
    prop: 'name',
    label: '表单名称',
    width: 200,
    tooltip: false
  },
  {
    prop: 'value',
    label: 'Url',
    tooltip: false
  },
  {
    prop: 'value',
    label: '#',
    tooltip: false,
    emit: 'handle-select-url',
    width: '70',
    customRender: h => {
      return <span class="open-link-text">选择</span>
    }
  }
]

// 岗位选择
export const choosePositionForm = {
  postCode: '',
  postName: '',
  postUser: ''
}

export const choosePositionRelation = {
  relationPost: '',
  orgLevel: ''
}

export const choosePositionColumns = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    i18n: 'APPROVAL.NO',
    width: 60
  },
  {
    prop: 'positionCode',
    i18n: 'POSITION.POSITION_CODE',
    label: '岗位编码'
  },
  {
    prop: 'positionName',
    i18n: 'POSITION.POSITION_NAME',
    label: '岗位全称'
  },
  {
    prop: 'positionUser',
    i18n: 'POSITION.POSITION_USER',
    label: '岗位人员'
  }
]

export const choosePositionTable = [
  {
    positionCode: 'CSX-1101',
    positionName: '车灯采购经理',
    positionUser: '人员1',
    id: 1
  },
  {
    positionCode: 'CSX-1101',
    positionName: '车灯采购经理',
    positionUser: '人员2，人员3',
    id: 2
  },
  {
    positionCode: 'CSX-1101',
    positionName: '车灯采购经理',
    positionUser: '人员4，人员5',
    id: 3
  }
]
