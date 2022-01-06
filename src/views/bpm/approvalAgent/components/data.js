export const TABLE_COLUMNS = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 50
  },
  {
    prop: 'agentId',
    label: '代理号',
    i18n: '代理号',
    width: '200',
    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.businessId}</span>
    },
    emit: 'go-detail'
  },
  {
    prop: 'assigneeName',
    label: '授权人',
    i18n: '授权人',
    customRender: (h, scope) => {
      const res = []
      if (scope.row.assigneeEmpNo) {
        res.push(scope.row.assigneeEmpNo)
      }
      if (scope.row.assigneeName) {
        res.push(scope.row.assigneeName)
      }
      return res.join(' ')
    }
  },
  {
    prop: 'attorneyName',
    label: '代理人',
    i18n: '代理人',
    customRender: (h, scope) => {
      const res = []
      if (scope.row.attorneyEmpNo) {
        res.push(scope.row.attorneyEmpNo)
      }
      if (scope.row.attorneyName) {
        res.push(scope.row.attorneyName)
      }
      return res.join(' ')
    }
  },
  {
    prop: 'startTime',
    label: '代理开始时间',
    i18n: '代理开始时间',
    customRender: (h, scope) => {
      if (scope.row.startTime) {
        return moment(scope.row.startTime).format('YYYY-MM-DD')
      }
      return ''
    }
  },
  {
    prop: 'endTime',
    label: '代理结束时间',
    i18n: '代理结束时间',
    customRender: (h, scope) => {
      if (scope.row.endTime) {
        return moment(scope.row.endTime).format('YYYY-MM-DD')
      }
      return ''
    }
  },
  {
    prop: 'status',
    label: '是否有效',
    i18n: '是否有效',
    customRender: (h, scope) => {
      const { status } = scope.row
      return status ? '是' : '否'
    }
  },
  {
    prop: 'cancelTime',
    label: '取消代理时间',
    i18n: '取消代理时间',
    customRender: (h, scope) => {
      if (scope.row.cancelTime) {
        return moment(scope.row.cancelTime).format('YYYY-MM-DD')
      }
      return ''
    }
  }
]

export const AGENT_TYPES = [
  {
    value: 1,
    label: '会议代理'
  }
]

export const AGENT_STSTUESES = [
  {
    value: null,
    label: '全部'
  },
  {
    value: true,
    label: '有效'
  },
  {
    value: false,
    label: '无效'
  }
]

export const SEARCH_DATA = {
  assignee: '',
  attorney: '',
  status: '',
  category: ''
}

export const CHOOSE_STAFF_COLUMNS = [
  {
    type: 'selection',
    width: 50
  },
  {
    prop: 'staffNo',
    label: '员工号',
    i18n: '员工号'
  },
  {
    prop: 'name',
    label: '姓名',
    i18n: '姓名'
  },
  {
    prop: 'dept',
    label: '所属部门',
    i18n: '所属部门'
  },
  {
    prop: 'mobile',
    label: '手机',
    i18n: '手机'
  },
  {
    prop: 'tel',
    label: '电话',
    i18n: '电话'
  }
]

export const TEST_STAFF_DATA = [
  {
    staffNo: '1212',
    name: '小小',
    dept: '部门1',
    mobile: '13423231212',
    tel: '023-23239394'
  },
  {
    staffNo: '1212',
    name: '小小',
    dept: '部门1',
    mobile: '13423231212',
    tel: '023-23239394'
  }
]

export const CHOOSE_STAFF_SEARCH_FORM = {
  staffNo: '',
  name: '',
  dept: ''
}
