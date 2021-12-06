/*
 * @Date: 2021-11-29 14:22:03
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-06 15:13:54
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\components\data.js
 */
export const tableTitle=[
    {
        props: 'supplierNum',
        name: '供应商编号',
        key: 'GOMGYINGSHANGBIANHAO',
        required: true,
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
        name: '是否过期',
        key: 'SHIFOUGUOQI',
    },
    {
        props: 'expirationTime',
        name: '过期时间',
        key: 'GUOQISHIJIAN',
    },
    {
        props: '应用关联',
        name: '应用关联',
        key: 'AppsAss',
    },
]
export const tableTitleEdit=[
    {
        props: 'supplierNum',
        name: '供应商编号',
        key: 'GOMGYINGSHANGBIANHAO',
        required: true,
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
            message: '请输入',
            trigger: 'blur'
        }]
    },

    
]