import ISwitch from '../components/iSwitch.vue'

export const contentColumn = () => {
	return [
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
			label:'分类',
			align: 'center'
		},
		{
			prop:'title',
			label:'标题',
			align: 'center'
		},
		{
			prop:'speaker',
			label:'主讲人',
			align: 'center'
		},
		{
			prop:'openingDate',
			label:'开课日期',
			align: 'center'
		},
		{
			prop:'section',
			label:'课程',
			align: 'center'
		},
		{
			prop:'department',
			label:'部门',
			align: 'center'
		},
		{
			// prop:'state',
			label:'状态',
			align: 'center',
			emit:'stateChang',
				customRender: (h, scope) => {
					const state = scope.row.state
					return (		
						// <el-switch v-model={published} active-text="上架" inactive-text="下架"></el-switch>
						<ISwitch currVal={ state } currItem = { scope.row } />
					)
				}
		},
		{
			// prop:'send',
			label:'消息发送',
			align: 'center',
			emit:'sendChang',
			customRender: (h, scope) => {
				const send = scope.row.send
				return (		
					// <el-switch v-model={published} active-text="上架" inactive-text="下架"></el-switch>
					<ISwitch currVal={ send } currItem = { scope.row } activeText = {'发送'} inactiveText = {'不发送'} />
				)
			}
		},
	]
}


export const typeColumn = () => {
	return [
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
			label:'类型',
			align: 'center'
		},
		{
			prop:'createdAt',
			label:'添加日期',
			align: 'center'
		},
		{
			label:'状态',
			align: 'center',
			emit:'publishChang',
			customRender: (h, scope) => {
				const published = scope.row.published
				return (		
					// <el-switch v-model={published} active-text="上架" inactive-text="下架"></el-switch>
					<ISwitch currVal={ published } currItem = { scope.row } />
				)
			}
		}
	]
}
