export const searchForm = [
  { prop: 'department', label: '科室', key: 'KESHI', type: 'select', optionName: 'deptList' },
  { prop: 'supplier', label: '供应商', key: 'GONGYINGSHANG', type: 'input' },
  { prop: 'sourceType', label: '来源', key: 'LAIYUAN', type: 'select', optionName: 'sourceTypeList' },
  { prop: 'taskStatus', label: '状态', key: 'ZHUANGTAI', type: 'select', optionName: 'taskStatusList' },
]

export const tableTitleLeft = [
  { props: 'supplierShortNameZh', name: '供应商', key: '', sortable: true, minWidth: 110, tooltip: true },
  { props: 'taskNumber', name: '产能维护任务数', key: '', sortable: true, minWidth: 160 },
]

export const tableTitleRight = [
  { props: 'supplierShortNameZh', name: '供应商', key: '', sortable: true, tooltip: true },
  { props: 'bkaName', name: 'BKA', key: '', sortable: true, minWidth: 200, tooltip: true },
  { props: 'sourceType', name: '来源', key: '', sortable: true, tooltip: true },
  { props: 'taskEndDate', name: '供应商任务截止日期', key: '', sortable: true, width: 160 },
  { props: 'departmentCode', name: '科室', key: '', sortable: true },
  { props: 'status', name: '状态', key: '', sortable: true },
]

export const sourceTypeList = [
  { code: '1', name: '需求导入-待创建BKA' },
  { code: '2', name: '需求导入-待更新BKA' },
  { code: '3', name: '定时-待更新BKA' },
  { code: '4', name: '产能调查-待更新BKA' },
]

