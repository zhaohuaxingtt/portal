/*
 * @Author: YoHo
 * @Date: 2023-01-16 11:22:39
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipCalculationTask\data.js
 */
export const tableTitle = [
    { prop: 'taskNo', label: '任务编号', i18n: '任务编号', },
    { prop: 'primarySupplier', label: '一次件供应商', i18n: 'YICIXINGGONGYINGSHANG', },
    { prop: 'secondSupplier', label: '散件供应商', i18n: '散件供应商', },
    { prop: 'taskName', label: '任务类型', i18n: '任务类型', },
    { prop: 'departmentCode', label: '科室', i18n: '科室', },
    { prop: 'userId', label: '采购员', i18n: 'CAIGOUYUAN', },
    { prop: 'createDate', label: '发起时间', i18n: 'LK_FQSJ', },
    { prop: 'balance', label: '补差时间段', i18n: 'BUCHASHIJIANDUAN', },
    { prop: 'taskStatus', label: '任务状态', i18n: 'RENWUZHUANGTAI', },
]

// 沿用补差规则查询
export const searchFormData = [
    {
        props: 'primarySupplierSapCode', name: '一次件供应商', key: 'YICIJIANGONGYINGSHANG', type: 'select', selectOption: 'fsupplierList', optionLabel: 'message',
        optionValue: 'code',
        clearable: true,
    },
    {
        props: 'secondSupplierSapCode', name: '散件供应商', key: '散件供应商', type: 'select', selectOption: 'ssupplierList', optionLabel: 'message',
        optionValue: 'code',
        clearable: true,
    },
    { props: 'balanceType', name: '任务类型', key: '任务类型', type: 'select', selectOption: 'taskTypeList',showAll:true },
    { props: 'departmentCode', name: '科室', key: '科室', type: 'select', selectOption: 'deptList',showAll:true },
    { props: 'buyerName', name: '采购员', key: '采购员', type: 'select', selectOption: 'operatorBuyus',showAll:true },
    { props: 'taskStatus', name: '任务状态', key: '任务状态', type: 'select', selectOption: 'taskStatusList',showAll:true },
]