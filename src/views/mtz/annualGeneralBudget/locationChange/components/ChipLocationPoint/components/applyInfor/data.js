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

export const tableTitle = [
  {
    width: 100,
    props: 'id',
    name: '申请单号',
    key: 'SHENQINGDANHAO'
  },
  {
    width: 300,
    props: 'nominateName',
    name: '申请单名',
    key: 'SHENQINGDANMING'
  },
  { width: 300, props: 'carType', name: 'PROJECT', key: 'PROJECT' },
  {
    width: 100,
    props: 'nominateProcessTypeDesc',
    name: '类型',
    key: 'LEIXING'
  },
  {
    width: 100,
    props: 'applicationStatusDesc',
    name: '状态',
    key: 'ZHUANGTAI'
  },
  {
    width: 120,
    props: 'partProjTypeDesc',
    name: '项目类型',
    key: 'XIANGMULEIXING'
  },
  { width: 300, props: 'meetingName', name: '会议', key: 'HUIYI' },
  {
    width: 150,
    props: 'nominateUserName',
    name: '询价采购员',
    key: 'XUNJIACAIGOUYUAN'
  },
  { width: 150, props: 'linieName', name: 'LINIE', key: 'LINIE' },
  {
    width: 150,
    props: 'rsStatusDesc',
    name: 'RS单状态',
    key: 'RSDANZHUANGTAI'
  },
  {
    width: 200,
    props: 'rsFreezeDate',
    name: 'RS冻结日期',
    key: 'RSDONGJIERIQI'
  },
  {
    width: 220,
    props: 'isPriceConsistent',
    name: '报价一致性检验状态',
    key: 'BJYZXJYZT'
  },
  {
    width: 150,
    props: 'selStatusDesc',
    name: 'SEL单据确认状态',
    key: 'SELDJQRZT'
  },
  { width: 200, props: 'nominateDate', name: '定点日期', key: 'DINGDIANRIQI' },
  { width: 150, props: 'ap8pAmt', name: '操作', key: 'CAOZUO' }
]

export const tableTitleInfor = [
  { width: 150, props: 'id', name: '申请单号', key: 'SHENQINGDANHAO' },
  {
    width: 200,
    props: 'nominateName',
    name: '申请单名',
    key: 'SHENQINGDANMING'
  },
  { width: 150, props: 'carType', name: 'PROJECT', key: 'PROJECT' },
  {
    width: 150,
    props: 'nominateProcessTypeDesc',
    name: '类型',
    key: 'LEIXING'
  },
  {
    width: 150,
    props: 'applicationStatusDesc',
    name: '状态',
    key: 'ZHUANGTAI'
  },
  {
    width: 150,
    props: 'partProjType',
    name: '项目类型',
    key: 'XIANGMULEIXING'
  },
  { width: 150, props: 'meetingPresentId', name: '会议', key: 'HUIYI' },
  {
    width: 150,
    props: 'nominateUserName',
    name: '询价采购员',
    key: 'XUNJIACAIGOUYUAN'
  },
  { width: 150, props: 'linieName', name: 'LINIE', key: 'LINIE' },
  {
    width: 150,
    props: 'rsStatusDesc',
    name: 'RS单状态',
    key: 'RSDANZHUANGTAI'
  },
  {
    width: 200,
    props: 'rsFreezeDate',
    name: 'RS冻结日期',
    key: 'RSDONGJIERIQI'
  },
  {
    width: 220,
    props: 'isPriceConsistent',
    name: '报价一致性检验状态',
    key: 'BJYZXJYZT'
  },
  {
    width: 150,
    props: 'selStatusDesc',
    name: 'SEL单据确认状态',
    key: 'SELDJQRZT'
  },
  { width: 200, props: 'nominateDate', name: '定点日期', key: 'DINGDIANRIQI' },
  { width: 150, props: 'ap8pAmt', name: '操作', key: 'CAOZUO' }
]

