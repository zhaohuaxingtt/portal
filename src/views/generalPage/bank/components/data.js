export const tableTitle = [
    {props: 'bankName', name: '银行名称', key: 'YINHANGMINCHENG', maxlength: 200},
    {
        props: 'creditAmount', name: '授信金额（元）', key: 'SHOUQUANJINE', maxlength: 100,
        required: true,
        rule: [{
            required: true,
            pattern: /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
            message: '请输入正确的格式',
            trigger: 'blur'
        }]
    },
    {
        props: 'usedAmount', name: '已使用金额（元）', key: 'YISHIYONGJINGE', maxlength: 100,
        rule: [{
            pattern: /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
            message: '请输入正确的格式',
            trigger: 'blur'
        }]
    },
    {
        props: 'creditDateStart', name: '授信日期起', key: 'SUPPLIER_SHOUXINRQIQI',
        required: true,
        rule: [{required: true, message: '请选择', trigger: 'blur'}]
    },
    {
        props: 'creditDateEnd', name: '授信日期止', key: 'SHOUXINRIQIZHI',
        required: true,
        rule: [{required: true, message: '请选择', trigger: 'blur'}]
    },
    {props: 'mortgage', name: '抵押/质押/担保', key: 'DIYAZHIYADANBAO', maxlength: 4000},
    {
        props: 'interestRate', name: '利率（%）', key: 'LILV', maxlength: 6,
        rule: [{
            pattern: /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
            message: '请输入正确的格式',
            trigger: 'blur'
        }]
    },
    {props: 'repaymentSchedule', name: '还款计划', key: 'HUANKUANGJIHUA', maxlength: 200},
    {props: 'remark', name: '备注', key: 'BEIZHU', maxlength: 4000}
]
