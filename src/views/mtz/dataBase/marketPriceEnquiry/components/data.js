/*
 * @Author: your name
 * @Date: 2021-09-17 13:56:42
 * @LastEditTime: 2023-03-20 16:24:15
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\dataBase\marketPriceEnquiry\components\data.js
 */
// 员工列表Table配置
export const tableSetting = [
  {
    props: 'materialCode',
    name: '原材料牌号',
    key: 'YUANCAILIAOPAIHAO',
    tooltip: true,
    fixed: true,
    width: 110
  },
  {
    props: 'period',
    name: '月份期间',
    key: 'YUEFENQIJIAN',
    tooltip: true,
    fixed: true,
    width: 90
  },
  {
    props: 'marketType',
    name: '市场价类别',
    key: 'SHICHANGJIALEIBIE',
    fixed: true,
    width: 130
  },
  {
    props: 'materialName',
    name: '原材料名称',
    key: 'YUANCAILIAOMINGCHENG',
    width: 130
  },
  {
    props: 'materialCategory',
    name: '材料中类',
    key: 'CAILIAOZHONGLEI',
    width: 90
  },
  { props: 'categoryDesc', name: '中类描述', key: 'ZHONGLEIMIAOSHU' },
  {
    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    minWidth: 150
  },
  { props: 'eprice', name: '市场价', key: 'SHICHANGJIA', minWidth: 150 },
  { props: 'unit', name: '计量单位', key: 'JILIANGDANWEI', width: 90 },
  { props: 'priceUnit', name: '每', key: 'MEI', width: 70 },
  { props: 'currency', name: '货币', key: 'HUOBI', width: 70 },
  { props: 'exchangeRate', name: '汇率', key: 'MTZHUILV', width: 70 }
]

export const ruleQueryFormData = [
  {
    props: 'materialCode',
    name: '原材料牌号',
    key: 'YUANCAILIAOPAIHAO',
    type: 'input'
  },
  { props: 'periodStart', name: '月度起', key: 'YUEDUQI', type: 'datepicker' },
  { props: 'periodEnd', name: '月度止', key: 'YUEDUZHI', type: 'datepicker' },
  {
    props: 'materialName',
    name: '原材料名称',
    key: 'YUANCAILIAOMINGCHENG',
    type: 'input'
  },
  {
    props: 'materialCategory',
    name: '材料中类',
    key: 'CAILIAOZHONGLEI',
    type: 'input'
  },
  {
    props: 'categoryDesc',
    name: '中类描述',
    key: 'ZHONGLEIMIAOSHU',
    type: 'input'
  },
  {
    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    type: 'select'
  },
  {
    props: 'marketType',
    name: '市场价类别',
    key: 'SHICHANGJIALEIBIE',
    type: 'select'
  }
]

export const uploadInfoTableTitle = [
  { props: 'index', name: '#', key: '', tooltip: true, width: 50 },
  {
    props: 'remark',
    name: '错误信息',
    key: 'CUOWUXINXI',
    tooltip: true,
    width: 400
  },
  {
    props: 'materialNo',
    name: '编码',
    key: 'BIANMA',
    tooltip: true,
    width: 120
  },
  { props: 'name', name: '名称', key: 'MINGCHENG', tooltip: true, width: 120 },
  { props: 'period', name: '生效期间', key: 'SHENGXIAOQIJIAN', width: 120 },
  { props: 'marketType', name: '类别', key: 'LEIBIE', width: 120 },
  { props: 'eprice', name: '市场价', key: 'SHICHANGJIA', width: 120 },
  { props: 'currency', name: '币种', key: 'BIZHONG', width: 120 },
  { props: 'priceUnit', name: '定价单位', key: 'DINGJIADANWEI', width: 120 },
  {
    props: 'unit',
    name: '定价计量单位',
    key: 'DINGJIAJILIANGDANWEI',
    width: 150
  },
  { props: 'exchangeRate', name: '汇率', key: 'MTZHUILV', width: 120 },
  { props: 'source', name: '来源', key: 'LAIYUAN', width: 120 }
]

