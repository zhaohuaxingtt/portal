/*
 * @Author: YoHo
 * @Date: 2023-01-16 11:22:39
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipCalculationTask\data.js
 */
export const tableTitle = [
    { props: 'id', name: '任务编号', key: '任务编号', },
    { props: 'taskKey', name: '一次件供应商', key: 'YICIXINGGONGYINGSHANG', },
    { props: 'materialKinds', name: '材料中类', key: '材料中类', },
    { props: 'taskName', name: '任务类型', key: '任务类型', },
    { props: 'userId', name: '采购员', key: 'CAIGOUYUAN', },
    { props: 'createDate', name: '发起时间', key: 'LK_FQSJ', },
    { props: 'balance', name: '补差时间段', key: 'BUCHASHIJIANDUAN', },
    { props: 'taskStatus', name: '任务状态', key: 'RENWUZHUANGTAI', },
]

// 沿用补差规则查询
export const searchFormData = [
    {
        props: 'primarySupplierSapCode', name: '一次件供应商', key: 'YICIJIANGONGYINGSHANG', type: 'select', selectOption: 'fsupplierList', optionLabel: 'message',
        optionValue: 'code', multiple: true,
        clearable: true,
        'collapse- tags': true,
    },
    {
        props: 'secondSupplierSapCode', name: '散件供应商', key: '散件供应商', type: 'select', selectOption: 'ssupplierList', optionLabel: 'message',
        optionValue: 'code'
    },
    { props: 'balanceType', name: '任务类型', key: '任务类型', type: 'select', selectOption: 'taskTypeList', multiple: true },
    { props: 'departmentCode', name: '科室', key: '科室', type: 'select', selectOption: 'deptList', multiple: true },
    { props: 'buyerName', name: '采购员', key: '采购员', type: 'select', selectOption: 'operatorBuyus', multiple: true },
    { props: 'taskStatus', name: '任务状态', key: '任务状态', type: 'select', selectOption: 'taskStatusList', multiple: true },
]