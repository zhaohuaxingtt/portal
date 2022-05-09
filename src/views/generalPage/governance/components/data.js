/*
 * @Author: your name
 * @Date: 2021-04-19 18:04:28
 * @LastEditTime: 2021-05-07 22:39:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\views\generalPage\governance\components\data.js
 */
export const staffTitle = [
    {
        key: 'totalEmployees',
        name: '员工数',
        permissionKey: 'PARTSIGN_EDITORDETAIL_PARTNUMBER',
        language: 'YUANGONGSHU',
        permission: 'SUPPLIER_GOVERNANCE_AMOUNTOFTOTALEMPLOYEES'
    },
    {
        key: 'managerNum',
        name: '管理人员数',
        permissionKey: 'PARTSIGN_EDITORDETAIL_PARTNAMEZH',
        language: 'GUANLIRENYUAN',
        permission: 'SUPPLIER_GOVERNANCE_AMOUNTOFMANAGERS'
    },
    {
        key: 'technicistNum',
        name: '研发人员数',
        permissionKey: 'PARTSIGN_EDITORDETAIL_PARTNAMEGER',
        language: 'YANFARENYUANSHU',
        permission: 'SUPPLIER_GOVERNANCE_AMOUNTOFTECHNICIANS'
    },
    {
        key: 'salesmanNum',
        name: '生产人员数',
        permissionKey: 'PARTSIGN_EDITORDETAIL_VEHICLECATEGORIES',
        language: 'SHENGCHANRENYUANSHU',
        permission: 'SUPPLIER_GOVERNANCE_AMOUNTPRODUCT'
    },
    {
        key: 'daytalerNum',
        name: '临时工人数',
        permissionKey: 'PARTSIGN_EDITORDETAIL_MODELPROJECT',
        language: 'LINSHIGONGRENSHU',
        permission: 'SUPPLIER_GOVERNANCE_AMOUNTOFCASUALWORKERS'
    },
    {
        key: 'isLaborunion',
        name: '是否设置工会',
        permissionKey: 'PARTSIGN_EDITORDETAIL_INFORMATIONCLASSIFICATION',
        language: 'SHIFOUSHEZHIGONGHUI',
        permission: 'SUPPLIER_GOVERNANCE_LABOURUNIONORNONE'
    }
]

export const staffTitleGP = [
    {
        key: 'totalEmployees',
        name: '员工数',
        permissionKey: 'PARTSIGN_EDITORDETAIL_PARTNUMBER',
        language: 'YUANGONGSHU',
        permission: 'SUPPLIER_GOVERNANCE_AMOUNTOFTOTALEMPLOYEES_GP'
    },
    {
        key: 'managerNum',
        name: '管理人员数',
        permissionKey: 'PARTSIGN_EDITORDETAIL_PARTNAMEZH',
        language: 'GUANLIRENYUAN',
        permission: 'SUPPLIER_GOVERNANCE_AMOUNTOFMANAGERS_GP'
    },
    {
        key: 'technicistNum',
        name: '研发人员数',
        permissionKey: 'PARTSIGN_EDITORDETAIL_PARTNAMEGER',
        language: 'YANFARENYUANSHU',
        permission: 'SUPPLIER_GOVERNANCE_AMOUNTOFTECHNICIANS_GP'
    },
    {
        key: 'salesmanNum',
        name: '生产人员数',
        permissionKey: 'PARTSIGN_EDITORDETAIL_VEHICLECATEGORIES',
        language: 'SHENGCHANRENYUANSHU',
        permission: 'SUPPLIER_GOVERNANCE_AMOUNTPRODUCT_GP'
    },
    {
        key: 'daytalerNum',
        name: '临时工人数',
        permissionKey: 'PARTSIGN_EDITORDETAIL_MODELPROJECT',
        language: 'LINSHIGONGRENSHU',
        permission: 'SUPPLIER_GOVERNANCE_AMOUNTOFCASUALWORKERS_GP'
    },
    {
        key: 'isLaborunion',
        name: '是否设置工会',
        permissionKey: 'PARTSIGN_EDITORDETAIL_INFORMATIONCLASSIFICATION',
        language: 'SHIFOUSHEZHIGONGHUI',
        permission: 'SUPPLIER_GOVERNANCE_LABOURUNIONORNONE_GP'
    }
]

export const staffTableTitle = [
    {props: 'mainManagerName', name: '主要管理人员姓名', key: 'ZHUYAOGUANLIRENYUAN',tooltip :true},
    {props: 'sex', name: '性别', key: 'XINGBIE'},
    {props: 'age', name: '年龄', key: 'NIANLING'},
    {props: 'educationBackgroud', name: '学历', key: 'XUELI'},
    {props: 'duty', name: '职务', key: 'ZHIWU'},
    {props: 'resonsibility', name: '职责', key: 'ZHIZE'},
    {props: 'isCeo', name: '是否CEO', key: 'SHIFOUCEO'},
    {props: 'managerialExp', name: '管理经验', key: 'GUANLIJINGYAN'},
    {props: 'industryExp', name: '行业经验', key: 'HANGYEJINGYAN'},
    {props: 'remark', name: '备注', key: 'BEIZHU'}
]
  
