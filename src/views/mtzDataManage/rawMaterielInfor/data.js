export const rawMaterielColumns=[
    {
        type:'selection',
        width:'50px'
    },
    {
        type:'index',
        width:'50px'
    },
    {
        prop:'generalCategoryCode',
        label:'原材料编号大类',
        emit:'go-detail',
        minWidth:'50px',
        // openNewPage:true,
        tooltip:true,
        customRender:(h,scope)=>{
            return <span class='link-text'>{scope.row.generalCategoryCode}</span>
        }
    },
    {
        prop:'generalCategoryNameZh',
        label:'原材料名称(中文)',
        tooltip:true,
    },
    {
        prop:'generalCategoryNameEn',
        label:'原材料名称(英文)',
        tooltip:true,
    },
    {
        prop:'generalShortName',
        label:'大类元素简称',
        tooltip:true,
    },
    {
        prop:'statusDesc',
        label:'状态',
        tooltip:true,
        customRender:(h,scope)=>{
            if(scope.row.statusDesc=='无效'){
                return <span style='color:red'>{scope.row.statusDesc}</span>
            }else{
                return scope.row.statusDesc
            }
        }
    }
]