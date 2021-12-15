export const baseRules = {
    supplierNameCn: [{
            required: true,
            message: '请输入供应商中文名',
            trigger: 'blur',
        },
        {
            min: 1,
            max: 200,
            message: '长度在 1 到 200个字符',
            trigger: 'blur'
        },
    ],
    supplierShortNameCn: [{
            required: true,
            message: '请输入供应商简称(中)',
            trigger: 'blur'
        },
        {
            min: 1,
            max: 200,
            message: '长度在 1 到 200个字符',
            trigger: 'blur'
        },
    ],
    creditCode: [{
            required: true,
            message: '请输入统一社会信用代码',
            trigger: 'blur'
        },
        {
            min: 1,
            max: 18,
            message: '长度在 1 到 18个字符',
            trigger: 'blur'
        },
    ],
    supplierNameEn: [{
            required: true,
            message: '请输入供应商英文名',
            trigger: 'blur'
        },
        {
            min: 1,
            max: 200,
            message: '长度在 1 到 200个字符',
            trigger: 'blur'
        },
    ],
    supplierShortNameEn: [{
            required: true,
            message: '请输入供应商简称(英)',
            trigger: 'blur'
        },
        {
            min: 1,
            max: 20,
            message: '长度在 1 到 20个字符',
            trigger: 'blur'
        },
    ],
}


// 基础信息校验
export const companyProfileRules = {
    'legalRepresentative': [{
            required: true,
            message: '请输入法定代表人',
            trigger: 'blur'
        },
        {
            min: 1,
            max: 30,
            message: '长度在 1 到 30个字符',
            trigger: 'blur'
        }
    ],
    'companySize': [{
        required: true,
        message: '请选择企业规模',
        trigger: 'change'
    }],

    'enterpriseType': [{
        required: true,
        message: '请选择企业性质（大类）',
        trigger: 'change'
    }],
    'certification': [{
        required: true,
        message: '请选择企业资质与认证',
        trigger: 'change'
    }],

    'registeredCapital': [{
            required: true,
            message: '请输入注册资本',
            trigger: 'blur'
        },
        {
            min: 1,
            max: 100,
            message: '长度在 1 到 100个字符',
            trigger: 'blur'
        }
    ],


    'address.countryCode': [{
        required: true,
        message: '请选择国家',
        trigger: 'change'
    }],
    'address.provinceCode': [{
        required: true,
        message: '请选择省市',
        trigger: 'change'
    }],
    'address.cityCode': [{
        required: true,
        message: '请选择城市',
        trigger: 'change'
    }],
    'address.address': [{
            required: true,
            message: '请输入注册地址',
            trigger: 'blur'
        },
        {
            min: 1,
            max: 200,
            message: '长度在 1 到 200个字符',
            trigger: 'blur'
        }
    ],
    'address.postCode': [{
            required: true,
            message: '请输入注册地址邮编',
            trigger: 'blur'
        },
        {
            min: 1,
            max: 200,
            message: '长度在 1 到 30个字符',
            trigger: 'blur'
        }
    ]
}
export const supplierDirectoryTableTitle = [{
        props: 'name',
        name: '联系人姓名',
        maxlength: 50,
        key: 'SUPPLIER_LIANXIRENXINGMING',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'position',
        name: '职位',
        key: 'SUPPLIER_ZHIWEI',
    },
    {
        props: 'dept',
        name: '部门',
        key: 'SUPPLIER_BUMEN',
    },
    {
        props: 'telephoneAreaCode',
        name: '区号',
        maxlength: 10,
        key: 'SUPPLIER_QUHAO',
    },
    {
        props: 'telephoneM',
        name: '联系电话',
        maxlength: 20,
        key: 'SUPPLIER_LIANXIDIANHUA',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'email',
        name: '电子邮件',
        key: 'SUPPLIER_DIANZIYOUJIAN',
        required: true,
        width: 150,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },

]
export const tableTitle = [{
        props: 'factoryName',
        name: '工厂名称',
        key: 'GONGCHANGMINGCHEN',
        maxlength: 256,
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'country',
        name: '国家',
        key: 'GUOJIA',
        required: true,
        rule: [{
            required: true,
            message: '请选择',
            trigger: 'change'
        }]
    },
    {
        props: 'province',
        name: '省份',
        key: 'SHENGFEN',
        required: true,
        rule: [{
            required: true,
            message: '请选择',
            trigger: 'change'
        }]
    },
    {
        props: 'city',
        name: '城市',
        key: 'SUPPLIER_CHENGSHI',
        required: true,
        rule: [{
            required: true,
            message: '请选择',
            trigger: 'change'
        }]
    },
    {
        props: 'address',
        name: '详细地址',
        key: 'XIANGXIDIZHI',
        maxlength: 300,
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'postCode',
        name: '邮编',
        key: 'YOUBIAN',
        maxlength: 10,
        width: 140,
        required: true,
        rule: [{
            required: true,
            pattern: /^[A-Za-z0-9]+$/,
            message: '请输入合法的邮编',
            trigger: 'blur'
        }]
    },
    {
        props: 'areaCovered',
        name: '工厂占地面积',
        key: 'GONGCHANGZHANDIMIANJI'
    }
]