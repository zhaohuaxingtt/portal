/*
 * @Author: 舒杰
 * @Date: 2021-05-17 21:11:42
 * @LastEditTime: 2023-02-03 17:16:06
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\generalPage\components\baseInfoCard\data.js
 */
export const baseInfoTitle = [
    {
        key: 'nameZh',
        name: 'SupplierZh',
        required: true,
        icons: "",
        tip: "",
        permission: 'SUPPLIER_BASEINFO_SUPPLIERZH',
        disabled: true
    },
    {
        key: 'shortNameZh',
        name: 'SupplierAbbreviationZh',
        required: true,
        icons: "iconxinxitishi",
        tip: "SUPPLIER_GONGYINGSHANGJIANCHENZHTIPS",
        permission: 'SUPPLIER_BASEINFO_SUPPLIERABBREVIATIONZH',
        disabled: true
    },
    {
        key: 'socialcreditNo',
        name: 'UnifySocialCreditCode',
        required: true,
        icons: "",
        tip: "",
        permission: 'SUPPLIER_BASEINFO_UNIFYSOCIALCREDITCODE',
        disabled: true
    },
    {
        key: 'nameEn',
        name: 'SupplierEn',
        required: true,
        icons: "",
        tip: "",
        permission: 'SUPPLIER_BASEINFO_SUPPLIEREN',
        disabled: true
    },
    {
        key: 'shortNameEn',
        name: 'SupplierAbbreviationEn',
        required: true,
        icons: "iconxinxitishi",
        tip: "SUPPLIER_GONGYINGSHANGJIANCHENGENTIPS",
        permission: 'SUPPLIER_BASEINFO_SUPPLIERABBREVIATIONEN',
        disabled: true
    },
    {
        key: 'dunsCode',
        name: 'DUNS',
        required: false,
        icons: "iconxinxitishi",
        tip: "SUPPLIER_DUNSTIPS",
        permission: 'SUPPLIER_BASEINFO_DUNS',
        disabled: true
    },
    {
        key: 'sapCode',
        name: 'SUPPLIER_SAPHAO',
        required: false,
        icons: "",
        tip: "",
        permission: 'SUPPLIER_BASEINFO_SAPNO',
        disabled: true
    },
    {
        key: 'svwTempCode',
        name: 'SUPPLIER_LINGSHIHAO',
        required: false,
        icons: "",
        tip: "",
        permission: 'SUPPLIER_BASEINFO_TEMPNO',
        disabled: true
    },
    {
        key: 'svwCode',
        name: 'ZHENGSHIHAO',
        required: false,
        icons: "",
        tip: "",
        permission: 'SUPPLIER_BASEINFO_SVW_NO',
        disabled: true
    },
    {
        key: 'vmCode',
        name: 'SUPPLIER_VWHAO',
        required: false,
        icons: "iconxinxitishi",
        tip: "SUPPLIER_VWCODETIP",
        permission: 'SUPPLIER_BASEINFO_VW-NO',
        disabled: true
    }
]


