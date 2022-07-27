export const FILTER_FORM = {
  nameZh: '', // 供应商名称（中）
  nameEn: '', // 供应商名称（英）
  gpBusinessType:'',//业务类型
  dunsCode: '', //DUNS
  supplierType: '', // 供应商类型（生产/一般/共用
  svwTempCode: '', // 临时号
  vmCode: '', // 正式号
  svwCode: '', // 上海大众编码
  sapCode: '', // SAP号
  socialcreditNo: '' //社会信用号,
}

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

export const SUPPLIER_STATUS = [
  {
    label: '正常',
    value: '1'
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
    i18n: '是否MBDL',
    minWidth: '100',
    customRender: (h, scope) => {
      return scope.row.isMbdl ? '是' : '否'
    }
  },
  {
    prop: 'supplierType',
    i18n: '供应商类型',
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
    prop: 'gpBusinessTypeDesc',
    i18n: '业务类型',
    minWidth: '100',
    tooltip: true
  },
  {
    prop: 'formalStatus',
    i18n: '供应商身份',
    minWidth: '100',
    tooltip: true,
    // customRender: (h, scope) => {
    //   if (scope.row.formalStatus == '0') {
    //     return '临时'
    //   }
    //   if (scope.row.formalStatus == '1') {
    //     return '正式'
    //   }
    //   return '储蓄池'
    // }
  },
  {
    prop: 'sapCode',
    i18n: 'SAP号',
    minWidth: '100',
    tooltip: true
  },
  {
    prop: 'dunsCode',
    i18n: 'DUNS',
    minWidth: '100',
    tooltip: true
  },
  {
    prop: 'svwCode',
    i18n: 'SVW号',
    minWidth: '100',
    tooltip: true
  },
  {
    prop: 'country',
    i18n: '国家',
    minWidth: '100',
    tooltip: true
  }
]

// 主要产品
export const BASE_PRODUCT_TABLE_COLUMNS = [
  {
    label: '序号',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'name',
    i18n: '主要产品',
    required: true,
    minWidth: '150'
  },
  {
    prop: 'annualOutput',
    i18n: '年产量',
    minWidth: '150'
  },
  {
    prop: 'oemName',
    i18n: '主要配套主机厂/客户',
    required: true,
    minWidth: '150'
  },
  {
    prop: 'deliveryStartDate',
    i18n: '开始供货时间',
    minWidth: '150'
  },
  {
    prop: 'deliveryYear',
    i18n: '供货年份',
    minWidth: '150'
  },
  {
    prop: 'annualVolumns',
    i18n: '年供货量',
    required: true,
    minWidth: '150'
  },
  {
    prop: 'domesticMarketShare',
    i18n: '国内市场占有率（%）',
    required: true,
    minWidth: '150'
  },
  {
    prop: 'industryPosition',
    i18n: '所处行业位置',
    minWidth: '150'
  },
  {
    prop: 'svwRatio',
    i18n: '可供SVW比例',
    minWidth: '150'
  }
]

// 关联公司
export const BASE_COMPANY_TABLE_COLUMNS = [
  {
    label: '序号',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'name',
    i18n: '关联公司名称',
    minWidth: '150'
  },
  {
    prop: 'description',
    i18n: '关系描述',
    minWidth: '150'
  },
  {
    prop: 'entProperty',
    i18n: '企业性质',
    minWidth: '150'
  },
  {
    prop: 'country',
    i18n: '所在国家/地区',
    minWidth: '150'
  },
  {
    prop: 'regCapital',
    i18n: '注册资本'
  },
  {
    prop: 'unit',
    i18n: '单位'
  },
  {
    prop: 'controllingShare',
    i18n: '控股比例（%）'
  },
  {
    prop: 'remark',
    i18n: '备注'
  }
]

// 关联集团
export const BASE_CORP_TABLE_COLUMNS = [
  {
    label: '序号',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'name',
    i18n: '集团公司名称',
    minWidth: '200'
  },
  {
    prop: 'nameEn',
    i18n: '集团公司英文名称',
    minWidth: '200'
  },
  {
    prop: 'abbReviation',
    i18n: '集团公司简称',
    minWidth: '100'
  },
  {
    prop: 'nation',
    i18n: '国家',
    minWidth: '100'
  },
  {
    prop: 'headquarters',
    i18n: '总部',
    minWidth: '200'
  }
]

