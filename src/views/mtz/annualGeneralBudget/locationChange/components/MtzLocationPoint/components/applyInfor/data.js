export const tabsInforList = [
  { name: '申请单号',key:'SHENQINGDANHAO',prop: 'mtzAppId' },
  { name: '申请单名',key:'SHENQINGDANMING', prop: 'appName' },
  { name: 'Linie',key:'LINIE', prop: 'linieName' },
  // { name: '申请单类型',key:'SHENQINGDANLEIXING', prop: 'flowType', type: 'select' },
  { name: '申请状态',key:'SHENQINGZHUANGTAI', prop: 'appStatus' },
  { name: '会议名称',key:'HUIYIMINGCHENG', prop: 'meetingName',type:"tooltip"}
]

export const tableTitle = [
  { width: 150, props: 'id', name: '申请单号', key: 'SHENQINGDANHAO' },
  {
    width: 200,
    props: 'nominateName',
    name: '申请单名',
    key: 'SHENQINGDANMING'
  },
  { width: 150, props: 'carType', name: 'PROJECT', key: 'PROJECT' },
  { width: 150, props: 'nominateProcessTypeDesc', name: '类型', key: 'LEIXING' },
  { width: 150, props: 'applicationStatusDesc', name: '状态', key: 'ZHUANGTAI' },
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
  { width: 150, props: 'rsStatus', name: 'RS单状态', key: 'RSDANZHUANGTAI' },
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
  { width: 150, props: 'selStatusDesc', name: 'SEL单据确认状态', key: 'SELDJQRZT' },
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
  { width: 150, props: 'nominateProcessTypeDesc', name: '类型', key: 'LEIXING' },
  { width: 150, props: 'applicationStatusDesc', name: '状态', key: 'ZHUANGTAI' },
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
  { width: 150, props: 'rsStatusDesc', name: 'RS单状态', key: 'RSDANZHUANGTAI' },
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
  { width: 150, props: 'selStatusDesc', name: 'SEL单据确认状态', key: 'SELDJQRZT' },
  { width: 200, props: 'nominateDate', name: '定点日期', key: 'DINGDIANRIQI' },
  { width: 150, props: 'ap8pAmt', name: '操作', key: 'CAOZUO' }
]

export const tableTitleContinueBox = [
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO' },
  { props: 'fsGsSpNo', name: 'FSNR/GSNR', key: 'FSNRGSNR' },
  { props: 'rfqCode', name: 'RFQ编号', key: 'RFQBIANHAO' },
  { props: 'procureFactoryName', name: '采购工厂', key: 'CAIGOUGONGCHANG' },
  { props: 'partNameCn', name: '零件名（中）', key: 'LINGJIANMINGZHONG' },
  { props: 'partNameDe', name: '零件名（德）', key: 'LINGJIANMINGDE' },
  { props: 'supplierName', name: '供应商名称', key: 'GONGYINGSHANGMINGCHENG' },
  { props: 'sapNum', name: '供应编号', key: 'GONGYINGBIANHAO' },
  { props: 'productionProportion', name: '比例（%）', key: 'BILI(%)' }
]

