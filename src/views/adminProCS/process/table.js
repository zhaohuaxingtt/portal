import ISwitch from './../components/iSwitch';
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
		emit:'stateChange',
		customRender: (h, scope) => {
			return (		
				<ISwitch currVal={ scope.row.state } currItem={ scope.row } active-text="上架" inactive-text="下架" />
			)
		}
	},
	{
		label:'是否发送消息',
		align: 'center',
		emit:'sendChange',
		customRender: (h, scope) => {
			return (		
				<ISwitch currVal={ scope.row.send } currItem={ scope.row } active-text="是" inactive-text="否" />
			)
		}
	},
]