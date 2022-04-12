export const baseRules = {
    nameZh: [
		{ required: true, message: '请输入供应商中文名', trigger: 'blur' },
		{ min: 1, max: 70, message: '长度在 1 到 70个字符', trigger: 'blur' }  
	],
	nameEn: [
		{ required: true, message: '请输入供应商英文名', trigger: 'blur' },
		{ min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
	],
}

export const comRules = {
	countryCode:[
		{ required: true, message: '请选择国家', trigger: 'change' }
	],
	provinceCode:[
		{ required: true, message: '请选择省市', trigger: 'change' }
	],
	cityCode:[
		{ required: true, message: '请选择城市', trigger: 'change' }
	],
	corpEmail:[
		{ required: true, message: '请输入邮箱', trigger: 'blur' },
		{ pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱格式错误', trigger: 'blur' }
	],
}

export const tableTitle = [
	{
		props: 'contactType',
		name: '联系人类型',
		key: 'SUPPLIER_LIANXIRENLEIXING'
	},
	{
		props: 'nameZh',
		name: '联系人姓名',
		key: 'SUPPLIER_LIANXIRENXINGMING',
		required: true
	},
	{ props: 'designation', name: '职位', key: 'SUPPLIER_ZHIWEI', width: 200 },
	{ props: 'dept', name: '部门', key: 'SUPPLIER_BUMEN', width: 200 },
	{ props: 'telephoneAreaCode', name: '区号', key: 'SUPPLIER_QUHAO' },
	{
		props: 'telephone',
		name: '联系电话',
		key: 'SUPPLIER_LIANXIDIANHUA',
		required: true,
		width: 150
	},
	{
		props: 'email',
		name: '电子邮件',
		key: 'SUPPLIER_DIANZIYOUJIAN',
		required: true,
		width: 270,
		rule: [
			{
			pattern:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: '请输入正确的电子邮件',
			trigger: 'blur'
			}
		]
	},
	{ props: 'remark', name: '备注', key: 'SUPPLIER_BEIZHU' }
]

export const tableTitleUser = [
	{
		props: '1',
		name: '联系人姓名',
		key: 'TERMS_LIANXIRENXINGMING'
	},{
		props: '2',
		name: '职位',
		key: 'SUPPLIER_ZHIWEI'
	},{
		props: '3',
		name: '部门',
		key: 'SUPPLIER_BUMEN'
	},{
		props: '4',
		name: '区号',
		key: 'SUPPLIER_QUHAO'
	},{
		props: '5',
		name: '联系电话',
		key: 'SUPPLIER_LIANXIDIANHUA'
	},{
		props: '6',
		name: '手机号码',
		key: 'SUPPLIER_SHOUJIHAOMA'
	},{
		props: '7',
		name: '电子邮件',
		key: 'SUPPLIER_DIANZIYOUJIAN'
	},{
		props: '8',
		name: '用户登录名',
		key: 'SUPPLIER_YONGHUDENGLUMING'
	},{
		props: '9',
		name: '是否有效',
		key: 'SUPPLIER_LIANXIRENLEIXING'
	},{
		props: '10',
		name: '是否超期',
		key: 'SHIFOUCHAOQI'
	},{
		props: '11',
		name: '登录RISE系统时间',
		key: 'DENGLURISEXITONGTIME',
		width:150
	},{
		props: '12',
		name: '应用关联',
		key: 'YINGYONGGUANLIAN'
	},
]

export const tableTitleUpload = [
	{
		props: 'fileName',
		name: '文件名称',
		key: 'TERMS_WENJIANMINGCHENG'
	},{
		props: 'fileSize',
		name: '大小（MB）',
		key: 'LK_DAXIAOMB'
	},{
		props: 'createDate',
		name: '上传日期',
		key: 'LK_SHANGCHUANRIQI'
	},{
		props: 'createrName',
		name: '上传人',
		key: 'LK_SHANGCHUANREN'
	},{
		props: 'validityOfCertificate',
		name: '证件有效期',
		key: 'SUPPLIER_ZHENGJIANYOUXIAOQI'
	}
]

export const supplierCompleteRe = {
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
		corpEmail:"",//公司邮箱
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
	contactsSaveDTO:{
		list:[
			{
				contactType:"BUSINESS_CONTACTS",
				nameZh:"",
				designation:"",
				dept:"",
				telephoneAreaCode:"",
				telephone:"",
				email:"",
				remark:"",
			}
		]
	},
	// 一般供应商
	gpSupplierDTO: {

	},
	//附件信息
	attachmentList:[],
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
		countryCode: "",//国家
		provinceCode: "",//省份
		cityCode: "",//	城市
		bankAccount: "",//结算银行账号
		bankTaxCode: ""//税务号
	}
}

