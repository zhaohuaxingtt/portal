const typeColumn = [
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
        prop:'typeName',
        label:'类型',
        align: 'center'
    },
    {
        prop:'addDate',
        label:'添加日期',
        align: 'center'
    },
    {
        prop:'manager',
        label:'管理人',
        align: 'center',
        width: 120,
        customRender: (h, scope) => {
            const manager = scope.row.manager
            return (
                <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title={manager}>{ manager }</div>
            )
        }
    },
    {
        prop:'org',
        label:'报表可见组织',
        align: 'center',
        width: 100,
        customRender: (h, scope) => {
            const org = scope.row.org
            return (
                <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title={org}>{ org }</div>
            )
        }
    },
    {
        prop:'people',
        label:'报表可见人员',
        align: 'center',
        width: 100,
        customRender: (h, scope) => {
            const people = scope.row.people
            return (
                <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title={people}>{ people }</div>
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
				<el-switch value={scope.row.top} active-text="上架" inactive-text="下架"></el-switch>
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
				<el-switch value={scope.row.status} active-text="上架" inactive-text="下架"></el-switch>
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