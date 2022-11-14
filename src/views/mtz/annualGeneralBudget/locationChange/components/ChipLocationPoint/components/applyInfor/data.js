// 申请单基本信息
export const tabsInforList = [
  { name: '申请单号', key: 'SHENQINGDANHAO', prop: 'appNo' },
  {
    name: '申请单名',
    key: 'SHENQINGDANMING',
    prop: 'appName',
    type: 'tooltip',
    tooltipStyle: 'top'
  },
  { name: 'Linie', key: 'LINIE', prop: 'linieName' },
  // { name: '申请单类型',key:'SHENQINGDANLEIXING', prop: 'flowType', type: 'select' },
  { name: '申请状态', key: 'SHENQINGZHUANGTAI', prop: 'statusDesc' },
  {
    name: '会议名称',
    key: 'HUIYIMINGCHENG',
    prop: 'meetingName',
    type: 'tooltip',
    tooltipStyle: 'bottom'
  }
]

// 数据校验
export const formRulesGZ = {
  method: [{ required: true, message: '请选择', trigger: 'change' }],
  sapCode: [{ required: true, message: '请选择', trigger: 'blur' }],
  supplier: [{ required: true, message: '请输入', trigger: 'blur' }],// 表格供应商
  partNum: [{ required: true, message: '请输入正确零件号', trigger: 'change' }],
  amount: [{ required: true, message: '请输入', trigger: 'blur' }], //补差金额
  currency: [{ required: true, message: '请选择', trigger: 'change' }], //货币
  exchangeRate: [{ required: true, message: '请输入', trigger: 'blur' }], //汇率
  startDate: [{ required: true, message: '请选择', trigger: 'change' }], //开始日期
  endDate: [{ required: true, message: '请选择', trigger: 'change' }] //结束日期
}

// 沿用补差规则查询
export const QueryFormData = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZHEBIANHAO' },
  { props: 'method', name: '补差方式', key: '补差方式', type: 'select', selectOption: 'methodList' },
  { props: 'materialGroup', name: '材料组', key: 'LK_CAILIAOZHU' },
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', type: "iMultiLineInput" },
  { props: 'partName', name: '零件名称', key: 'LK_LINGJIANMINGCHENG' },
  { props: 'sapCode', name: '供应商SAP号', key: 'GONGYINGSHANGSAPHAO' },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG' },
  { props: 'deptCode', name: '科室', key: '科室', type: 'select', selectOption: 'deptList', multiple: true },
  { props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' },
  { props: 'effectFlag', name: '是否生效', key: 'SHIFOUSHENGXIAO', type: 'select', selectOption: 'effectFlagList' },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', type: 'date' },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', type: 'date' },
]

// 沿用表格
export const continueBox = [
  {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    align: 'center',
    width: 150
  }, {
    props: 'method',
    name: '补差方式',
    key: '补差方式',
    align: 'center',
    width: 150,
    customRender: (h, scope) => {
      return <span>{scope.row.method == '1' ? '一次性补差' : '变价单补差'}</span>
    }
  }, {
    props: 'materialGroup',
    name: '材料组',
    key: '材料组',
    align: 'center',
    width: 150
  }, {
    props: 'materialName',
    name: '原材料描述',
    key: '原材料描述',
    align: 'center',
    width: 150
  }, {
    props: 'partNum',
    name: '一次零件号',
    key: '一次零件号',
    align: 'center',
    width: 150
  }, {
    props: 'partName',
    name: '一次零件名称',
    key: '一次零件名称',
    align: 'center',
    tooltip: true,
    width: 150
  },
  {
    props: 'sapCode',
    name: '一次件供应商编号',
    key: '一次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    props: 'supplierName',
    name: '一次件供应商名称',
    width: '100px',
    align: 'center',
    key: '一次件供应商名称',
    tooltip: true,
    width: 150
  },
  {
    props: 'buyerName',
    name: '采购员',
    width: '100px',
    align: 'center',
    key: '采购员',
    width: 100
  },
  {
    props: 'deptCode',
    name: '科室',
    width: '100px',
    align: 'center',
    key: '科室',
    width: 100
  }, {
    props: 'partNameSec',
    name: '二次零件号',
    key: '二次零件号',
    align: 'center',
    width: 150
  }, {
    props: 'partNumSec',
    name: '二次零件名称',
    key: '二次零件名称',
    align: 'center',
    tooltip: true,
    width: 150
  },
  {
    props: 'sapCodeSec',
    name: '二次件供应商编号',
    key: '二次件供应商编号',
    align: 'center',
    width: 150
  },
  {
    props: 'supplierNameSec',
    name: '二次件供应商名称',
    width: '100px',
    align: 'center',
    key: '二次件供应商名称',
    tooltip: true,
    width: 150
  },
  {
    props: 'secondPrimaryRatio',
    name: '二次件与一次件比例',
    width: '100px',
    align: 'center',
    key: '二次件与一次件比例',
    width: 150
  },
  {
    props: 'amount',
    name: '补差金额',
    width: '100px',
    align: 'center',
    key: '补差金额',
    width: 150
  },
  {
    props: 'currency',
    name: '货币',
    align: 'center',
    key: 'HUOBI',
    width: 150
  },
  { props: 'exchangeRate', name: '汇率', align: 'center', key: 'HUILV' },
  {
    props: 'startDate',
    name: '有效期起',
    align: 'center',
    key: 'YOUXIAOQIQI',
    tooltip: true,
    width: 150
  },
  {
    props: 'endDate',
    name: '有效期止',
    align: 'center',
    key: 'YOUXIAOQIZHI',
    tooltip: true,
    width: 150
  },
  {
    props: 'effectFlag',
    name: '是否生效',
    align: 'center',
    key: 'SHIFOUSHENGXIAO',
    width: 150,
    customRender: (h, scope) => {
      return <span>{scope.row.effectFlag ? '是' : '否'}</span>
    }
  },
  {
    props: 'updateDate',
    name: '更新时间',
    align: 'center',
    key: '更新时间',
    width: 150,
    tooltip: true,
  },
  {
    props: 'sourceCode',
    name: '补差来源',
    align: 'center',
    key: '补差来源',
    width: 150,
    emit: 'go-detail',
    customRender: (h, scope) => {
      if (scope.row.sourceCode == "初始化") {
        return <span>{scope.row?.sourceCode}</span>
      } else {
        return <span class="link-text">{scope.row?.sourceCode}</span>
      }
    }
  },
]