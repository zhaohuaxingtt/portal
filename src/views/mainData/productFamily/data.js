export const tableColumnSetting = [
  {
    type: 'index',
    align: 'center'
  },
  {
    prop: 'productCode',
    i18n: 'PID',
    align: 'center',
    emit: 'showDetail',
    tooltip: true,
    width: 50,
    // openNewPage: true,
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.productCode}</span>
    }
  },
  {
    prop: 'productNameZh',
    i18n: '产品家族名称',
    align: 'center'
  },
  {
    prop: 'productNameEn',
    i18n: '产品家族名称(英)',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'productNameDe',
    i18n: '产品家族名称(德)',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'productType',
    i18n: '产品类型',
    align: 'center'
  },
  {
    prop: 'modelYear',
    i18n: '当前车型年',
    align: 'center',
    width: 100
  },
  {
    prop: 'modelYearChangeDate',
    i18n: '车型年切换日期',
    align: 'center',
    tooltip: true,
    width: 120,
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
    i18n: '是否有效',
    align: 'center',
    width: 90,
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
    i18n: '编号',
    align: 'center'
  },
  {
    prop: 'vwModelCode',
    i18n: '车型编号',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'modelNameZh',
    i18n: '车型名称',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'brandName',
    i18n: '所属品牌',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'productCode',
    i18n: 'PID',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'carPlatformCode',
    i18n: '平台属性',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'productFactoryNames',
    i18n: '投产工厂',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'isValid',
    i18n: '是否有效',
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
