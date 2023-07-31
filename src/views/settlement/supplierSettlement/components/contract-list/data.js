export const searchForm = {

}

export const search = [
	{ props: 'orderCode', name: '合同编号', type: 'input', key: 'HETONGBIANHAO' },
	{ props: 'type', name: '合同类型', type: 'select', key: 'settlement.search.type' },
	{ props: 'isComplete', name: '结算状态', type: 'select', key: 'JIESUANZHUANGTAI' },
	{ props: 'contractName', name: '合同名称', type: 'input', key: 'HETONGMINGCHENG' },
	{ props: 'payerCompanyCode', name: '甲方', type: 'select', key: 'JIAFANG' },
	{ props: 'contractDate', name: '合同日期', type: 'dateRange', key: 'HETONGRIQI' },
	{ props: 'suppCode', name: '供应商号', type: 'input', key: '供应商号' },
]

export const tableTitle = [
	{ props: 'contractCode', name: '合同编号', key: 'HETONGBIANHAO' },
	{ props: 'contractName', name: '合同名称', key: 'HETONGMINGCHENG' },
	{ props: 'payerCompanyCode', name: '甲方', key: 'JIAFANG' },
	{ props: 'nominationCurrency', name: '货币', key: 'HETONGHUOBI' },
	{ props: 'totalItemPrice', name: '不含税总金额', key: 'BUHANSHUIZONGJINE' },
	{ props: 'payTypeDisp', name: '付款方式及期限', key: 'FUKUANFANGSHIJIQIXIAN' },
	{ props: 'contractDate', name: '合同日期', key: 'HETONGRIQI' },
	{ props: 'isComplete', name: '结算状态', key: 'JIESUANZHUANGTAI' },
]