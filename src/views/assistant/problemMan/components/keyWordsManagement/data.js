

export const   TABLE_KEYWORDS_COLUMNS=[
    {
        type:'selection'
    },
    {
        type:'index',
        label:'序号'
    },
    {
        label:'关键词',
        prop:'keyWord'
    },
    {
        label:"添加时间",
        prop:'createDate',
        // customRender: (h, scope) => {
        //     return <span>{scope.row.createDate | }</span>
        // }
    }
]