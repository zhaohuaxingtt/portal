export const supplierComplete = {
  // 主表
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
  // 一般供应商
  gpSupplierDTO: {

  },
  // 生产供应商
  ppSupplierDTO: {
    payHistory: "",//付款记录
    isSupply: "",//是否在供
    ccc: "",//CCC
    isSubjectionchina: "",//是否隶属华域
    isSafetyPart: "",//是否安全件
    isShareSupplier: "",//是否共用供应商
    supplyType: "",//供货类型
    supplyPartForm: "",//供货零件类型
    isCommunityMember: "",//是否隶属桑塔纳共同体
    isFactory: ""//是否业内工厂
  },
  // 银行
  settlementBankDTO: {
    bankCode: "",//	《金融机构营业许可证》上的编号
    bankName: "",//结算银行名称
    country: "",//国家
    province: "",//省份
    city: "",//	城市
    bankAccount: "",//结算银行账号
    bankTaxCode: ""//税务号
  },
  //GP电子银票DTO
	gpSupplierBankNoteDTO:{
		bankNoteName:"",
		bankNoteAccount:"",
		country:"",
		province:"",
		city:"",
	},
  //银行子账户列表信息
  subBankList:[],
}
//非零数字
const checkNumber = (rule, value, callback) => {
  const mailReg = /^[1-9]\d*$/
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确整数'))
    }
  }, 100)
}
// 基础信息校验
export const baseInfoRules= {
	'supplierDTO.legalPerson': [
		{ required: true, message: '请输入法定代表人', trigger: 'blur' },
		{ min: 1, max: 30, message: '长度在 1 到 30个字符', trigger: 'blur' }
	],
	'supplierDTO.companySize': [
		{ required: true, message: '请选择企业规模', trigger: 'change' }
	],
	'supplierDTO.businessState': [
		{ required: true, message: '请选择经营状态', trigger: 'change' }
	],
	'supplierDTO.enterpriseType':[
		{ required: true, message: '请选择企业类型', trigger: 'change' }
	],
	'supplierDTO.epNatureCategory':[
		{ required: true, message: '请选择企业性质（大类）', trigger: 'change' }
	],
	'supplierDTO.epNatureSubcategory':[
		{ required: true, message: '请选择企业性质（小类）', trigger: 'change' }
	],
	'supplierDTO.industry':[
		{ required: true, message: '请选择所属行业', trigger: 'change' }
	],
	'supplierDTO.industryCode':[
		{ required: true, message: '请选择行业代码）', trigger: 'change' }
	],
	'supplierDTO.businessOfScope':[
		{ required: true, message: '请选择业务范围）', trigger: 'change' }
	],
	'supplierDTO.isListing':[
		{ required: true, message: '请选择是否上市', trigger: 'change' }
	],
	'supplierDTO.registeredCapital':[
		{ required: true ,message: '请输入注册资本', trigger: 'blur' },
		{ min: 1, max: 100, message: '长度在 1 到 100个字符', trigger: 'blur' }
	],
	'supplierDTO.registeredDate':[
		{ required: true, message: '请选择注册日期', trigger: 'blur' }
	],
	'supplierDTO.supplyProperty':[
		{ required: true, message: '请选择供货属性', trigger: 'change' }
	],
	'supplierDTO.countryCode':[
		{ required: true, message: '请选择国家', trigger: 'change' }
	],
	'supplierDTO.provinceCode':[
		{ required: true, message: '请选择省市', trigger: 'change' }
	],
	'supplierDTO.cityCode':[
		{ required: true, message: '请选择城市', trigger: 'change' }
	],
	'supplierDTO.companyAddress':[
		{ required: true, message: '请输入注册地址', trigger: 'blur' },
		{ min: 1, max: 200, message: '长度在 1 到 200个字符', trigger: 'blur' }
	]
}
export const listingAddress = [{ required: true, message: '请选择上市地点', trigger: 'change' }]
export const stockCode = [{ required: true, message: '请输入股票代码', trigger: 'blur' }]

export const businessRules = {
  'supplierDTO.businessPeriod': [
    { required: true, message: '请输入经营期限', trigger: 'blur' },
    { min: 1, max: 50, message: '长度在 1 到 50个字符', trigger: 'blur' }
  ],
  'supplierDTO.businessPlaceForm': [
    { required: true, message: '请选择经营场所所有形式', trigger: 'change' }
  ],
  'supplierDTO.businessPlacePosition': [
    { required: true, message: '请输入经营场所位置', trigger: 'blur' }
  ]
}

export const bankRules={
	'settlementBankDTO.country':[
		{ required: false, message: '请选择银行所在国家', trigger: 'change' }
	],
	'settlementBankDTO.province':[
		{ required: false, message: '请选择银行所在省份', trigger: 'change' }
	],
	'settlementBankDTO.city':[
		{ required: false, message: '请选择银行所在城市', trigger: 'change' }
	],
	'settlementBankDTO.bankName':[
		{ required: false, message: '请输入银行名称', trigger: 'blur' }
	],
	'settlementBankDTO.bankCode':[
		{ required: false,message: '请输入正确银行代码', trigger: 'blur' },
		{ pattern:/^[A-Za-z0-9]+$/, message: '银行代码错误', trigger: 'blur' },
		{ min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
	],
	'settlementBankDTO.bankAccount':[
		{ required: false, message: '请输入正确银行卡号', trigger: 'blur' },
		// { pattern:/^[A-Za-z0-9]+$/, message: '银行卡号错误', trigger: 'blur' },
		{ min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
	],
	'settlementBankDTO.bankTaxCode':[
		{ required: false, message: '请输入税务代码', trigger: 'blur' },
		{ pattern:/^[A-Za-z0-9]+$/, message: '税务代码错误', trigger: 'blur' }
	]
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