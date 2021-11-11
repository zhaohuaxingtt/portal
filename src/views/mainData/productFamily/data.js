export const tableColumnSetting = [
  {
    type: 'index',
    align: 'center'
  },
  {
    prop: 'productCode',
    label: 'PID',
    align: 'center',
    emit: 'showDetail',
    tooltip:true,
    minWidth: 100,
    openNewPage: true,
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.productCode}</span>
    }
  },
  {
    prop: 'productNameZh',
    label: '产品家族名称',
    align: 'center'
  },
  {
    prop: 'productNameEn',
    label: '产品家族名称(英)',
    width: 110,
    align: 'center'
  },
  {
    prop: 'productNameDe',
    label: '产品家族名称(德)',
    width: 110,
    align: 'center'
  },
  {
    prop: 'productType',
    label: '产品类型',
    align: 'center'
  },
  {
    prop: 'modelYear',
    label: '当前车型年',
    align: 'center'
  },
  {
    prop: 'modelYearChangeDate',
    label: '车型年切换日期',
    align: 'center',
    tooltip: true,
    customRender: (h, scope) => {
      let dateTime = scope.row.modelYearChangeDate
      let date = ''
      if (dateTime && dateTime.length > 0) {
        date = moment(dateTime).format('YYYY-MM-DD')
      }
      return date
    }
  },
  {
    prop: 'productValidity',
    label: '是否有效',
    align: 'center',
    customRender: (h, scope) => {
      if (scope.row.productValidity) {
        return '是'
      } else {
        return '否'
      }
    }
  }
]

export const tableDetailColumnSetting = [
  {
    type: 'index',
    label: '编号',
    align: 'center'
  },
  {
    prop: 'vwModelCode',
    label: '车型编号',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'modelNameZh',
    label: '车型名称',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'brandName',
    label: '所属品牌',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'productCode',
    label: 'PID',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'carPlatformCode',
    label: '平台属性',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'productFactoryNames',
    label: '投产工厂',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'isValid',
    label: '是否有效',
    align: 'center',
    customRender: (h, scope) => {
      if (scope.row.isValid) {
        return '是'
      } else {
        return '否'
      }
    }
  }
]