export const baseInfoTitleGP = [
    {
        key: 'nameZh',
        name: 'SupplierZh',
        required: true,
        icons: "",
        tip: "",
        // permission: 'SUPPLIER_BASEINFO_SUPPLIERZH',
        permission: 'SUPPLIER_BASEINFO_SUPPLIERZH_GP',
        disabled: true
    },
    {
        key: 'shortNameZh',
        name: 'SupplierAbbreviationZh',
        required: true,
        icons: "iconxinxitishi",
        tip: "SUPPLIER_GONGYINGSHANGJIANCHENZHTIPS",
        // permission: 'SUPPLIER_BASEINFO_SUPPLIERABBREVIATIONZH',
        permission: 'SUPPLIER_BASEINFO_SUPPLIERABBREVIATIONZH_GP',
        disabled: true
    },
    {
        key: 'socialcreditNo',
        name: 'UnifySocialCreditCode',
        required: true,
        icons: "",
        tip: "",
        // permission: 'SUPPLIER_BASEINFO_UNIFYSOCIALCREDITCODE',
        permission: 'SUPPLIER_BASEINFO_UNIFYSOCIALCREDITCODE_GP',
        disabled: true
    },
    {
        key: 'nameEn',
        name: 'SupplierEn',
        required: true,
        icons: "",
        tip: "",
        permission: 'SUPPLIER_BASEINFO_SUPPLIEREN_GP',
        // permission: 'SUPPLIER_BASEINFO_SUPPLIEREN',
        disabled: true
    },
    {
        key: 'shortNameEn',
        name: 'SupplierAbbreviationEn',
        required: true,
        icons: "iconxinxitishi",
        tip: "SUPPLIER_GONGYINGSHANGJIANCHENGENTIPS",
        // permission: 'SUPPLIER_BASEINFO_SUPPLIERABBREVIATIONEN',
        permission: 'SUPPLIER_BASEINFO_SUPPLIERABBREVIATIONEN_GP',
        disabled: true
    },
    {
        key: 'dunsCode',
        name: 'DUNS',
        required: false,
        icons: "iconxinxitishi",
        tip: "SUPPLIER_DUNSTIPS",
        // permission: 'SUPPLIER_BASEINFO_DUNS',
        permission: 'SUPPLIER_BASEINFO_DUNS_GP',
        disabled: true
    },
    {
        key: 'sapCode',
        name: 'SUPPLIER_SAPHAO',
        required: false,
        icons: "",
        tip: "",
        // permission: 'SUPPLIER_BASEINFO_SAPNO',
        permission: 'SUPPLIER_BASEINFO_SAPNO_GP',
        disabled: true
    },
    {
        key: 'svwTempCode',
        name: 'SUPPLIER_LINGSHIHAO',
        required: false,
        icons: "",
        tip: "",
        // permission: 'SUPPLIER_BASEINFO_TEMPNO',
        permission: 'SUPPLIER_BASEINFO_TEMPNO_GP',
        disabled: true
    },
    {
        key: 'svwCode',
        name: 'ZHENGSHIHAO',
        required: false,
        icons: "",
        tip: "",
        // permission: 'SUPPLIER_BASEINFO_SVW_NO',
        permission: 'SUPPLIER_BASEINFO_SVW_NO_GP',
        disabled: true
    },
    {
        key: 'supplierType',
        name: 'SUPPLIER_SUPPLIERTYPE',
        required: false,
        // icons: "iconxinxitishi",
        // tip: "SUPPLIER_VWCODETIP",
        // permission: 'SUPPLIER_BASEINFO_SUPPLIERTYPE',
        permission: 'SUPPLIER_BASEINFO_SUPPLIERTYPE_GP',
        disabled: true
    },
    // {
    //     key: 'payRecord',
    //     name: 'FUKUANGJILV',
    //     required: false,
    //     // icons: "iconxinxitishi",
    //     // tip: "SUPPLIER_VWCODETIP",
    //     permission: 'SUPPLIER_BASEINFO_SUPPLIERTYPE',
    //     disabled:true
    // }
]

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
    gpSupplierBankNoteDTO: {
        bankNoteName: "",
        bankNoteAccount: "",
        country: "",
        province: "",
        city: "",
    },
    //银行子账户列表信息
    subBankList: [],
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
    'supplierDTO.isListing': [
        { required: true, message: '请选择是否上市', trigger: 'change' }
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
export const listingAddress = [{ required: true, message: '请选择上市地点', trigger: 'change' }]
export const stockCode = [{ required: true, message: '请输入股票代码', trigger: 'blur' }]

export const businessRules = {
    'supplierDTO.businessScope': [
        { required: true, message: '请输入经营范围', trigger: 'blur' },
    ],
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
    {
        props: 'businessTypeDesc',
        name: '业务类型',
        key: 'EKL_YJGL_YWLX',
        maxlength: 150
    },
    {
        props: 'businessBuyerEmail',
        name: '采购员邮箱',
        key: 'SUPPLIER_PURCHASEREMAIL',
        rule: [{ required: true, message: '请输入', trigger: 'blur' }],
    },
    {
        props: 'businessBuyerName',
        name: '采购员',
        width: 180,
        key: 'SPR_FRM_XGYSPJ_CGY',
    },
    {
        props: 'businessBuyerNum',
        name: '采购员工号',
        key: 'CAIGOUYUANGONGHAO',
        rule: [{ required: true, message: '请输入', trigger: 'blur' }],
    },
    {
        props: 'businessBuyerDept',
        name: '采购员科室',
        key: 'CAIGOUYUANKESHI',
        rule: [{ required: true, message: '请输入', trigger: 'blur' }],
    },
    {
        props: 'businessContactEmail',
        name: '业务部门联系人邮箱',
        key: 'YEWUBUMENLIANXIRENYOUXIANG',
    },
    {
        props: 'businessContactUser',
        name: '业务部门联系人姓名',
        width: 180,
        key: 'YEWUBUMENLIANXIRENXINGMING',
        maxlength: 3,
    },
    {
        props: 'industryPosition',
        name: '是否启用',
        key: 'SHIFOUQIYONG',
        maxlength: 200
    },
]


export const tableData = [
    {
        businessTypeDesc: '间接物料',
        businessType: '1',
        businessBuyerEmail: "",
        businessBuyerName: "",
        businessBuyerNum: "",
        businessBuyerDept: "",
        businessContactEmail: "",
        businessContactUser: "",
        industryPosition: "N",
    },
]