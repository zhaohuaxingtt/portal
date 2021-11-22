export const tableColumn = [
  {
    label: '序号',
    width: 50,
    customRender: (h, scope, column) => {
      console.log(scope, '====', column)
      const rowIndex = scope.$index + 1
      if (rowIndex === 1) {
        return <span class="open-link-text">图片一{rowIndex}</span>
      } else if (rowIndex === 2) {
        return <span class="open-link-text">图片二{rowIndex}</span>
      } else if (rowIndex === 3) {
        return <span class="open-link-text">{rowIndex}</span>
      } else {
        return <span class="open-link-text">{rowIndex}</span>
      }
    }
  },
  {
    prop: 'userNum',
    label: '提问问题',
    align: 'center',
    emit: 'go-detail'
  },
  {
    prop: 'account',
    label: '用户类型',
    align: 'center'
  },
  {
    prop: 'nameZh',
    label: '创建时间',
    width: '100px',
    align: 'center',
    i18n: '创建时间',
    tooltip: true
  },
  {
    prop: 'nameEn',
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
    align: 'center',
    i18n: 'staffManagement.DEPARTMENT',
    tooltip: true
  },
  {
    prop: 'positionList',
    label: '点赞量',
    align: 'center',
    i18n: 'staffManagement.JOBS',
    tooltip: true
  },
  {
    prop: 'positionList',
    label: '浏览量',
    align: 'center',
    i18n: 'staffManagement.JOBS',
    tooltip: true
  }
]
