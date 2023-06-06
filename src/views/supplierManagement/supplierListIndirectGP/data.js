export const searchFormData = [
    { props: 'supplierName', name: '供应商名称', key: 'TERMS_GONGYINGSHANGMINGCHENG'},
    { props: 'svwCode', name: '正式号', key: 'ZHENGSHIHAO' },
    { props: 'svwTempCode', name: '临时号', key: 'SUPPLIER_LINGSHIHAO' },
    { props: 'sapCode', name: 'SAP号', key: 'SUPPLIER_SAPHAO', },
    { props: 'tagNameList', name: '供应商标签', key: 'GONGYINGSHANGBIAOQIAN', type: 'select', selectOption: 'tagdropDownList', multiple: true },
]
export const tableTitle = [
    {
        props: 'nameZh',
        name: '供应商中文名',
        key: 'GONGYINGSHANGZHONGWENMING',
        fixed: true,
        tooltip: true
    },
    {
        props: 'nameEn',
        name: '供应商英文名',
        key: 'SupplierEn',
        tooltip: true
    },
    {
        props: 'supplierTagNameList',
        name: '供应商标签',
        width: 200,
        key: 'GONGYINGSHANGBIAOQIAN',
        tooltip: true
    },
    {
        props: 'svwTempCode',
        name: '临时号',
        width: 120,
        key: 'SUPPLIER_LINGSHIHAO',
        tooltip: true
    },
    {
        props: 'svwCode',
        name: '正式号',
        width: 120,
        key: 'ZHENGSHIHAO',
        tooltip: true
    },
    {
        props: 'sapCode',
        name: 'SAP号',
        width: 120,
        key: 'SUPPLIER_SAPHAO',
        tooltip: true
    },
    {
        props: 'supplierType',
        name: '供应商类型',
        width: 120,
        key: 'SUPPLIER_SUPPLIERTYPE'
    },
    { props: 'yewuType', name: '业务类型', width: 120, key: 'YEWULEIXING' },
    {
        props: 'createDate',
        name: '创建时间',
        width: 150,
        key: 'LK_CHUANGJIANSHIJIAN',
        tooltip: true
    },
    {
        props: 'updateDate',
        name: '修改时间',
        width: 150,
        key: 'SUPPLIER_XGSJ',
        tooltip: true
    }
]