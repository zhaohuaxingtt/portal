export const tableColumn = (c) => {
  return [
    {
      label: '#',
      width: 80,
      type: 'customIndex',
      customRender: (h, scope) => {
        const rowIndex = scope.$index + 1
        if (c.page.currPage == 1) {
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
      i18n: '提问问题',
      align: 'center',
      width:250,
      emit: 'mauDetail',
      tooltip: true,
      customRender: (h, scope) => {
        const title = scope.row.questionTitle
        return (
          <div class="question-title cursor" title={title}>
            {title}
          </div>
        )
      },
      sortable: true
    },
    {
      prop: 'createDate',
      label: '提问时间',
      i18n: '提问时间',
      width: '200px',
      align: 'center',
      tooltip: true,
      sortable: true
    },
    {
      prop: 'finishDate',
      label: '完结时间',
      i18n: '完结时间',
      width: '180px',
      align: 'center',
      tooltip: true,
      sortable: true
    },
    {
      prop: 'createByUerName',
      label: '提问者',
      i18n: '提问者',
      align: 'center',
      tooltip: true,
      sortable: true
    },
    {
      prop: 'source',
      label: '用户类型',
      i18n: '用户类型',
      align: 'center',
      customRender: (h, scope) => {
        const source = scope.row.source
        return <div>{source === 'inner' ? '内部用户' : '供应商用户'}</div>
      },
      sortable: true
    },
    {
      // prop: 'handlerUserName',
      label: '管理员',
      i18n: '管理员',
      align: 'center',
      customRender: (h, scope) => {
        const handlerUserName = scope.row.handlerUserName
        return (
          <div class="handlerUserName" title={handlerUserName}>
            {handlerUserName}
          </div>
        )
      },
      sortable: true
    },
    {
      prop: 'questionModuleName',
      label: '问题模块',
      i18n: '问题模块',
      align: 'center',
      tooltip: true,
      sortable: true
    },
    {
      prop: 'questionLableName',
      label: '标签',
      i18n: '标签',
      align: 'center',
      sortable: true
    }
    // {
    //   prop: 'favourCount',
    //   label: '点赞量',
    //   align: 'center'
    // },
    // {
    //   prop: 'viewCount',
    //   label: '浏览量',
    //   align: 'center'
    // }
  ]
}

export const manualTableColumn = (c) => {
  return [
    {
      label: '#',
      width: 80,
      type: 'customIndex',
      customRender: (h, scope) => {
        const rowIndex = scope.$index + 1
        if (c.page.currPage == 1) {
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
      i18n: '提问问题',
      emit: 'quesDetail',
      align: 'center',
      customRender: (h, scope) => {
        const title = scope.row.questionTitle
        return (
          <div class="question-title cursor" title={title}>
            {title}
          </div>
        )
      },
      sortable: true
    },
    {
      prop: 'source',
      label: '用户类型',
      i18n: '用户类型',
      align: 'center',
      customRender: (h, scope) => {
        const source = scope.row.source
        return <div>{source === 'inner' ? '内部用户' : '供应商用户'}</div>
      },
      sortable: true
    },
    {
      prop: 'createDate',
      label: '创建时间',
      i18n: '创建时间',
      width: '200px',
      align: 'center',
      tooltip: true,
      sortable: true
    },
    {
      prop: 'handlerUserName',
      label: '创建人',
      i18n: '创建人',
      width: '200px',
      align: 'center',
      tooltip: true,
      sortable: true
    },
    // {
    //   prop: 'finishDate',
    //   label: '完结时间',
    //   width: '180px',
    //   align: 'center',
    //   tooltip: true
    // },
    // {
    //   prop: 'createByUerName',
    //   label: '提问者',
    //   align: 'center',
    //   tooltip: true
    // },

    // {
    //   prop: 'handlerUserName',
    //   label: '管理员',
    //   align: 'center',
    //   customRender: (h, scope) => {
    //     const handlerUserName = scope.row.handlerUserName
    //     return (
    //       <div class="handlerUserName"  title={handlerUserName}>{ handlerUserName }</div>
    //     )
    //   }
    // },
    {
      prop: 'questionModuleName',
      label: '问题模块',
      i18n: '问题模块',
      align: 'center',
      tooltip: true,
      sortable: true
    },
    {
      prop: 'questionLableName',
      label: '标签',
      i18n: '标签',
      align: 'center',
      sortable: true
    },
    {
      prop: 'favourCount',
      label: '点赞量',
      i18n: '点赞量',
      align: 'center',
      sortable: true
    },
    {
      prop: 'viewCount',
      label: '浏览量',
      i18n: '浏览量',
      align: 'center',
      sortable: true
    }
  ]
}
