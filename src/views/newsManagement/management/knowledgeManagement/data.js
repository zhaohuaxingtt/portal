const typeColumn = [
    {
        type:'index',
        label:'序号',
        width: 100
    },
    {
        prop:'name',
        label:'板块名称',
        align: 'center'
    },
    {
        prop:'adminUsers',
        label:'管理员',
        align: 'center',
        customRender: (h, scope) => {
            const adminUsers = scope.row.adminUsers
            let new_adminUsers = adminUsers.length > 0 ? adminUsers.slice(0,4).map((item)=>item.name).join(',') : ''
            return (
                adminUsers.length>0? adminUsers.length>4?`${new_adminUsers}等${adminUsers.length}人`:`${new_adminUsers}`:''
            )
        }
    },
    {
        label:'操作',
        align: 'center',
        width: 200,
        customRender: (h, {row}, col,{modify}) => {
			return (		
				<span>
                    <iButton type="text" on-click={() => modify(row)}>修改</iButton>
                </span>

			)
		}
    },
]

export {
    typeColumn
}