
export const productTabelList = [
    {
        type:'selection',
        width:'50'
    },
    {
        type:'index',
        label:'#',
        width:'50px'
    },
    {
        prop:'code',
        label:'产品组编号',
        tooltip:true,
        width:'120px',
        openNewPage: true,
        emit:'to-detail',
        customRender: (h,scope) =>{
            return <span class='link-text'>{scope.row.code}</span>
        }
    },
    {
        prop:'pgNameZh',
        label:'产品组名称(中)',
        tooltip:true,    
    },
    {
        prop:'pgNameDe',
        tooltip:true,

        label:'产品组名称(德)',
    }
]