export const mock = {
  "result": true,
  "code": "200",
  "desEn": "success",
  "desZh": "操作成功",
  "data": [
      {
          "spSapCode": null,
          "spName": null,
          "ruleNo": null,
          "title": "AL市场价",
          "monthPriceList": [
            {
              "month": "202302",
              "price": "8740.00"
            },{
              "month": "202303",
              "price": "7740.00"
            },{
              "month": "202305",
              "price": "6740.00"
            },{
              "month": "202306",
              "price": "7740.00"
            },{
              "month": "202309",
              "price": "8740.00"
            },
          ]
      },
      {
          "spSapCode": "10097",
          "spName": "上海汇众汽车制造有限公司",
          "ruleNo": "MTZ-19-00433",
          "title": "10097-上海汇众汽车制造有限公司 MTZ-19-00433",
          "monthPriceList": [
              {
                  "month": "202301",
                  "price": "8740.00"
              },
              {
                  "month": "202302",
                  "price": "14740.00"
              },
              {
                  "month": "202303",
                  "price": "10740.00"
              },
              {
                  "month": "202304",
                  "price": "10740.00"
              },
              {
                  "month": "202305",
                  "price": "12740.00"
              },
              {
                  "month": "202306",
                  "price": "13740.00"
              },
              {
                  "month": "202307",
                  "price": "6740.00"
              },
              {
                  "month": "202308",
                  "price": "9740.00"
              },
              {
                  "month": "202309",
                  "price": "21740.00"
              },
              {
                  "month": "202310",
                  "price": "21740.00"
              },
              {
                  "month": "202311",
                  "price": "22740.00"
              },
              {
                  "month": "202312",
                  "price": "22740.00"
              }
          ]
      },
      {
          "spSapCode": "10097",
          "spName": "上海汇众汽车制造有限公司",
          "ruleNo": "MTZ-19-00434",
          "title": "10097-上海汇众汽车制造有限公司 MTZ-19-00434",
          "monthPriceList": [
              {
                  "month": "202301",
                  "price": "21550.00"
              },
              {
                  "month": "202302",
                  "price": "21550.00"
              },
              {
                  "month": "202303",
                  "price": "21550.00"
              },
              {
                  "month": "202304",
                  "price": "21550.00"
              },
              {
                  "month": "202305",
                  "price": "21550.00"
              },
              {
                  "month": "202306",
                  "price": "21550.00"
              },
              {
                  "month": "202307",
                  "price": "21550.00"
              },
              {
                  "month": "202308",
                  "price": "21550.00"
              },
              {
                  "month": "202309",
                  "price": "21550.00"
              },
              {
                  "month": "202310",
                  "price": "21550.00"
              },
              {
                  "month": "202311",
                  "price": "21550.00"
              },
              {
                  "month": "202312",
                  "price": "21550.00"
              }
          ]
      },
      {
          "spSapCode": "11069",
          "spName": "布雷博（南京）制动系统有限公司",
          "ruleNo": "MTZ-19-00435",
          "title": "11069-布雷博（南京）制动系统有限公司 MTZ-19-00435",
          "monthPriceList": [
              {
                  "month": "202301",
                  "price": "21550.00"
              },
              {
                  "month": "202302",
                  "price": "21550.00"
              },
              {
                  "month": "202303",
                  "price": "21550.00"
              },
              {
                  "month": "202304",
                  "price": "21550.00"
              },
              {
                  "month": "202305",
                  "price": "21550.00"
              },
              {
                  "month": "202306",
                  "price": "21550.00"
              },
              {
                  "month": "202307",
                  "price": "21550.00"
              },
              {
                  "month": "202308",
                  "price": "21550.00"
              },
              {
                  "month": "202309",
                  "price": "21550.00"
              },
              {
                  "month": "202310",
                  "price": "21550.00"
              },
              {
                  "month": "202311",
                  "price": "21550.00"
              },
              {
                  "month": "202312",
                  "price": "21550.00"
              }
          ]
      },
      {
          "spSapCode": "11430",
          "spName": "广州阿雷斯提汽车配件有限公司",
          "ruleNo": "MTZ-19-00436",
          "title": "11430-广州阿雷斯提汽车配件有限公司 MTZ-19-00436",
          "monthPriceList": [
              {
                  "month": "202301",
                  "price": "10740.00"
              },
              {
                  "month": "202302",
                  "price": "10740.00"
              },
              {
                  "month": "202303",
                  "price": "10740.00"
              },
              {
                  "month": "202304",
                  "price": "10740.00"
              },
              {
                  "month": "202305",
                  "price": "10740.00"
              },
              {
                  "month": "202306",
                  "price": "10740.00"
              },
              {
                  "month": "202307",
                  "price": "10740.00"
              },
              {
                  "month": "202308",
                  "price": "10740.00"
              },
              {
                  "month": "202309",
                  "price": "10740.00"
              },
              {
                  "month": "202310",
                  "price": "10740.00"
              },
              {
                  "month": "202311",
                  "price": "10740.00"
              },
              {
                  "month": "202312",
                  "price": "10740.00"
              }
          ]
      }
  ]
}