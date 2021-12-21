export const contentColumn = [
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
		prop:'state',
		label:'状态',
		align: 'center'
	},
	{
		prop:'send',
		label:'消息发送',
		align: 'center'
	},
]

export const typeColumn = [
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
		prop:'published',
		label:'状态',
		align: 'center'
	}
]