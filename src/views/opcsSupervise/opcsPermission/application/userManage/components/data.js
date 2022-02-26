/*
 * @Date: 2021-11-29 14:22:03
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-20 15:18:44
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\components\data.js
 */
export function codeFun(rule, value, callback) {
 
    
    var arr = []
    arr = value.split(',')
    if(!/^\d+$/.test(arr.join(""))){
        callback(new Error('只能输入逗号分开的五位数字！'));
    }
    var p = arr.every(v => {
        console.log(v)
        return v.toString().length ==5
    });
    if (p) {
        callback()
    } else {
        callback(new Error('只能输入逗号分开的五位数字！'));
    }
    // value.join()
}
export const tableTitle = [{
        props: 'supplierNum',
        name: '供应商编号',
        key: 'GOMGYINGSHANGBIANHAO',
        required: true,
        width: 150,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'supplierName',
        name: '供应商名称',
        key: 'GONGYINGSHANGMINGCHENG',
        required: true,
        width: 120,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'supplierAddress',
        name: '供应商地址',
        key: 'GONGYINGSHANGDIZHI',
        required: true,
        width: 120,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'contactName',
        name: '联系人姓名',
        width: 120,
        key: 'LIANXIRENXINGMING',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'contactTel',
        name: '联系人电话',
        width: 120,
        key: 'LIANXIRENDIANHUA',
    },
    {
        props: 'contactMobile',
        name: '联系人手机',
        width: 120,
        key: 'LIANXIRENSHOUJI',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'contactEmail',
        name: '联系人邮箱',
        width: 120,
        key: 'LIANXIRENYOUXIANG',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'userName',
        name: '用户登录名',
        key: 'YONGHUDENGLUMING',
    },
    {
        props: 'isActive',
        name: '是否活动',
        key: 'SHIFOUHUODONG',
        width:80,
    },
    {
        props: 'markExpiration',
        name: '是否超期',
        key: 'SHIFOUCHAOQI',
        width:80
    },
    {
        props: 'expirationTime',
        name: '超期时间',
        width: 120,
        key: 'CHAOQISHIJIAN',
    },
    {
        props: 'system',
        name: '应用关联',
        key: 'YINGYONGGUANLIAN',
    },
]
export const tableTitleEdit = [{
        props: 'supplierNum',
        name: '供应商编号',
        key: 'GOMGYINGSHANGBIANHAO',
        required: true,
        type: 'number',
        width: 240,
        rule: [{
            required: true,
            validator: codeFun,
            trigger: 'blur'
        }]
    },
    {
        props: 'supplierName',
        name: '供应商名称',
        key: 'GONGYINGSHANGMINGCHENG',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'supplierAddress',
        name: '供应商地址',
        key: 'GONGYINGSHANGDIZHI',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'contactName',
        name: '联系人姓名',
        key: 'LIANXIRENXINGMING',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'contactTel',
        name: '联系人电话',
        key: 'LIANXIRENDIANHUA',
    },
    {
        props: 'contactMobile',
        name: '联系人手机',
        key: 'LIANXIRENSHOUJI',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'contactEmail',
        name: '联系人邮箱',
        key: 'LIANXIRENYOUXIANG',
        required: true,
        rule: [{
            required: true,
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '请输入正确的电子邮件',
            trigger: 'blur'
        }]
    },
]

export const tableTitleImportErr = [{
        props: 'supplierNum',
        name: '供应商编号',
        key: 'GOMGYINGSHANGBIANHAO',
        width: 240,
        required: true,
    },
    {
        props: 'supplierName',
        name: '供应商名称',
        key: 'GONGYINGSHANGMINGCHENG',
        required: true,
    },
    {
        props: 'supplierAddress',
        name: '供应商地址',
        key: 'GONGYINGSHANGDIZHI',
        required: true,
    },
    {
        props: 'contactName',
        name: '联系人姓名',
        key: 'LIANXIRENXINGMING',
        required: true,
    },
    {
        props: 'contactTel',
        name: '联系人电话',
        key: 'LIANXIRENDIANHUA',
    },
    {
        props: 'contactMobile',
        name: '联系人手机',
        key: 'LIANXIRENSHOUJI',
        required: true,
    },
    {
        props: 'contactEmail',
        name: '联系人邮箱',
        key: 'LIANXIRENYOUXIANG',
        required: true,
    },
    {
        props: 'remark',
        name: '失败原因',
        key: 'SHIBEIYUANYING',
    },
]
export const tableTitleDetail = [{
        props: 'nameZh',
        name: '应⽤中⽂名',
        key: 'YINGYONGZHONGWENMING',
    }, {
        props: 'nameEn',
        name: '应⽤英⽂名',
        key: 'YINGYONGYINGWENMING',
    },
    {
        props: 'memo',
        name: '应用类型',
        key: 'YINGYONLEIXING'
    }
]
export const tableTitleDetailAdd = [{
        props: 'nameZh',
        name: '应⽤中⽂名',
        key: 'YINGYONGZHONGWENMING',
    }, {
        props: 'nameEn',
        name: '应⽤英⽂名',
        key: 'YINGYONGYINGWENMING',
    },
    {
        props: 'ldapSchema',
        name: 'AppCode',
        key: 'AppCode',
    },
]