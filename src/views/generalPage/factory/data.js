export const tableTitle = [
    {props: 'factoryCode', name: '工厂编号', key: 'GONGCHANGBIANHAO', maxlength: 40},
    {
        props: 'factoryName', name: '工厂名称', key: 'GONGCHANGMINGCHEN', maxlength: 256,
        required: true,
        rule: [{required: true, message: '请输入', trigger: 'blur'}]
    },
    {
        props: 'factoryAbbrName', name: '工厂简称', key: 'GONGCHANGJIANCHEN', maxlength: 50,
        required: true,
        rule: [{required: true, message: '请输入', trigger: 'blur'}]
    },
    {
        props: 'country', name: '国家', key: 'GUOJIA',
        required: true,
        rule: [{required: true, message: '请选择', trigger: 'change'}]
    },
    {
        props: 'province', name: '省份', key: 'SHENGFEN',
        required: true,
        rule: [{required: true, message: '请选择', trigger: 'change'}]
    },
    {
        props: 'city', name: '城市', key: 'SUPPLIER_CHENGSHI',
        required: true,
        rule: [{required: true, message: '请选择', trigger: 'change'}]
    },
    {
        props: 'address', name: '地址', key: 'DIZHI', maxlength: 300,
        required: true,
        rule: [{required: true, message: '请输入', trigger: 'blur'}]
    },
    {
        props: 'postCode', name: '邮编', key: 'YOUBIAN', maxlength: 10,
        width: 140,
        required: true,
        rule: [{required: true,pattern:/^[A-Za-z0-9]+$/, message: '请输入合法的邮编', trigger: 'blur'}]
    },
    {props: 'dunsCode', name: 'DUNS', maxlength: 150},
    {props: 'vwCode', name: 'VW号', key: 'SUPPLIER_VWHAO', maxlength: 3},
    {props: 'isNominate', name: '是否定点', key: 'SUPPLIER_SHIFOUDINGDIAN'},
    {props: 'effectFlag', name: '是否生效', key: 'SUPPLIER_SHIFOUSHENGXIAO'}
]
