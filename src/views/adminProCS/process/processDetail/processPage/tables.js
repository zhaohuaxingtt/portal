const QS_SETTING = [
    {
		type: 'selection',
		width: 50
	},
	{
		type:'index',
		label:'序号',
		width: 55
	},
	{
		prop:'name',
		label:'问题描述',
		align: 'center'
	},
	{
		prop:'updatedAt',
		label:'最后更新',
		align: 'center'
	},
]
const ATTACH_SETTING = [
    {
		type: 'selection',
		width: 50
	},
	{
		type:'index',
		label:'序号',
		width: 55
	},
	{
		prop:'name',
		label:'文档名称',
		align: 'center'
	},
	{
		prop:'version',
		label:'版本号',
		align: 'center'
	},
	{
		prop:'publishDate',
		label:'发布日期',
		align: 'center'
	},
]
export {
    QS_SETTING,
    ATTACH_SETTING
}