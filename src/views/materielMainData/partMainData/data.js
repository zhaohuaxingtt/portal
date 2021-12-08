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
        i18n:'零件号',
        emit:'goDetail',
        tooltip: true,
        width:'170px',
        openNewPage: true,
        customRender:(h,scope) => {
            return <span class='link-text'>{scope.row.partNum}</span>
        }
    },
    {
        prop:'partNameZh',
        i18n:'零件中文名称',
        tooltip:true,
        // openNewPage:true,
    },
    {
        prop:'partNameDe',
        i18n:'零件德文名称',
        tooltip:true,

    },
    {
        prop:'sourceDesc',
        i18n:'零件来源',
        tooltip:true,

    },
    {
        prop:'partStatusDesc',
        i18n:'零件状态',
        tooltip:true,

    },
    {
        prop:'updateDate',
        i18n:'最后一次修改时间',
        tooltip:true,
    }
]
