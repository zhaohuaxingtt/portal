/*
 * @Date: 2021-11-29 14:22:03
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-16 18:07:46
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\components\data.js
 */
export const tableTitle = [{
        props: 'supplierNum',
        name: '供应商编号',
        key: 'GOMGYINGSHANGBIANHAO',
        required: true,
        width: 120,
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
        name: '用户名',
        key: 'YONGHUMING',
    },
    {
        props: 'position',
        name: '是否激活',
        key: 'SHIFOUJIHUO',
    },
    {
        props: 'markExpiration',
        name: '是否超期',
        key: 'SHIFOUCHAOQI',
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
        rule: [{
            required: true,
            pattern: /^[0-9]\d{4,4}$/,
            message: '供应商编号为五位数字',
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

export const tableTitleDetail = [{
    props: 'nameZh',
    name: '应⽤中⽂名',
    key: 'YINGYONGZHONGWENMING',
}, {
    props: 'nameEn',
    name: '应⽤英⽂名',
    key: 'YINGYONGYINGWENMING',
}, {
    props: 'shortName',
    name: '应⽤简称',
    key: 'YINGYONGJIANCHENG',
},
{
    props: 'ldapSchema',
    name: '安全中心LDAP属性',
    key: 'ANQUANZHONGXINLDAPSHUXING',
},
]
export const tableTitleDetailAdd = [{
    props: 'nameZh',
    name: '应⽤中⽂名',
    key: 'YINGYONGZHONGWENMING',
}, {
    props: 'nameEn',
    name: '应⽤英⽂名',
    key: 'YINGYONGYINGWENMING',
}, {
    props: 'shortName',
    name: '应⽤简称',
    key: 'YINGYONGJIANCHENG',
},
{
    props: 'ldapSchema',
    name: '安全中心LDAP属性',
    key: 'ANQUANZHONGXINLDAPSHUXING',
},
]