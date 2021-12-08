export const UNIT_COLUMNS=[
    {
        type:'selection',
        width:50
    },
    {
        type:'index',
        il8n:'序号',
        width:200
    },
    {
        il8n:'常用计量单位',
        prop:'targetUnitNameZh'
    },
    {
        il8n:'计量单位转换关系',
        prop:'converseRate'
    }
]

export const COLOR_COLUMNS=[
    {
        type:'selection'
    },
    {
        il8n:"色标零件编号",
        prop:'partNum'
    },
    {
        il8n:'色标零件名称(中)',
        prop:'partNameZh'
    },
    {
        il8n:'色标零件名称(德)',
        prop:'partNameDe'
    }
]