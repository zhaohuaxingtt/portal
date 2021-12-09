/*
 * @Date: 2021-11-29 14:22:03
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-07 15:01:38
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\components\data.js
 */
export const tableTitle=[
    {
        props: 'supplierNum',
        name: '供应商编号',
        key: 'GOMGYINGSHANGBIANHAO',
        required: true,
        width:120,
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
        width:120,
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
        width:120,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'contactName',
        name: '联系人姓名',
        width:120,
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
        width:120,
        key: 'LIANXIRENDIANHUA',
    },
    {
        props: 'contactMobile',
        name: '联系人手机',
        width:120,
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
        width:120,
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
        width:120,
        key: 'CHAOQISHIJIAN',
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