export const tableColumn = [
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
		prop:'firstLetter',
		label:'首字母',
		i18n:'首字母',
		align: 'center'
	},
	// {
	// 	prop:'title',
	// 	label:'词条名称',
	// 	align: 'center'
	// },
	{
		prop:'title',
		label:'词条名称',
		i18n:'词条名称',
		align: 'center',
		customRender: (h, scope) => {
			const title = scope.row.title
			return (		
				<div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title={title}>{ title }</div>
			)
		}
	},
	{
		prop:'version',
		label:'版本号',
		i18n:'版本号',
		align: 'center'
	},
	{
		prop:'publishDate',
		label:'发布日期',
		i18n:'发布日期',
		align: 'center'
	}

]