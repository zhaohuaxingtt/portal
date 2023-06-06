export const baseInfoTitle = [
  {
    key: 'isForeignManufacture',
    name: 'SHIFOUGUOWAICHANGSHANG',
    required: true,
    option: 'isForeignCountryList'
  },
  {
    key: 'nameZh',
    name: 'SupplierZh',
    required: true,
  },
  {
    key: 'shortNameZh',
    name: 'SupplierAbbreviationZh',
    required: true,
    icons: "iconxinxitishi",
    tip: "SUPPLIER_GONGYINGSHANGJIANCHENZHTIPS",
  },
  {
    key: 'socialcreditNo',
    name: 'UnifySocialCreditCode',
    required: true,
  },
  {
    key: 'nameEn',
    name: 'SupplierEn',
    required: true,
  },
  {
    key: 'shortNameEn',
    name: 'SupplierAbbreviationEn',
    required: true,
    icons: "iconxinxitishi",
    tip: "SUPPLIER_GONGYINGSHANGJIANCHENGENTIPS",
  },
  {
    key: 'dunsCode',
    name: 'DUNS',
    icons: "iconxinxitishi",
    tip: "SUPPLIER_DUNSTIPS",
  },
  {
    key: 'sapCode',
    name: 'SUPPLIER_SAPHAO',
  },
  {
    key: 'svwTempCode',
    name: 'SUPPLIER_LINGSHIHAO',
  },
  {
    key: 'svwCode',
    name: 'ZHENGSHIHAO',
  },
  {
    key: 'supplierType',
    name: 'SUPPLIER_SUPPLIERTYPE',
    option: 'supplierTypeList'
  },
]

export const baseRules = {
  isForeignManufacture: [
    { required: true, message: '请选择是否国内供应商', trigger: ['blur', 'change'] },
  ],
  nameZh: [
    { required: true, message: '请输入供应商中文名', trigger: 'blur' },
  ],
  shortNameZh: [
    { required: true, message: '请输入供应商简称（中）', trigger: 'blur' },
  ],
  nameEn: [
    { required: true, message: '请输入供应商英文名', trigger: 'blur' },
  ],
  shortNameEn: [
    { required: true, message: '请输入供应商简称（英）', trigger: 'blur' },
  ],
  socialcreditNo: [
    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
  ],
}

export const supplierCompleteRe = {
  // 基本信息
  supplierDTO: {
    addressId: "",
    stepCode: "register",//
    legalPerson: "",	//法人
    enterpriseType: "",//企业类型
    registeredCapital: "",//注册资金
    registeredDate: "",//注册日期
    country: "",//国家
    province: "",//省
    city: "",//城市
    provinceCode: "",
    countryCode: "",
    cityCode: "",
    companyAddress: "",//注册地址
    post: "",//公司注册地址邮编
    industry: "",//所属行业
    industryCode: "",//行业代码
    nameZh: "", //供应商简称中
    nameEn: "", //供应商简称英
    shortNameZh: "",
    shortNameEn: "",
    socialcreditNo: "", //社会信用代码
    dunsCode: "",
    corpEmail: "",//公司邮箱
    epNatureCategory: "",//企业性质(大类)
    epNatureSubcategory: "",//企业性质(小类)
    businessScope: "",//经营范围
    businessPeriod: "",//经营期限
    businessPlaceForm: "",//经营场所所有形式
    businessPlacePosition: "",//经营场所位置
    businessOfScope: "",//业务范围
    companySize: "",//企业规模
    businessState: "",//经营状态
    financialStatus: "",//财务状况
    financialTrend: "",//财务趋势
    companyWebPage: "",//公司网址
    listingAddress: "",//上市地点
    stockCode: "",//股票代码
    isListing: "",//是否上市
    supplyProperty: ""//供货属性
  },
  gpSupplierDetails:[{
    businessTypeDesc: '间接物料',
    businessType: '1',
    businessBuyerEmail: "",
    businessBuyerName: "",
    businessBuyerNum: "",
    businessBuyerDept: "",
    businessContactEmail: "",
    businessContactUser: "",
    industryPosition: "N",
  }],
  //GP电子银票DTO
  gpSupplierBankNoteDTO: {
    bankNoteName: "",
    bankNoteAccount: "",
    country: "",
    province: "",
    city: "",
  },
  //银行子账户列表信息
  subBankList: [],
  // 银行
  settlementBankDTO: {
    bankCode: "",//	《金融机构营业许可证》上的编号
    bankName: "",//结算银行名称
    countryCode: "",//国家
    provinceCode: "",//省份
    cityCode: "",//	城市
    bankAccount: "",//结算银行账号
    bankTaxCode: ""//税务号
  }
}

