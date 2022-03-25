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
      prop: 'supplierTag',
      i18n: '供应商标签',
      minWidth: '100',
    },
    {
      prop: 'svwTempCode',
      i18n: '临时号',
      minWidth: '120',
      tooltip: true,
    },
    {
      prop: 'svwCode',
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
      prop: 'supplierTypeDesc',
      i18n: '供应商类型',
      minWidth: '100',
      tooltip: true
    },
    {
      prop: 'gpBusinessTypeDesc',
      i18n: '业务类型',
      minWidth: '150',
      tooltip: true
    },
    {
      prop: 'createDate',
      i18n: '创建时间',
      minWidth: '100',
      tooltip: true
    },
    {
      prop: 'updateDate',
      i18n: '修改时间',
      minWidth: '100',
      tooltip: true
    }
  ]

  export const FILTER_FORM = {
    nameZh: '', // 供应商名称（中）
    gpBusinessType:'',//业务类型
    dunsCode: '', //DUNS
    supplierType: '', // 供应商类型（生产/一般/共用
    svwTempCode: '', // 临时号
    vmCode: '', // 正式号
    svwCode: '', // 上海大众编码
    sapCode: '', // SAP号
    socialcreditNo: '' //社会信用号,
  }