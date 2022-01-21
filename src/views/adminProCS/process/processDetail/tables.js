const PROCESS_PAGE = [
    {
        type:'index',
        label:'序号',
        width: 100
    },
    {
        prop:'firstLetter',
        label:'页面标题',
        align: 'center'
    },
    {
        prop:'firstLetter',
        label:'发布日期',
        align: 'center'
    },
    {
        label:'操作',
        align: 'center',
        customRender:(h,{row},col,{operate}) => {
            return (
                <span>
                    <iButton type="text" on-click={() => operate('edit',row)}>修改</iButton>
                    <iButton type="text" on-click={() => operate('manual',row)}>操作手册</iButton>
                    <iButton type="text" on-click={() => operate('video',row)}>操作视频</iButton>
                    <iButton type="text" on-click={() => operate('qs',row)}>常见问题</iButton>
                    <iButton type="text" on-click={() => operate('attch',row)}>附件</iButton>
                    <iButton type="text" on-click={() => operate('del',row)}>删除</iButton>
                </span>
            )
        }
    },
]
const DOC = [
    {
        type:'index',
        label:'序号',
        width: 100
    },
    {
        prop:'title',
        label:'文档名称'
    },
    {
        prop:'publishTime',
        label:'发布日期'
    },
    {
        label:'操作',
        customRender:(h,{row},col,{del}) => {
            return <iButton type="text" on-click={() => del(row)}>删除</iButton>
        }
    },
]

const QUESTION = [
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
        align: 'center'
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
    }
]

const AttachColumn = [
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
    }
]

export {
    PROCESS_PAGE,
    DOC,
    QUESTION,
    AttachColumn
}