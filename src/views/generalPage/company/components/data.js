

export const shareholderTitle = [
  { props: 'name', name: '股东名称', key: 'GUDONGMINCHEN' },
  { props: 'nation', name: '国家/地区', key: 'GUOJIA_DIQU' },
  { props: 'shareholderContribution', name: '出资额', key: 'CHUZIE' },
  { props: 'currency', name: '币种', key: 'BIZHONG' },
  { props: 'proportion', name: '持股比例（%）', width: 150, key: 'ZHIGUBILI' },
  { props: 'mainBusiness', name: '主营业务', key: 'ZHUYINYEWU' },
  { props: 'industryBelongs', name: '行业归属', key: 'HANGYEGUISHU' },
  { props: 'principal', name: '负责人', key: 'FUZEREN' },
  { props: 'shareholderSupport', name: '股东公司的支持情况', width: 150, key: 'GUDONGGONGSIDEZHICHIQINGKANG' },
  { props: 'idNum', name: '股东证照/证件号码', width: 150, key: 'GUDONGZHENGJIANHANGMA' },
  { props: 'investor_type', name: '股东类型', key: 'GUDONGLEIXING' }
]
export const groupTitle = [
  { props: 'name', name: '集团公司全称', key: 'JITUANGONGSIQUANCHEN' },
  { props: 'nameEn', name: '英文名称', key: 'YINWENMINCHEN' },
  { props: 'abbReviation', name: '集团你公司简称', key: 'JITUANGONGSIJIANCHEN' },
  { props: 'nation', name: '国家', key: 'GUOJIA' },
  { props: 'headquarters', name: '总部', key: 'ZONGBU' }
]
export const companyTitle = [
  { props: 'name', name: '关联公司名称', key: 'SUPPLIER_GUANLIANGONGSIMINGCHENG' },
  { props: 'description', name: '关系描述', key: 'SUPPLIER_GUANXIMIAOSHU' },
  { props: 'entProperty', name: '企业性质', key: 'SUPPLIER_QIYEXINGZHI' },
  { props: 'country', name: '所在国家/地区', key: 'SUPPLIER_SUOZAIGUOJIADIQU' },
  {
    props: 'regCapital', name: '注册资本（万）', key: 'SUPPLIER_ZHUCEZIBENWAN', rule: [{
      pattern: /^\d+$|^\d+[.]?\d+$/,
      message: '请输入数字',
      trigger: 'blur'
    }]
  },
  { props: 'unit', name: '单位', key: 'SUPPLIER_DANWEI' },
  { props: 'controllingShare', name: '控股比例（%）', key: 'SUPPLIER_KONGGUBILI' },
  { props: 'remark', name: '备注', key: 'LK_BEIZHU' }
]

