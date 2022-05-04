/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:24
 * @LastEditTime: 2021-12-03 16:44:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\generalPage\approveDetails\components\data.js
 */
export const TableTitle = [
  {
    props: 'categoryCode',
    name: '材料组编号',
    key: 'SUPPLIER_CAILIAOZUBIANHAO',
    tooltip: true
  },
  {
    props: 'categoryNameZh',
    name: '材料组名称',
    key: 'SUPPLIER_CAILIAOZUMINGCHENG',
    tooltip: true
  },
  {
    props: 'stuffCode',
    name: '材料组工艺编号',
    key: 'SUPPLIER_CAILIAOZUGONGYIBIAOHAO',
    tooltip: true
  },
  {
    props: 'stuffName',
    name: '材料组工艺中文名称',
    key: 'SUPPLIER_CAILIAOZUGONGYIZHONGWENGMINGCHENG',
    width: 180
  },
  {
    props: 'stuffNameDe',
    name: '材料组工艺德文名称',
    key: 'SUPPLIER_CAILIAOZUGONGYIDEWENMINGCHENG',
    width: 180
  },
  {
    props: 'applyDeptName',
    name: '申请科室',
    key: 'SHENGQINGKESHI',
    tooltip: true
  },
  {
    props: 'prePurchase',
    name: '前期采购员',
    key: 'QIANQICAIGOUYUAN',
    tooltip: true
  },
  {
    props: 'linieGroup',
    name: 'Linie组别',
    key: 'SUPPLIER_LINIEJIBIE',
    tooltip: true
  },
  {
    props: 'linieNames',
    name: 'Linie人员',
    key: 'SUPPLIER_LINIERENYUAN',
    tooltip: true
  }
]


export const TableTitleGP = [
  {
    props: 'templateName',
    name: '附件名称',
    key: 'SUPPLIER_FUJIANMINGCHENG',
    tooltip: true
  },{
    props: 'createDate',
    name: '上传/确认日期',
    key: 'SUPPLIER_SHANGCHUANQUERENRQI',
    tooltip: true
  },{
    props: 'remark',
    name: '备注说明',
    key: 'SUPPLIER_BEIZHUSHUOMING',
    tooltip: true
  },{
    props: 'validityOfCertificate',
    name: '证件有效期',
    key: 'SUPPLIER_ZHENGJIANYOUXIAOQI',
    tooltip: true
  }
]

export const yearGP =[
  {props:'templateName',name:'附件名称', key: 'SUPPLIER_FUJIANMINGCHENG', minWidth:'250'},
  {props:'isCommitment',name:'操作', key: 'SUPPLIER_CAOZUO',width:'100'},
  {props:'createDateTime',name:'上传/确认日期', key: 'SUPPLIER_SHANGCHUANQUERENRQI', width:'180'},
  {props:'attachRemark',name:'备注说明', key: 'SUPPLIER_BEIZHUSHUOMING', width:'140'},
  {props:'templateDemoUrl',name:'样例文件', key: 'SUPPLIER_YANGLIWENJIAN',width:'150'},
  {props:'notAvailableReason',name:'不能提供原因', key: 'SUPPLIER_BUNENGTIGONGYUANYIN', width:'140'},
  {props:'lastAvailableTime',name:'最晚提供时间', key: 'SUPPLIER_ZUIWANTIGONGSHIJIAN', width:'200'},
  {props:'validityOfCertificate',name:'证件有效期', key: 'SUPPLIER_ZHENGJIANYOUXIAOQI', width:'200'},
]
