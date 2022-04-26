import {permissionTitle} from '@/utils'

/*export const tableTitle = permissionTitle("SUPPLIER_MAINPRODUCT_TABLE", [
    {props:'name',name:'主要产品', required: true, key: 'ZHUYAOCHANPIN'},
    {props:'annualOutput',name:'年产量', key: 'NIANCHANLIANG'},
    {props:'oemName',name:'主要配套主机厂/客户', width: 150, required: true, key: 'ZHUYAOPEITAOZHUJICHANG_KEHU'},
    {props:'deliveryStartDate',name:'开始供货时间', key: 'KAISHIGONGHUSHIJIAN'},
    {props:'deliveryYear',name:'供货年份', key : 'GONGHUONIANFEN'},
    {props:'annualVolumns',name:'年供货量', required: true, key: 'NIANGONGHUOLIANG'},
    {props:'domesticMarketShare',name:'国内市场占有率（%）', width: 180, required: true, key: 'GUOLEISHITANGZHANYOULV'},
    {props:'industryPosition',name:'所处行业位置', key: 'SUOSHUHANGYEWEIZHI'},
    {props:'svwRatio',name:'可供svw比例', key: 'KEGONGsvwBILI'},
])*/
export const tableTitle1 = [
    {
        props: 'name',
        name: '主要产品',
        required: true,
        key: 'ZHUYAOCHANPIN',
        rule: [{required: true, message: '请输入', trigger: 'blur'}],
        maxlength: 150,
        width: 200
    },
    {
        props: 'annualOutput',
        name: '年产量',
        key: 'NIANCHANLIANG',
        maxlength: 50
    },
    {
        props: 'oemName',
        name: '主要配套主机厂/客户',
        width: 180,
        required: true,
        key: 'ZHUYAOPEITAOZHUJICHANG_KEHU',
        rule: [{required: true, message: '请输入', trigger: 'blur'}],
        maxlength: 100
    },
    {
        props: 'deliveryStartDate',
        name: '开始供货时间',
        key: 'KAISHIGONGHUSHIJIAN'
    },
    {
        props: 'deliveryYear',
        name: '供货年份',
        key: 'GONGHUONIANFEN'
    },
    {
        props: 'annualVolumns',
        name: '年供货量',
        required: true,
        key: 'NIANGONGHUOLIANG',
        rule: [{required: true, message: '请输入', trigger: 'blur'}],
        maxlength: 100
    },
    {
        props: 'domesticMarketShare',
        name: '国内市场占有率（%）',
        width: 180,
        required: true,
        key: 'GUOLEISHITANGZHANYOULV',
        rule: [
          {
            pattern: /^([1-9][0-9]{0,1}|100)$/,
            message: '请输入1-100的整数',
            trigger: 'blur',
          }],
        maxlength: 3,
    },
    {
        props: 'industryPosition',
        name: '所处行业位置',
        key: 'SUOSHUHANGYEWEIZHI',
        maxlength: 200
    },
    {
        props: 'svwRatio',
        name: '可供svw比例',
        key: 'KEGONGsvwBILI',
        maxlength: 50
    }
]

export const tableTitleGP1 = [
    {
        props: 'name',
        name: '主要产品',
        required: true,
        key: 'ZHUYAOCHANPIN',
        rule: [{required: true, message: '请输入', trigger: 'blur'}],
        maxlength: 150,
        width: 200
    },
    {
        props: 'annualOutput',
        name: '年产量',
        key: 'NIANCHANLIANG',
        maxlength: 50
    },
    {
        props: 'oemName',
        name: '主要配套主机厂/客户',
        width: 180,
        required: true,
        key: 'ZHUYAOPEITAOZHUJICHANG_KEHU',
        rule: [{required: true, message: '请输入', trigger: 'blur'}],
        maxlength: 100
    },
    {
        props: 'deliveryStartDate',
        name: '开始供货时间',
        key: 'KAISHIGONGHUSHIJIAN'
    },
    {
        props: 'deliveryYear',
        name: '供货年份',
        key: 'GONGHUONIANFEN'
    },
    {
        props: 'annualVolumns',
        name: '年供货量',
        key: 'NIANGONGHUOLIANG',
        maxlength: 100
    },
    {
        props: 'domesticMarketShare',
        name: '国内市场占有率（%）',
        width: 180,
        key: 'GUOLEISHITANGZHANYOULV',
        rule: [
          {
            pattern: /^([1-9][0-9]{0,1}|100)$/,
            message: '请输入1-100的整数',
            trigger: 'blur',
          }],
        maxlength: 3,
    },
    {
        props: 'industryPosition',
        name: '所处行业位置',
        key: 'SUOSHUHANGYEWEIZHI',
        maxlength: 200
    },
    {
        props: 'svwRatio',
        name: '可供svw比例',
        key: 'KEGONGsvwBILI',
        maxlength: 50
    }
]

export const tableTitleGP2 = [
    {
        props: 'name',
        name: '主要产品',
        key: 'ZHUYAOCHANPIN',
        maxlength: 150,
        width: 200
    },
    {
        props: 'annualOutput',
        name: '年产量',
        key: 'NIANCHANLIANG',
        maxlength: 50
    },
    {
        props: 'oemName',
        name: '主要配套主机厂/客户',
        width: 180,
        key: 'ZHUYAOPEITAOZHUJICHANG_KEHU',
        maxlength: 100
    },
    {
        props: 'deliveryStartDate',
        name: '开始供货时间',
        key: 'KAISHIGONGHUSHIJIAN'
    },
    {
        props: 'deliveryYear',
        name: '供货年份',
        key: 'GONGHUONIANFEN'
    },
    {
        props: 'annualVolumns',
        name: '年供货量',
        key: 'NIANGONGHUOLIANG',
        maxlength: 100
    },
    {
        props: 'domesticMarketShare',
        name: '国内市场占有率（%）',
        width: 180,
        key: 'GUOLEISHITANGZHANYOULV',
        rule: [
          {
            pattern: /^([1-9][0-9]{0,1}|100)$/,
            message: '请输入1-100的整数',
            trigger: 'blur',
          }],
        maxlength: 3,
    },
    {
        props: 'industryPosition',
        name: '所处行业位置',
        key: 'SUOSHUHANGYEWEIZHI',
        maxlength: 200
    },
    {
        props: 'svwRatio',
        name: '可供svw比例',
        key: 'KEGONGsvwBILI',
        maxlength: 50
    }
]