// 工厂信息
export const FACTORY_TABLE_COLUMNS = [
  {
    type: 'selection',
    width: '50px'
  },
  {
    label: '序号',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'factoryCode',
    i18n: '工厂编号',
    minWidth: '150'
  },
  {
    prop: 'factoryName',
    i18n: '工厂名称',
    minWidth: '150',
    required: true,
    emit: 'go-detail',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.factoryName}</span>
    }
  },
  {
    prop: 'factoryAbbrName',
    i18n: '工厂简称',
    minWidth: '150',
    required: true
  },
  {
    prop: 'materialGroupNameEn',
    i18n: '工厂所在地',
    minWidth: '150',
    required: true,
    customRender: (h, scope) => {
      if (!scope.row.addressInfoVo) {
        return ''
      }
      const res = []
      if (scope?.row?.addressInfoVo?.country) {
        res.push(scope?.row?.addressInfoVo?.country)
      }
      if (scope?.row?.addressInfoVo?.province) {
        res.push(scope?.row?.addressInfoVo?.province)
      }
      if (scope?.row?.addressInfoVo?.city) {
        res.push(scope?.row?.addressInfoVo?.city)
      }
      return res.join('-')
    }
  },
  {
    prop: 'factoryAbbrName',
    i18n: '地址',
    minWidth: '150',
    required: true,
    customRender: (h, scope) => {
      return scope?.row?.addressInfoVo?.address
    }
  },
  {
    prop: '邮编',
    i18n: '邮编',
    customRender: (h, scope) => {
      return scope?.row?.addressInfoVo?.postCode
    }
  },
  {
    prop: 'dunsCode',
    i18n: 'DUNS'
  },
  {
    prop: 'vwCode',
    i18n: 'VW号'
  },
  {
    prop: 'isNominate',
    i18n: '是否定点',
    customRender: (h, scope) => {
      return scope.row.isNominate ? '是' : '否'
    }
  },
  {
    prop: 'effectFlag',
    i18n: '是否生效',
    customRender: (h, scope) => {
      return scope.row.effectFlag ? '是' : '否'
    }
  }
]

// 工厂信息编辑
export const FACTORY_TABLE_MODIFY_FORM = {}

// 供应商用户
export const SUPPLIER_USER_COLUMNS = [
  {
    type: 'selection',
    width: '50px'
  },
  {
    label: '序号',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'nameZh',
    i18n: '联系人姓名',
    minWidth: '150',
    required: true,
    emit: 'go-detail',
    align: 'left',
    customRender: (h, scope) => {
      return (
        <div class="table-cell-icon">
          {scope.row.isMainContact && (
            <span class="cell-icon">
              <icon symbol name="iconsheweizhuyonghu1" />
            </span>
          )}
          <span class="link-text">{scope.row.nameZh}</span>
        </div>
      )
    }
  },
  {
    prop: 'position',
    i18n: '职位',
    minWidth: '150',
    required: true
  },
  {
    prop: 'dept',
    i18n: '部门',
    minWidth: '150',
    required: true
  },
  {
    prop: 'telephoneAreaCode',
    i18n: '电话区号',
    minWidth: '150',
    required: true
  },
  {
    prop: 'telephoneO',
    i18n: '联系电话',
    minWidth: '110'
  },
  {
    prop: 'email',
    i18n: '电子邮件',
    minWidth: '180'
  },
  {
    prop: 'userName',
    i18n: '用户登录名',
    minWidth: '120'
  },
  {
    prop: 'isValid',
    i18n: '是否有效',
    minWidth: '100',
    customRender: (h, scope) => {
      // 1正常2冻结
      if (scope.row.status == '1') {
        return '是'
      } else if (scope.row.status == '2') {
        return '否'
      }
      return ''
    }
  },
  {
    prop: '',
    i18n: '是否超期',
    minWidth: '100',
    customRender: (h, scope) => {
      if (scope.row.isExpired) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  {
    prop: 'expireDate',
    i18n: '超期时间',
    minWidth: '160'
  },
  {
    prop: 'lastLoginDate',
    i18n: '最后登录时间',
    minWidth: '160'
  }
]

// 供应商用表单
export const SUPPLIER_USER_FORM = {
  accountId: 0,
  commuContactType: 0,
  createBy: 0,
  createDate: '',
  dept: '',
  email: '',
  expireDate: '',
  gender: 0,
  generationKey: '',
  isMainContact: false,
  isValid: false,
  lastLoginDate: '',
  nameDe: '',
  nameEn: '',
  nameZh: '',
  nightcontactMobile: '',
  nightcontactName: '',
  nightcontactTel: '',
  opcsCompanyNameEn: '',
  opcsCompanyNameZh: '',
  oprContactType: 0,
  position: '',
  sapNum: '',
  status: 1,
  supplierId: 0,
  telephoneAreaCode: '',
  telephoneM: '',
  telephoneMAndtelephoneO: '',
  telephoneO: '',
  temporaryNum: '',
  type: 0,
  updateBy: 0,
  updateDate: '',
  userName: '',
  wechat: ''
}

// 供应商通讯录
export const SUPPLIER_CONTACTS_COLUMNS = [
  {
    type: 'selection',
    width: '50px'
  },
  {
    label: '序号',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'contactType',
    i18n: '联系人类型',
    minWidth: '150'
  },
  {
    prop: 'nameZh',
    i18n: '联系人姓名',
    minWidth: '150',
    required: true,
    emit: 'go-detail',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.nameZh}</span>
    }
  },
  {
    prop: 'designation',
    i18n: '职位',
    minWidth: '150'
  },
  {
    prop: 'dept',
    i18n: '部门',
    minWidth: '150'
  },
  {
    prop: 'telephoneAreaCode',
    i18n: '区号',
    minWidth: '150'
  },
  {
    prop: 'phoneH',
    i18n: '联系电话',
    required: true,
    minWidth: '100'
  },
  {
    prop: 'email',
    i18n: '电子邮件',
    minWidth: '150'
  },
  {
    prop: 'remark',
    i18n: '备注',
    minWidth: '100'
  }
]

