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
			prop:'category',
			label:'分类',
			width: 200,
			align: 'center',
			customRender: (h, scope) => {
				const category = scope.row.category
				let category_text = category.map((item)=>item.name).join(',');
				return (		
					<div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title={category_text}>{ category_text }</div>
				)
			}
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
			align: 'center',
			customRender: (h, scope) => {
				const section = scope.row.section
				return (		
					section.name
				)
			}
		},
		{
			prop:'organizations',
			label:'部门',
			align: 'center',
			customRender: (h, scope) => {
				const organizations = scope.row.organizations
				let category_text = organizations.map((item)=>item.name).join(',');
				return (		
					category_text || ''
				)
			}
		},
		{
			prop:'published',
			label:'状态',
			align: 'center',
			emit:'stateChang',
				customRender: (h, scope) => {
					const state = scope.row.published
					return (		
						// <el-switch v-model={published} active-text="上架" inactive-text="下架"></el-switch>
						<ISwitch currVal={ state } currItem = { scope.row } />
					)
				}
		},
		{
			prop:'sendMessage',
			label:'消息发送',
			align: 'center',
			emit:'sendChang',
			customRender: (h, scope) => {
				const send = scope.row.sendMessage
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

export const column = [
	{
		type:'index',
		label:'序号',
		width: 100
	},
	{
		prop:'name',
		label:'分类名称',
		align: 'center'
	},
	{
        label:'操作',
        customRender:(h,{row},col,{del}) => {
            return <iButton type="text" on-click={() => del(row)}>删除</iButton>
        }
    },
]
