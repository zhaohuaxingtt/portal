export const questionColumn = [
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
		prop:'feedBackCount',
		label:'反馈',
		align: 'center',
		customRender:(h,{row},col,{operate}) => {
            return (
                <span>
					<el-link underline={false} on-click={() => operate("feedback",row)}>{row.feedBackCount}</el-link>
                </span>
            )
        }
	},
	{
		label:'操作',
		align: 'center',
		customRender:(h,{row},col,{operate}) => {
            return (
                <span>
                    <iButton type="text" on-click={() => operate('edit',row)}>修改</iButton>
                    <iButton type="text" on-click={() => operate('del',row)}>删除</iButton>
                </span>
            )
        }
	}
	
]