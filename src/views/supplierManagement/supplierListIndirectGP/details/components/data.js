// 基础信息校验
export const baseInfoRules = {
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
    'supplierDTO.enterpriseType': [
        { required: true, message: '请选择企业类型', trigger: 'change' }
    ],
    'supplierDTO.epNatureCategory': [
        { required: true, message: '请选择企业性质（大类）', trigger: 'change' }
    ],
    'supplierDTO.epNatureSubcategory': [
        { required: true, message: '请选择企业性质（小类）', trigger: 'change' }
    ],
    'supplierDTO.industry': [
        { required: true, message: '请选择所属行业', trigger: 'change' }
    ],
    'supplierDTO.industryCode': [
        { required: true, message: '请选择行业代码）', trigger: 'change' }
    ],
    'supplierDTO.businessOfScope': [
        { required: true, message: '请选择业务范围）', trigger: 'change' }
    ],
    'supplierDTO.registeredCapital': [
        { required: true, message: '请输入注册资本', trigger: 'blur' },
        { min: 1, max: 100, message: '长度在 1 到 100个字符', trigger: 'blur' }
    ],
    'supplierDTO.registeredDate': [
        { required: true, message: '请选择注册日期', trigger: 'blur' }
    ],
    'supplierDTO.supplyProperty': [
        { required: true, message: '请选择供货属性', trigger: 'change' }
    ],
    'supplierDTO.countryCode': [
        { required: true, message: '请选择国家', trigger: 'change' }
    ],
    'supplierDTO.provinceCode': [
        { required: true, message: '请选择省市', trigger: 'change' }
    ],
    'supplierDTO.cityCode': [
        { required: true, message: '请选择城市', trigger: 'change' }
    ],
    'supplierDTO.companyAddress': [
        { required: true, message: '请输入注册地址', trigger: 'blur' },
        { min: 1, max: 200, message: '长度在 1 到 200个字符', trigger: 'blur' }
    ]
}
export const stockCode = [{ required: true, message: '请输入股票代码', trigger: 'blur' }]

export const bankRules = {
    'settlementBankDTO.countryCode': [
        { required: true, message: '请选择银行所在国家', trigger: 'change' }
    ],
    'settlementBankDTO.provinceCode': [
        { required: true, message: '请选择银行所在省份', trigger: 'change' }
    ],
    'settlementBankDTO.cityCode': [
        { required: true, message: '请选择银行所在城市', trigger: 'change' }
    ],
    'settlementBankDTO.bankName': [
        { required: true, message: '请输入银行名称', trigger: 'blur' }
    ],
    'settlementBankDTO.bankCode': [
        { required: true, message: '请输入正确银行机构编码', trigger: 'blur' },
        // { pattern:/^[A-Za-z0-9]+$/, message: '银行机构编码错误', trigger: 'blur' },
        // { min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
    ],
    'settlementBankDTO.bankAccount': [
        { required: true, message: '请输入正确银行卡号', trigger: 'blur' },
        // { pattern:/^[A-Za-z0-9]+$/, message: '银行卡号错误', trigger: 'blur' },
        // { min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
    ],
    'settlementBankDTO.bankTaxCode': [
        { required: true, message: '请输入税务代码', trigger: 'blur' },
        // { pattern:/^[A-Za-z0-9]+$/, message: '税务代码错误', trigger: 'blur' }
    ],
    'gpSupplierBankNoteDTO.bankNoteName': [
        { required: true, message: '请输入电子银票账户银行名称', trigger: 'blur' },
    ],
    'gpSupplierBankNoteDTO.bankNoteAccount': [
        { required: true, message: '请输入电子银票银行账户行号', trigger: 'blur' },
        // { pattern:/^[A-Za-z0-9]+$/, message: '账户行号错误', trigger: 'blur' }
    ],
    'gpSupplierBankNoteDTO.country': [
        { required: true, message: '请输入电子银票银行所在国家', trigger: 'change' },
    ],
    'gpSupplierBankNoteDTO.province': [
        { required: true, message: '请输入电子银票银行所在省份', trigger: 'change' },
    ],
    'gpSupplierBankNoteDTO.city': [
        { required: true, message: '请输入电子银票账户银行城市', trigger: 'change' },
    ],
}

export const bankRulesBank = {
    'country': [
        { required: true, message: '请选择银行所在国家', trigger: 'change' }
    ],
    'province': [
        { required: true, message: '请选择银行所在省份', trigger: 'change' }
    ],
    'city': [
        { required: true, message: '请选择银行所在城市', trigger: 'change' }
    ],
    'bankName': [
        { required: true, message: '请输入银行名称', trigger: 'blur' }
    ],
    'bankCode': [
        { required: true, message: '请输入正确银行机构编码', trigger: 'blur' },
        // { pattern:/^[A-Za-z0-9]+$/, message: '银行机构编码错误', trigger: 'blur' },
        // { min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
    ],
    'bankAccount': [
        { required: true, message: '请输入正确银行卡号', trigger: 'blur' },
        // { pattern:/^[A-Za-z0-9]+$/, message: '银行卡号错误', trigger: 'blur' },
        // { min: 1, max: 40, message: '长度在 1 到 40个字符', trigger: 'blur' }
    ],
    'salaryAccount': [
        { required: true, message: '请输入农民工工资专用账户名称', trigger: 'blur' },
    ],
}

export const tableTitle = [
	// {
	// 	props: 'contactTypeDesc',
	// 	name: '联系人类型',
	// 	key: 'SUPPLIER_LIANXIRENLEIXING'
	// },
	{
		props: 'nameZh',
		name: '联系人姓名',
		key: 'SUPPLIER_LIANXIRENXINGMING',
		rule: [{required: true, message: '请输入', trigger: 'blur'}],
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
		rule: [
			{required: true, message: '请输入', trigger: 'blur'},
			{pattern: /^[0-9]+$/, message: '请输入', trigger: 'blur'},
		],
		width: 150
	},
	{
		props: 'email',
		name: '电子邮件',
		key: 'SUPPLIER_DIANZIYOUJIAN',
		width: 270,
		required: true,
		rule: [
            {required: true, message: '请输入', trigger: 'blur'},
            {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '请输入正确的电子邮件',
              trigger: ['blur', 'change']
            }
          ],
          maxlength: 40
	},
	{ props: 'userName', name: '用户登录名', key: '用户登录名' }
]