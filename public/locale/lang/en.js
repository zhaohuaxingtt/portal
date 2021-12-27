;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('i18n')))
    : typeof define === 'function' && define.amd
    ? define(['i18n'], factory)
    : ((global = global || self), factory(window.i18n))
})(this, function (i18n) {
  'use strict'
  var oldLanguage = {
    delete: 'delete',
    deleteSure: 'are you sureAre you sure you want to do this?',
    all: 'all',
    search: 'search',
    setting: 'setting',
    pagination: {
      prev: 'prev',
      next: 'next',
      goto: 'go to'
    },
    topLayout: {
      setting: {
        personal: 'personal settings',
        admin: 'admin settings'
      },
      message: {
        notice: 'notice',
        message: 'message'
      }
    },
    partsign: {
      enquiry: 'enquiry',
      volume: 'volume',
      log: 'log'
    },
    staffManagement: {
      OTHERJOBS: 'Other Jobs',
      DELETE: 'Delete',
      EDIT: 'Edit',
      ROLEOFINFORMATION: 'Role Of Information',
      NEW: 'New',
      RESET: 'Reset',
      CONFIRM: 'Confirm',
      NEW_EMPLOYEE: 'New Employee',
      SUPERIOR_INFORMATION: 'Superior Information',
      SUBORDINATE_INFORMATION: 'Subordinate Information',
      SUPERIOR_AND_SUBORDINATE_INFORMATION:
        'Superior And Subordinate Information',
      EXPORT: 'Export',
      INPUT_PLACEHOLDER: 'Input Placeholder',
      SELECT_PLACEHOLDER: 'Select Placeholder',
      EMPLOYEENUMBER: 'Employee Number',
      CHINESENAME: 'Chinese Name',
      ENGLISHNAME: 'English Name',
      SEX: 'Sex',
      DEPARTMENT: 'Department',
      JOBS: 'Jobs',
      STATEEMPLOYEES: 'State Employees',
      EMAIL: 'Email',
      MOBILEPHONE: 'Mobile Phone',
      PHONE: 'Phone',
      ATTRIBUTE: 'Sttribute',
      EMPLOYEESLABEL: 'Employees Label',
      BASICINFORMATION: 'Basic Information',
      DEFAULTPURCHASEGROUPLIST: 'Default Purchase Group List',
      THESERIALNUMBER: 'The Serial Number',
      PURCHASINGGROUP: 'Purchasing Group',
      DESCRIBE: 'Describe',
      TEMPORARYPRICECONTRACTFORPRODUCTION:
        'Temporary Price Contract For Production',
      NOTE: 'Note',
      NATIONALITY: 'Nationality',
      RECENTLYTHELOGIN: 'Recently The Login'
    },
    partsprocure: {
      PARTSPROCURENEWPROCUREMENTPROJECT: 'New Procurement Project',
      PARTSPROCUREGENERATEFSGSNR: 'Generate FSNR/GSNR/SPNR',
      PARTSPROCURECANCELPARTSPURCHASE: 'Cancel Parts Purchase',
      PARTSPROCUREBATCHMAINTENANCE: 'Batch Maintenance',
      PARTSPROCURESTARTINQUIRY: 'Start Inquiry',
      PARTSPROCURETRANSFER: 'Transfer',
      PARTSPROCUREFSNFGSNFSPNR: 'FSNR/GSNR/SPNR',
      PARTSPROCUREPARTNUMBER: 'Number',
      PARTSPROCUREPARTNAMEZH: 'Name (ZH)',
      PARTSPROCUREPARTNAMEDE: 'Name (DE)',
      PARTSPROCUREPURCHASINGFACTORY: 'Purchasing Factory',
      PARTSPROCUREPARTITEMTYPE: 'Item Type',
      PARTSPROCUREVEHICLECATEGORIES: 'Vehicle Categories',
      PARTSPROCUREMODELPROJECT: 'Model Project',
      PARTSPROCUREPARTSTATUS: 'Part Status',
      PARTSPROCURESTATUS: 'Status',
      PARTSPROCUREINQUIRYBUYER: 'Inquiry Buyer',
      PARTSPROCURELINIE: 'Linie',
      PARTSPROCURECF: 'Cf',
      PARTSPROCURE: 'Please Enter The Number, Separated By Multiple Commas',
      PLEENTER: 'Please Enter',
      CHOOSE: 'Please Choose',
      CF: 'CF',
      PARTSPROCUREPARTSTATUSNAME: 'Project Status'
    },
    partsignLanguage: {
      XunYuanZhiXing: 'Sourcing Operation', //寻源执行
      JinDuJianKong: 'Progress Monitor', //进度监控
      LingJianQianShou: 'Part sheet sign in', //零件签收
      CaiGouXiangMuJianLi: 'Create Sourcing Project', //采购项目建立
      RfqguanLi: 'Rfq Management', //RFQ管理
      DingDianGuanLi: 'Nomination Management', //定点管理
      RiZhi: 'Log', //日志
      LingJianHao: 'Part No.', //零件号
      LingJianMingChengZH: 'Name (zh)', //零件名称（中）
      SheJiKeShi: 'TP dept.', //设计科室
      GongChengShi: 'TP owner', //工程师
      CheXingXiangMu: 'Car Model', //车型项目
      XinXiDanFenLei: 'Sheet type', //信息单分类
      XinXiDanZhuangTai: 'Sheet Status', //信息单状态
      XinXiDanLiuShuiHao: 'TP sequence ID', //信息单流水号
      XunJiaZiLiaoZhuangTai: 'Inquiry Document Status', //询价资料状态
      MeiCheYongLiangZhuangTai: 'Quantity per car status', //每车用量状态
      QingShuRu: 'Please Enter', //请输入
      QingXuanZe: 'Please Choose', //请选择
      QueRen: 'Confirm', //确认
      ZhongZhi: 'Reset', //重置
      XinJianXinXiDanQianShou: 'Receipt Of New Information Sheet', //新件信息单签收
      ZhuanPai: 'Reassigned', //转派
      QianShou: 'Sign in', //签收
      TuiHui: 'Return', //退回
      LingJianMingZH: 'Part Name (Cn)', //零件名（中）
      LingJianMingDE: 'Part Name (Ger)', //零件名（德）
      XinXiDanLeiXing: 'Information Sheet Type', //信息单类型
      XianShiDiTiaoDaoTiaoJiLuGongTiaoJiLu:
        'Display Records From Records To Records In Total', //显示第    条到    条记录，共    条记录
      ShangYiYe: 'Previous Page', //上一页
      XiaYiYe: 'Next Page', //下一页
      QianWangYe: 'Go To Page' //前往    页
    },

    /*
            <!------------------------------------------------------------------------>
            <!--                                                                   --->
            <!------------------------------------------------------------------------>
            */

    LK_CAIGOUFENEFENPEIDABUDAO:
      'Procurement share allocation cannot reach 100%', // 采购份额分配达不到100%
    LK_CAIGOUGONGCHNEGMINGCHENG: 'Name of Purchasing Factory', // 采购工厂名称
    LK_CAOZUOCHENGGONG: 'Operation is successful', // 操作成功
    LK_CHANLIANGZHANBI: 'Output ratio (%)', // 产量占比（%）
    LK_CAIGOUFENEFENPEIWEIDADAO:
      'The current allocation has not reached 100%, please reallocate!', // 当前分配未达到100%，请重新分配！
    LK_CAIGOUFENEFENPEIWEIDADAODANGQIAN:
      'The current allocation does not reach 100%. There is a 0 condition in the current allocation factory. Please reassign it!', // 当前分配未达到100%，请重新分配！
    LK_CAIGOUFENEFENPEICHAOGUO:
      'The current allocation has exceeded 100%, please reallocate!', // 当前分配已超过100%，请重新分配！
    LK_DENGLU: 'Login', // 登录
    LK_GONG: 'total', // 共
    LK_MEIYOUKEYIXIAZHAIDEXINXI:
      'There is no information available for download', // 没有可以下载的信息
    LK_MIMA: 'PassWord', // 密码
    LK_HAIWEIXUANZHEGONGCHANG: 'You have not selected a factory yet!', // 您还未选择工厂！
    LK_QINGCHU: 'Remove', // 清除
    LK_QINGTIANXIELIYOUSHURUKUANGBITIAN:
      'Please fill in the reason. This input box is required', // 请填写理由，该输入框为必填
    LK_QINGXUANZHEMEICHEYONGLIANGZHUANGTAI:
      'Please select the quantity per car status', // 请选择每车用量状态
    LK_QINGXUANZHEXIANCAILIAOZU: 'Please Select', // 请选择先材料组
    LK_QINGXUANZHEXINXIDANZHUANGTAI: 'Please select the part sheet status', // 请选择信息单状态
    LK_QINGXUANZHEXUYAODAOCHUDEMEINIANYONGCHELIANG:
      'Please select the amount per vehicle to be exported', // 请选择需要导出的每车用量
    LK_QINGXUANZHEXUYAODAOCHURIZHI:
      'Please select the logs that you want to export', // 请选择需要导出的日志
    LK_QINGXUANZHEXUYAOSHANCHUYOUJIAN:
      'Please select the attachment you want to delete', // 请选择需要删除的附件
    LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN:
      'Please select the attachment you want to download', // 请选择需要下载的附件
    LK_QINGXUANZHEXUYAOXIAZHAIWENJIAN:
      'Please select the file you want to download', // 请选择需要下载文件
    LK_QINGXUANZHEXUYAOXIUGAIDELINGJIANCAIGOUXIANGMU:
      'Please select the part purchase item to be modified', // 请选择需要修改的零件采购项目
    LK_QINGXUANZHEXUNJIACAIGOUYUAN: 'Please select the forward buyer', // 请选择询价采购员
    LK_QINGXUANZHEXUNJIAZILIAOZHUANGTAI: 'Please select inquiry data status', // 请选择询价资料状态
    LK_QINGXUANZHEYITIAOJIHUAGENGXIN: 'Please select a plan to update to RFQ', // 请选择一条计划更新至询价产量
    LK_QINGXUANZHEYITIAOXUYAOQUEREDEBANBEN:
      'Please select a version that you want to confirm', // 请选择一条需要确认的版本
    LK_QUESHICAILIAOZUBIANHAOETC:
      'The category group number is missing. Please first set the category group corresponding to the part', // 缺失材料组编号，请先设置零件对应的材料组
    LK_QUESHIYOUXIAODEGONGYIZUID: 'A valid process group ID is missing', // 缺失有效的工艺组id
    LK_QUESHIYOUXIAODELINGJIANBIANHAO: 'A valid part number is missing', // 缺失有效的零件编号
    LK_SHANCHUCHENGGONG: 'Delete the success', // 删除成功
    LK_SHANGCHUAN: 'upload', // 上传
    LK_SHANGCHUANCHENGGONG: 'Uploaded successfully', // 上传成功
    LK_SHANGCHUANSHIBAI: 'Upload failed', // 上传失败
    LK_TIAODI: 'to', // 条到第
    LK_TIAOJILU: 'records', // 条记录
    LK_XIANSHI: 'Displays', // 显示
    LK_XINJIANXINXIDANTUIHUI: 'New piece of information sheet returned', // 新件信息单退回
    LK_YIQIANSHOU: 'Have been signed', // 新件信息单退回
    LK_XINJIANXINXIDANZHUANPAI: 'Delivery of new pieces of information', // 新件信息单转派
    LK_XIUGAICHENGGONG: 'Modify the success', // 修改成功
    LK_YITUIHUI: 'Returned', // 以退回
    LK_YONGHUMING: 'UserName', // 用户名
    LK_ZHUANPAICHENGGONG: 'Turn sent successfully', // 转派成功
    LK_AEKOHAO: 'Aeko No.', //Aeko号
    LK_BDLLIEBIAO: 'BDL List', //BDL列表
    LK_BMG: 'BMG', //BMG
    LK_BOMDANXINXI: 'BOM information', //BOM单信息
    LK_CBDSHEZHI: 'CBD Setting', //CBD设置
    LK_CBDXUANZE: 'CBD choice', //CBD选择
    LK_CFFUZEREN: 'CF Owner', //CF负责人
    LK_CFKONGZHIYUAN: 'CF Controller', //CF控制员
    LK_CS_1BEIZHU: 'CS*1 Remark', //CS*1备注
    LK_CS_1SHANGHUIBEIZHU: 'CS*1 meeting remark', //CS*1上会备注
    LK_CSFPFUZEREN: 'CSF（P）Owner', //CSF（P）负责人
    LK_FS_GSHAO: 'FS/GS No.', //FS/GS号
    LK_FS_GS_SP: 'FS/GS/SP No', //FS号
    LK_INBOUNDWULIUFANGSHI: 'INBOUND Logistics Mode', //INBOUND物流方式
    LK_LINIE: 'LINIE', //LINIE
    LK_LINIEBEIZHU: 'Linie Remark', //Linie备注
    LK_LINIEBUMEN: 'Linie Department', //LINIE部门
    LK_LINIESHANGHUIBEIZHU: 'Linie meeting remark', //Linie上会备注
    LK_MBDL: 'MBDL', //MBDL
    LK_MQPINGFENZHUANGTAI: 'MQ Rating Status', //MQ评分状态
    LK_MTZLINGJIAN: 'MTZ Parts', //MTZ零件
    LK_RFQBIANHAO: 'RFQ number ', //RFQ编号
    LK_RFQGUANLI: 'RFQ Management', //RFQ管理
    LK_RFQLEIXING: 'RFQ type', //RFQ类型
    LK_RFQLIST: 'RFQ List', //RFQ列表
    LK_RFQLINGJIANHUOZHERFQGONGYINGSHANGWEIKONG:
      'The RFQ part or RFQ supplier is empty and cannot create RFQ rounds', //RFQ零件或者RFQ供应商为空，不能创建RFQ轮次
    LK_RFQMINGCHENG: 'RFQ name', //RFQ名称
    LK_RFQMINGCHNEGBUNENGWEIKONG: 'The RFQ name cannot be empty', //RFQ名称不能为空
    LK_RFQZHUANGTAI: 'RFQ status', //RFQ状态
    LK_RFQZONGHEGUANLI: 'RFQ comprehensive management', //RFQ综合管理
    LK_RWJIA: 'RW Price', //RW价
    LK_SAICVOLKSWAGENKONGXIANGCAOZUO_XIAOSHI: 'SVW Empty Container_Hour', //SAIC VOLKSWAGEN空箱操作_小时
    LK_SAICVOLKSWAGENKUCUN_XIAOSHI: 'SVW Stock_Hour', //SAIC VOLKSWAGEN库存_小时
    LK_SOPRIQI: 'SOP Date', //SOP日期
    LK_SUM: 'SUM', //SUM
    LK_SVWYAOQIUEMZHOU: 'SVW required EM (week)', //SVW要求EM（周）
    LK_SVWSHIMO: 'SVW requires the first trial', //SVW要求EM（周）
    LK_SVWYAOQIUOTSZHOU: 'SVW required OTS (week)', //SVW要求OTS（周）
    LK_SVWYAOQIUSHOUCISHIMO: 'SVW require First tryout', //SVW要求首次试模
    LK_SWHAO: 'sw No.', //sw号
    LK_TPPINGFENZHUANGTAI: 'TP Rating Status', //TP评分状态
    LK_BANBENHAO: 'Version No.', //版本号
    LK_BANBENZHUANGTAI: 'Version Status', //版本状态
    LK_BAOZHUANGFUZEREN: 'Package Authority', //包装负责人
    LK_BAOCUN: 'Save', //保存
    LK_BAOCUNBINGCHUANGJIAN: 'Save and Create', //保存并创建
    LK_BAOJIAJIEZHIRIQI: 'Quotation deadline', //报价截止日期
    LK_RFQQUOTATIONDEADLINE: 'Deadline', //报价截至日期
    LK_NINDANGQIANHAIWEIXUANZE: 'Sorry, you have not selected yet!', //抱歉！您当前还未选择！
    LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN:
      'Sorry, Forward Buyer not selected!', //抱歉！您当前还未选择询价采购员！
    LK_BEIZHUBUNENGWEIKONG: 'Sorry, notes cannot be empty!', //抱歉，备注不能为空！
    LK_CICHUBIXUXUANZEYITIAOGONGYIZUSHUJU:
      'Sorry, Please select a craft group data here!', //抱歉，此处必须选择一条工艺组数据
    LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININQIDONGXUNJIA:
      'Sorry, this Project has ungenerated FSNR, unable to start inquiry', //抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您启动询价！
    LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININTIANJIA:
      'Sorry, this Project has ungenerated FSNR, unable to add', //抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您添加！
    LK_LIYOUBUNENGWEIKONG: 'Sorry, reason cannot be empty', //抱歉，理由不能为空！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOQIANSHOUDEXINXIDAN:
      'Sorry, no TP records to be signed is selected', //抱歉，您当前还未选择您需要签收的信息单！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOQUXIAODELINGJIANCAIGOUXIANGMU:
      'Sorry, no TP records to be cancelled is selected', //抱歉，您当前还未选择您需要取消的零件采购项目！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGCHENGFSHAODELINGJIANCAIGOUXIANGMU:
      'Sorry, no Project is selected to generate FS number!', //抱歉，您当前还未选择您需要生成FS号的零件采购项目！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGPILIANGWEIHUDEXIANGMU:
      'Sorry, no project to batch maintain is selected!', //抱歉，您当前还未选择您需要生批量维护的项目！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOTUIHUIDEXINXIDAN:
      'Sorry, no TP records to be rejected is selected!', //抱歉，您当前还未选择您需要退回的信息单！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDELINGJIANCAIGOUXIANGMU:
      'Sorry, no project to be reassign is selected!', //抱歉，您当前还未选择您需要转派的零件采购项目！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEPINGFENRENWU:
      'Sorry, no rating task to be reassign is selected!', //抱歉，您当前还未选择您需要转派的评分任务！
    LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEXINXIDAN:
      'Sorry, no TP records to be reassign is selected!', //抱歉，您当前还未选择您需要转派的信息单！
    LK_NINDANGQIANHAIWEIXUANZERENWU: 'Sorry, you have not selected a task yet!', //抱歉，您当前还未选择任务！
    LK_NINDANGQIANHAIWEIXUANZEXUYAOQIDONGXUNJIADECAIGOUXIANGMU:
      'Sorry, no project to initiate inquiry is selected!', //抱歉，您当前还未选择需要启动询价的采购项目！
    LK_NOTCHOUSEDELETEPROJECT: '抱歉！您还未选择您需要删除的采购项目。', //抱歉您还未选择您需要删除的采购项目
    LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU:
      'Sorry, no projects to apply for target price is selected!', //抱歉，您当前还未选择需要申请目标价的采购项目！
    LK_NINDANGQIANHAIWEIXUANZEXUYAOTIANJIADECAIGOUXIANGMU:
      'Sorry, no project to be added is selected!', //抱歉，您当前还未选择需要添加的采购项目！
    LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU:
      'Selections contain signed records, unable to batch sign in!', //抱歉，您选中的单据中存在已签收的信息单，不能批量签收！
    LK_YONGHUMINGHUOMIMABUNENGWEIKONG: 'User name or password cannot be empty!', //抱歉，用户名或密码不能为空！
    LK_BEIZHU: 'Notes', //备注
    LK_BEIZHUXINXI: 'Remarks Info.', //备注信息
    LK_BEIDAITILINGJIAN: 'Replaced Part', //被代替零件
    LK_BEITIDAILINGJIAN: 'Replaced Parts', //被替代零件
    LK_BENLUNBAOJIAJIEZHISHIJIAN: 'Round Quotation deadline', //本轮报价截止时间
    LK_BENLUNBAOJIAQIZHISHIJIAN:
      'Starting and ending date of the current quotation', //本轮报价起止时间
    LK_BENLUNZHUANGTAI: 'Current Round Status', //本轮状态
    LK_BIANHAO: 'No.', //编号
    LK_BIANJI: 'Edit', //编辑
    LK_BIANSUXIANGLEIXING: 'Transmission Type', //变速箱类型
    LK_BIANSUXIANGPEIZHI: 'Gearbox Configuration', //变速箱配置
    LK_BUNENGSHANCHUZHISHAOBAOLIUYITIAO: 'Can not delete, at least keep one!', //不能删除，至少保留一条!
    LK_BUMENBIANHAO: 'Department No.', //部门编号
    LK_BUMENPINGFENLEIXING: 'Department Rating Type', //部门评分类型
    LK_CAILIAO: 'Material', //材料
    LK_CAILIAOGONGYIZUMINGCHENGDE: 'Craft(De)', //材料工艺组名称（德）
    LK_CAILIAOGONGYIZUMINGCHENGZHONG: 'Craft(Cn)', //材料工艺组名称（中）
    LK_CAILIAOZU: 'Stuff Gategory', //材料组
    LK_CAILIAOZULINEBUMEN: "Dept. of the owner of the part's material group", //材料组LINE部门
    LK_CAILIAOZUBIANHAO: 'Material Group Code', //材料组编号
    LK_CAILIAOZUGONGYIBIANHAO: 'Stuff Gategory Stuffcode', //材料组工艺编号
    LK_CAILIAOZUGONGYISHEZHI: 'Stuff Gategory Setting', //材料组工艺设置
    LK_CAILIAOZUMINGCHENGDE: 'Stuff Name (De)', //材料组名称（德）
    LK_CAILIAOZUMINGCHENGZHONG: 'Stuff Name (Zh)', //材料组名称（中）
    LK_CAILIAOZUXINXI: 'Material Group Information', //材料组信息
    LK_CF: 'CF', //财务控制员
    LK_CAIWUMUBIAOJIA: 'CF Target Price', //财务目标价
    LK_CAIGOUGONGCHANG: 'Purchasing Factory', //采购工厂
    LK_CAIGOUTIAOKUAN: 'Purchasing Terms', //采购条款
    LK_CAIGOUXIANGMUJIANLI: 'Create Sourcing Project', //采购项目建立
    LK_CAIGOUXIANGMUXINXI: 'Project Information', //采购项目信息
    LK_CAIGOUYUAN: 'Buyer', //采购员
    LK_CAIGOUYUANGONGHAO: "Buyer's job number", //采购员工号
    LK_CANKAOBAOZHUANG: 'Reference Packaging', //参考包装
    LK_CANKAOBAOZHUANGDANJIAYUAN: 'Reference Unit Packaging Price (Yuan)', //参考包装单价（元）
    LK_CANKAOBAOZHUANGGAOMM: 'Reference packaging height (mm)', //参考包装高（mm）
    LK_CANKAOBAOZHUANGKUANMM: 'Reference Packaging - Width (mm)', //参考包装宽（mm）
    LK_CANKAOBAOZHUANGQIJULEIXING: 'Reference Packaging Equipment Type', //参考包装器具类型
    LK_CANKAOBAOZHUANGZHANGMM: 'Reference Packaging - Length (mm)', //参考包装长(mm)
    LK_CANKAOCHANLIANGJISHIJIANJIHUA: 'Volume reference and Time Schedule', //参考产量及时间计划
    LK_CANKAOCHEXING: 'Reference Model', //参考车型
    LK_CANKAOLINGJIANHAO: 'Reference Parts No.', //参考零件号
    LK_CANKAOLINGJIANMING: 'Reference Part Name', //参考零件名
    LK_CAOZUO: 'Operation', //操作
    LK_CAOZUOREN: 'Operator', //操作人
    LK_UpdateDate: 'Operating time', //操作时间
    LK_CHAKAN: 'To view', //查看!
    LK_CHAKANQUANBUBANBEN: 'View All Versions', //查看全部版本
    LK_INQUIRE: 'Query', //查询
    LK_CHAZHAOGONGYIZUGONGYINGSHANG: 'Find Craft Group Supplier', //查找工艺组供应商
    LK_CHAIFENCAIGOUGONGCHANG: 'Split Procurement Factory', //拆分采购工厂
    LK_CHANLIANGPC: 'Volume(PC)', //产量（PC）
    LK_CHANGJIANGMINGCHNEG: 'Task Name', //场景名称/任务名称
    LK_CHANGJINGMINGCHENGRENWUMINGCHENG: 'Task Name', //场景名称/任务名称
    LK_CHEXING: 'Car Type', //车型
    LK_CHEXINGDALEI: 'Model', //车型大类
    LK_CHEXINGDENGJI: 'Car Level', //车型等级
    LK_CHEXINGSHENGCHANNIANXIAN: 'Car Production Life', //车型生产年限
    LK_CHEXINGXIANGMU: 'Project', //车型项目
    LK_CHEXINGXIANGMU0S: 'Project 0S', //车型项目0S
    LK_CHEXINGXIANGMUPVS: 'Project PVS', //车型项目PVS
    LK_CHEXINGXIANGMUSOP: 'Project SOP', //车型项目SOP
    LK_CHEXINGXIANGMUMINGCHENG: 'Project Name', //车型项目名称
    LK_CHEHUI: 'Withdraw', //撤回
    LK_CHENGBEN: 'Cost', //成本
    LK_CHICUN: 'Dimension', //尺寸
    LK_CHUANGJIANDINGDIANSHENQING: 'Create SQO Application', //创建定点申请
    LK_CHUANGJIANRENGONGHAO: 'Creator Employee No.', //创建人工号
    LK_CHUANGJIANRENXINGMING: 'Creator Name', //创建人姓名
    LK_CHUANGJIANRIQI: 'Creation date', //创建日期
    LK_CHUANGJIANSHIJIAN: 'Creation Time', //创建时间
    LK_CONGLINGJIANPAISHENG: 'Created from part', //从零件派生
    LK_DAXIAOMB: 'Size(MB)', //大小（MB）
    LK_DAIBANSHIXIANG: 'To-Do List', //待办事项
    LK_DAIQUERENBANBEN: 'Unconfirmed Version', //待确认版本
    LK_DANWEI: 'Unit', //单位
    LK_DANGQIANBANBEN: 'Current Version', //当前版本
    LK_DANGQIANLUNCI: 'Current round', //当前轮次
    LK_DAOCHU: 'Export', //导出
    LK_DAORUSHIJIAN: 'Import time', //导入时间
    LK_DENGJIPEIZHI: 'Level Configuration', //等级配置
    LK_DIANJISHANGCHUAN: 'Click to Upload', //点击上传
    LK_DIANCHIRONGLIANG: 'Battery Capacity', //电池容量
    LK_DIANCHIYONGLIANG: 'Battery Usage', //电池用量
    LK_DINGDIANGUANLI: 'Nomination Management', //定点管理
    LK_DUQUYOUXIAODOM: 'Load Valid BOM', //读取有效BOM
    LK_DUQUYOUXIAOBOM: 'Load Valid BOM', //读取有效BOM
    LK_FACHUXUNJIA: 'RFQ send out', //发出询价
    LK_FADONGJILEIXING: 'Engine Type', //发动机类型
    LK_FADONGJIPEIZHI: 'Engine Configuration', //发动机配置
    LK_FASHENGSHIJIAN: 'Happening time', //发生时间
    LK_FASONGXUNJIA: 'Send Inquiry', //发送询价
    LK_FASONGZHIWODEYOUXIANG: 'Send to my mailbox', //发送至我的邮箱
    LK_FANXIANGQIANBAOZHUANGMAOZHONGKG:
      'Package Gross Weight before repacking(KG)', //翻箱前包装毛重（KG）
    LK_FANXIANGQIANJICHUNIANWEIXIULÜ: 'Equipment Annual Repair Base Rate', //翻箱前基础年维修率
    LK_FANXIANGQIANQIJUFANCHENGSHEDIEBI:
      'Equipment Return Fold Ratio before repacking', //翻箱前器具返程折叠比
    LK_FANXIANGQIANQIJUGAOMM: 'Equipment Height before repacking', //翻箱前器具高（mm）
    LK_FANXIANGQIANQIJUHAO: 'Equipment No. before repacking', //翻箱前器具号
    LK_FANXIANGQIANQIJUKUANMM: 'Equipment Width before repacking', //翻箱前器具宽（mm）
    LK_FANXIANGQIANQIJULEIXING: 'Equipment Type before repacking', //翻箱前器具类型
    LK_FANXIANGQIANQIJUSHOUMING: 'Equipment Life before repacking', //翻箱前器具寿命
    LK_FANXIANGQIANQIJUSHU: 'Equipment Price before repacking(RMB)', //翻箱前器具数
    LK_FANXIANGQIANQIJUZHANGMM: 'Equipment Length before repacking', //翻箱前器具长（mm）
    LK_FANXIANGQIANQIJUZONGHEDANJIARMB:
      'Equipment Price before repacking(RMB)First', //翻箱前器具综合单价（RMB）
    LK_FANXIANGQIANQIJUZUJINRMBDAY: 'Equipment Rent before repacking(RMB/DAY)', //翻箱前器具租金（RMB/DAY）
    LK_FANHUI: 'Back', //返回
    LK_FUZEREN: 'Person in Charge', //负责人
    LK_FUZERENDIANHUA: 'Person in Charge‘s telephone', //负责人电话
    LK_FUZERENYOUXIANG: 'Person in Charge‘s email', //负责人邮箱
    LK_FUJIANLIEBIAO: 'Attachment List ', //附件列表
    LK_GENGXINYUANYIN: 'Update Reason', //更新原因
    LK_GENGXINZHIXUNJIACHANLIANG: 'Update to Enquiry Volume', //更新至询价产量
    LK_GONGCHENGSHI: 'TP owner', //工程师
    LK_GONGYI: 'Craft', //工艺
    LK_GONGYIHAO: 'Craft Number', //工艺号
    LK_SHENGMINGJISHUBANBEN:
      'Display Public UI Components, Based on second seal of element, current element version', //公共UI组件展示界面，基于element的二次封装，当前element版本
    LK_GONGGONGUIZUJIANZHANSHIJIEMIANJIYUELEMENTDEERCIFENGZHUANGDANGQIANELEMENTBANBEN:
      'Display Public UI Components, Based on second seal of element, current element version', //公共UI组件展示界面，基于element的二次封装，当前element版本
    LK_GONGHUOFANGSHI: 'Supply Style', //供货方式
    LK_GONGYINGSHANG360SHITU: 'Supplier 360° View', //供应商360°视图
    LK_GONGYINGSHANGSAPHAO: 'Supplier SAP ID', //供应商SAP号
    LK_GONGYINGSHANGTIMELINE: 'Supplier timeline', //供应商timeline!
    LK_GONGYINGSHANGCAILIAOZHUNBEI: "Supplier's material preparation", //供应商材料准备
    LK_GONGYINGSHANGCHANPINGAIYAO: 'Supplier Product Profile', //供应商产品概要!
    LK_GONGYINGSHANGGONGSIJIESHAO: 'Supplier Company Introduction', //供应商公司介绍!
    LK_GONGYINGSHANGMING: 'Supplier', //供应商名
    LK_GONGYINGSHANGMINGCHENG: 'Supplier', //供应商名称
    LK_GONGYINGSHANGPINGFEN: 'Supplier Rating', //供应商评分
    LK_GONGYINGSHANGPINGFENFUJIAN: 'Supplier Rating Attachment', //供应商评分附件
    LK_GONGYINGSHANGSHENGCHANCHANGDI: 'Supplier Manufacturing Spot', //供应商生产场地
    LK_GUANBIRFQ: 'Close RFQ', //关闭RFQ
    LK_HUIYIDIDIAN: 'Meeting place', //会议地点
    LK_HUIYIJIBENXINXI: 'Basic information about the meeting', //会议基本信息
    LK_HUIYIQITAXINXI: 'other information for the meeting', //会议其它信息
    LK_HUIYISHIJIAN: 'Meeting time', //会议时间
    LK_HUOBI: 'Currency', //货币
    LK_JICHUXINXI: 'Basic information', //基础信息
    LK_JIHUORFQ: 'Activate RFQ', //激活RFQ
    LK_JISHUJIAOLIUHUI: 'Techonology Meeting', //技术交底会
    LK_EP: 'EP', //技术评分人
    LK_JIAGEMINGXI: 'Price Details', //价格明细
    LK_JIAOFU: 'Delivery', //交付
    LK_JIESHUBENLUNXUNJIA: 'Finish RFQ round', //结束本轮询价
    LK_JIESHUXIANGMU: 'Terminate', //结束项目
    LK_JINRIDAIBAN: 'Due Today', //今日待办
    LK_JINDUJIANKONG: 'Progress Monitor', //进度监控
    LK_JUJUE: 'Reject', //拒绝
    LK_KAISHINIANFEN: 'Start Year', //开始年份
    LK_LISHISHIYONGGAILÜ: 'Historical Applicable Rate', //历史适用概率
    LK_LIRUMENJING:
      'For example, the procedures for the application of baggage ban, other remarks information, etc', //例如：⻔禁申请步骤，其他备注信息等
    LK_LINGJIANCAIGOUXIANGMU: 'Parts Project', //零件采购项目
    LK_LINGJIANCAIGOUXIANGMUGUANLI: 'Parts Project Management', //零件采购项目管理
    LK_LINGJIANCAIGOUXIANGMULEIXING: 'Parts Project Type', //零件采购项目类型
    LK_LINGJIANCAIGOUXIANGMUZHUANPAI: 'Parts procurement project transfer', //零件采购项目转派
    LK_LINGJIANCHANLIANG: 'Parts Yield', //零件产量
    LK_LINGJIANCHANLIANGJIHUA: 'Parts Volume Plan', //零件产量计划
    LK_LINGJIANCHANLIANGJILU: 'Parts Production Record', //零件产量记录
    LK_LINGJIANHAO: 'Part No.', //零件号
    LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN: 'Parts No./FSNR/RFQ No./Buyer', //零件号/FSNR/RFQ编号/采购员
    LK_LINGJIANHAODIERBUFEN: '2nd part of part no.', //零件号第二部分
    LK_LINGJIANHAODISANBUFEN: '3rd part of part no.', //零件号第三部分
    LK_LINGJIANHAODISIBUFEN: '4th part of part no.', //零件号第四部分
    LK_LINGJIANHAODIWUBUFEN: '5th part of part no.', //零件号第五部分
    LK_LINGJIANHAODIYIBUFEN: '1st part of part no.', //零件号第一部分
    LK_LINGJIANJIAGONGCHENGDUDE: 'Part processing status desc.(De)', //零件加工程度(德)
    LK_LINGJIANJIAGONGCHENGDUYING: 'Part processing status desc.(En)', //零件加工程度(英)
    LK_LINGJIANJIAGONGCHENGDUZHONG: 'Part processing status desc.(Cn)', //零件加工程度(中)
    LK_LINGJIANJIAGONGCHENGDUDAIMA: 'Part processing status Code', //零件加工程度代码
    LK_LINGJIANLEIXING: 'Type Maintenance', //零件类型
    LK_LINGJIANLEIXINGDAIMA: 'Part Type Code', //零件类型代码
    LK_LINGJIANMAOYISHUXINGDAIMA: 'Part Trade Property Code', //零件贸易属性代码
    LK_LINGJIANMAOYISHUXINGMIAOSHUDE: 'Parts Trade Property Desc.(De)', //零件贸易属性描述(德)
    LK_LINGJIANMAOYISHUXINGMIAOSHUYING: 'Parts Trade Property Desc.(En)', //零件贸易属性描述(英)
    LK_LINGJIANMAOYISHUXINGMIAOSHUZHONG: 'Parts Trade Property Desc.(Cn)', //零件贸易属性描述(中)
    LK_LINGJIANMEICHEYONGLIANG: 'Parts quantity per car status', //零件每车用量
    LK_LINGJIANMINGDE: 'Part Name(Ger)', //零件名（德）
    LK_LINGJIANMINGYING: 'Part Name(En)', //零件名（英）
    LK_LINGJIANMINGZHONG: 'Part Name (Cn)', //零件名（中）
    LK_LINGJIANMINGCHENG: 'Part Name', //零件名称
    LK_LINGJIANMINGCHENGDE: 'Part Name (De)', //零件名称（德）
    LK_LINGJIANMINGCHENGZHONG: 'Part Name (Cn)', //零件名称（中）
    LK_LINGJIANPINGTAIXINGZHIDAIMA: 'Part platform property code', //零件平台性质代码
    LK_LINGJIANPINGTAIXINGZHIMIAOSHUDE: 'Part platform property desc.(De)', //零件平台性质描述(德)
    LK_LINGJIANPINGTAIXINGZHIMIAOSHUYING: 'Part platform property desc.(En)', //零件平台性质描述(英)
    LK_LINGJIANPINGTAIXINGZHIMIAOSHUZHONG: 'Part platform property desc.(Cn)', //零件平台性质描述(中)
    LK_LINGJIANPINGFEN: 'Parts rating', //零件评分
    LK_LINGJIANQIANSHOU: 'Part sheet sign in', //零件签收
    LK_LINGJIANQINGDAN: 'Parts List', //零件清单
    LK_LINGJIANSUOSHUCAILIAOZULINIEBUMEN:
      "Part's Material Group's Linie Department", //零件所属材料组LINIE部门
    LK_LINGJIANSUOSHUCAILIAOZUDEWENMINGCHENG: "Part's Material Group Name(De)", //零件所属材料组德文名称
    LK_LINGJIANSUOSHUCAILIAOZUZHONGWENMINGCHENG:
      "Part's Material Group Name(Zh)", //零件所属材料组中文名称
    LK_LINGJIANSUOSHUGONGYIBIANHAO: "No. of the part's craft", //零件所属工艺编号
    LK_LINGJIANXIANGMULEIXING: 'Parts project type', //零件项目类型
    LK_LINGJIANYANYONGXINGZHIDAIMA: 'Part COP property code', //零件沿用性质代码
    LK_LINGJIANYANYONGXINGZHIMIAOSHUDE: 'Part COP property desc.(De)', //零件沿用性质描述(德)
    LK_LINGJIANYANYONGXINGZHIMIAOSHUYING: 'Part COP property desc.(En)', //零件沿用性质描述(英)
    LK_LINGJIANYANYONGXINGZHIMIAOSHUZHONG: 'Part COP property desc.(Cn)', //零件沿用性质描述(中)
    LK_LINGJIANZHUANGTAI: 'Parts Status', //零件状态
    LK_LUNCILEIXING: 'Round type', //轮次类型
    LK_MAOZHONGKG: 'Gross Weight (KG)', //毛重（KG）
    LK_MEICHEYONGLIANG: 'per car dosage', //每车用量
    LK_MEICHEYONGLIANGZHUANGTAI: 'Dosage state', //每车用量状态
    LK_MOJUYUSUANSHENQING: 'Model Budget Application', //模具预算申请
    LK_MUBIAOJIA: 'Target Price', //目标价
    LK_MUBIAOJIAZHUANGTAI: 'CF Target price status', //目标价状态
    LK_NIANFEN: 'Year', //年份
    LK_NINSHIFOUQUERENDUIXINJIANXINXIDANJINHANGQIANSHOU:
      'Confirm to sign the new record?', //您是否确认对新件信息单进行签收？
    LK_PEIZHIBILI: 'Configure Ratio', //配置比例
    LK_PEIZHIBIANMA: 'Configuration ID', //配置编码
    LK_PILIANGWEIHU: 'Batch maintenance', //批量维护
    LK_PILIANGWEIHULINGJIANCAIGOUXIANGMU: 'Batch maintenance', //批量维护零件采购项目
    LK_PINGFEN: 'Grade', //评分
    LK_PINGFENREN: 'Grader', //评分人
    LK_PUTONGLUNCI: 'Common Round', //普通轮次
    LK_QIWANGMUBIAOJIA: 'Expected Price', //期望目标价
    LK_QITAPEIZHI: 'Other Configuration', //其他配置
    LK_QITAXINXI: 'Other Information', //其他信息
    LK_QIDONGXIANGMU: 'Resume', //启动项目
    LK_QIDONGXUNJIA: 'Start inquiry', //启动询价
    LK_QIANSHOU: 'Sign in', //签收
    LK_QIANSHOUQUEREN: 'Confirm sign in', //签收确认
    LK_QIANSHOURIQI: 'Sign in Date', //签收日期
    LK_QIANDUANBAOZHUANGMINGCHENG: 'Equipment Height before repacking', //前段包装名称
    LK_QINGSHURU: 'Please Enter', //请输入
    LK_QINGSHURUBEIZHU: 'Please enter remarks', //请输入备注
    LK_RFQPLEASEENTERQUERY: 'Please Enter Query', //请输入查询
    LK_QINGSHURUCHANXUANGONGYINGSHANGMINGCHENG:
      'Please enter to search for supplier name, factory…', //请输入查询供应商名称
    LK_QINGSHURUCHAXUNGONGYINGSHANGMINGCHENGCHANGSHANG:
      'Please enter to search for supplier name, factory…', //请输入查询供应商名称,厂商...
    LK_QINGSHURULINGJIANHAO: 'Please Enter', //请输入零件号
    LK_QINGSHURULINGJIANMING: 'Please Enter', //请输入零件名（中）
    LK_QINGTIANJIAGONGYINGSHANG: 'Please add supplier!', //请添加供应商!
    LK_QINGTIANXIEGONGCHENGSHI: 'Please Enter', //请填写工程师
    LK_QINGTIANXIESHEJIKESHI: 'Please Enter', //请填写设计科室
    LK_QINGTIANXIEXINXIDANLIUSHUIHAO: 'Please Enter', //请填写信息单流水号
    LK_QINGXUANZE: 'Please Select', //请选择
    LK_QINGXUANZHECHEXINGXIANGMU: 'Please select vehicle type item', //请选择车型项目
    LK_QINGXUANZHEXINXIFENLEI: 'Please select the information category', //请选择信息分类
    LK_QINGXUANZHEXUYAODAOCHUBANBEN: 'Select the version you want to export', //请选择需要导出的版本
    LK_QINGXUANZHEXUYAODAOCHUSHUJU: 'Select the data you want to export', //请选择需要导出的数据
    LK_QINGXUANZHEYIGEXUYAOXIAZAIBANBEN: '', //请选择一个需要下载的版本
    LK_QUXIAO: 'Cancel', //取消
    LK_QUXIAOLINGJIANCAIGOUXIANGMU: 'Cancel Parts Purchase', //取消零件采购项目
    LK_QUXIAOYUANYIN: 'Terminate reason', //取消原因
    LK_QUANBUBANBEN: 'All Versions', //全部版本
    LK_QUEDING: 'Confirm', //确定
    LK_QUEREN: 'Confirm', //确认
    LK_RENKEZHOUQIZHOU: 'Authentication Period (Week) ', //认可周期（周）
    LK_RENWUZHONGXIN: 'Task Center', //任务中心
    LK_RIZHI: 'Log', //日志
    LK_RIHZICHAKAN: 'Show Log', //日志查看
    LK_RIZHICHAKAN: 'Show Log', //日志查看
    LK_RUCHANGBAOZHUANGMINGCHENG: 'Entry Packaging Name', //入场包装名称
    LK_RUKUBAOZHUANGMAOZHONG: 'Inbound Packaging Gross Weight (Kg)', //入库包装毛重（KG）
    LK_RUKUBAOZHUANGMAOZHONGKG: 'Inbound Packaging Gross Weight (Kg)', //入库包装毛重（KG）
    LK_RUKUJICHUNIANWEIXIUFEILV: 'Inbound Annual Repair Base Rate', //入库基础年维修费率
    LK_RUKUJICHUNIANWEIXIUFEILÜ: 'Inbound Annual Repair Base Rate', //入库基础年维修费率
    LK_RUKUQIJUFANCHENGSHEDIEBI: 'Inbound Equipment Return Fold Ratio', //入库器具返程折叠比
    LK_RUKUQIJUKUAN: 'Inbound Equipment Width (mm) ', //入库器具宽（mm）
    LK_RUKUQIJUKUANMM: 'Inbound Equipment Width (mm)', //入库器具宽（mm）
    LK_RUKUQIJULEIXING: 'Inbound Equipment Type', //入库器具类型
    LK_RUKUQIJUSHOUMING: 'Inbound Equipment Useful Life', //入库器具寿命
    LK_RUKUQIJUXINGHAO: 'Inbound Equipment ID', //入库器具型号
    LK_RUKUQIJUCHANG: 'nbound Equipment Length (mm)', //入库器具长（mm）
    LK_RUKUQIJUZHANGMM: 'Inbound Equipment Length (mm)', //入库器具长（mm）
    LK_RUKUQIJUZHUANGXIANGSHU: 'Inbound Equipment Load Number', //入库器具装箱数
    LK_RUKUQIJUZHONGHEDANJIA: 'Inbound Equipment Net Unit Price', //入库器具综合单价
    LK_RUKUQIJUZHONGHEDANJIARMB: 'Inbound Equipment Net Unit Price (RMB)', //入库器具综合单价
    LK_RUKUQIJUZUJINRMBDAY: 'Inbound Equipment Rent (RMB/Day)', //入库器具综合单价
    LK_RUKUQIJUZONGHEDANJIA: 'Inbound Equipment Net Unit Price', //入库器具综合单价
    LK_SEBIAOHAO: 'Color code', //色标号
    LK_SHANCHU: 'Delete', //删除
    LK_SHANCHUGONGYINGSHANG: 'Delete Supplier', //删除供应商
    LK_SHANGCHUANFUJIAN: 'Upload attachments', //上传附件
    LK_SHANGCHUANREN: 'Uploader', //上传人
    LK_SHANGCHUANRIQI: 'Upload date', //上传日期
    LK_SHANGQIDAZHONGYUANQU: 'Room 303, Shanghai Volkswagen Park', //上汽⼤众园区303室!
    LK_SHANGYIYE: 'Prevoius', //上一页
    LK_SHEJIGONGCHENGSHIGONGHAO: 'TP owner No.', //设计工程师工号
    LK_SHEJIGONGCHENGSHIHAO: 'TP owner No.', //设计工程师号
    LK_SHEJIGONGCHENGSHIXINGMING: 'TP Name', //设计工程师姓名
    LK_SHEJIKESHI: 'TP dept.', //设计科室
    LK_SHEZHIGONGYIZU: 'Set Craft Group', //设置工艺组
    LK_SHENQING: 'Apply', //申请
    LK_SHENQINGRWJIA: 'Apply RW Price', //申请RW价
    LK_SHENQINGBEIZHU: 'Application Remarks', //申请备注
    LK_SHENQINGCAIWUMUBIAOJIA: 'Apply CF target price', //申请财务目标价
    LK_SHENQINGLEIBIE: 'Application Type', //申请类别
    LK_SHENQINGLEIXING: 'Application Type', //申请类型
    LK_SHENQINGMUBIAOJIA: 'Apply Target Price', //申请目标价
    LK_SHENQINGRIQI: 'Application Date ', //申请日期
    LK_SHENQINGYUANYIN: 'Reason of Application', //申请原因
    LK_SHENQINGZHUANGTAI: 'Application Status', //申请状态
    LK_SHENDUGUOCHANHUABEIZHU: 'Deep localize remark', //深度国产化备注
    LK_SHENDUGUOCHANHUADAIMA: 'Deep localize code', //深度国产化代码
    LK_SHENPIYIJIAN: 'Approval Opinion', //审批意见
    LK_SHENPIZHUANGTAI: 'Approval Status', //审批状态
    LK_SHENGCHENGFS_GSNR: 'Generate FSNR/GSNR/SPNR', //生成FS/GSNR
    LK_SHENGCHENGFSHAO: 'Generate FS', //生成FS号
    LK_SHIJIANJIHUA: 'Time Schedule', //时间计划
    LK_SHIFOUERCIJIAN: 'Tier-2 or not', //是否二次件
    LK_SHIFOUJIARUYIYOURFQ: 'Confirm to add existing RFQ', //是否加入已有RFQ
    LK_CONFIRM_SIGN_RECORD_TIPS: 'Confirm to sign the new record?', //是否确认对新件信息单进行签收？
    LK_SHIFOUQUERENSHANCHU: 'Are you sure to delete?', //是否确认删除?
    LK_SHIFOUSHENDUGUOCHANHUA: 'Deep localize or not', //是否深度国产化
    LK_SHIFOUYANZHENGCBD: 'CBD verified or not', //是否验证CBD
    LK_SHIFOUZUHEXINJIANRFQ: 'Confirm to group new RFQ', //是否组合新建RFQ
    LK_ENTER_SEARCH_SUPPLIER_NAME_FACOTRY:
      'Enter to Search for Supplier Name, Facotry Type…', //输入查询供应商名称、厂商类型...
    LK_SUOXUANBANBENWUFUJIAN: '', //所选版本无附件
    LK_TANPANZHUSHOU: 'Negotiation Assistant', //谈判助手
    LK_TESHULINGJIANLEIXING: 'Special Parts Type', //特殊零件类型
    LK_TESHUYAOQIU: 'Special Requirements', //特殊要求
    LK_TIJIAO: 'Submit', //提交
    LK_TIANJIA: 'Insert', //添加
    LK_TIANJIAGONGYINGSHANG: 'Add supplier', //添加供应商
    LK_TIANJIAZIDINGYIPINGFENXIANG: 'Add defined column', //添加自定义评分项
    LK_TONGZHIQUANBUGONGYINGSHANG: 'Inform all suppliers', //通知全部供应商
    LK_TONGZHIYIBAOJIAGONGYINGSHANG: 'Inform suppliers with quotation', //通知已报价供应商
    LK_TOUZIYUSUAN: 'Investment Budget', //投资预算
    LK_TUZHI: 'Blueprint', //图纸
    LK_TUZHIHETPXIANGQINGYE: 'Blueprint and TP Information', //图纸和TP详情页
    LK_TUZHIHETPDANXIANGQING: 'Blueprint and TP Order', //图纸和信息单详情
    LK_TUZHIRIQI: 'Spec. date', //图纸日期
    LK_TUISONGSHIJIAN: 'Forwarded time', //推送时间
    LK_TUICHUDENGLU: 'Log out', //退出登录!
    LK_PROFILE: 'Profile', //个人信息
    LK_TUIHUI: 'Return', //退回
    LK_TUIHUIYUANYIN: 'Return reason', //退回原因
    LK_WAIBUKAIFAFEIYUAN: 'External Developer Cost (Yuan)', //外部开发费（元）
    LK_WEIHU: 'Maintain', //维护
    LK_WEIHUREN: 'Maintainer', //维护人
    LK_WENXINTISHI: 'Tips', //温馨提示
    LK_WENJIANDAXIAOMB: 'File Size (MB)', //文件大小（MB）
    LK_WENJIANMING: 'File Name', //文件名
    LK_WENJIANMINGCHENG: 'File Name', //文件名称
    LK_WULIUBIAOZHUN: 'Logistics Standard', //物流标准
    LK_PL: 'PL', //物流审核人
    LK_WULIUYAOQIU: 'Logistics requirement', //物流要求
    LK_XIAYIYE: 'Next', //下一页
    LK_XIAZAI: 'Download', //下载
    LK_XIANGGUANCHEXING: 'Relevent car type', //相关车型
    LK_XIANGNEIZHOUZHUANCAILIAOZONGHEJIAGE: 'Inbox turnover material price', //箱内周转材料综合价格
    LK_XIANGNEIZHOUZHUANCAILIAOZONGHESHOUMING: 'Inbox turnover material life', //箱内周转材料综合寿命
    LK_XIANGQINGXINXI: 'Detail', //详情信息
    LK_XIANGMUCHEXING: 'Project Car Type', //项目车型
    LK_XINJIANXINXIDANQIANSHOU: 'TP Apps Sign in', //新件信息单签收
    LK_XINJIANXINXILIUSHUIDANHAO: 'New Tp Sequence No.', //新件信息流水单号
    LK_XINJIANRFQ: 'Create New RFQ', //新建RFQ
    LK_XINJIANRFQLUNCI: 'Create New RFQ Round', //新建RFQ轮次
    LK_XINJIANXINXIDANBEIZHU: 'Create new part info. remark', //新建信息单备注
    LK_XINJIANXINXIDANLIUSHUIHAO: 'Part info. Sheet No.', //新建信息单流水号
    LK_XINSHENQINGCAIWUMUBIAOJIA: 'Apply New CF Target Price', //新申请财务目标价
    LK_XINXIDANFENLEI: 'Sheet type', //信息单分类
    LK_XINXIDANLEIXING: 'Sheet type', //信息单类型
    LK_XINXIDANLIUSHUIHAO: 'TP sequence ID', //信息单流水号
    LK_XINXIDANSHENGCHENGSHIJIAN: 'Part Sheet creation time', //信息单生成时间
    LK_XINXIDANXIANGQING: 'Part Sheet detailed info.', //信息单详情
    LK_XINXIDANZHUANGTAI: 'Sheet Status', //信息单状态
    LK_XINXILIUSHUIDANHAO: 'Part Sheet ID', //信息流水单号
    LK_XUANZHUANGJIAN: 'Optional', //选装件
    LK_XUNYUANZHIHANG: 'Sourcing Operation', //寻源执行
    LK_XUNJIACAIGOUYUAN: 'Forward Buyer', //询价采购员
    LK_XUNJIACAIGOUYUANBEIZHU: 'Forward Buyer remark', //询价采购员备注
    LK_XUNJIACHANLIANGJIHUA: 'Enquiry Volume Plan', //询价产量计划
    LK_XUNJIAFUJIAN: 'Inquiry attachments', //询价附件
    LK_XUNJIATUZHI: 'Inquiry Blueprint', //询价图纸
    LK_XUNJIAZILIAO: 'Drawing for inquiry', //询价资料
    LK_XUNJIAZILIAOZHUANGTAI: 'Inquiry Documents Status', //询价资料状态
    LK_YANYONGCHEXINGDALEIDAIMA: 'COP Model code', //沿用车型大类代码
    LK_YAOQIUCSCHUIYIRIQI: 'Request CSC Meeting Date', //要求CSC会议日期
    LK_YIBAOCUN: 'The saved', //已保存!
    LK_YIBAOJIAGONGYINGSHANG: 'Supplier with quotation', //已报价供应商
    LK_YITIANJIADAOSHANGXIAN: 'Added to the upper limit', //已添加到上限!
    LK_YIXUNJIACAIGOUYUANSHANGHUIBEIZHU: 'Forward Buyer meeting remark', //已询价采购员上会备注
    LK_YIXUNJIAGONGYINGSHANG: 'Supplier with inquiry', //已询价供应商
    LK_YONGLIANG: 'Usage', //用量
    LK_YUQIDAIBAN: 'Overdue', //逾期待办
    LK_YUANPEICHANG: 'Old factory', //原配厂
    LK_ZAISHENQINGCAIWUMUBIAOJIA: 'Reapply CF Target Price', //再申请财务目标价
    LK_ZAICISHENGQINGCAIWUMUBIAOJIA: 'Reapply CF Target Price', //再新申请财务目标价
    LK_ZAIXINSHENQINGCAIWUMUBIAOJIA: 'Reapply CF Target Price', //再新申请财务目标价
    LK_ZAIXIANJINGJIA: 'Online Bidding', //在线竞价
    LK_ZANWUSHUJU: 'No Data', //暂无数据
    LK_ZENGJIADERENKEFEIYUAN: 'Addtional approval fee (Yuan)', //增加的认可费（元）
    LK_ZHIFUTIAOKUAN: 'Payment Terms', //支付条款
    LK_ZHINENGSHANGCHUANWENJIAN: 'Upload .xlsx file only', //只能上传.xlsx文件
    LK_ZHILIANG: 'Quality', //质量
    LK_MQ: 'MQ', //质量评分人
    LK_ZHONGLIANG: 'Weight', //重量
    LK_ZHONGXINSHENQING: 'Reapply', //重新申请
    LK_ZHONGZHI: 'Reset', //重置
    LK_ZHUANPAI: 'Handover', //转派
    LK_ZHUANPAIPINGFENRENWU: 'Transfer rating task', //转派评分任务
    LK_ZHUANTANPAN: 'To Negotiation', //转谈判
    LK_ZHUANXUNJIA: 'To inquiry', //转询价
    LK_ZHUANGXIANGSHU: 'Number of Containers', //装箱数
    LK_ZHUANGTAI: 'Status', //状态
    LK_ZUIXINRWJIA: 'Latest RW Price', //最新RW价
    LK_ZUIXINFANHUIRIQI: 'Latest Response Date', //最新返回日期
    LK_ZUIXINSHENQINGRIQI: 'Latest Application Date', //最新申请日期
    LK_ZUIXINSHENQINGZHUANGTAI: 'Latest Application Status', //最新申请状态
    LK_SHEZHIPINGFENBUMEN: 'Set up a scoring department', //设置评分部门
    LK_TUISONGPINGFENRENWU: 'Push scoring task', //推送评分任务
    LK_GONGYIZU: 'Craft Group', //工艺组
    LK_GONGYISHEZHI: '', //工艺设置
    LK_CAILIAOZUSHAIXUAN: '', //材料组筛选
    LK_GONGYIZUXUANDING: '', //工艺组选定
    LK_CHAIFENFACTORY: '选中的工厂中,存在未分配的份额，请填写后重试！',
    LK_FACTORYNOTSAME:
      '您所选的采购工厂与主数据中该车型项目对应的采购工厂不一致，请确认是否修改',
    LK_AREYOUSPLITE: '该车型项目主数据中对应多个采购工厂，是否拆分？',
    LK_NHWXZBDL: '您还未选择BDL',
    LK_XIETIAOREN: '', //协调人
    LK_XINZENG: 'Add', //新增
    LK_HUIFU: 'Recover', //恢复
    LK_QINGXUANZEXUYAOSHANCHUDEPINGFENBUMEN: '', //请选择需要删除的评分部门
    LK_QINGXUANZEXUYAOHUIFUDEPINGFENBUMEN: '', //请选择需要恢复的评分部门
    LK_QINGXUANZEWANSHUJUZAIZUOBAOCUN: '', //请选择完数据再做保存
    LK_WEIBUXITONGWENJIANWUFASHANCHU: '', // xxx 为外部系统文件, 无法删除

    rfq: {
      RFQINQUIRE: 'Search',
      RFQRESET: 'Reset'
    },
    APPROVAL: {
      ADD: 'Add',
      SAVE: 'Save',
      OK: 'OK',
      CANCEL: 'Cancel',
      EXPORT: 'Export',
      RECALL: 'Withdraw',
      EDIT: 'Edit',
      DELETE: 'Delete',
      SUBMIT: 'Submit',
      UPLOAD_ATTACH: 'Upload attachment',
      REMOVE_ATTACH: 'Remove attachment',
      APPEND_DATA_NODE: 'Supplementary Material Node',
      APPEND_DATA: 'Supplementary Materials',
      PLEASE_CHOOSE: 'Please choose',
      PLEASE_INPUT: 'Please enter',
      APPEND_DATA_COMMENT:
        'Please enter the message content of the supplementary materials',
      APPROVAL_COMMENTS: 'Approval comments',
      APPROVAL_COMMENTS_REQUIRED: 'Please enter approval comments',
      OPERATION_SUCCESSFUL: 'Operation successful',
      OPERATION_FAILED: 'Operation failed',
      RECALL_REASON: 'Reason for withdrawal',
      RECALL_SUCCESSFUL: 'Withdrawal successful',
      RECALL_FAILED: 'Withdrawal failed',
      SUBMITTED: 'Submitted',
      APPROVAL_NOT: 'Not approved',
      APPROVED: 'Approved',
      APPROVAL_ING: 'Approval in progress',
      APPROVAL_END: 'Approval end',
      APPROVAL_TODO: 'Pending approval',
      APPROVAL_NAME: 'Approval name',
      APPLICATION_USER: 'Applicant',
      APPROVAL_TICKIT_TYPE: 'Approval Document Type',
      APPROVAL_PROGRESS: 'Approval progress',
      APPROVAL_CONTENT: 'Approve content',
      APPLICATION_NO: 'Application Number',
      APPROVAL_ITEMS: 'Approval items',
      CREATE_TIME: 'Creation time',
      DEADLINE_TIME: 'Deadline time',
      TIME: 'Time',
      NODE_NAME: 'Node name',
      OPRATION_USER: 'Operator',
      OPRATION: 'Operation',
      OPRATION_TIME: 'Operation time',
      COMMENT_CONTENT: 'Reply content',
      NO: 'Number',
      ATTACH: 'Attachment',
      APPROVEL: 'Approve',
      REFUSE: 'Refuse',
      PART_NO: 'Part number',
      FORM_INFO: 'Form Information',
      FLOW_INFO: 'Flowchart information',
      MORE_APPROVAL_HISTORY: 'View more approval history',
      DEPARTMENT: 'Department to which you belong',
      CREATE_FLOW: 'New process',
      FLOW_MODEL_MANAGE: 'Process module management',
      FLOW_NO: 'Stream program number',
      FLOW_NAME: 'Process Title',
      CREATE_BY: 'Creator',
      FLOW_STATUS: 'Process status',
      FLOW_DESCRIPTION: 'Process description',
      FLOW_FORM_URLS: 'Process form address',
      SAVE_SUCCESSFUL: 'Save successfully',
      SAVE_FAILED: 'Save failed',
      DELETE_TIPS_CONTENT:
        'This operation will be permanently deleted, do you want to continue?',
      DELETE_TIPS_TITLE: 'Tips',
      DELETE_SUCCESSFUL: 'Delete successfully',
      DELETE_FAILED: 'Delete failed',
      APPROVAL_CENTER: 'Approval Center',
      LOG: 'Log',
      MY_APPLICATION: 'My application',
      MY_APPROVAL: 'My Approval',
      DETAIL: 'Detailed',
      TASK_AGENT_TYPE: 'Task Type',
      FLOW_TEMPLATE_MANAGE: 'Process template management',
      FLOW_CATEGORY: 'Process classification',
      APPROVAL_AGENT: 'Approval Agent',
      AGENT_NO: 'Agent Number',
      AUTH_USER_NAME: 'Authorizer',
      AGENT_USER_NAME: 'Agent',
      AGENT_TYPE: 'Agent Type',
      AGENT_START_TIME: 'Agent start time',
      AGENT_END_TIME: 'Agent end time',
      AGENT_DATE: 'Agent Time',
      AGENT_CONTENT: 'Agent Content',
      IS_EFFECTIVE: 'Is it effective',
      INVALIDATION: 'Invalidation',
      STAFF_NO: 'Employee Number',
      STAFF_NAME: 'Name',
      STAFF_DEPARTMENT: 'Department',
      STAFF_MOBILE: 'Mobile',
      STAFF_TEL: 'Phone',
      TASK_MANAGER: 'Task Management',
      TASK_NAME: 'Task name',
      TASK_DESC: 'Task description',
      THE_START_TIME: 'Initiation time',
      TASK_STATUS: 'Task Status',
      COMPLETE_TIME: 'Complete time',
      TASK_START_END_DATE: 'Task Start And End Date',
      TASK_TRANSFER: 'Transfer',
      TRANSFER_PERSON: 'Transfer Person',
      APPROVAL_SUCCESS: 'Approval successful',
      APPROVAL_FAILED: 'Approval failed',
      NODE_REQUIRED: 'Required for supplementary material nodes',
      EXIT_EDIT: 'exit edit',
      LK_ZP: 'task transfer',
      LK_ZGZJ: 'give it to yourself'
    },
    ROLE: {
      ROLE_NAME: 'Role Name',
      ROLE_CODE: 'Role Code',
      ROLE_ID: 'Role ID',
      DESCRIPTION: 'Description',
      ROLE_STATUS: 'Role Status',
      ROLE_TAGS: 'Role Tag',
      ROLE_AUTH_PERMISSIONS: 'Assign permissions',
      NAME: 'Name',
      NAME_EN: 'Name (English)',
      TYPE: 'Type',
      ADDRESS: 'Address',
      REMARK: 'Remarks',
      PERMISSION: 'Permissions',
      DESIGNATED_DEPARTMENT: 'Designated Department',
      USE_FOLLOW_PROP_FILTER: 'Filter by the following attributes',
      SET_FOLLOW_COL_DISVISIBLE: 'Set the following properties to be invisible',
      RESOURCE_NAME: 'Resource name',
      RESOURCE_NAME_EN: 'Resource name (English)',
      RESOURCE_CODE: 'Resource code',
      MENU_CODE: 'Menu code'
    },
    ORGANIZATION_MANAGERMENT: {
      INPUT_PLACEHOLDER: 'Please enter',
      SELECT_PLACEHOLDER: 'Please choose',
      ORG_CHART: {
        SEARCH_PLACEHOLDER: 'Search organization/role/person information',
        TAB_ORG_MAGERMENT: 'Organization Management',
        TAB_ROLE_MAGERMENT: 'Role management',
        TAB_APPROVAL_MAGERMENT: 'Approval management'
      },
      ORG_LIST: {
        ORG_CODE: 'Organization code',
        ORG_OWNER: 'Principal',
        ORG_NAME: 'Organization name',
        ORG_IS_SHOW: 'Whether to show',
        ORG_IS_COMMODITY: 'Whether it is Commodity',
        IS_SYNC_SVCD: 'Whether to synchronize svcd',
        TABLE_INDEX: 'Index',
        TABLE_ORG_CNNAME: 'Organization name(CN)',
        TABLE_ORG_ENNAME: 'Organization name(EN)',
        TABLE_ORG_CODE: 'Organization number',
        TABLE_ORG_LEVEL: 'Organization level',
        TABLE_ORG_SHORT_CODE: 'Organization Shortcode',
        TABLE_ORG_SHORT_NAME: 'Organization Abbreviation',
        TABLE_ORG_OWNER: 'Principal',
        TABLE_ORG_DESC: 'Remarks',
        CREATE_ORG_BTN: 'Create',
        EDIT_ORG_BTN: 'Edit',
        DELETE_ORG_BTN: 'Delete',
        EXPORT_ORG_BTN: 'Export'
      },
      ORG_CREATE: {
        TITLE: 'New organization',
        TRUE_BTN: 'Confirm',
        RESET_BTN: 'Reset',
        UP_LEVEL: 'Parent organization',
        ORG_CODE: 'Organization code',
        ORG_CN_NAME: 'Organization name (CN)',
        ORG_EN_NAME: 'Organization name(EN)',
        ORG_LEVEL: 'Organization level',
        SVCD_ORG_CODE: 'SVCD organization code',
        ORG_DESC: 'Organization description',
        ORG_TAG: 'Organization label',
        IS_SHOW_ORG_TREE: 'Whether to display in the organization tree',
        IS_COMMODITY: 'Whether it is Commodity',
        IS_SYNC_SVCD: 'Whether to synchronize svcd',
        ORG_LOGO: 'Department Logo',
        ORG_REMARK: 'Remark',
        ORG_LOGO_SIZE: '(Maximum file size limit is 10MB)',
        INCREMENT_BTN: 'Increase dimension',
        DECREMENT_BTN: 'Delete dimension',
        TABLE_INDEX: 'Index',
        TABLE_DIMENSION: 'Dimension',
        TABLE_DESC: 'Content',
        DOWN_LEVEL: 'Subordinate organization',
        DOWN_LEVEL_DESC: 'Option description',
        DOWN_LEVEL_DESC_ONE:
          '1. Subordinate organizations are limited to the original subordinate organizations of the current superior organization',
        DOWN_LEVEL_DESC_TWO:
          '2. If you choose a lower-level organization, it is deemed to use the plug-in function'
      },
      ORG_TAG: {
        TITLE: 'Organization label',
        TRUEBTN: 'Confirm',
        RESETBTN: 'Reset',
        CUSTOM_TAG: 'Custom label'
      },
      ORG_CHOOSE_DOWNLEVEL: {
        TITLE: 'Organization Selection',
        ORG_CODE: 'Organization code',
        ORG_FULLNAME: 'Full name of the organization',
        ORG_OWNER: 'Principal',
        ORG_SEARCH_BTN: 'Search',
        ORG_RESET_BTN: 'Reset',
        ORG_TRUE_BTN: 'Confirm',
        TABLE_INDEX: 'Index',
        TABLE_ORG_CODE: 'Organization code',
        TABLE_ORG_NAME: 'Organization name',
        TABLE_ORG_SHORT_CODE: 'Organization Shortcode',
        TABLE_ORG_SHORT_NAME: 'Organization Abbreviation',
        TABLE_ORG_OWNER: 'Principal'
      }
    },
    LOG: {
      APPLICATION_NO: 'Application number',
      APPLICATION_NAME: 'Application name',
      INQUIRY_BUYER: 'Inquiry buyer',
      LINIE_BUYER: 'Linie buyer',
      APPLICATION_DATE: 'Application date',
      PARTSPROCUREMODELPROJECT: 'Model project',
      MEETING_NAME: 'Meeting name',
      APPLICATION_TYPE: 'Application type',
      PROJECT_TYPE: 'Purchase item type',
      OPERATION: 'Operation',
      OPERATE_TIME: 'Time',
      OPERATE_PERSON: 'Operator',
      OPERATE_TYPE: 'Type',
      MENU: 'Menu',
      RESULT: 'Result',
      SELECT_PLACEHOLDER: 'Please select',
      INPUT_PLACEHOLDER: 'Please input',
      DETAIL: 'Detail',
      CONFIRM: 'Confirm',
      CANCEL: 'Cancel'
    },
    // -------------ws3 供应商 start----------------------------------
    GONGHUOSHUXING: 'Properties Supply', //供S货属性
    ZHUCEDIZHIYOUBIAN: 'Registered Address Zip Code', //注册地址邮编
    KAIHUYINHANG: 'Bank Of Deposit', //开户银行
    YINGHANSUOZAISHENGFEN: 'The Province Of The Bank', //银行所在省份
    QDLYBJHJRXKZCXY_YINGHANGMINCHEN:
      'Please login the silver circ financial license query page (http://xkz.cbirc.gov.cn/jr), query the bank specific bank name', //请登录银保监会金融许可证查询页 面（http://xkz.cbirc.gov.cn/jr ），查询开户银行具体的银行名称
    QDLYBJHJRXKZCXY_YINGHANGDAIMA:
      'Please login the silver circ financial license query page (http://xkz.cbirc.gov.cn/jr), query the bank 15 institutions code as the bank code', //请登录银保监会金融许可证查询页 面（http://xkz.cbirc.gov.cn/jr）， 查询开户银行的15位机构编码作为 银行代码
    GONGSIGAIKANG: 'Company Profile', //公司概况
    Home: 'Home',
    BasicInformation: 'Basic Information',
    SupplierZh: 'Supplier Zh',
    SupplierEn: 'Supplier En',
    SupplierAbbreviationZh: 'Supplier Abbreviation Zh',
    SupplierAbbreviationEn: 'Supplier Abbreviation En',
    UnifySocialCreditCode: 'Unify Social Credit Code',
    LegalPerson: 'Legal Person',
    EnterpriseType: 'Enterprise Type',
    Industry: 'Industry',
    IsListing: 'Is Listing',
    country: 'country',
    companyAddress: 'company Address',
    financialStatus: 'financial Status',
    companySize: 'company Size',
    epNatureCategory: 'ep Nature Category',
    industryCode: 'industry Code',
    listingAddress: 'listing Address',
    registeredDate: 'registered Date',
    province: 'Province',
    ZHUCEDIZHIBIANMA: 'Register Address Postcode',
    CAIWUQUSHI: 'Financial Trend',
    QIYEXINGZHI: 'Company Nature( Subclass)',
    YEWUFANWEI: 'Scope Of Business',
    GUPIAODAIMA: 'Code Of Stock',
    GONGSHIWANGZHI: 'Company Website',
    FUKUANGJILV: 'Payment Record',
    JINGYINGZHUANGTAI: 'Business Status',
    JINGYINGFANWEI: 'Business Scope',
    JINGYINGQIXIAN: 'Business Period',
    JINGYINGCHANSUOSUOYOUXINGSHI: 'Forms Of Ownership Of Business Site',
    JINGYINGCHANGSUOWEIZHI: 'Location Of Business Site',
    YINHANGSUOZAIGUOJIA: 'Bank In Country',
    YINHANGMINCHENG: 'Bank Name',
    SHUIWUDAIMA: 'Tax Code',
    YINGHANGSUOZAICHENGSHI: 'Bank In Provinces',
    YINHANGDAIMA: 'Bank Code',
    YINHANGSUOZAICHENGSHI: 'Bank In City',
    GONGHUOZHUANGTAI: 'Supplier Status',
    YINHANGZHANGHAO: 'Accounts',
    SHIFOUZAIGONG: 'Is Supply',
    GONGHUO: 'Supplier Status',
    SHIFOUYELEIGONGCHANG: 'Is Factory',
    SHIFOUANQUANJIAN: 'Is Safety Part',
    GONGHUOLINGJIANLEIXING: 'Supply Type',
    SHIFOULISHUHUOYU: 'Is Subjection China',
    SHIFOUGONGONGGONGYINGSHANG: 'Is Shared Supplier',
    GONGHUOLEIXING: 'Supply Properties',
    LEIBUPINGJIA: 'Internal Evaluation',
    FUZEKESHI: 'Responsible Dept',
    XIANGGUANZHUANYEKESHI: 'Correlation Major Dept',
    JISHUBUMENPINGJIA: 'TP_QA_Rating',
    WULIUBUMENPINGJIA: 'MQ_QA_Rating',
    ZHILIANGBUMENPINGJIA: 'TL_QA_Rating',
    LISHIYANGE: 'Enterprise History',
    FANHUIGONGYINSHANG360: 'Return To Supplier360',
    BANGENGSHIJIAN: 'Date Of Change',
    BANGENLEIRONG: 'Content Of Change',
    BANGENGQIAN: 'Before',
    BIANGENGHOU: 'After',
    BIANGENGCHAKAN: 'View',
    GUDONGBANGENGQIAN: 'Before Change Of Shareholder',
    GUDONGBIANGENGHOU: 'After Change Of Shareholder',
    QIYEYANGEMIAOSHU: 'Remarks Of Enterprise History',
    XINGONGYINGSHANGPINGJIJIEGUO: 'New Supplier Rating Result',
    XINGONGYINGSHANGPINGJISHIJIAN: 'New Supplier Rating Time',
    WAIBUPINGJI: 'External Rating',
    SHIFOULISHUSHANGTANAGONGTONGTI: 'Is Black List',
    WAIBUPINGJIESHIJIAN: 'External Rating Time',
    CHUBUTIAOZHENGHOUDEFEN: 'Adjusted Score After Initial Rating',
    CHUPINGTIAOZHENGHOUJIEGUO: 'Adjusted Result After Initial Rating',
    CHUPINGSHIJIAN: 'Initial Rating Time',
    SHENGRUPINGJIJIEGUO: 'In Depth Analysis Result',
    SHENGRUPINGJISHIJIAN: 'Indepth Analysis Time',
    VWAGPINGJIJIEGUO: 'VMAG_Rating Result',
    VWAGPINGJISHIJIAN: 'VMAG_Rating Time',
    GONGCHANGBIANHAO: 'Factory Code',
    GONGCHANGMINGCHEN: 'Factory Name',
    GONGCHANGJIANCHEN: 'Factory Shortname',
    SHENGFEN: 'Provinces',
    DIZHI: 'Address',
    YOUBIAN: 'Postcode',
    YINGHANGMINCHENG: 'Name Of Bank',
    SHOUQUANJINE: 'Credit Amount',
    YISHIYONGJINGE: 'Credit Amount Use',
    SHOUXINRIQIZHI: 'End Date Of Credit',
    DIYAZHIYADANBAO: 'Mortgage/ Pledge/ Guarantee',
    LILV: 'Interest Rate',
    HUANKUANGJIHUA: 'Plan Repay',
    SHOUXINYINHANGXINXIBUCONGSHUOMING: 'Remarks Of Bank Information',
    GUDONGMINCHEN: 'Investor Name',
    GUOJIA_DIQU: 'Nation',
    CHUZIE: 'Investment',
    BIZHONG: 'Currency',
    ZHIGUBILI: 'Investment Proportion Percent',
    ZHUYINYEWU: 'Main Business',
    HANGYEGUISHU: 'Industry',
    FUZEREN: 'Person In Charge',
    GUDONGGONGSIDEZHICHIQINGKANG: 'Support By Shareholders',
    GUDONGZHENGJIANHANGMA: 'Shareholder Identification',
    GUDONGLEIXING: 'Type Of Shareholder',
    JITUANGONGSIQUANCHEN: 'Group Company Name',
    YINWENMINCHEN: 'Name En',
    JITUANGONGSIJIANCHEN: 'Abbr. Name Of Group',
    GUOJIA: 'Nation',
    ZONGBU: 'Headquarter',
    GUDONG_JITUANYUGUANLIANGONGSIBUCHONGSHUOMING:
      'Remarks Of Shareholders, Group& Related Companies',
    YUANGONGSHU: 'Amount Of Total Employees',
    GUANLIRENYUAN: 'Amount Of Managers',
    LINSHIGONGRENSHU: 'Amount Of Casual Workers',
    YANFARENYUAN: 'Amount Of Technicians',
    SHIFOUSHEZHIGONGHUI: 'Labour Union Or None',
    ZHUYAOGUANLIRENYUAN: 'Name Of Main Manager',
    XINGBIE: 'Gender',
    NIANLING: 'Age',
    XUELI: 'Education Background',
    ZHIWU: 'Position',
    SHIFOUCEO: 'CEO_Or Not',
    GUANLIJINGYAN: 'Managerial Experience',
    HANGYEJINGYAN: 'Industry Experience',
    ZHUYAOCHANPIN: 'Main Product',
    NIANCHANLIANG: 'Annual Output',
    ZHUYAOPEITAOZHUJICHANG_KEHU: 'Main Company',
    KAISHIGONGHUSHIJIAN: 'Start Time Of Supply',
    GONGHUONIANFEN: 'Year',
    NIANGONGHUOLIANG: 'Annual Output',
    GUOLEISHITANGZHANYOULV: 'Domestic Market Share',
    SUOSHUHANGYEWEIZHI: 'Position In Industry',
    KEGONGsvwBILI: 'Proportion To SupplySV W',
    KEHUMINGCHEN: 'Name Of Customers',
    ZHUGONGCHANPIN: 'Main Products',
    HEZUONIANXIAN: 'Duration Of Cooporation',
    GONGHUONIANXIAN: 'Supply period',
    GONGHUOLIANG: 'Quantity Of Supply',
    GONGHUOJINE: 'Amount Of Supply',
    ZHANZONGXIAOSHOUBILI: 'As Ratio Of...% In Total Sale',
    ZHANGQI: 'Payment Days',
    XIANJINGPIAOJUJINGLI: 'Ratio Of Cash To Bill',
    SUPPLIER_ZHUYAOFENGONGFANGMINGCHENG: 'Subsupplier Name And Product Name',
    SUPPLIER_SHEHUITONGYIXINYONGDAIMA: 'Unified Social Credit Identifier',
    SUPPLIER_CHANPIN: 'Product Name',
    SUPPLIER_GUOJIA: 'Country',
    SUPPLIER_SHENGFEN: 'Provinces',
    SUPPLIER_CHENGSHI: 'City',
    SUPPLIER_LIANXIRENMINGCHENG: 'Contacts',
    SUPPLIER_ZHIWU: 'Duty',
    SUPPLIER_LIANXIDIANHUA: 'Tel',
    SUPPLIER_SHOUJIHAOMA: 'Mobile Phone',
    SUPPLIER_CHUANZHEN: 'Fax',
    SUPPLIER_DIANZIYOUJIAN: 'Email',
    SUPPLIER_HEZUONIANXIAN: 'Duration Of Cooperation',
    SUPPLIER_CAIGOUNIANFNE: 'Year',
    SUPPLIER_CAIGOULIANG: 'Quantity Of Purchasing',
    SUPPLIER_CAIGOUJINE: 'Amount Of Purchasing',
    SUPPLIER_ZHANCAIGOUZONGBILI: 'As Ratio Of...% In Total Purchasing（%）',
    SUPPLIER_ZHANGQI: 'Payment Days',
    SUPPLIER_XIANJINPIAOJUBILI: 'Ratio Of Cash To Bill',
    SUPPLIER_FUJIANJILUSHIJIAN: 'Payment Record Date',
    SUPPLIER_FUJIANXIGUAN: 'Payment Habits',
    SUPPLIER_FUKUANFANGSHI: 'Type Of Payment',
    SUPPLIER_SHANGPINFUWU: 'Goods/ Services',
    SUPPLIER_BEIZHU: 'Remarks',
    SUPPLIER_GUONEICAIGOUNEIRONG: 'Products Purchased In Domestic Market',
    SUPPLIER_CAIGOUXINXIBEIZHU: 'Remarks Of Purchase Information',
    SUPPLIER_LINIANHEZUOJILU: 'Historical Cooperation Record',
    SUPPLIER_HEZUOQISHINIANFEN: 'Start Year Of Cooperation',
    SUPPLIER_GONGHUOCHANPIN: 'Products',
    SUPPLIER_T0: 'Year',
    SUPPLIER_CSE: 'CSE',
    SUPPLIER_CSE2: '2nd Tier SupplierTTO_ConfirmCS E',
    SUPPLIER_CSI: 'CSI',
    SUPPLIER_CSI2: '2nd Tier SupplierTTO_ConfirmCS I',
    SUPPLIER_CSM: 'CSM',
    SUPPLIER_CSM2: '2nd Tier SupplierTTO_ConfirmCS M',
    SUPPLIER_CSP: 'CSP',
    SUPPLIER_CSP2: '2nd Tier SupplierTTO_ConfirmCS M',
    SUPPLIER_CSX: 'CSX',
    SUPPLIER_CSX2: '2nd Tier SupplierTTO_ConfirmCS M',
    SUPPLIER_CSS: 'CSS',
    SUPPLIER_CSS2: '2nd Tier SupplierTTO_ConfirmCS M',
    SUPPLIER_YICJIANT0: '1st Tier SupplierT O',
    SUPPLIER_PEIFUJIANTO: 'Accessory SupplierT O',
    SUPPLIER_ERCIJIANTO: '2nd Tier SupplierT O',
    SUPPLIER_ZONGTO: 'TotalTO',
    SUPPLIER_ZHIDUAN: 'Field', //字段
    SUPPLIER_BUBTO: 'BU-B_TO',
    SUPPLIER_ZHONGDASHIXIANG: 'Significant Events',
    SUPPLIER_ZHONGDASHIXIANGSIFAXINXI:
      'Significant Events-Judicial Information',
    SUPPLIER_RQI: 'Date',
    SUPPLIER_XIAOXILAIYUAN: 'Source',
    SUPPLIER_FAYUAN: 'Court',
    SUPPLIER_JINE: 'Amount',
    SUPPLIER_BIZHONG: 'Currency',
    SUPPLIER_FALVJIUFENNEIRONG: 'Legal Dispute Content',
    SUPPLIER_NEIRONG: 'Content',
    SUPPLIER_ZHONGDASHIXIANGXINGZHENCHUFA:
      'Significant Events-Administrative Penalties',
    SUPPLIER_XINXILEIXING: 'Information Type',
    SUPPLIER_LAIYUAN: 'Source',
    SUPPLIER_XINGZHENCHUFANEIRONG: 'Content Of Administrative Penalties',
    SUPPLIER_LIANXIRENYUYONGHU: 'Supplier Contact',
    SUPPLIER_GONGYINGSHANGTONGXUNLU: 'Supplier Contact',
    SUPPLIER_LIANXIRENLEIXING: 'Contacts Type',
    SUPPLIER_LIANXIRENXINGMING: 'Contacts Name',
    SUPPLIER_ZHIWEI: 'Designation',
    SUPPLIER_BUMEN: 'Department',
    SUPPLIER_QUHAO: 'Telephone Area Code',
    SUPPLIER_WEIXINHAO: 'Wechat',
    SUPPLIER_GONGYINGSHANGXINGMING: 'Suppliers Users Name',
    SUPPLIER_YONGHUDENGLUMING: 'Username',
    SUPPLIER_JIEDONG: 'Unfreeze',
    SUPPLIER_DONGJIE: 'Freeze',
    SUPPLIER_ISWEIZHUYONGHU: 'Primary user or not', //是否为主用户
    SUPPLIER_SHIFOUHUODONG: 'Is Active',
    SUPPLIER_SHEWEIZHUYONGHU: 'Set As Admin',
    SUPPLIER_FUJIANSHANGCHUAN: 'Upload Attachments',
    SUPPLIER_XIANGGUANFUJIAN: 'Related Accessory',
    SUPPLIER_FUJIANMINGCHENG: 'Accessory Name',
    SUPPLIER_CAOZUO: 'Operation',
    SUPPLIER_SHANGCHUANQUERENRQI: 'Upload Date',
    SUPPLIER_BEIZHUSHUOMING: 'Remark',
    SUPPLIER_YANGLIWENJIAN: 'Sample File',
    SUPPLIER_BUNENGTIGONGYUANYIN: 'Reason For Not Providing',
    SUPPLIER_ZUIWANTIGONGSHIJIAN: 'Latest Provision Time',
    SUPPLIER_ZHENGJIANYOUXIAOQI: 'Document Period Of Validity',
    SUPPLIER_QIANSHU: 'Sign',
    SUPPLIER_EXAMPLEDSEC:
      'Please download and view the sample files and operating instructions, and upload the correct attachments as required',
    SUPPLIER_ZIYOUSHANGCHUAN: '',
    SUPPLIER_WENJIANMINGCHENG: 'File Name',
    SUPPLIER_DAXIAOMB: 'Size',
    SUPPLIER_SHANGCHUQNRQI: 'Upload Date',
    SUPPLIER_SHANGCHUANREN: 'Upload People',
    SUPPLIER_CAILIAOZU: 'Material Group',
    SUPPLIER_KESHI: 'Dept',
    SUPPLIER_CAILIAOZUMINGCHENG: 'Stuff Gategory Category Name',
    SUPPLIER_CAILIAOZUBIANHAO: 'Stuff Gategory Category Code',
    SUPPLIER_SHOUKONGZHUANGTAI: 'Controlled State',
    SUPPLIER_CAILIAOZUGONGYIBIANHAO: 'Stuff Gategory Stuff Code',
    SUPPLIER_CAILIAOZUGONGYINGZHONGWENMINGCHENG: 'Stuff Gategory Stuff Name Zn',
    SUPPLIER_CAILIAOZUDEWENMINGCHENG: 'Stuff Gategory Stuff Name De',
    SUPPLIER_LINIEJIBIE: 'LINIE_Group',
    SUPPLIER_LINIERENYUAN: 'LINIE_Owner',
    SUPPLIER_SHIFOUSHUYUBDL: 'MBDL',
    SUPPLIER_ZTSJYTJBYCFTJ:
      'This data has been submitted, do not submit it twice', //这条数据已提交,不要重复提交
    SUPPLIER_SHOUKONGKAISHISHIJIAN: 'Controlled Begin Date',
    SUPPLIER_SHOUKONGJIEZHISHIJIAN: 'Controlled End Date',
    SUPPLIER_SHOUKONGYUANYIN: 'Controlled Reason',
    SUPPLIER_SHENQINGBDL: 'Apply For MaintainBDL',
    SUPPLIER_QUXIAOSHOUKONG: 'Restriction Release',
    SUPPLIER_QUXIAOCAILIAOZUGUANLIAN: 'CancelBDL_Relation',
    SUPPLIER_DAOCHUQUANBU: 'Export All',
    SUPPLIER_XITONGXIUGAILISHI: 'Change History',
    SUPPLIER_BIANGENGZIDUAN: 'Alter Field',
    SUPPLIER_BIANGENGNEIRONG: 'Alter Content',
    SUPPLIER_YUANNEIRONG: 'Old Content',
    SUPPLIER_XINEIRONG: 'New Content',
    SUPPLIER_XIUGAIREN: 'Modifier',
    SUPPLIER_XIUGAIRQI: 'Modified Date',
    SUPPLIER_CAIWUDASHU: 'Key Financial Figure',
    SUPPLIER_NIANFEN: 'Fiscal Year',
    SUPPLIER_YINGSHOUZHANGKUAN: 'Accounts Receivable',
    SUPPLIER_CUNHUO: 'Inventory',
    SUPPLIER_YFZK: 'Prepaid Accounts',
    SUPPLIER_YFZKBZ: 'Or Prepaid And Deferred Expenses',
    SUPPLIER_QTYSK: 'Other Receivable',
    SUPPLIER_QTYSKBZ: 'Or Other Receivable And Subsidies',
    SUPPLIER_LDZC: 'Less Estimated Liabillities In Old Accounting Standards',
    SUPPLIER_LDZL: 'Current Liabilities',
    SUPPLIER_FZHJ: 'Subtotal Liabilities',
    SUPPLIER_SFZB: 'Paid In Capital',
    SUPPLIER_SHOUZHEQUANYIHEJI: 'Subtotal Shareholders Equity',
    SUPPLIER_ZICHANZONGJI: 'Subtotal Assets',
    SUPPLIER_YINGYESHOURU: 'Operation Revenue',
    SUPPLIER_YINGYECHENGBEN: 'Operation Cost',
    SUPPLIER_LIRUIZONGE: 'Profit Before Tax',
    SUPPLIER_JINLIRUN: 'Profit After Tax',
    SUPPLIER_FUZAILV: 'Liabilities/ Assets Ratio(%)',
    SUPPLIER_CAIWUSHUJU: 'Financial Data',
    SUPPLIER_GONGHUOGONGSI: 'Supply Compny', //供货公司
    SUPPLIER_SHUJUQUDAO: 'Source',
    SUPPLIER_KUAIJIZHOUQIQ: 'Start Of Accounting Period',
    SUPPLIER_KUAIJIZHOUQIZ: 'End Of Accounting Period',
    SUPPLIER_SHIFOUSHENJI: 'Audit Of None',
    SUPPLIER_SHENJIDANWEI: 'Auditor',
    SUPPLIER_DANWEI: 'Unit',
    SUPPLIER_SHIFOUHEBINGBAOBIAO: 'Consolidated Or Not',
    SUPPLIER_SHANGCHUANSHIJIAN: 'Date Of Data',
    SUPPLIER_SHUJUDUIBI: 'Compare Data',
    SUPPLIER_ZICHANFUZAIBIAO: 'Balance Sheet',
    SUPPLIER_LIRUNBIAO: 'Income Statement',
    SUPPLIER_XIANZAIJIULIANGBIAO: 'Cash Flow Statement',
    SUPPLIER_QITACAIWUSHUJU: 'Other Financial Data',
    // 供应商360
    SUPPLIER_SFHMD: 'Blacklist or not', //是否黑名单
    SUPPLIER_XGSJ: 'modification time', //修改时间
    SUPPLIER_VWHSQSJ: 'Time of application for VW No', //VW号申请时间
    SUPPLIER_VWZT: 'VW Start', //VW状态
    //操作按钮
    SUPPLIER_ZANCUN: 'Temporary Save',
    SUPPLIER_TIJIAO: 'Submit',
    SUPPLIER_TIJIAOZZSQ: 'Submit Data To Become Regular Supplier',
    SUPPLIER_RONGZISHENQING: 'Apply Financing',
    SUPPLIER_GENGGAIXINXI: 'Change Information',
    SUPPLIER_SHANGYIBU: 'Previous Step',
    SUPPLIER_XIAYIBU: 'Next Step',
    SUPPLIER_BENCITIANXIEJIANYANMA: 'Fill in the verification code this time',
    SUPPLIER_ZHUCEXINXITIANXIE: 'Fill in the registration information',
    SUPPLIER_XUANZERQI: 'Select date',
    SUPPLIER_KAISHIRQI: 'Start date', //开始日期
    SUPPLIER_JIESHURQI: 'End date', //结束日期
    SUPPLIER_ZHI: 'To', //至

    //需要翻译
    YANFARENYUANSHU: 'Number of R&D personnel', //研发人员数
    SHENGCHANRENYUANSHU: 'Number of production staff', //生产人员数
    ZHIZE: 'Duty', //职责
    BEIZHU: 'Remarks', //备注
    SUPPLIER_YEWUFAZHANJIHUA: 'Business development plan', //业务发展计划
    SUPPLIER_XIAOSHOUXINXIBEIZHU: 'Sales Information Remarks', //销售信息备注
    SUPPLIER_GOYINGSHANG360: 'Supplier 360', //供应商360
    SUPPLIER_GONGYINGSHANGJIXIAO: 'Supplier Performance', //供应商绩效

    // 详情信息
    SUPPLIER_GONGYINGSHANGXINXI: 'Supplier Information', //供应商信息
    SUPPLIER_GONGYINGSHANGZHONGWENMING: 'Supplier Chinese name', //供应商中文名
    SUPPLIER_GONGYINGSHANGYINGWENMING: 'Supplier English name', //供应商英文名
    SUPPLIER_SAPHAO: 'SAP Code', //SAP号
    SUPPLIER_VWHAO: 'VW Code', //VW号
    SUPPLIER_GONGYINGSHANGJIANCHENZH: 'Supplier abbreviation (Chinese)', //供应商简称（中）
    SUPPLIER_GONGYINGSHANGJIANCHENGEN: 'Supplier Abbreviation (English)', //供应商简称（英）
    SUPPLIER_LINGSHIHAO: 'Provisional number', //临时号
    SUPPLIER_TONGYISHEHUIXINGYONGDAIMA: 'Unified social credit code', //统一社会信用代码
    SUPPLIER_SVWHAO: 'SVW Code', //SVW号
    SUPPLIER_ZHUCEXINGXITIANXIE: 'Fill in the registration information', //注册信息填写
    SUPPLIER_VWCODETIP: '', //申请VW号前，需拥有邓白氏编号，</br>并在德国大众供应商平台完成注册（vwgroupsupply.com）

    //new
    SUPPLIER_PIZHUN: 'Approve', //批准
    SUPPLIER_GUANLIANGONGSIMINGCHENG: 'Associated company name', //关联公司名称
    SUPPLIER_GUANXIMIAOSHU: 'Relationship description', //关系描述
    SUPPLIER_QIYEXINGZHI: 'Enterprise Class', //企业性质
    SUPPLIER_SUOZAIGUOJIADIQU: 'Country/Region', //所在国家/地区
    SUPPLIER_ZHUCEZIBENWAN: 'Registered capital (ten thousand)', //注册资本（万）
    SUPPLIER_KONGGUBILI: 'Shareholding ratio (%)', //控股比例（%）
    SUPPLIER_SHOUXINRQIQI: 'From the date of credit', //授信日期起
    SUPPLIER_WAIBUPINGJIA: 'External evaluation', //外部评价
    SUPPLIER_LISHIYANGEXIANGQING: 'History details', //历史沿革详情
    SUPPLIER_QIYEYANGEMIAOSHU: 'Enterprise history description', //企业沿革描述
    SUPPLIER_GONGYINGSHANGJIANCHENZHTIPS:
      'Chinese abbreviation rules: region + name + business Example: (Shanghai Youhao Plastics Co., Ltd.-Shanghai Youhao Plastics)', //中文简称规则：地区+名称+业务 例：（上海友好塑料股份有限公司—上海友好塑料）
    SUPPLIER_GONGYINGSHANGJIANCHENGENTIPS:
      'English abbreviation rules: regional initials + name + business Example: (Shanghai Friendly Plastic Co., Ltd.—SH Friendly Plastic)', //英文简称规则：地区的首字母缩写+名称+业务 例：（Shanghai Friendly Plastic Co., Ltd.—SH Friendly Plastic）
    SUPPLIER_DUNSTIPS:
      'For the application of Dun & Bradstreet number, please contact Shanghai Huaxia Dun & Bradstreet Business Information Consulting Co., Ltd. or other regional Dun & Bradstreet company organizations. \n' +
      'Specific information can be consulted at http://www.dnbchina.com/conta ct/index.html', //邓白氏号申请事宜请联系上海华夏 邓白氏商业信息咨询有限公司或其 他地区邓白氏公司机构。 具体信息可登录 http://www.dnbchina.com/conta ct/index.html进行咨询
    SUPPLIER_JIBENXINXI: 'Basic Information', //基本信息
    SUPPLIER_LISHIYANGE: 'History', //历史沿革
    SUPPLIER_FRMPINGJI: 'FRM rating', //FRM评级
    SUPPLIER_GONGCHANGXINXI: 'Factory information', //工厂信息
    SUPPLIER_SHOUXINYINHANGXINXIN: 'Credit Bank Information', //授信银行信息
    SUPPLIER_GUDONGJITUANYUGUANLIANGONGSI:
      'Shareholders, groups and related companies', //股东、集团与关联公司
    SUPPLIER_RENYUANJIGONGSIZHILIQINGKUANG:
      'Personnel and corporate governance', //人员及公司治理情况
    SUPPLIER_ZHUYAOYEWUJICHANPIN: 'Main business and products', //主要业务及产品
    SUPPLIER_ZHUYAOKEHU: 'Major client', //主要客户
    SUPPLIER_ZHUYAOFANGGONGFANGMINGCHENGJICHANPIN:
      'Name and product of main sub-supplier', //主要分供方名称及产品
    SUPPLIER_LISHIHEZUOJILU: 'Cooperation records over the years', //历年合作记录
    SUPPLIER_ZHUYAOFENGONGFANGMING: 'Name Of Main Sub-Supplier', //主要分供方名称
    SUPPLIER_FUKUANQINGKUANG: 'Payment Status', //付款状况
    SUPPLIER_XUANZENIANFEN: 'Select Year', //选择年份
    SUPPLIER_SHIFOUDINGDIAN: 'Negative Point', //是否定点
    SUPPLIER_SHIFOUSHENGXIAO: 'Does It Take Effect', //是否生效
    SUPPLIER_WUXIAO: 'Invalid', //无效
    SUPPLIER_YOUXIAO: 'Availability', //有效
    SUPPLIER_PURCHASEREMAIL: 'Purchaser Email', //采购员邮箱
    SUPPLIER_PURCHASERNAME: 'Purchaser Name', //采购员姓名
    SUPPLIER_SUPPLIERTYPE: 'Supplier Type', //供应商类型
    SUPPLIER_ZHUANZHENGSUOXUFUJIAN: 'Attachments Needed For Correction', //转正所需附件
    SUPPLIER_SHIFOUTONGYIJIANG: 'Do you agree to ', //是否同意将
    SUPPLIER_GONGSIZHUANEWIZHENGSHIGONGYINGSHANG:
      ' company turns into an official supplier', //公司转为正式供应商
    SUPPLIER_CHAKANGAIGONGYINGSHANGXINXI: 'View the supplier information', //查看该供应商信息
    SUPPLIER_FUJIANSHANCHU: 'Attachment deletion', //附件删除
    SUPPLIER_CWYJ: 'Financial Early-warning', //财务预警
    SUPPLIER_GLGS: 'Affiliated Company', //关联公司
    SUPPLIER_JTGX: 'Group Relations', //集团关系
    SUPPLIER_ZYPTKH: 'Major Supporting Customers', //主要配套客户
    SUPPLIER_ZYPTZJC: 'Main Supporting OEMs', //主要配套主机厂
    SUPPLIER_SJKZRXM: 'Name Actual Controller', //实际控制人姓名
    SPR_FRM_XGYSPJ_GDXINGXI: 'More Information', //更多信息
    SUPPLIER_QINGTONGYI: 'please approve ', //请同意
    SUPPLIER_GONGSITIJIAODEJIBENXINXIXIUGAISHENQING:
      ' the basic information modification application submitted by the company', //公司提交的基本信息修改申请
    SUPPLIER_GONGYINGSHANGLEIXINGTIPS:
      '您可以向大众集团采购部门提供的产品是否属于汽车 零部件？</br>若是：则选择生产采购；若否：则选择一般 采购。</br>生产采购：直接用于汽车生产的外购零部件和生产材 料、生产辅料的采购。</br>一般采购：除直接构成汽车的零部件及材料以外的物资以及服务的采购。</br>诸如：生产设备、测试设备和仪器、土建工程、公用动力和通用设备及其</br>安装工程、计算机软硬件、生产用辅料和刀具、办公用品、开发服务、物流</br>服务、市场营销服务、公共服务等的采购以上定义仅供参考，请和采购员确</br>认之后进行选择。', //供应商类型tips
    SUPPLIER_GAILAN: 'Overview', //概览
    SUPPLIER_FRMZONGHEGUANLI: 'FRM Comprehensive Management', //FRM综合管理
    SUPPLIER_XINGONGYINGSHANGPINGJI: 'New Supplier Rating', //新供应商评级
    SUPPLIER_CHUBUPINGJI: 'Initial Rating', //初步评级
    SUPPLIER_SHENRUPINGJI: 'In-depth Analysis', //深入评级
    SUPPLIER_FENGXIANXINHAO: 'Risk Signal', //风险信号
    SUPPLIER_YUQINGJIANCE: 'Media Monitoring', //舆情监测
    SUPPLIER_GONGYINGSHANGRONGZISHENQING: 'Supplier Financing Application', //供应商融资申请
    SUPPLIER_CAILIAOZU_GONGYIZUBIANHAO: 'Material Group/Process Group Number', //材料组/工艺组编号
    SUPPLIER_CAILIAOZU_DUNSHAO: 'DUNS', //DUNS号
    SUPPLIER_CAILIAOZU_ISXIANGGUNA: 'Is It Relevant To Me', //是否与我相关
    SUPPLIER_CAILIAOZU_XIANGGUANKESHI: 'The Relevant Departments', //相关科室
    SUPPLIER_CAILIAOZU_JIARUHEIMINGDAN: 'Join Blacklist ', //加入黑名单
    SUPPLIER_CAILIAOZU_FAQICHUPINGQINGDAN:
      'Sponsor Preliminary Assessment Inventory ', //发起初评清单
    SUPPLIER_CAILIAOZU_YAOQINGZHUCE: 'Invitation Register', //邀请注册
    SUPPLIER_CAILIAOZU_YICHUHEIMINGDAN: 'Remove Blacklist', //移除黑名单
    // ------------sprint10  FRM 评级开始 --------------------------------------
    SPR_FRM_FRMGL_GYSZYMCSC: '供应商中文名（CSC）', //供应商中文名（CSC）
    SPR_FRM_FRMGL_XGKS: '相关科室', //相关科室
    SPR_FRM_FRMGL_CPSJ: '初评时间', //初评时间
    SPR_FRM_FRMGL_CPSJQZ: '初评时间起止', //初评时间起止
    SPR_FRM_FRMGL_WPSJ: '外评时间', //外评时间
    SPR_FRM_FRMGL_WPSJQZ: '外评时间起止', //外评时间起止
    SPR_FRM_FRMGL_WP: '外评', //外评
    SPR_FRM_FRMGL_SPZT: '深评状态', //深评状态
    SPR_FRM_FRMGL_DXDFSJ: '定性打分时间', //定性打分时间
    SPR_FRM_FRMGL_DXDFSJQZ: '定性打分时间起止', //定性打分时间起止
    SPR_FRM_FRMGL_DXDFZT: '定性打分状态', //定性打分状态
    SPR_FRM_FRMGL_TZHPJ: '调整后评级', //调整后评级
    SPR_FRM_FRMGL_SPSJ: '深评时间', //深评时间
    SPR_FRM_FRMGL_SPSJQZ: '深评时间起止', //深评时间起止
    SPR_FRM_FRMGL_DLDF: '定量得分', //定量得分
    SPR_FRM_FRMGL_DXDF: '定性得分', //定性得分
    SPR_FRM_FRMGL_DCCB: 'Export Financial Statements', //导出财报
    SPR_FRM_FRMGL_DCTJBB: '导出统计报表', //导出统计报表
    SPR_FRM_FRMGL_VWAGPJ: 'VWAG评级', //VWAG评级
    SPR_FRM_FRMGL_FQCPQD: '发起初评清单', //发起初评清单
    SPR_FRM_FRMGL_DQRCPQD: '待确认初评清单', //待确认初评清单
    SPR_FRM_FRMGL_CQCPMX: '查看初评模型', //查看初评模型
    SPR_FRM_DEP_WHHYJZ: 'Industry Average Maintain', //维护行业均值
    SPR_FRM_DEP_REMOVEGROUP: '移除集团', //移除集团
    SPR_FRM_DEP_ADDGROUP: '加入集团', //加入集团
    SPR_FRM_DEP_NEWGROUP: '新建集团', //新建集团
    SPR_FRM_DEP_SUBDERFR: '提交深评报告审核', //提交深评报告审核
    SPR_FRM_DEP_SUBLFA: '提交清单审批', //提交清单审批
    SPR_FRM_DEP_REPORTDISN: '报告分发', //报告分发
    SPR_FRM_DEP_END: '终止', //终止
    SPR_FRM_DEP_EXPORT: '导出', //导出
    SPR_FRM_DEP_SUPNAME: 'Supplier Name', //供应商名称
    SPR_FRM_DEP_GROUPPACK: '集团名称', //集团名称
    SPR_FRM_DEP_STATE: 'Status', //状态
    SPR_FRM_DEP_SPEEDPROGRESS: '进度', //进度
    SPR_FRM_DEP_ENCLOSUER: '附件', //附件
    SPR_FRM_DEP_INTERVIEWCON: '访谈内容', //访谈内容
    SPR_FRM_DEP_DEPREPORT: '深评报告', //深评报告
    SPR_FRM_DEP_FRMJP: 'FRM简评', //FRM简评
    SPR_FRM_DEP_FINANA: 'Financial Statements Analysis', //财报分析
    SPR_FRM_DEP_DEPRESULT: '深评结果', //深评结果
    SPR_FRM_DEP_DEPTIME: '深评时间', //深评时间
    SPR_FRM_DEP_PREASRESULT: '初评结果', //初评结果
    SPR_FRM_DEP_OUTRATING: '外评', //外评
    SPR_FRM_DEP_TRACKFRE: '跟踪频率', //跟踪频率
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
    SPR_FRM_DEP_CXWHDX: 'Suppliers Select ', //维护呈现对象
    SPR_FRM_DEP_DQHY: '当前行业', //当前行业
    SPR_FRM_DEP_HYMC: '行业名称', //行业名称
    SPR_FRM_DEP_HYJZ: '行业均值', //行业均值
    SPR_FRM_DEP_SVWGYSJZ: 'SVW供应商均值', //SVW供应商均值
    SPR_FRM_DEP_FTQD: '访谈清单', //访谈清单
    SPR_FRM_DEP_JRHYJZ: 'Industry Average Add', //加入行业均值
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
    SPR_FRM_DEP_CREATEDATE: 'Establishment Date', // 成立时间
    SPR_FRM_DEP_HC: '员工人数', // 员工人数
    SPR_FRM_DEP_METRIC: '指标（大类）', // 指标（大类）
    SPR_FRM_DEP_SIMPLECOM: '简评', // 简评
    SPR_FRM_DEP_OBJPLACE: 'Suppliers Select', // 请选择呈现对象
    SPR_FRM_DEP_AVGPLACE: 'Industry Average Add', // 请选择行业均值
    SPR_FRM_DEP_PAYTURNOVER: '应付账款周转率', // 应付账款周转率
    SPR_FRM_DEP_AVGERROR: '请选择行业类型', // 请选择行业类型
    SPR_FRM_DEP_BIZREMARK: '来源于公开信息，供应商提供信息和供应商访谈。', // 来源于公开信息，供应商提供信息和供应商访谈。
    SPR_FRM_DEP_FANREMARK:
      '财务分析基于供应商提供/资信报告财务数据和供应商访谈。', // 财务分析基于供应商提供/资信报告财务数据和供应商访谈。
    SPR_FRM_DEP_COMREMARK:
      '本报告仅供上汽大众内部商务决策参考之用。请对所述供应商所有信息严格保密，不得向任何其他第三方透露本报告的任何内容，请在公司内部谨慎合理使用所述信息。本报告不得作为法律诉讼的依据，上汽大众不承担任何责任。', // 本报告仅供上汽大众内部商务决策参考之用。请对所述供应商所有信息严格保密，不得向任何其他第三方透露本报告的任何内容，请在公司内部谨慎合理使用所述信息。本报告不得作为法律诉讼的依据，上汽大众不承担任何责任。
    SPR_FRM_DEP_CHECK: '必填项不存在', // 必填项不存在
    SPR_FRM_DEP_SELECTGROUP: '选择集团', // 选择集团
    SPR_FRM_DEP_ALLOK: '全部选取', // 全部选取
    SPR_FRM_DEP_ALLCANCEL: '全部移除', // 全部移除
    SPR_FRM_DEP_CHECKDCSTATUS: '供应商状态错误',
    SPR_FRM_DEP_CHECKSPSTATUS: '请确认发起深评清单的供应商状态为“草稿”',
    SPR_FRM_DEP_COMMET: '只能选择未加入集团的供应商数据',
    SPR_FRM_DEP_STOPMSG:
      '只能终止状态为信息收集、财务经营与分析、访谈与调查、报告完成、报告驳回的供应商数据',
    SPR_FRM_DEP_JTGDSJKZ:
      '集团、股东、实际控制人对公司的支持：资金、技术、管理等…',
    SPR_FRM_DEP_INPUTERROR: '行业名称不能为空',
    SPR_FRM_DEP_HYMCYCZ: '行业名称已存在，请重新输入',
    SPR_FRM_FRMGL_INVALID: '状态为有效，不能操作', //初步评级有效提示信息
    SPR_FRM_FRMGL_VALID: '状态为无效，不能操作', //初步评级无效提示信息
    SPR_FRM_FRMGL_XZFTQDMB: '下载模板', //下载模板
    SPR_FRM_FRMGL_BGFFMESSAGE: '供应商评级结果或相关科室错误', //供应商评级结果或相关科室不一致
    SPR_FRM_XGYSPJ_QXZSJLY: '请选择数据来源', //请选择数据来源
    SPR_FRM_XGYSPJ_DCCB: 'Export Financial Statements', //导出财报s
    SPR_FRM_XGYSPJ_QXZYTSJTJ: 'please select a piece of data', //请选择一条数据
    SPR_FRM_XGYSPJ_ZCZBY: 'Please input registered capital (yuan)', //请输入注册资本（元）
    SPR_FRM_XGYSPJ_CGKS: 'Purchasing Department', //采购科室
    SPR_FRM_XGYSPJ_GYSRZGL: 'Supplier Financing Platform Management', //供应商融资管理
    SPR_FRM_XGYSPJ_J: '家', //家
    SUPPLIER_CNYJ: 'Capacity Alert', //产能预警
    SPR_FRM_XGYSPJ_JSHWC: 'Completed', //家审核完成
    SPR_FRM_XGYSPJ_SHWC: 'Completed', //审核完成
    SPR_FRM_XGYSPJ_JSQZ: 'In Progress', //家申请中
    SPR_FRM_XGYSPJ_SQZ: 'In Progress', //申请中
    SPR_FRM_XGYSPJ_FXXH: 'Risk Signal', //风险信号
    SPR_FRM_XGYSPJ_GYSXJDDQK: 'Supplier Quotation Information', //供应商询价定点情况
    SPR_FRM_XGYSPJ_YQQK: 'Media Monitoring', //舆情监测
    SPR_FRM_XGYSPJ_PJJG: 'Rating Result', //评级结果
    SPR_FRM_XGYSPJ_GYSYWMC: 'Supplier Name (English)', //供应商英文名称
    SPR_FRM_XGYSPJ_SQSJ: 'Application Date', //申请时间
    SPR_FRM_XGYSPJ_CGY: 'Buyer', //采购员
    SPR_FRM_XGYSPJ_PJSJ: 'Rating Date', //评级时间
    SPR_FRM_XGYSPJ_PJFZR: 'Person in Charge of Rating', //评级负责人
    SPR_FRM_XGYSPJ_BTGYY: 'Failure Reason', //不通过原因
    SPR_FRM_XGYSPJ_SJLY: 'Data Source', //数据来源
    SPR_FRM_XGYSPJ_CKGYSXX: '查看供应商信息', //查看供应商信息
    SPR_FRM_XGYSPJ_GYSJYJRDCLZ: '供应商将要加入的材料组', //供应商将要加入的材料组
    SPR_FRM_XGYSPJ_SFTY: '是否同意', //是否同意
    SPR_FRM_XGYSPJ_GSDZRSQ: '公司的准入申请', //公司的准入申请
    SPR_FRM_XGYSPJ_RWRQ: '任务日期', //任务日期
    SPR_FRM_XGYSPJ_GYSCWPJJG: '供应商财务评级结果', //供应商财务评级结果
    SPR_FRM_XGYSPJ_WFPJ: 'Rating Failed', //无法评级
    SPR_FRM_XGYSPJ_TJJS: 'Submit for Rating', //提交计算
    SPR_FRM_XGYSPJ_TJSP: 'Submit for Approval', //提交审批
    SPR_FRM_XGYSPJ_TJQQCG: 'Return to Forward Sourcing', //退回前期采购
    SPR_FRM_XGYSPJ_DQWBPJ: 'Fetch external ratings', //调取外部评级
    SPR_FRM_XGYSPJ_GYSZRPGMO_JBXX:
      'Supplier Admission Assessment Model - Basic information', //供应商准入评估模型-基本信息
    SPR_FRM_XGYSPJ_SSLB: 'Data Category', //数据类别
    SPR_FRM_XGYSPJ_SJZ: 'Data Value', //数据值
    SPR_FRM_XGYSPJ_GYSZRPGMXBZ: 'Supplier Admission Assessment Model - Remarks', //供应商准入评估模型 - 备注
    SPR_FRM_XGYSPJ_QZGYSZRPGMXBZZTXWFPJYY:
      'Please fill in the reasons for not being able to grade in the Supplier Admission Assessment Model - Remarks', //请在供应商准入评估模型-备注中填写无法评级原因
    SPR_FRM_XGYSPJ_JSZ: 'Calculated Value', //计算值
    SPR_FRM_XGYSPJ_SM: 'Explain', //说明
    SPR_FRM_XGYSPJ_GDXX: 'Shareholder Information', //股东信息
    SPR_FRM_XGYSPJ_GDMC: 'Shareholder Name', //股东名称
    SPR_FRM_XGYSPJ_GJDQ: 'Country/Region', //国家/地区
    SPR_FRM_XGYSPJ_CZE: 'Amount Contribution', //出资额
    SPR_FRM_XGYSPJ_BZ: 'Currency', //币种
    SPR_FRM_XGYSPJ_ZYYW: 'Primary Business', //主要业务
    SPR_FRM_XGYSPJ_ZYYWHYGS: 'Main business industry attribution', //主要业务行业归属
    SPR_FRM_XGYSPJ_GDDGSDZCQK: 'Shareholder support for the company', //股东对公司的支持情况
    SPR_FRM_XGYSPJ_GDZZZJHM: 'Shareholder license/certificate number', //股东证照/证件号码
    SPR_FRM_XGYSPJ_DGLX: 'Shareholders Type', //股东类型
    SPR_FRM_XGYSPJ_CGBL: 'Shareholding Ratio (%)', //持股比例（%）
    SPR_FRM_XGYSPJ_GYSZRPGMO_CWXX:
      'Supplier Admission Assessment Model - Financial Position', //供应商准入评估模型-财务状况
    SPR_FRM_XGYSPJ_TBQ: 'Before filling (yuan)', //填补前（元）
    SPR_FRM_XGYSPJ_GYSZRPGMX_DFZB: 'Supplier admittance evaluation model-PKPI', //供应商准入评估模型-得分指标
    SPR_FRM_XGYSPJ_ZB: 'PKPI', //指标
    SPR_FRM_XGYSPJ_DF: 'Score', //得分
    SPR_FRM_XGYSPJ_QZ: 'Weight', //权重
    SPR_FRM_XGYSPJ_DFQZ: 'Grades*Weight', //得分*权重
    SPR_FRM_XGYSPJ_FXGZTS: 'Risk Reminder', //风险关注点提示
    SPR_FRM_XGYSPJ_GYSZRPGMX_FXYJ:
      'Supplier Entry Evaluation Model - Risk Alerts', //供应商准入评估模型-风险预警
    SPR_FRM_XGYSPJ_GYSZRPGMX_BZ: '供应商准入评估模型-备注', //供应商准入评估模型-备注
    SPR_FRM_XGYSPJ_YJZB: 'Alert Criteria', //预警指标
    SPR_FRM_XGYSPJ_ZBGS: 'Alert Formula', //指标公式
    SPR_FRM_XGYSPJ_JG: 'Results', //结果
    SPR_FRM_XGYSPJ_YJFW: 'Alarming scope', //预警范围
    SPR_FRM_XGYSPJ_SFYJ: 'Alarming or Not', //是否预警
    SPR_FRM_XGYSPJ_YJTS: 'Alarming Reminder', //预警提示
    SPR_FRM_XGYSPJ_YJWZSM: 'Alarming Reminder: Text Description', //预警：文字说明
    SPR_FRM_XGYSPJ_TZQFS: 'Grade before Adjustment', //调整前分数
    SPR_FRM_XGYSPJ_TZQJB: 'Rating before Adjustment', //调整前级别
    SPR_FRM_XGYSPJ_TSJJF: 'Other Grades Added or Deducted', //特殊加减分
    SPR_FRM_XGYSPJ_TZHJB: 'Rating after Adjustment', //调整后级别
    SPR_FRM_XGYSPJ_CWSJBZ: '财务数据备注：', //财务数据备注：
    SPR_FRM_XGYSPJ_QSRDWRMBDZCZBJES:
      'Please enter the Registered Capital Amount in RMB', //请输入单位为人民币的注册资本金数额
    SPR_FRM_XGYSPJ_TZHFS: '调整后分数', //调整后分数
    SPR_FRM_XGYSPJ_SFTGPG: 'Evaluation Passed or Failed', //是否通过评估
    SPR_FRM_XGYSPJ_SHHZQCYXGS: '上海汇众汽车有限公司', //上海汇众汽车有限公司
    SPR_FRM_XGYSPJ_GCDT: 'Factory Map', //工厂地图
    SPR_FRM_XGYSPJ_SMSHBJXJFCL: 'The Case of No Subtraction Treatment:', //什么时候不进行减分处理：
    SPR_FRM_XGYSPJ_FXXHJFYZ: 'Risk Signals Duduction Rules:', //风险信号减分原则：
    SPR_FRM_XGYSPJ_BGZRZHSG:
      'Strikes/natural disasters/accidents: 10 for the year in which they occur, no points will be deducted for the following year;<br/>  Quality problem: general -5; <br/> Serious - 10;  Recall: possible/small -5;<br/>  Large-scale (global or regional) -10;<br/>Multiple sets of reports, feedback from others about financial problems/shortage of funds: -5;<br/>  Administrative penalty (including environmental penalty) : general -5, major -10; <br/> Delay or suspension of supply due to problems of capital or going concern: -10;<br/>  Delay or suspension of supply for reasons unknown: -5;<br/>  Internal poor management (delayed sample delivery, poor sample delivery quality, unpaid wages, etc.) : -5;  ', //罢工/自然灾害/事故：发生当年-10，次年不扣分； 质量问题：一般-5；严重-10； 召回：可能发生/小规模-5；大规模（全球或多地区）-10； 多套报表、其他人反馈有财务问题/资金紧张：-5； 行政处罚（包括环保处罚）：一般-5，重大-10； 因资金、不能持续经营等问题供货延迟或停供：-10； 原因尚未确定的供货延迟或停供：-5； 内部管理不善（送样延迟、送样质量不好、拖欠工资等）：-5；
    SPR_FRM_XGYSPJ_YFXXHYJJ:
      'The original risk signal has been resolved without subsequent impact;  Does not affect the operation, financial, such as chattel mortgage;  After verification, the risk signal situation is inconsistent with the facts or exaggerated, such as the existence of special reasons for multiple sets of statements;  Financial problems will be directly reflected in the statements (balance sheet, income statement), and no additional points will be deducted for signals similar to the indicators in the initial evaluation model (such as consecutive years of losses)', //原风险信号已解决，无后续影响； 不影响经营、财务，如动产抵押； 核实后，风险信号情况与事实不符或夸大，如多套报表存在特殊原因； 财务问题会直接反映在报表（资产负债表、利润表）中，与初评模型中 指标类似的信号（如连年亏损），不额外扣分；
    SPR_FRM_FRMGL_FQCBPJ: 'Initiate A Preliminary Rating', //发起初步评级
    SPR_FRM_FRMGL_XGG: 'Related Stocks', //相关股
    SPR_FRM_FRMGL_SNTO: 'Last Year TO', //上年TO
    SPR_FRM_FRMGL_SYMX: 'Applicable Model', //适用模型
    SPR_FRM_FRMGL_SDTJ: 'Add Manully', //手动添加
    SPR_FRM_FRMGL_ZDTJ: 'Automatically Added', //自动添加
    SPR_FRM_FRMGL_DRGYS: 'Import Suppliers', //导入供应商
    SPR_FRM_FRMGL_TJZCP: 'Add To Preliminary Review', //添加至初评
    SPR_FRM_FRMGL_SDTJCBPJ: 'Manually Add Preliminary Ratings', //手动添加初步评级
    SPR_FRM_FRMGL_CPJG: 'Preliminary Evaluation Results', //初评结果
    SPR_FRM_FRMGL_SPJG: 'Deep Evaluation Results', //深评结果
    SPR_FRM_FRMGL_ZDTJ_TIP1:
      'Please set the time to view the "Preliminary Review List to be Confirmed"', //请设置查看“待确认初评清单”时间
    SPR_FRM_FRMGL_ZDTJ_TIP2:
      'Reminder: Please go to the "Pending Confirmation List" to view after the selected date', //提示：请于选定日期后前往“待确认初评清单”查看
    SPR_FRM_FRMGL_CKMX: 'View Model', //查看模型
    SPR_FRM_FRMGL_MXlX: 'Model Type', //模型类型
    SPR_FRM_FRMGL_MXMC: 'Model Name', //模型名称
    SPR_FRM_FRMGL_XZSPYY: 'Reasons For Choosing Deep Comment', //选择深评原因
    SPR_FRM_FRMGL_QSRXXYY: 'Please Enter A Detailed Reason…', //请输入详细原因…
    SPR_FRM_FRMGL_QXZPJJG: 'Please select the rating result…', //请选择评级结果…
    SPR_FRM_FRMGL_DXDAF: 'Qualitative Scoring', //定性打分
    SPR_FRM_FRMGL_VWAGSJ: 'VWAG Time', //VWAG时间
    SPR_FRM_FRMGL_FCSJQ: 'Start And End Of Issue', //发出时间起
    SPR_FRM_FRMGL_SFXSLSDF: 'Whether To Display Historical Scores', //是否显示历史打分
    SPR_FRM_FRMGL_DCGYSMB: 'Export supplier template', //导出供应商模板
    SPR_FRM_CBPJ_BB: 'Versions', //版本
    SPR_FRM_CBPJ_PFFCSJ: 'Score Issued Time', //评分发出时间
    SPR_FRM_CBPJ_PFFHSJ: 'Rating Return Time', //评分返回时间
    SPR_FRM_CBPJ_ZXCZ: 'Latest Operation', //最新操作
    SPR_FRM_CBPJ_CZJL: 'Operation Record', //操作记录
    SPR_FRM_CBPJ_THLY: 'Reason For Return', //退回理由
    SPR_FRM_CBPJ_FP: 'Assign', //分派
    SPR_FRM_CBPJ_CXDF: 'Re-scoring', //重新打分
    SPR_FRM_CBPJ_QXZKG: 'Please select section/share', //请选择科/股
    SPR_FRM_CBPJ_QXZTHYY: 'Please select the reason for return', //请选择退回原因
    SPR_FRM_CBPJ_QXZZPDX: 'Please select the transferee', //请选择转派对象
    SPR_FRM_CBPJ_QDQXM: 'Are you sure to cancel', //确定取消吗
    SPR_FRM_CBPJ_YY: 'Follow', //沿用
    SPR_FRM_CBPJ_ZCDHYDYX: 'The impact of policies on the industry', //政策对行业的影响
    SPR_FRM_CBPJ_HYGQZK: 'Industry Supply And Demand Status', //行业供求状况
    SPR_FRM_CBPJ_GLGFCD: 'Degree of management standard', //管理规范程度
    SPR_FRM_CBPJ_XMGLNL: 'Project management ability', //项目管理能力
    SPR_FRM_CBPJ_HYDB: 'Industry Reputation', //行业口碑
    SPR_FRM_CBPJ_ZYKHSL: 'Main Customer Strength', //主要客户实力
    SPR_FRM_CBPJ_YZYKHHZWDX: 'Stability of cooperation with major customers', //与主要客户合作稳定性
    SPR_FRM_CBPJ_ZYGYSSL: 'Main supplier strength', //主要供应商实力
    SPR_FRM_CBPJ_YZYGYSHZWDX: 'Stability of cooperation with major suppliers', //与主要供应商合作稳定性
    SPR_FRM_CBPJ_HTLXQK: 'Contract performance', //合同履行情况
    SPR_FRM_CBPJ_ZJGXSJ: 'Last update time', //最近更新时间
    SPR_FRM_CBPJ_ZJGXR: 'Recently updated', //最近更新人
    SPR_FRM_CBPJ_SFXSLSPJ: 'Whether To Display Historical Ratings', //是否显示历史评级
    SPR_FRM_CBPJ_JJF: 'With Or Without Points', //有无加减分
    SPR_FRM_CBPJ_SFLJLJ: 'Whether to downgrade two consecutive levels', //是否连降两级
    SPR_FRM_CBPJ_CBBJ: 'Financial Report Comparison', //财报比较
    SPR_FRM_CBPJ_DCCPMB: 'Export Preliminary Review Template', //导出初评模板
    SPR_FRM_CBPJ_CPZT: 'Initial Evaluation Status', //初评状态
    SPR_FRM_CBPJ_TZQDF: 'Score before adjustment', //调整前得分
    SPR_FRM_CBPJ_TZF: 'Adjustment points', //调整分
    SPR_FRM_CBPJ_TZHDF: 'Adjusted score', //调整后得分
    SPR_FRM_CBPJ_SFYX: 'is it effective', //是否有效
    SPR_FRM_CBPJ_YWJJF: 'With or without points', //有无加减分
    SPR_FRM_CBPJ_JXCPLC: 'Continue the initial evaluation process？', //继续初评流程？
    SPR_FRM_CBPJ_QSRWFPJYY: 'Please enter the reason for not being rated', //请输入无法评级原因
    SPR_FRM_CBPJ_SJZB: 'Three-level indicators', //三级指标
    SPR_FRM_CBPJ_RJZB: 'Secondary indicators', //二级指标
    SPR_FRM_CBPJ_YJZB: 'First-level index', //一级指标
    SPR_FRM_CBPJ_PJBJ: 'Rating comparison', //评级比较
    SPR_FRM_CBPJ_GYSCPQK: 'Preliminary Evaluation Of Suppliers', //供应商初评情况
    SPR_FRM_CBPJ_LSCP: 'Initial Comment on History', //历史初评
    SPR_FRM_ZNXZYTSJ: 'Only one piece of data can be selected', //只能选择一条数据
    SPR_FRM_CBPJ_QSL: 'Missing Rate%', //缺失率%
    SPR_FRM_CBPJ_TZQPJ: 'Rating Before Adjustment', //调整前评级
    SPR_FRM_CBPJ_TZHPJ: 'Adjusted Rating', //调整后评级
    SPR_FRM_CBPJ_DFQX: 'Detailed Score', //得分详细
    SPR_FRM_CBPJ_ZBMC: 'Indicator Name', //指标名称
    SPR_FRM_CBPJ_ZBSZ: 'Index Value', //指标数值
    SPR_FRM_CBPJ_ZBFZ: 'Index Score', //指标分值
    SPR_FRM_CBPJ_DFLY: 'Source Of Score', //得分来源
    SPR_FRM_CBPJ_TBSZ: 'Fill Value', //填补数值
    SPR_FRM_CBPJ_SFJSF: 'Whether To Be Careful', //是否谨慎分
    SPR_FRM_CBPJ_PJMX: 'Rating Details', //评级明细
    SPR_FRM_CBPJ_PJRY: 'Raters', //评级人员
    SPR_FRM_CBPJ_CPMBDCTIPS:
      'The preliminary evaluation template only supports a single data export, please confirm and export again.', //初评模板仅支持单条数据导出，请确认后重新导出。
    SPR_FRM_CBPJ_WPJYYYTIPS: 'Sorry, the reason cannot be empty!', //抱歉，无法评级原因不能为空！
    SPR_FRM_CBPJ_CBBJTIPS:
      'You can select at most 3 data, please select again!', //最多可选择5条数据，请重新选择！
    SPR_FRM_CBPJ_Y: 'Hava', //有
    SPR_FRM_CBPJ_W: 'Not Have', //无
    SPR_FRM_CBPJ_CZKS: 'Operation Department', //操作科室
    SPR_FRM_FRMGL_QXZQZSJ: 'Please select the start and end time', //请选择起止时间
    SPR_FRM_FRMGL_BJQZYGSJ: 'Must choose a time', //必须选择一个时间
    SPR_FRM_FRMGL_QXZSYMX: 'Please select the applicable model', //请选择适用模型
    SPR_FRM_CBPJ_QWCDF: 'Please finish scoring', //请完成打分
    SPR_FRM_CBPJ_ZYZTWCGCNJXDXDF:
      'Qualitative scoring can only be done if the status is draft.', //只能状态为草稿才能进行定性打分
    SPR_FRM_CBPJ_SXZTYWQCXQZ:
      'The selected status is wrong, please select again.', //所选状态有误，请重新选择。
    SPR_FRM_CBPJ_GZPANDUAN:
      'Returned to the state, the chief can not do other operations, please select again!', //退回状态，股长不能做其他操作，请重新选择！
    SPR_FRM_CBPJ_FRMPANDUAN:
      'In the returned state, the FRM administrator cannot perform qualitative scoring, return, transfer operations, please select again!', //退回状态，FRM管理员不能做定性打分，退回，转派操作，请重新选择！！
    // 风险信号
    SPR_FRM_FXXH_FXGYS: 'Risk supplier', //风险供应商
    SPR_FRM_FXXH_XHLY: 'The signal source', //信号来源
    SPR_FRM_FXXH_FKBM: 'Feedback Department', //反馈部门
    SPR_FRM_FXXH_TJSJ: 'Submit Time', //提交时间
    SPR_FRM_FXXH_GHGX: 'Supplier Relationship', //供货关系
    SPR_FRM_FXXH_CZFS: 'Disposition Way', //处置方式
    SPR_FRM_FXXH_SFWY: 'Whether the default', //是否违约
    SPR_FRM_FXXH_FXXHDL: 'Risk Signal-Broad Heading', //风险信号-大类
    SPR_FRM_FXXH_YXQSJ: 'Effective Machine Cycle Time', //有效期时间
    SPR_FRM_FXXH_FXXHXL: 'Risk Signal-Subclass', //风险信号-小类
    SPR_FRM_FXXH_CZSJ: 'Handling Time', //处置时间
    SPR_FRM_FXXH_JZ: 'Evolve', //进展
    SPR_FRM_FXXH_TJR: 'Submitter', //提交人
    SPR_FRM_FXXH_TJRKS: 'Submitter Department', //提交人科室
    SPR_FRM_FXXH_FZ: 'Copy', //复制
    SPR_FRM_FXXH_XJ: 'New', //新建
    SPR_FRM_FXXH_SDFQFXXH: 'Manually initiate risk signals', //手动发起风险信号
    SPR_FRM_FXXH_FXGYSSSKS: 'Department of risk supplier', //风险供应商所属科室
    SPR_FRM_FXXH_TZF: 'Adjusted score', //调整分
    SPR_FRM_FXXH_YXQ: 'Period of validity ', //有效期
    SPR_FRM_FXXH_XHSM: 'Signal That', //信号说明
    SPR_FRM_FXXH_XTFQXH: 'The system initiates a risk signal', //系统发起风险信号
    SPR_FRM_FXXH_QSRZS: 'Please enter (integer)', //请输入（整数）
    SPR_FRM_FXXH_QSS: 'Please search', //请搜索
    SPR_FRM_FXXH_QRTJ: 'Confirm Add', //确认添加
    SPR_FRM_FXXH_RWSSJGQGBTCBYQGYSZC:
      'If there are no search results, please close the pop-up window and invite vendors to register.', //若无搜索结果，请关闭弹窗并邀请供应商注册。
    SPR_FRM_FXXH_NSFQRTJSP: 'Do you confirm submission for approval?', //您是否确认提交审批
    SPR_FRM_FXXH_WZDGYSXX_QSRZQDTYSHXYDMHCS:
      '未找到供应商信息，请输入正确的"统一社会信用代码"后再尝试。', //未找到供应商信息，请输入正确的"统一社会信用代码"后再尝试。
    LK_ZHANGQITIAN: '账期（天）', //账期（天）
    SPR_FRM_FXXH_QQEFXXHDCZFSHJXTJ:
      'Please submit after confirming the disposition of risk signals', //请确认风险信号的处置方式后进行提交
    SPR_FRM_FXXH_TZFHYXQBNWK:
      'Adjustment points and validity periods cannot be empty', //调整分和有效期不能为空
    SPR_FRM_FXXH_YTJDFXXHSJBKSC: 'Submitted risk signal data cannot be deleted', //已提交的风险信号数据不可删除
    SPR_FRM_FXXH_SFQRTJ: 'Confirm submission', //是否确认提交
    // -----------------------ws3 供应商 end -------------------------------------------

    LK_WDYJ: 'my performance',
    LK_YJJC: 'performance basis',
    LK_MIAOSHU: 'describe',
    // LK_ZHUANGTAI: 'status',
    LK_FAQIREN: 'initiator',
    LK_DANJULEIX: 'Bill type',
    LK_YEWULEIXING: 'Business type',
    LK_CJRQ: 'create time',
    LK_GXRQ: 'update time',
    LK_GENGXINRIQIQI: 'start update time',
    LK_GENGXINRIQIZHI: 'end update time',
    LK_GXRQQZ: 'start and end of update date',
    LK_CLGL: 'output management',
    LK_NDMBGL: 'annual target management',
    LK_CJNDMBGL: 'Create annual goals',
    LK_XZYJJC: 'new performance basis',
    LK_XZYJJCTIP:
      'please edit the basic information first, and then select the file to upload',
    LK_XZYJFJTIP: 'No attachment, please upload',
    LK_XZWJ: 'select file',
    LK_PLJYSCLGL: 'batch budget output management',
    LK_SCCL: 'upload output',
    LK_XZMB: 'download template',
    LK_FHSJ: 'go back',
    LK_TZKS: 'notify department',
    LK_NIANDUYEJIJICHU: 'nnual performance base',
    LK_ZONGCHENCHENGSANJIANJICHUBIAO: 'parts foundation table',
    LK_QITA: 'other',
    LK_FQQR: 'Initiate confirmation',
    LK_RWJZRQ: 'task deadline',
    LK_GONGYINGSHANG: 'Supplier',
    // LK_CAIGOUGONGCHANG: 'purchasing plant',
    LK_QUERENZHUANGT: 'Confirm status',
    LK_FDJDCB: 'engine - battery pack',
    LK_BIANSUXIANG: 'transmission case',
    LK_PEIZHI: 'Configure',
    LK_CHEXINGDAIMA: 'model code',
    LK_CHANGPINJIAZU: 'Product family',
    LK_CPJZ: 'Product family',
    // LK_LINGJIANHAO: 'part number',
    LK_PLBJ: 'bulk edit',
    LK_QRSL: 'confirmed quantity',
    LK_QRJG: 'confirmed price',
    LK_JGLY: 'price source',
    LK_QRJGLY: 'confirmed price source',
    LK_QNCL: 'Year output',
    LK_SYH: 'index number',
    LK_SHUL: 'quantity',
    LK_JAGE: 'price',
    LK_KSLJ: 'ksl price',
    LK_KSLJIALAIYUAN: 'ksl price source',
    LK_KSLLAIYUANJIAGE: 'ksl price source',
    LK_CKJG: 'reference price',
    LK_CKJGLY: 'reference price source',
    LK_CAIGOUY: 'buyer',
    LK_CGCKJ: 'purchase reference price',
    LK_JIJIA: 'base price',
    LK_GZJD: 'Track',
    LK_LY: 'sorce',
    LK_CAOZ: 'operation',
    // LK_BANBENHAO:'Version No',
    // LK_QUEREN:'confirm',
    // LK_SHANGCHUANREN:'Upload People',
    JANUARY: 'january',
    FEBRUARY: 'february',
    MARCH: 'march',
    APRIL: 'april',
    MAY: 'may',
    JUNE: 'june',
    JULY: 'july',
    AUGUST: 'august',
    SEPTEMBER: 'september',
    OCTOBER: 'october',
    NOVEMBER: 'november',
    DECEMBER: 'december',
    LK_KESHI: 'department',
    PINJUN: 'average',
    CHIXU: 'continued',
    LK_VW: 'VW',
    LK_AUDI: 'AUDI',
    LK_SK: 'SK',
    LK_CAIGOUJINE: 'Amount Of Purchasing', //采购金额
    LK_DQZT: 'current state',
    LK_YWC: 'completed',
    LK_WWC: 'incomplete',
    LK_FQSJ: 'initiation time',
    LK_WCSJ: 'completion time',
    LK_DQESL: 'confirmed quantity',
    LK_JIAGEBIANHUA: 'Price change',
    //SP14
    LK_YJJETZ: 'Amount adjustment',
    LK_SJJSJZSJ: 'data calculation deadline',
    LK_GZLJZS: 'track total number of parts',
    LK_XZLJZS: 'total number of new parts',
    LK_QXLJZS: 'total number of cancelled parts',
    LK_LINGJIANGENZONGLEIXING: 'Part tracking type',
    LK_LJGZLX: 'Part tracking type',
    //SP15
    LK_JCBMBXZ: 'table template down',
    LK_PFJ_LJMC: 'PartName',
    LK_PFJ_CLZ: 'Stuff Gategory',
    LK_PFJ_PP: 'Brand',
    LK_PFJ_SX: 'Attribute',
    LK_PFJ_BZ: 'Remark',
    LK_PFJ_FE: 'Share',
    LK_PFJ_CGJG: 'Purchase price',
    LK_PFJ_XSLYC: 'Sales volume',
    LK_PFJ_DNCGJE: 'Purchase amount',
    // LK_CAILIAOZU:'Stuff gategory',
    // LK_DANWEI:'unit',
    // LK_LINGJIANLEIXING: 'part type', //零件类型
    // LK_CHEXINGDENGJI: 'Car Level', //车型等级
    // 零件生命周期
    LK_LINGJIANLVLI: 'Part resume',
    LK_YANBIANJINCHENG: 'Evolution process',
    // LK_JIAGEBIANHUA:'Price change',
    LK_LINGJIANGAO: 'Part height',
    LK_LINGJIANKUAN: 'Part width',
    LK_LINGJIANCHANG: 'Part length',
    LK_LINGJIANZHONGLIANG: 'Part weight',
    LK_CENGYONGCHEXING: 'Used models',
    // LK_CHEXING:	'车型',
    LK_MOJUHETONGHAO: 'Mold Contract No',
    LK_SAP_HETONGHAO: 'SAP Contract No',
    LK_RISE_HETONGHAO: 'RISE Contract No',
    LK_JIEZHIRIQI: 'closing date',
    LK_PEIJIANWULIU: 'parts logistics',
    LK_PILIANGWULIU: 'Batch Logistics',
    LK_EP_SHOUHOU: 'EP After sale',
    LK_ZHIBAO: 'Warranty',
    LK_PEIJIANQIANQI: 'Early stage of accessories',
    LK_QIANQICAIGOU: 'Early procurement',
    // LK_JICHUXINXI	:'基础信息',
    LK_FANHUISHUJULEIXINGZHICUOWU: 'Return data type value error',
    LK_YUANLINGJIANHAO: 'Original part number',
    LK_SHISIJIAGE: 'Implementation price',
    LK_TOUZI: 'investment',
    LK_KAIFA: 'development',
    // LK_QINGSHURULINGJIANHAO	:'请输入零件号',
    LK_MEIYOULINGJIANHAO: 'No part number',
    LK_TSSHIFOUQUERENSHANCHU: 'Confirm deletion, prompt',
    LK_SHOUCIXUNJIASHIJIAN: 'First inquiry time',
    LK_XUNJIALEIXING: 'Inquiry type',
    // LK_LINGJIANCAIGOUXIANGMULEIXING	:'零件采购项目类型',
    LK_GONGCHANG: 'factory',
    // LK_CHEXINGXIANGMU	:'车型项目',
    LK_SHIJIAN: 'Time',
    LK_YIXIANGSHUBIANHAO: 'Letter of intent No',
    LK_DINDDIANSHIJIAN: 'Fixed time',
    LK_RS_DANHAO: 'RS Odd Number',
    LK_AJIAN: 'A Price',
    LK_BJIAN: 'B Price',
    LK_BNKJIAGE: 'BNK Price',
    LK_QIANDUANBAOZHUANGFEI: 'Front packaging fee',
    LK_HOUDUANBAOZHUANGFEI: 'Packaging cost of later stage',
    LK_CUOZUOFEI: 'Operation fee',
    LK_YUNSHUFEI: 'freight',
    LK_TOUZIFEI: 'Investment fee',
    LK_KAIFAFEI: 'Development fee',
    LK_WULIUFUWUSHANG: 'Logistics service provider',
    LK_XUNJIACHANGLIANG: 'Inquiry output',
    LK_DINGDIANSHICHANNENG: 'Capacity at fixed point',
    LK_SHIFOUZUOGUOCHENGBENFENXI: 'Have you done cost analysis',
    LK_DINGDIANXINBIANHAO: 'Fixed point letter number',
    LK_HUIYIBIANHAO: 'Conference number',
    LK_SONGYANGSHIJIAN: 'Sample delivery time',
    LK_PEIJIANAJIA: 'Parts A Price',
    LK_DINGDIANXINGQIANSHUSHIJIAN: 'Fixed point letter signing time',
    LK_SHOUCI: 'first',
    LK_CHEXINGMINGCHENG: 'Model name',
    LK_DAORURIQI: 'Import date',
    LK_JIAGESHISIRIQI: 'Price implementation date',
    LK_TOUCHANRIQI: 'Production date',
    LK_QUXIAORIQI: 'Cancellation date',
    LK_MOJUTOUZIFEIYONG: 'Mould investment cost',
    LK_YANGJIANJIAGE: 'Sample price',
    LK_GUIZEBIANHAO: 'Rule number',
    LK_YUANCAILIAO: 'raw material',
    // LK_YONGLIANG	:'用量',
    LK_BUCAIZHOUQI: 'Make up period',
    LK_SHICHANGJIALAIYUAN: 'Source of market price',
    LK_GONGYINGXINXI: 'Supply information',
    LK_GONGYINGSHANGFENE: 'Supplier share',
    LK_GONGCHANGFENE: 'Factory share',
    LK_ERCIJIAN: 'Secondary parts',
    LK_FSHAO: 'FS Number',
    LK_LJQSMZQ: 'Part life cycle',
    LK_LAIYUAN: 'Sorce',
    LK_FADONGJIDIANCIBAO: 'Engine battery pack',
    MAIL: {
      NOTIFICATION: 'notification',
      MESSAGE: 'message',
      UNREAD: 'unread messages {unRead}',
      WILL: '{tipBegin} minutes to go',
      ONGOING: 'going on',
      OVERDUE: 'expired',
      UNREAD_STATUS: 'unread',
      READ_STATUS: 'read',
      READALL: 'mark all as read',
      CLEARALL: 'clear all',
      LOADING: 'loading...',
      NOMORE: 'no more',
      CLEARALL_TIPS: 'this operation will clear all unread and read messages',
      CONFIRM: 'confirm',
      CANCEL: 'cancel',
      ALL: 'all'
    },
    HOME_CARD: {
      HOME_MODULE_TASK: 'Top 5 Tasks',
      HOME_MODULE_SOURCING: 'Sourcing Overview',
      MY_APPLICATION: 'My Application',
      MY_APPROVAL: 'My Approval',
      OVERDUE: 'Overdue',
      IN_PROGRESS: 'In Progress',
      HOME_MODULE_SPONSER: 'FRM',
      HOME_MODULE_SCHEDULE: 'Schedule',
      HOME_MODULE_APPROVE: 'iAgree',
      HOME_MODULE_VOLUME: 'Volume Pricing',
      HOME_MODULE_NEWS: 'News'
    },
    //会议中英文
    MT_HUIYIMINGCHENG: 'Meeting name',
    MT_HUIYIDIDIAN: 'Meeting place',
    MT_HUIYILEIXING: 'Meeting type',
    MT_ZHUANGTAI: 'Status',
    MT_HUIYIRIQI: 'Meeting date',
    MT_ZHOUCI: 'Weeks',
    // MT_QUEREN: '确认',
    // MT_CHONGZHI: '重置',
    MT_XUHAO: 'Num',
    MT_CAOZUO: 'Operate',
    MT_CHEHUI: 'Recall',
    MT_SHANCHU: 'Delete',
    MT_CHUANGJIAN: 'Create',
    MT_BIANJI: 'Edit',
    MT_DAOCHU: 'Export',
    MT_PILIANGCHUANGJIAN: 'Batch Create',
    MT_CAOGAO: 'Draw',
    MT_KAIFANG: 'Open',
    MT_KAISHI: 'Start',
    MT_SUODING: 'Lock',
    MT_XIUGAI: 'Edit',
    MT_DAORUYITI: 'Import themen',
    MT_GUANBI: 'Close',
    MT_JIESHU: 'End',
    MT_TONGPING: 'Same screen',
    MT_ZHANSHI: 'Display',
    MT_SHENGCHENGHUIYIJIYAO: 'Generate meeting minutes',
    MT_SHANGCHUANHUIYIJIYAO: 'Upload meeting minutes',
    MT_HUIYISHIJIAN: 'Meeting time',
    MT_FUJIAN: 'Attachment',
    MT_QINGSHURU: 'Please input',
    MT_QINGXUANZE: 'Please select',
    MT_TO: 'To',
    MT_BITIAN:"required",
    MT_XUHAO:"No.",

    POSITION: {
      POSITION_NAME: 'Position name',
      POSITION_CODE: 'Post code',
      POSITION_USER: 'Position staff',
      POSITION_RELATIVE: 'Related posts',
      ORG_LEVEL: 'Organization Level',
      QUERY: 'Query',
      RESET: 'Reset'
    }
  }
  i18n.setLocaleMessage('en', oldLanguage)
  // var xmlHttp = ''
  // if (window.XMLHttpRequest) {
  //   xmlHttp = new XMLHttpRequest()
  // } else {
  //   // eslint-disable-next-line no-undef
  //   xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
  // }
  // xmlHttp.onreadystatechange = function () {
  //   if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
  //     const data = JSON.parse(xmlHttp.responseText)
  //     i18n.mergeLocaleMessage('en', data.data.cn)
  //   }
  // }
  // xmlHttp.open(
  //   'GET',
  //   'http://10.122.18.136:8088/i18n/getTranslationMap?from=protal',
  //   false
  // )
  // xmlHttp.setRequestHeader('Content-type', 'application/json')
  // xmlHttp.setRequestHeader('Accept', '*/*')
  // xmlHttp.send()
})
