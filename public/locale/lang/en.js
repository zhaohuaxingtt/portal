;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('i18n')))
    : typeof define === 'function' && define.amd
    ? define(['i18n'], factory)
    : ((global = global || self), factory(window.i18n))
})(this, function (i18n) {
  'use strict'
  var oldLanguage = {
    DANWEIBAIWANRENMINBI: '(unit: Mio. RMB)',
    DAOCHUYUSUANMINGXI: 'Export Budget Detail',
    RXTZQLXNDYSFZR: 'For adjustments, please contact the annual budget owner',
    YCYL: 'Predicted Consumption',
    QXZCGZSZTSJJXTZCZ:
      'Please select Draft/Official status data for notification operation',
    TZLINIE: '',
    PINPAI: 'Brand',
    ZONGYUSUANJINEMAOHAO: 'Tot. Budget',
    YUSUANJINE: 'Budget',
    PINGPAI: 'Brand',
    SHANCHU: 'Delete',
    TIAOZHENGHOUYUSUANZONGJINEMAOHAO: 'Post-Adj. Total Budget',
    REVIEW: 'Review',
    MTZNIANDUYUSUANBANBENHAOYONGLIANGBANBEN:
      'MTZ Annual Budget-Version No.-Consumption Version',
    DANGQIANYUSUANJINE: 'Cur. Budget.(Ml)',
    CAIGOUYUANYUSUANZONGLAN: 'LINIE Budget Overview',
    DAIQUEREN: 'To-be Confirmed',
    YIQUEREN: 'Confirmed',
    KESHIYUSUANZONGLAN: 'Dept. Budget Overview',
    PINPAIYUSUANZONGLAN: 'Brand Budget Overview',
    BIANJIQITA: 'Other',
    KESHICAIGOUYUANMINGCHENG: '',
    KESHICAIGOUYUANMINGCHENG张三CSM: '',
    KESHICAIGOUYUANMINGCHENG李四CSI: '',
    KESHICAIGOUYUANMINGCHENG王五CSX: '',
    'KESHICAIGOUYUANMINGCHENGCSG-王小二采购科': '',
    'KESHICAIGOUYUANMINGCHENGCSG-张三采购科': '',
    'KESHICAIGOUYUANMINGCHENGCSG-张三1采购科': '',
    'KESHICAIGOUYUANMINGCHENGCSG-李四采购科': '',
    MTZ年度预算: 'MTZ Annual Budget',
    MTZNIANDUYUSUANBIANJIundefinedundefinedundefinedundefinedundefinedundefined:
      'MTZ Annual Budget',
    'MTZNIANDUYUSUANBIANJIundefinedundefinedundefinedundefinedundefinedundefinedundefinedundefined2222BKM-002':
      '',
    KESHICAIGOUYUANMINGCHENG斯柯达智慧采购科: '',
    QINGXUANZHONGYAOCAOZUODESHUJU: 'Please select the data to manipulate',
    'MTZNIANDUYUSUANBIANJI2007A(25/2020)': '',
    'MTZNIANDUYUSUANBIANJI20V07(25/2020)': '',
    'MTZNIANDUYUSUANBIANJInullV07(25/2020)': '',
    WEITONGZHI: 'Fail to notify',
    KESHICAIGOUYUANMINGCHENGnullnull: '',
    'KESHICAIGOUYUANMINGCHENG物流员-2超级管理员部门': '',
    KESHICAIGOUYUANMINGCHENG上汽大众超级管理员部门: '',
    CHUSHIYUSUANJINEBAIWAN: 'Init. Budget (Mio.) ',
    CAILIAOZHONGLEIBIANHAO: 'Material Sub-Division Code',
    ZUIZHONGYUSUANZONGJINEMAOHAO: 'Final Total Budget (Mio. RMB)',
    TIAOZHENGHOUYUSUANJINE: 'Adj.Budget(Ml)',
    TIAOZHENGHOUYUSUANJINEMAOHAO: 'Adj.Budget',
    会议类型: 'Meeting Type',
    组名: 'Group Name',
    与会人: 'Participants',
    参与人员姓名: 'Participants',
    姓名: 'Name',
    电子邮箱: 'Email',
    工号: 'Empl. No',
    所属部门: 'Dept.',
    MT_ZUMING: 'Group',
    MT_YUHUIREN: 'Participant',
    MT_CANYURENYUANXINGMING: 'Participant',
    MT_XINGMING: 'Name',
    MT_DIANZIYOUXIANG: 'Email',
    MT_GONGHAO: 'Empl. No.',
    MT_SUOSHUBUMEN: 'Dept.',
    会议名称: 'Meeting Name',
    周次: 'Times per week',
    LK_DANJULEIXING: 'Bill Type',
    'RFQ_GL.BJ': 'RFQ_GL.BJ',
    CSC编号: 'CSC No.',
    XIANGMUMIAOSHU: 'XIANGMUMIAOSHU',
    CSCZHUANGTAI: 'CSCZHUANGTAI',
    RS状态: 'RS Status',
    'RFQ_GL.RFQ_NUMBER': 'RFQ_GL.RFQ_NUMBER',
    DANJULEIXING: 'DANJULEIXING',
    CAIGOUSHNEGQINGDANHAO: 'CAIGOUSHNEGQINGDANHAO',
    TUIJIANGONGYINGSHANG: 'TUIJIANGONGYINGSHANG',
    SHENJILEIXING: 'SHENJILEIXING',
    CSCCHUANGJIANRIQI: 'CSC Creation Date',
    会议日期: 'Meeting Date',
    GP_NO: 'GP_NO',
    批量排序: 'Sort',
    发送大会议程: 'Send Meeting Schdule',
    BAOJIALEIBIE: 'BAOJIALEIBIE',
    'RFQ_GL.NUMBER': 'RFQ_GL.NUMBER',
    'RFQ_GL.NAME': 'RFQ_GL.NAME',
    DANGQIANLUNCI: 'DANGQIANLUNCI',
    GONGYINGSHANGBAOJIAZHUNAGTAI: 'GONGYINGSHANGBAOJIAZHUNAGTAI',
    '竞价开始/结束时间': 'Bidding Starting/Ending Date',
    BAOJIASHOUDAORIQ: 'BAOJIASHOUDAORIQ',
    BAOJIAJIEZHIRIQI: 'BAOJIAJIEZHIRIQI',
    报价单: 'Quote',
    股别: '',
    项目: 'Project',
    上会次数: 'Meeting Ct.',
    '定点金额(不含可抵扣税)': 'Nomi. Price (excl. deductible tax',
    资料类型: 'Data Type',
    所属会议: 'Subordinate',
    资料名称: 'Data Name',
    类型: 'Type',
    发布者: 'Publisher',
    发布日期: 'Publish Date',
    MT_ZILIAOLEIXING: 'Data Type',
    MT_SUOSHUHUIYI: 'Meeting',
    MT_ZILIAOMINGCHENG: 'Data Name',
    MT_LEIXING: 'Type',
    MT_FABUZHE: 'Publisher',
    MT_FABURIQI: 'Publish Date',
    MT_XUHAO2: 'No.',
    MT_CAOZUO2: 'Opeartion',
    文件名称: 'File Name',
    原材料编号大类: 'Raw Material No.(Large Scale)',
    '原材料名称(中文)': 'Raw Material Name (CN)',
    '原材料名称(英文)': 'Raw Material Name (EN)',
    产品组编号: 'Product Group Code',
    '产品组名称(中)': 'Product Group Name (CN)',
    '产品组名称(德)': 'Product Group Name (DE)',
    批量修改: 'Batch Maintenance',
    新增零件: 'New Part',
    '零件名称(中)': 'Part Name (CN)',
    '零件名称(德)': 'Part Name (DE)',
    图纸日期: 'Drawing Date',
    零件材料组: 'Material Group',
    'common sourcing': 'Common Sourcing',
    SET号: 'SET No.',
    最近一次修改时间: 'Latest Modification Time',
    计量单位转换关系: 'Conversion of Meas. Units',
    'PPK853666 前雾灯盖板': '',
    '6VD963553   SITZBELEGERKENNUNG': '',
    '3ED971121F  充电器': '',
    带: '',
    只: 'pc',
    '5NG971369A  充电器': '',
    '3CD317801A 冷却油管': '',
    '3CD317801A  冷却油管': '',
    '5GD971120GS LTGS.TUERVERKABELG': '',
    '555556364 cf零件aaa-8': '',
    '10D867011  BOI 车门内饰板(幽黑色/旋灰色)': '',
    '2GG807301F TUERGRIFF,AUSSEN': '',
    '3KD000389 cf测试零件': '',
    '18D711355 手制动支架': '',
    '5TD971120DG LTGS.TUERVERKABELG': '',
    'ZVS857520   LAVIDA蓝镜总成': '',
    '6Q1857502CF   带侧面转向灯的外后镜总成（手动）': '',
    平方毫米: 'mm²',
    公斤: 'kg',
    盒: 'Box',
    '5TD971120DB7 充电器': '',
    '5TD971120DB4 充电器': '',
    '330959796 中央集控控制器': '',
    '330959796   中央集控控制器': '',
    '5GD971120GB 门线束总成': '',
    零件名称: 'Part Name',
    零件来源: 'Part Source',
    '请输入/请选择': 'Please enter/Please Select',
    零件状态: 'Part Status',
    激活: 'Activate',
    零件中文名称: 'Part Name (CN)',
    零件德文名称: 'Part Name (DE)',
    最后一次修改时间: 'Latest Modification Time',
    是否贵金属: 'Precious Metal (Y/N)',
    生效: 'activated',
    原材料大类: 'Raw Material Group (L)',
    大类元素简称: 'Group (L) Element Abbr.',
    中类计量单位: 'Group (M) Meas. Unit',
    原材料计量单位: 'Raw Material Meas. Unit',
    '中类描述(中)': 'Sub-division Desc. (CN)',
    '中类描述(英)': 'Sub-division Desc. (EN)',
    是否为贵金属: 'Precious Material (Y/N)',
    有色金属: 'Non-ferrous Metal',
    MTZ材料组信息: 'MTZ Material Group Info.',
    'MTZ材料组名称(中)': 'MTZ Material Group Name (CN)',
    'MTZ材料组名称(英)': 'MTZ Material Group Name (EN)',
    中类名称: 'Sub-division Name',
    查看关联关系: 'view relevance',
    MTZ材料组编号: 'MTZ Material Group No.',
    '大类编号/名称': 'Group (L) No./Name',
    材料中类: 'Material Group (M)',
    中类描述: 'Group (M) Desc.',
    请输入科室编号: 'Please enter Dept. Code',
    模具材料组编号: 'Tooling Material Group No.',
    '模具材料组名称（中）': 'Tooling Material Group Name (CN)',
    '模具材料组名称（德）': 'Tooling Material Group Name (DN)',
    ' ': '',
    基础信息: 'Basic Info',
    材料组编号: 'Material Group No.',
    材料组名称: 'Material Group Name',
    '材料组名称(德)': 'Material Group Name (DE)',
    主采购员: 'Primary Buyer',
    配件采购科室: 'SP Buyer Dept.',
    配件采购员: 'SP Buyer',
    模具预算属性: 'Tooling Budget Attribute',
    已关联零件6位号: 'Associated Part 6-digit No.',
    工艺组编号: 'Process Group No.',
    工艺组名称: 'Process Group Name',
    '工艺组名称(德)': 'Process Group Name (DE)',
    工艺组说明: 'Process Group Desc.',
    CBD预设: 'CBD Preset',
    安全电器件: 'Safety Appliance',
    零件6位号: '6-digit No.',
    '零件名称（中）': 'Part Name (CN)',
    '零件名称（德）': 'Part Name (DE)',
    新增材料组: 'New Material Group',
    '成型件< DIN A4 000-099 Z': '',
    ' 编辑': 'Edit',
    MTZNIANDUYUSUANBIANJIundefinedundefined: 'undefined',
    Linie: 'Linie',
    材料组说明: 'Material Group Desc.',
    入账是否抽查: 'Randomly Checked (Y/N)',
    Linie科室: 'Linie Dept.',
    零件六位号: 'Part 6-digit No.',
    'Heavy Item材料组': 'Heavy Item',
    '正式/SVW号': 'Official/SVW No.',
    登录名: 'Login Name',
    邮箱: 'Email',
    电话: 'Tel.',
    起始时间: 'Starting Time',
    截止时间: 'Closing Time',
    LK_LIANXIREN: 'Contact',
    SHIFOUGUOWAICHANGSHANG: 'International Manufacturer (Y/N)',
    QIYEZIZHIYURENZHENG: 'Enterprise Qualification and Certification',
    SHENGCAHNGONGCHANGXINXI: 'Prod. Factory Info.',
    工厂占地面积: 'Factory Area',
    详细地址: 'Detailed Address',
    邮编号码: 'Postal Code',
    公司性质: 'Attribute',
    公司规模: 'Scale',
    注册资金: 'Registered Capital',
    资格与认证: 'Qualification and Certification',
    联系邮箱: 'Contact Email',
    'N-Tier供应商用户': 'N-Tier Supplier User',
    职务: 'Position',
    '工厂占地面积<sup>2</sup>': '',
    省份: 'Province',
    城市: 'City',
    占地面积: 'Area',
    登录RiSE系统时间: 'RiSE Login SYS Time',
    修改时间: 'Updated Time',
    '公司代码?': 'Company Code',
    供应商状态: 'Supplier Ststus',
    工厂信息: 'Plant Info.',
    银行信息: 'Bank Info.',
    供应商用户: 'Supplier User',
    供应商通讯录: 'Supplier Address Book',
    供应商信息: 'Supplier Info',
    供应商中文名: 'Supplier Name (CN)',
    '供应商简称(中)': 'Supplier Abbr. (CN)',
    供应商英文名: 'Supplier Name (EN)',
    '供应商简称(英)': 'Supplier Abbr. (EN)',
    采购员邮箱: 'Buyer Email',
    采购员名称: 'Buyer',
    采购员科室: 'Buyer Dept.',
    采购员工号: 'Buyer Empl. No.',
    注册日期: 'Register Date',
    注册资本: 'Register Capital',
    公司网址: 'Enterprise Website',
    是否国外厂商: 'International Manufacturer (Y/N)',
    '国家-省份-城市': 'Country-Province-City',
    地址: 'Address',
    是否上市: 'IPO (Y/N)',
    上市地点: 'IPO Location (Y/N)',
    股票代码: 'Stock Code',
    法定代表人: 'Legal Representative',
    企业类型: 'Enterprise type',
    '企业性质(大类)': 'Enterprise Attribute (large scale)',
    '企业性质(小类)': 'Enterprise Attribute (small scale)',
    主要产品: 'Main Product',
    年产量: 'Annual Capasity',
    '主要配套主机厂/客户': 'Main OEMs/Client',
    开始供货时间: 'Time of Availability',
    供货年份: 'Delivery Year',
    年供货量: 'Annual Volume',
    '国内市场占有率（%）': 'Domestic Market Share (%)',
    所处行业位置: 'Industry Position',
    可供SVW比例: 'SVW Quota',
    关联公司名称: 'Relevant Company',
    关系描述: 'Relevance Desc.',
    企业性质: 'Enterprise Attribute',
    '所在国家/地区': 'Location(Country/Region)',
    单位: 'unit',
    '控股比例（%）': 'Holding Percentage (%)',
    集团公司名称: 'Group Company Name',
    集团公司英文名称: 'Group Company Name (EN)',
    集团公司简称: 'Group Company Abbr.',
    总部: 'Headquarter',
    是否在供: 'Supply (Y/N)',
    是否业内工厂: 'Industry Plant (Y/N)',
    '是否隶属华域 ': 'HuaYu (Y/N)',
    供货类型: 'Supply Type',
    是否共用供应商: 'Shared Supplier (Y/N)',
    供货零件类型: 'Supply Part Type',
    相关专业科室: 'Relevant Dept.',
    是否签署定点协议: 'NL Signed (Y/N)',
    工厂编号: 'Factory Code',
    工厂名称: 'Plant Name',
    工厂简称: 'Plant Abbr.',
    工厂所在地: 'Plant Location',
    邮编: 'Postal Code',
    是否定点: 'Nomi. (Y/N)',
    供应商工厂DUNS: 'Supplier Plant DUNS',
    银行名称: 'Bank Name',
    银行代码: 'Swift Code',
    银行账号: 'Account',
    税务代码: 'Tax Code',
    银行所在地: 'Location',
    解冻: 'Unfreeze',
    冻结: 'Freeze',
    设为主用户: 'Set as primary user',
    联系人姓名: 'Contact',
    职位: 'Position',
    部门: 'Dept.',
    电话区号: 'Area Code',
    联系电话: 'Tel.',
    电子邮件: 'Email',
    用户登录名: 'Login Username',
    是否超期: 'Overdue (Y/N)',
    超期时间: 'Overdue Time',
    最后登录时间: 'Last Login Time',
    是否为主用户: 'Primary User (Y/N)',
    区号: 'Area Code',
    联系人类型: 'Contact Type',
    供应商等级: 'Supplier Tier',
    DUNS: 'DUNS',
    供应商中文名称: 'Supplier Name (CN)',
    供应商英文名称: 'Supplier Name (EN)',
    供应商类型: 'Supplier Type',
    SVW号: 'SVW No.',
    VW号: 'VW No.',
    统一社会信用代码: 'Unified Social Credit Code',
    是否MBDL: 'MBDL (Y/N)',
    供应商身份: 'Supplier Identity',
    国家: 'Counry',
    是否TIPS同步: 'Sync from TIPS (Y/N)',
    配置比例: 'EBR',
    '此操作将永久删除, 是否继续?':
      'This operation will be permanently deleted. Do you want to continue?',
    TIPS中车型ID: 'TIPS Model ID',
    车型类型: 'Model',
    Sourcing类别: 'Sourcing Type',
    车型级别: 'Trim',
    是否有效: 'Valid (Y/N)',
    有效: 'Valid',
    无效: 'Invalid',
    是: 'Yes',
    否: 'No',
    生产工厂: 'Prod. Plant',
    车型总产量: 'Total Model Capacity',
    是否最新: 'Newest (Y/N)',
    新增配置: 'Create Trim',
    应用年份: 'App. Year',
    配置ID: 'Trim ID',
    发动机类型: 'Engine',
    变速箱型号: 'Transmission',
    电池容量: 'Battery',
    其它配置: 'Other Config.',
    车型等级: 'Trim',
    计算车型: 'Calc. Model',
    年份: 'Year',
    新增年份: 'Add Year',
    PID: 'PID',
    车型配置: 'Config.',
    车型主数据: 'Master Data',
    'This is ${name} test.': 'This is ${name} test.',
    'This is {name} test.': 'This is {name} test.',
    资源名称: 'Source Name',
    失效: 'Invalid',
    下载车型产量计划模版: 'Download Model Prod. Plan Template',
    导入车型产量计划: 'Import Model Prod. Plan',
    车型编号: 'Model No.',
    车型名称: 'Model Name',
    中文描述: 'Desc. (CN)',
    平台属性: 'Platform Attribute',
    所属品牌: 'Brand',
    投产工厂: 'Prod. Plant',
    全部: 'Total',
    输入关键词以搜索: 'Please enter keyword for query',
    EPL车型名称: 'EPL Model Name',
    BKM车型编号: 'BKM Model No.',
    '抱歉，用户名或密码不能为空！':
      'Sorry, user name or password cannot be blank!',
    登录失败: 'Login failed',
    登录: 'Login',
    确认: 'Confirm',
    模板编号: 'Template No.',
    模板名称: 'Template Name',
    模板内容: 'Template Content',
    模板标题: 'Template Title',
    模板类型: 'Template Type',
    创建时间: 'Creation Time',
    发布次数: 'Publish Number',
    最后发布时间: 'Last Publish Date',
    消息历史: 'Notification History',
    模板管理: 'Template Mgmt.',
    显示: 'Display',
    条到第: 'record to',
    条记录: 'record',
    共: 'a total of',
    消息编号: 'Message No.',
    消息名称: 'Message Name',
    消息内容: 'Message Content',
    消息标题: 'Message Title',
    消息类型: 'Message Type',
    发布人: 'Publisher',
    发布对象: 'Publish Object',
    今日无会议安排: 'No meeting is scheduled for today',
    最新定点单价: 'Latest Nomi. Price',
    目标单价: 'Target Price',
    '产量(件)': 'Capacity (Pc.)',
    '(元/件)': '(RMB/Pc.)',
    产量: 'Capacity',
    单价: 'Unit Price',
    源货币编码: 'Source Currency Code',
    目标货币编码: 'Target Currency Code',
    汇率类型: 'Exch. Rate Type',
    序号: 'Serial No.',
    生效开始时间: 'Start of Validity',
    生效结束时间: 'End of Validity',
    请输入汇率: 'Please enter exchange rate',
    LK_SHENGCHANCAIGOU: 'Production Procurement',
    LK_YIBANCAIGOU: 'General Purchase',
    LK_HETONGLEIXING: 'Contract Type',
    LK_HETONGMIAOHSHU: 'Contract Desc.',
    LK_DANHANGSHURU: 'Single Row Input',
    LK_YINZHANGLEIXING: 'Stamp Type',
    LK_QIANSHUZHUANGTAI: 'Signing Status',
    LK_QIANSHU: 'Sign',
    LK_CHEXIAO: 'Withdraw',
    预览: 'Preview',
    标题链接: 'Title Link',
    发布范围: 'Post Range',
    历史查看有效期: 'Historical View Validity Period',
    发布时间: 'Publish Time',
    弹窗图片: 'Pop-up',
    '建议使用16:9比例图片，不超过10M':
      'A 16:9 image file is preferred, with a maximum size of 10MB',
    选择用户: 'Select User',
    选择供应商: 'Select Supplier',
    发布: 'Publish',
    弹窗布局: 'Pop-up Setting',
    文字居左: 'Words Left',
    文字居中: 'Middle',
    文字居右: 'Words Right',
    '居左（白）': 'Left (white)',
    居中: 'Middle',
    '居左（黑）': 'Left (black)',
    '请选择发布时间  若未选择发布时间则立即发送':
      'Select the release time. If no release time selected, it will be released immediately',
    员工号: 'Empl. No.',
    新建: 'New',
    弹窗管理: 'Dialog Management',
    弹窗标题: 'Pop-up Title',
    弹窗说明: 'Pop-up Desc.',
    弹框标题: 'Pop-up Title',
    弹框说明: 'Pop-up Desc.',
    发送日期: 'Send Date',
    确定: 'Confirm',
    查看: 'View',
    删除: 'Delete',
    错误管理: 'Management Error',
    提示管理: 'Management Notification',
    '站内信/邮件模板管理': 'Site Mail/Mail Template Mgmt.',
    弹窗编码: 'Pop-up No.',
    发送时间: 'Sent Time',
    结束日期: 'Ending Date',
    'rfq.RFQRESET': 'Reset ',
    专业组: 'Prof. Group',
    '色标件-批量修改': 'Batch Maintenance',
    基本信息: 'Basic Info.',
    零件号: 'Part No.',
    BMG: 'BMG',
    ZP: 'ZP',
    FOP: 'FOP',
    技术部门: 'Engineering Dept.',
    'Common Sourcing': 'Common Sourcing',
    SET: 'SET',
    计量单位: 'Unit',
    基本计量单位: 'Basic Unit',
    常用计量单位与基本计量单位转换关系:
      'Conversion relationship between common units of measurement and basic units of measurement',
    色标零件清单: 'Color-tagged Part List',
    编号: 'No.',
    色标件清单: 'Color-tagged Part List',
    常用计量单位: 'Common Unit',
    请选择需要批量维护的色标零件:
      'Please select color tagged part to batch maintain',
    色标零件号: 'Color Tagged Part No.',
    色标零件编号: 'Color Tagged Part No. No.',
    '色标零件名称(中)': 'Color Tagged Part Name (CN)',
    '色标零件名称(德)': 'Color Tagged Part No. (DE)',
    '请输入零件号,多个逗号分隔': 'Please enter part No., separated  by commas',
    轮岗申请: 'Rotational App.',
    岗位代理: 'Pos. Delegate',
    Organization: 'Organization',
    Position: 'Position',
    Knowledge: 'Knowledge',
    批准: 'Approve',
    补充材料: 'Supplementary Material',
    审批成功: 'Approved Successfully',
    审批失败: 'Approve Failed',
    审批历史: 'Approval History',
    审批流: 'Approval Process',
    附件: 'Attachments',
    无异议: 'No Objection',
    有异议: 'Objection',
    拒绝: 'Reject',
    模拟: 'Mimic',
    单据编号: 'Sheet No.',
    单据类型: 'Sheet Type',
    审批事项: 'Approval Event',
    任务开始时间: 'Task Stating Time',
    申请人: 'Applicant',
    申请部门: 'App. Dept.',
    申请时间: 'App. Time',
    任务起止日期: 'Task Duration',
    待审批: 'To-be Approved',
    已审批: 'Approved',
    EKL模拟: 'EKL Similation',
    流程说明: 'Process Desc.',
    'APPROVAL.FLOW_NO': 'APPROVAL.FLOW_NO',
    'APPROVAL.FLOW_NAME': 'APPROVAL.FLOW_NAME',
    'APPROVAL.CREATE_BY': 'APPROVAL.CREATE_BY',
    'APPROVAL.CREATE_TIME': 'APPROVAL.CREATE_TIME',
    'APPROVAL.FLOW_STATUS': 'APPROVAL.FLOW_STATUS',
    'APPROVAL.FLOW_DESCRIPTION': 'APPROVAL.FLOW_DESCRIPTION',
    新建流程: 'New Process',
    流程序号: 'Process No',
    流程标题: 'Process Title',
    创建者: 'Creator',
    流程状态: 'Process Status',
    审批人: 'Approver',
    处理时间: 'Process Time',
    审批意见: 'Approval Comment',
    补充材料节点: 'Supplementary Material Node',
    请输入补充材料留言内容: 'Please enter supplementary materials',
    审批备注: 'Approval Remark',
    审批流程: 'Approval Process',
    申请备注: 'App. Remark',
    撤回: 'Withdraw',
    'APPROVAL.APPROVAL_ITEMS': 'APPROVAL.APPROVAL_ITEMS',
    'APPROVAL.APPROVAL_PROGRESS': 'APPROVAL.APPROVAL_PROGRESS',
    审批进度: 'Approval Progress',
    撤回理由: 'Withdraw Reason',
    撤回成功: 'Withdrawn Successfully',
    流程名称: 'Process Name',
    申请单号: 'App. Sheet No.',
    当前状态: 'Cur. Status',
    申请号: 'App. No',
    原因: 'Reason',
    重试: 'Retry',
    导出审批流程: 'Export Approval Process',
    重新分配任务审批人成功: 'Reassign approver successfully',
    审批备注与附件: 'Approval Remark and Attachments',
    'APPROVAL.TIME': 'APPROVAL.TIME',
    'APPROVAL.NODE_NAME': 'APPROVAL.NODE_NAME',
    'APPROVAL.OPRATION_USER': 'APPROVAL.OPRATION_USER',
    'APPROVAL.OPRATION': 'APPROVAL.OPRATION',
    'APPROVAL.OPRATION_TIME': 'APPROVAL.OPRATION_TIME',
    'APPROVAL.ATTACH': 'APPROVAL.ATTACH',
    'APPROVAL.COMMENT_CONTENT': 'APPROVAL.COMMENT_CONTENT',
    审批中心: 'Approval Center',
    我的申请: 'My Application',
    我的审批: 'My Approval',
    时间筛选: 'Time Screeing',
    开始日期: 'Starting Date',
    业务编号: 'Business Code',
    日志编号: 'Log No.',
    请求时间: 'Req. Time',
    响应时间: 'Rsp. Time',
    异常信息: 'Error Message',
    用户: 'User',
    岗位: 'Position',
    是否成功: 'Success (Y/N)',
    用户ID: 'User ID',
    用户名: 'User Name',
    用户类型: 'User Type',
    操作类型: 'Operation Type',
    操作内容: 'Operation Content',
    操作时间: 'Operation Time',
    分类: 'Type',
    模块菜单: 'Module Catalog',
    触发类型: 'Trigger Type',
    外部系统: 'Ext. System',
    日志时间: 'Log Time',
    用户名称: 'User Name',
    用户岗位: 'User Pos.',
    日志类别: 'Log Type',
    对接外部系统: 'For external system',
    接口名称: 'API Name',
    接口流水号: 'API Code',
    报文详情: 'Post Detail',
    类别: 'Type',
    异常码: 'Error Code',
    对接系统: 'Docking system',
    供应商管理: 'Supplier Mgmt.',
    'staffManagement.EMPLOYEENUMBER': 'Staff No.',
    登录账号: 'Login Account',
    中文名: 'Name (CN)',
    'staffManagement.ENGLISHNAME': 'staffManagement.ENGLISHNAME',
    'staffManagement.SEX': 'staffManagement.ENGLISHNAME',
    'staffManagement.DEPARTMENT': 'staffManagement.DEPARTMENT',
    'staffManagement.JOBS': 'staffManagement.JOBS',
    'staffManagement.STATEEMPLOYEES': 'staffManagement.STATEEMPLOYEES',
    'staffManagement.EMAIL': 'staffManagement.EMAIL',
    'staffManagement.MOBILEPHONE': 'staffManagement.MOBILEPHONE',
    'staffManagement.PHONE': 'staffManagement.PHONE',
    组织管理: 'Group Mgmt.',
    岗位管理: 'Role Mgmt.',
    员工用户管理: 'Emlp. User Mgmt.',
    角色管理: 'Role Mgmt.',
    会议管理大厅: 'Meeting Mgmt. Hall',
    日志管理: 'Log Mgmt.',
    '新闻&公告模块管理': 'News & Post Module Mgmt.',
    员工管理: 'Employee Mgmt.',
    'ROLE.ROLE_ID': 'ROLE.ROLE_ID',
    'ROLE.ROLE_CODE': 'ROLE.ROLE_CODE',
    'ROLE.DESCRIPTION': 'ROLE.DESCRIPTION',
    'ROLE.ROLE_NAME': 'ROLE.ROLE_NAME',
    'staffManagement.CHINESENAME': 'staffManagement.CHINESENAME',
    'staffManagement.NATIONALITY': 'staffManagement.NATIONALITY',
    'staffManagement.THESERIALNUMBER': 'staffManagement.THESERIALNUMBER',
    'staffManagement.PURCHASINGGROUP': 'staffManagement.PURCHASINGGROUP',
    'staffManagement.TEMPORARYPRICECONTRACTFORPRODUCTION':
      'staffManagement.TEMPORARYPRICECONTRACTFORPRODUCTION',
    'staffManagement.DESCRIBE': 'staffManagement.DESCRIBE',
    'staffManagement.NOTE': 'staffManagement.NOTE',
    请选择岗位: 'Please select position',
    系统URL: 'System URL',
    系统管理: 'System Mgmt.',
    问题管理: 'Question Mgmt.',
    问答处理: 'Q&A Processing',
    问题报表: 'Question Post',
    消息: 'Notification',
    答复: 'Feedback',
    指派: 'Assign',
    归档: 'Archive',
    发送并关闭问题: 'Send and close Question',
    '搜索...': 'Search...',
    关键词管理: 'Key Words Mgmt.',
    问题模块: 'Question Module',
    创建人: 'Creator',
    关键词: 'Key Words',
    百晓生: '',
    花木兰: '',
    王昭君: '',
    管理员: 'Admin',
    时间: 'Time',
    奥古斯丁: '',
    柏拉图: '',
    鬼谷子: '',
    苏格拉底: '',
    任务统计: 'Task Summary',
    寻源概览询价: 'Sourcing Overview Inquiry',
    张一一: '',
    完结时间: 'Completion Time',
    全部模块: 'All Module',
    提问时间: 'Question Time',
    模块: 'Module',
    'QINGXUANZ[object KeyboardEvent]': '',
    MTZ零件查询: 'Query',
    MTZNIANDUYUSUANBIANJInullnull: 'null',
    '请选择发布时间，若未选择发布时间则立即发送': 'Send',
    用户手册: 'User Manual',
    常见问题: 'Common Question',
    我的提问: 'My Question',
    查询: 'Query',
    我要提问: 'My Question',
    模块管理: 'Module Mgmt.',
    标签管理: 'Tag Mgmt.',
    主数据管理: 'Master Data Mgmt.',
    退出: 'Exit',
    发送: 'Send',
    新增标签: 'Create Tag',
    提问: 'Question',
    热门问题: 'Hottest Question',
    '请选择...': 'Please select...',
    关闭问题: 'Close Question',
    转派: 'Transfer',
    标签: 'Tag',
    新建标签: 'New Tag',
    标签内容: 'Tag Content',
    null: 'null',
    模具投资: 'Tooling Inv.',
    零件价格与订单: 'Part Price and Order',
    '模具采购（供应商）': 'Tooling Proc. (Supplier)',
    模具采购: 'Tooling Proc.',
    供应商报价: 'Supplier Quote',
    '竞价-项目列表（测试）': 'Bidding-Proj. List (Testing)',
    AEKO技术变更: 'AEKO Tech. Alteration',
    项目管理: 'Proj. Mgmt.',
    综合查询: 'Mixed Search',
    询源到定点: 'Sourcing to Nomi.',
    定点管理: 'Nomi. Mgmt.',
    寻源定点: 'Sourcing & Nomi.',
    下载: 'Download',
    示例模块名称: 'Sample Module Name',
    添加附件: 'Add Attachments',
    摸具采购: 'Tooling Proc.',
    采样: 'Sampling',
    品类管理助手: 'Material Group Mgmt. Assistant',
    FRM评级: 'FRM Rating',
    消息管理: 'Notification Mgmt.',
    寻源与定点: 'Sourcing & Nomi.',
    用户助手: 'User Asisstant',
    公用组件管理: 'Public Module Mgmt.',
    报表中心: 'Post Center',
    报表展示: 'Post Display',
    ProCS: 'ProCS',
    任务中心: 'Task Center',
    谈判: 'Negotiation',
    '零公里索赔-采购': '0KM Claim-Procurement',
    '零公里索赔-物流': '0KM Claim-Logistics',
    财务风险管理: 'FRM',
    会议类型管理: 'Meeting Type Mgmt.',
    新闻管理: 'News Mgmt.',
    公告管理: 'Post Mgmt.',
    调查问卷: 'Questionnaire',
    目标价及评分管理: 'Target Price and Rating Mgmt.',
    竞价管理: 'Bidding Mgmt',
    会议中心: 'Meeting Center',
    审批流管理: 'Approval Process Mgmt.',
    需求产能管理: 'BKM',
    总成散件管理: 'Assy. Part/Component Mgmt.',
    采购业绩: 'Proc. Performance',
    MTZ管理: 'MTZ Mgmt.',
    参数管理: 'Parameter Mgmt.',
    条款管理: 'Policy Mgmt.',
    电子签章: 'E-stamping',
    下载中心: 'Download Center',
    品类与谈判: 'Category and Negotiation',
    '供应商测试1018-4': '',
    MTZ补差单确认: 'MTZ Compensation Confirmation',
    零件对外销售: 'Part Ext. Sale',
    代理内容: 'Delegate Content',
    保存成功: 'Save Successfully',
    审批代理: 'Approval Delegate',
    返回: 'Return',
    代理时间: 'Delegate Time',
    会议审批代理: 'Meeting Approval Delegate',
    新增: 'Create',
    授权人: 'Authorizer',
    代理人: 'Delegate',
    'APPROVAL.AGENT_NO': 'APPROVAL.AGENT_NO',
    'APPROVAL.AUTH_USER_NAME': 'APPROVAL.AUTH_USER_NAME',
    'APPROVAL.AGENT_USER_NAME': 'APPROVAL.AGENT_USER_NAME',
    'APPROVAL.AGENT_START_TIME': 'APPROVAL.AGENT_START_TIME',
    'APPROVAL.AGENT_END_TIME': 'APPROVAL.AGENT_END_TIME',
    'APPROVAL.IS_EFFECTIVE': 'APPROVAL.IS_EFFECTIVE',
    'APPROVAL.AGENT_CANCEL_TIME': 'APPROVAL.AGENT_CANCEL_TIME',
    代理号: 'Delegate No.',
    代理开始时间: 'Delegate Starting Time',
    代理结束时间: 'Delegate Ending Time',
    取消代理时间: 'Delegate Cancelation Time',
    应用中心: 'Application Center',
    输入姓名和工号搜索: 'Enter Name and Empl. No. to Query',
    更新日期: 'Update Date',
    标题首字母: 'Initials',
    首字母: 'Initials',
    英文标题: 'English Title',
    英文首字母: 'Initials',
    流程专家: 'Work Flow Professionals',
    关联机构: 'Associate Institutes',
    页面标题: 'Page Tital',
    排序: 'Sort',
    页面内容: 'Page Content',
    目录中文名: 'Catalog (CN)',
    目录英文名: 'Catalog (EN)',
    流程页面: 'Work Flow Page',
    附件标题: 'Attachments Title',
    新增流程附件: 'New Work Flow Attachment',
    流程附件标题: 'Work Flow Attachment Title',
    新增词条: 'New Phrases',
    修改: 'Modify',
    标题: 'Title',
    词条内容: 'Phrase Content',
    上传附件: 'Upload Attachment',
    添加内容: 'Add Content',
    添加知识类型: 'Add Knowledge Type',
    知识类型: 'Knowledge Type',
    英文名: 'English Name',
    封面图片: 'Cover photo',
    知识分享类型: 'Shared Knowledge Type',
    知识标题: 'Knowledge Title',
    知识概要: 'Knowledge Desc.',
    主讲人: 'Keynote Speaker',
    开课日期: 'Opening date',
    知识分类: 'Knowledge Type',
    所属科室: 'Dept.',
    上传知识封面: 'Upload Knowledge Cover',
    LK_QUERENZHUANGTAI: 'Conformation Status',
    LK_BSX: 'Transmission',
    LK_PEIZ: 'Config.',
    LK_CXDM: 'model code',
    LK_CGY: 'Buyer',
    LK_KSLJLY: 'KLS Sourcing Price',
    LK_CHANGPINJIAZHU: 'Product Family',
    LK_LAIYUANJIAGE: 'KLS Sourcing Price',
    LK_LINGJIAGENZONGLEIXING: 'Part Tracking Time',
    EKL_YJGL_MS: 'Desc.',
    EKL_YJGL_ZT: 'Status',
    EKL_YJGL_FQR: 'Initiator',
    EKL_YJGL_YWLX: 'Business Type',
    EKL_LAIYUAN: 'Source',
    EKL_YJGL_GXRQQ: 'Update Time (start)',
    EKL_YJGL_GXRQZ: 'Update Time (end)',
    EKL_CAOZUO: 'Operation',
    描述: 'Desc.',
    发起人: 'Initiator',
    业务类型: 'Update Time',
    版本号: 'Version No.',
    更新时间起: 'Update Time (start)',
    更新时间止: 'Update Time (end)',
    创建日期: 'Creation Date',
    操作: 'Operation',
    EKL_MIAOSHU: 'Desc.',
    EKL_CZ: 'Operation',
    EKL_NDYJJC: 'Annual Performance Basis',
    EKL_ZCSJJCB: 'Assy./Component Basis List',
    EKL_QT: 'Other',
    LK_YWLX: 'Business Type',
    LK_YEJIJINETIAOZHENG: 'Performance Adjustment',
    FENGXIANYUJINGPEIZHI: 'Risk Prewarning Cfg.',
    LK_BAOCUNBINGYINGYONG: 'Save and Apply',
    FENGXIANDENGJI: 'Risk. Lvl.',
    UNCHANGEDCONFIGWARNING:
      'The configuration is not changed and does not need to be saved',
    RISKCONFIGNOTICE:
      'Exp. :"()"means that the date is excluded, "[]"means that the date is included ',
    QR: 'Confirm',
    ZHIBIAOXIAJIANGTISHI:
      'The index showed a downward trend for three consecutive semi-year',
    CHUANGJIANTUFASHIJIAN1: 'New Emer. Event',
    SOUYINGXIANGCHENGDU: 'Influence Degree',
    QINGXUANZEXUYAOSHANCHUFUJIANDEPICI:
      'Please select attachment for batch deletion',
    SHIFOUSHANCHUSUOXUANPICIDEFUJIAN:
      'whether to perform batch deletion for selected attachments?',
    CAOZUOSHIBAI: 'Operation Failed',
    DAIBUCHAJINE: '(amount to be compensated）',
    DNEGDAIGONGYINGSHANGQUERENJINE: '(amount supplier confirmed)',
    DENGDAIGONGYINGSHANGQUERENJINE:
      '(amount waiting for the supplier to confirm)',
    BUCHAPINZHENGSHENPITONGUOJINE:
      '(approved amount on compensation credential)',
    YECJGXYXXQR: 'Tier Relationship Validation',
    BQWFCXDJGSRCWHBCZQQRHCXSR:
      'Sorry, the query result cannot be found (input error or non-existent), please confirm and enter again',
    QTXYLBBJYSNF: 'Please fill-in consumption version and budget year',
    QINGXUANZEQUERENSHIJIAN: 'Please select a confirmation time',
    QUERENCHUANGJIAN: 'Confirm to create',
    SHENGXIAOMSG:
      'The valid status cannot be clicked "Activate" button, please select it again',
    SHIXIAOMSG:
      'The invalid status cannot be clicked "Deactivate" button, please select it again',
    ZANBUCAIQUCUOSHI: 'No measure taken',
    ZHANPAI: 'Transfer',
    CHULIXIANGQING: 'Process Detail',
    GONGYINGSHANGQUEREN: 'Supplier Conformation Delegate',
    QINGSHURUXIANGQINGNEIRONG: 'Detail',
    TIJIAOCHENGGONGLE: 'Submited Successfully',
    QINGZHISHAOXUANZHONGYITIAOSHUJU: 'Please Select at least one data',
    NDYSJSWWCWFFB:
      'Annual budget calculations are incomplete and cannot be published',
    QINGSHURUBITIANXIANG: 'Please fill-in the mandatory',
    NDYSZZBFBCG:
      'The final version of the annual budget has been released successfully!',
    LK_CAIGOUZU: 'Proc. Group',
    QRSCGBBNDYS: 'Confirm deleting the annual budget?',
    TZHYSZJEBWMH: 'Post-Adj. Total Budget (Mio. RMB)',
    QXZCGZTSJJXTZCZ: 'Select draft status data for notification operation',
    SHANJIANGONGYINGSHANGSHENGCHANDI: 'N-tier Supplier Location',
    YFBGZSYSBBSFZCFB:
      'The official budget version has been released. Do you want to release it again?',
    PINLEIGUANLIZHUSHOU: 'Material Group Mgmt. Assistant',
    NJIGONGYINGLIANGUANLI: 'N-tier Supply Chain',
    SHIFOUTIJIAOBAOJINGXING: 'Whether to submit warning letter?',
    QINGTIJIAOBAOJINGXING: 'Please submit warning letter',
    ZANCUNCHENGGONG: 'TS Successfully',
    QINGXUANZHEYITIAOYITIAOSHUJU: 'Please select data',
    CHUANGJIANGONGYINGSHANG: 'New Supplier',
    ZHENDUIHAIWAIYONGYINGSHANGXUYAOZAIXIAMIANDEQUYUTIANRUDENGBAISHIDUNSMADENGBAISHIDUNSMAKEYIZAI:
      'For overseas suppliers. DUNS code needs to be filled. DUNS code is available at',
    QINGTIANXIEBITIANXIANG: 'Please fill in the mandatory',
    QXZWBSCJLY: 'Please select ext. market price source',
    xxxxxxxx: 'xxxxxxxx',
    JIESHI: 'Explanation',
    ZHINENGXUANZHEYITIAOSHUJU: 'You can only select one data',
    SHANGHUIBEIZHU: 'Meeting Remark',
    LINEIESHANGHUIBEIZHU: 'LINIE Meeting Remark',
    LIUZHUANBEIZHU: 'Circulation Remark',
    LINEIELIUZHUANBEIZHU: 'LINIE Circulation Remark',
    JUJUELIYOUBUNENGWEIKONG: 'Reject reason cannot be blank',
    JUJUEYUANYIN: 'Reject Reason',
    LC_KAIBIAOGAOZHISHU: 'Notification of Bidding Rseult',
    QINGSHURUJUJUEYUANYIN: 'Please enter reject reason！',
    NEWS_XWNRGL: 'News Content Mgmt.',
    NEWS_ZTXWGL: 'Features News Mgmt.',
    NEWS_KVTGL: 'KV Map Mgmt.',
    NEWS_TUJIXINWEN: 'Photo Collection News',
    NEWS_XINWEN: 'News',
    NEWS_GONGGAO: 'Post',
    LK_LINGJIANQUANSHENGMINGZHOUQI: 'Part Full Life Cycle',
    LK_QINGGOUXUANHOUZAIQUERENRENLING:
      'Please select part before confirming your claim',
    NEWS_XIANGGUANFUJIN: 'Relevant Attachment',
    JIESHIYUANYIN: 'Explanation',
    NEWS_CAOGAO: 'Draft',
    NEWS_YIFABU: 'Published',
    NEWS_ZUIDASHURUCHANGDU100: 'Maximum input Length is 80',
    NEWS_MORE: 'MORE',
    NEWS_TIANJIARIQI: 'Add Date',
    ZYCGZTCKYSC: 'Only draft state can be deleted',
    LZBALXZYTJZTCKYCH:
      'Only Circulation/Record type can be withdrawn only if it is committed',
    SHLXZYHHTGZTCKYDJ: 'Only reviewed meeting type can be frozen',
    ZYZTWDJDCKYJD: 'Only frozen status can be unlocked',
    ZYDDZTCKYQXDD:
      'Canceled nomination can be proceed only of it was nominated ',
    GLSQDHQZTBLJDDSQLXHSPRXXRLJSQDYSHHCSTJTYGHY:
      'The associated application form will force the synchronization of the parts designated application type and approver information! If the parts requisition has been approved, please try to submit it to the same meeting!',
    NEWS_CAOZUO: 'Operation',
    QINGWANCHENGXUANZE: 'Please complete selection',
    CAOGAOZHUANGTAICAINENGSHANCHU: 'only in draft state can be deleted',
    MTZYCLGZZBHXDGZBHSQLXBNWLZBAJXTJHCZSQDLXBQXYGLDLJDDSQDSFQRTJ:
      'When MTZ raw material rule is added, the application form type cannot be circulation/record. Further addition will reset the application form type and cancel the associated nomination application form for parts. Are you sure to add?',
    QINGBUQUANBITIANXIANG: 'Please fill-in all mandatory',
    SHLXQZTWTJHWTGCKYCH:
      'A meeting type can be withdraw if it was in submitted or to-be approved status',
    LZLXQZTWLZWCCKYDD:
      'A circulation type can be nominated if it completes circulation',
    LZBALXZYTJZTCKYDJ:
      'A circulation/record type can only be frozen only if is in submitted status',
    QINGSHURUYICHUYUANYINS: 'Please enter removal reason',
    CHANGLOG: 'Change Log',
    CZXTZJBNJXXZCZ:
      'If the primary key is the same, all time periods cannot overlap',
    CCZJSCNYWHDSYLJZSJBGJDDSQDZDYMTZSXDLJDYDGYSJCGYSSYXGGZTJZMTZYCLGZLB: '',
    KAIFAZHONG: 'Developing',
    BUCHAXISHUBUNENGWEIFUSHU: 'Compensation coefficient cannot be negative',
    SHENGCHENGSHIBAI: 'Generate Failed',
    NEWS_QINGXUANZEXINWENFENLEI: 'Please select news category',
    NEWS_SCTPZNSJPGHZPNGGS: 'Upload images in JPG or PNG format only!',
    NEWS_SCTPDXBNCG10MB: 'The size of uploaded image cannot exceed 10MB!',
    NEWS_QDQHHBXWDZWNRJQBQK:
      'After the switch is confirmed, the main content of this news will be cleared.',
    NEWS_SHIFOUQUEDINGQIEHUAN: 'Are you sure about switching?',
    NEWS_TUJI: 'Photo Coll.',
    NEWS_QDQHNRFLHXWNRJQBQK:
      'After deciding to switch content categories, all news content will be cleared.',
    NEWS_QSCZQDSPGS: 'Upload failed. Please upload the correct video format',
    NEWS_SCSPDXBNCG100M:
      'Upload failed, upload video size cannot exceed 100MB!',
    NEWS_SCWJDXBNCG20MB: 'The size of the uploaded file cannot exceed 20MB!',
    NEWS_ZWNRBNWK: 'The body content cannot be empty!',
    NEWS_TJZSSCYZ: 'Upload at least one photo!',
    NEWS_SHBNWK: 'Video cannot be empty!',
    产品信息: 'Product Info.',
    NEWS_GXWFLWQXCZ: 'This news category has no permission to operate!',
    NEWS_SJDXWBKSC: 'Posted news cannot be deleted!',
    NEWS_SFQDSCXW: 'Are you sure to delete the news?',
    NEWS_QSCTP: 'Please upload pictures!',
    NEWS_KVTZTWSJSBKSC:
      'When the KV map is in posted status, it cannot be deleted!',
    NEWS_SFSCKVT: 'Do you want to delete the KV map?',
    NEWS_SHANCHUSHIBAI: 'Delete Failed',
    NEWS_WQXSCGBQZNSCZJDXWBQ: 'You can only delete your own news tags',
    NEWS_SFQDSCBQNR: 'Are you sure to delete tag content?',
    NEWS_XWBQCJSB: 'News tag create failed!',
    NEWS_BAOCUNSHIBAI: 'Save failed',
    SFQDSCNR: 'Are you sure to delete content?',
    NEWS_GYSZWM: 'Supplier Name (CN)',
    NEWS_GYSYWM: 'Supplier Name (EN)',
    SVWHAO: 'SVW No.',
    NEWS_LINSHIHAO: 'Temp No.',
    NEWS_SHENGCHANGONGYINGSHANG: 'Prod. Supplier',
    NEWS_YIBANGONGYINGSHANG: 'General Supplier',
    NEWS_NTIERGYINGSHANG: 'N-tier Supplier',
    NEWS_BIANHAO: 'Code',
    NEWS_YUANGONGHAO: 'Empl. No.',
    NEWS_YOUXIANG: 'Email',
    NEWS_DIANHUA: 'Tel.',
    供应商范围: 'Supplier Range',
    NEWS_DIANZIYOUXIANG: 'Email',
    NEWS_YUANGONGYONGHU: 'Empl. User',
    NEWS_CAIGOUWENJUAN: 'Proc. Questionnaire',
    NEWS_WULIUWENJUAN: 'Logistics Questionnaire',
    NEWS_ZHIBAOWENJUAN: 'Quality Assurance Questionnaire',
    NEWS_QINGGOUXUANXINXI: 'Please select message',
    NEWS_SFQDSCNR: 'Are you sure to delete content?',
    NEWS_ZWBNWK: 'Main body cannot be blank!',
    NEWS_SJDZTBKSC: 'Posted topic cannot be deleted',
    LK_SHI: 'Yes',
    QINGTIANXIEDAZONGNEIBUYOUXIANG: 'Please enter SVW internal email',
    KAISHISOUSUOBA: 'Search...',
    YIXUANZHE: 'Selected',
    QINGXUANZELINGJIANLEIXING: 'Please select part type',
    FEIMINGAN: 'nonsensitive',
    GAIGONGYINGSHANGZANWUYUQINGXINWEN:
      'This Supplier does not have public opinion news',
    QINGSHURUBIAOQIANMINGCHENG: 'Please enter tag name',
    GUANBI: 'Close',
    LK_SHENPIXIANGQING: 'Approval Detail',
    LK_YULAN: 'Preview',
    LK_ZHAOPIANCHAKAN: 'View Image',
    QSRBZ: 'Please enter',
    GCBHHCKBHBYZ: 'Factory Code or Warehouse Code do not consistent',
    QXZCZ: 'Please select operation',
    SHANGCHUANJUPEIZILIAO: 'Upload Claim-Rej Supporting Doc.',
    WXZRHWJCXWBTX: 'No file selected (mandatory)',
    XUANZHEWENJIAN: 'Select File',
    QINGSHURUJUPEILIYOU: 'Please enter Claim-rejection reason',
    QINGSHANGCHUANJUPEIZILIAO:
      'Please upload Claim-rejection supporting document. ',
    CHAKANMINGXI: 'View Detail',
    YUANYING: 'Reason',
    ZANWUFUJIAN: 'No Attachment',
    XIAZAIFUJIAN: 'Download Attachment',
    LK_MUJUTOUZIQINGDANBIANGENGXIANGQING: 'Tooling Inv. List Alteration Detail',
    LK_SHIFOUHIL: 'HIL (Y/N)',
    LK_TOUZIZONGJINE: 'Total Inv. Amount',
    LK_TOUZIQINGDANLAIYUAN: 'Inv. List Source',
    LK_LAIYUANBIANHAO: 'Source Code',
    LK_BIANGENLEIXING: 'Alteration Type',
    LK_RUZHANGRIQI: 'Billing date',
    LK_CHAKANBIANGENGDAN: 'View Alteration Sheet',
    LK_TUICHUBIANJI: 'Exit Edit',
    LK_YULANBIANGENGDAN: 'Alteration Sheet Preview',
    LK_BAAPPLYTISP1: 'Please select first',
    LK_QINGTIANXIEBITIANXIANG: 'Please fill in the mandatory',
    LK_QINGTIANXIWBIANGENGYUANYIN: 'Please enter alteration reason',
    LK_CHUYUBIANGENGLIUCHENGZHONG:
      'Do not initiate changes repeatedly when you are in the change process',
    LK_QINGSHURUTUIHUIYUANYIN: 'Please enter return reason',
    LK_CHEXINXIANGMU: 'Model',
    LK_QINGSHURUGONGYINGSHANG: '',
    LK_LINLE: 'Linie',
    LK_DUIBUQIMEIYOUQUANXIAN:
      'Sorry, your position does not have the permission of this material group',
    LK_BIANGENDANJIALIEBIAO: 'Alteration List',
    LK_YQ_GONGYINGSANGZHONGWENJIANCHEN: 'Supplier Abbr.(CN)',
    LK_YQ_GONGYINGSANGYINGWENJIANCHEN: 'Supplier Abbr.(EN)',
    LK_YQ_JITUANJIANCHEN: 'Group Abbr.',
    LK_YQ_TIANJIAFANGSHI: 'Add Method',
    LK_YQ_WEIHUYUQINGJIANCESHANG: 'Maintain Public Opinion Testers',
    LK_YQ_XINZENG: 'Create',
    SQDLXWBASSPFJBNWK:
      'When the application form is for record, the approval attachment shall not be empty',
    YANZHENGTONGGUO: 'Verified!',
    SHANGHAIZHONGHUIQICHEYOUXIANGONGSI: '',
    NEIRONGBIAOTI: 'Content Title',
    SHANGCHUANFUJIJAN: 'Upload Attachments',
    QINGQIUCUOWU: 'Request failed!',
    EKL_CAILIAOZU: 'Material Group No.'
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