export const tableTitleContinueBox = [
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO', width: 150 },
  { props: 'fsGsSpNo', name: 'FSNR/GSNR', key: 'FSNRGSNR' },
  { props: 'rfqCode', name: 'RFQ编号', key: 'RFQBIANHAO' },
  { props: 'procureFactoryName', name: '采购工厂', key: 'CAIGOUGONGCHANG' },
  { props: 'partNameCn', name: '零件名（中）', key: 'LK_LINGJIANMINGZHONG' },
  { props: 'partNameDe', name: '零件名（德）', key: 'LK_LINGJIANMINGDE' },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG' },
  { props: 'sapNum', name: '供应商编号', key: 'GONGYINGBIANHAO' },
  { props: 'productionProportion', name: '比例（%）', key: 'BILI(%)' }
]

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
    width: 150
  },
  {
    props: 'endDate',
    name: '有效期止',
    align: 'center',
    key: 'YOUXIAOQIZHI',
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
    width: 150
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
export const tableLeftTitle = [
  { props: 'id', name: 'RFQ号', key: 'RFQHAO', width: 120 },
  { props: 'rfqName', name: 'RFQ名称', key: 'RFQMINGCHENG' },
  { props: 'rfqType', name: '类型', key: 'LEIXING', width: 150 }
]

export const tableRightTitle = [
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO', width: 150 },
  { props: 'partNameZh', name: '零件名称', key: 'LINGJIANMINGCHENG' },
  { props: 'partType', name: '类型', key: 'LEIXING', width: 100 }
]

export const tableTitleHistory = [
  {
    width: 150,
    props: 'assemblyPartnum',
    name: '一次件零件号',
    key: 'YICIJIANLINGJIANHAO'
  },
  {
    width: 150,
    props: 'assemblySupplierSap',
    name: '一次件供应商SAP号',
    key: 'YCJGYSSAPH'
  },
  {
    width: 150,
    props: 'assemblySupplierName',
    name: '一次件供应商',
    key: 'YICIJIANGONGYINGSHANG'
  },
  {
    width: 150,
    props: 'assemblyPartName',
    name: '一次件零件名',
    key: 'YICIJIANLINGJIANMING'
  },
  { width: 120, props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' },
  { width: 120, props: 'buyerDeptName', name: '科室', key: 'KESHI' },
  {
    width: 150,
    props: 'piecePartnum',
    name: '二次件零件号',
    key: 'ERCIJIANLINGJIANHAO'
  },
  {
    width: 150,
    props: 'piecePartName',
    name: '二次件零件名',
    key: 'ERCIJIANLINGJIANMING'
  },
  {
    width: 150,
    props: 'pieceSupplierSap',
    name: '二次件供应商SAP号',
    key: 'ECJGYSSAPH'
  },
  {
    width: 150,
    props: 'pieceSupplierName',
    name: '二次件供应商',
    key: 'ERCIJIANGONGYINGSHANG'
  },
  {
    width: 150,
    props: 'proportion',
    name: '二次件与一次件比例',
    key: 'ECJYYCJBL'
  },
  { width: 130, props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO' },
  {
    width: 120,
    props: 'materialCode',
    name: '原材料牌号',
    key: 'YUANCAILIAOPAIHAO'
  },
  {
    width: 150,
    props: 'material',
    name: '原材料名称',
    key: 'YUANCAILIAOMINGCHENG'
  },
  { width: 100, props: 'price', name: '基价', key: 'JIJIA' },
  {
    width: 120,
    props: 'priceCountUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI'
  },
  { width: 50, props: 'priceUnit', name: '每', key: 'MEI' },
  { width: 100, props: 'countUnit', name: '零件数量', key: 'LINGJIANSHULIANG' }, ////////////////
  { width: 120, props: 'dosage', name: '用量', key: 'YONGLIANG' },
  {
    width: 120,
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANEWI'
  },
  {
    width: 160,
    props: 'marketSource',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN'
  },
  {
    width: 150,
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI'
  },
  { width: 80, props: 'tcCurrence', name: '货币', key: 'HUOBI' },
  {
    width: 100,
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU'
  },
  { width: 110, props: 'threshold', name: '阈值', key: 'YUZHI' },
  {
    width: 100,
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI'
  },
  { width: 110, props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI' },
  { width: 110, props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI' },
  { width: 100, props: 'effectFlag', name: '是否生效', key: 'SHIFOUSHENGXIAO' },
  { width: 110, props: 'updateDate', name: '更新时间', key: 'GENGXINSHIJIAN' },
  { width: 120, props: 'sourceCode', name: '来源', key: 'LAIYUAN' }
]

export const formRulesGZ = {
  effectFlag: [{ required: true, message: '请选择', trigger: 'blur' }],
  materialGroup: [{ required: true, message: '请选择', trigger: 'blur' }], //MTZ-材料组
  carline: [{ required: true, message: '请选择', trigger: 'blur' }], //车型

  // supplierId:[{required: true, message: '请选择', trigger: 'blur'}],//供应商编号
  // supplierName:[{required: true, message: '请选择', trigger: 'blur'}],//供应商名
  // materialCode:[{required: true, message: '请选择', trigger: 'blur'}],//原材料牌号
  // materialName:[{required: true, message: '请输入', trigger: 'blur'}],//原材料
  // price:[{required: true, message: '请输入', trigger: 'blur'}],//基价
  // priceMeasureUnit:[{required: true, message: '请输入', trigger: 'blur'}],//基价计量单位

  tcCurrence: [{ required: true, message: '请输入', trigger: 'blur' }], //货币
  tcExchangeRate: [{ required: true, message: '请输入', trigger: 'blur' }], //汇率
  source: [{ required: true, message: '请输入', trigger: 'blur' }], //市场价来源
  compensationRatio: [
    //补差系数
    { required: true, message: '请输入', trigger: 'blur' },
    {
      validator: function (rule, value, callback) {
        if (value < 0) {
          callback(new Error('不能为负数'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  compensationPeriod: [{ required: true, message: '请选择', trigger: 'blur' }], //补差周期
  threshold: [
    //阈值
    { required: true, message: '请输入', trigger: 'blur' },
    {
      validator: function (rule, value, callback) {
        if (value.toString().split('.')[1] !== undefined) {
          if (value.toString().split('.')[1].length > 4) {
            console.log(11111111)
            callback(new Error('最多输入小数点后4位'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
  ],
  thresholdCompensationLogic: [
    { required: true, message: '请选择', trigger: 'blur' }
  ] //阈值补差逻辑

  // startDate:[{required: true, message: '请选择', trigger: 'blur'}],//有效期起
  // endDate:[{required: true, message: '请选择', trigger: 'blur'}],//有效期止
}

export const partNumberTitle = [
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO' },
  { props: 'partNameZh', name: '零件名（中）', key: 'LK_LINGJIANMINGZHONG' },
  { props: 'partNameDe', name: '零件名（德）', key: 'LK_LINGJIANMINGDE' }
]

// 沿用补差规则查询
export const QueryFormData = [
  { props: 'ruleNo', name: '规则编号', key: 'GUIZHEBIANHAO' },
  { props: 'method', name: '补差方式', key: '补差方式', type: 'select', selectOption: 'methodList', multiple: true },
  { props: 'materialGroup', name: '材料组', key: 'LK_CAILIAOZHU' },
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', type: "iMultiLineInput" },
  { props: 'partName', name: '零件名称', key: 'LK_LINGJIANMINGCHENG' },
  { props: 'sapCode', name: '供应商SAP号', key: 'GONGYINGSHANGSAPHAO' },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG' },
  { props: 'deptCode', name: '科室', key: '科室', type: 'select', selectOption: 'deptList', multiple: true },
  { props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' },
  { props: 'effectFlag', name: '是否生效', key: 'SHIFOUSHENGXIAO', type: 'select', selectOption: 'effectFlagList', multiple: true },
  { props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI', type: 'date' },
  { props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI', type: 'date' },
]