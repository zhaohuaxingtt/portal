export const tableColumn = [
  {
    label: '序号',
    width: 80,
    customRender: (h, scope) => {
      const rowIndex = scope.$index + 1
      if (rowIndex === 1) {
        return (
          <span class="table-icon">
            <div class="icon first"></div>
            {rowIndex}
          </span>
        )
      } else if (rowIndex === 2) {
        return (
          <span class="table-icon">
            <div class="icon second"></div>
            {rowIndex}
          </span>
        )
      } else if (rowIndex === 3) {
        return (
          <span class="table-icon">
            <div class="icon third"></div>
            {rowIndex}
          </span>
        )
      } else {
        return (
          <span class="table-icon">
            <div class="icon"></div>
            {rowIndex}
          </span>
        )
      }
    }
  },
  {
    prop: 'questionTitle',
    label: '提问问题',
    align: 'center'
  },
  {
    prop: 'source',
    label: '用户类型',
    align: 'center'
  },
  {
    prop: 'createDate',
    label: '创建时间',
    width: '180px',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'createByUerName',
    label: '创建人',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'gender',
    label: '问题模块',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'deptList',
    label: '标签',
    align: 'center'
  },
  {
    prop: 'favourCount',
    label: '点赞量',
    align: 'center'
  },
  {
    prop: 'viewCount',
    label: '浏览量',
    align: 'center'
  }
]
