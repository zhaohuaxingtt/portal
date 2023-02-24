export const tabsInforList = [
  { name: '申请单号', key: 'SHENQINGDANHAO', prop: 'mtzAppId' },
  {
    name: '申请单名',
    key: 'SHENQINGDANMING',
    prop: 'appName',
    type: 'tooltip',
    tooltipStyle: 'top'
  },
  { name: 'Linie', key: 'LINIE', prop: 'linieName' },
  // { name: '申请单类型',key:'SHENQINGDANLEIXING', prop: 'flowType', type: 'select' },
  { name: '申请状态', key: 'SHENQINGZHUANGTAI', prop: 'appStatus' },
  {
    name: '会议名称',
    key: 'HUIYIMINGCHENG',
    prop: 'meetingName',
    type: 'tooltip',
    tooltipStyle: 'bottom'
  }
]
export const methodList=[
  { code: '1', name: '一次性补差',  },
  { code: '2', name: '变价单补差',  },
]
export const partBalanceCountTypeList=[
  { code: 'SYSTEM', name: '系统预读',  },
  { code: 'HANDWORK', name: '手工上传',  },
]
export const materialDoseSourceList=[
  { code: 'BLUEPRINT', name: '图纸',  },
  { code: 'WEIGH', name: '称重',  },
  { code: 'CONVENTION', name: '约定',  },
]
export const avgPeriodList = [
  { code: '1', name: '一月',  },
  { code: '2', name: '二月',  },
  { code: '3', name: '三月',  },
  { code: '4', name: '四月',  },
  { code: '6', name: '六月',  },
  { code: '12', name: '十二月',  },
  { code: '0', name: '补差时间段内均值',  },
]
export const offsetList = [
  { code: '1', name: '1个月',  },
  { code: '2', name: '2个月',  },
  { code: '3', name: '3个月',  },
  { code: '4', name: '4个月',  },
  { code: '5', name: '5个月',  },
  { code: '6', name: '6个月',  },
  { code: '7', name: '7个月',  },
  { code: '8', name: '8个月',  },
  { code: '9', name: '9个月',  },
  { code: '10', name: '10个月',  },
  { code: '11', name: '11个月',  },
  { code: '12', name: '12个月',  },
  { code: '0', name: '0个月',  },
  { code: '-1', name: '-1个月',  },
  { code: '-2', name: '-2个月',  },
  { code: '-3', name: '-3个月',  },
  { code: '-4', name: '-4个月',  },
  { code: '-5', name: '-5个月',  },
  { code: '-6', name: '-6个月',  },
  { code: '-7', name: '-7个月',  },
  { code: '-8', name: '-8个月',  },
  { code: '-9', name: '-9个月',  },
  { code: '-10', name: '-10个月',  },
  { code: '-11', name: '-11个月',  },
  { code: '-12', name: '-12个月',  },
]
export const tipList = [
  '<div>一般供应商：SAP系统读取</div><div>特殊供应商（VWPT等）：手工上传</div>',
  '<div>贵金属：点价单</div><div>非贵金属：上海有色金属网</div>',
  '与供应商约定的原材料基准价格',
  '当市场价>（1+阈值）*基价或市场价<(1-阈值)*基价时，自动计算出补差结果<div>超额补差：只补超出阈值部分</div><div>全额补差：补市场价超出基价的部分</div>',
  '原材料在单位零件中的重量',
  '补差计算中的比例系数',
  '全年原材料市场价按均值计算周期等分。例：均值计算周期为3个月时，1-3月市场价均为1-3月的市场价均值',
  '市场价取值与本月的偏移量，例：计算偏移量为-1，计算3月补差金额时取2月市场价'
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
  { width: 100, props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO' },
  {
    width: 120,
    props: 'ruleVersion',
    name: '版本编号',
    key: '版本编号'
  },
  {
    width: 120,
    props: 'sapCode',
    name: '供应商编号',
    key: 'GONGYINGSHANGBIANHAO'
  },

  {
    width: 160,
    props: 'supplierName',
    name: '供应商名称',
    key: 'GONGYINGSHANGMINGCHENG'
  },
  {
    width: 130,
    props: 'materialCode',
    name: '原材料牌号',
    key: 'YUANCAILIAOPAIHAO'
  },
  { width: 150, props: 'materialName', name: '原材料', key: 'YUANCAILIAO' },
  { width: 130, props: 'price', name: '基价', key: 'JIJIA' },
  {
    width: 130,
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI'
  },
  { width: 80, props: 'tcCurrence', name: '货币', key: 'HUOBI' },
  { width: 120, props: 'tcExchangeRate', name: '汇率', key: 'HUILV' },
  {
    width: 200,
    props: 'sourceType',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN'
  },
  {
    width: 120,
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU'
  },
  { width: 100, props: 'threshold', name: '阈值', key: 'YUZHI' },
  {
    width: 130,
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI'
  },
  {
    width: 120,
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI'
  },
  { width: 150, props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' },
  { width: 150, props: 'buyerDeptName', name: '科室', key: 'KESHI' },
  { width: 170, props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI' },
  { width: 170, props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI' },
  { width: 150, props: 'sourceCode', name: '来源', key: 'LAIYUAN' },
  { width: 150, props: 'effectFlag', name: '是否生效', key: 'SHIFOUSHENGXIAO' },
  {
    width: 120,
    props: 'platinumPrice',
    name: '铂基价',
    key: 'BOJIJIA',
    icon: 'iconxinxitishi',
    iconTextKey: 'M01006002-Pt',
    iconText: 'M01006002-Pt'
  },
  {
    width: 130,
    props: 'platinumDosage',
    name: '铂用量',
    key: 'BOYONGLIANG',
    icon: 'iconxinxitishi',
    iconTextKey: 'M01006002-Pt',
    iconText: 'M01006002-Pt'
  },
  {
    width: 120,
    props: 'palladiumPrice',
    name: '钯基价',
    key: 'BAJIJIA',
    icon: 'iconxinxitishi',
    iconTextKey: 'M01006001-Pd',
    iconText: 'M01006001-Pd'
  },
  {
    width: 130,
    props: 'palladiumDosage',
    name: '钯用量',
    key: 'BAYONGLIANG',
    icon: 'iconxinxitishi',
    iconTextKey: 'M01006001-Pd',
    iconText: 'M01006001-Pd'
  },
  {
    width: 120,
    props: 'rhodiumPrice',
    name: '铑基价',
    key: 'LAOJIJIA',
    icon: 'iconxinxitishi',
    iconTextKey: 'M01006003-Rh',
    iconText: 'M01006003-Rh'
  },
  {
    width: 130,
    props: 'rhodiumDosage',
    name: '铑用量',
    key: 'LAOYONGLIANG',
    icon: 'iconxinxitishi',
    iconTextKey: 'M01006003-Rh',
    iconText: 'M01006003-Rh'
  },
  {
    width: 200,
    props: 'preciousMetalDosageUnit',
    name: '贵金属用量&基价单位',
    key: 'GUIJINSHUYONGLIANGJIJIADANWEI'
  },
  { width: 150, props: 'substrateExw', name: '载体费用', key: '载体费用' },
  { width: 150, props: 'substrateImpDuty', name: '载体税率(%)', key: '载体税率(%)' },
  { width: 150, props: 'substrateHandling', name: '载体管理费率(%)', key: '载体管理费率(%)' },
  { width: 150, props: 'pgmHandling', name: '贵金属管理费率(%)', key: '贵金属管理费率(%)' },
  { width: 150, props: 'manufacture', name: '制造费用', key: '制造费用' },
  { width: 150, props: 'transport', name: '运输费用', key: '运输费用' },
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
  // effectFlag: [{ required: true, message: '请选择', trigger: 'blur' }],
  materialGroup: [{ required: true, message: '请选择', trigger: 'blur' }], //MTZ-材料组
  carline: [{ required: true, message: '请选择', trigger: 'blur' }], //车型

  // supplierId:[{required: true, message: '请选择', trigger: 'blur'}],//供应商编号
  // supplierName:[{required: true, message: '请选择', trigger: 'blur'}],//供应商名
  // materialCode:[{required: true, message: '请选择', trigger: 'blur'}],//原材料牌号
  // materialName:[{required: true, message: '请输入', trigger: 'blur'}],//原材料
  // price:[{required: true, message: '请输入', trigger: 'blur'}],//基价
  // priceMeasureUnit:[{required: true, message: '请输入', trigger: 'blur'}],//基价计量单位

  // tcCurrence: [{ required: true, message: '请输入', trigger: 'blur' }], //货币
  tcExchangeRate: [{ required: true, message: '请输入', trigger: 'blur' }], //汇率
  // source: [{ required: true, message: '请输入', trigger: 'blur' }], //市场价来源
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
  // compensationPeriod: [{ required: true, message: '请选择', trigger: 'blur' }], //补差周期
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
  ], //阈值补差逻辑
  startDate:[{required: true, message: '请选择', trigger: 'blur'}],//有效期起
  endDate:[{required: true, message: '请选择', trigger: 'blur'}],//有效期止
  substrateImpDuty: [
    { required: false, message: '请选择', trigger: 'blur' },
    { pattern:/^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数字', trigger: 'blur' },
  ], 
  substrateHandling: [
    { required: false, message: '请选择', trigger: 'blur' },
    { pattern:/^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数字', trigger: 'blur' },
  ], 
  pgmHandling: [
    { required: false, message: '请选择', trigger: 'blur' },
    { pattern:/^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数字', trigger: 'blur' },
  ], 
  manufacture: [
    { required: false, message: '请选择', trigger: 'blur' },
    { pattern:/^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数字', trigger: 'blur' },
  ], 
  transport: [
    { required: false, message: '请选择', trigger: 'blur' },
    { pattern:/^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数字', trigger: 'blur' },
  ], 

  substrateExw: [
    { required: false, message: '请选择', trigger: 'blur' },
    { pattern:/^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数字', trigger: 'blur' },
  ], 
 
}

export const partNumberTitle = [
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO' },
  { props: 'partNameZh', name: '零件名（中）', key: 'LK_LINGJIANMINGZHONG' },
  { props: 'partNameDe', name: '零件名（德）', key: 'LK_LINGJIANMINGDE' }
]
