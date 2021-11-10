export const interViewTabList = [{
		value: 1,
		name: '综述',
		key: 'SPR_FRM_DEP_ZS',
	},
	{
		value: 2,
		name: '企业概况',
		key: 'SPR_FRM_DEP_QYGK',
	},
	{
		value: 3,
		name: '财务分析',
		key: 'SPR_FRM_DEP_CWFX',
	}
];
// 深入评级结果
export const depthResult=[
	{props: 'deepCommentRatingDate', name: '评级时间', key: ''},
	{props: 'deepCommentRatingResults', name: '状态', key: ''}
]

// 基本信息
export const baseInfoTitle=[
	{props: 'nameZh', name: '供应商名称', type: 'input', 'key': ''},
	{props: 'registeredDate', name: '成立时间', type: 'input', 'key': ''},
	{props: 'registeredCapital', name: '注册资本', type: 'input', 'key': ''},
	{props: 'epNatureCategory', name: '企业性质', type: 'input', 'key': ''},
	{props: 'numOfEmployee', name: '员工人数', type: 'input', 'key': ''},
]
	
//财报分析
export const finAnalysis=[
	{props: 'indexName', name: '指标（大类）', key: '',width:200},
	{props: 'status', name: '状态', key: '',width:120},
	{props: 'comment', name: '简评', key: ''}
]
