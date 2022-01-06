const typeColumn = [
    // {
    //     type: 'selection',
    //     width: 50
    // },
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
        // prop:'admin',
        label:'管理人',
        align: 'adminUsers',
        width: 120,
        customRender: (h, scope) => {
            const admin = scope.row.admin
            return (
                <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title={admin}>{ admin }</div>
            )
        }
    },
    {
        // prop:'organization',
        label:'报表可见组织',
        align: 'center',
        width: 100,
        customRender: (h, scope) => {
            const organizations = scope.row.organizations
            return (
                <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title={organizations}>{ organizations }</div>
            )
        }
    },
    {
        // prop:'people',
        label:'报表可见人员',
        align: 'center',
        width: 100,
        customRender: (h, scope) => {
            const users = scope.row.users
            return (
                <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title={users}>{ users }</div>
            )
        }
    },
    {
        // prop:'top',
        label:'是否置顶',
        align: 'center',
        emit: 'topChang',
		customRender: (h, scope) => {
			return (		
				<el-switch value={scope.row.top} active-text="是" inactive-text="否"></el-switch>
			)
			//const top = scope.row.top
			// return (		
			// 	<el-switch value={scope.row.top} onchange={val=>{
            //         console.log('aaaaa',val);
            //         scope.row.top = val}} active-text="是" inactive-text="否"></el-switch>
			// )
		}
    },
    {
        // prop:'top',
        label:'状态',
        align: 'center',
        emit:'statusChang',
		customRender: (h, scope) => {
			// const status = scope.row.status
			return (		
				<el-switch value={scope.row.published} active-text="上架" inactive-text="下架"></el-switch>
			)
		}
    },
    {
        label:'操作',
        align: 'center',
        width: 200,
        customRender: (h, {row}, col,{operate}) => {
			return (		
				<span>
                    <iButton type="text" on-click={() => operate('modify',row)}>修改</iButton>
                    <iButton type="text" on-click={() => operate('del',row)}>删除</iButton>
                    <iButton type="text" on-click={() => operate('add',row)}>添加报告分类</iButton>
                </span>

			)
		}
    }
]

const addTypeColumn = [
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
        label:'操作',
        align: 'center',
        width: 200,
        customRender: (h, {row}, col,{del}) => {
			return (		
				<span>
                    <iButton type="text" on-click={() => del(row)}>删除</iButton>
                </span>

			)
		}
    }
]

export {
    typeColumn,
    addTypeColumn
}