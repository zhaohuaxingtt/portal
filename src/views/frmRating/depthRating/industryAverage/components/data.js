/*
 * @Author: 舒杰
 * @Date: 2021-05-27 13:57:04
 * @LastEditTime: 2021-07-27 14:15:57
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\frmRating\depthRating\industryAverage\components\data.js
 */
// 集团、股东、实际控制人（详见股权结构图）
export const tableTitle = [{
		props:'name',
		name: "",
		width:'180px',
	}, {
		props: 'ind',
		name: '行业均值%',
		key: 'SPR_FRM_DEP_HYJZ',
		sub: [{
			props: 'a',
			name: '2015',
		},{
			props: 'e',
			name: '2016',
		},{
			props: '3',
			name: '2017',
		},{
			props: '3',
			name: '2018',
		},{
			props: '3',
			name: '2019',
		}]
	},
	{
		props: 'svw',
		name: 'SVW供应商均值%',
		key: 'SPR_FRM_DEP_SVWGYSJZ',
		sub: [{
			props: '3',
			name: '2015',
		},{
			props: '3',
			name: '2016',
		},{
			props: '3',
			name: '2017',
		},{
			props: '3',
			name: '2018',
		},{
			props: '3',
			name: '2019',
		}]
	}
]

export const fieldList = [
	{props: 'grossProfitMargin', name: '销售毛利率（%）', key: ''},
	{props: 'netProfitMargin', name: '销售净利率（%）', key:''},
	{ props: 'periodExpenseRate', name: '期间费用率（%）', key: '' },
	{props: 'managementExpenseRate', name: '管理费用率（%）', key:''},
	{props: 'salesExpenseRate', name: '销售费用率（%）', key:''},
	{props: 'financeExpenseRate', name: '财务费用率（%）', key:''},
	{props: 'accountsReceivableTurnover', name: '应收账款周转率（次数）', key:''},
	{props: 'accountsPayableTurnover', name: '应付账款周转率（次数）', key:''},
	{props: 'inventoryTurnover', name: '存货周转率（次数）', key:''},
	{ props: 'fixedAssetsTurnover', name: '固定资产周转率（次数）', key: '' },
	{ props: 'assetTurnover', name: '总资产周转率（次数）', key: '' },
	{props: 'currentRatio', name: '流动比率（%）', key:''},
	{props: 'quickRatio', name: '速动比率（%）', key:''},
	{props: 'assetLiabilityRatio', name: '资产负债率（%）', key:''}
	
]