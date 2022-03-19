/*
 * @Author: moxuan
 * @Date: 2021-04-13 17:50:00
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 */

export const supplierDirectoryTableTitle = [
  {
    props: 'contactType',
    name: '联系人类型',
    key: 'SUPPLIER_LIANXIRENLEIXING'
  },
  {
    props: 'nameZh',
    name: '联系人姓名',
    key: 'SUPPLIER_LIANXIRENXINGMING',
    required: true
  },
  { props: 'designation', name: '职位', key: 'SUPPLIER_ZHIWEI', width: 200 },
  { props: 'dept', name: '部门', key: 'SUPPLIER_BUMEN', width: 200 },
  { props: 'telephoneAreaCode', name: '区号', key: 'SUPPLIER_QUHAO' },
  {
    props: 'telephone',
    name: '联系电话',
    key: 'SUPPLIER_LIANXIDIANHUA',
    required: true,
    width: 150
  },
  {
    props: 'email',
    name: '电子邮件',
    key: 'SUPPLIER_DIANZIYOUJIAN',
    required: true,
    width: 270,
    rule: [
      {
        pattern:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: '请输入正确的电子邮件',
        trigger: 'blur'
      }
    ]
  },
  { props: 'remark', name: '备注', key: 'SUPPLIER_BEIZHU' }
]

export const supplierUserNameTableTitle = [
  {
    props: 'isDefault',
    name: '是否为主用户',
    width: 120,
    key: 'SUPPLIER_ISWEIZHUYONGHU'
  },
  {
    props: 'nameZh',
    name: '联系人姓名',
    key: 'SUPPLIER_LIANXIRENXINGMING',
    required: true,
    width: 140
  },
  { props: 'designation', name: '职位', key: 'SUPPLIER_ZHIWEI', width: 200 },
  { props: 'dept', name: '部门', key: 'SUPPLIER_BUMEN', width: 200 },
  { props: 'telephoneAreaCode', name: '区号', key: 'SUPPLIER_QUHAO' },
  {
    props: 'telephone',
    name: '联系电话',
    key: 'SUPPLIER_LIANXIDIANHUA',
    required: true,
    width: 150
  },
  {
    props: 'email',
    name: '电子邮件',
    key: 'SUPPLIER_DIANZIYOUJIAN',
    width: 270,
    required: true,
    rule: [
      {
        pattern:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: '请输入正确的电子邮件',
        trigger: 'blur'
      }
    ]
  },
  {
    props: 'userName',
    name: '用户登录名',
    key: 'SUPPLIER_YONGHUDENGLUMING',
    tooltip: true,
    width: 170,
  },
  {
    props: 'isActivity',
    name: '是否有效',
    key: 'SUPPLIER_SHIFOUHUODONG',
    tooltip: true
  },
  { props: 'isExpire', name: '是否超期', key: 'SHIFOUCHAOQI', tooltip: true },
  {
    props: 'expireDate',
    name: '超期时间',
    key: 'CHAOQISHIJIAN',
    tooltip: true,
    width: 200
  },
  {
    props: 'loginDate',
    name: '登录rise系统时间',
    key: 'DENGLURISEXITONGSHIJIAN',
    tooltip: true,
    width: 200
  },
  { props: 'operation', name: '应用关联', key: '' }
]
export const dialogTableTitle = [
  { props: 'isExpire', name: '中文名称', key: '' },
  { props: 'expireDate', name: '英文名称', key: '' },
  { props: 'loginDate', name: '门户用户组', width: 170, key: '' },
  { props: 'operation', name: '安全中心LDAP属性', key: '' },
  { props: 'operation', name: '接受业务', key: '' }
]
export const CloumDel = [
  { props: 'appNameCn', name: '应用中文名', key: '' },
  { props: 'appNameEn', name: '应用英文名', key: '' },
  { props: 'systemType', name: '应用类型', key: '' }
]

export const CloumAdd = [
  { props: 'appNameCn', name: '应用中文名', key: '' },
  { props: 'appNameEn', name: '应用英文名', key: '' },
  { props: 'systemType', name: '应用类型', key: '' }
]