export const continueBox = [
  { width: 150, props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO' },
  {
    width: 150,
    props: 'supplierId',
    name: '供应商编号',
    key: 'GONGYINGSHANGBIANHAO'
  },
  {
    width: 150,
    props: 'supplierName',
    name: '供应商名称',
    key: 'GONGYINGSHANGMINGCHENG'
  },
  {
    width: 150,
    props: 'materialCode',
    name: '原材料牌号',
    key: 'YUANCAILIAOPAIHAO'
  },
  { width: 150, props: 'materialName', name: '原材料', key: 'YUANCAILIAO' },
  { width: 150, props: 'price', name: '基价', key: 'JIJIA' },
  {
    width: 150,
    props: 'priceMeasureUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI'
  },
  { width: 150, props: 'tcCurrence', name: '货币', key: 'HUOBI' },
  { width: 150, props: 'tcExchangeRate', name: '汇率', key: 'HUILV' },
  {
    width: 150,
    props: 'sourceType',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN'
  },
  {
    width: 150,
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU'
  },
  { width: 150, props: 'threshold', name: '阈值', key: 'YUZHI' },
  {
    width: 150,
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YUZHIBUCHALUOJI'
  },
  {
    width: 150,
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
  { width: 150, props: 'platinumPrice', name: '铂基价', key: 'BOJIJIA',icon:"iconxinxitishi",iconTextKey:"M01006002-Pt",iconText:"M01006002-Pt"},
  { width: 150, props: 'platinumDosage', name: '铂用量', key: 'BOYONGLIANG' ,icon:"iconxinxitishi",iconTextKey:"M01006002-Pt",iconText:"M01006002-Pt"},
  { width: 150, props: 'palladiumPrice', name: '钯基价', key: 'BAJIJIA' ,icon:"iconxinxitishi",iconTextKey:"M01006001-Pd",iconText:"M01006001-Pd"},
  { width: 150, props: 'palladiumDosage', name: '钯用量', key: 'BAYONGLIANG' ,icon:"iconxinxitishi",iconTextKey:"M01006001-Pd",iconText:"M01006001-Pd"},
  { width: 150, props: 'rhodiumPrice', name: '铑基价', key: 'LAOJIJIA' ,icon:"iconxinxitishi",iconTextKey:"M01006003-Rh",iconText:"M01006003-Rh"},
  { width: 150, props: 'rhodiumDosage', name: '铑用量', key: 'LAOYONGLIANG' ,icon:"iconxinxitishi",iconTextKey:"M01006003-Rh",iconText:"M01006003-Rh"},
  { width: 200, props: 'preciousMetalDosageUnit', name: '贵金属用量&基价单位', key: 'GUIJINSHUYONGLIANGJIJIADANWEI' },

]

export const tableLeftTitle = [
  { props: 'id', name: 'RFQ号', key: 'RFQHAO' },
  { props: 'rfqName', name: 'RFQ名称', key: 'RFQMINGCHENG' },
  { props: 'rfqType', name: '类型', key: 'LEIXING' }
]

export const tableRightTitle = [
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO' },
  { props: 'partNameZh', name: '零件名称', key: 'LINGJIANMINGCHENG' },
  { props: 'partType', name: '类型', key: 'LEIXING' }
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
  { width: 150, props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN' },
  { width: 150, props: 'buyerDeptName', name: '科室', key: 'KESHI' },
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
  { width: 150, props: 'ruleNo', name: '规则编号', key: 'GUIZEBIANHAO' },
  {
    width: 150,
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
  { width: 150, props: 'price', name: '基价', key: 'JIJIA' },
  {
    width: 150,
    props: 'priceCountUnit',
    name: '基价计量单位',
    key: 'JIJIAJILIANGDANWEI'
  },
  { width: 150, props: 'priceUnit', name: '每', key: 'MEI' },
  { width: 150, props: 'countUnit', name: '零件数量', key: 'LINGJIANSHULIANG' }, ////////////////
  { width: 150, props: 'dosage', name: '用量', key: 'YONGLIANG' },
  {
    width: 150,
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANEWI'
  },
  {
    width: 150,
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
  { width: 150, props: 'tcCurrence', name: '货币', key: 'HUOBI' },
  {
    width: 150,
    props: 'compensationRatio',
    name: '补差系数',
    key: 'BUCHAXISHU'
  },
  { width: 150, props: 'threshold', name: '阈值', key: 'YUZHI' },
  {
    width: 150,
    props: 'compensationPeriod',
    name: '补差周期',
    key: 'BUCHAZHOUQI'
  },
  { width: 150, props: 'startDate', name: '有效期起', key: 'YOUXIAOQIQI' },
  { width: 150, props: 'endDate', name: '有效期止', key: 'YOUXIAOQIZHI' },
  { width: 150, props: 'effectFlag', name: '是否生效', key: 'SHIFOUSHENGXIAO' },
  { width: 150, props: 'updateDate', name: '更新时间', key: 'GENGXINSHIJIAN' },
  { width: 150, props: 'source', name: '来源', key: 'LAIYUAN' }
]

export const formRulesGZ = {
  effectFlag:[{required: true, message: '请选择', trigger: 'blur'}],
  materialGroup:[{required: true, message: '请选择', trigger: 'blur'}],//MTZ-材料组
  carline:[{required: true, message: '请选择', trigger: 'blur'}],//车型


  // supplierId:[{required: true, message: '请选择', trigger: 'blur'}],//供应商编号
  // supplierName:[{required: true, message: '请选择', trigger: 'blur'}],//供应商名
  // materialCode:[{required: true, message: '请选择', trigger: 'blur'}],//原材料牌号
  // materialName:[{required: true, message: '请输入', trigger: 'blur'}],//原材料
  // price:[{required: true, message: '请输入', trigger: 'blur'}],//基价
  // priceMeasureUnit:[{required: true, message: '请输入', trigger: 'blur'}],//基价计量单位



  tcCurrence:[{required: true, message: '请输入', trigger: 'blur'}],//货币
  tcExchangeRate:[{required: true, message: '请输入', trigger: 'blur'}],//汇率
  source:[{required: true, message: '请输入', trigger: 'blur'}],//市场价来源
  compensationRatio:[//补差系数
    {required: true, message: '请输入', trigger: 'blur'},
    {validator: function(rule, value, callback){
      if (value < 0) {
        callback(new Error('不能为负数'));
      }else{
          callback();
      }
    },trigger: 'blur'}
  ],
  compensationPeriod:[{required: true, message: '请选择', trigger: 'blur'}],//补差周期
  threshold:[//阈值
    {required: true, message: '请输入', trigger: 'blur'},
    {validator: function(rule, value, callback){
      if(value.toString().split(".")[1] !== undefined){
        if (value.toString().split(".")[1].length>4) {
            console.log(11111111)
            callback(new Error('最多输入小数点后4位'));
        }else{
            callback();
        }
      }else{
          callback();
      }
    }}
  ],
  thresholdCompensationLogic:[{required: true, message: '请选择', trigger: 'blur'}],//阈值补差逻辑



  // startDate:[{required: true, message: '请选择', trigger: 'blur'}],//有效期起
  // endDate:[{required: true, message: '请选择', trigger: 'blur'}],//有效期止
}

export const formRulesLJ = {
  assemblyPartnum:[{required: true, message: '请选择', trigger: 'blur'}],//零件号
  ruleNo:[{required: true, message: '请选择', trigger: 'blur'}],//规则编号
  supplierId:[{required: true, message: '请选择', trigger: 'blur'}],//供应商编号
  // partUnit:[{required: true, message: '请选择', trigger: 'blur'}],//零件数量单位
  priceUnit:[{required: true, message: '请选择', trigger: 'blur'}],//每
  dosage:[{required: true, message: '请选择', trigger: 'blur'}],//用量
  dosageMeasureUnit:[{required: true, message: '请选择', trigger: 'blur'}],//用量计量单位
  // mark:[{required: true, message: '请选择', trigger: 'blur'}],//备注

  // materialGroup:[{required: true, message: '请选择', trigger: 'blur'}],//MTZ-材料组
  // carline:[{required: true, message: '请选择', trigger: 'blur'}],//车型

  // supplierName:[{required: true, message: '请选择', trigger: 'blur'}],//供应商名
  // materialCode:[{required: true, message: '请选择', trigger: 'blur'}],//原材料牌号
  // materialName:[{required: true, message: '请输入', trigger: 'blur'}],//原材料
  // price:[{required: true, message: '请输入', trigger: 'blur'}],//基价
  // priceMeasureUnit:[{required: true, message: '请输入', trigger: 'blur'}],//基价计量单位

  // tcCurrence:[{required: true, message: '请输入', trigger: 'blur'}],//货币
  // tcExchangeRate:[{required: true, message: '请输入', trigger: 'blur'}],//汇率
  // source:[{required: true, message: '请输入', trigger: 'blur'}],//市场价来源
  // compensationRatio:[//补差系数
  //   {required: true, message: '请输入', trigger: 'blur'},
  //   {validator: function(rule, value, callback){
  //     if (value < 0) {
  //       callback(new Error('不能为负数'));
  //     }else{
  //         callback();
  //     }
  //   },trigger: 'blur'}
  // ],
  // compensationPeriod:[{required: true, message: '请选择', trigger: 'blur'}],//补差周期
  // threshold:[//阈值
  //   {required: true, message: '请输入', trigger: 'blur'},
  //   {validator: function(rule, value, callback){
  //     if(value.toString().split(".")[1] !== undefined){
  //       if (value.toString().split(".")[1].length>4) {
  //           console.log(11111111)
  //           callback(new Error('最多输入小数点后4位'));
  //       }else{
  //           callback();
  //       }
  //     }else{
  //         callback();
  //     }
  //   }}
  // ],
  // thresholdCompensationLogic:[{required: true, message: '请选择', trigger: 'blur'}],//阈值补差逻辑

  // startDate:[{required: true, message: '请选择', trigger: 'blur'}],//有效期起
  // endDate:[{required: true, message: '请选择', trigger: 'blur'}],//有效期止
}


export const partNumberTitle = [
  { props: 'partNum', name: '零件号', key: 'LINGJIANHAO' },
  { props: 'partNameZh', name: '零件名（中）', key: 'LINGJIANMINGZHONG' },
  { props: 'partNameDe', name: '零件名（德）', key: 'LINGJIANMINGDE' },
]