export const SUPPLIER_CONTACT_COLUMNS = [
  {
    type: 'selection',
    width: '50px'
  },
  {
    label: '序号',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'contactType',
    i18n: '联系人类型',
    customRender: (h, scope) => {
      return (
        <span>{scope.row.contactType}{scope.row.contactType === '商务联系人' && (<span style="color:red">*</span>)}</span>
      )
    }
  },
  {
    prop: 'nameZh',
    i18n: '联系人姓名',
    required: true,
    customRender: (h, scope) => {
      return (
        <iInput
          value={scope.row.nameZh}
          onInput={(val) => (scope.row.nameZh = val)}
        />
      )
    }
  },
  {
    prop: 'designation',
    i18n: '职位',
    customRender: (h, scope) => {
      return (
        <iInput
          value={scope.row.designation}
          onInput={(val) => (scope.row.designation = val)}
        />
      )
    }
  },
  {
    prop: 'dept',
    i18n: '部门',
    customRender: (h, scope) => {
      return (
        <iInput
          value={scope.row.dept}
          onInput={(val) => (scope.row.dept = val)}
        />
      )
    }
  },
  {
    prop: 'telephoneAreaCode',
    i18n: '区号',
    customRender: (h, scope) => {
      return (
        <iInput
          value={scope.row.telephoneAreaCode}
          onInput={(val) => (scope.row.telephoneAreaCode = val)}
        />
      )
    }
  },
  {
    prop: 'telephone',
    i18n: '联系电话',
    required: true,
    customRender: (h, scope) => {
      return (
        <iInput
          value={scope.row.telephone}
          onInput={(val) => (scope.row.telephone = val)}
        />
      )
    }
  },
  {
    prop: 'email',
    i18n: '电子邮件',
    customRender: (h, scope) => {
      return (
        <iInput
          value={scope.row.email}
          onInput={(val) => (scope.row.email = val)}
        />
      )
    }
  },
  {
    prop: 'remark',
    i18n: '备注',
    customRender: (h, scope) => {
      return (
        <iInput
          value={scope.row.remark}
          onInput={(val) => (scope.row.remark = val)}
        />
      )
    }
  }
]

// 银行信息
export const BANK_FORM = {
  addressId: 0,
  bankAccount: '',
  bankCode: '',
  bankName: '',
  bankTaxCode: '',
  countryCode: '',
  country: '',
  provinceCode: '',
  province: '',
  cityCode: '',
  city: ''
}

export const DEFAULT_CONTACT = {
  nameZh: '',
  nameEn: '',
  nameDe: '',
  phoneH: '',
  phoneM: '',
  phoneF: '',
  address: '',
  dept: '',
  designation: '',
  isValid: '',
  isUser: '',
  contactType: '',
  telephoneAreaCode: '',
  telephone: '',
  remark: '',
  isDefault: false,
  wechar: '',
  isDelete: false,
  email: ''
}


