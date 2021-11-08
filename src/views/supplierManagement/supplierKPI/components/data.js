/*
 * @Author: your name
 * @Date: 2021-08-04 20:49:10
 * @LastEditTime: 2021-09-03 15:30:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\kpiChart\components\data.js
 */
/*
    设置开始点 start:true
    设置开始点 start:true
*/
export const tabSetting = [{
        prop: 'nameZh',
        label: '供应商名称'
    },
    {
        prop: 'all',
        label: 'KPI(ALL)'
    },
    {
        prop: 'cs',
        label: 'KPI(CS)',
        icon: 'el-icon-minus',
        start: true
    },
    {
        prop: 'mq',
        label: 'KPI(MQ)'
    },
    {
        prop: 'tp',
        label: 'KPI(EP)'
    },
    {
        prop: 'tl',
        label: 'KPI(PL)'
    },
    {
        prop: 'sa',
        label: 'KPI(SA)'
    }
]

export const tabsetting = [{
        type: 'selection',
        width: 50
    },
    {
        prop: '#',
        label: '#',
        i18n: '#',
        width: 50,
        align: 'center'
    },
    {
        prop: 'nameZh',
        label: '供应商名称',
        i18n: 'LK_GONGYINGSHANGMINGCHENG',
        align: 'center',
        tooltip: true
    }
]
export const KeyNoteTableTitle = [{
        props: 'createDate',
        name: '加⼊重点追踪时间',
        key: 'CREATEDATA',
        tooltip: true
    },
    {
        props: 'removeDate',
        name: '移除重点追踪时间',
        key: 'REMOVEDATA',
        tooltip: true,
        icon: 'iconxinxitishi',
        iconTextKey: '',
        iconText: '若移除时间为空⽩，表示到⽬前为⽌该供应商仍为重点追踪对象。'
    },
    {
        props: 'isTakeSteps',
        name: '是否采取措施',
        key: 'ISTAKESTEPS',
        tooltip: true
    },
    {
        props: 'takeStepsContent',
        name: '措施详情',
        key: 'TAKESTEPSCONTENT',
        tooltip: true
    },
    
    {
        props: 'categoryName',
        name: '加⼊原因',
        key: 'JIARUYUANYIN',
        tooltip: true,
        icon: 'iconxinxitishi',
        iconTextKey: '',
        iconText: '因某个（些）指标连续三个半年报下降被加⼊重点追踪对象。'
    },
    {
        props: 'followUserName',
        name: '跟进⼈',
        key: 'FOLLOWUSERNAME',
        tooltip: true
    },
    {
        props: 'updateDate',
        name: '更新时间',
        key: 'UPDATEDATE',
        tooltip: true
    }
]
export const TakeNoteTableTitle = [{
        props: 'categoryNumberName',
        name: '指标',
        width: 160,
        key: 'CATEGORYNAME',
        tooltip: true
    },
    {
        props: 'completion',
        name: '完成情况',
        width: 100,
        key: 'COMPLETION',
        tooltip: true
    },
    {
        props: 'explanation',
        name: '解释',
        key: 'EXPLANATCION',
        // tooltip: true
    },
    {
        props: 'target',
        name: '目标',
        key: 'TARGET',
        // tooltip: true
    },
    {
        props: 'actionPlan',
        name: '行动计划',
        key: 'ACTIONPLAN',
        // tooltip: true
    }
]
export const TakeNoteTableTitleNull = [{
        props: 'categoryNumberName',
        name: '指标',
        key: 'CATEGORYNAME',
        tooltip: true
    },
    {
        props: 'completion',
        name: '完成情况',
        key: 'COMPLETION',
        tooltip: true,
    },


]
export const TakeNoteTableTitleDialog = [{
        props: 'categoryName',
        name: '指标',
        width: 160,
        key: 'CATEGORYNAME',
        tooltip: true
    },
    {
        props: 'performance',
        name: '完成情况',
        width: 100,
        key: 'PERFORMANCE',
        tooltip: true
    },
    {
        props: 'explanation',
        name: '解释',
        key: 'EXPLANATCION',
        tooltip: true
    },
    {
        props: 'target',
        name: '目标',
        key: 'TARGET',
        tooltip: true
    },
    {
        props: 'actionPlan',
        name: '行动计划',
        key: 'ACTIONPLAN',
        tooltip: true
    }
]

export const listCloum = [{
        props: 'nameZh',
        name: '供应商名称',
        key: 'GONGYINGSHANGMINGCHENG',

    },
    {
        props: 'sapCode',
        name: 'SAP号',
        key: 'SAPCODE'
    },
    {
        props: 'halfYear',
        name: '半年报记录',
        key: 'BANNIANBAOJILU'
    },
    {
        props: 'takeRecord',
        name: '重点追踪记录',
        key: 'ZHONGDIANZHUIZONGJILU',
        icon: 'iconxinxitishi',
        iconTextKey: '',
        iconText: '当下⽅列表中“查看”为空，表示该供应商从未加⼊过重点追踪对象。'
    },

]

export const PointCloum = [

    {
        props: 'nameZh',
        name: '供应商名称',
        key: 'GONGYINGSHANGMINGCHENG',
        align: 'center',
        tooltip: true
    },
    {
        props: 'sapCode',
        name: 'SAP号',
        key: 'SAPCODE',
        align: 'center',
        tooltip: true
    },
    {
        props: 'halfYear',
        name: '半年报记录',
        key: 'BANNIANBAOJILU',
        align: 'center',
        tooltip: true
    },
    {
        props: 'isTakeSteps',
        name: '是否采取措施',
        key: 'SHIFOUCAIQUCUOSHI',
        align: 'center',
        tooltip: true
    },
    {
        props: 'takeStepsContent',
        name: '采取措施详情',
        key: 'CAIQUCUOSHIXIANGQING',
        align: 'center',
        tooltip: true
    },
    {
        props: 'followUserName',
        name: '跟进⼈',
        key: 'GENJINREN',
        align: 'center',
        tooltip: true
    },
    {
        props: 'updateDate',
        name: '更新时间',
        key: '更新时间',
        align: 'center',
        tooltip: true
    },


]