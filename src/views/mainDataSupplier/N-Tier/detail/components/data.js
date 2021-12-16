export const supplierDirectoryTableTitle = [
  {
    props: 'name',
    name: '联系人姓名',
    maxlength: 50,
    key: 'SUPPLIER_LIANXIRENXINGMING',
    required: true,
    rule: [
      {
        required: true,
        message: '请输入联系人姓名',
        trigger: 'blur'
      }
    ]
  },
  {
    props: 'position',
    name: '职位',
    key: 'SUPPLIER_ZHIWEI'
  },
  {
    props: 'dept',
    name: '部门',
    key: 'SUPPLIER_BUMEN'
  },
  {
    props: 'telephoneAreaCode',
    name: '区号',
    maxlength: 10,
    key: 'SUPPLIER_QUHAO'
  },
  {
    props: 'telephoneM',
    name: '联系电话',
    maxlength: 20,
    key: 'SUPPLIER_LIANXIDIANHUA',
    required: true,
    rule: [
      {
        required: true,
        message: '请输入联系电话',
        trigger: 'blur'
      }
    ]
  },
  {
    props: 'email',
    name: '电子邮件',
    key: 'SUPPLIER_DIANZIYOUJIAN',
    required: true,
    width: 150,
    rule: [
      {
        required: true,
        message: '请输入电子邮件',
        trigger: 'blur'
      }
    ]
  },
  {
    props: 'userName',
    name: '用户登录名'
  },
  {
    props: 'status',
    name: '是否有效',
    customRender: (j, scope) => {
      return scope.row.status ? '是' : '否'
    }
  },
  {
    props: 'isExpired',
    name: '是否超期',
    customRender: (j, scope) => {
      return scope.row.isExpired ? '是' : '否'
    }
  },
  {
    props: 'expireDate',
    name: '超期时间',
    width: 150
  },
  {
    props: 'lastLoginDate',
    name: '登录RiSE系统时间',
    width: 160
  }
]
export const tableTitle = [
  {
    props: 'factoryName',
    name: '工厂名称',
    key: 'GONGCHANGMINGCHEN',
    maxlength: 256,
    required: true,
    rule: [
      {
        required: true,
        message: '请输入工厂名称',
        trigger: 'blur'
      }
    ]
  },
  {
    props: 'country',
    name: '国家',
    key: 'GUOJIA',
    required: true,
    rule: [
      {
        required: true,
        message: '请选择国家',
        trigger: 'change'
      }
    ]
  },
  {
    props: 'province',
    name: '省份',
    key: 'SHENGFEN',
    required: true,
    rule: [
      {
        required: true,
        message: '请选择省份',
        trigger: 'change'
      }
    ]
  },
  {
    props: 'city',
    name: '城市',
    key: 'SUPPLIER_CHENGSHI',
    required: true,
    rule: [
      {
        required: true,
        message: '请选择城市',
        trigger: 'change'
      }
    ]
  },
  {
    props: 'address',
    name: '详细地址',
    key: 'XIANGXIDIZHI',
    maxlength: 300,
    required: true,
    rule: [
      {
        required: true,
        message: '请输入详细地址',
        trigger: 'blur'
      }
    ]
  },
  {
    props: 'postCode',
    name: '邮编',
    key: 'YOUBIAN',
    maxlength: 10,
    width: 140,
    required: true,
    rule: [
      {
        required: true,
        pattern: /^[A-Za-z0-9]+$/,
        message: '请输入合法的邮编',
        trigger: 'blur'
      }
    ]
  },
  {
    props: 'areaCovered',
    name: '工厂占地面积',
    key: 'GONGCHANGZHANDIMIANJI'
  }
]

export const FACTORY_VIEW_SETTINGS = [
  {
    label: '序号',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'factoryName',
    i18n: '工厂名称',
    minWidth: '150',
    required: true
  },
  {
    prop: 'country',
    i18n: '国家',
    minWidth: '100',
    required: true
  },
  {
    prop: 'province',
    i18n: '省份',
    minWidth: '100',
    required: true
  },
  {
    prop: 'city',
    i18n: '城市',
    minWidth: '100',
    required: true
  },
  {
    prop: 'address',
    i18n: '详细地址',
    minWidth: '200',
    required: true
  },
  {
    prop: 'postCode',
    i18n: '邮编'
  },
  {
    prop: 'areaCovered',
    i18n: '工厂占地面积'
  }
]

export const CONTACTS_VIEW_SETTINGS = [
  {
    i18n: '序号',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'name',
    i18n: '联系人姓名',
    minWidth: '150',
    required: true
  },
  {
    prop: 'position',
    i18n: '职位'
  },
  {
    prop: 'dept',
    i18n: '部门'
  },
  {
    prop: 'telephoneAreaCode',
    i18n: '区号'
  },
  {
    prop: 'telephoneM',
    i18n: '联系电话'
  },
  {
    prop: 'email',
    i18n: '电子邮件',
    minWidth: 150
  },
  {
    prop: 'userName',
    i18n: '用户登录名'
  },
  {
    prop: 'status',
    i18n: '是否有效',
    customRender: (j, scope) => {
      return scope.row.status ? '是' : '否'
    }
  },
  {
    prop: 'isExpired',
    i18n: '是否超期',
    customRender: (j, scope) => {
      return scope.row.isExpired ? '是' : '否'
    }
  },
  {
    prop: 'expireDate',
    i18n: '超期时间',
    width: 140
  },
  {
    prop: 'expireDate',
    i18n: '登录RiSE系统时间',
    width: 160
  }
]
