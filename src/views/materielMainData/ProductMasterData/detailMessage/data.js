export const detailTabelList=[
    {
        type:'selection',
        width:'50px',
        tooltip:true,
    },
    {
        type:'index',
        label:'#',
        width:'50px',
        tooltip:true,
    },
    {
        prop:'sixPartCode',
        label:'零件6位号',
        i18n:'零件6位号',
        emit:'open',
        tooltip:true,
        customRender:(h,scope)=>{
            return (<span class='link-text'>{scope.row.sixPartCode}</span>)
        }
    },
    {
        prop:'partNameZh',
        label:'零件名称(中)',
        tooltip:true,
        i18n:'零件名称(中)'
    },
    {
        prop:'partNameDe',
        label:'零件名称(德)',
        tooltip:true,
        i18n:'零件名称(德)'
    },
    // {
    //     prop:'partNameEn',
    //     label:'零件名称(英)',
    //     tooltip:true,

    // },
    {
        prop:'linie',
        label:'Linie',
        i18n:'Linie',
        tooltip:true,
        customRender:(h,scope)=>{
            if(scope.row.linie != null){
                const linie = []
                scope.row.linie.forEach((item) =>{
                    if(item.linie != null){
                        linie.push(item.linie)
                    }
                })
                let data = [...new Set(linie)]
                return data.join(',')
            }else{
                return ''
            }
        }
    },
    {
        prop:'deptCode',
        label:'Linie科室',
        i18n:'Linie科室',
        tooltip:true,
        customRender:(h,scope)=>{
            if(scope.row.linie != null){
                const deptCode = []
                scope.row.linie.forEach((item) =>{
                    if(item.deptCode != null){
                        deptCode.push(item.deptCode)
                    }
                })
                let data = [...new Set(deptCode)]
                return data.join(',')
            }else{
                return ''
            }
        }
    }
]