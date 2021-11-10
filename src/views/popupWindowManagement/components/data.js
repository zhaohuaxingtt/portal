export const TABLE_COLUMNS = [
    {
        type:'selection',
        width:50
    },
    {
        label:'序号',
        type:'index'
    },
    {
        label:'弹窗编码',
        prop:'id',
    },
    {
        label:'弹窗标题',
        prop:'popupName',
    },
    {
        label:'弹窗说明',
        prop:'content',
    },
    {
        label:'发送时间',
        prop:'publishTime'
    }
]

export const INI_SEARCH_FORM={
    content:'',
    sendDate:'',
    popupName:''
}