export const tableTitle = [
  {
      props: 'businessTypeDesc',
      name: '业务类型',
      key: 'EKL_YJGL_YWLX',
      rule: [{required: true, message: '请输入', trigger: 'blur'}],
      maxlength: 150
  },
  {
      props: 'businessBuyerEmail',
      name: '采购员邮箱',
      key: 'SUPPLIER_PURCHASEREMAIL',
      maxlength: 50
  },
  {
      props: 'businessBuyerName',
      name: '采购员',
      width: 180,
      key: 'SPR_FRM_XGYSPJ_CGY',
      rule: [{required: true, message: '请输入', trigger: 'blur'}],
      maxlength: 100
  },
  {
      props: 'businessBuyerNum',
      name: '采购员工号',
      key: 'CAIGOUYUANGONGHAO'
  },
  {
      props: 'businessBuyerDept',
      name: '采购员科室',
      key: 'CAIGOUYUANKESHI'
  },
  {
      props: 'businessContactEmail',
      name: '业务部门联系人邮箱',
      key: 'YEWUBUMENLIANXIRENYOUXIANG',
      rule: [{required: true, message: '请输入', trigger: 'blur'}],
      maxlength: 100
  },
  {
      props: 'businessContactUser',
      name: '业务部门联系人姓名',
      width: 180,
      key: 'YEWUBUMENLIANXIRENXINGMING',
      // rule: [
      //   {
      //     pattern: /^([1-9][0-9]{0,1}|100)$/,
      //     message: '请输入1-100的整数',
      //     trigger: 'blur',
      //   }],
      maxlength: 3,
  },
  {
      props: 'industryPosition',
      name: '是否启用',
      key: 'SHIFOUQIYONG',
      maxlength: 200
  },
]

export const bankRulesData = {
  'countryCode': [
    { required: true, message: '请选择银行所在国家', trigger: 'change' }
  ],
  'provinceCode': [
    { required: true, message: '请选择银行所在省份', trigger: 'change' }
  ],
  'cityCode': [
    { required: true, message: '请选择银行所在城市', trigger: 'change' }
  ],
  'bankName': [
    { required: true, message: '请输入银行名称', trigger: 'blur' }
  ],
  'bankCode': [
    // { required: true, message: '请输入正确银行机构编码', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9]+$/, message: '银行机构编码错误', trigger: 'blur' },
    { min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
  ],
  'bankAccount': [
    // { required: true, message: '请输入正确银行卡号', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9]+$/, message: '银行卡号错误', trigger: 'blur' },
    { min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
  ],
  'bankTaxCode': [
    // { required: true, message: '请输入税务代码', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9]+$/, message: '税务代码错误', trigger: 'blur' }
  ],
  'gpSupplierBankNoteDTO.bankNoteName': [
    { required: true, message: '请输入电子银票账户银行名称', trigger: 'blur' }
  ],
  'gpSupplierBankNoteDTO.bankNoteAccount': [
    { required: true, message: '请输入电子银票银行账户行号', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9]+$/, message: '账户行号错误', trigger: 'blur' }
  ],
  'gpSupplierBankNoteDTO.country': [
    { required: true, message: '请输入电子银票银行所在国家', trigger: 'blur' }
  ],
  'gpSupplierBankNoteDTO.province': [
    { required: true, message: '请输入电子银票银行所在省份', trigger: 'blur' }
  ],
  'gpSupplierBankNoteDTO.city': [
    { required: true, message: '请输入电子银票账户银行城市', trigger: 'blur' }
  ]
}

export const bankRules={
	country:[
		{ required: true, message: '请选择银行所在国家', trigger: 'change' }
	],
	province:[
		{ required: true, message: '请选择银行所在省份', trigger: 'change' }
	],
	city:[
		{ required: true, message: '请选择银行所在城市', trigger: 'change' }
	],
	bankName:[
		{ required: true, message: '请输入银行名称', trigger: 'blur' }
	],
	bankCode:[
		{ required: true,message: '请输入正确银行机构编码', trigger: 'blur' },
		{ pattern:/^[A-Za-z0-9]+$/, message: '银行机构编码错误', trigger: 'blur' },
		{ min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
	],
	bankAccount:[
		{ required: true, message: '请输入正确银行卡号', trigger: 'blur' },
		{ pattern:/^[A-Za-z0-9]+$/, message: '银行卡号错误', trigger: 'blur' },
		{ min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
	],
	salaryAccount:[
		{ required: true, message: '请输入农民工工资专用账户名称', trigger: 'change' }
	],
}


export const businessTypeList = [
  {
    value:1,
    label:"集中采购"
  },{
    value:2,
    label:"报废处置"
  },{
    value:3,
    label:"分散采购"
  },
]