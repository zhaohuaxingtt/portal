/*
 * @Author: YoHo
 * @Date: 2023-01-16 11:22:39
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipCalculationTask\data.js
 */
// 芯片补差计算任务列表
export const tableTitle = [
    { type: 'index', i18n: '#', },
    {
        prop: 'taskNo', label: '任务编号', i18n: '任务编号',
        emit: 'handleDetail',
        customRender: (h, scope) => {
            return <span class={scope.row.taskNo != 3 ? "link-text" : ''}>{scope.row.taskNo}</span>
        }
    },
    { prop: 'primarySupplier', label: '一次件供应商', i18n: 'YICIXINGGONGYINGSHANG', },
    { prop: 'secondSupplier', label: '散件供应商', i18n: '散件供应商', },
    { prop: 'balanceType', label: '任务类型', i18n: '任务类型',
        customRender: (h, scope) => {
            if(scope.row.balanceType=='1'){
                return <span>{'一次件补差'}</span>
            }else{
                return <span>{'散件补差'}</span>
            }
        } 
    },
    { prop: 'departmentCode', label: '科室', i18n: '科室', },
    { prop: 'buyerName', label: '采购员', i18n: 'CAIGOUYUAN', },
    { prop: 'createDate', label: '发起时间', i18n: 'LK_FQSJ', },
    {
        prop: 'startFrom', label: '补差时间段', i18n: 'BUCHASHIJIANDUAN', width: 120,
        customRender: (h, scope) => {
            return (
                <div>
                    <span>{window.moment(scope.row.startFrom).format('YYYY-MM-DD') || '-'}</span>
                    <br />
                    <span>{window.moment(scope.row.endTo).format('YYYY-MM-DD') || '-'}</span>
                </div>
            )
        }
    },
    { prop: 'taskStatusDesc', label: '任务状态', i18n: 'RENWUZHUANGTAI' },
    { prop: 'errorMessage', label: '说明', i18n: '说明' },
    
]

// 芯片补差计算任务查询
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
    { props: 'balanceType', name: '任务类型', key: '任务类型', type: 'select', selectOption: 'taskTypeList', showAll: true },
    { props: 'departmentCode', name: '科室', key: '科室', type: 'select', selectOption: 'deptList', showAll: true },
    { props: 'buyerName', name: '采购员', key: '采购员', type: 'select', selectOption: 'operatorBuyus', showAll: true },
    { props: 'taskStatus', name: '任务状态', key: '任务状态', type: 'select', selectOption: 'taskStatusList', showAll: true },
]

// 计算弹窗补差规则列表
export const tableTitleRule = [
    {
        type: 'index',
        label: '#',
    }, {
        prop: 'ruleNo',
        label: '规则编号',
        i18n: 'GUIZEBIANHAO',
        align: 'center',
        width: 150
    }, {
        prop: 'method',
        label: '补差方式',
        i18n: '补差方式',
        align: 'center',
        width: 150,
        customRender: (h, scope) => {
            return <span>{scope.row.method == '1' ? '一次性补差' : '变价单补差'}</span>
        }
    }, {
        //   prop: 'materialGroup',
        //   label: '材料组',
        //   i18n: '材料组',
        //   align: 'center',
        //   width: 150
        // }, {
        prop: 'materialName',
        label: '原材料描述',
        i18n: '原材料描述',
        align: 'center',
        width: 150
    }, {
        prop: 'partNum',
        label: '一次零件号',
        i18n: '一次零件号',
        align: 'center',
        width: 150
    }, {
        prop: 'partName',
        label: '一次零件名称',
        i18n: '一次零件名称',
        align: 'center',
        tooltip: true,
        width: 150
    },
    {
        prop: 'sapCode',
        label: '一次件供应商编号',
        i18n: '一次件供应商编号',
        align: 'center',
        width: 150
    },
    {
        prop: 'supplierName',
        label: '一次件供应商名称',
        width: '100px',
        align: 'center',
        i18n: '一次件供应商名称',
        tooltip: true,
        width: 150
    },
    {
        prop: 'buyerName',
        label: '采购员',
        width: '100px',
        align: 'center',
        i18n: 'CAIGOUYUAN',
        width: 100
    },
    {
        prop: 'deptCode',
        label: '科室',
        width: '100px',
        align: 'center',
        i18n: 'KESHI',
        width: 100
    }, {
        prop: 'partNameSec',
        label: '二次零件号',
        i18n: '二次零件号',
        align: 'center',
        width: 150
    }, {
        prop: 'partNumSec',
        label: '二次零件名称',
        i18n: '二次零件名称',
        align: 'center',
        tooltip: true,
        width: 150
    },
    {
        prop: 'sapCodeSec',
        label: '二次件供应商编号',
        i18n: '二次件供应商编号',
        align: 'center',
        width: 150
    },
    {
        prop: 'supplierNameSec',
        label: '二次件供应商名称',
        width: '100px',
        align: 'center',
        i18n: '二次件供应商名称',
        tooltip: true,
        width: 150
    },
    {
        prop: 'secondPrimaryRatio',
        label: '二次件与一次件比例',
        width: '100px',
        align: 'center',
        i18n: '二次件与一次件比例',
        width: 150
    },
    {
        prop: 'amount',
        label: '补差金额',
        width: '100px',
        align: 'center',
        i18n: '补差金额',
        width: 150
    },
    {
        prop: 'currency',
        label: '货币',
        align: 'center',
        i18n: 'HUOBI',
        width: 150
    },
    { prop: 'exchangeRate', label: '汇率', align: 'center', i18n: 'HUILV' },
    {
        prop: 'startDate',
        label: '有效期起',
        align: 'center',
        i18n: 'YOUXIAOQIQI',
        tooltip: true,
        width: 150
    },
    {
        prop: 'endDate',
        label: '有效期止',
        align: 'center',
        i18n: 'YOUXIAOQIZHI',
        tooltip: true,
        width: 150
    },
    {
        prop: 'effectFlag',
        label: '是否生效',
        align: 'center',
        i18n: 'SHIFOUSHENGXIAO',
        width: 150,
        customRender: (h, scope) => {
            return <span>{scope.row.effectFlag ? '是' : '否'}</span>
        }
    },
    {
        prop: 'updateDate',
        label: '更新时间',
        align: 'center',
        i18n: '更新时间',
        width: 150,
        tooltip: true,
    },
    {
        prop: 'sourceCode',
        label: '补差来源',
        align: 'center',
        i18n: '补差来源',
        width: 150,
        emit: 'go-detail',
        customRender: (h, scope) => {
            if (scope.row.sourceCode == "初始化") {
                return <span>{scope.row?.sourceCode}</span>
            } else {
                return <span class="link-text">{scope.row?.sourceCode}</span>
            }
        }
    },
]

