;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('i18n')))
    : typeof define === 'function' && define.amd
    ? define(['i18n'], factory)
    : ((global = global || self), factory(window.i18n))
})(this, function (i18n) {
  'use strict'
  var oldLanguage = {
    ZHIBIAOKU:'指标库',
    ZHIBIAOGUANLI:'指标管理',
    CSQCAIGOUYUAN:'CSQ采购员',
    QUERENRENKESHI:'确认人科室',
    delete: '删除',
    deleteSure: '您确定要执行删除操作吗？',
    all: '全部',
    search: '搜索',
    setting: '设置',
    pagination: {
      prev: '上一页',
      next: '下一页',
      goto: '前往'
    },
    topLayout: {
      setting: {
        personal: '个人设置',
        admin: '管理端'
      },
      message: {
        notice: '通知',
        message: '消息'
      }
    },
    partsign: {
      enquiry: '询价资料',
      volume: '每车用量',
      log: '操作日志'
    },
    staffManagement: {
      OTHERJOBS: '其它岗位',
      DELETE: '删除',
      EDIT: '编辑',
      ROLEOFINFORMATION: '角色信息',
      NEW: '新建员工',
      RESET: '重置',
      CONFIRM: '确认',
      NEW_EMPLOYEE: '新建员工',
      SUPERIOR_INFORMATION: '上级信息',
      SUBORDINATE_INFORMATION: '下级信息',
      SUPERIOR_AND_SUBORDINATE_INFORMATION: '上下级信息',
      LABEL: '员工标签',
      EXPORT: '导出',
      INPUT_PLACEHOLDER: '请输入',
      SELECT_PLACEHOLDER: '请选择',
      EMPLOYEENUMBER: '员工号',
      CHINESENAME: '名字(中)',
      ENGLISHNAME: '英文名',
      SEX: '性别',
      DEPARTMENT: '所属部门',
      JOBS: '岗位',
      STATEEMPLOYEES: '员工状态',
      EMAIL: '邮箱',
      MOBILEPHONE: '手机',
      PHONE: '电话',
      ATTRIBUTE: '属性',
      EMPLOYEESLABEL: '员工标签',
      BASICINFORMATION: '基本信息',
      DEFAULTPURCHASEGROUPLIST: '默认采购组列表',
      THESERIALNUMBER: '序号',
      PURCHASINGGROUP: '采购组',
      DESCRIBE: '描述',
      TEMPORARYPRICECONTRACTFORPRODUCTION: '生产暂作价合同',
      NOTE: '备注',
      NATIONALITY: '国籍',
      RECENTLYTHELOGIN: '最近登录'
    },
    partsprocure: {
      PARTSPROCURENEWPROCUREMENTPROJECT: '零件采购项目管理',
      PARTSPROCUREGENERATEFSGSNR: '生成零件采购项目号',
      PARTSPROCURECANCELPARTSPURCHASE: '取消零件采购项目',
      PARTSPROCUREBATCHMAINTENANCE: '批量维护',
      PARTSPROCURESTARTINQUIRY: '启动询价',
      PARTSPROCURETRANSFER: '转派',
      PARTSPROCUREFSNFGSNFSPNR: '零件采购项目号',
      PARTSPROCUREPARTNUMBER: '零件号',
      PARTSPROCUREPARTNAMEZH: '零件名（中）',
      PARTSPROCUREPARTNAMEDE: '零件名（德）',
      PARTSPROCUREPURCHASINGFACTORY: '采购工厂',
      PARTSPROCUREPARTITEMTYPE: '零件项目类型',
      PARTSPROCUREVEHICLECATEGORIES: '车型大类',
      PARTSPROCUREMODELPROJECT: '车型项目',
      PARTSPROCUREPARTSTATUS: '零件状态',
      PARTSPROCUREPARTSTATUSNAME: '零件采购项目状态',
      PARTSPROCURESTATUS: '采购项目状态',
      PARTSPROCUREINQUIRYBUYER: '询价采购员',
      PARTSPROCURELINIE: 'LINIE',
      PARTSPROCURECF: 'CF',
      PARTSPROCURE: '请输入零件号，多个逗号分隔',
      PLEENTER: '请输入',
      CHOOSE: '请选择',
      CF: 'CF'
    },
    partsignLanguage: {
      XunYuanZhiXing: '寻源执行', //寻源执行
      JinDuJianKong: '进度监控', //进度监控
      LingJianQianShou: '新件信息单', //零件签收
      CaiGouXiangMuJianLi: '零件采购项目', //采购项目建立
      RfqguanLi: 'RFQ', //RFQ管理
      DingDianGuanLi: '定点管理', //定点管理
      RiZhi: '日志', //日志
      LingJianHao: '零件号', //零件号
      LingJianMingChengZH: '零件名称（中）', //零件名称（中）
      SheJiKeShi: '设计科室', //设计科室
      GongChengShi: '工程师', //工程师
      CheXingXiangMu: '车型项目', //车型项目
      XinXiDanFenLei: '信息单分类', //信息单分类
      XinXiDanZhuangTai: '信息单状态', //信息单状态
      XinXiDanLiuShuiHao: '信息单流水号', //信息单流水号
      XunJiaZiLiaoZhuangTai: '询价资料状态', //询价资料状态
      MeiCheYongLiangZhuangTai: '每车用量状态', //每车用量状态
      QingShuRu: '请输入', //请输入
      QingXuanZe: '请选择', //请选择
      QueRen: '确认', //确认
      ZhongZhi: '重置', //重置
      XinJianXinXiDanQianShou: '新件信息单签收', //新件信息单签收
      ZhuanPai: '转派', //转派
      QianShou: '签收', //签收
      TuiHui: '退回', //退回
      LingJianMingZH: '零件名（中）', //零件名（中）
      LingJianMingDE: '零件名（德）', //零件名（德）
      XinXiDanLeiXing: '信息单类型', //信息单类型
      XianShiDiTiaoDaoTiaoJiLuGongTiaoJiLu:
        '显示第    条到    条记录，共    条记录', //显示第    条到    条记录，共    条记录
      ShangYiYe: '上一页', //上一页
      XiaYiYe: '下一页', //下一页
      QianWangYe: '前往    页' //前往    页
    },

    /*
  <!------------------------------------------------------------------------>
  <!--                                                                   --->
  <!------------------------------------------------------------------------>
  */

    LK_CAIGOUFENEFENPEIDABUDAO: '采购份额分配达不到100%', // 采购份额分配达不到100%
    SHOUYINGXIANGLINGJIANXIANGQING: '受影响零件详情',
    LK_CAIGOUGONGCHNEGMINGCHENG: '采购工厂名称', // 采购工厂名称
    LK_CAOZUOCHENGGONG: '操作成功', // 操作成功
    LK_CHANLIANGZHANBI: '产量占比（%）', // 产量占比（%）
    LK_CAIGOUFENEFENPEIWEIDADAO: '当前分配未达到100%，请重新分配！', // 当前分配未达到100%，请重新分配！
    LK_CAIGOUFENEFENPEIWEIDADAODANGQIAN:
      '当前分配未达到100%当前分配的工厂中存在为0的情况，请重新分配！', // 当前分配未达到100%，请重新分配！
    LK_CAIGOUFENEFENPEICHAOGUO: '当前分配已超过100%，请重新分配！', // 当前分配已超过100%，请重新分配！
    DANGQIANMEIYOUCHUPINMOBAN: '当前没有初评模板',
    LK_DENGLU: '登录', // 登录
    LK_GONG: '共', // 共
    LK_MEIYOUKEYIXIAZHAIDEXINXI: '没有可以下载的信息', // 没有可以下载的信息
    LK_MIMA: '密码', // 密码
    LK_HAIWEIXUANZHEGONGCHANG: '您还未选择工厂！', // 您还未选择工厂！
    LK_NHWXZBDL: '您还未选择BDL',
    LK_QINGCHU: '清除', // 清除
    LK_QINGTIANXIELIYOUSHURUKUANGBITIAN: '请填写理由，该输入框为必填', // 请填写理由，该输入框为必填
    LK_QINGXUANZHEMEICHEYONGLIANGZHUANGTAI: '请选择每车用量状态', // 请选择每车用量状态
    LK_QINGXUANZHEXIANCAILIAOZU: '请选择先材料组', // 请选择先材料组
    LK_QINGXUANZHEXINXIDANZHUANGTAI: '请选择信息单状态', // 请选择信息单状态
    LK_QINGXUANZHEXUYAODAOCHUDEMEINIANYONGCHELIANG: '请选择需要导出的每车用量', // 请选择需要导出的每车用量
    LK_QINGXUANZHEXUYAODAOCHURIZHI: '请选择需要导出的日志', // 请选择需要导出的日志
    LK_QINGXUANZHEXUYAOSHANCHUYOUJIAN: '请选择需要删除的附件', // 请选择需要删除的附件
    LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN: '请选择需要下载的附件', // 请选择需要下载的附件
    LK_QINGXUANZHEXUYAOXIAZHAIWENJIAN: '请选择需要下载文件', // 请选择需要下载文件
    LK_QINGXUANZHEXUYAOXIUGAIDELINGJIANCAIGOUXIANGMU:
      '请选择需要修改的零件采购项目', // 请选择需要修改的零件采购项目
    LK_QINGXUANZHEXUNJIACAIGOUYUAN: '请选择询价采购员', // 请选择询价采购员
    LK_QINGXUANZHEXUNJIAZILIAOZHUANGTAI: '请选择询价资料状态', // 请选择询价资料状态
    LK_QINGXUANZHEYITIAOJIHUAGENGXIN: '请选择一条计划更新至询价产量', // 请选择一条计划更新至询价产量
    LK_QINGXUANZHEYITIAOXUYAOQUEREDEBANBEN: '请选择一条需要确认的版本', // 请选择一条需要确认的版本
    LK_QUESHICAILIAOZUBIANHAOETC: '缺失材料组编号，请先设置零件对应的材料组', // 缺失材料组编号，请先设置零件对应的材料组
    LK_QUESHIYOUXIAODEGONGYIZUID: '缺失有效的工艺组id', // 缺失有效的工艺组id
    LK_QUESHIYOUXIAODELINGJIANBIANHAO: '缺失有效的零件编号', // 缺失有效的零件编号
    LK_SHANCHUCHENGGONG: '删除成功', // 删除成功
    LK_SHANGCHUAN: '上传', // 上传
    LK_SHANGCHUANCHENGGONG: '上传成功', // 上传成功
    LK_SHANGCHUANSHIBAI: '上传失败', // 上传失败
    LK_TIAODI: '条到第', // 条到第
    LK_TIAOJILU: '条记录', // 条记录
    LK_XIANSHI: '显示第', // 显示第
    LK_XINJIANXINXIDANTUIHUI: '新件信息单退回', // 新件信息单退回
    LK_YIQIANSHOU: '已签收', // 新件信息单退回
    LK_XINJIANXINXIDANZHUANPAI: '新件信息单转派', // 新件信息单转派
    LK_XIUGAICHENGGONG: '修改成功', // 修改成功
    LK_YITUIHUI: '已退回', // 以退回
    LK_YONGHUMING: '用户名', // 用户名
    LK_ZHUANPAICHENGGONG: '转派成功', // 转派成功
    LK_AEKOHAO: 'Aeko号', //Aeko号
    LK_BDLLIEBIAO: 'BDL列表', //BDL列表
    LK_BMG: 'BMG', //BMG
    LK_BOMDANXINXI: 'BOM单信息', //BOM单信息
    LK_CBDSHEZHI: 'CBD设置', //CBD设置
    LK_CBDXUANZE: 'CBD选择', //CBD选择
    LK_CFFUZEREN: 'CF负责人', //CF负责人
    LK_CFKONGZHIYUAN: 'CF控制员', //CF控制员
    LK_CS_1BEIZHU: 'CS*1备注', //CS*1备注
    LK_CS_1SHANGHUIBEIZHU: 'CS*1上会备注', //CS*1上会备注
    LK_CSFPFUZEREN: 'CSF（P）负责人', //CSF（P）负责人
    LK_FS_GSHAO: 'FS/GS号', //FS/GS号
    LK_FS_GS_SP: 'FS/GS/SP号', //FS号
    LK_INBOUNDWULIUFANGSHI: 'INBOUND物流方式', //INBOUND物流方式
    LK_LINIE: 'LINIE', //LINIE
    LK_LINIEBEIZHU: 'Linie备注', //Linie备注
    LK_LINIEBUMEN: 'LINIE部门', //LINIE部门
    LK_LINIESHANGHUIBEIZHU: 'Linie上会备注', //Linie上会备注
    LK_MBDL: 'MBDL', //MBDL
    LK_MQPINGFENZHUANGTAI: 'MQ评分', //MQ评分状态
    LK_MTZLINGJIAN: 'MTZ零件', //MTZ零件
    LK_RFQBIANHAO: 'RFQ编号', //RFQ编号
    LK_RFQGUANLI: 'RFQ', //RFQ管理
    LK_RFQLEIXING: 'RFQ类型', //RFQ类型
    LK_RFQLIST: 'RFQ列表', //RFQ列表
    LK_RFQLINGJIANHUOZHERFQGONGYINGSHANGWEIKONG:
      'RFQ零件或者RFQ供应商为空，不能创建RFQ轮次', //RFQ零件或者RFQ供应商为空，不能创建RFQ轮次
    LK_RFQMINGCHENG: 'RFQ名称', //RFQ名称
    LK_RFQMINGCHNEGBUNENGWEIKONG: 'RFQ名称不能为空', //RFQ名称不能为空
    LK_RFQZHUANGTAI: 'RFQ状态', //RFQ状态
    LK_RFQZONGHEGUANLI: 'RFQ综合管理', //RFQ综合管理
    LK_RWJIA: 'RW价', //RW价
    LK_SAICVOLKSWAGENKONGXIANGCAOZUO_XIAOSHI: 'SAIC VOLKSWAGEN空箱操作_小时', //SAIC VOLKSWAGEN空箱操作_小时
    LK_SAICVOLKSWAGENKUCUN_XIAOSHI: 'SAIC VOLKSWAGEN库存_小时', //SAIC VOLKSWAGEN库存_小时
    LK_SOPRIQI: 'SOP日期', //SOP日期
    LK_SUM: 'SUM', //SUM
    LK_SVWYAOQIUEMZHOU: 'SVW要求EM（周）', //SVW要求EM（周）
    LK_SVWSHIMO: 'SVW要求首次试模', //SVW要求EM（周）
    LK_SVWYAOQIUOTSZHOU: 'SVW要求OTS（周）', //SVW要求OTS（周）
    LK_SVWYAOQIUSHOUCISHIMO: 'SVW要求首次试模', //SVW要求首次试模
    LK_SWHAO: 'SVW号', //sw号
    LK_TPPINGFENZHUANGTAI: 'EP评分', //TP评分状态
    LK_BANBENHAO: '版本号', //版本号
    LK_BANBENZHUANGTAI: '版本状态', //版本状态
    LK_BAOZHUANGFUZEREN: '包装负责人', //包装负责人
    LK_BAOCUN: '保存', //保存
    LK_BAOCUNBINGCHUANGJIAN: '保存并创建', //保存并创建
    LK_BAOJIAJIEZHIRIQI: '截止日期', //报价截止日期
    LK_RFQQUOTATIONDEADLINE: '截止日期', //报价截至日期
    LK_NINDANGQIANHAIWEIXUANZE: '抱歉！您当前还未选择！', //抱歉！您当前还未选择！
    LK_ZYCBPJZTWZDDSHCNDJCAN: '只有初评状态为中断的时候，才能点击此按钮',
    LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN:
      '抱歉！您当前还未选择询价采购员！', //抱歉！您当前还未选择询价采购员！
    LK_BEIZHUBUNENGWEIKONG: '抱歉，备注不能为空！', //抱歉，备注不能为空！
    LK_CICHUBIXUXUANZEYITIAOGONGYIZUSHUJU: '抱歉，此处必须选择一条工艺组数据', //抱歉，此处必须选择一条工艺组数据
    LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININQIDONGXUNJIA:
      '抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您启动询价！', //抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您启动询价！
    LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININTIANJIA:
      '抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您添加！', //抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您添加！
    LK_LIYOUBUNENGWEIKONG: '抱歉，理由不能为空！', //抱歉，理由不能为空！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOQIANSHOUDEXINXIDAN:
      '抱歉，您当前还未选择您需要签收的信息单！', //抱歉，您当前还未选择您需要签收的信息单！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOQUXIAODELINGJIANCAIGOUXIANGMU:
      '抱歉，您当前还未选择您需要取消的零件采购项目！', //抱歉，您当前还未选择您需要取消的零件采购项目！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGCHENGFSHAODELINGJIANCAIGOUXIANGMU:
      '抱歉，您当前还未选择您需要生成FS号的零件采购项目！', //抱歉，您当前还未选择您需要生成FS号的零件采购项目！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGPILIANGWEIHUDEXIANGMU:
      '抱歉，您当前还未选择您需要生批量维护的项目！', //抱歉，您当前还未选择您需要生批量维护的项目！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOTUIHUIDEXINXIDAN:
      '抱歉，您当前还未选择您需要退回的信息单！', //抱歉，您当前还未选择您需要退回的信息单！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDELINGJIANCAIGOUXIANGMU:
      '抱歉，您当前还未选择您需要转派的零件采购项目！', //抱歉，您当前还未选择您需要转派的零件采购项目！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEPINGFENRENWU:
      '抱歉，您当前还未选择您需要转派的评分任务！', //抱歉，您当前还未选择您需要转派的评分任务！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEXINXIDAN:
      '抱歉，您当前还未选择您需要转派的信息单！', //抱歉，您当前还未选择您需要转派的信息单！
    LK_NINDANGQIANHAIWEIXUANZERENWU: '抱歉，您当前还未选择任务！', //抱歉，您当前还未选择任务！
    LK_NINDANGQIANHAIWEIXUANZEXUYAOQIDONGXUNJIADECAIGOUXIANGMU:
      '抱歉，您当前还未选择需要启动询价的采购项目！', //抱歉，您当前还未选择需要启动询价的采购项目！
    LK_NOTCHOUSEDELETEPROJECT: '抱歉！您还未选择您需要删除的采购项目。',
    LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU:
      '抱歉，您当前还未选择需要申请目标价的采购项目！', //抱歉，您当前还未选择需要申请目标价的采购项目！
    LK_NINDANGQIANHAIWEIXUANZEXUYAOTIANJIADECAIGOUXIANGMU:
      '抱歉，您当前还未选择需要添加的采购项目！', //抱歉，您当前还未选择需要添加的采购项目！
    LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU:
      '抱歉，您选中的单据中存在已签收的信息单，不能批量签收！', //抱歉，您选中的单据中存在已签收的信息单，不能批量签收！
    LK_YONGHUMINGHUOMIMABUNENGWEIKONG: '抱歉，用户名或密码不能为空！', //抱歉，用户名或密码不能为空！
    LK_BEIZHU: '备注', //备注
    LK_BEIZHUXINXI: '备注信息', //备注信息
    LK_BEIDAITILINGJIAN: '被代替零件', //被代替零件
    LK_BEITIDAILINGJIAN: '被替代零件 ', //被替代零件
    LK_BENLUNBAOJIAJIEZHISHIJIAN: '本轮报价截止时间', //本轮报价截止时间
    LK_BENLUNBAOJIAQIZHISHIJIAN: '本轮报价起止时间', //本轮报价起止时间
    LK_BENLUNZHUANGTAI: '本轮状态', //本轮状态
    LK_BIANHAO: '编号', //编号
    LK_BIANJI: '编辑', //编辑
    LK_BIANSUXIANGLEIXING: '变速箱类型', //变速箱类型
    LK_BIANSUXIANGPEIZHI: '变速箱配置', //变速箱配置
    LK_BUNENGSHANCHUZHISHAOBAOLIUYITIAO: '不能删除，至少保留一条!', //不能删除，至少保留一条!
    LK_BUMENBIANHAO: '部门编号', //部门编号
    LK_BUMENPINGFENLEIXING: '部门评分类型', //部门评分类型
    LK_CAILIAO: '材料', //材料
    LK_CAILIAOGONGYIZUMINGCHENGDE: '材料工艺组名称（德）', //材料工艺组名称（德）
    LK_CAILIAOGONGYIZUMINGCHENGZHONG: '材料工艺组名称（中）', //材料工艺组名称（中）
    LK_CAILIAOZU: '材料组', //材料组
    LK_CAILIAOZULINEBUMEN: '材料组LINE部门', //材料组LINE部门
    LK_CAILIAOZUBIANHAO: '材料组编号', //材料组编号
    LK_CAILIAOZUGONGYIBIANHAO: '材料组工艺编号', //材料组工艺编号
    LK_CAILIAOZUGONGYISHEZHI: '材料组工艺设置', //材料组工艺设置
    LK_CAILIAOZUMINGCHENGDE: '材料组名称（德）', //材料组名称（德）
    LK_CAILIAOZUMINGCHENGZHONG: '材料组名称（中）', //材料组名称（中）
    LK_CAILIAOZUXINXI: '材料组信息', //材料组信息
    LK_CF: '财务控制员', //财务控制员
    LK_CAIWUMUBIAOJIA: '财务目标价', //财务目标价
    LK_CAIGOUGONGCHANG: '采购工厂', //采购工厂
    LK_CAIGOUTIAOKUAN: '采购条款', //采购条款
    LK_CAIGOUXIANGMUJIANLI: '零件采购项目', //采购项目建立
    LK_CAIGOUXIANGMUXINXI: '采购项目信息', //采购项目信息
    LK_CAIGOUYUAN: '前期采购员', //采购员
    LK_CAIGOUYUANGONGHAO: '采购员工号', //采购员工号
    LK_CANKAOBAOZHUANG: '参考包装', //参考包装
    LK_CANKAOBAOZHUANGDANJIAYUAN: '参考包装单价（元）', //参考包装单价（元）
    LK_CANKAOBAOZHUANGGAOMM: '参考包装高（mm）', //参考包装高（mm）
    LK_CANKAOBAOZHUANGKUANMM: '参考包装宽（mm）', //参考包装宽（mm）
    LK_CANKAOBAOZHUANGQIJULEIXING: '参考包装器具类型', //参考包装器具类型
    LK_CANKAOBAOZHUANGZHANGMM: '参考包装长(mm)', //参考包装长(mm)
    LK_CANKAOCHANLIANGJISHIJIANJIHUA: '参考产量及时间计划', //参考产量及时间计划
    LK_CANKAOCHEXING: '参考车型', //参考车型
    LK_CANKAOLINGJIANHAO: '参考零件号', //参考零件号
    LK_CANKAOLINGJIANMING: '参考零件名 ', //参考零件名
    LK_CAOZUO: '操作', //操作
    LK_CAOZUOREN: '操作人', //操作人
    LK_UpdateDate: '操作时间', //操作时间
    LK_CHAKAN: '查看', //查看!
    LK_CHAKANQUANBUBANBEN: '查看全部版本', //查看全部版本
    LK_INQUIRE: '查询', //查询
    LK_CHAZHAOGONGYIZUGONGYINGSHANG: '查找工艺组供应商', //查找工艺组供应商
    LK_CHAIFENCAIGOUGONGCHANG: '拆分采购工厂', //拆分采购工厂
    LK_CHANLIANGPC: '产量（PC）', //产量（PC）
    LK_CHANGJIANGMINGCHNEG: '场景名称/任务名称', //场景名称/任务名称
    LK_CHANGJINGMINGCHENGRENWUMINGCHENG: '场景名称/任务名称 ', //场景名称/任务名称
    LK_CHEXING: '车型', //车型
    LK_CHEXINGDALEI: '车型大类', //车型大类
    LK_CHEXINGDENGJI: '车型等级', //车型等级
    LK_CHEXINGSHENGCHANNIANXIAN: '车型生产年限', //车型生产年限
    LK_CHEXINGXIANGMU: '车型项目', //车型项目
    LK_CHEXINGXIANGMU0S: '车型项目0S', //车型项目0S
    LK_CHEXINGXIANGMUPVS: '车型项目PVS', //车型项目PVS
    LK_CHEXINGXIANGMUSOP: '车型项目SOP', //车型项目SOP
    LK_CHEXINGXIANGMUMINGCHENG: '车型项目名称', //车型项目名称
    LK_CHEHUI: '撤回', //撤回
    LK_CHENGBEN: '成本', //成本
    LK_CHICUN: '尺寸', //尺寸
    LK_CHUANGJIANDINGDIANSHENQING: '创建定点申请', //创建定点申请
    LK_CHUANGJIANRENGONGHAO: '创建人工号', //创建人工号
    LK_CHUANGJIANRENXINGMING: '创建人姓名', //创建人姓名
    LK_CHUANGJIANRIQI: '创建日期', //创建日期
    LK_CHUANGJIANSHIJIAN: '创建时间', //创建时间
    LK_CONGLINGJIANPAISHENG: '从零件派生', //从零件派生
    LK_DAXIAOMB: '大小（MB）', //大小（MB）
    LK_DAIBANSHIXIANG: '待办事项', //待办事项
    LK_DAIQUERENBANBEN: '待确认版本', //待确认版本
    LK_DANWEI: '价格单位', //单位
    LK_DANGQIANBANBEN: '当前版本', //当前版本
    LK_DANGQIANLUNCI: '当前轮次', //当前轮次
    LK_DAOCHU: '导出', //导出
    LK_DAORUSHIJIAN: '导入时间', //导入时间
    LK_DENGJIPEIZHI: '等级配置', //等级配置
    LK_DIANJISHANGCHUAN: '点击上传 ', //点击上传
    LK_DIANCHIRONGLIANG: '电池容量', //电池容量
    LK_DIANCHIYONGLIANG: '电池用量', //电池用量
    LK_DINGDIANGUANLI: '定点管理', //定点管理
    LK_DUQUYOUXIAODOM: '读取有效BOM', //读取有效BOM
    LK_DUQUYOUXIAOBOM: '读取有效BOM ', //读取有效BOM
    LK_FACHUXUNJIA: '发出询价', //发出询价
    LK_FADONGJILEIXING: '发动机类型', //发动机类型
    LK_FADONGJIPEIZHI: '发动机配置', //发动机配置
    LK_FASHENGSHIJIAN: '发生时间', //发生时间
    LK_FASONGXUNJIA: '发送询价', //发送询价
    LK_FASONGZHIWODEYOUXIANG: '发送至我的邮箱', //发送至我的邮箱
    LK_FANXIANGQIANBAOZHUANGMAOZHONGKG: '翻箱前包装毛重（KG）', //翻箱前包装毛重（KG）
    LK_FANXIANGQIANJICHUNIANWEIXIULÜ: '翻箱前基础年维修率 ', //翻箱前基础年维修率
    LK_FANXIANGQIANQIJUFANCHENGSHEDIEBI: '翻箱前器具返程折叠比 ', //翻箱前器具返程折叠比
    LK_FANXIANGQIANQIJUGAOMM: '翻箱前器具高（mm）', //翻箱前器具高（mm）
    LK_FANXIANGQIANQIJUHAO: '翻箱前器具号 ', //翻箱前器具号
    LK_FANXIANGQIANQIJUKUANMM: '翻箱前器具宽（mm）', //翻箱前器具宽（mm）
    LK_FANXIANGQIANQIJULEIXING: '翻箱前器具类型 ', //翻箱前器具类型
    LK_FANXIANGQIANQIJUSHOUMING: '翻箱前器具寿命 ', //翻箱前器具寿命
    LK_FANXIANGQIANQIJUSHU: '翻箱前器具数 ', //翻箱前器具数
    LK_FANXIANGQIANQIJUZHANGMM: '翻箱前器具长（mm）', //翻箱前器具长（mm）
    LK_FANXIANGQIANQIJUZONGHEDANJIARMB: '翻箱前器具综合单价（RMB）', //翻箱前器具综合单价（RMB）
    LK_FANXIANGQIANQIJUZUJINRMBDAY: '翻箱前器具租金（RMB/DAY）', //翻箱前器具租金（RMB/DAY）
    LK_FANHUI: '返回', //返回
    LK_FUZEREN: '负责人', //负责人
    LK_FUZERENDIANHUA: '负责人电话', //负责人电话
    LK_FUZERENYOUXIANG: '负责人邮箱', //负责人邮箱
    LK_FUJIANLIEBIAO: '附件列表', //附件列表
    LK_GENGXINYUANYIN: '更新原因', //更新原因
    LK_GENGXINZHIXUNJIACHANLIANG: '更新至询价产量', //更新至询价产量
    LK_GONGCHENGSHI: '工程师', //工程师
    LK_GONGYI: '工艺', //工艺
    LK_GONGYIHAO: '工艺号', //工艺号
    LK_SHENGMINGJISHUBANBEN:
      '公共UI组件展示界面，基于element的二次封装，当前element版本', //公共UI组件展示界面，基于element的二次封装，当前element版本
    LK_GONGGONGUIZUJIANZHANSHIJIEMIANJIYUELEMENTDEERCIFENGZHUANGDANGQIANELEMENTBANBEN:
      '公共UI组件展示界面，基于element的二次封装，当前element版本 ', //公共UI组件展示界面，基于element的二次封装，当前element版本
    LK_GONGHUOFANGSHI: '供货方式', //供货方式
    LK_GONGYINGSHANG360SHITU: '供应商360°视图', //供应商360°视图
    LK_GONGYINGSHANGSAPHAO: '供应商SAP号', //供应商SAP号
    LK_GONGYINGSHANGTIMELINE: '供应商timeline', //供应商timeline!
    LK_GONGYINGSHANGCAILIAOZHUNBEI: '供应商材料准备', //供应商材料准备
    LK_GONGYINGSHANGCHANPINGAIYAO: '供应商产品概要', //供应商产品概要!
    LK_GONGYINGSHANGGONGSIJIESHAO: '供应商公司介绍', //供应商公司介绍!
    LK_GONGYINGSHANGMING: '供应商名', //供应商名
    LK_GONGYINGSHANGMINGCHENG1: '供应商名称', //供应商名称
    LK_GYSMCJT: '供应商名称/集团', //供应商名称/集团
    LK_GONGYINGSHANGPINGFEN: '供应商评分', //供应商评分
    LK_GONGYINGSHANGPINGFENFUJIAN: '供应商评分附件', //供应商评分附件
    LK_GONGYINGSHANGSHENGCHANCHANGDI: '供应商工厂地址', //供应商工厂地址
    LK_GUANBIRFQ: '关闭RFQ', //关闭RFQ
    LK_HUIYIDIDIAN: '会议地点', //会议地点
    LK_HUIYIJIBENXINXI: '会议基本信息', //会议基本信息
    LK_HUIYIQITAXINXI: '会议其它信息', //会议其它信息
    LK_HUIYISHIJIAN: '会议时间', //会议时间
    LK_HUOBI: '货币', //货币
    LK_JICHUXINXI: '基础信息', //基础信息
    LK_JIHUORFQ: '激活RFQ', //激活RFQ
    LK_JISHUJIAOLIUHUI: '技术交底会', //技术交底会
    LK_EP: '技术评分人', //技术评分人
    LK_JIAGEMINGXI: '价格明细', //价格明细
    LK_JIAOFU: '交付', //交付
    LK_JIESHUBENLUNXUNJIA: '结束本轮询价', //结束本轮询价
    LK_JIESHUXIANGMU: '结束项目', //结束项目
    LK_JINRIDAIBAN: '今日待办 ', //今日待办
    LK_JINDUJIANKONG: '进度监控', //进度监控
    LK_JUJUE: '拒绝', //拒绝
    LK_KAISHINIANFEN: '开始年份', //开始年份
    LK_LISHISHIYONGGAILÜ: '历史适用概率', //历史适用概率
    LK_LIRUMENJING: '例如：⻔禁申请步骤，其他备注信息等', //例如：⻔禁申请步骤，其他备注信息等
    LK_LINGJIANCAIGOUXIANGMU: '零件采购项目', //零件采购项目
    LK_LINGJIANCAIGOUXIANGMUGUANLI: '零件采购项目管理', //零件采购项目管理
    LK_LINGJIANCAIGOUXIANGMULEIXING: '零件采购项目类型', //零件采购项目类型
    LK_LINGJIANCAIGOUXIANGMUZHUANPAI: '零件采购项目转派', //零件采购项目转派
    LK_LINGJIANCHANLIANG: '零件产量', //零件产量
    LK_LINGJIANCHANLIANGJIHUA: '零件产量计划', //零件产量计划
    LK_LINGJIANCHANLIANGJILU: '零件产量记录', //零件产量记录
    LK_LINGJIANHAO: '零件号', //零件号
    LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN: '零件号/FSNR/RFQ编号/采购员', //零件号/FSNR/RFQ编号/采购员
    LK_LINGJIANHAODIERBUFEN: '零件号第二部分', //零件号第二部分
    LK_LINGJIANHAODISANBUFEN: '零件号第三部分', //零件号第三部分
    LK_LINGJIANHAODISIBUFEN: '零件号第四部分', //零件号第四部分
    LK_LINGJIANHAODIWUBUFEN: '零件号第五部分', //零件号第五部分
    LK_LINGJIANHAODIYIBUFEN: '零件号第一部分', //零件号第一部分
    LK_LINGJIANJIAGONGCHENGDUDE: '零件加工程度(德)', //零件加工程度(德)
    LK_LINGJIANJIAGONGCHENGDUYING: '零件加工程度(英)', //零件加工程度(英)
    LK_LINGJIANJIAGONGCHENGDUZHONG: '零件加工程度(中)', //零件加工程度(中)
    LK_LINGJIANJIAGONGCHENGDUDAIMA: '零件加工程度代码', //零件加工程度代码
    LK_LINGJIANLEIXING: '零件类型', //零件类型
    LK_LINGJIANLEIXINGDAIMA: '零件类型代码', //零件类型代码
    LK_LINGJIANMAOYISHUXINGDAIMA: '零件贸易属性代码', //零件贸易属性代码
    LK_LINGJIANMAOYISHUXINGMIAOSHUDE: '零件贸易属性描述(德)', //零件贸易属性描述(德)
    LK_LINGJIANMAOYISHUXINGMIAOSHUYING: '零件贸易属性描述(英)', //零件贸易属性描述(英)
    LK_LINGJIANMAOYISHUXINGMIAOSHUZHONG: '零件贸易属性描述(中)', //零件贸易属性描述(中)
    LK_LINGJIANMEICHEYONGLIANG: '零件每车用量', //零件每车用量
    LK_LINGJIANMINGDE: '零件名（德）', //零件名（德）
    LK_LINGJIANMINGYING: '零件名（英）', //零件名（英）
    LK_LINGJIANMINGZHONG: '零件名（中）', //零件名（中）
    LK_LINGJIANMINGCHENG: '零件名称', //零件名称
    LK_LINGJIANMINGCHENGDE: '零件名称（德）', //零件名称（德）
    LK_LINGJIANMINGCHENGZHONG: '零件名称（中）', //零件名称（中）
    LK_LINGJIANPINGTAIXINGZHIDAIMA: '零件平台性质代码', //零件平台性质代码
    LK_LINGJIANPINGTAIXINGZHIMIAOSHUDE: '零件平台性质描述(德)', //零件平台性质描述(德)
    LK_LINGJIANPINGTAIXINGZHIMIAOSHUYING: '零件平台性质描述(英)', //零件平台性质描述(英)
    LK_LINGJIANPINGTAIXINGZHIMIAOSHUZHONG: '零件平台性质描述(中)', //零件平台性质描述(中)
    LK_LINGJIANPINGFEN: '零件评分', //零件评分
    LK_LINGJIANQIANSHOU: '新件信息单', //零件签收
    LK_LINGJIANQINGDAN: '零件清单', //零件清单
    LK_LINGJIANSUOSHUCAILIAOZULINIEBUMEN: '零件所属材料组LINIE部门 ', //零件所属材料组LINIE部门
    LK_LINGJIANSUOSHUCAILIAOZUDEWENMINGCHENG: '零件所属材料组德文名称 ', //零件所属材料组德文名称
    LK_LINGJIANSUOSHUCAILIAOZUZHONGWENMINGCHENG: '零件所属材料组中文名称 ', //零件所属材料组中文名称
    LK_LINGJIANSUOSHUGONGYIBIANHAO: '零件所属工艺编号', //零件所属工艺编号
    LK_LINGJIANXIANGMULEIXING: '零件项目类型', //零件项目类型
    LK_LINGJIANYANYONGXINGZHIDAIMA: '零件沿用性质代码', //零件沿用性质代码
    LK_LINGJIANYANYONGXINGZHIMIAOSHUDE: '零件沿用性质描述(德)', //零件沿用性质描述(德)
    LK_LINGJIANYANYONGXINGZHIMIAOSHUYING: '零件沿用性质描述(英)', //零件沿用性质描述(英)
    LK_LINGJIANYANYONGXINGZHIMIAOSHUZHONG: '零件沿用性质描述(中)', //零件沿用性质描述(中)
    LK_LINGJIANZHUANGTAI: '零件状态', //零件状态
    LK_LUNCILEIXING: '轮次类型', //轮次类型
    LK_MAOZHONGKG: '毛重（KG）', //毛重（KG）
    LK_MEICHEYONGLIANG: '每车用量', //每车用量
    LK_MEICHEYONGLIANGZHUANGTAI: '每车用量状态', //每车用量状态
    LK_MOJUYUSUANSHENQING: '模具预算申请', //模具预算申请
    LK_MUBIAOJIA: '目标价', //目标价
    LK_MUBIAOJIAZHUANGTAI: 'F-Target', //目标价状态
    LK_NIANFEN: '年份', //年份
    LK_NINSHIFOUQUERENDUIXINJIANXINXIDANJINHANGQIANSHOU:
      '您是否确认对新件信息单进行签收？', //您是否确认对新件信息单进行签收？
    LK_PEIZHIBILI: '配置比例', //配置比例
    LK_PEIZHIBIANMA: '配置编码', //配置编码
    LK_PILIANGWEIHU: '批量维护', //批量维护
    LK_PILIANGWEIHULINGJIANCAIGOUXIANGMU: '批量维护零件采购项目', //批量维护零件采购项目
    LK_PINGFEN: '评分', //评分
    LK_PINGFENREN: '评分人', //评分人
    LK_PUTONGLUNCI: '普通轮次', //普通轮次
    LK_QIWANGMUBIAOJIA: '期望目标价', //期望目标价
    LK_QITAPEIZHI: '其他配置', //其他配置
    LK_QITAXINXI: '其他信息', //其他信息
    LK_QIDONGXIANGMU: '启动项目', //启动项目
    LK_QIDONGXUNJIA: '启动询价', //启动询价
    LK_QIANSHOU: '签收', //签收
    LK_QIANSHOUQUEREN: '签收确认', //签收确认
    LK_QIANSHOURIQI: '签收日期', //签收日期
    LK_QIANDUANBAOZHUANGMINGCHENG: '前段包装名称 ', //前段包装名称
    LK_QINGSHURU: '请输入', //请输入
    LK_QINGSHURUBEIZHU: '请输入备注', //请输入备注
    LK_RFQPLEASEENTERQUERY: '请输入查询', //请输入查询
    LK_QINGSHURUCHANXUANGONGYINGSHANGMINGCHENG: '请输入查询供应商名称', //请输入查询供应商名称
    LK_QINGSHURUCHAXUNGONGYINGSHANGMINGCHENGCHANGSHANG:
      '请输入查询供应商名称,厂商...', //请输入查询供应商名称,厂商...
    LK_QINGSHURULINGJIANHAO: '请输入零件号', //请输入零件号
    LK_QINGSHURULINGJIANMING: '请输入零件名（中）', //请输入零件名（中）
    LK_QINGTIANJIAGONGYINGSHANG: '请添加供应商!', //请添加供应商!
    LK_QINGTIANXIEGONGCHENGSHI: '请填写工程师', //请填写工程师
    LK_QINGTIANXIESHEJIKESHI: '请填写设计科室', //请填写设计科室
    LK_QINGTIANXIEXINXIDANLIUSHUIHAO: '请填写信息单流水号', //请填写信息单流水号
    LK_QINGXUANZE: '请选择', //请选择
    LK_QINGXUANZHECHEXINGXIANGMU: '请选择车型项目', //请选择车型项目
    LK_QINGXUANZHEXINXIFENLEI: '请选择信息分类', //请选择信息分类
    LK_QINGXUANZHEXUYAODAOCHUBANBEN: '请选择需要导出的版本', //请选择需要导出的版本
    LK_QINGXUANZHEXUYAODAOCHUSHUJU: '请选择需要导出的数据', //请选择需要导出的数据
    LK_QINGXUANZHEYIGEXUYAOXIAZAIBANBEN: '请选择一个需要下载的版本', //请选择一个需要下载的版本
    LK_QUXIAO: '取 消', //取消
    LK_QUXIAOLINGJIANCAIGOUXIANGMU: '取消零件采购项目', //取消零件采购项目
    LK_QUXIAOYUANYIN: '取消原因', //取消原因
    LK_QUANBUBANBEN: '全部版本', //全部版本
    LK_QUEDING: '确定', //确定
    LK_QUEREN: '确认', //确认
    LK_RENKEZHOUQIZHOU: '认可周期（周）', //认可周期（周）
    LK_RENWUZHONGXIN: '任务中心 ', //任务中心
    LK_RIZHI: '日志', //日志
    LK_RIHZICHAKAN: '日志查看', //日志查看
    LK_RIZHICHAKAN: '日志查看 ', //日志查看
    LK_RUCHANGBAOZHUANGMINGCHENG: '入场包装名称', //入场包装名称
    LK_RUKUBAOZHUANGMAOZHONG: '入库包装毛重（KG）', //入库包装毛重（KG）
    LK_RUKUBAOZHUANGMAOZHONGKG: '入库包装毛重（KG）', //入库包装毛重（KG）
    LK_RUKUJICHUNIANWEIXIUFEILV: '入库基础年维修费率', //入库基础年维修费率
    LK_RUKUJICHUNIANWEIXIUFEILÜ: '入库基础年维修费率', //入库基础年维修费率
    LK_RUKUQIJUFANCHENGSHEDIEBI: '入库器具返程折叠比 ', //入库器具返程折叠比
    LK_RUKUQIJUKUAN: '入库器具宽（mm） ', //入库器具宽（mm）
    LK_RUKUQIJUKUANMM: '入库器具宽（mm） ', //入库器具宽（mm）
    LK_RUKUQIJULEIXING: '入库器具类型', //入库器具类型
    LK_RUKUQIJUSHOUMING: '入库器具寿命', //入库器具寿命
    LK_RUKUQIJUXINGHAO: '入库器具型号', //入库器具型号
    LK_RUKUQIJUCHANG: '入库器具长（mm）', //入库器具长（mm）
    LK_RUKUQIJUZHANGMM: '入库器具长（mm）', //入库器具长（mm）
    LK_RUKUQIJUZHUANGXIANGSHU: '入库器具装箱数', //入库器具装箱数
    LK_RUKUQIJUZHONGHEDANJIA: '入库器具综合单价', //入库器具综合单价
    LK_RUKUQIJUZHONGHEDANJIARMB: '入库器具综合单价（RMB）', //入库器具综合单价
    LK_RUKUQIJUZUJINRMBDAY: '入库器具租金（RMB/DAY）', //入库器具综合单价
    LK_RUKUQIJUZONGHEDANJIA: '入库器具综合单价 ', //入库器具综合单价
    LK_SEBIAOHAO: '色标号', //色标号
    LK_SHANCHU: '删除', //删除
    LK_SHANCHUGONGYINGSHANG: '删除供应商', //删除供应商
    LK_SHANGCHUANFUJIAN: '上传附件', //上传附件
    LK_SHANGCHUANREN: '上传人', //上传人
    LK_SHANGCHUANRIQI: '上传日期', //上传日期
    LK_SHANGQIDAZHONGYUANQU: '上汽⼤众园区303室', //上汽⼤众园区303室!
    LK_SHANGYIYE: '上一页', //上一页
    LK_SHEJIGONGCHENGSHIGONGHAO: '设计工程师工号 ', //设计工程师工号
    LK_SHEJIGONGCHENGSHIHAO: '设计工程师号', //设计工程师号
    LK_SHEJIGONGCHENGSHIXINGMING: '设计工程师姓名', //设计工程师姓名
    LK_SHEJIKESHI: '设计科室', //设计科室
    LK_SHEZHIGONGYIZU: '设置工艺组', //设置工艺组
    LK_SHENQING: '申请', //申请
    LK_SHENQINGRWJIA: '申请RW价', //申请RW价
    LK_SHENQINGBEIZHU: '申请备注', //申请备注
    LK_SHENQINGCAIWUMUBIAOJIA: '申请财务目标价', //申请财务目标价
    LK_SHENQINGLEIBIE: '申请类别', //申请类别
    LK_SHENQINGLEIXING: '申请类型', //申请类型
    LK_SHENQINGMUBIAOJIA: '申请目标价', //申请目标价
    LK_SHENQINGRIQI: '申请日期', //申请日期
    LK_SHENQINGYUANYIN: '申请原因', //申请原因
    LK_SHENQINGZHUANGTAI: '申请状态', //申请状态
    LK_SHENDUGUOCHANHUABEIZHU: '深度国产化备注', //深度国产化备注
    LK_SHENDUGUOCHANHUADAIMA: '深度国产化代码', //深度国产化代码
    LK_SHENPIYIJIAN: '审批意见', //审批意见
    LK_SHENPIZHUANGTAI: '审批状态', //审批状态
    LK_SHENGCHENGFS_GSNR: '生成FS/GS/SP NO.', //生成FS/GSNR
    LK_SHENGCHENGFSHAO: '生成FS号', //生成FS号
    LK_SHIJIANJIHUA: '时间计划', //时间计划
    LK_SHIFOUERCIJIAN: '是否二次件', //是否二次件
    LK_SHIFOUJIARUYIYOURFQ: '是否加入已有RFQ', //是否加入已有RFQ
    LK_CONFIRM_SIGN_RECORD_TIPS: '是否确认对新件信息单进行签收？', //是否确认对新件信息单进行签收？
    LK_SHIFOUQUERENSHANCHU: '是否确认删除?', //是否确认删除?
    LK_SHIFOUSHENDUGUOCHANHUA: '是否深度国产化', //是否深度国产化
    LK_SHIFOUYANZHENGCBD: '是否验证CBD', //是否验证CBD
    LK_SHIFOUZUHEXINJIANRFQ: '是否组合新建RFQ', //是否组合新建RFQ
    LK_ENTER_SEARCH_SUPPLIER_NAME_FACOTRY: '输入查询供应商名称、厂商类型...', //输入查询供应商名称、厂商类型...
    LK_SUOXUANBANBENWUFUJIAN: '所选版本无附件', //所选版本无附件
    LK_TANPANZHUSHOU: '谈判助手', //谈判助手
    LK_TESHULINGJIANLEIXING: '特殊零件类型', //特殊零件类型
    LK_TESHUYAOQIU: '特殊要求', //特殊要求
    LK_TIJIAO: '提交', //提交
    LK_TIANJIA: '添加', //添加
    LK_TIANJIAGONGYINGSHANG: '添加供应商', //添加供应商
    LK_TIANJIAZIDINGYIPINGFENXIANG: '添加自定义评分项', //添加自定义评分项
    LK_TONGZHIQUANBUGONGYINGSHANG: '通知全部供应商', //通知全部供应商
    LK_TONGZHIYIBAOJIAGONGYINGSHANG: '通知已报价供应商', //通知已报价供应商
    LK_TOUZIYUSUAN: '投资预算', //投资预算
    LK_TUZHI: '图纸', //图纸
    LK_TUZHIHETPXIANGQINGYE: '图纸和TP详情页 ', //图纸和TP详情页
    LK_TUZHIHETPDANXIANGQING: '图纸和信息单详情', //图纸和信息单详情
    LK_TUZHIRIQI: '图纸日期', //图纸日期
    LK_TUISONGSHIJIAN: '推送时间', //推送时间
    LK_TUICHUDENGLU: '退出登录', //退出登录!
    LK_PROFILE: '个人信息',
    LK_TUIHUI: '退回', //退回
    LK_TUIHUIYUANYIN: '退回原因', //退回原因
    LK_WAIBUKAIFAFEIYUAN: '外部开发费（元）', //外部开发费（元）
    LK_WEIHU: '维护', //维护
    LK_WEIHUREN: '维护人', //维护人
    LK_WENXINTISHI: '温馨提示', //温馨提示
    LK_WENJIANDAXIAOMB: '文件大小（MB）', //文件大小（MB）
    LK_WENJIANMING: '文件名', //文件名
    LK_WENJIANMINGCHENG: '文件名称', //文件名称
    LK_WULIUBIAOZHUN: '物流标准', //物流标准
    LK_PL: '物流审核人', //物流审核人
    LK_WULIUYAOQIU: '物流要求', //物流要求
    LK_XIAYIYE: '下一页', //下一页
    LK_XIAZAI: '下载', //下载
    LK_XIANGGUANCHEXING: '相关车型', //相关车型
    LK_XIANGNEIZHOUZHUANCAILIAOZONGHEJIAGE: '箱内周转材料综合价格 ', //箱内周转材料综合价格
    LK_XIANGNEIZHOUZHUANCAILIAOZONGHESHOUMING: '箱内周转材料综合寿命 ', //箱内周转材料综合寿命
    LK_XIANGQINGXINXI: '详情信息', //详情信息
    LK_XIANGMUCHEXING: '项目车型 ', //项目车型
    LK_XINJIANXINXIDANQIANSHOU: '新件信息单签收', //新件信息单签收
    LK_XINJIANXINXILIUSHUIDANHAO: '新件信息流水单号 ', //新件信息流水单号
    LK_XINJIANRFQ: '新建RFQ', //新建RFQ
    LK_XINJIANRFQLUNCI: '新建RFQ轮次', //新建RFQ轮次
    LK_XINJIANXINXIDANBEIZHU: '新建信息单备注', //新建信息单备注
    LK_XINJIANXINXIDANLIUSHUIHAO: '新件信息单流水号', //新建信息单流水号
    LK_XINSHENQINGCAIWUMUBIAOJIA: '新申请财务目标价', //新申请财务目标价
    LK_XINXIDANFENLEI: '信息单分类', //信息单分类
    LK_XINXIDANLEIXING: '信息单类型', //信息单类型
    LK_XINXIDANLIUSHUIHAO: '信息单流水号', //信息单流水号
    LK_XINXIDANSHENGCHENGSHIJIAN: '信息单生成时间', //信息单生成时间
    LK_XINXIDANXIANGQING: '信息单详情', //信息单详情
    LK_XINXIDANZHUANGTAI: '信息单状态', //信息单状态
    LK_XINXILIUSHUIDANHAO: '信息流水单号', //信息流水单号
    LK_XUANZHUANGJIAN: '选装件', //选装件
    LK_XUNYUANZHIHANG: '寻源', //寻源执行
    LK_XUNJIACAIGOUYUAN: '询价采购员', //询价采购员
    LK_XUNJIACAIGOUYUANBEIZHU: '询价采购员备注', //询价采购员备注
    LK_XUNJIACHANLIANGJIHUA: '询价产量计划', //询价产量计划
    LK_XUNJIAFUJIAN: '询价附件', //询价附件
    LK_XUNJIATUZHI: '询价图纸 ', //询价图纸
    LK_XUNJIAZILIAO: '询价资料', //询价资料
    LK_XUNJIAZILIAOZHUANGTAI: '询价资料状态', //询价资料状态
    LK_YANYONGCHEXINGDALEIDAIMA: '沿用车型大类代码', //沿用车型大类代码
    LK_YAOQIUCSCHUIYIRIQI: '要求CSC会议日期', //要求CSC会议日期
    LK_YIBAOCUN: '已保存', //已保存!
    LK_YIBAOJIAGONGYINGSHANG: '已报价供应商', //已报价供应商
    LK_YITIANJIADAOSHANGXIAN: '已添加到上限', //已添加到上限!
    LK_YIXUNJIACAIGOUYUANSHANGHUIBEIZHU: '询价采购员上会备注', //已询价采购员上会备注
    LK_YIXUNJIAGONGYINGSHANG: '已询价供应商', //已询价供应商
    LK_YONGLIANG: '用量', //用量
    LK_YUQIDAIBAN: '逾期待办 ', //逾期待办
    LK_YUANPEICHANG: '原配厂', //原配厂
    LK_ZAISHENQINGCAIWUMUBIAOJIA: '再申请财务目标价', //再申请财务目标价
    LK_ZAICISHENGQINGCAIWUMUBIAOJIA: '再申请财务目标价', //再新申请财务目标价
    LK_ZAIXINSHENQINGCAIWUMUBIAOJIA: '再新申请财务目标价 ', //再新申请财务目标价
    LK_ZAIXIANJINGJIA: '在线竞价', //在线竞价
    LK_ZANWUSHUJU: '暂无数据', //暂无数据
    LK_ZENGJIADERENKEFEIYUAN: '增加的认可费（元）', //增加的认可费（元）
    LK_ZHIFUTIAOKUAN: '支付条款', //支付条款
    LK_ZHINENGSHANGCHUANWENJIAN: '只能上传.xlsx文件', //只能上传.xlsx文件
    LK_ZHILIANG: '质量', //质量
    LK_MQ: '质量评分人', //质量评分人
    LK_ZHONGLIANG: '重量', //重量
    LK_ZHONGXINSHENQING: '重新申请', //重新申请
    LK_ZHONGZHI: '重置', //重置
    LK_ZHUANPAI: '转派', //转派
    LK_ZHUANPAIPINGFENRENWU: '转派评分任务', //转派评分任务
    LK_ZHUANTANPAN: '转谈判', //转谈判
    LK_ZHUANXUNJIA: '转询价', //转询价
    LK_ZHUANGXIANGSHU: '装箱数', //装箱数
    LK_ZHUANGTAI: '状态', //状态
    LK_ZUIXINRWJIA: '最新RW价', //最新RW价
    LK_ZUIXINFANHUIRIQI: '最新返回日期', //最新返回日期
    LK_ZUIXINSHENQINGRIQI: '最新申请日期', //最新申请日期
    LK_ZUIXINSHENQINGZHUANGTAI: '最新申请状态', //最新申请状态
    LK_SHEZHIPINGFENBUMEN: '设置评分部门', //设置评分部门
    LK_TUISONGPINGFENRENWU: '推送评分任务', //推送评分任务
    LK_GONGYISHEZHI: '工艺设置', //工艺设置
    LK_CAILIAOZUSHAIXUAN: '材料组筛选', //材料组筛选
    LK_GONGYIZUXUANDING: '工艺组选定', //工艺组选定
    LK_GONGYIZU: '工艺组', //工艺组
    LK_CHAIFENFACTORY: '选中的工厂中,存在未分配的份额，请填写后重试！',
    LK_FACTORYNOTSAME:
      '您所选的采购工厂与主数据中该车型项目对应的采购工厂不一致，请确认是否修改',
    LK_AREYOUSPLITE: '该车型项目主数据中对应多个采购工厂，是否拆分？',
    LK_XIETIAOREN: '协调人', //协调人
    LK_XINZENG: '新增', //新增
    LK_HUIFU: '恢复', //恢复
    LK_QINGXUANZEXUYAOSHANCHUDEPINGFENBUMEN: '请选择需要删除的评分部门', //请选择需要删除的评分部门
    LK_QINGXUANZEXUYAOHUIFUDEPINGFENBUMEN: '请选择需要恢复的评分部门', //请选择需要恢复的评分部门
    LK_QINGXUANZEWANSHUJUZAIZUOBAOCUN: '请选择完数据再做保存', //请选择完数据再做保存
    LK_WEIBUXITONGWENJIANWUFASHANCHU: '为外部系统文件，无法删除', // xxx 为外部系统文件, 无法删除

    LOG: {
      APPLICATION_NO: '申请单号',
      APPLICATION_NAME: '申请单名',
      INQUIRY_BUYER: '询价采购员',
      LINIE_BUYER: 'Linie采购员',
      APPLICATION_DATE: '申请日期',
      PARTSPROCUREMODELPROJECT: '车型项目',
      MEETING_NAME: '会议名称',
      APPLICATION_TYPE: '申请类型',
      PROJECT_TYPE: '采购项目类型',
      OPERATION: '操作',
      OPERATE_TIME: '操作时间',
      OPERATE_PERSON: '操作人',
      OPERATE_TYPE: '操作类型',
      MENU: '所属菜单',
      RESULT: '结果',
      SELECT_PLACEHOLDER: '请选择',
      INPUT_PLACEHOLDER: '请输入',
      DETAIL: '详情',
      CONFIRM: '确定',
      CANCEL: '取消'
    },
    ORGANIZATION_MANAGERMENT: {
      INPUT_PLACEHOLDER: '请输入',
      SELECT_PLACEHOLDER: '请选择',
      ORG_CHART: {
        SEARCH_PLACEHOLDER: '搜索组织/角色/人员信息',
        TAB_ORG_MAGERMENT: '组织管理',
        TAB_ROLE_MAGERMENT: '角色管理',
        TAB_APPROVAL_MAGERMENT: '审批管理'
      },
      ORG_LIST: {
        ORG_CODE: '组织机构编码',
        ORG_OWNER: '负责人',
        ORG_NAME: '组织机构名称',
        ORG_IS_SHOW: '是否显示',
        ORG_IS_COMMODITY: '是否为Commodity',
        IS_SYNC_SVCD: '是否同步svcd',
        TABLE_INDEX: '编号',
        TABLE_ORG_CNNAME: '组织机构名称(中)',
        TABLE_ORG_ENNAME: '组织机构名称(英)',
        TABLE_ORG_CODE: '组织机构编码',
        TABLE_ORG_LEVEL: '组织级别',
        TABLE_ORG_SHORT_CODE: '组织机构简码',
        TABLE_ORG_SHORT_NAME: '组织机构简称',
        TABLE_ORG_OWNER: '负责人',
        TABLE_ORG_DESC: '备注',
        CREATE_ORG_BTN: '新建组织机构',
        EDIT_ORG_BTN: '编辑',
        DELETE_ORG_BTN: '删除',
        EXPORT_ORG_BTN: '导出'
      },
      ORG_CREATE: {
        TITLE: '新建组织机构',
        TRUE_BTN: '确定',
        RESET_BTN: '重置',
        UP_LEVEL: '上级组织',
        ORG_CODE: '组织机构编码',
        ORG_CN_NAME: '组织机构名称(中)',
        ORG_EN_NAME: '组织机构名称(英)',
        ORG_LEVEL: '组织级别',
        SVCD_ORG_CODE: 'SVCD组织编码',
        ORG_DESC: '组织描述',
        ORG_TAG: '组织标签',
        IS_SHOW_ORG_TREE: '是否显示在组织树',
        IS_COMMODITY: '是否为Commodity',
        IS_SYNC_SVCD: '是否同步svcd',
        ORG_LOGO: '部门Logo',
        ORG_REMARK: '备注',
        ORG_LOGO_SIZE: '(文件大小最大限制10MB)',
        INCREMENT_BTN: '增加维度',
        DECREMENT_BTN: '删除维度',
        TABLE_INDEX: '序号',
        TABLE_DIMENSION: '维度',
        TABLE_DESC: '内容',
        DOWN_LEVEL: '下级组织',
        DOWN_LEVEL_DESC: '可选项说明',
        DOWN_LEVEL_DESC_ONE: '1.下级组织仅限于当前上级组织的原有下级组织',
        DOWN_LEVEL_DESC_TWO: '2. 如选择下级组织，即视为使用插入功能'
      },
      ORG_TAG: {
        TITLE: '组织标签',
        TRUEBTN: '确定',
        RESETBTN: '重置',
        CUSTOM_TAG: '自定义标签'
      },
      ORG_CHOOSE_DOWNLEVEL: {
        TITLE: '组织选择',
        ORG_CODE: '组织机构编码',
        ORG_FULLNAME: '组织机构全称',
        ORG_OWNER: '负责人',
        ORG_SEARCH_BTN: '查询',
        ORG_RESET_BTN: '重置',
        ORG_TRUE_BTN: '确定',
        TABLE_INDEX: '编号',
        TABLE_ORG_CODE: '组织机构编码',
        TABLE_ORG_NAME: '组织机构名称',
        TABLE_ORG_SHORT_CODE: '组织机构简码',
        TABLE_ORG_SHORT_NAME: '组织机构简称',
        TABLE_ORG_OWNER: '负责人'
      }
    },
    // ---------------WS3 供应商 start---------------------
    GONGHUOSHUXING: '供货属性', //供货属性
    ZHUCEDIZHIYOUBIAN: '注册地址邮编', //注册地址邮编
    KAIHUYINHANG: '开户银行', //开户银行
    YINGHANSUOZAISHENGFEN: '银行所在省份', //银行所在省份
    QDLYBJHJRXKZCXY_YINGHANGMINCHEN:
      '请登录银保监会金融许可证查询页 面（http://xkz.cbirc.gov.cn/jr ），查询开户银行具体的银行名称', //请登录银保监会金融许可证查询页 面（http://xkz.cbirc.gov.cn/jr ），查询开户银行具体的银行名称
    QDLYBJHJRXKZCXY_YINGHANGDAIMA:
      '请登录银保监会金融许可证查询页 面（http://xkz.cbirc.gov.cn/jr）， 查询开户银行的15位机构编码作为 银行机构编码', //请登录银保监会金融许可证查询页 面（http://xkz.cbirc.gov.cn/jr）， 查询开户银行的15位机构编码作为 银行机构编码
    GONGSIGAIKANG: '公司概况', //公司概况
    Home: '首页', //首页
    BasicInformation: '基本信息', //基本信息,
    CAIGOUTIAOKUANQIANSHURIQI: '采购条款签署日期',
    SupplierZh: '供应商中文名', //供应商中文名
    SupplierEn: '供应商英文名', //供应商中文名
    SupplierAbbreviationZh: '供应商简称（中）', //供应商简称（中）
    SupplierAbbreviationEn: '供应商简称（英）', //供应商简称（英）
    UnifySocialCreditCode: '统一社会信用代码', //统一社会信用代码
    LegalPerson: '法定代表人', //法定代表人
    EnterpriseType: '企业类型', //企业类型
    Industry: '所属行业', //所属行业
    IsListing: '是否上市', //是否上市
    country: '国家', //国家
    companyAddress: '注册地址', //注册地址
    financialStatus: '财务状况', //财务状况
    companySize: '企业规模', //企业规模
    epNatureCategory: '企业性质（大类）', //企业性质（大类）
    industryCode: '行业代码', //行业代码
    listingAddress: '上市地点', //上市地点
    registeredDate: '注册日期', //注册日期
    province: '省市', //省市
    ZHUCEDIZHIBIANMA: '注册地址编码', //注册地址编码
    CAIWUQUSHI: '财务趋势', //财务趋势
    QIYEXINGZHI: '企业性质（小类）', //企业性质（小类）
    YEWUFANWEI: '业务范围', //业务范围
    GUPIAODAIMA: '股票代码', //股票代码
    CHENGSHI: '城市', //城市
    GONGSHIWANGZHI: '公司网址', //公司网址
    FUKUANGJILV: '付款记录', //付款记录
    JINGYINGZHUANGTAI: '经营状态', //经营状态
    JINGYINGFANWEI: '经营范围', //经营范围
    JINGYINGQIXIAN: '经营期限', //经营期限
    JINGYINGCHANSUOSUOYOUXINGSHI: '经营场所所有形式', //经营场所所有形式
    JINGYINGCHANGSUOWEIZHI: '经营场所位置', //经营场所位置
    YINHANGSUOZAIGUOJIA: '银行所在国家', //银行所在国家
    YINHANGMINCHENG: '银行名称', //银行名称
    SHUIWUDAIMA: '税务代码', //税务代码
    YINGHANGSUOZAICHENGSHI: '银行所在省市', //银行所在省市
    YINHANGDAIMA: '银行机构编码', //银行机构编码
    YINHANGSUOZAICHENGSHI: '银行所在城市/区', //银行所在城市
    GONGHUOZHUANGTAI: '供货状态', //供货状态
    YINHANGZHANGHAO: '银行账号', //银行账号
    SHIFOUZAIGONG: '是否在供', //是否在供
    GONGHUO1: '供应商状态', //供应商状态
    GYSSF: '供应商身份', //供应商身份
    SHIFOUYELEIGONGCHANG: '是否业内工厂', //是否业内工厂
    SHIFOUANQUANJIAN: '是否安全件', //是否安全件
    GONGHUOLINGJIANLEIXING: '供货零件类型', //供货零件类型
    SHIFOULISHUHUOYU: '是否隶属华域', //是否隶属华域
    SHIFOUGONGONGGONGYINGSHANG: '是否共用供应商', //是否共用供应商
    GONGHUOLEIXING: '供货类型', //供货类型
    LEIBUPINGJIA: '内部评价', //内部评价
    FUZEKESHI: '负责科室', //负责科室
    XIANGGUANZHUANYEKESHI: '相关专业科室', //相关专业科室
    JISHUBUMENPINGJIA: '技术部门评价', //技术部门评价
    WULIUBUMENPINGJIA: '物流部门评价', //物流部门评价
    ZHILIANGBUMENPINGJIA: '质量部门评价', //质量部门评价
    // 历史沿革
    FANHUIGONGYINSHANG360: '返回供应商360', //返回供应商360
    BANGENGSHIJIAN: '变更时间', //变更时间
    BANGENLEIRONG: '变更内容', //变更内容
    BANGENGQIAN: '变更前', //变更前
    BIANGENGHOU: '变更后', //变更后
    BIANGENGCHAKAN: '变更查看', //变更查看
    GUDONGBANGENGQIAN: '股东变更前', //股东变更前
    GUDONGBANGENG: '股东变更', //股东变更
    GUDONGBIANGENGHOU: '股东变更后', //股东变更后
    QIYEYANGEMIAOSHU: '企业沿革描述', //企业沿革描述
    // FRM
    XINGONGYINGSHANGPINGJIJIEGUO: '新供应商评级结果', //新供应商评级结果
    XINGONGYINGSHANGPINGJISHIJIAN: '新供应商评级时间', //新供应商评级时间
    WAIBUPINGJI: '外部评级', //外部评级
    SHIFOULISHUSHANGTANAGONGTONGTI: '是否隶属桑塔纳共同体', //是否隶属桑塔纳共同体
    WAIBUPINGJIESHIJIAN: '外部评级时间', //外部评级时间
    CHUBUTIAOZHENGHOUDEFEN: '初评调整后得分', //初评调整后得分
    CHUPINGTIAOZHENGHOUJIEGUO: '初评调整后结果', //初评调整后结果
    CHUPINGSHIJIAN: '初评时间', //初评时间
    SHENGRUPINGJIJIEGUO: '深入评级结果', //深入评级结果
    SHENGRUPINGJISHIJIAN: '深入评级时间', //深入评级时间
    VWAGPINGJIJIEGUO: 'VWAG评级结果', //VWAG评级结果
    VWAGPINGJISHIJIAN: 'VWAG评级时间', //VWAG评级时间
    // 工厂信息
    GONGCHANGBIANHAO: '工厂编号', //工厂编号
    GONGCHANGMINGCHEN: '工厂名称', //工厂名称
    GONGCHANGJIANCHEN: '工厂简称', //工厂简称
    SHENGFEN: '省份', //省份
    DIZHI: '地址', //地址
    YOUBIAN: '邮编', //邮编
    // 授信银行信息
    YINGHANGMINCHENG: '银行名称', //银行名称
    SHOUQUANJINE: '授信金额（元）', //授信金额
    YISHIYONGJINGE: '已使用金额（元）', //已使用金额
    SHOUXINRIQIZHI: '授信日期止', //授信日期止
    DIYAZHIYADANBAO: '抵押/质押/担保', //抵押/质押/担保
    LILV: '利率（%）', //利率（%）
    HUANKUANGJIHUA: '还款计划', //还款计划
    SHOUXINYINHANGXINXIBUCONGSHUOMING: '授信银行信息补充说明：', //授信银行信息补充说明：
    // 股东、集团与关联公司
    GUDONGMINCHEN: '股东名称', //股东名称
    GUOJIA_DIQU: '国家/地区', //国家/地区
    CHUZIE: '出资额', //出资额
    BIZHONG: '币种', //币种
    ZHIGUBILI: '持股比例（%）', //持股比例（%）
    ZHUYINYEWU: '主营业务', // 主营业务
    HANGYEGUISHU: '行业归属', // 行业归属
    FUZEREN: '负责人', //负责人
    GUDONGGONGSIDEZHICHIQINGKANG: '股东公司的支持情况', // 股东公司的支持情况
    GUDONGZHENGJIANHANGMA: '股东证照/证件号码', // 股东证照/证件号码
    GUDONGLEIXING: '股东类型 ', //  股东类型
    JITUANGONGSIQUANCHEN: '集团公司全称', //集团公司全称
    YINWENMINCHEN: '英文全称', //英文全称
    JITUANGONGSIJIANCHEN: '集团公司简称', //集团公司简称
    GUOJIA: '国家', //国家
    ZONGBU: '总部', // 总部
    GUDONG_JITUANYUGUANLIANGONGSIBUCHONGSHUOMING:
      '股东、集团与关联公司补充说明：', // 股东、集团与关联公司补充说明：
    // 人员及公司治理情况
    YUANGONGSHU: '员工数', // 员工数
    GUANLIRENYUAN: '管理人员数', //管理人员数
    YANFARENYUANSHU: '研发人员数', //研发人员数
    SHENGCHANRENYUANSHU: '生产人员数', //生产人员数
    LINSHIGONGRENSHU: '临时工人数', // 临时工人数
    YANFARENYUAN: '研发人员', //  研发人员
    SHIFOUSHEZHIGONGHUI: '是否设置工会', // 是否设置工会
    ZHUYAOGUANLIRENYUAN: '主要管理人员姓名', //主要管理人员姓名
    XINGBIE: '性别', // 性别
    NIANLING: '年龄', //  年龄
    XUELI: '学历', // 学历
    ZHIWU: '职务', //职务
    ZHIZE: '职责', //职责
    SHIFOUCEO: '是否CEO', //是否CEO
    GUANLIJINGYAN: '管理经验', //管理经验
    HANGYEJINGYAN: '行业经验', //行业经验
    BEIZHU: '备注', //备注

    //主要业务及产品
    ZHUYAOCHANPIN: '主要产品', //主要产品
    NIANCHANLIANG: '年产量', //年产量
    ZHUYAOPEITAOZHUJICHANG_KEHU: '主要配套主机厂/客户', //主要配套主机厂/客户
    KAISHIGONGHUSHIJIAN: '开始供货时间', //开始供货时间
    GONGHUONIANFEN: '供货年份', //供货年份
    NIANGONGHUOLIANG: '年供货量', //年供货量
    GUOLEISHITANGZHANYOULV: '国内市场占有率（%）', //国内市场占有率（%）
    SUOSHUHANGYEWEIZHI: '所处行业位置', //所处行业位置
    KEGONGsvwBILI: '可供SVW比例', //可供SVW比例
    //主要客户
    KEHUMINGCHEN: '客户名称', //客户名称
    ZHUGONGCHANPIN: '主供产品', //主供产品
    HEZUONIANXIAN: '合作年限', //合作年限
    GONGHUONIANXIAN: '供货年限', //供货年限
    GONGHUOLIANG: '供货量', //供货量
    GONGHUOJINE: '供货金额', //供货金额
    ZHANZONGXIAOSHOUBILI: '占总销售比例（%）', //占总销售比例（%）
    ZHANGQI: '账期', //账期
    XIANJINGPIAOJUJINGLI: '现金票据比例', //现金票据比例

    //ws3
    // 主要分供方名称及产品
    SUPPLIER_ZHUYAOFENGONGFANGMINGCHENG: '主要分供方名称及产品', //主要分供方名称及产品
    SUPPLIER_ZHUYAOFENGONGFANGMINGCHENGJICHANPIN: '主要分供方名称及产品', //主要分供方名称及产品
    SUPPLIER_SHEHUITONGYIXINYONGDAIMA: '统一社会信用代码', //统一社会信用代码
    SUPPLIER_CHANPIN: '产品', //产品
    SUPPLIER_GUOJIA: '国家', //国家
    SUPPLIER_SHENGFEN: '省份', //省份
    SUPPLIER_CHENGSHI: '城市/区', //城市
    SUPPLIER_LIANXIRENMINGCHENG: '联系人姓名', //联系人姓名
    SUPPLIER_ZHIWU: '职务', //职务
    SUPPLIER_LIANXIDIANHUA: '联系电话', //联系电话
    SUPPLIER_SHOUJIHAOMA: '手机号码', //手机号码
    SUPPLIER_CHUANZHEN: '传真', //传真
    SUPPLIER_DIANZIYOUJIAN: '电子邮件', //电子邮件
    SUPPLIER_HEZUONIANXIAN: '合作年限', //合作年限
    SUPPLIER_CAIGOUNIANFNE: '采购年份', //采购年份
    SUPPLIER_CAIGOULIANG: '采购量', //采购量
    SUPPLIER_CAIGOUJINE: '采购金额', //采购金额
    SUPPLIER_ZHANCAIGOUZONGBILI: '占总采购额比例（%）', //占总采购额比例（%）
    SUPPLIER_ZHANGQI: '账期', //账期
    SUPPLIER_XIANJINPIAOJUBILI: '现金票据比例', //现金票据比例

    SUPPLIER_FUJIANJILUSHIJIAN: '附件记录-时间', //附件记录-时间
    SUPPLIER_FUJIANXIGUAN: '付款习惯', //付款习惯
    SUPPLIER_FUKUANFANGSHI: '付款方式', //付款方式
    SUPPLIER_SHANGPINFUWU: '商品/服务', //商品/服务
    SUPPLIER_BEIZHU: '备注', //备注

    SUPPLIER_GUONEICAIGOUNEIRONG: '国内采购内容', //国内采购内容
    SUPPLIER_CAIGOUXINXIBEIZHU: '采购信息备注', //采购信息备注

    // 历年合作记录
    SUPPLIER_LINIANHEZUOJILU: '历年合作记录', //历年合作记录
    SUPPLIER_HEZUOQISHINIANFEN: '合作起始年份', //合作起始年份
    SUPPLIER_GONGHUOCHANPIN: '供货产品', //供货产品

    SUPPLIER_T0: 'TO年份', //TO年份
    SUPPLIER_CSE: 'CSE', //CSE
    SUPPLIER_CSE2: 'CSE二次件TO', //CSE二次件TO
    SUPPLIER_CSI: 'CSI', //CSI
    SUPPLIER_CSI2: 'CSI二次件确认值', //CSI二次件确认值
    SUPPLIER_CSM: 'CSM', //CSM
    SUPPLIER_CSM2: 'CSM二次件确认值', //CSM二次件确认值
    SUPPLIER_CSP: 'CSP', //CSP
    SUPPLIER_CSP2: 'CSP二次件确认值', //CSP二次件确认值
    SUPPLIER_CSX: 'CSX', //CSX
    SUPPLIER_CSX2: 'CSX二次件确认值', //CSX二次件确认值
    SUPPLIER_CSS: 'CSS', //CSS
    SUPPLIER_CSS2: 'CSS二次件确认值', //CSS二次件确认值
    SUPPLIER_YICJIANT0: '一次件TO', //一次件TO
    SUPPLIER_PEIFUJIANTO: '配附件TO', //配附件TO
    SUPPLIER_ERCIJIANTO: '二次件TO', //二次件TO
    SUPPLIER_ZONGTO: '总TO', //总TO
    SUPPLIER_BUBTO: 'BU-B TO', //BU-B TO

    //重大事项
    SUPPLIER_ZHONGDASHIXIANGSIFAXINXI: '重大事项-司法信息', //重大事项-司法信息
    SUPPLIER_RQI: '日期', //日期
    SUPPLIER_XIAOXILAIYUAN: '消息来源', //消息来源
    SUPPLIER_FAYUAN: '法院', //法院
    SUPPLIER_JINE: '金额', //金额
    SUPPLIER_BIZHONG: '币种', //币种
    SUPPLIER_FALVJIUFENNEIRONG: '法律纠纷内容', //法律纠纷内容
    SUPPLIER_NEIRONG: '内容', //内容

    SUPPLIER_ZHONGDASHIXIANGXINGZHENCHUFA: '重大事项-行政处罚', //重大事项-行政处罚
    SUPPLIER_XINXILEIXING: '信息类型', //信息类型
    SUPPLIER_LAIYUAN: '来源', //来源
    SUPPLIER_XINGZHENCHUFANEIRONG: '行政处罚内容', //行政处罚内容

    //联系人与用户
    SUPPLIER_GONGYINGSHANGTONGXUNLU: '供应商通讯录', //供应商通讯录
    SUPPLIER_LIANXIRENLEIXING: '联系人类型', //联系人类型
    SUPPLIER_LIANXIRENXINGMING: '联系人姓名', //联系人姓名
    SUPPLIER_ZHIWEI: '职位', //职位
    SUPPLIER_BUMEN: '部门', //部门
    SUPPLIER_QUHAO: '区号', //区号
    SUPPLIER_WEIXINHAO: '微信号', //微信号
    SUPPLIER_SWLXRLXRXMLXRDHBT:
      '商务联系人,联系人姓名，联系电话,电子邮件必填！', //商务联系人,联系人姓名，联系电话必填！

    SUPPLIER_GONGYINGSHANGXINGMING: '供应商用户账号', //供应商用户账号
    SUPPLIER_YONGHUDENGLUMING: '用户登录名', //用户登录名
    SUPPLIER_SHIFOUHUODONG: '是否有效', //是否有效
    SUPPLIER_SHEWEIZHUYONGHU: '设为主用户', //设为主用户
    SUPPLIER_JIEDONG: '解冻',
    SUPPLIER_DONGJIE: '冻结',
    SUPPLIER_SHI: '是',
    SUPPLIER_FOU: '否',
    SUPPLIER_ISWEIZHUYONGHU: '是否为主用户', //是否为主用户

    //相关附件
    SUPPLIER_FUJIANSHANGCHUAN: '附件上传', //附件上传
    SUPPLIER_FUJIANMINGCHENG: '附件名称', //附件名称
    SUPPLIER_CAOZUO: '操作', //操作
    SUPPLIER_SHANGCHUANQUERENRQI: '上传/确认日期', //上传/确认日期
    SUPPLIER_BEIZHUSHUOMING: '备注说明', //备注说明
    SUPPLIER_YANGLIWENJIAN: '样例文件', //样例文件
    SUPPLIER_BUNENGTIGONGYUANYIN: '不能提供原因', //不能提供原因
    SUPPLIER_ZUIWANTIGONGSHIJIAN: '最晚提供时间', //最晚提供时间
    SUPPLIER_ZHENGJIANYOUXIAOQI: '证件有效期', //证件有效期
    SUPPLIER_QIANSHU: '签署', //签署
    SUPPLIER_EXAMPLEDSEC:
      '请下载查看样例文件和操作指南，并根据要求上传正确的附件', //请下载查看样例文件和操作指南，并根据要求上传正确的附件

    SUPPLIER_ZIYOUSHANGCHUAN: '自由上传', //自由上传
    SUPPLIER_WENJIANMINGCHENG: '文件名称', //文件名称
    SUPPLIER_DAXIAOMB: '大小', //大小（MB）
    SUPPLIER_SHANGCHUQNRQI: '上传日期', //上传日期
    SUPPLIER_SHANGCHUANREN: '上传人', //上传人

    //材料组
    SUPPLIER_KESHI: '科室', //科室
    SUPPLIER_ZTSJYTJBYCFTJ: '这条数据已提交,不要重复提交', //这条数据已提交,不要重复提交
    SUPPLIER_SPZ: '审批中', //审批中
    SUPPLIER_SPTG: '审批通过', //审批通过

    SUPPLIER_CAILIAOZUGONGYIBIANHAO: '材料组工艺编号', //材料组工艺编号
    SUPPLIER_CAILIAOZUGONGYINGZHONGWENMINGCHENG: '材料组工艺中文名称', //材料组工艺中文名称
    SUPPLIER_CAILIAOZUDEWENMINGCHENG: '材料组工艺德文名称', //材料组工艺德文名称
    SUPPLIER_LINIEJIBIE: 'Linie组别', //Linie组别
    SUPPLIER_SHIFOUSHUYUBDL: '是否属于MBDL', //是否属于MBDL
    SUPPLIER_SHOUKONGKAISHISHIJIAN: '受控起始时间', //受控起始时间
    SUPPLIER_SHOUKONGJIEZHISHIJIAN: '受控截止时间', //受控截止时间
    SUPPLIER_SHOUKONGYUANYIN: '受控原因', //受控原因

    SUPPLIER_SHENQINGBDL: '申请BDL', //申请BDL
    SUPPLIER_QUXIAOSHOUKONG: '取消受控', //取消受控
    SUPPLIER_QUXIAOCAILIAOZUGUANLIAN: '取消材料组关联', //取消材料组关联
    SUPPLIER_DAOCHUQUANBU: '导出全部', //导出全部
    // BDL审批
    SUPPLIER_FUJIANCAILIAOZUBUXUYAOXUANZE_LINIE_KESHIHE_LINIE:
      '附件材料组不需要选择科室和采购员',
    SUPPLIER_VW_LINIE_KESHI: 'LINIE科室',
    SUPPLIER_VW_LINIE_CAIGOUYUAN: 'LINIE采购员',
    SUPPLIER_CAILIAOZUBIANHAO: '材料组编号',
    SUPPLIER_CAILIAOZUMINGCHENG: '材料组名称',
    SUPPLIER_CAILIAOZUGONGYIBIAOHAO: '材料组工艺编号',
    SUPPLIER_CAILIAOZUGONGYIZHONGWENGMINGCHENG: '材料组工艺中文名称',
    SUPPLIER_CAILIAOZUGONGYIDEWENMINGCHENG: '材料组工艺德文名称',
    SUPPLIER_SHIFOUSHUYUmbDL: '是否属于MBDL',
    SUPPLIER_SHOUKONGZHUANGTAI: '受控状态',
    SUPPLIER_SHOUKONGQISHISHIJIAN: '受控起始时间',
    SUPPLIER_JIEZHISHIJIAN: '控截止时间',
    SUPPLIER_LINIERENYUAN: 'Linie人员',
    SUPPLIER_ZHISHAOXUANZHEYITIAOJILU: '至少选择一条记录',
    //系统修改历史
    SUPPLIER_BIANGENGZIDUAN: '变更字段', //变更字段
    SUPPLIER_BIANGENGNEIRONG: '变更内容', //变更内容

    SUPPLIER_YUANNEIRONG: '原内容', //原内容
    SUPPLIER_XINEIRONG: '新内容', //新内容
    SUPPLIER_XIUGAIREN: '修改人', //修改人
    SUPPLIER_XIUGAIRQI: '修改日期', //修改日期

    //财务大数
    SUPPLIER_NIANFEN: '年份', //年份
    SUPPLIER_YINGSHOUZHANGKUAN: '应收账款', //应收账款
    SUPPLIER_CUNHUO: '存货', //存货
    SUPPLIER_YFZK: '预付账款', //预付账款
    SUPPLIER_YFZKBZ: '或“预付款项+待摊费用”。', //或“预付款项+待摊费用”。
    SUPPLIER_QTYSK: '其他应收款', //其他应收款
    SUPPLIER_QTYSKBZ: '或“其他应收款+应收补贴款”。', //或“其他应收款+应收补贴款”
    SUPPLIER_LDZC: '流动资产', //旧准则需减去“预计负债”。
    SUPPLIER_LDZL: '流动负债', //流动负债
    SUPPLIER_FZHJ: '负债合计', //负债合计
    SUPPLIER_SFZB: '实收资本', //实收资本
    SUPPLIER_XGSJ: '修改时间', //修改时间
    SUPPLIER_SHOUZHEQUANYIHEJI: '所有者权益合计', //所有者权益合计
    SUPPLIER_ZICHANZONGJI: '资产总计', //资产总计
    SUPPLIER_YINGYESHOURU: '营业收入', //营业收入
    SUPPLIER_YINGYECHENGBEN: '营业成本', //营业成本
    SUPPLIER_LIRUIZONGE: '利润总额', //利润总额
    SUPPLIER_JINLIRUN: '净利润', //净利润
    SUPPLIER_FUZAILV: '负债率（%）', //负债率

    //财务数据
    SUPPLIER_SHUJUQUDAO: '数据渠道', //数据渠道
    SUPPLIER_KUAIJIZHOUQIQ: '会计周期起', //会计周期起
    SUPPLIER_KUAIJIZHOUQIZ: '会计周期止', //会计周期止
    SUPPLIER_SHIFOUSHENJI: '是否审计', //是否审计
    SUPPLIER_SHENJIDANWEI: '审计单位', //审计单位
    SUPPLIER_DANWEI: '单位', //单位
    SUPPLIER_SHIFOUHEBINGBAOBIAO: '是否为合并报表', //是否为合并报表
    SUPPLIER_SHANGCHUANSHIJIAN: '上传时间', //上传时间
    SUPPLIER_SHUJUDUIBI: '数据对比', //数据对比
    SUPPLIER_ZICHANFUZAIBIAO: '资产负载表', //资产负载表
    SUPPLIER_LIRUNBIAO: '利润表', //利润表
    SUPPLIER_XIANZAIJIULIANGBIAO: '现金流量表', //现金流量表
    SUPPLIER_QITACAIWUSHUJU: '其他财务数据', //其他财务数据
    SUPPLIER_ZHIDUAN: '字段', //字段

    //操作按钮
    SUPPLIER_ZANCUN: '暂存', //暂存
    SUPPLIER_TIJIAO: '提交', //提交
    SUPPLIER_TIJIAOZZSQ: '提交转正申请', //提交转正申请
    SUPPLIER_RONGZISHENQING: '融资申请', //融资申请
    SUPPLIER_GENGGAIXINXI: '更改信息', //更改信息
    SUPPLIER_SHANGYIBU: '上一步', //上一步
    SUPPLIER_XIAYIBU: '下一步', //下一步
    SUPPLIER_BENCITIANXIEJIANYANMA: '本次填写检验码', //本次填写检验码
    SUPPLIER_ZHUCEXINXITIANXIE: '注册信息填写', //注册信息填写
    SUPPLIER_XUANZERQI: '选择日期', //选择日期
    SUPPLIER_KAISHIRQI: '开始日期', //开始日期
    SUPPLIER_JIESHURQI: '结束日期', //结束日期
    SUPPLIER_ZHI: '至', //至

    SUPPLIER_CWYJ: '财务预警', //财务预警
    SUPPLIER_GLGS: '关联公司', //关联公司
    SUPPLIER_JTGX: '集团关系', //集团关系
    SUPPLIER_ZYPTKH: '主要配套客户', //主要配套客户
    SUPPLIER_ZYPTZJC: '主要配套主机厂', //主要配套主机厂
    SUPPLIER_SJKZRXM: '实际控制人姓名', //实际控制人姓名
    SPR_FRM_XGYSPJ_GDXINGXI: '更多信息', //更多信息
    SUPPLIER_YEWUFAZHANJIHUA: '业务发展计划', //业务发展计划
    SUPPLIER_XIAOSHOUXINXIBEIZHU: '销售信息备注', //销售信息备注
    SUPPLIER_GOYINGSHANG360: '供应商360', //供应商360
    SUPPLIER_GONGYINGSHANGJIXIAO: '供应商绩效', //供应商绩效
    SUPPLIER_JIBENXINXI: '基本信息', //基本信息
    SUPPLIER_LISHIYANGE: '历史沿革', //历史沿革
    SUPPLIER_FRMPINGJI: 'FRM评级', //FRM评级
    SUPPLIER_GONGCHANGXINXI: '工厂信息', //工厂信息
    SUPPLIER_SHOUXINYINHANGXINXIN: '授信银行信息', //授信银行信息
    SUPPLIER_GUDONGJITUANYUGUANLIANGONGSI: '股东、集团与关联公司', //股东、集团与关联公司
    SUPPLIER_RENYUANJIGONGSIZHILIQINGKUANG: '人员及公司治理情况', //人员及公司治理情况
    SUPPLIER_ZHUYAOYEWUJICHANPIN: '主要业务及产品', //主要业务及产品
    SUPPLIER_ZHUYAOKEHU: '主要客户', //主要客户
    SUPPLIER_ZHUYAOFANGGONGFANGMINGCHENGJICHANPIN: '主要分供方名称及产品', //主要分供方名称及产品
    SUPPLIER_LISHIHEZUOJILU: '历年合作记录', //历年合作记录
    SUPPLIER_ZHONGDASHIXIANG: '重大事项', //重大事项
    SUPPLIER_LIANXIRENYUYONGHU: '联系人与用户', //联系人与用户
    SUPPLIER_XIANGGUANFUJIAN: '相关附件', //相关附件
    SUPPLIER_CAILIAOZU: '材料组', //材料组
    SUPPLIER_XITONGXIUGAILISHI: '系统修改历史', //系统修改历史
    SUPPLIER_CAIWUDASHU: '财务大数', //财务大数
    SUPPLIER_CAIWUSHUJU: '财务数据', //财务数据
    SUPPLIER_GONGHUOGONGSI: '供货公司', //供货公司
    // 详情信息
    SUPPLIER_GONGYINGSHANGXINXI: '供应商信息', //供应商信息
    SUPPLIER_GONGYINGSHANGZHONGWENMING: '供应商中文名', //供应商中文名
    SUPPLIER_GONGYINGSHANGYINGWENMING: '供应商英文名', //供应商英文名
    SUPPLIER_SAPHAO: 'SAP号', //SAP号
    SUPPLIER_VWHAO: 'VW号', //VW号
    SUPPLIER_GONGYINGSHANGJIANCHENZH: '供应商简称（中）', //供应商简称（中）
    SUPPLIER_GONGYINGSHANGJIANCHENGEN: '供应商简称（英）', //供应商简称（英）
    SUPPLIER_LINGSHIHAO: '临时号', //临时号
    SUPPLIER_TONGYISHEHUIXINGYONGDAIMA: '统一社会信用代码', //统一社会信用代码
    SUPPLIER_SVWHAO: 'SVW号', //SVW号
    SUPPLIER_ZHUCEXINGXITIANXIE: '注册信息填写', //注册信息填写
    SUPPLIER_VWCODETIP:
      '申请VW号前，需拥有邓白氏编号，</br>并在德国大众供应商平台完成注册（vwgroupsupply.com）', //vw号
    //new
    SUPPLIER_PIZHUN: '批准', //批准
    SUPPLIER_GUANLIANGONGSIMINGCHENG: '关联公司名称', //关联公司名称
    SUPPLIER_GUANXIMIAOSHU: '关系描述', //关系描述
    SUPPLIER_QIYEXINGZHI: '企业性质', //企业性质
    SUPPLIER_SUOZAIGUOJIADIQU: '所在国家/地区', //所在国家/地区
    SUPPLIER_ZHUCEZIBENWAN: '注册资本', //注册资本（万）
    SUPPLIER_KONGGUBILI: '控股比例（%）', //控股比例（%）
    SUPPLIER_SHOUXINRQIQI: '授信日期起', //授信日期起
    SUPPLIER_WAIBUPINGJIA: '外部评价', //外部评价
    SUPPLIER_LISHIYANGEXIANGQING: '历史沿革详情', //历史沿革详情
    SUPPLIER_QIYEYANGEMIAOSHU: '企业沿革描述', //企业沿革描述
    SUPPLIER_GONGYINGSHANGJIANCHENZHTIPS:
      '中文简称规则：地区+名称+业务</br> 例：（上海友好塑料股份有限公司—上海友好塑料）', //中文简称规则：地区+名称+业务 例：（上海友好塑料股份有限公司—上海友好塑料）
    SUPPLIER_GONGYINGSHANGJIANCHENGENTIPS:
      '英文简称规则：地区的首字母缩写+名称+业务 </br>例：（Shanghai Friendly Plastic Co., Ltd.—Sh Friendly Plastic）', //英文简称规则：地区的首字母缩写+名称+业务 例：（Shanghai Friendly Plastic Co., Ltd.—SH Friendly Plastic）
    SUPPLIER_DUNSTIPS:
      '邓白氏号申请事宜请联系</br>上海华夏邓白氏商业信息咨询有限公司或其他地区邓白氏公司机构。具体信息可登录http://www.dnbchina.com/contact/index.html进行咨询', //邓白氏号申请事宜请联系上海华夏 邓白氏商业信息咨询有限公司或其 他地区邓白氏公司机构。 具体信息可登录 http://www.dnbchina.com/conta ct/index.html进行咨询
    SUPPLIER_ZHUYAOFENGONGFANGMING: '主要分供方名称', //主要分供方名称
    SUPPLIER_FUKUANQINGKUANG: '付款状况', //付款状况
    SUPPLIER_XUANZENIANFEN: '选择年份', //选择年份
    SUPPLIER_SHIFOUDINGDIAN: '是否定点', //是否定点
    SUPPLIER_SHIFOUSHENGXIAO: '是否生效', //是否生效
    SUPPLIER_WUXIAO: '无效', //无效
    SUPPLIER_YOUXIAO: '有效', //有效、
    SUPPLIER_PURCHASEREMAIL: '采购员邮箱', //采购员邮箱
    CAIGOUYUANXINXI: '采购员信息', //采购员信息
    SUPPLIER_PURCHASERNAME: '采购员姓名', //采购员姓名
    SUPPLIER_SUPPLIERTYPE: '供应商类型', //供应商类型
    SUPPLIER_ZHUANZHENGSUOXUFUJIAN: '转正所需附件', //转正所需附件
    SUPPLIER_SHIFOUTONGYIJIANG: '是否同意将', //是否同意将
    SUPPLIER_GONGSIZHUANEWIZHENGSHIGONGYINGSHANG: '公司转为正式供应商', //公司转为正式供应商
    SUPPLIER_QINGTONGYI: '请同意', //请同意
    SUPPLIER_GONGSITIJIAODEJIBENXINXIXIUGAISHENQING: '公司提交的信息修改申请', //公司提交的基本信息修改申请
    SUPPLIER_CHAKANGAIGONGYINGSHANGXINXI: '查看该供应商信息', //查看该供应商信息
    SUPPLIER_FUJIANSHANCHU: '附件删除', //附件删除
    SUPPLIER_GONGYINGSHANGLEIXINGTIPS:
      '您可以向大众集团采购部门提供的产品是否属于汽车 零部件？</br>若是：则选择生产采购；若否：则选择一般 采购。</br>生产采购：直接用于汽车生产的外购零部件和生产材 料、生产辅料的采购。</br>一般采购：除直接构成汽车的零部件及材料以外的物资以及服务的采购。</br>诸如：生产设备、测试设备和仪器、土建工程、公用动力和通用设备及其</br>安装工程、计算机软硬件、生产用辅料和刀具、办公用品、开发服务、物流</br>服务、市场营销服务、公共服务等的采购以上定义仅供参考，请和采购员确</br>认之后进行选择。', //供应商类型tips
    SUPPLIER_CAILIAOZU_GONGYIZUBIANHAO: '材料组/工艺组编号', //材料组/工艺组编号
    SUPPLIER_CAILIAOZU_ISXIANGGUNA: '是否与我相关', //是否与我相关
    SUPPLIER_CAILIAOZU_DUNSHAO: 'DUNS号', //DUNS号
    SUPPLIER_CAILIAOZU_XIANGGUANKESHI: '相关科室', //相关科室
    SUPPLIER_CAILIAOZU_JIARUHEIMINGDAN: '加入黑名单', //加入黑名单
    SUPPLIER_CAILIAOZU_FAQICHUPINGQINGDAN: '发起初评清单', //发起初评清单
    SUPPLIER_CAILIAOZU_YAOQINGZHUCE: '邀请注册', //邀请注册
    SUPPLIER_CAILIAOZU_YICHUHEIMINGDAN: '移除黑名单', //移除黑名单
    SUPPLIER_GAILAN: '概览', //概览
    SUPPLIER_FRMZONGHEGUANLI: 'FRM综合管理', //FRM综合管理
    SUPPLIER_XINGONGYINGSHANGPINGJI: '新供应商评级', //新供应商评级
    SUPPLIER_CHUBUPINGJI1: '初步评级', //初步评级
    SUPPLIER_SHENRUPINGJI: '深入评级', //深入评级
    SUPPLIER_FENGXIANXINHAO: '风险信号', //风险信号
    SUPPLIER_YUQINGJIANCE: '舆情监测', //舆情监测
    SUPPLIER_GONGYINGSHANGRONGZISHENQING: '供应商融资申请', //供应商融资申请
    SUPPLIER_VWHSQSJ: 'VW号申请时间', //VW号申请时间
    SUPPLIER_VWHZT: 'VW号状态', //VW号状态
    SUPPLIER_DDXXX: '定点信协议', //定点信协议
    SPR_FRM_FRMGL_GYSZYMCSC: '供应商中文名（CSC）', //供应商中文名（CSC）
    SPR_FRM_FRMGL_XGKS1: '相关科室', //相关科室
    SPR_FRM_FRMGL_CPSJ: '初评时间', //初评时间
    SPR_FRM_FRMGL_CPSJQZ: '初评时间起止', //初评时间起止
    SPR_FRM_FRMGL_WPSJ: '外评时间', //外评时间
    SPR_FRM_FRMGL_WPSJQZ: '外评时间起止', //外评时间起止
    SPR_FRM_FRMGL_WP1: '外评', //外评
    SPR_FRM_FRMGL_SPZT: '深评状态', //深评状态
    SPR_FRM_FRMGL_DXDFSJ: '定性打分时间', //定性打分时间
    SPR_FRM_FRMGL_DXDFSJQZ: '定性打分时间起止', //定性打分时间起止
    SPR_FRM_FRMGL_DXDFZT: '定性打分状态', //定性打分状态
    SPR_FRM_FRMGL_TZHPJ: '调整后评级', //调整后评级
    SPR_FRM_FRMGL_SPSJ: '深评时间', //深评时间
    SPR_FRM_FRMGL_SPSJQZ: '深评时间起止', //深评时间起止
    SPR_FRM_FRMGL_DLDF: '定量得分', //定量得分
    SPR_FRM_FRMGL_DXDF: '定性得分', //定性得分
    SPR_FRM_FRMGL_DCCB: '导出财报', //导出财报
    SPR_FRM_FRMGL_DCTJBB: '导出统计报表', //导出统计报表
    SPR_FRM_FRMGL_VWAGPJ: 'VWAG评级', //VWAG评级
    SPR_FRM_FRMGL_FQCPQD: '发起初评清单', //发起初评清单
    SPR_FRM_FRMGL_DQRCPQD: '待确认初评清单', //待确认初评清单
    SPR_FRM_FRMGL_CQCPMX: '查看初评模型', //查看初评模型
    // -------------------------------FRM深评翻译 舒杰 start---------------------------------------------
    SPR_FRM_DEP_WHHYJZ: '维护行业均值', //维护行业均值
    SPR_FRM_DEP_REMOVEGROUP: '移除集团', //移除集团
    SPR_FRM_DEP_ADDGROUP: '加入集团', //加入集团
    SPR_FRM_DEP_NEWGROUP: '新建集团', //新建集团
    SPR_FRM_DEP_SUBDERFR: '提交深评报告审核', //提交深评报告审核
    SPR_FRM_DEP_SUBLFA: '提交清单审批', //提交清单审批
    SPR_FRM_DEP_REPORTDISN: '报告分发', //报告分发
    SPR_FRM_DEP_END: '终止', //终止
    SPR_FRM_DEP_EXPORT: '导出', //导出
    SPR_FRM_DEP_SUPNAME: '供应商名称', //供应商名称
    SPR_FRM_DEP_GROUPPACK: '集团名称', //集团名称
    SPR_FRM_DEP_STATE: '状态', //状态
    SPR_FRM_DEP_SPEEDPROGRESS: '进度', //进度
    SPR_FRM_DEP_ENCLOSUER: '附件', //附件
    SPR_FRM_DEP_INTERVIEWCON: '访谈内容', //访谈内容
    SPR_FRM_DEP_DEPREPORT: '深评报告', //深评报告
    SPR_FRM_DEP_FRMJP: 'FRM简评', //FRM简评
    SPR_FRM_DEP_FINANA: '财报分析', //财报分析
    SPR_FRM_DEP_DEPRESULT: '深评结果', //深评结果
    SPR_FRM_DEP_DEPTIME: '深评时间', //深评时间
    SPR_FRM_DEP_PREASRESULT: '初评结果', //初评结果
    SPR_FRM_DEP_OUTRATING: '外评', //外评
    SPR_FRM_DEP_TRACKFRE: '跟踪频率', //跟踪频率
    // 注意更改
    SPR_FRM_DEP_NEXTRATIME: '下次评级时间', //下次评级时间
    SPR_FRM_DEP_REKADEP: '相关科室', //相关科室
    SPR_FRM_DEP_REMARKS: '备注', //备注
    SPR_FRM_DEP_DISOBJ: '已分发对象', //已分发对象
    SPR_FRM_DEP_RATSTARTIME: '评级开始月份', //评级开始月份
    SPR_FRM_DEP_RATENDTIME: '评级结束月份', //评级结束月份
    SPR_FRM_DEP_ESTIMATE: '预计完成月份', //预计完成月份
    SPR_FRM_DEP_PICOIDA: '深入分析负责人', //深入分析负责人
    SPR_FRM_DEP_DEPREASON: '深评原因', //深评原因
    SPR_FRM_DEP_INPUTGROUPNAME: '请输入集团名称', //请输入集团名称
    SPR_FRM_DEP_INPUTVALICODE: '请输入校验码', //请输入校验码
    SPR_FRM_DEP_GROUPNOTNAME: '集团名不能为空', //集团名不能为空
    SPR_FRM_DEP_SUBMITQDSP: '提交清单审批', //提交清单审批
    SPR_FRM_DEP_SPSPQD: '深评审批清单', //深评审批清单
    SPR_FRM_DEP_JBQK: '基本情况', //基本情况
    SPR_FRM_DEP_YWSXY: '业务&上下游', //业务&上下游
    SPR_FRM_DEP_FINANCE: '财务', //财务
    SPR_FRM_DEP_OTHER: '其他', //其他
    SPR_FRM_DEP_CKCWFXJG: '查看财报分析结果', //查看财报分析结果
    SPR_FRM_DEP_SCHYJY: '生成会议纪要', //生成会议纪要
    SPR_FRM_DEP_XJHY: '新建行业', //新建行业
    SPR_FRM_DEP_TJSH: '提交审核', //提交审核
    SPR_FRM_DEP_ZS: '综述', //综述
    SPR_FRM_DEP_QYGK: '企业概况', //企业概况
    SPR_FRM_DEP_CWFX: '财务分析', //财务分析
    SPR_FRM_DEP_IMPORT: '导入', //财务分析
    SPR_FRM_DEP_YJWCSJ: '预计完成时间', //预计完成时间
    SPR_FRM_DEP_QXZYJWCSJ: '请选择预计完成时间', //请选择预计完成时间
    SPR_FRM_DEP_QXZFFDX: '请选择分发对象', //请选择分发对象
    SPR_FRM_DEP_XXYY: '详细原因', //详细原因
    SPR_FRM_DEP_ISDEPTH: '是否深评', //是否深评
    SPR_FRM_DEP_BPJYY: '不评级原因', //不评级原因
    SPR_FRM_DEP_CXWHDX: '维护呈现对象', //维护呈现对象
    SPR_FRM_DEP_DQHY: '当前行业', //当前行业
    SPR_FRM_DEP_HYMC: '行业名称', //行业名称
    SPR_FRM_DEP_HYJZ: '行业均值', //行业均值
    SPR_FRM_DEP_SVWGYSJZ: 'SVW供应商均值', //SVW供应商均值
    SPR_FRM_DEP_FTQD: '访谈清单', //访谈清单
    SPR_FRM_DEP_JRHYJZ: '加入行业均值', //加入行业均值
    SPR_FRM_DEP_CGJE: '持股金额', //持股金额
    SPR_FRM_DEP_YWHCP: '业务或产品', //业务或产品
    SPR_FRM_DEP_ZB: '占比', //占比
    SPR_FRM_DEP_ZYGYS: '主要供应商', //主要供应商
    SPR_FRM_DEP_ZXNDGHZB: '最新年度供货占比', //最新年度供货占比
    SPR_FRM_DEP_ZXNDGHJE: '最新年度供货金额', //最新年度供货金额
    SPR_FRM_DEP_ZXNDXSZB: '最新年度销售占比', //最新年度销售占比
    SPR_FRM_DEP_ZXNDXSJE: '最新年度销售金额', //最新年度销售金额
    SPR_FRM_DEP_DBDYZY: '担保/抵押/质押', //担保/抵押/质押
    SPR_FRM_DEP_SXQZRQ: '授信起止日期', //授信起止日期
    SPR_FRM_DEP_HYJY: '会议纪要', //会议纪要
    SPR_FRM_DEP_QSRGYSTGXX: '请输入供应商提供信息...', //请输入供应商提供信息...
    SPR_FRM_DEP_JTGDSJKZR: '集团、股东、实际控制人（详见股权结构图）', //集团、股东、实际控制人（详见股权结构图）
    SPR_FRM_DEP_GLGSQK: '关联公司情况（详见股权结构图）', //关联公司情况（详见股权结构图）
    SPR_FRM_DEP_GLGSJS: '关联公司介绍', //关联公司介绍
    SPR_FRM_DEP_INPUT: '请输入…', //请输入…
    SPR_FRM_DEP_YSY: '已使用', //已使用
    SPR_FRM_DEP_GLGSYWWLQK: '关联公司业务往来情况', //关联公司业务往来情况
    SPR_FRM_DEP_ZZJGRYQK: '组织机构、人员情况', //组织机构、人员情况
    SPR_FRM_DEP_GLTDQTRYQK: '管理团队其他人员情况', //管理团队其他人员情况
    SPR_FRM_DEP_JBQKBC: '基本情况 - 补充', //基本情况 - 补充
    SPR_FRM_DEP_ZYCPJZBCPGY: '主要产品及占比、产品工艺', //主要产品及占比、产品工艺
    SPR_FRM_DEP_ZYYWMSHJGSD: '主要业务模式和加工深度', //主要业务模式和加工深度
    SPR_FRM_DEP_SBTZYCLJCKYW: '设备投资、原材料、进出口业务', //设备投资、原材料、进出口业务
    SPR_FRM_DEP_HZSJ: '合作时间', //合作时间
    SPR_FRM_DEP_GQXZJWLDXMQK: '过去，现在及未来的项目情况', //过去，现在及未来的项目情况
    SPR_FRM_DEP_SVWYWQK: 'SVW业务情况', //SVW业务情况
    SPR_FRM_DEP_YWFZJTZ: '业务发展及投资', //业务发展及投资
    SPR_FRM_DEP_YYNL: '营运能力', //营运能力
    SPR_FRM_DEP_CNQK: '产能情况', //产能情况
    SPR_FRM_DEP_YWSXYBC: '业务&上下游-补充', //业务&上下游-补充
    SPR_FRM_DEP_YLNL: '盈利能力', //盈利能力
    SPR_FRM_DEP_CZNL: '偿债能力', //偿债能力
    SPR_FRM_DEP_ZJYRZQD: '资金与融资渠道', //资金与融资渠道
    SPR_FRM_DEP_CWBC: '财务 - 补充', //财务 - 补充
    SPR_FRM_DEP_YLNLPLACE:
      '销售毛利率、销售净利率、管理费用率、销售费用率、财务费用率、研发费用核算…', //销售毛利率、销售净利率、管理费用率、销售费用率、财务费用率、研发费用核算…
    SPR_FRM_DEP_YYNLPLACE: '存货周转率、固定资产周转率…', //存货周转率、固定资产周转率…
    SPR_FRM_DEP_CZNLPLACE: '资不抵债、增资/减资…', //资不抵债、增资/减资…
    SPR_FRM_DEP_HYJYPLACE:
      '集团支持（关联数据：其他应付款）、资金池、长期/短期、融资租赁（设备、金额、期限、利率、保证金）、票据贴现、每月营运资金…', //'集团支持（关联数据：其他应付款）、资金池、长期/短期、融资租赁（设备、金额、期限、利率、保证金）、票据贴现、每月营运资金…'
    SPR_FRM_DEP_CWBCPLACE:
      '资产减值损失、营业外收入/支出、政府补助、税收优惠、多套报表、其他异常变动…', //资产减值损失、营业外收入/支出、政府补助、税收优惠、多套报表、其他异常变动…
    SPR_FRM_DEP_CLBJJBQKLSYG: '成立背景、基本情况、历史沿革', //成立背景、基本情况、历史沿革
    SPR_FRM_DEP_TFSJDYX: '突发事件的影响（如：疫情、事故、自然灾害等）', //突发事件的影响（如：疫情、事故、自然灾害等）
    SPR_FRM_DEP_SSQK: '涉诉情况', //涉诉情况
    SPR_FRM_DEP_QTBC: '其他 - 补充', //其他 - 补充
    SPR_FRM_DEP_TFSJDYXPLACE:
      '生产情况及较上年的变化、人员及工资支付、对财务的影响、对短期资金的影响、政府补助、融资…', //生产情况及较上年的变化、人员及工资支付、对财务的影响、对短期资金的影响、政府补助、融资…
    SPR_FRM_DEP_SSQKPLACE:
      '原告/被告、案由、金额、对生产经营、财务、短期资金的影响…', //原告/被告、案由、金额、对生产经营、财务、短期资金的影响…
    SPR_FRM_DEP_QTBCPLACE: '其他 - 补充', //其他 - 补充
    SPR_FRM_DEP_CXRY: '出席人员', //出席人员
    SPR_FRM_DEP_HYRQ: '会议日期', //会议日期
    SPR_FRM_DEP_CC: '抄送', //抄送
    SPR_FRM_DEP_ZXR: '撰写人', //撰写人
    SPR_FRM_DEP_BM: '部门', //部门
    SPR_FRM_DEP_ZT: '主题', //主题
    // 这里的冲突
    SPR_FRM_DEP_SCBXZ: '生成并下载', //生成并下载
    SPR_FRM_DEP_CXRYPLACE: '例：xxx,xxx,xxx…', //例：xxx,xxx,xxx…
    SPR_FRM_DEP_ZRS: '总人数', //总人数
    SPR_FRM_DEP_GLRY: '管理人员', //管理人员
    SPR_FRM_DEP_SCRY: '生产人员', //生产人员
    SPR_FRM_DEP_CSRQ: '出生日期', //出生日期
    SPR_FRM_DEP_CYNX: '从业年限', //从业年限
    SPR_FRM_DEP_SJKZR: '实际控制人', //实际控制人
    SPR_FRM_DEP_ZJL: '总经理', //总经理
    SPR_FRM_DEP_SFRM: 'SFRM综合评价', // SFRM综合评价
    SPR_FRM_DEP_SFRMPLACE: '财务状况、趋势。综合信用风险。', // 财务状况、趋势。综合信用风险。
    SPR_FRM_DEP_FOLLOW: '后续跟踪建议', // 后续跟踪建议
    SPR_FRM_DEP_NEXT: '再次跟踪频率', // 再次跟踪频率
    SPR_FRM_DEP_COMMENT: '1-36个月/无需后续跟踪', // 1-36个月/无需后续跟踪
    SPR_FRM_DEP_NOFOLLOW: '无需后续跟踪', // 无需后续跟踪
    SPR_FRM_DEP_MONTH: '月', // 月
    SPR_FRM_DEP_EXTINFO: '补充建议', // 补充建议
    SPR_FRM_DEP_BACKGROUND: '背景', // 背景
    SPR_FRM_DEP_GROUP: '集团及关联公司', // 集团及关联公司
    SPR_FRM_DEP_CHANGE: '重要变更', // 重要变更
    SPR_FRM_DEP_FINANCIAL: '融资信息', // 融资信息
    SPR_FRM_DEP_BUSSINESS: '业务情况', // 业务情况
    SPR_FRM_DEP_MOVE: '搬迁情况', // 搬迁情况
    SPR_FRM_DEP_SENSITIVE: '敏感信息', // 敏感信息
    SPR_FRM_DEP_PROFILE: '公司简介', // 公司简介
    SPR_FRM_DEP_OTHEREXTINFO: '其他补充信息', // 其他补充信息
    SPR_FRM_DEP_BIZANDCUS: '主营业务及客户情况', // 主营业务及客户情况
    SPR_FRM_DEP_TO: 'TO情况', // TO情况
    SPR_FRM_DEP_NOTIFYINFO: '提示信息', // 提示信息
    SPR_FRM_DEP_CREATEDATE: '成立时间', // 成立时间
    SPR_FRM_DEP_HC: '员工人数', // 员工人数
    SPR_FRM_DEP_METRIC: '指标（大类）', // 指标（大类）
    SPR_FRM_DEP_SIMPLECOM: '简评', // 简评
    SPR_FRM_DEP_OBJPLACE: '请选择呈现对象', // 请选择呈现对象
    SPR_FRM_DEP_AVGPLACE: '请选择行业均值', // 请选择行业均值
    SPR_FRM_DEP_PAYTURNOVER: '应付账款周转率', // 应付账款周转率
    SPR_FRM_DEP_AVGERROR: '请选择行业类型', // 请选择行业类型
    SPR_FRM_DEP_BIZREMARK: '来源于公开信息，供应商提供信息和供应商访谈。', // 来源于公开信息，供应商提供信息和供应商访谈。
    SPR_FRM_DEP_FANREMARK:
      '财务分析基于供应商提供/资信报告财务数据和供应商访谈。', // 财务分析基于供应商提供/资信报告财务数据和供应商访谈。
    SPR_FRM_DEP_COMREMARK:
      '本报告仅供上汽大众内部商务决策参考之用。请对所述供应商所有信息严格保密，不得向任何其他第三方透露本报告的任何内容，请在公司内部谨慎合理使用所述信息。本报告不得作为法律诉讼的依据，上汽大众不承担任何责任。', // 本报告仅供上汽大众内部商务决策参考之用。请对所述供应商所有信息严格保密，不得向任何其他第三方透露本报告的任何内容，请在公司内部谨慎合理使用所述信息。本报告不得作为法律诉讼的依据，上汽大众不承担任何责任。
    SPR_FRM_DEP_CHECK: '必填项不存在', // 必填项不存在
    SPR_FRM_DEP_BUPINGJIYUANYIN: '请填写不评级原因',
    SPR_FRM_DEP_SELECTGROUP: '选择集团', // 选择集团
    SPR_FRM_DEP_ALLOK: '全部选取', // 全部选取
    SPR_FRM_DEP_ALLCANCEL: '全部移除', // 全部移除
    SPR_FRM_DEP_CHECKDCSTATUS: '请确认需要分发的深评报告状态',
    SPR_FRM_DEP_CHECKSPSTATUS:
      '请确认发起深评清单的供应商状态为“草稿”或“清单审批驳回”',
    SPR_FRM_DEP_COMMET: '只能选择未加入集团的供应商数据',
    SPR_FRM_DEP_STOPMSG:
      '只能终止状态为信息收集、财务经营与分析、访谈与调查、报告完成、报告驳回、报告审批驳回、报告审批中、清单审批中的供应商数据',
    SPR_FRM_DEP_JTGDSJKZ:
      '集团、股东、实际控制人对公司的支持：资金、技术、管理等…',
    SPR_FRM_DEP_INPUTERROR: '行业名称不能为空',
    SPR_FRM_DEP_HYMCYCZ: '行业名称已存在，请重新输入',
    SPR_FRM_FRMGL_INVALID: '状态为有效，不能操作', //初步评级有效提示信息
    SPR_FRM_FRMGL_VALID: '状态为无效，不能操作', //初步评级无效提示信息
    SPR_FRM_FRMGL_XZFTQDMB: '下载模板', //下载模板
    SPR_FRM_FRMGL_BGFFMESSAGE: '同一批次报告分发需保持深评结果和相关科室一致', //同一批次报告分发需保持深评结果和相关科室一致
    // -------------------------------FRM深评翻译 舒杰 end---------------------------------------------
    SPR_FRM_XGYSPJ_ZCZBY: '请输入注册资本（元）', //请输入注册资本（元）
    SPR_FRM_XGYSPJ_CGKS: '采购科室', //采购科室
    SPR_FRM_XGYSPJ_XGYSPG: '新供应商评估', //新供应商评估
    SPR_FRM_XGYSPJ_GYSRZGL: '供应商融资管理', //供应商融资管理
    SPR_FRM_XGYSPJ_J: '家', //家
    SUPPLIER_CNYJ: '产能预警', //产能预警
    SPR_FRM_XGYSPJ_SHWC: '审核完成', //审核完成
    SPR_FRM_XGYSPJ_JSQZ: '家申请中', //家申请中
    SPR_FRM_XGYSPJ_SQZ: '申请中', //申请中
    SPR_FRM_XGYSPJ_JSHWC: '家审核完成', //家审核完成
    SPR_FRM_XGYSPJ_FXXH: '风险信号', //风险信号
    SPR_FRM_XGYSPJ_GYSXJDDQK: '供应商询价定点情况', //供应商询价定点情况
    SPR_FRM_XGYSPJ_YQQK: '舆情监测', //舆情监测
    SPR_FRM_XGYSPJ_PJJG: '评级结果', //评级结果
    SPR_FRM_XGYSPJ_GYSYWMC: '供应商英文名称', //供应商英文名称
    SPR_FRM_XGYSPJ_SQSJ: '申请时间', //申请时间
    SPR_FRM_XGYSPJ_CGY: '采购员', //采购员
    SPR_FRM_XGYSPJ_PJSJ: '评级时间', //评级时间
    SPR_FRM_XGYSPJ_PJFZR: '评级负责人', //评级负责人
    SPR_FRM_XGYSPJ_BTGYY: '不通过原因', //不通过原因
    SPR_FRM_XGYSPJ_SJLY: '数据来源', //数据来源
    SPR_FRM_XGYSPJ_CKGYSXX: '查看供应商信息', //查看供应商信息
    SPR_FRM_XGYSPJ_GYSJYJRDCLZ: '供应商将要加入的材料组', //供应商将要加入的材料组
    SPR_FRM_XGYSPJ_SFTY: '是否同意', //是否同意
    SPR_FRM_XGYSPJ_GSDZRSQ: '公司的准入申请', //公司的准入申请
    SPR_FRM_XGYSPJ_RWRQ: '任务日期', //任务日期
    SPR_FRM_XGYSPJ_GYSCWPJJG: '供应商财务评级结果', //供应商财务评级结果
    SPR_FRM_XGYSPJ_WFPJ: '无法评级', //无法评级
    SPR_FRM_XGYSPJ_TJJS: '提交计算', //提交计算
    SPR_FRM_XGYSPJ_TJSP: '提交审批', //提交审批
    SPR_FRM_XGYSPJ_TJQQCG: '退回前期采购', //退回前期采购
    SPR_FRM_XGYSPJ_DQWBPJ: '调取外部评级', //调取外部评级
    SPR_FRM_XGYSPJ_GYSZRPGMO_JBXX: '供应商准入评估模型-基本信息', //供应商准入评估模型-基本信息
    SPR_FRM_XGYSPJ_SSLB: '数据类别', //数据类别
    SPR_FRM_XGYSPJ_SJZ: '数据值', //数据值
    SPR_FRM_XGYSPJ_JSZ: '计算值', //计算值
    SPR_FRM_XGYSPJ_SM: '说明', //说明
    SPR_FRM_XGYSPJ_QXZSJLY: '请选择数据来源', //请选择数据来源
    SPR_FRM_XGYSPJ_DCCB: '导出财报', //导出财报
    SPR_FRM_XGYSPJ_GDXX: '股东信息', //股东信息
    SPR_FRM_XGYSPJ_GDMC: '股东名称', //股东名称
    SPR_FRM_XGYSPJ_GJDQ: '国家/地区', //国家/地区
    SPR_FRM_XGYSPJ_CZE: '出资额', //出资额
    SPR_FRM_XGYSPJ_QXZYTSJTJ: '请选择一条数据', //请选择一条数据
    SPR_FRM_XGYSPJ_BZ: '币种', //币种
    SPR_FRM_XGYSPJ_ZYYW: '主营业务', //主要业务
    SPR_FRM_XGYSPJ_ZYYWHYGS: '主要业务行业归属', //主要业务行业归属
    SPR_FRM_XGYSPJ_GDDGSDZCQK: '股东对公司的支持情况', //股东对公司的支持情况
    SPR_FRM_XGYSPJ_GDZZZJHM: '股东证照/证件号码', //股东证照/证件号码
    SPR_FRM_XGYSPJ_DGLX: '股东类型', //股东类型
    SPR_FRM_XGYSPJ_CGBL: '持股比例（%）', //持股比例（%）
    SPR_FRM_XGYSPJ_GYSZRPGMO_CWXX: '供应商准入评估模型-财务状况', //供应商准入评估模型-财务状况
    SPR_FRM_XGYSPJ_TBQ: '填补前（元）', //填补前（元）
    SPR_FRM_XGYSPJ_GYSZRPGMX_DFZB: '供应商准入评估模型-得分指标', //供应商准入评估模型-得分指标
    SPR_FRM_XGYSPJ_ZB: '指标', //指标
    SPR_FRM_XGYSPJ_DF: '得分', //得分
    SPR_FRM_XGYSPJ_QZ: '权重', //权重
    SPR_FRM_XGYSPJ_DFQZ: '得分*权重', //得分*权重
    SPR_FRM_XGYSPJ_FXGZTS: '风险关注点提示', //风险关注点提示
    SPR_FRM_XGYSPJ_GYSZRPGMX_FXYJ: '供应商准入评估模型-风险预警', //供应商准入评估模型-风险预警
    SPR_FRM_XGYSPJ_GYSZRPGMX_BZ: '供应商准入评估模型-备注', //供应商准入评估模型-备注
    SPR_FRM_XGYSPJ_YJZB: '预警指标', //预警指标
    SPR_FRM_XGYSPJ_ZBGS: '指标公式', //指标公式
    SPR_FRM_XGYSPJ_JG: '结果', //结果
    SPR_FRM_XGYSPJ_YJFW: '预警范围', //预警范围
    SPR_FRM_XGYSPJ_SFYJ: '是否预警', //是否预警
    SPR_FRM_XGYSPJ_YJTS: '预警提示', //预警提示
    SPR_FRM_XGYSPJ_YJWZSM: '预警：文字说明', //预警：文字说明
    SPR_FRM_XGYSPJ_TZQFS: '调整前分数', //调整前分数
    SPR_FRM_XGYSPJ_TZQJB: '调整前级别', //调整前级别
    SPR_FRM_XGYSPJ_TSJJF: '特殊加减分', //特殊加减分
    SPR_FRM_XGYSPJ_TZHJB: '调整后级别', //调整后级别
    SPR_FRM_XGYSPJ_CWSJBZ: '财务数据备注：', //财务数据备注：
    SPR_FRM_XGYSPJ_QSRDWRMBDZCZBJES: '请输入单位为人民币的注册资本金数额', //请输入单位为人民币的注册资本金数额
    SPR_FRM_XGYSPJ_TZHFS: '调整后分数', //调整后分数
    SPR_FRM_XGYSPJ_SFTGPG: '是否通过评估', //是否通过评估
    SPR_FRM_XGYSPJ_SHHZQCYXGS: '上海汇众汽车有限公司', //上海汇众汽车有限公司
    SPR_FRM_XGYSPJ_GCDT: '工厂地图', //工厂地图
    SPR_FRM_XGYSPJ_GYSCWPJJGBZ: '供应商财务评级结果-备注', //供应商财务评级结果-备注
    SPR_FRM_XGYSPJ_GYSZRPGMXBZ: '供应商准入评估模型 - 备注', //供应商准入评估模型 - 备注
    SPR_FRM_XGYSPJ_QZGYSZRPGMXBZZTXWFPJYY:
      '请在供应商准入评估模型-备注中填写无法评级原因', //请在供应商准入评估模型-备注中填写无法评级原因
    SPR_FRM_XGYSPJ_SMSHBJXJFCL: '什么时候不进行减分处理：', //什么时候不进行减分处理：
    SPR_FRM_XGYSPJ_BJXJFCLDQK: '不进⾏减分处理的情况:', //不进⾏减分处理的情况:
    SPR_FRM_XGYSPJ_FXXHJFYZ: '风险信号减分原则：', //风险信号减分原则：
    SPR_FRM_XGYSPJ_SMSHCHJFCL: '什么时候Close或不进行减分处理：', //什么时候Close或不进行减分处理：
    SPR_FRM_XGYSPJ_BGZRZHSGFSDNCNBKFZLWT:
      '罢工/自然灾害/事故：发生当年-10，次年不扣分；<br/>质量问题：一般-5；严重-10；<br/>召回：可能发生/小规模-5；大规模（全球或多地区）-10；<br/>多套报表、其他人反馈有财务问题/资金紧张：-5；<br/>行政处罚（包括环保处罚）：一般-5，重大-10；发生当年扣分，次年不扣分；<br/>因资金、不能持续经营等问题供货延迟或停供：-10；原因尚未确定的供货延迟或停供（主要指配件）：-5；<br/>内部管理不善（送样延迟、送样质量不好、拖欠工资等）：-5；<br/>失信被执行人：-10；未移除扣分，移除后首次扣分，移除后非首次不扣分；<br/>经营异常：视严重程度-5/-3/-2；疏忽遗忘申报年报-3；原因未知-5；未移除扣分，移除后首次扣分，移除后非首次不扣分', //-罢工/自然灾害/事故：发生当年-10，次年不扣分；<br/>质量问题：一般-5；严重-10；<br/>召回：可能发生/小规模-5；大规模（全球或多地区）-10；<br/>多套报表、其他人反馈有财务问题/资金紧张：-5；<br/>行政处罚（包括环保处罚）：一般-5，重大-10；发生当年扣分，次年不扣分；<br/>因资金、不能持续经营等问题供货延迟或停供：-10；原因尚未确定的供货延迟或停供（主要指配件）：-5；<br/>内部管理不善（送样延迟、送样质量不好、拖欠工资等）：-5；<br/>失信被执行人：-10；未移除扣分，移除后首次扣分，移除后非首次不扣分；<br/>经营异常：视严重程度-5/-3/-2；疏忽遗忘申报年报-3；原因未知-5；未移除扣分，移除后首次扣分，移除后非首次不扣分
    SPR_FRM_XGYSPJ_FCPGYSTCSVWYQHWJRSVW:
      '非初评供应商：退出SVW/已切换/未进入SVW；非定点2级、3级供应商等；集团但非SVW供应商；<br/>原风险信号已解决，无后续影响；<br/>核实后，不影响经营、财务，如修改采购条款、与CSC名称不符；<br/>核实后，风险信号情况与事实不符或夸大；<br/>财务问题会直接反映在报表（资产负债表、利润表）中，与初评模型中指标类似的信号（如连年亏损），不额外扣分', //非初评供应商：退出SVW/已切换/未进入SVW；非定点2级、3级供应商等；集团但非SVW供应商；<br/>原风险信号已解决，无后续影响；<br/>核实后，不影响经营、财务，如修改采购条款、与CSC名称不符；<br/>核实后，风险信号情况与事实不符或夸大；<br/>财务问题会直接反映在报表（资产负债表、利润表）中，与初评模型中指标类似的信号（如连年亏损），不额外扣分
    SPR_FRM_XGYSPJ_BGZRZHSG:
      '罢工/自然灾害/事故：发生当年-10，次年不扣分；<br/> 质量问题：一般-5；严重-10；<br/> 召回：可能发生/小规模-5；大规模（全球或多地区）-10；<br/> 多套报表、其他人反馈有财务问题/资金紧张：-5；<br/> 行政处罚（包括环保处罚）：一般-5，重大-10；<br/> 因资金、不能持续经营等问题供货延迟或停供：-10；<br/> 原因尚未确定的供货延迟或停供：-5；<br/> 内部管理不善（送样延迟、送样质量不好、拖欠工资等）：-5；', //罢工/自然灾害/事故：发生当年-10，次年不扣分； 质量问题：一般-5；严重-10； 召回：可能发生/小规模-5；大规模（全球或多地区）-10； 多套报表、其他人反馈有财务问题/资金紧张：-5； 行政处罚（包括环保处罚）：一般-5，重大-10； 因资金、不能持续经营等问题供货延迟或停供：-10； 原因尚未确定的供货延迟或停供：-5； 内部管理不善（送样延迟、送样质量不好、拖欠工资等）：-5；
    SPR_FRM_XGYSPJ_YFXXHYJJ:
      '原风险信号已解决，无后续影响；<br/> 不影响经营、财务，如动产抵押；<br/> 核实后，风险信号情况与事实不符或夸大，如多套报表存在特殊原因；<br/> 财务问题会直接反映在报表（资产负债表、利润表）中，与初评模型中 指标类似的信号（如连年亏损），不额外扣分；', //原风险信号已解决，无后续影响； 不影响经营、财务，如动产抵押； 核实后，风险信号情况与事实不符或夸大，如多套报表存在特殊原因； 财务问题会直接反映在报表（资产负债表、利润表）中，与初评模型中 指标类似的信号（如连年亏损），不额外扣分；
    SPR_FRM_FRMGL_FQCBPJ: '发起初步评级', //发起初步评级
    SPR_FRM_FRMGL_XGG: '相关股', //相关股
    SPR_FRM_FRMGL_SNTO: '上年TO', //上年TO
    SPR_FRM_FRMGL_SYMX: '适用模型', //适用模型
    SPR_FRM_FRMGL_SDTJ: '手动添加', //手动添加
    SPR_FRM_FRMGL_ZDTJ: '自动添加', //自动添加
    SPR_FRM_FRMGL_DRGYS: '导入供应商', //导入供应商
    SPR_FRM_FRMGL_TJZCP: '添加至初评', //添加至初评
    SPR_FRM_FRMGL_SDTJCBPJ: '手动添加初步评级', //手动添加初步评级
    SPR_FRM_FRMGL_CPJG: '初评结果', //初评结果
    SPR_FRM_FRMGL_SPJG: '深评结果', //深评结果
    SPR_FRM_FRMGL_ZDTJ_TIP1: '请设置查看“待确认初评清单”时间', //请设置查看“待确认初评清单”时间
    SPR_FRM_FRMGL_ZDTJ_TIP2: '提示：请于选定日期后前往“待确认初评清单”查看', //提示：请于选定日期后前往“待确认初评清单”查看
    SPR_FRM_FRMGL_CKMX: '查看模型', //查看模型
    SPR_FRM_FRMGL_MXlX: '模型类型', //模型类型
    SPR_FRM_FRMGL_MXMC: '模型名称', //模型名称
    SPR_FRM_FRMGL_XZSPYY: '选择深评原因', //选择深评原因
    SPR_FRM_FRMGL_QSRXXYY: '请输入详细原因…', //请输入详细原因…
    SPR_FRM_FRMGL_QXZPJJG: '请选择评级结果…', //请选择评级结果…
    SPR_FRM_FRMGL_DXDAF: '定性打分', //定性打分
    SPR_FRM_FRMGL_VWAGSJ: 'VWAG时间', //VWAG时间
    SPR_FRM_FRMGL_FCSJQ: '发出时间起止', //发出时间起止
    SPR_FRM_FRMGL_SFXSLSDF: '是否显示历史打分', //是否显示历史打分
    SPR_FRM_FRMGL_DCGYSMB: '导出供应商模板', //导出供应商模板
    SPR_FRM_CBPJ_BB: '版本', //版本
    SPR_FRM_CBPJ_PFFCSJ: '评分发出时间', //评分发出时间
    SPR_FRM_CBPJ_PFFHSJ: '评分返回时间', //评分返回时间
    SPR_FRM_CBPJ_ZXCZ: '最新操作', //最新操作
    SPR_FRM_CBPJ_CZJL: '操作记录', //操作记录
    SPR_FRM_CBPJ_THLY: '退回理由', //退回理由
    SPR_FRM_CBPJ_FP: '分派', //分派
    SPR_FRM_CBPJ_CXDF: '重新打分', //重新打分
    SPR_FRM_CBPJ_QXZKG: '请选择科/股', //请选择科/股
    SPR_FRM_CBPJ_QXZTHYY: '请选择退回原因', //请选择退回原因
    SPR_FRM_CBPJ_QXZZPDX: '请选择转派对象', //请选择转派对象
    SPR_FRM_CBPJ_QDQXM: '确定取消吗', //确定取消吗
    SPR_FRM_CBPJ_YY: '沿用', //沿用
    SPR_FRM_CBPJ_ZCDHYDYX: '政策对行业的影响', //政策对行业的影响
    SPR_FRM_CBPJ_HYGQZK: '行业供求状况', //行业供求状况
    SPR_FRM_CBPJ_GLGFCD: '管理规范程度', //管理规范程度
    SPR_FRM_CBPJ_XMGLNL: '项目管理能力', //项目管理能力
    SPR_FRM_CBPJ_HYDB: '行业口碑', //行业口碑
    SPR_FRM_CBPJ_ZYKHSL: '主要客户实力', //主要客户实力
    SPR_FRM_CBPJ_YZYKHHZWDX: '与主要客户合作稳定性', //与主要客户合作稳定性
    SPR_FRM_CBPJ_ZYGYSSL: '主要供应商实力', //主要供应商实力
    SPR_FRM_CBPJ_YZYGYSHZWDX: '与主要供应商合作稳定性', //与主要供应商合作稳定性
    SPR_FRM_CBPJ_HTLXQK: '合同履行情况', //合同履行情况
    SPR_FRM_CBPJ_ZJGXSJ: '最近更新时间', //最近更新时间
    SPR_FRM_CBPJ_ZJGXR: '最近更新人', //最近更新人
    SPR_FRM_CBPJ_SFXSLSPJ: '是否显示历史评级', //是否显示历史评级
    SPR_FRM_CBPJ_JJF: '有无加减分', //有无加减分
    SPR_FRM_CBPJ_SFLJLJ: '是否连降两级', //是否连降两级
    SPR_FRM_CBPJ_CBBJ: '财报比较', //财报比较
    SPR_FRM_CBPJ_DCCPMB: '导出初评模板', //导出初评模板
    SPR_FRM_CBPJ_CPZT: '初评状态', //初评状态
    SPR_FRM_CBPJ_TZQDF: '调整前得分', //调整前得分
    SPR_FRM_CBPJ_TZF: '调整分', //调整分
    SPR_FRM_CBPJ_TZHDF: '调整后得分', //调整后得分
    SPR_FRM_CBPJ_SFYX: '是否有效', //是否有效
    SPR_FRM_CBPJ_YWJJF: '有无加减分', //有无加减分
    SPR_FRM_CBPJ_JXCPLC: '继续初评流程？', //继续初评流程？
    SPR_FRM_CBPJ_QSRWFPJYY: '请输入无法评级原因', //请输入无法评级原因
    SPR_FRM_CBPJ_SJZB: '三级指标', //三级指标
    SPR_FRM_CBPJ_RJZB: '二级指标', //二级指标
    SPR_FRM_CBPJ_YJZB: '一级指标', //一级指标
    SPR_FRM_CBPJ_PJBJ: '评级比较', //评级比较
    SPR_FRM_CBPJ_GYSCPQK: '供应商初评情况', //供应商初评情况
    SPR_FRM_CBPJ_LSCP: '历史初评', //历史初评
    SPR_FRM_ZNXZYTSJ: '只能选择一条数据', //只能选择一条数据
    SPR_FRM_CBPJ_QSL: '缺失率%', //缺失率%
    SPR_FRM_CBPJ_TZQPJ: '调整前评级', //调整前评级
    SPR_FRM_CBPJ_TZHPJ: '调整后评级', //调整后评级
    SPR_FRM_CBPJ_DFQX: '得分详细', //得分详细
    SPR_FRM_CBPJ_ZBMC: '指标名称', //指标名称
    SPR_FRM_CBPJ_ZBSZ: '指标数值', //指标数值
    SPR_FRM_CBPJ_ZBFZ: '指标分值', //指标分值
    SPR_FRM_CBPJ_DFLY: '得分来源', //得分来源
    SPR_FRM_CBPJ_TBSZ: '填补数值', //填补数值
    SPR_FRM_CBPJ_SFJSF: '是否谨慎分', //是否谨慎分
    SPR_FRM_CBPJ_PJMX: '评级明细', //评级明细
    SPR_FRM_CBPJ_PJRY: '评级人员', //评级人员
    SPR_FRM_CBPJ_CPMBDCTIPS: '初评模板仅支持单条数据导出，请确认后重新导出。', //初评模板仅支持单条数据导出，请确认后重新导出。
    SPR_FRM_CBPJ_WPJYYYTIPS: '抱歉，无法评级原因不能为空！', //抱歉，无法评级原因不能为空！
    SPR_FRM_CBPJ_CBBJTIPS: '最多可选择3条数据，请重新选择！', //最多可选择5条数据，请重新选择！
    SPR_FRM_CBPJ_Y: '有', //有
    SPR_FRM_CBPJ_W: '无', //无
    SPR_FRM_CBPJ_CZKS: '操作科室', //操作科室
    SPR_FRM_FRMGL_QXZQZSJ: '请选择起止时间', //请选择起止时间
    SPR_FRM_FRMGL_BJQZYGSJ: '必须选择一个时间', //必须选择一个时间
    SPR_FRM_FRMGL_QXZSYMX: '请选择适用模型', //请选择适用模型
    SPR_FRM_CBPJ_QWCDF: '请完成打分', //请完成打分
    SPR_FRM_CBPJ_ZYZTWCGCNJXDXDF: '只能状态为草稿才能进行定性打分。', //只能状态为草稿才能进行定性打分
    SPR_FRM_CBPJ_ZYZTWCGCNJXDXDFNOW: '只能状态为草稿或退回才能进行定性打分。', //只能状态为草稿才能进行定性打分
    SPR_FRM_CBPJ_SXZTYWQCXQZ: '所选状态为无法评级，请重新选择。', //所选状态有误，请重新选择。
    SPR_FRM_CBPJ_GZPANDUAN: '退回状态，股长不能做其他操作，请重新选择！', //退回状态，股长不能做其他操作，请重新选择！
    SPR_FRM_CBPJ_FRMPANDUAN:
      '退回状态，FRM管理员不能做定性打分，退回，转派操作，请重新选择！', //退回状态，FRM管理员不能做定性打分，退回，转派操作，请重新选择！！
    // 风险信号
    SPR_FRM_FXXH_FXGYS: '风险供应商', //风险供应商
    SPR_FRM_FXXH_XHLY: '信号来源', //信号来源
    SPR_FRM_FXXH_FKBM: '反馈部门', //反馈部门
    SPR_FRM_FXXH_TJSJ: '提交时间', //提交时间
    SPR_FRM_FXXH_GHGX: '供货关系', //供货关系
    SPR_FRM_FXXH_CZFS: '处置方式', //处置方式
    SPR_FRM_FXXH_SFWY: '是否违约', //是否违约
    SPR_FRM_FXXH_FXXHDL: '风险信号-大类', //风险信号-大类
    SPR_FRM_FXXH_YXQSJ: '有效期时间', //有效期时间
    SPR_FRM_FXXH_FXXHXL: '风险信号-小类', //风险信号-小类
    SPR_FRM_FXXH_CZSJ: '处置时间', //处置时间
    SPR_FRM_FXXH_JZ: '进展', //进展
    SPR_FRM_FXXH_TJR: '提交人', //提交人
    SPR_FRM_FXXH_TJRKS: '提交人科室', //提交人科室
    SPR_FRM_FXXH_FZ: '复制', //复制
    SPR_FRM_FXXH_XJ: '新建', //新建
    SPR_FRM_FXXH_SDFQFXXH: '手动发起风险信号', //手动发起风险信号
    SPR_FRM_FXXH_FXGYSSSKS: '风险供应商所属科室', //风险供应商所属科室
    SPR_FRM_FXXH_TZF: '调整分', //调整分
    SPR_FRM_FXXH_YXQ: '有效期', //有效期
    SPR_FRM_FXXH_XHSM: '信号说明', //信号说明
    SPR_FRM_FXXH_XTFQXH: '系统发起风险信号', //系统发起风险信号
    SPR_FRM_FXXH_QSRZS: '请输入（整数）', //请输入（整数）
    SPR_FRM_FXXH_QSS: '请搜索', //请搜索
    SPR_FRM_FXXH_QRTJ: '确认添加', //确认添加
    SPR_FRM_FXXH_FXXHCJRQ: '风险信号创建日期', //风险信号创建日期
    SPR_FRM_FXXH_RWSSJGQGBTCBYQGYSZC:
      '若无搜索结果，请关闭弹窗并邀请供应商注册。', //若无搜索结果，请关闭弹窗并邀请供应商注册。
    SPR_FRM_FXXH_NSFQRTJSP: '您是否确认提交审批?', //您是否确认提交审批
    SPR_FRM_FXXH_WZDGYSXX_QSRZQDTYSHXYDMHCS:
      '未找到供应商信息，请输入正确的"统一社会信用代码"后再尝试。', //未找到供应商信息，请输入正确的"统一社会信用代码"后再尝试。
    SPR_FRM_FXXH_SDCJ: '手动创建', //手动创建
    SPR_FRM_FXXH_SDFZ: '手动复制', //手动复制
    LK_ZHANGQITIAN: '账期（天）', //账期（天）
    SPR_FRM_FXXH_QQEFXXHDCZFSHJXTJ: '请确认风险信号的处置方式后进行提交', //请确认风险信号的处置方式后进行提交
    SPR_FRM_FXXH_TZFHYXQBNWK:
      '请补充调整分和有效期后再进行提交，提交后所有信息将不可更改', //请补充调整分和有效期后再进行提交，提交后所有信息将不可更改
    SPR_FRM_FXXH_YTJDFXXHSJBKSC: '已提交的风险信号数据不可删除', //已提交的风险信号数据不可删除
    SPR_FRM_FXXH_SFQRTJ: '提交后所有信息将不可更改，请确认是否提交', //提交后所有信息将不可更改，请确认是否提交
    SPR_FRM_FXXH_FZFXXHJZCDXQCXGXNSXFZDFXXH:
      '复制风险信号仅支持单选，请重新勾选您所需复制的风险信号', //复制风险信号仅支持单选，请重新勾选您所需复制的风险信号
    SPR_FRM_FXXH_QQRSFTJ: '请确认是否提交', //请确认是否提交
    SPR_FRM_FXXH_QXZCZFSHZJXTJ:
      '请选择处置方式后再进行提交，提交后所有信息将不可更改', //请选择处置方式后再进行提交，提交后所有信息将不可更改
    SPR_FRM_FXXH_ZTWYCZDFXXHCNDJFZ: '状态为已处置的风险信号，才能点击复制', //状态为已处置的风险信号，才能点击复制
    SPR_FRM_FXXH_YSFXGYS: '原始风险供应商', //原始风险供应商
    SPR_FRM_CBPJ_WFPJYY: '无法评级原因',
    // ---------------WS3 供应商 end-----------------------
    MAIL: {
      NOTIFICATION: '通知',
      MESSAGE: '消息',
      UNREAD: '未读{unRead}条',
      WILL: '还有{tipBegin}分钟开始',
      ONGOING: '进行中',
      OVERDUE: '已过期',
      UNREAD_STATUS: '未读',
      READ_STATUS: '已读',
      READALL: '全部已读',
      CLEARALL: '全部清除',
      LOADING: '加载中...',
      NOMORE: '没有更多了',
      CLEARALL_TIPS: '全部清除会将未读已读所有消息全部清除',
      CONFIRM: '确定',
      CANCEL: '取消',
      ALL: '全部'
    },
    HOME_CARD: {
      HOME_MODULE_TASK: 'Top 5 Tasks',
      HOME_MODULE_SOURCING: '寻源概览',
      MY_APPLICATION: '我的申请',
      MY_APPROVAL: '我的审批',
      OVERDUE: '逾期待办',
      IN_PROGRESS: '今日待办',
      HOME_MODULE_SPONSER: '供应商财务风险评级',
      HOME_MODULE_SCHEDULE: 'Schedule',
      HOME_MODULE_APPROVE: 'iAgree',
      HOME_MODULE_VOLUME: 'Volume Pricing',
      HOME_MODULE_NEWS: 'News',
      HOME_MODULE_PROVIDER_RATE: '配附件供货率'
    },
    //谈判助手
    TPZS: {
      ZUIXINDINGDIANDANJIA: '最新定点单价', //最新定点单价
      MUBIAODANJIA: '目标单价', //目标单价
      CHANLIANGLIANG: '产量(件)', //产量（件）
      DANJIA: '单价', //单价
      YUANJIAN: '(元/件)', //（元/件）
      BANJIAJIAN: '(半价/件)', //（半价/件）
      CHANLIANG: '产量'
    },
    // 以下ekl中文
    LK_WDYJ: '我的业绩',
    LK_YJJC: '业绩基础',
    LK_MIAOSHU: '描述',
    // LK_ZHUANGTAI: '状态',
    LK_FAQIREN: '发起人',
    LK_DANJULEIX: '单据类型',
    LK_YEWULEIXING: '业务类型',
    LK_CJRQ: '创建日期',
    LK_GXRQ: '更新日期',
    LK_GENGXINRIQIQI: '更新日期起',
    LK_GENGXINRIQIZHI: '更新日期止',
    LK_GXRQQZ: '更新日期起止',
    LK_CLGL: '产量管理',
    LK_NDMBGL: '年度目标管理',
    LK_CJNDMBGL: '创建年度目标',
    LK_XZYJJC: '新增业绩基础',
    LK_XZYJJCTIP: '请先编辑基础信息，再选取⽂件上传',
    LK_XZYJFJTIP: '暂无附件，请上传',
    LK_XZWJ: '选择文件',
    LK_PLJYSCLGL: '批量件预算产量管理',
    LK_SCCL: '上传产量',
    LK_XZMB: '下载模板',
    LK_FHSJ: '返回上级',
    LK_TZKS: '通知科室',
    LK_NIANDUYEJIJICHU: '年度业绩基础',
    LK_ZONGCHENCHENGSANJIANJICHUBIAO: '总成散件基础表',
    LK_QITA: '其他',
    LK_FQQR: '发起确认',
    LK_RWJZRQ: '任务截止日期',
    LK_GONGYINGSHANG: '供应商',
    // LK_CAIGOUGONGCHANG: '采购工厂',
    LK_QUERENZHUANGT: '确认状态',
    LK_FDJDCB: '发动机-电池包',
    LK_BIANSUXIANG: '变速箱',
    LK_PEIZHI: '配置',
    LK_CHEXINGDAIMA: '车型代码',
    LK_CHANGPINJIAZU: '产品家族',
    LK_CPJZ: '产品家族',
    // LK_LINGJIANHAO: '零件号',
    LK_PLBJ: '批量编辑',
    LK_QRSL: '确认数量',
    LK_QRJG: '确认价格',
    LK_JGLY: '价格来源',
    LK_QRJGLY: '确认价格来源',
    LK_ZP: '转派',
    LK_ZGZJ: '转给自己',
    LK_QNCL: '全年产量',
    LK_SYH: '索引号',
    LK_SHUL: '数量',
    LK_JAGE: '价格',
    LK_KSLJ: 'KSL价',
    LK_KSLJIALAIYUAN: 'KSL价来源',
    LK_KSLLAIYUANJIAGE: 'KSL来源价格',
    LK_CKJG: '参考价格',
    LK_CKJGLY: '参考价格来源',
    LK_CAIGOUY: '采购员',
    LK_CAIGOUJINE: '采购金额', //采购金额
    LK_CGCKJ: '采购参考价',
    LK_JIJIA: '基价',
    LK_GZJD: '跟踪进度',
    LK_LAIYUAN: '来源',
    LK_CAOZ: '操作',
    // LK_BANBENHAO: '版本号',
    // LK_QUEREN: '确认',
    // LK_SHANGCHUANREN: '上传人',
    JANUARY: '1月',
    FEBRUARY: '2月',
    MARCH: '3月',
    APRIL: '4月',
    MAY: '5月',
    JUNE: '6月',
    JULY: '7月',
    AUGUST: '8月',
    SEPTEMBER: '9月',
    OCTOBER: '10月',
    NOVEMBER: '11月',
    DECEMBER: '12月',
    LK_KESHI: '科室',
    PINJUN: '平均',
    CHIXU: '持续',
    LK_VW: '大众',
    LK_AUDI: '奥迪',
    LK_SK: '斯柯达',
    LK_DQZT: '当前状态',
    LK_YWC: '已完成',
    LK_WWC: '未完成',
    LK_FQSJ: '发起时间',
    LK_WCSJ: '完成时间',
    LK_DQESL: '待确认数量',
    // LK_JIAGEBIANHUA: '价格变化',
    LK_YJJETZ: '业绩金额调整',
    LK_SJJSJZSJ: '数据计算截止时间',
    LK_GZLJZS: '跟踪零件总数（项）',
    LK_XZLJZS: '新增零件总数（项）',
    LK_QXLJZS: '取消零件总数（项）',
    LK_LINGJIANGENZONGLEIXING: '零件跟踪类型',
    LK_LJGZLX: '零件跟踪类型',
    LK_JCBMBXZ: '基础表模板下载',
    LK_PFJ_LJMC: '零件名称',
    LK_PFJ_CLZ: '配附件材料组',
    LK_PFJ_PP: '品牌',
    LK_PFJ_SX: '属性',
    LK_PFJ_BZ: '备注',
    LK_PFJ_FE: '份额',
    LK_PFJ_CGJG: '上年采购价格',
    LK_PFJ_XSLYC: '当年销售量预测',
    LK_PFJ_DNCGJE: '当年采购金额',
    // LK_CAILIAOZU: '材料组',
    // LK_DANWEI: '单位',
    // LK_LINGJIANLEIXING: '零件类型', //零件类型
    // LK_CHEXINGDENGJI: '车型等级', //车型等级
    // 以上ekl中文
    // 零件生命周期

    LK_LINGJIANGAO: '零件高',
    LK_LINGJIANKUAN: '零件宽',
    LK_LINGJIANCHANG: '零件长',
    LK_LINGJIANZHONGLIANG: '零件重量',
    LK_CENGYONGCHEXING: '曾用车型',
    // LK_CHEXING:	'车型',
    LK_MOJUHETONGHAO: '模具合同号',
    LK_SAP_HETONGHAO: 'SAP合同号',
    LK_RISE_HETONGHAO: 'RISE合同号',
    LK_JIEZHIRIQI: '截止日期',
    LK_PEIJIANWULIU: '配件物流',
    LK_PILIANGWULIU: '批量物流',
    LK_EP_SHOUHOU: 'EP售后',
    LK_ZHIBAO: '质保',
    LK_PEIJIANQIANQI: '配件前期',
    LK_QIANQICAIGOU: '前期采购',
    // LK_JICHUXINXI	:'基础信息',
    LK_FANHUISHUJULEIXINGZHICUOWU: '返回数据类型值错误',
    LK_YANBIANJINCHENG: '演变进程',
    LK_JIAGEBIANHUA: '价格变化',
    LK_YUANLINGJIANHAO: '原零件号',
    LK_SHISIJIAGE: '实施价格',
    LK_TOUZI: '投资',
    LK_KAIFA: '开发',
    // LK_QINGSHURULINGJIANHAO	:'请输入零件号',
    LK_MEIYOULINGJIANHAO: '没有零件号',
    LK_TSSHIFOUQUERENSHANCHU: '是否确认删除, 提示',
    LK_LINGJIANLVLI: '零件履历',
    LK_SHOUCIXUNJIASHIJIAN: '首次询价时间',
    LK_XUNJIALEIXING: '询价类型',
    // LK_LINGJIANCAIGOUXIANGMULEIXING	:'零件采购项目类型',
    LK_GONGCHANG: '工厂',
    // LK_CHEXINGXIANGMU	:'车型项目',
    LK_SHIJIAN: '时间',
    LK_YIXIANGSHUBIANHAO: '意向书编号',
    LK_DINDDIANSHIJIAN: '定点时间',
    LK_RS_DANHAO: 'RS单号',
    LK_AJIA: 'A价',
    LK_BJIA: 'B价',
    LK_BNKJIAGE: 'BNK价格',
    LK_QIANDUANBAOZHUANGFEI: '前段包装费',
    LK_HOUDUANBAOZHUANGFEI: '后段包装费',
    LK_CUOZUOFEI: '操作费',
    LK_YUNSHUFEI: '运输费',
    LK_TOUZIFEI: '投资费',
    LK_KAIFAFEI: '开发费',
    LK_WULIUFUWUSHANG: '物流服务商',
    LK_XUNJIACHANGLIANG: '询价产量',
    LK_DINGDIANSHICHANNENG: '定点时产能',
    LK_SHIFOUZUOGUOCHENGBENFENXI: '是否做过成本分析',
    LK_DINGDIANXINBIANHAO: '定点信编号',
    LK_HUIYIBIANHAO: '会议编号',
    LK_SONGYANGSHIJIAN: '送样时间',
    LK_PEIJIANAJIA: '配件A价',
    LK_DINGDIANXINGQIANSHUSHIJIAN: '定点信签署时间',
    LK_SHOUCI: '首次',
    LK_CHEXINGMINGCHENG: '车型名称',
    LK_DAORURIQI: '导入日期',
    LK_JIAGESHISIRIQI: '价格实施日期',
    LK_TOUCHANRIQI: '投产日期',
    LK_QUXIAORIQI: '取消日期',
    LK_MOJUTOUZIFEIYONG: '模具投资费用',
    LK_YANGJIANJIAGE: '样件价格',
    LK_GUIZEBIANHAO: '规则编号',
    LK_YUANCAILIAO: '原材料',
    // LK_YONGLIANG	:'用量',
    LK_BUCAIZHOUQI: '补差周期',
    LK_SHICHANGJIALAIYUAN: '市场价来源',
    LK_GONGYINGXINXI: '供应信息',
    LK_GONGYINGSHANGFENE: '供应商份额',
    LK_GONGCHANGFENE: '工厂份额',
    LK_ERCIJIAN: '二次件',
    LK_FSHAO: 'FS号',
    LK_LJQSMZQ: '零件全生命周期',
    LK_FADONGJIDIANCIBAO: '发动机电池包',
    //会议中英文
    MT_HUIYIMINGCHENG: '会议名称',

    MT_HUIYIDIDIAN: '会议地点',

    MT_HUIYILEIXING: '会议类型',

    MT_HUIYIZHUANGTAI: '会议状态',

    MT_HUIYITONGPING: '会议同屏',

    MT_HUIYIZHANSHI: '会议展示',

    MT_XINZENGYITI: '新增议题',

    MT_CHAKANYITI: '查看议题',

    MT_XIUGAIYITI: '修改议题',

    MT_XINZENGXIUXI: '新增休息',

    MT_CHAKANXIUXI: '查看休息',

    MT_BIANJIXIUXI: '编辑休息',

    MT_YITILEIXING: '议题类型',

    MT_HUIYIGAIQI: '会议改期',

    MT_GAIQI: '改期',

    MT_YITIMINGCHENG: '议题名称',

    MT_HUIYIXIUXI: '会议休息',

    MT_YONGSHI: '用时',

    MT_FENZHONG: '分钟',

    MT_YITIZILIAO: '议题资料',

    MT_XUANZEHUIYI: '选择会议',

    MT_CHAKANHUIYIJIYAO: '查看会议纪要',

    MT_ZHUANGTAI: '状态',

    MT_HUIYIRIQI: '会议日期',

    MT_ZHOUCI_: '周次',

    MT_ZHOUCI: '周/次',

    MT_SHANGCHUAN: '上传',

    MT_QUXIAO: '取消',

    MT_QUEREN: '确认',

    MT_CHONGZHI: '重置',

    MT_XUHAO: '序号',

    MT_CAOZUO: '操作',

    MT_CHEHUI: '撤回',

    MT_SHANCHU: '删除',

    MT_BIANJI: '编辑',

    MT_DAOCHU: '导出',

    MT_CHUANGJIAN: '创建',

    MT_PILIANGCHUANGJIAN: '批量创建',

    MT_CAOGAO: '草稿',

    MT_KAIFANG: '开放',

    MT_KAISHI: '开始',

    MT_SUODING: '锁定',

    MT_JIESUO: '解锁',

    MT_XIUGAI: '修改',

    MT_LEIXING: '类型',

    MT_FABUZHE: '发布者',

    MT_FABURIQI: '发布日期',

    MT_DAORUYITI: '导入议题',

    MT_XIAZAIMUBAN: '下载模板',

    MT_YITIMUBAN: '议题模板',

    MT_XIAZAIMUBANCHENGGONG: '下载模板成功',

    MT_XIAZAIMUBANSHIBAI: '下载模板失败',

    MT_GUANBI: '关闭',

    MT_JIESHU: '结束',

    MT_TONGPING: '同屏',

    MT_ZHANSHI: '展示',

    MT_YITITIAOZHENG: '议题调整',

    MT_JIESHUYITI: '结束议题',

    MT_SHENGCHENGHUIYIJIYAO: '生成会议纪要',

    MT_SHANGCHUANHUIYIJIYAO: '上传会议纪要',

    MT_HUIYISHIJIAN: '会议时间',

    MT_FUJIAN: '附件',

    MT_QINGSHURU: '请输入',

    MT_QINGXUANZE: '请选择',

    MT_TO: '至',

    MT_PILIANGHUIYICHUANGJIAN: '批量会议创建',

    MT_QINGXUANZEHUIYILEIXNG: '请选择会议类型',

    MT_HUIYIJIANGE: '会议间隔',

    MT_QINGXUANZEHUIYIJIANGE: '请选择会议间隔',

    MT_QINGXUANZEKAISHISHIJIAN: '请选择开始时间',

    MT_QINGXUANZEJIESHURIQI: '请选择结束日期',

    MT_QINGXUANZEKAISHIRIQI: '请选择开始日期',

    MT_HUIYIZHOUQI: '会议周期',

    MT_QINGXUANZEHUIYIZHOUQI: '请选择会议周期',

    MT_QINGSHURUHUIYIDIZHI: '请输入会议地址',

    MT_KAISHISHIJIAN: '开始时间',

    MT_JIEZHISHIJIAN: '截止时间',

    MT_QINGXUANZEHUIYIKAISHIJIAN: '请选择会议开始时间',

    MT_QINGXUANZEHUIYIKAISHIRIQI: '请选择会议开始日期',

    MT_HUIYIDIZHI: '会议地址',

    MT_SHOUJIANREN: '收件人',

    MT_QINGXUANZESHOUJIANREN: '请选择收件人',

    MT_XUANZESHOUJIANREN: '选择收件人',

    MT_SOUSUOSHOUJIANREN: '搜索收件人',

    MT_YUHUIREN: '与会人',

    MT_QINGXUANZEYUHUIREN: '请选择与会人',

    MT_QINGSHURUYUHUIREN: '请输入与会人',

    MT_HUIYICHUANGJIAN: '会议创建',

    MT_GUANBIHUIYI: '关闭会议',

    MT_SHIFOUCHUFASHENPI: '是否触发审批',

    MT_SHENPILIUCHENG: '审批流程',

    MT_SHANGCHUANFUJIAN: '上传附件',

    MT_QINGXUANZEWENJIAN: '请选择文件',

    MT_XUANZEWENJIAN: '选择文件',

    MT_WENJIANDAXIAOXIANZHI: '文件大小限制',

    MT_WENJIANDAXIAOZUIDAXIANZHI: '文件大小最大限制',

    MT_DAORUYICHANG: '导入异常',

    MT_QINGXIUGAIHOUCHONGXINZHIXINGDAORUCAOZUO: '请修改后重新执行导入操作！',

    MT_HUIYIXIUGAI: '会议修改',

    MT_HUIYIJIYAO: '会议纪要',

    MT_BUMEN: '部门',

    MT_SHENGCHENG: '生成',

    MT_SHANGYIYE: '上一页',

    MT_XIAYIYE: '下一页',

    MT_QINGSHANGCHUANFUJIAN: '请上传附件',

    MT_WENJIANDAXIAOXIANZHIORZHIZHICHIPDFWENJIAN:
      '文件大小最大限制10MB | 只支持pdf文件',

    MT_ZILIAOXIAZAI: '资料下载',

    MT_ZANWUXIAZAIZILIAO: '暂无下载资料',

    MT_XIAZAI: '下载',

    MT_XAIZAIMINGCHENG: '下载名称',

    MT_SHANGCHUANFUJIANREN: '上传附件人',

    MT_SHANGCHUANFUJIANSHIJIAN: '上传附件时间',

    MT_HUIYIZHIBOMEIWUMIAOSHUAXIN: '会议直播进程将每5秒自动刷新，请耐心等待。',

    MT_ZANWUZHIBOHUIYI: '暂无直播会议',

    MT_WODEYITI: '我的议题',

    MT_CHAIFEN: '拆分',

    MT_WEIWANCHENG: '未完成',

    MT_YIWANCHENG: '已完成',

    MT_XINZENGSHOUGONGYITI: '新增手工议题',

    MT_CHAKANSHOUGONGYITI: '查看手工议题',

    MT_XIUGAISHOUGONGYITI: '修改手工议题',

    MT_SHOUGONGYITI: '手工议题',

    MT_NINSHANGWUHUIYICHAKANQUANXIAN: '您尚无该类型会议的查看权限',

    MT_ZANWUHUIYI: '暂无会议',

    MT_XINZENG: '新增',

    MT_BAOCUN: '保存',

    MT_BANGONGSHI: '办公室',

    MT_DIANHUA: '电话',

    MT_YOUJIAN: '邮件',

    MT_TIANJIAZILIAO: '添加资料',

    MT_TIANJIAZILIAOLEIXING: '添加资料类型',

    MT_XIUGAIZILIAO: '修改资料',

    MT_XIUGAIZILIAOLEIXING: '修改资料类型',

    MT_ZILIAOLEIXING: '资料类型',

    MT_ZILIAOLEIXINGMINGCHENG: '资料类型名称',

    MT_LEIXINGMINGCHENG: '类型名称',

    MT_ZILIAOBIAOTI: '资料标题',

    MT_TIANJIAFUJIAN: '添加附件',

    MT_SUOSHUHUIYI: '所属会议',

    MT_XIUGAIHUIYILEIXINGXINXI: '修改会议类型信息',

    MT_ZANWUSHUJU: '暂无数据',

    MT_HUIYIJIANJIE: '会议简介',

    MT_XIUGAIFENGMIANTU: '修改封面图',

    MT_HUIYILIANXIREN: '会议联系人',

    MT_HUIYILEIXINGGUANLI: '会议类型管理',

    MT_HUIYIZILIAOGUANLI: '会议资料管理',

    MT_HUIYIZILIAO: '会议资料',

    MT_WEIJINXING: '未进行',

    MT_JINXINGZHONG: '进行中',

    MT_YIJIESHU: '已结束',

    MT_LIANXIRENXINXI: '联系人信息',

    MT_GANGWEI: '岗位',

    MT_YOUXIANG: '邮箱',

    MT_FANHUI: '返回',

    MT_SOUSUO: '搜索',

    MT_CHUANGJIANYUHUIRENFENZU: '创建与会人分组',

    MT_XIUGAIYUHUIRENFENZU: '修改与会人分组',

    MT_ZUMING: '组名',

    MT_CHUANGJIANSHOUJIANREN: '创建收件人',

    MT_TIANJIASHOUJIANREN: '添加收件人',

    MT_XIUGAISHOUJIANREN: '修改收件人',

    MT_SHICHANG: '时长',

    MT_YANJIANGREN: '演讲人',

    MT_YANJIANGRENBUMEN: '演讲人部门',

    MT_SHIJIAN: '时间',

    MT_YITIXINXI: '议题信息',

    MT_CHAKANJIELUN: '查看结论',

    MT_JIELUN: '结论',

    MT_HUIYI: '会议',

    MT_SHIFOUDONGJIE: '是否冻结',

    MT_SHI: '是',

    MT_FOU: '否',

    MT_RENWU: '任务',

    MT_WEIHUZILIAO: '维护资料',

    MT_ZANWU: '暂无',

    MT_DAIDING: '待定',

    MT_DINGDIAN: '定点',

    MT_FALOI: '发LOI',

    MT_ZHUANTER: '转TER/TOP-TER',

    MT_XIACIPRE: '下次Pre CSC',

    MT_ZHUANCSC: '转CSC',

    MT_WEIHUJIELUN: '维护结论',

    MT_XIACIHUIYI: '下次会议',

    MT_DONGJIERSDAN: '冻结RS单',

    MT_QINGSHURURENWU: '请输入任务',

    MT_QUEDING: '确定',

    MT_LIEYINCANGHUOXIANSHI: '列隐藏/显示',

    MT_ZILIAOMINGCHENG: '资料名称',

    MT_ZILIAOSHANGCHUANREN: '资料上传人',

    MT_CHEHUIYITI: '撤回议题',

    MT_TIANJIAYITI: '添加议题',

    MT_JULIHUIYIHAIYOU: '距离会议还有',

    MT_TIAN: '天',

    MT_HUIYIXINXIMIAOSHU: '会议信息描述',

    MT_HUIYIMINGCHENGHOUZHUI: '会议名称后缀',

    MT_SUOSHUFENLEI: '所属分类',

    MT_HUIYIGUANLIYUAN: '会议管理员',

    MT_YITISHICHANG: '议题时长',

    MT_CHUANGJIANHUIYILEIXING: '创建会议类型',

    MT_BIANJIHUIYILEIXING: '编辑会议类型',

    MT_SHANGCHUANFENGMIANTUPIAN: '上传封面图片',

    MT_JIANYISHIYONGBILI: '建议使用16:9比例，图片最大15M',

    MT_SHENGCHENGHUIYIMINGCHENGHOUZHUI: '生成会议名称后缀',

    MT_HUIYISHUXING: '会议属性',

    MT_HUIYIJIELUNPEIZHI: '会议结论配置',

    MT_HUIYISHANGXIAXIANJINE: '会议上下限金额',

    MT_XIAXIAN: '下限',

    MT_SHANGXIAN: '上限',

    MT_GUANLIANGUANXI: '关联关系',

    MT_MORENYITISHICHANG: '默认议题时长',

    MT_BIXUAN: '必选',

    MT_SHIFOUCHUFASHENPILIU: '是否触发审批流',

    MT_SHANGCHUANWENJIANDAXIAOBUNENGCHAOGUO: '上传文件大小不能超过',

    MT_SHANGCHUANTOUXIANGTUPIANDAXIAOBUNENGCHAOGUO: '上传头像图片大小不能超过',

    MT_SHANGCHUANSHIBAI: '上传失败',

    MT_BITIAN: '必填',

    MT_TIAOZHENGWANCHENG: '调整完成',

    MT_QUXIAOTIAOZHENG: '取消调整',

    MT_WODE: '我的',

    MT_QUANBU: '全部',

    MT_CANYURENYUANXINGMING: '参与人员姓名',

    MT_XINGMING: '姓名',

    MT_DIANZIYOUXIANG: '电子邮箱',

    MT_GONGHAO: '工号',

    MT_SUOSHUBUMEN: '所属部门',

    MT_YICHU: '移除',

    MT_WENJIANMINGCHENG: '文件名称',

    MT_BAOCUNCHENGGONG: '保存成功',

    MT_BAOCUNSHIBAI: '保存失败',

    MT_GENGXINSHIBAI: '更新失败',

    MT_GENGXINCHENGGONG: '更新成功',

    MT_XITONGYONGHUHEFEIXITONGYONGHUBUNENGTONGSHIWEIKONG:
      '系统用户和非系统用户不能同时为空',

    MT_ZUIDABUNENGCHAOGUO255ZIFU: '最大不能超过255字符',

    MT_ZUIDACHANGDU255ZIFU: '最大长度255字符',

    MT_ZUIDACHANGDU64ZIFU: '最大长度64字符',

    MT_ZUIDACHANGDU1024ZIFU: '最大长度1024字符',

    MT_ZUIDACHANGDU2048ZIFU: '最大长度2048字符',

    MT_ZUIDASANWEIDANWEIFENZHONGBIXUZHENGZHENGSHU:
      '最大长度3位，单位（分钟），必须正整数',

    MT_BIXUZHENGZHENGSHU: '必须正整数',

    MT_ZUIDACHANGDU3WEI: '最大长度3位',

    MT_XIAZAISHIBAI: '下载失败',

    MT_SHANGCHUANCHENGGONG: '上传成功',

    MT_XIUGAICHENGGONG: '修改成功',

    MT_QINGXUANZESHANGCHUANFUJIAN: '请选择上传附件',

    MT_GUANBICHENGGONG: '关闭成功',

    MT_SHANGCHUANWENJIANLEIXINGCUOWU: '上传文件类型错误',

    MT_DAORUCHENGGONG: '导入成功',

    MT_DAORUSHIBAI: '导入失败',

    MT_SHANCHUCHENGGONG: '删除成功',

    MT_SHANCHUSHIBAI: '删除失败',

    MT_QINGSHURUYITIJIELUN: '请输入议题结论',

    MT_ZUIDACHANGDU2048ZIFU: '最大长度2048字符',

    MT_GAIQICHENGGONG: '改期成功',

    MT_SHIFOUTONGYICHEHUIGAIYITI: '是否同意撤回该议题？',

    MT_TISHI: '提示',

    MT_TONGYI: '同意',

    MT_JUJUE: '拒绝',

    MT_SHENPITONGGUO: '审批通过',

    MT_TONGGUO: '通过',

    MT_BUTONGGUO: '不通过',

    MT_YUBEIHUITONGGUO: '预备会通过',

    MT_JUJUECHENGGONG: '拒绝成功!',

    MT_DAORUYITICHENGGONG: '导入议题成功',

    MT_YIJIESHUHUOJINXINGZHONGDEYITIBUKEYIBEITIAOZHENG:
      '已结束或进行中的议题不可以被调整！',

    MT_BUKEYIBAYITITUOZHUAIDAOYIJIESHUHUOZHEJINXINGZHONGDEYITIZHIQIAN:
      '不可以把议题拖拽到已结束或者进行中的议题之前!',

    MT_SHANGWEISHENGCHENGHUIYIJIYAO_QIANWANGSHENGCHENGHUIYIJIYAO:
      '尚未生成会议纪要，前往生成会议纪要？',

    MT_QIANWANG: '前往',

    MT_QINGQUERENSHIFOUXUYAOGUANBIHUIYI: '请确认是否需要关闭会议？',

    MT_YIYOUJINXINGZHONGDEYITI: '已有进行中的议题!',

    MT_QINGANYITISHUNXUKAISHIYITI: '请按议题顺序开始议题！',

    MT_GAIYITILIEBIAOYIQUANBUJIESHU: '该议题列表已全部结束！',

    MT_KAISHIYITICHENGGONG: '开始议题成功! ',

    MT_KAISHIYITISGIBAI: '开始议题失败！',

    MT_GAIYITIWEIJINXINGZHONG_BUNENGJIESHUCAOZUO:
      '该议题未进行中，不能结束操作！',

    MT_JIESHUYITICHENGGONG: '结束议题成功! ',

    MT_CHAIFENCHENGGONG: '拆分成功',

    MT_CHAIFENSHIBAI: '拆分失败',

    MT_SHIFOUCHEHUIGAIHUIYI: '是否撤回该会议?',

    MT_CHEHUICHENGGONG: '撤回成功',

    MT_XIUXIYITIBUNENGJINXINGHAIQI: '休息议题不能进行改期',

    MT_ZHINENGSHANCHUWEIJINXINGDEYITI: '只能删除未进行的议题',

    MT_BUNENGSHANCHUCHEHUIZHONGDEYITI: '不能删除撤回中的议题',

    MT_QUERENSHANCHUGAIYITIMA: '确认删除该议题吗?',

    MT_JINXINGZHONGDEYITIBUNENGJINXINGHUIYIZILIAOWEIHU:
      '进行中的议题不能进行会议资料维护',

    MT_YIWANCHENGDEYITIBUNENGJINXINGHUIYIZILIAOWEIHU:
      '已完成的议题不能进行会议资料维护',

    MT_XIUXIYITIBUKEWEIHUZILIAO: '休息议题不可维护资料',

    MT_YIJIESHUDEDYITIBUNENGJINXINGXIUGAIYITI: '已结束的议题不能进行修改议题',

    MT_KAIFANGHUIYICHENGGONG: '开放会议成功！',

    MT_JIESHUHUIYICHENGGONG: '结束会议成功! ',

    MT_QINGQUERENSHIFOUXUYAOSUODINGHUIYI: '请确认是否需要锁定会议？',

    MT_SUODINGHUIYICHENGGONG: '锁定会议成功！',

    MT_SUODINGHUIYISHIBAI: '锁定会议失败！',

    MT_JIESUOHUIYICHENGGONG: '解锁会议成功！',

    MT_JIESUOHUIYISHIBAI: '解锁会议失败！',

    MT_QINGDAORUYITIHOUBAOCUN: '请导入议题后再保存',

    MT_ZHINENGSHANCHUCAOGAOZHUANGTAIDEHUIYI: '只能删除草稿状态的会议!',

    MT_SHIFOUSHANCHUGAIHUIYI: '是否删除该会议 ？',

    MT_SHIFOUKAIFANGGAIHUIYI: '是否开放该会议 ?',

    MT_HUIYIYICHENGGONGKAIFANG: '会议已成功开放!',

    MT_KAISHIHUIYICHENGGONG: '开始会议成功！',

    MT_SHENGCHENGAGENDACHENGGONG: '生成Agenda成功',

    MT_DIANHUAGESHIBUZHENGQUE: '电话格式不正确',

    MT_YOUXIANGGESHIBUZHENGQUE: '邮箱格式不正确',

    MT_NIQUEDINGYAOSHANCHUMA: '你确定要删除吗？',

    MT_HUOQUSHIBAI: '获取失败！',

    MT_CHUANGJIANCHENGGONG: '创建成功！',

    MT_JINGETIANJIAYIGEWENJIAN: '仅可添加一个文件！',

    MT_XIAJIACHENGGONG: '下架成功！',

    MT_SHANGJIACHENGGONG: '上架成功！',

    MT_SHIFOUSHANCHUGAIHUIYIZILIAO: '是否删除该会议资料？',

    MT_QINGQUERENSHIFOUFASONGYITICHEHUISHENQINGZHIHUIYIGUANLIYUAN:
      '请确认是否发送议题撤回申请至会议管理员?',

    MT_SHIFOUCHEHUIGAIYITI: '是否确认撤回该议题？',

    MT_YIFASONGCHEHUISHENQINGGEIGUANLIYUAN: '已发送会议撤回申请给管理员。',

    MT_ZHIYOUKAIFANGHESUODINGZHUANGTAICAIKEYICHEHUI:
      '只有开放和锁定状态才可以撤回!',

    MT_QUXIAOCHENGGONG: '取消成功',

    MT_GUANZHUCHENGGONG: '关注成功',

    MT_SHIFOUQUXIAOBIANJI: '是否取消编辑?',

    MT_SHIFOUBAOCUNYITI: '是否保存议题？',

    MT_MEIYOUYAOXIAZAIDEFUJIAN: '没有要下载的附件!',

    MT_YIJIESHUDEYITIBUKEYITIANJIAGUANZHU: '已经结束的议题不可以添加关注!',

    MT_QUXIAOGUANZHUCHENGGONG: '取消关注成功!',

    MT_YIJIESHUDEYITIBUKEYIQUXIAOGUANZHU: '已经结束的议题不可以取消关注!',

    MT_QINGQUERENSHIFOUYAOSHANCHUGAIQUNZU: '请确认是否要删除该群组？',

    MT_ZHUANGTAI2: '状态',

    MT_XUHAO2: '序号',

    MT_XUHAO3: '序号',

    MT_ZUZHIJIGOUMINGCHENGZHONG: '组织机构名称(中)',

    MT_ZUZHIJIGOUMINGCHENGYING: '组织机构名称(英)',

    MT_ZUZHIJIGOUBIANMA: '组织机构编码',

    MT_ZUZHIJIBIE: '组织级别',

    MT_MINGCHENG: '名称',

    MT_TIANJIAZUZHI: '添加组织',

    MT_CAOZUO2: '操作',

    MT_PILIANGPAIXU: '批量排序',

    MT_TONGYONGHUIYI: '通用会议',

    MT_SHENGCHANCAIGOUSCC: '生产采购CSC',

    MT_YIBANCAIGOUCSG: '一般采购CSG',

    MT_FENDUANDINGDIAN: '分段定点',

    MT_XIAXIANJINEBUNENGDAYUSHANGXIANJINE: '下限金额不能大于上限金额！',

    MT_QINGSHANGCHUANTUPIANWENJIAN: '请上传图片文件',

    MT_SHIFOUSHANCHUGAIHUIYILEIXING: '是否删除该会议类型？',

    MT_QINGXUANZEXUYAOSHANCHUDEHUIYILEIXING: '请选择需要删除的会议类型!',

    MT_DAOCHUCHENGGONG: '导出成功',

    MT_DAOCHUSHIBAI: '导出失败',

    MT_HUIYILEIXINGLIEBIAO: '会议类型列表',

    MT_SHENQINGCHEHUI: '申请撤回',

    MT_DINGDIANRSDANWEIDONGJIE: '定点RS单未冻结',

    MT_YITIMUBAN: '议题模版',

    MT_XIAZAIMUBANCHENGGONG: '下载模版成功',

    MT_XIAZAIMUBANSHIBAI: '下载模版失败',

    MT_QUERENCHAIFENGAIYITIME: '确认拆分该议题么?',

    MT_PAIXUWANCHENG: '排序完成',

    MT_SHANGXIATUOZHUAIKETIAOZHENGSHUNXU: '上下拖拽即可调整顺序',

    MT_TUICHU: '退出',

    MT_QINGXUANZEYIGEXIACIHUIYI: '请选择一个下次会议',

    MT_XIACIHUIYIZHINENGXUANZEYIGE: '下次会议只能选择一个！',

    MT_WEIHUCHENGGONG: '维护成功!',

    MT_YOUDINGDIANYITIWEIDONGJIERSDAN_QINGQUERENSHIFOUGUANBIHUIYI:
      '有定点议题未冻结RS单，请确认是否关闭会议?',

    ME_YI: '一（周会）',

    MT_ER: '二（双周会）',

    MT_SAN: '三',

    MT_SI: '四（月会）',

    MT_WU: '五',

    MT_LIU: '六',

    MT_QI: '七',

    MT_BA: '八',

    MT_JIU: '九',

    MT_SHIS: '十',

    MT_SHIYI: '十一',

    MT_SHIER: '十二（季度会）',

    MT_QINGSHURUHUIYIMINGCHENG: '请输入会议名称！',

    MT_ZUIDACHANGDU100ZIFU: '最大长度100字符',

    MT_QINGXUANZEZILIAOLEIXING: '请选择资料类型！',

    MT_QINGSHURUZILIAOBIAOTI: '请输入资料标题！',

    MT_QINGQUERENSHIFOUXUYAOSHANCHUGAIZILIAO: '请确认是否要删除该资料?',

    MT_JINZHICHITUPIANGESHI: '仅支持图片格式!',

    MT_SHANGCHUANTUPIANDAXIAOBUNENGCHAOGUO15MB: '上传图片大小不能超过15MB!',

    MT_QINGSHURUZILIAOLEIXINGMINGCHENG: '请输入资料类型名称！',

    MT_QINGXUANZESUOSHUHUIYI: '请选择所属会议！',

    MT_HUIYIZHIBO: '会议直播',

    MT_JINQIHUIYI: '近期会议',

    MT_GUANLIDATING: '管理大厅',

    MT_HUIYILIEBIAO: '会议列表',

    MT_YUHUIRENLIEBIAO: '与会人列表',

    MT_HUIYIXINXI: '会议信息',

    MT_WUCHAKANQUANXIAN: '无查看权限',

    MT_XINGQIYI: '星期一',

    MT_XINGQIER: '星期二',

    MT_XINGQISAN: '星期三',

    MT_XINGQISI: '星期四',

    MT_XINGQIWU: '星期五',

    MT_XINGQILIU: '星期六',

    MT_XINGQIRI: '星期日',

    MT_ZUZHI: '组织',

    MT_YUANGONG: '员工',

    MT_SOUSUOZUZHI: '搜索组织',

    MT_XUANZEZUZHI: '选择组织',

    MT_HUIYISUOYOUZHE: '会议所有者',

    MT_CISHU: '次数',

    MT_CHIXUSHIJIAN: '持续时间',

    MT_CHANHUIREN: '参会人',

    MT_GUBIE: '股别',

    MT_TIJIAOREN: '提交人',

    MT_BUMEN: '部门',

    MT_BEIZHU: '备注',





    

    APPROVAL: {
      ADD: '新增',
      SAVE: '保存',
      OK: '确定',
      CANCEL: '取消',
      EXPORT: '导出',
      RECALL: '撤回',
      EDIT: '编辑',
      DELETE: '删除',
      SUBMIT: '提交',
      UPLOAD_ATTACH: '上传附件',
      REMOVE_ATTACH: '删除附件',
      APPEND_DATA_NODE: '补充材料节点',
      APPEND_DATA: '补充材料',
      PLEASE_CHOOSE: '请选择',
      PLEASE_INPUT: '请输入',
      APPEND_DATA_COMMENT: '请输入补充材料留言内容',
      APPROVAL_COMMENTS: '审批意见',
      APPROVAL_COMMENTS_REQUIRED: '请输入审批意见',
      OPERATION_SUCCESSFUL: '操作成功',
      OPERATION_FAILED: '操作失败',
      RECALL_REASON: '撤回理由',
      RECALL_SUCCESSFUL: '撤回成功',
      RECALL_FAILED: '撤回失败',
      SUBMITTED: '已提交',
      APPROVAL_NOT: '未审批',
      APPROVED: '已审批',
      APPROVAL_ING: '审批中',
      APPROVAL_END: '审批结束',
      APPROVAL_TODO: '待审批',
      APPROVAL_NAME: '审批名称',
      APPLICATION_USER: '申请人',
      APPROVAL_TICKIT_TYPE: '审批单据类型',
      APPROVAL_PROGRESS: '审批进度',
      APPROVAL_CONTENT: '审批信息',
      APPLICATION_NO: '申请号',
      APPROVAL_ITEMS: '审批事项',
      CREATE_TIME: '创建时间',
      DEADLINE_TIME: '截止时间',
      TIME: '时间',
      NODE_NAME: '节点名称',
      OPRATION_USER: '操作人',
      OPRATION: '操作',
      OPRATION_TIME: '操作时长',
      COMMENT_CONTENT: '回复内容',
      NO: '编号',
      ATTACH: '附件',
      APPROVEL: '批准',
      REFUSE: '拒绝',
      PART_NO: '零件号',
      FORM_INFO: '表单信息',
      FLOW_INFO: '审批流程',
      MORE_APPROVAL_HISTORY: '审批历史',
      DEPARTMENT: '所属部门',
      CREATE_FLOW: '新建流程',
      FLOW_MODEL_MANAGE: '流程模块管理',
      FLOW_NO: '流程序号',
      FLOW_NAME: '流程标题',
      CREATE_BY: '创建者',
      FLOW_STATUS: '流程状态',
      FLOW_DESCRIPTION: '流程说明',
      FLOW_FORM_URLS: '流程表单地址',
      SAVE_SUCCESSFUL: '保存成功',
      SAVE_FAILED: '保存失败',
      DELETE_TIPS_CONTENT: '此操作将永久删除, 是否继续?',
      DELETE_TIPS_TITLE: '提示',
      DELETE_SUCCESSFUL: '删除成功',
      DELETE_FAILED: '删除失败',
      APPROVAL_CENTER: '审批中心',
      LOG: '日志',
      MY_APPLICATION: '我的申请',
      MY_APPROVAL: '我的审批',
      DETAIL: '详细',
      TASK_AGENT_TYPE: '任务类型',
      FLOW_TEMPLATE_MANAGE: '流程模板管理',
      FLOW_CATEGORY: '流程分类',
      APPROVAL_AGENT: '审批代理',
      AGENT_NO: '代理号',
      AUTH_USER_NAME: '授权人',
      AGENT_USER_NAME: '代理人',
      AGENT_TYPE: '代理类型',
      AGENT_START_TIME: '代理开始时间',
      AGENT_END_TIME: '代理结束时间',
      AGENT_DATE: '代理时间',
      AGENT_CONTENT: '代理内容',
      AGENT_CANCEL_TIME: '取消代理时间',
      IS_EFFECTIVE: '是否有效',
      INVALIDATION: '失效',
      STAFF_NO: '员工编号',
      STAFF_NAME: '姓名',
      STAFF_DEPARTMENT: '所属部门',
      STAFF_MOBILE: '手机',
      STAFF_TEL: '电话',
      TASK_MANAGER: '任务管理',
      TASK_NAME: '任务名称',
      TASK_DESC: '任务描述',
      THE_START_TIME: '发起时间',
      TASK_STATUS: '任务状态',
      COMPLETE_TIME: '完成时间',
      TASK_START_END_DATE: '任务起止时间',
      TASK_TRANSFER: '转派',
      TRANSFER_PERSON: '转派对象',
      APPROVAL_SUCCESS: '审批成功',
      APPROVAL_FAILED: '审批失败',
      APPROVAL_AGENT_MEETING: '会议审批代理',
      NEW: '新建',
      NODE_REQUIRED: '补充材料节点必选'
    },
    ROLE: {
      ROLE_NAME: '角色名称',
      ROLE_CODE: '角色代码',
      ROLE_ID: '角色ID',
      DESCRIPTION: '描述',
      ROLE_STATUS: '角色状态',
      ROLE_AUTH_PERMISSIONS: '分配权限',
      NAME: '名称',
      NAME_EN: '名称(英)',
      TYPE: '类型',
      ADDRESS: '地址',
      REMARK: '备注',
      PERMISSION: '权限',
      DESIGNATED_DEPARTMENT: '指定部门',
      USE_FOLLOW_PROP_FILTER: '按以下属性筛选',
      SET_FOLLOW_COL_DISVISIBLE: '设置以下属性不可见',
      RESOURCE_NAME: '资源名称',
      RESOURCE_NAME_EN: '资源名称(英)',
      RESOURCE_CODE: '资源编码',
      MENU_CODE: '菜单编码'
    },
    POSITION: {
      POSITION_NAME: '岗位名称',
      POSITION_CODE: '岗位编码',
      POSITION_USER: '岗位人员',
      POSITION_RELATIVE: '相关岗位',
      ORG_LEVEL: '组织级别',
      QUERY: '查询',
      RESET: '重置'
    },
    rfq: {
      RFQINQUIRE: '搜索',
      RFQRESET: '重置'
    },
    // -------------------------------条款 start---------------------------------------------
    TERMS_TIAOKUANGUANLI: '条款管理', //条款管理
    TERMS_BIAOZHUNTIAOKUAN: '标准条款', //标准条款
    TERMS_DINGZHITIAOKUAN: '定制条款', //定制条款
    TERMS_TIAOKUANCHAXUN: '条款查询', //条款查询
    TERMS_TIAOKUANMINGCHENG: '条款名称', //条款名称
    TERMS_TIAOKUANFUZEREN: '条款负责人', //条款负责人
    TERMS_TIAOKUANZHUANGTAI: '条款状态', //条款状态
    TERMS_QIANSHUJIEDIAN: '签署节点', //签署节点
    TERMS_GONGYINGSHANGFANWEI: '供应商范围', //供应商范围
    TERMS_BIAOZHUNTIAOKUANLIEBIAO: '标准条款列表', //标准条款列表
    TERMS_XUHAO: '序号', //序号
    TERMS_TIAOKUANBIANMA: '条款编码', //条款编码
    TERMS_FABUSHIJIAN: '发布时间', //发布时间
    TERMS_TIAKUANYOUXIAOQI: '条款有效期', //条款有效期
    TERMS_QIANSHUQINGKAUNG: '签署情况', //签署情况
    TERMS_SHIFOUCHONGFU: '是否重复', //是否重复
    TERMS_SHIFOUXUYAOQIANZHANG: '是否需要签章', //是否需要签章
    TERMS_SHIFOUGERENTIAOKUAN: '是否个人条款', //是否个人条款
    TERMS_XINJIAN: '新建', //新建
    TERMS_SHIXIAO: '失效', //失效
    TERMS_SOUSUO: '搜索', //搜索
    TERMS_CHONGZHI: '重置', //重置
    TERMS_TUICHU: '退出', //退出
    TERMS_FABU: '发布', //发布
    TERMS_QUEDING: '确定', //确定
    TERMS_CAOZUO: '操作', //操作
    TERMS_SHANCHU: '删除', //删除
    TERMS_XIAZAI: '下载', //下载
    TERMS_BIANJI: '编辑', //编辑
    TERMS_WEIFABU: '未发布', //未发布
    TERMS_YIFABU: '已发布', //已发布
    TERMS_YIGUOQU: '已过期', //已过期
    TERMS_YISHIXIAO: '已失效', //已失效
    TERMS_XINJIANTIAOKUAN: '新建条款', //新建条款
    TERMS_BIANJITIAOKUAN: '编辑条款', //编辑条款
    TERMS_GONGYINGSHANGLIWAI: '供应商(例外)', //供应商(例外)
    TERMS_TIAOKUANZHENGWEN: '条款正文', //条款正文
    TERMS_SHANGCHUANFUJIAN: '上传附件', //上传附件
    TERMS_WENJIANMINGCHENG: '文件名称', //文件名称
    TERMS_QINGXUANZEWENJIAN: '请选择文件', //请选择文件
    TERMS_WENJIANDAXIAOZUIDAXIANZHI: '文件大小最大限制50MB', //文件大小最大限制50MB
    TERMS_SHANGCHUANCHENGGONG: '上传成功', //上传成功
    TERMS_SHANGCHUANSHIBAI: '上传失败', //上传失败
    TERMS_BAOZUNCHENGGONG: '保存成功', //保存成功
    TERMS_BAOCUNSHIBAI: '保存失败', //保存失败
    TERMS_GENGXINCHENGGONG: '更新成功', //更新成功
    TERMS_GENGXINSHIBAI: '更新失败', //更新失败
    TERMS_YIXUANZEGONGYINGSHANGLIWAI: '已选择供应商(例外)', //已选择供应商(例外)
    TERMS_YIXUANZEGONGYINGSHANGFANWEI: '已选择供应商范围', //已选择供应商范围
    TERMS_SFQXBJ: '是否取消编辑？', //是否取消编辑？
    TERMS_SFBCTKMBSJ: '是否保存该条款模板数据？', //是否保存该条款模板数据？
    TERMS_SHI: '是', //是
    TERMS_FOU: '否', //否
    TERMS_TISHI: '提示', //提示
    TERMS_CHAKANTIAOKUAN: '查看条款', //查看条款
    TERMS_ZHANSHIBANBEN: '展示版本', //展示版本
    TERMS_DUIBIBANBEN: '对比版本', //对比版本
    TERMS_QIANSHUQINGKUANG: '签署情况', //签署情况
    TERMS_GONGYINGSHANGZHONGWENMING: '供应商中文名', //供应商中文名
    TERMS_DIQU: '地区', //地区
    TERMS_CAILIAOZU: '材料组', //材料组
    TERMS_GONGHUOJIBIE: '供货级别', //供货级别
    TERMS_SHIFOUQIANSHU: '是否签署', //是否签署
    TERMS_LIANXIRENXINGMING: '联系人姓名', //联系人姓名
    TERMS_YONGHUDENGRUMING: '用户登入名', //用户登入名
    TERMS_YOUXIANG: '邮箱', //邮箱
    TERMS_SHOUJI: '手机', //手机
    TERMS_DIANHUA: '电话', //电话
    TERMS_QIANSHUZHAUNGTAI: '签署状态', //签署状态
    TERMS_QIANSHUSHIJIAN: '签署时间', //签署时间
    TERMS_WEIQINSHU: '未签署', //未签署
    TERMS_YIQIANSHU: '已签署', //已签署
    TERMS_LIWAI: '例外', //例外
    TERMS_BIAOJILIWAI: '标记例外', //标记例外
    TERMS_SPAHAO: 'SPA号', //SPA号
    TERMS_QXZDZTKSJ: '请选择定制条款数据', //请选择定制条款数据
    TERMS_SFJDZTKSWSX: '是否将定制条款设为失效？', //是否将定制条款设为失效？
    TERMS_TIAKUANSHENGXIAOSHIJIAN: '条款生效时间', //条款生效时间
    TERMS_GONGYINGSHANGMINGCHENG: '供应商名称', //供应商名称
    TERMS_GONGYINGSHANGXIUGAITIAOKUANSHENHE: '供应商修改条款审核', //供应商修改条款审核
    TERMS_ZHENGSHIDINGZHITIAOKUAN: '正式定制条款', //正式定制条款
    TERMS_DIJIAORIQI: '递交日期', //递交日期
    TERMS_LISHIXIUDING: '历史修订', //历史修订
    TERMS_TISHIBIAOQIAN: '提示标签', //提示标签
    TERMS_TISHIJIEDIAN: '提示节点', //提示节点
    TERMS_GONGYINGSHANGXIUGAITIAOKUAN: '供应商修改条款', //供应商修改条款
    TERMS_SHANGQIXIUGAITIAOKUAN: '上汽修改条款', //上汽修改条款
    TERMS_HONGSE: '红色', //红色
    TERMS_WEIGONGYINGSHANGXIUGAITIAOKUAN: '为供应商修改条款', //为供应商修改条款
    TERMS_LVSE: '绿色', //绿色
    TERMS_WEISVWXIUGAITIAOKUAN: '为SVW修改条款', //为SVW修改条款
    TERMS_BITIAN: '必填', //必填
    TERMS_ZUIDACHANGDU: '最大长度', //最大长度
    TERMS_ZIFU: '字符', //字符
    TERMS_BIXUAN: '必选', //必选

    // -----------------------条款 start ------------------
    TERMS_ZHUCE: '注册', //注册
    TERMS_BIAOJI: '编辑', //编辑
    TERMS_DENGLU: '登录', //登录
    TERMS_QIANYUE: '签约', //签约
    TERMS_BANBEN1: '版本1', //版本1
    TERMS_XIAYIYE: '下一页', //下一页
    TERMS_SHANGYIYE: '上一页', //上一页
    TERMS_QINGSHURU: '请输入', //请输入
    TERMS_WEIQIANSHU: '未签署', //未签署
    TERMS_QINGXUANZE: '请选择', //请选择
    TERMS_FANKUIRIQI: '反馈日期', //反馈日期
    TERMS_BUSHURIQI: '部署日期', //部署日期
    TERMS_QIANSHURIQI: '签署日期', //签署日期
    TERMS_BUSHUJIEDIAN: '部署节点', //部署节点
    TERMS_WSVMXGTK: '为SVW修改条款', //为SVW修改条款
    TERMS_WGYSXGTK: '为供应商修改条款', //为供应商修改条款
    TERMS_SFBCGTKMBSJ: '是否保存该条款模板数据', //是否保存该条款模板数据
    TERMS_SFQXBJTKMBSJ: '是否取消编辑条款模板数据', //是否取消编辑条款模板数据
    TERMS_BUSHUZHUANGTAI: '部署状态', //部署状态
    TERMS_SHENQINGXIUGAI: '申请修改', //申请修改
    TERMS_XIUGAITIAOKUAN: '修改条款', //修改条款
    TERMS_TIAOKUANCHAXUAN: '条款查询', //条款查询
    TERMS_TISHIBIAOQIAN1: '提示标签1', //提示标签1
    TERMS_TIAOKUANGBIANMA: '条款编码', //条款编码
    TERMS_BAOCUNCHENGGONG: '保存成功', //保存成功
    TERMS_QIANSHUZHUANGTAI: '签署状态', //签署状态
    TERMS_TIAOKUANYOUXIAOQI: '条款有效期', //条款有效期
    TERMS_CHAKANDINGZHITIAOKUAN: '查看定制条款', //查看定制条款
    TERMS_BIAOZHUANTIAOKUANLIEBIAO: '标准条款列表', //标准条款列表

    // -------------------------------条款 end---------------------------------------------
    LK_DANWEIBAIWANRENMINGBI: '单位:百万人名币', //单位:百万人名币
    LK_SHANGYINIANSHUJUDUIBI: '上一年数据对比', //上一年数据对比
    LK_ZONGJINE: '总金额:', //总金额
    LK_MTZCAILIAOZU: 'MTZ材料组', //MTZ材料组
    LK_MTZKESHIYUSUANFUZEREN: 'MTZ科室预算负责人', //MTZ科室预算负责人
    LK_MTZYUSUANGUANLIYUAN: 'MTZ预算管理员', //MTZ预算管理员
    LK_CAILIAOZHONGLEI: '材料中类', //材料中类
    LK_BIJIAOBANBEN: '比较版本', //比较版本
    LK_YUEFENBIJIAO: '月份比较', //月份比较
    LK_XIANGQINGLIEBIAO: '详情列表', //详情列表
    LK_YUEFEN: '月份', //月份
    LK_SHICHANGJIA: '市场价', //市场价
    LK_ZONGJI: '总计', //总计
    LK_CHAYI: '差异', //差异
    LK_SHICHANGJIACHAYI: '市场价差异', //市场价差异
    LK_YONGLIANGCHAYI: '用量差异', //用量差异
    LK_ZONGJIACHAYI: '总价差异', //总价差异
    LK_CHEXINGLIUWEIHAO: '车型六位号', //车型六位号
    LK_NIANDUYUSUAN: '年度预算', //年度预算
    LK_YUEDUYUCE: '月度预测', //月度预测
    LK_SHIJIZHIFU: '实际支付', //实际支付
    LK_NIANDUYUSUANCHAYI: '年度预算差异', //年度预算差异
    LK_YUEDUYUSUANCHAYI: '月度预算差异', //月度预算差异
    LK_SHIJIZHIFUCHAYI: '实际支付差异', //实际支付差异
    LK_SHANCHUZHIXINGBAOGAO: '不可删除资信报告，请重新选择', //删除资信报告提示语
    QINGXUANZEYEWULEIXING:'请选择业务类型',
    YEWUBUMENLIANXIRENYOUXIANG:'业务部门联系人邮箱',
    YEWUBUMENLIANXIRENXINGMING:'业务部门联系人姓名',
    YEWULEIXING:"业务类型",
    DZYPZHYHMC:'电子银票账户银行名称',
    DZYPYHZHHH:'电子银票银行账户行号',
    DZYPYHSZGJ:'电子银票银行所在国家',
    DZYPYHSZSF:'电子银票银行所在省份',
    DZYPYHSZCS:'电子银票银行所在城市',
    GONGYINGSHANGZIYINHANGZHANGHU:'供应商子银行账户',
    NONGMINGGONGGONGZIZHUANYONG:'农民工工资专用账户名称',
    CAIGOUYUANXINXI:'采购员信息',
    YEWUBUMENLIANXIRENYOUXIANG:'业务部门联系人邮箱',
    SHIFOUQIYONG:'是否启用',
    SHOUQUANYINHANGXINXI:"授权银行信息",
    JITUANXINXI:'集团信息',
    SUPPLIER_CAIGOUFENLEI:'采购分类',
    XITONGXIUGAILISHILIEBIAO:'系统修改历史列表',
    FENSANNEIBUBAOXIAOGONGYINGSHANG:"分散（内部报销）供应商",
    NEIBUBAOXIAO:'内部报销',
    ZHENGSHIHAO:'正式号',
    SHIFOUCHAOQI:'是否超期',
    DENGLURISEXITONGTIME:'登录RISE系统时间',
    YINGYONGGUANLIAN:'应用关联',
    YIBANGONGYINGSHANG:"一般供应商",
    LK_BITIANXIANGBUNENGWEIKONG:"必填项不能为空",
    SUPPLIER_ZHUCEZIBEN:"注册资本",
    SKTZQZSJ:"受控停止起止时间",
    GGYSYZSYKNDGYZDMDZWXCFTJ:'该供应商已在所有可能的工艺组的黑名单中，无需重复添加！',
    CHAKANRSDAN:"查看RS单",
    GONGYONG:"共用",
    '审批数量':"审批数量",
    "申请数量":"申请数量",
    SUPPLIER_DIANHUAHAOMA: '手机号', // 电话号码
    ZYGDCGSGJLSZQS:"主要股东（超过十个仅列示至前十）",
    QSRTHYY:"请输入退回原因",
    "自动创建":"自动创建",
    "手动创建":"手动创建",
    SFCXGSSTJXSYSJ:"是否冲销该搜索条件下所有数据？",
    "已取消状态不能点击退回":"已取消状态不能点击退回",
    "所选数据已为退回状态不能再次退回":"所选数据已为退回状态，不能再次退回",
    "所选数据已为转派状态不能再次转派":"所选数据已为转派状态，不能再次转派",
    "所选数据已为已取消状态不能再次取消":"所选数据已为已取消状态，不能再次取消",
    "舆情概览":"舆情概览",
    "舆情列表":"舆情列表",
    "报表统计":"报表统计",
    "组织机构代码":"组织机构代码",
    "内容分类":"内容分类",
    "发布日期起止":"发布日期起止",
    "仅看我关注的供应商":"仅看我关注的供应商",
    "我关注的供应商":"我关注的供应商",
    "舆情拉取范围设置":"舆情拉取范围设置",
    "舆情供应商设置":"舆情供应商设置",
    "设置":"设置",
    "移除":"移除",
    "供应商简称": '供应商简称',
    "加入关注时间":"加入关注时间",
    "订阅状态":"订阅状态",
    "情感状态":"情感状态",
    "情感类型":"情感类型",
    "消极":"消极",
    "中立":"中立",
    "积极":"积极",
    "添加来源":"添加来源",
    "添加时间起止":"添加时间起止",
    "舆情供应商清单":"舆情供应商清单",
    "添加时间":"添加时间",
    "情感状态不能为空":"情感状态不能为空",
    "请选择需删除的舆情供应商清单":"请选择需删除的舆情供应商清单",
    "确认取消订阅？":"确认取消订阅？",
    "添加关注供应商":"添加关注供应商",
    "请选择需要添加的舆情供应商":"请选择需要添加的舆情供应商",
    "确认移除":"确认移除？",
    "请选择需要移除的供应商":"请选择需要移除的供应商",
    "标题":"标题",
    "分类":"分类",
    "发布日期":"发布日期",
    "设置供应商":"设置供应商",
    "请选择需删除的内容":"请选择需删除的内容",
    "添加舆情供应商":"添加舆情供应商",
    "请填写完以下信息":"请填写完以下信息",
  }
  i18n.setLocaleMessage('zh', oldLanguage)
})
