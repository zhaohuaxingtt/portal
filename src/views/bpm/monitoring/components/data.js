export const FILTER_FORM = {
  processDefinitionKeys: '',
  businessId: '',
  applyUserId: '',
  procStatus: ''
}

export const STATUS_OPTIONS = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '正常运行',
    value: 10
  },
  {
    label: '已结束',
    value: 20
  },
  {
    label: '处理人无效',
    value: 30
  },
  {
    label: '运行异常',
    value: 40
  }
]

export const TABLE_COLUMS = [
  {
    type: 'customSelection'
  },
  {
    i18n: '流程序号',
    prop: 'instanceId',
    width: '100px',
    label: '流程序号',
    emit: 'go-detail',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row?.instanceId}</span>
    }
  },
  {
    prop: 'processDefinitionName',
    i18n: '流程名称',
    width:'340px',
    emit: 'go-template',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row?.processDefinitionName}</span>
    }
  },
  {
    prop: 'businessId',
    i18n: '申请号'
  },
  {
    prop: '',
    i18n: '申请人',
    width:100,
    customRender: (h, scope) => {
      return scope.row?.startUser?.nameZh
    }
  },
  {
    prop: 'applyDate',
    i18n: '创建时间'
  },
  {
    prop: 'procStatusMsg',
    i18n: '当前状态',
  },
  {
    prop: 'reason',
    i18n: '原因'
  }
]
