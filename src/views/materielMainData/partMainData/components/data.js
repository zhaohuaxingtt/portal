export const UNIT_COLUMNS=[
    {
        type:'selection',
        width:50
    },
    {
        type:'index',
        i18n:'序号',
        width:200
    },
    {
        i18n:'常用计量单位',
        prop:'targetUnitNameZh'
    },
    {
        i18n:'计量单位转换关系',
        prop:'converseRate'
    }
]

export const COLOR_COLUMNS=[
    {
        type:'selection'
    },
    {
        i18n:"色标零件编号",
        prop:'partNum'
    },
    {
        i18n:'色标零件名称(中)',
        prop:'partNameZh'
    },
    {
        i18n:'色标零件名称(德)',
        prop:'partNameDe'
    }
]