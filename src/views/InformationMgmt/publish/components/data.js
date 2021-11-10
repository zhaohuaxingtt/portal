// 全体用户，（即所有在CS组织下的用户），（有工号字段的用户），，，，，（即SAP号非空的生产采购用户），，，，，，，，

import CellContent from '../../template/components/cellContent'

export const PUBLISH_SCOPE_OPTIONS = [
  {
    label: '全体用户',
    value: 1
  },
  {
    label: '全体采购员工用户',
    value: 2
  },
  {
    label: '全体内部员工用户',
    value: 3
  },
  {
    label: '全体供应商用户',
    value: 4
  },
  {
    label: '全体供应商主联系人用户',
    value: 5
  },
  {
    label: '全体生产采购供应商用户',
    value: 6
  },
  {
    label: '全体生产采购供应商主联系人用户',
    value: 7
  },
  {
    label: '全体生产采购正式供应商用户',
    value: 8
  },
  {
    label: '全体生产采购正式供应商主联系人用户',
    value: 9
  },
  {
    label: '全体一般采购供应商用户',
    value: 10
  },
  {
    label: '全体一般采购供应商主联系人用户',
    value: 11
  },
  {
    label: '全体一般采购正式供应商用户',
    value: 12
  },
  {
    label: '全体一般采购正式供应商主联系人用户',
    value: 13
  },
  {
    label: '全体N_Tier供应商用户',
    value: 14
  },
  {
    label: '全体N_Tier供应商主联系人用户',
    value: 15
  },
  {
    label: '自定义',
    value: 999
  }
]

export const HISTORY_COLUMNS = [
  {
    type: 'selection'
  },
  {
    type: 'index',
    width: 50
  },
  {
    label: '消息编号',
    i18n: '消息编号',
    prop: 'code'
  },
  {
    label: '消息名称',
    i18n: '消息名称',
    prop: 'name',
    emit: 'go-detail',
    openNewPage:true,
    // minWidth:'150px',
    tooltip:true,
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.name}</span>
    }
  },
  {
    label: '消息内容',
    i18n: '消息内容',
    prop: 'richContent',
    tooltip: true,
    width: 200,
    customRender: (h, scope) => {
      return <CellContent content={scope.row.richContent} />
    }
  },
  {
    label: '消息标题',
    i18n: '消息标题',
    prop: 'title'
  },
  {
    label: '消息类型',
    i18n: '消息类型',
    prop: 'type',
    customRender: (h, scope, column, extraData) => {
      if (scope.row.type) {
        return extraData.templateTypeMap[scope.row.type + '']
      }
      return scope.row.type
    }
  },
  {
    label: '发布时间',
    i18n: '发布时间',
    prop: 'pubdate'
  },
  {
    label: '发布人',
    i18n: '发布人',
    prop: 'creator'
  },
  {
    label: '发布对象',
    i18n: '发布对象',
    prop: 'scope',
    customRender: (h, scope, column, extraData) => {
      if (scope.row.scope === 999) {
        return scope.row.userNames
      }
      if (scope.row.scope) {
        return extraData.publishScopeMap[scope.row.scope + '']
      }
      return scope.row.scope
    }
  }
]
