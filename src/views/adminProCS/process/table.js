
export default [
    {
		type: 'selection',
		width: 50
	},
	{
		type:'index',
		label:'序号',
		width: 100
	},
	{
		prop:'name',
		label:'标题',
		align: 'center'
	},
	{
		prop:'updateDt',
		label:'更新日期',
		align: 'center'
	},
	{
		prop:'version',
		label:'版本号',
		align: 'center'
	},
	{
		label:'状态',
		align: 'center',
		customRender: (h, {row,$index}, col,{updateState}) => {
			return <el-switch value={ row.published } active-text="上架" inactive-text="下架" on-change={ e => updateState(e,$index,row)}></el-switch>
		}
	},
	{
		label:'是否发送消息',
		align: 'center',
		customRender: (h, {row,$index}, col,{updateMsg}) => {
			return <el-switch value={ row.send } active-text="上架" disabled={row.published} inactive-text="下架" on-change={ e => updateMsg(e,$index,row)}></el-switch>
		}
	},
]