/*
 * @Author: 舒杰
 * @Date: 2021-06-08 16:51:54
 * @LastEditTime: 2021-07-30 14:29:31
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\bpm\frmRatingApproval\depthReportApproval\data.js
 */
// 深入评级结果
export const depthResult=[
	{props: 'a', name: '评级时间', key: ''},
	{props: 'b', name: '状态', key: ''}
]

// 基本信息
export const baseInfoTitle=[
	{props: '3', name: '供应商名称', type: 'input'},
	{props: '3', name: '成立时间', type: 'input'},
	{props: '1', name: '注册资本', type: 'input'},
	{props: '4', name: '企业性质', type: 'input'},
	{props: '5', name: '员工人数', type: 'input'},
]
	
//财报分析
export const finAnalysis=[
	{props: 'a', name: '指标（大类）', key: '',width:200},
	{props: 'b', name: '状态', key: '',width:120},
	{props: 'c', name: '简评', key: ''}
]

export const depthReportRouter = [
	{
		value: 1,
		name: '深评报告',
		url: '/supplier/frmrating/depthRating/depthReport',
		activePath: '/supplier/frmrating/depthRating/depthReport',
		key: '深评报告'
	},
	{
		value: 2,
		name: 'Depth Report',
		url: '/supplier/frmrating/depthRating/EnDepthReport',
		activePath: '/supplier/frmrating/depthRating/EnDepthReport',
		key: 'Depth Report'
	}
 ]