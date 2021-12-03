export const UNIT_COLUMNS=[
    {
        type:'selection',
        width:50
    },
    {
        type:'index',
        label:'序号',
        width:200
    },
    {
        label:'常用计量单位',
        prop:'targetUnitNameZh'
    },
    {
        label:'计量单位转换关系',
        prop:'converseRate'
    }
]

export const COLOR_COLUMNS=[
    {
        type:'selection'
    },
    {
        label:"色标零件编号",
        prop:'partNum5'
    },
    {
        label:'色标零件名称(中)',
        prop:'partNameZh'
    },
    {
        label:'色标零件名称(德)',
        prop:'partNameDe'
    }
]