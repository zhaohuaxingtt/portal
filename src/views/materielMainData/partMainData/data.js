export const materirelList=[
    {
        type:'selection',
        width:'50'
    },
    {
        type:'index',
        width:'50'
    },
    {
        prop:'partNum',
        label:'零件号',
        emit:'goDetail',
        tooltip: true,
        width:'120px',
        openNewPage: true,
        customRender:(h,scope) => {
            return <span class='link-text'>{scope.row.partNum}</span>
        }
    },
    {
        prop:'partNameZh',
        label:'零件中文名称',
        tooltip:true,
        // openNewPage:true,
    },
    {
        prop:'partNameDe',
        label:'零件德文名称',
        tooltip:true,

    },
    {
        prop:'sourceDesc',
        label:'零件来源',
        tooltip:true,

    },
    {
        prop:'partStatusDesc',
        label:'零件状态',
        tooltip:true,

    },
    {
        prop:'updateDate',
        label:'最后一次修改时间',
        tooltip:true,
    }
]
