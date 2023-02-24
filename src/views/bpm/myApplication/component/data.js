//todo key 中英文显示。
//流程模块管理列表入参
export const searchForm = {
  itemName: '', //审批名称
  applyUserName: '', //申请人
  applyUserOrg: '', // 申请部门
  procProgress: [], //审批进度
  categoryList: [],
  businessId: '',
  endTime: '',
  startTime: '',
  itemType: '',
  modelTemplate: '-1'
}

export const approvalTypes = [
  {
    value: 1,
    label: '我发起的'
  }
]

export const approvalTypeMap = {
  1: '我发起的'
}
export const approvalToDoStatus = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 4,
    label: '审批中'
  },
  {
    value: 3,
    label: '补充材料'
  }
]

export const approvalFinishedStatus = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '同意'
  },
  {
    value: 2,
    label: '拒绝'
  }
]

export const tableTitle = [
  {
    type: 'selection',
    width: 50
  },
  {
    prop: 'businessId',
    label: '申请号',
    i18n: '单据编号',
    width: 120,
    tooltip: true,
    emit: 'go-detail',
    customRender: (h, scope, column, extraData) => {
      return (
        <span
          class="open-link-text process-node-popover-reference"
          onMouseenter={(event) => extraData.mouseenter(event, scope.row)}
          onMouseleave={extraData.mouseleave}
        >
          {scope.row.businessId}
        </span>
      )
    }
  },
  {
    prop: 'itemType',
    label: '业务模块',
    i18n: '业务模块',
    tooltip: true,
    width: 100
  },
  {
    prop: 'applyDate',
    label: '申请时间',
    i18n: '申请时间',
    tooltip: true,
    width: 120,
    customRender: (h, scope) => {
      if (scope.row.applyDate) {
        // eslint-disable-next-line no-undef
        return moment(scope.row.applyDate).format('YYYY-MM-DD')
      }
      return <span>{scope.row.applyDate}</span>
    }
  },

  {
    prop: 'processDefinitionName',
    label: '审批名称',
    i18n: '任务名称',
    tooltip: true,
    minWidth: 200
  },
  {
    prop: 'itemEvent',
    label: '审批事项',
    i18n: 'APPROVAL.APPROVAL_ITEMS',
    minWidth: 300,
    tooltip: true
  },
  {
    prop: 'currentNode',
    label: '审批进度',
    i18n: 'APPROVAL.APPROVAL_PROGRESS',
    minWidth: 150,
    tooltip: true,
    align: 'left',
    customRender: (h, scope) => {
      if (['同意', '拒绝'].indexOf(scope.row.procStatusMsg) > -1) {
        return scope.row.procStatusMsg
      }
      const { currentNode } = scope.row
      if (!currentNode) {
        return ''
      }
      const res = []
      for (let i = 0; i < currentNode.length; i++) {
        const currentNodeItem = currentNode[i]
        const resItem = []

        const { approvalUserDTOList } = currentNodeItem
        if (approvalUserDTOList && approvalUserDTOList.length > 0) {
          if (approvalUserDTOList[0].userOrg) {
            resItem.push(approvalUserDTOList[0].userOrg)
          }
          if (approvalUserDTOList[0].nameZh) {
            resItem.push(approvalUserDTOList[0].nameZh)
          }
        }

        if (currentNodeItem.suspensionStateMsg) {
          resItem.push(currentNodeItem.suspensionStateMsg)
        }

        if (resItem.length > 0) {
          res.push(resItem.join(' - '))
        }
      }

      return (
        <div>
          {res.map((e) => (
            <div>{e}</div>
          ))}
        </div>
      )
    }
  }
]