export const taskStatusList = [
  { code: 'TO_DO', name: '待完成' },
  { code: 'FINISHED', name: '已完成' },
  { code: 'OVERDUE', name: '逾期' },
  { code: 'OVERDUE_FINISHED', name: '逾期完成' },
]
export const result = [
  {
    "tmSupplierId": 50002894,
    "supplierSapCode": "10167",
    "supplierShortNameZh": "天津鹏翎",
    "supplierShortNameEn": "TJ Pengling",
    "taskNumber": 304
  },
  {
    "tmSupplierId": 50002708,
    "supplierSapCode": "10486",
    "supplierShortNameZh": "邦迪（上海）",
    "supplierShortNameEn": "SH TI",
    "taskNumber": 202
  },
  {
    "tmSupplierId": 50003038,
    "supplierSapCode": "10089",
    "supplierShortNameZh": "捷豹振动公司",
    "supplierShortNameEn": "Jiebao Vibration",
    "taskNumber": 129
  },
  {
    "tmSupplierId": 50002636,
    "supplierSapCode": "10874",
    "supplierShortNameZh": "上海子元",
    "supplierShortNameEn": "SH Ziyuan",
    "taskNumber": 121
  },
  {
    "tmSupplierId": 50002936,
    "supplierSapCode": "10138",
    "supplierShortNameZh": "宁波华翔电子股份",
    "supplierShortNameEn": "NB Huaxiang",
    "taskNumber": 100
  },
  {
    "tmSupplierId": 50002973,
    "supplierSapCode": "10118",
    "supplierShortNameZh": "宝山大陆",
    "supplierShortNameEn": "SH BaoshanDalu",
    "taskNumber": 93
  },
  {
    "tmSupplierId": 50002756,
    "supplierSapCode": "10287",
    "supplierShortNameZh": "常州市盛士达",
    "supplierShortNameEn": "CZ Senstar",
    "taskNumber": 87
  },
  {
    "tmSupplierId": 50002731,
    "supplierSapCode": "10488",
    "supplierShortNameZh": "建新赵氏",
    "supplierShortNameEn": "Jianxin Zhao's",
    "taskNumber": 85
  },
  {
    "tmSupplierId": 50001094,
    "supplierSapCode": "11071",
    "supplierShortNameZh": "宁波爱立德",
    "supplierShortNameEn": "NB Ailide",
    "taskNumber": 85
  },
  {
    "tmSupplierId": 50001520,
    "supplierSapCode": "10949",
    "supplierShortNameZh": "哈通柯姆",
    "supplierShortNameEn": "HQMXT (Shanghai)",
    "taskNumber": 83
  },
  {
    "tmSupplierId": 50003027,
    "supplierSapCode": "10097",
    "supplierShortNameZh": "上海汇众汽车制造",
    "supplierShortNameEn": "SH Huizhong",
    "taskNumber": 65
  },
  {
    "tmSupplierId": 50002794,
    "supplierSapCode": "10257",
    "supplierShortNameZh": "福耀集团（上海）",
    "supplierShortNameEn": "SH FuYao Glass",
    "taskNumber": 63
  },
  {
    "tmSupplierId": 50023353,
    "supplierSapCode": "11264",
    "supplierShortNameZh": "江阴标榜",
    "supplierShortNameEn": "JY Pivot",
    "taskNumber": 57
  },
  {
    "tmSupplierId": 50002963,
    "supplierSapCode": "10122",
    "supplierShortNameZh": "上海海泰汽配",
    "supplierShortNameEn": "SH Haitai",
    "taskNumber": 54
  },
  {
    "tmSupplierId": 50003136,
    "supplierSapCode": "10023",
    "supplierShortNameZh": "华域视觉",
    "supplierShortNameEn": "HASCO VISION",
    "taskNumber": 53
  },
  {
    "tmSupplierId": 50103801,
    "supplierSapCode": "11425",
    "supplierShortNameZh": "宁波屹丰",
    "supplierShortNameEn": "NB YiFeng Auto",
    "taskNumber": 52
  },
  {
    "tmSupplierId": 50002824,
    "supplierSapCode": "10234",
    "supplierShortNameZh": "南通海林汽车橡塑",
    "supplierShortNameEn": "NT Hailin",
    "taskNumber": 51
  },
  {
    "tmSupplierId": 50002688,
    "supplierSapCode": "10904",
    "supplierShortNameZh": "常州星宇车灯",
    "supplierShortNameEn": "CZ Xingyu",
    "taskNumber": 50
  },
  {
    "tmSupplierId": 50003084,
    "supplierSapCode": "10715",
    "supplierShortNameZh": "上海群力橡塑制品",
    "supplierShortNameEn": "SH Qunli Rubber",
    "taskNumber": 45
  },
  {
    "tmSupplierId": 50010103,
    "supplierSapCode": "11156",
    "supplierShortNameZh": "上海晶欣",
    "supplierShortNameEn": "SH Jingxin",
    "taskNumber": 43
  },
  {
    "tmSupplierId": 50002664,
    "supplierSapCode": "10849",
    "supplierShortNameZh": "测试",
    "supplierShortNameEn": "ceshi",
    "taskNumber": 41
  },
  {
    "tmSupplierId": 50002694,
    "supplierSapCode": "10367",
    "supplierShortNameZh": "上海新马",
    "supplierShortNameEn": "SH Xinma",
    "taskNumber": 41
  },
  {
    "tmSupplierId": 50002851,
    "supplierSapCode": "10207",
    "supplierShortNameZh": "上海奥林",
    "supplierShortNameEn": "SH AolinFitting",
    "taskNumber": 38
  },
  {
    "tmSupplierId": 50002700,
    "supplierSapCode": "10377",
    "supplierShortNameZh": "宁波福尔达",
    "supplierShortNameEn": "NB Fuerda",
    "taskNumber": 38
  },
  {
    "tmSupplierId": 50003009,
    "supplierSapCode": "10781",
    "supplierShortNameZh": "宁波华德汽车",
    "supplierShortNameEn": "NB Huade",
    "taskNumber": 37
  },
  {
    "tmSupplierId": 50167805,
    "supplierSapCode": "11575",
    "supplierShortNameZh": "宁波汇驰",
    "supplierShortNameEn": "NB Huichi",
    "taskNumber": 33
  },
  {
    "tmSupplierId": 50002759,
    "supplierSapCode": "10288",
    "supplierShortNameZh": "宁波星陆",
    "supplierShortNameEn": "Ningbo Xinglu",
    "taskNumber": 33
  },
  {
    "tmSupplierId": 50002429,
    "supplierSapCode": "10922",
    "supplierShortNameZh": "苏州英利",
    "supplierShortNameEn": "SZ Engley",
    "taskNumber": 33
  },
  {
    "tmSupplierId": 50011250,
    "supplierSapCode": "11182",
    "supplierShortNameZh": "博戈橡胶金属",
    "supplierShortNameEn": "SH Boge",
    "taskNumber": 32
  },
  {
    "tmSupplierId": 50002754,
    "supplierSapCode": "10291",
    "supplierShortNameZh": "上海瑞尔实业",
    "supplierShortNameEn": "SH Real",
    "taskNumber": 31
  },
  {
    "tmSupplierId": 50165805,
    "supplierSapCode": "11568",
    "supplierShortNameZh": "延锋饰件长沙",
    "supplierShortNameEn": "Yanfeng CS",
    "taskNumber": 31
  },
  {
    "tmSupplierId": 50003140,
    "supplierSapCode": "10019",
    "supplierShortNameZh": "上海实业交通电器",
    "supplierShortNameEn": "SH SIIC",
    "taskNumber": 30
  },
  {
    "tmSupplierId": 50007101,
    "supplierSapCode": "11252",
    "supplierShortNameZh": "南京东华力威",
    "supplierShortNameEn": "Donghua Liwei",
    "taskNumber": 29
  },
  {
    "tmSupplierId": 50005353,
    "supplierSapCode": "11180",
    "supplierShortNameZh": "张家港天乐橡塑",
    "supplierShortNameEn": "ZJG Tianle",
    "taskNumber": 29
  },
  {
    "tmSupplierId": 50174801,
    "supplierSapCode": "11686",
    "supplierShortNameZh": "宁波宝陆",
    "supplierShortNameEn": "Ningbo Baolu",
    "taskNumber": 28
  },
  {
    "tmSupplierId": 50001201,
    "supplierSapCode": "11092",
    "supplierShortNameZh": "江苏日盈",
    "supplierShortNameEn": "JS  Riying",
    "taskNumber": 28
  },
  {
    "tmSupplierId": 50002643,
    "supplierSapCode": "10855",
    "supplierShortNameZh": "延锋智能安全",
    "supplierShortNameEn": "YFSS",
    "taskNumber": 27
  },
  {
    "tmSupplierId": 50002882,
    "supplierSapCode": "10178",
    "supplierShortNameZh": "上海同舟",
    "supplierShortNameEn": "SH Tongzhou",
    "taskNumber": 27
  },
  {
    "tmSupplierId": 50002798,
    "supplierSapCode": "10434",
    "supplierShortNameZh": "嘉兴敏惠汽车",
    "supplierShortNameEn": "JX Minhui",
    "taskNumber": 27
  },
  {
    "tmSupplierId": 50002786,
    "supplierSapCode": "10265",
    "supplierShortNameZh": "廊坊华安汽车装备",
    "supplierShortNameEn": "LF Huaan",
    "taskNumber": 27
  },
  {
    "tmSupplierId": 50080550,
    "supplierSapCode": "11365",
    "supplierShortNameZh": "奥林安全系统",
    "supplierShortNameEn": "SH Aolin Safety",
    "taskNumber": 27
  },
  {
    "tmSupplierId": 50011452,
    "supplierSapCode": "11189",
    "supplierShortNameZh": "太仓市联宏电塑",
    "supplierShortNameEn": "TC Lianhong",
    "taskNumber": 27
  },
  {
    "tmSupplierId": 50001064,
    "supplierSapCode": "11057",
    "supplierShortNameZh": "延锋彼欧汽车外饰",
    "supplierShortNameEn": "YFPO",
    "taskNumber": 26
  },
  {
    "tmSupplierId": 50002946,
    "supplierSapCode": "10809",
    "supplierShortNameZh": "上海依工塑料五金",
    "supplierShortNameEn": "SH ITW",
    "taskNumber": 26
  },
  {
    "tmSupplierId": 50002637,
    "supplierSapCode": "10860",
    "supplierShortNameZh": "安徽爱德夏",
    "supplierShortNameEn": "AH Edscha",
    "taskNumber": 25
  },
  {
    "tmSupplierId": 50129751,
    "supplierSapCode": "11484",
    "supplierShortNameZh": "延锋饰件宁波",
    "supplierShortNameEn": "YF NB TS",
    "taskNumber": 25
  },
  {
    "tmSupplierId": 50002821,
    "supplierSapCode": "10237",
    "supplierShortNameZh": "科世达上海",
    "supplierShortNameEn": "SH Kostal",
    "taskNumber": 24
  },
  {
    "tmSupplierId": 50003022,
    "supplierSapCode": "10828",
    "supplierShortNameZh": "帅特龙",
    "supplierShortNameEn": "STL",
    "taskNumber": 24
  },
  {
    "tmSupplierId": 50001219,
    "supplierSapCode": "11052",
    "supplierShortNameZh": "烟台三环",
    "supplierShortNameEn": "Yant Tri-circle",
    "taskNumber": 24
  },
  {
    "tmSupplierId": 50002929,
    "supplierSapCode": "10141",
    "supplierShortNameZh": "上海吉翔汽车车顶",
    "supplierShortNameEn": "JARC",
    "taskNumber": 23
  },
  {
    "tmSupplierId": 50002978,
    "supplierSapCode": "10785",
    "supplierShortNameZh": "无锡威卡威",
    "supplierShortNameEn": "WX WKW",
    "taskNumber": 23
  },
  {
    "tmSupplierId": 50002860,
    "supplierSapCode": "10198",
    "supplierShortNameZh": "中信戴卡",
    "supplierShortNameEn": "Citic Dicastal",
    "taskNumber": 22
  },
  {
    "tmSupplierId": 50003148,
    "supplierSapCode": "10012",
    "supplierShortNameZh": "上海汽车地毯总厂",
    "supplierShortNameEn": "SH Car Carpet",
    "taskNumber": 22
  },
  {
    "tmSupplierId": 50001870,
    "supplierSapCode": "10976",
    "supplierShortNameZh": "上海凯众材料",
    "supplierShortNameEn": "SH Carthane",
    "taskNumber": 21
  },
  {
    "tmSupplierId": 50002651,
    "supplierSapCode": "10915",
    "supplierShortNameZh": "神通集团",
    "supplierShortNameEn": "Shentong",
    "taskNumber": 20
  },
  {
    "tmSupplierId": 50003077,
    "supplierSapCode": "10489",
    "supplierShortNameZh": "住理工安维斯",
    "supplierShortNameEn": "Sumiriko AVS",
    "taskNumber": 20
  },
  {
    "tmSupplierId": 50002646,
    "supplierSapCode": "10847",
    "supplierShortNameZh": "宁波均胜群英",
    "supplierShortNameEn": "NB Joyson Elec.",
    "taskNumber": 19
  },
  {
    "tmSupplierId": 50002855,
    "supplierSapCode": "10203",
    "supplierShortNameZh": "申雅密封件",
    "supplierShortNameEn": "Cooper Standard",
    "taskNumber": 19
  },
  {
    "tmSupplierId": 50002766,
    "supplierSapCode": "10282",
    "supplierShortNameZh": "纬湃芜湖",
    "supplierShortNameEn": "Vitesco Wuhu",
    "taskNumber": 19
  },
  {
    "tmSupplierId": 50002720,
    "supplierSapCode": "10309",
    "supplierShortNameZh": "上海金豹",
    "supplierShortNameEn": "SH Jinbao",
    "taskNumber": 19
  },
  {
    "tmSupplierId": 50002692,
    "supplierSapCode": "10790",
    "supplierShortNameZh": "宁波富诚",
    "supplierShortNameEn": "NBFC",
    "taskNumber": 19
  },
  {
    "tmSupplierId": 50096801,
    "supplierSapCode": "11457",
    "supplierShortNameZh": "胜维德赫华翔车镜",
    "supplierShortNameEn": "NB SMR-HX",
    "taskNumber": 18
  },
  {
    "tmSupplierId": 50002887,
    "supplierSapCode": "10173",
    "supplierShortNameZh": "湖州安达",
    "supplierShortNameEn": "HZ Anda",
    "taskNumber": 18
  },
  {
    "tmSupplierId": 50002711,
    "supplierSapCode": "10369",
    "supplierShortNameZh": "上海华特",
    "supplierShortNameEn": "SH Huate",
    "taskNumber": 18
  },
  {
    "tmSupplierId": 50115750,
    "supplierSapCode": "11391",
    "supplierShortNameZh": "扬州洪维",
    "supplierShortNameEn": "YZ Hongwei",
    "taskNumber": 18
  },
  {
    "tmSupplierId": 50003044,
    "supplierSapCode": "10660",
    "supplierShortNameZh": "伟巴斯特车顶供暖",
    "supplierShortNameEn": "SH Webasto",
    "taskNumber": 18
  },
  {
    "tmSupplierId": 50002938,
    "supplierSapCode": "10791",
    "supplierShortNameZh": "上海永菱科技",
    "supplierShortNameEn": "SH Yongling",
    "taskNumber": 17
  },
  {
    "tmSupplierId": 50003113,
    "supplierSapCode": "10039",
    "supplierShortNameZh": "延锋汽车饰件",
    "supplierShortNameEn": "YF Trim",
    "taskNumber": 17
  },
  {
    "tmSupplierId": 50002892,
    "supplierSapCode": "10169",
    "supplierShortNameZh": "上海曹王塑料制品",
    "supplierShortNameEn": "SH Caowang",
    "taskNumber": 16
  },
  {
    "tmSupplierId": 50001665,
    "supplierSapCode": "11031",
    "supplierShortNameZh": "金鸿顺",
    "supplierShortNameEn": "JHS",
    "taskNumber": 16
  },
  {
    "tmSupplierId": 50003151,
    "supplierSapCode": "10052",
    "supplierShortNameZh": "上海马勒热系统",
    "supplierShortNameEn": "SH MAHLE Thermal",
    "taskNumber": 16
  },
  {
    "tmSupplierId": 50003021,
    "supplierSapCode": "10098",
    "supplierShortNameZh": "南京奥托立",
    "supplierShortNameEn": "NJ Autoliv",
    "taskNumber": 16
  },
  {
    "tmSupplierId": 50107800,
    "supplierSapCode": "11454",
    "supplierShortNameZh": "特科拉",
    "supplierShortNameEn": "TEKLAS",
    "taskNumber": 16
  },
  {
    "tmSupplierId": 50001208,
    "supplierSapCode": "11102",
    "supplierShortNameZh": "上海卡斯马",
    "supplierShortNameEn": "SH Cosma",
    "taskNumber": 16
  },
  {
    "tmSupplierId": 50001654,
    "supplierSapCode": "10885",
    "supplierShortNameZh": "凯塞（苏州）",
    "supplierShortNameEn": "SZ Kayser",
    "taskNumber": 15
  },
  {
    "tmSupplierId": 50001577,
    "supplierSapCode": "10951",
    "supplierShortNameZh": "象山博宇汽车模塑",
    "supplierShortNameEn": "XS Boyu",
    "taskNumber": 15
  },
  {
    "tmSupplierId": 50143802,
    "supplierSapCode": "11594",
    "supplierShortNameZh": "夙臻机械",
    "supplierShortNameEn": "SuperZ",
    "taskNumber": 15
  },
  {
    "tmSupplierId": 50125800,
    "supplierSapCode": "11506",
    "supplierShortNameZh": "扬州宝陆",
    "supplierShortNameEn": "YZ Baolu",
    "taskNumber": 15
  },
  {
    "tmSupplierId": 50002910,
    "supplierSapCode": "10154",
    "supplierShortNameZh": "上海吉谊",
    "supplierShortNameEn": "SH Jiyi",
    "taskNumber": 15
  },
  {
    "tmSupplierId": 50066550,
    "supplierSapCode": "11319",
    "supplierShortNameZh": "上海大陆制动销售",
    "supplierShortNameEn": "SH Continental",
    "taskNumber": 15
  },
  {
    "tmSupplierId": 50001302,
    "supplierSapCode": "11161",
    "supplierShortNameZh": "杭州吉达",
    "supplierShortNameEn": "HZ Jida Fitting",
    "taskNumber": 15
  },
  {
    "tmSupplierId": 50002659,
    "supplierSapCode": "10820",
    "supplierShortNameZh": "西德科（上海）",
    "supplierShortNameEn": "Sitech（shanghai)",
    "taskNumber": 14
  },
  {
    "tmSupplierId": 50002644,
    "supplierSapCode": "10846",
    "supplierShortNameZh": "胜铎盛士达",
    "supplierShortNameEn": "Xandor Senstar",
    "taskNumber": 14
  },
  {
    "tmSupplierId": 50141800,
    "supplierSapCode": "11505",
    "supplierShortNameZh": "上海福宇龙",
    "supplierShortNameEn": "SHFYL",
    "taskNumber": 14
  },
  {
    "tmSupplierId": 50002476,
    "supplierSapCode": "10945",
    "supplierShortNameZh": "斯泰必鲁斯（江苏",
    "supplierShortNameEn": "JS Stabilus",
    "taskNumber": 14
  },
  {
    "tmSupplierId": 50001045,
    "supplierSapCode": "11106",
    "supplierShortNameZh": "上海诚烨",
    "supplierShortNameEn": "Chengye",
    "taskNumber": 14
  },
  {
    "tmSupplierId": 50096800,
    "supplierSapCode": "11362",
    "supplierShortNameZh": "上海英汇",
    "supplierShortNameEn": "SH Essenway",
    "taskNumber": 13
  },
  {
    "tmSupplierId": 50002903,
    "supplierSapCode": "10160",
    "supplierShortNameZh": "昆山隆昌车业",
    "supplierShortNameEn": "KS Longchang",
    "taskNumber": 13
  },
  {
    "tmSupplierId": 50074551,
    "supplierSapCode": "11607",
    "supplierShortNameZh": "帕萨思上海",
    "supplierShortNameEn": "Pass上海",
    "taskNumber": 13
  },
  {
    "tmSupplierId": 50002840,
    "supplierSapCode": "10217",
    "supplierShortNameZh": "昆山六丰机械工业",
    "supplierShortNameEn": "KS Liufeng",
    "taskNumber": 13
  },
  {
    "tmSupplierId": 50003091,
    "supplierSapCode": "10510",
    "supplierShortNameZh": "长春大陆汽车电子",
    "supplierShortNameEn": "CC Continental",
    "taskNumber": 13
  },
  {
    "tmSupplierId": 50003088,
    "supplierSapCode": "10518",
    "supplierShortNameZh": "舍弗勒（上海）",
    "supplierShortNameEn": "SH Schaeffler",
    "taskNumber": 13
  },
  {
    "tmSupplierId": 50107801,
    "supplierSapCode": "11585",
    "supplierShortNameZh": "福沃克（苏州）",
    "supplierShortNameEn": "SZ Vorwerk",
    "taskNumber": 13
  },
  {
    "tmSupplierId": 50012509,
    "supplierSapCode": "11388",
    "supplierShortNameZh": "科博达技术",
    "supplierShortNameEn": "Keboda Tech",
    "taskNumber": 13
  },
  {
    "tmSupplierId": 50011400,
    "supplierSapCode": "11153",
    "supplierShortNameZh": "上海赛科利",
    "supplierShortNameEn": "SH Superior",
    "taskNumber": 13
  },
  {
    "tmSupplierId": 50002654,
    "supplierSapCode": "10955",
    "supplierShortNameZh": "温州长江",
    "supplierShortNameEn": "WZ Changjiang",
    "taskNumber": 12
  },
  {
    "tmSupplierId": 50020351,
    "supplierSapCode": "11237",
    "supplierShortNameZh": "无锡万华",
    "supplierShortNameEn": "WX Wanhua",
    "taskNumber": 12
  },
  {
    "tmSupplierId": 50002914,
    "supplierSapCode": "10151",
    "supplierShortNameZh": "上海新安汽车隔音",
    "supplierShortNameEn": "SH Xin'an",
    "taskNumber": 12
  },
  {
    "tmSupplierId": 50001081,
    "supplierSapCode": "11112",
    "supplierShortNameZh": "昆山海斯坦普",
    "supplierShortNameEn": "KS Gestamp",
    "taskNumber": 12
  },
  {
    "tmSupplierId": 50003085,
    "supplierSapCode": "10055",
    "supplierShortNameZh": "亚普",
    "supplierShortNameEn": "YAPP AutoParts",
    "taskNumber": 12
  },
  {
    "tmSupplierId": 50015350,
    "supplierSapCode": "11253",
    "supplierShortNameZh": "宝钢高新技术",
    "supplierShortNameEn": "Baosteel H-Tech",
    "taskNumber": 12
  },
  {
    "tmSupplierId": 50001299,
    "supplierSapCode": "10991",
    "supplierShortNameZh": "深圳法雷奥",
    "supplierShortNameEn": "SZ Valeo",
    "taskNumber": 12
  },
  {
    "tmSupplierId": 50001626,
    "supplierSapCode": "10876",
    "supplierShortNameZh": "无锡中策",
    "supplierShortNameEn": "WX Zhongce",
    "taskNumber": 11
  },
  {
    "tmSupplierId": 50002837,
    "supplierSapCode": "10220",
    "supplierShortNameZh": "上海爱德夏机械",
    "supplierShortNameEn": "SH Edscha",
    "taskNumber": 11
  },
  {
    "tmSupplierId": 50002802,
    "supplierSapCode": "10251",
    "supplierShortNameZh": "联合汽车电子",
    "supplierShortNameEn": "UAES",
    "taskNumber": 11
  },
  {
    "tmSupplierId": 50002775,
    "supplierSapCode": "10274",
    "supplierShortNameZh": "上海多利",
    "supplierShortNameEn": "SH Duoli",
    "taskNumber": 11
  },
  {
    "tmSupplierId": 50002698,
    "supplierSapCode": "10360",
    "supplierShortNameZh": "上海程达",
    "supplierShortNameEn": "SH Chengda",
    "taskNumber": 11
  },
  {
    "tmSupplierId": 50003026,
    "supplierSapCode": "10651",
    "supplierShortNameZh": "瀚德中国",
    "supplierShortNameEn": "Henniges",
    "taskNumber": 11
  },
  {
    "tmSupplierId": 50002966,
    "supplierSapCode": "10735",
    "supplierShortNameZh": "康迪泰克（宁海）",
    "supplierShortNameEn": "NH Contitech",
    "taskNumber": 11
  },
  {
    "tmSupplierId": 50002650,
    "supplierSapCode": "10845",
    "supplierShortNameZh": "上海科德",
    "supplierShortNameEn": "SH Golde",
    "taskNumber": 10
  },
  {
    "tmSupplierId": 50002885,
    "supplierSapCode": "10175",
    "supplierShortNameZh": "昆山达亚",
    "supplierShortNameEn": "KSDY",
    "taskNumber": 10
  },
  {
    "tmSupplierId": 50002790,
    "supplierSapCode": "10261",
    "supplierShortNameZh": "上海法雷奥电机",
    "supplierShortNameEn": "SH Valeo Wiper",
    "taskNumber": 10
  },
  {
    "tmSupplierId": 50002788,
    "supplierSapCode": "10263",
    "supplierShortNameZh": "上海众盛胶粘剂",
    "supplierShortNameEn": "SH Zhongsheng",
    "taskNumber": 10
  },
  {
    "tmSupplierId": 50002734,
    "supplierSapCode": "10494",
    "supplierShortNameZh": "延锋安道拓嘉定座",
    "supplierShortNameEn": "YF Adient JD",
    "taskNumber": 10
  },
  {
    "tmSupplierId": 50003114,
    "supplierSapCode": "10038",
    "supplierShortNameZh": "上海爱斯达克空调",
    "supplierShortNameEn": "SDAAC AC(SH)",
    "taskNumber": 10
  },
  {
    "tmSupplierId": 50003081,
    "supplierSapCode": "10058",
    "supplierShortNameZh": "纳铁福传动系统",
    "supplierShortNameEn": "SH GKN HY",
    "taskNumber": 10
  },
  {
    "tmSupplierId": 50003061,
    "supplierSapCode": "10075",
    "supplierShortNameZh": "贵州红阳",
    "supplierShortNameEn": "Guizhou Hongyang",
    "taskNumber": 10
  },
  {
    "tmSupplierId": 50002649,
    "supplierSapCode": "10844",
    "supplierShortNameZh": "长春海拉车灯",
    "supplierShortNameEn": "CC Hella",
    "taskNumber": 9
  },
  {
    "tmSupplierId": 50002943,
    "supplierSapCode": "10134",
    "supplierShortNameZh": "常州轻质橡塑",
    "supplierShortNameEn": "CZ Qingzhi",
    "taskNumber": 9
  },
  {
    "tmSupplierId": 50123752,
    "supplierSapCode": "11499",
    "supplierShortNameZh": "浙江祥晋",
    "supplierShortNameEn": "ZJ Xiangjin",
    "taskNumber": 9
  },
  {
    "tmSupplierId": 50002757,
    "supplierSapCode": "10286",
    "supplierShortNameZh": "大连固特异轮胎",
    "supplierShortNameEn": "DL Goodyear",
    "taskNumber": 9
  },
  {
    "tmSupplierId": 50001267,
    "supplierSapCode": "11099",
    "supplierShortNameZh": "太仓和承",
    "supplierShortNameEn": "TC HeCheng",
    "taskNumber": 9
  },
  {
    "tmSupplierId": 50001210,
    "supplierSapCode": "11055",
    "supplierShortNameZh": "宁波中骏森驰",
    "supplierShortNameEn": "NB Zhongjun",
    "taskNumber": 9
  },
  {
    "tmSupplierId": 50001162,
    "supplierSapCode": "11075",
    "supplierShortNameZh": "上海本特勒",
    "supplierShortNameEn": "SH Benteler",
    "taskNumber": 9
  },
  {
    "tmSupplierId": 50002639,
    "supplierSapCode": "10924",
    "supplierShortNameZh": "吉林通用机械",
    "supplierShortNameEn": "JL Universal",
    "taskNumber": 8
  },
  {
    "tmSupplierId": 50097853,
    "supplierSapCode": "11459",
    "supplierShortNameZh": "明岐仪征",
    "supplierShortNameEn": "YZ Mingqi",
    "taskNumber": 8
  },
  {
    "tmSupplierId": 50001553,
    "supplierSapCode": "10973",
    "supplierShortNameZh": "采埃孚富奥底盘",
    "supplierShortNameEn": "CC ZF FAWER",
    "taskNumber": 8
  },
]