/*
 * @Author: 舒杰
 * @Date: 2021-08-02 16:45:36
 * @LastEditTime: 2022-01-21 18:13:35
 * @LastEditors: caopeng
 * @Description: In User Settings Edit
 * @FilePath: \front-portal-new\src\views\frmRating\depthRating\depthReportEn\data.js
 */
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
	{props: 'deepCommentRatingDate', name: 'Further time', key: ''},
	{props: 'deepCommentRatingResults', name: 'Status', key: ''}
]

// 基本信息
export const baseInfoTitle=[
	{props: 'nameZh', name: 'Supplier Name', type: 'input', 'key': ''},
	{props: 'registeredDate', name: 'Foundation Time', type: 'input', 'key': ''},
	{props: 'registeredCapital', name: 'Registered Capital', type: 'input', 'key': ''},
	{props: 'epNatureCategory', name: 'Type', type: 'input', 'key': ''},
	{props: 'numOfEmployee', name: 'Number of Employees', type: 'input', 'key': ''},
]
	
//财报分析
export const finAnalysis=[
	{props: 'indexName', name: 'Aspect', key: '',width:200},
	{props: 'status', name: 'Status', key: '',width:120},
	{props: 'comment', name: 'Brief comment', key: ''}
]
