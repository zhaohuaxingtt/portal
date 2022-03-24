  export const SUPPLIER_TYPES = [
    {
      label: '全部',
      value: ''
    },
    {
      label: '共用供应商',
      value: 'PD'
    },
    {
      label: '生产供应商',
      value: 'PP'
    },
    {
      label: '一般供应商',
      value: 'GP'
    }
  ]
  
  export const SUPPLIER_TABLE_COLUMNS = [
    {
      type: 'selection',
      width: '50px'
    },
    {
      label: '序号',
      type: 'index',
      width: '60px'
    },
    {
      prop: 'nameZh',
      i18n: '供应商中文名称',
      minWidth: '200',
      tooltip: true,
      emit: 'go-detail',
      // openNewPage: true,
      customRender: (h, scope) => {
        return <span class="link-text">{scope.row.nameZh}</span>
      }
    },
    {
      prop: 'nameEn',
      i18n: '供应商英文名称',
      minWidth: '200',
      tooltip: true
    },
    {
      prop: 'isMbdl',
      i18n: '供应商标签',
      minWidth: '100',
      customRender: (h, scope) => {
        return scope.row.isMbdl ? '是' : '否'
      }
    },
    {
      prop: 'supplierType',
      i18n: '临时号',
      minWidth: '120',
      tooltip: true,
      customRender: (h, scope, column, extraData) => {
        if (extraData.supplierTypeMap[scope.row.supplierType]) {
          return extraData.supplierTypeMap[scope.row.supplierType]
        }
        return scope.row.supplierType
      }
    },
    {
      prop: 'sapCode',
      i18n: '正式号',
      minWidth: '100',
      tooltip: true
    },
    {
      prop: 'sapCode',
      i18n: 'SAP号',
      minWidth: '100',
      tooltip: true
    },
    {
      prop: 'dunsCode',
      i18n: '供应商类型',
      minWidth: '100',
      tooltip: true
    },
    {
      prop: 'svwCode',
      i18n: '业务类型',
      minWidth: '100',
      tooltip: true
    },
    {
      prop: 'country',
      i18n: '创建时间',
      minWidth: '100',
      tooltip: true
    },
    {
      prop: 'country',
      i18n: '修改时间',
      minWidth: '100',
      tooltip: true
    }
  ]