// 计算弹窗补差规则列表
export const tableTitleBE = [
    {
        type: 'selection',
    }, {
        type: 'index',
        label: '#',
    }, {
        prop: 'partNum',
        label: '一次零件号',
        i18n: '一次零件号',
        align: 'center',
        width: 150
    },
    {
        prop: 'supplierName',
        label: '一次件供应商名称',
        width: '100px',
        align: 'center',
        i18n: '一次件供应商名称',
        tooltip: true,
        width: 150
    },
    {
        prop: 'materialGroup',
        label: '材料组',
        i18n: '材料组',
        align: 'center',
        width: 150
    }, {
        prop: 'materialName',
        label: '原材料描述',
        i18n: '原材料描述',
        align: 'center',
        width: 150
    }, {
        prop: 'partNameSec',
        label: '二次零件号',
        i18n: '二次零件号',
        align: 'center',
        width: 150
    },
    {
        prop: 'supplierNameSec',
        label: '二次件供应商名称',
        width: '100px',
        align: 'center',
        i18n: '二次件供应商名称',
        tooltip: true,
        width: 150
    },
    {
        prop: 'secondPrimaryRatio',
        label: '二次件与一次件比例',
        width: '100px',
        align: 'center',
        i18n: '二次件与一次件比例',
        width: 150
    }, {
        prop: 'ruleNo',
        label: '规则编号',
        i18n: 'GUIZEBIANHAO',
        align: 'center',
        width: 150
    }, {
        prop: 'method',
        label: '补差方式',
        i18n: '补差方式',
        align: 'center',
        width: 150,
        customRender: (h, scope) => {
            return <span>{scope.row.method == '1' ? '一次性补差' : '变价单补差'}</span>
        }
    },
    {
        prop: 'amount',
        label: '补差金额',
        width: '100px',
        align: 'center',
        i18n: '补差金额',
        width: 150
    },
    {
        prop: 'currency',
        label: '货币',
        align: 'center',
        i18n: 'HUOBI',
        width: 150
    },
    { prop: 'exchangeRate', label: '汇率', align: 'center', i18n: 'HUILV' },

    {
        prop: 'sourceCode',
        label: '补差单编号',
        align: 'center',
        i18n: '补差单编号',
        width: 150,
    }, {
        prop: 'buyerName',
        label: '采购员',
        width: '100px',
        align: 'center',
        i18n: 'CAIGOUYUAN',
        width: 100
    },
    {
        prop: 'deptCode',
        label: '科室',
        width: '100px',
        align: 'center',
        i18n: 'KESHI',
        width: 100
    }
]

export const queryFormData = [
    { props: 'buyerName', name: '一次零件号', key: '一次零件号', type: 'input' },
    { props: 'buyerName', name: '二次零件号', key: '二次零件号', type: 'input' },
    {
        props: 'primarySupplierSapCode', name: '一次件供应商', key: 'YICIJIANGONGYINGSHANG', type: 'sleect', selectOption: 'sSupplierDropDownData',
    },
]