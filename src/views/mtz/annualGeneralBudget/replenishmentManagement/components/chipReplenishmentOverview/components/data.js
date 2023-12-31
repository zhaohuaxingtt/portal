/*
 * @Author: your name
 * @Date: 2021-10-09 15:06:29
 * @LastEditTime: 2023-03-20 17:49:11
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipReplenishmentOverview\components\data.js
 */
import language from "@/utils/language";
import { NumFormat } from "@/utils/tool";
import tooltip from "./tooltip";
export const TABLE_COLUMS = [
  {
    type: 'selection',
    width: '60px'
  },
  {
    type: 'index',
    width: '60px',
    label: '#'
  },
  {
    prop: 'saNo',
    label: '采购框架',
    minWidth: 120
  },
  {
    prop: 'saItemNo',
    label: '项目号',
    minWidth: 120
  },
  {
    prop: 'mtzDocMonth',
    label: '补差期间',
    minWidth: 120
  },
  {
    prop: 'fpartNo',
    label: '零件号',
    minWidth: 120
  },
  {
    prop: 'materialNo',
    label: '原材料牌号',
    minWidth: 120
  },
  {
    prop: 'materialName',
    label: '原材料名称',
    minWidth: 120
  },
  {
    prop: 'materialCategory',
    label: '材料中类',
    minWidth: 200,
    customRender: (h, scope) => {
      return (
        <span>
          {scope.row.materialCategoryCode}-{scope.row.materialCategory}
        </span>
      )
    }
  },
  {
    prop: 'basePrice',
    label: '原材料基价',
    minWidth: 120
  },
  {
    prop: 'basePriceUnit',
    label: '单位',
    minWidth: 120
  },
  {
    prop: 'bexchangeRate',
    label: '基价汇率',
    minWidth: 120
  },
  {
    prop: 'calUsg',
    label: '原材料用量',
    minWidth: 120
  },
  {
    prop: 'cond',
    label: '阈值',
    minWidth: 120
  },
  {
    prop: 'thresholdCompensationLogic',
    label: '阈值补差逻辑',
    minWidth: 120
  },
  {
    prop: 'rate',
    label: '补差系数',
    minWidth: 120
  },
  {
    prop: 'effPrice',
    label: '原材料市场价',
    minWidth: 120
  },
  {
    prop: 'basePriceUnit',
    label: '市场价单位',
    minWidth: 120
  },
  {
    prop: 'effExchangeRate',
    label: '市场价汇率',
    minWidth: 120
  },
  {
    prop: 'priceNo',
    label: '零件数量',
    minWidth: 120
  },
  {
    prop: 'calUnit',
    label: '零件数量单位',
    minWidth: 120
  },
  {
    prop: 'actAmt',
    label: '补差额',
    minWidth: 120
  },
  {
    prop: 'appAmt',
    label: '实际补差额',
    minWidth: 120
  },
  {

    prop: 'spartNo',
    label: '二次件零件号',
    minWidth: 120
  },
  {
    prop: 'secondSupplierId',
    label: '二次件供应商',
    minWidth: 140,
    customRender: (h, scope) => {
      return (
        <span>
          {scope.row.secondSupplierSap}-{scope.row.secondSupplierName}
        </span>
      )
    }
  },
  {
    prop: 'factor',
    label: '一二次件比例',
    minWidth: 120
  }
]

// 芯片补差总览页查询
export const searchFormData = [
  {
    props: 'primarySupplier', name: '一次件供应商', key: 'YICIJIANGONGYINGSHANG', type: 'select', selectOption: 'fsupplierList', optionLabel: 'message',
    optionValue: 'code',
    clearable: true,
    'collapse- tags': true,
  },
  {
    props: 'secondSupplier', name: '二次件供应商', key: 'ERCIJIANGONGYINGSHANG', type: 'select', selectOption: 'ssupplierList', optionLabel: 'message',
    optionValue: 'code'
  },
  { props: 'compDate', name: '补差时间段', key: 'BUCHASHIJIANDUAN', type: 'daterange' },
]


// 一次件供应商
export const tableTitle1 = [
  {
    type: 'index',
    label: '#',
  }, {
    prop: 'supplierName',
    label: '一次件供应商',
    i18n: 'YICIJIANGONGYINGSHANG',
    align: 'center',
    minWidth: 150,
    emit: 'handleClickFsupplierName',
    customRender: (h, scope) => {
      return <span class="link">{scope.row.supplierName}</span>
    }
  }, {
    prop: 'toBeSubmitAmount',
    label: '待发起凭证',
    i18n: 'DAIFAQIPINZHENG',
    align: 'center',
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('DAIFAQIPINZHENG', '待发起凭证')} tip={language(
        'BUCHAJINEJIESUANZHONGSHANGWEIFAQIPINZHENGDEJINE',
        '补差金额（结算）中尚未发起凭证的金额'
      )}></tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.toBeSubmitAmount)}</span>
    }
  }, {
    prop: 'balanceAmount',
    label: '已发起凭证',
    i18n: 'YIFAQIPINZHENG',
    align: 'center',
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('YIFAQIPINZHENG', '已发起凭证')} tip={language(
        'BUCHAJINEJIESUANZHONGYIFAQIDEPINZHENGJINEZONGHE',
        '补差金额（结算）中已发起的凭证金额总和'
      )}></tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.balanceAmount)}</span>
    }
  }, {
    prop: 'actualMakeAmount',
    label: '实际补差金额',
    i18n: 'SHIJIBUCHAJINE',
    align: 'center',
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('SHIJIBUCHAJINE', '实际补差金额')}>
        <div slot="tip">
          <p>
            {
              language(
                'YIFAQIPINGZHENGZHONGSHIJIXIANGGONGYINGSHANGBUCHADEJINE',
                '已发起凭证中实际向供应商补差的金额；'
              )
            }
          </p>
          <p>
            {
              language(
                'SHIJIBUCHAJINEDAIQUERENJINEYIQUERENJINEYIPIZHUNJINEYIZHIFUJINE',
                '实际补差金额=待确认金额+已确认金额+ 已批准金额+已支付金额'
              )
            }
          </p>
        </div>
      </tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.actualMakeAmount)}</span>
    }
  }, {
    prop: 'confirmingAmount',
    label: '待确认金额',
    i18n: 'DAIQUERENJINE',
    align: 'center',
    tooltip: true,
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('DAIQUERENJINE', '待确认金额')}>
        <div slot="tip">
          <p>
            {
              language(
                'CAIGONGYUANFAQIBUCHAPINZHENGZHONGGONGYINGSHANGSHANGWEIQUERENDEJINE',
                '采购员发起补差凭证中供应商尚未确认的金额'
              )
            }
          </p>
          <p>
            {
              language(
                'CAOGAOGONGYINGSHANGQUERENZHONGJINE',
                '（草稿+供应商确认中金额）'
              )
            }
          </p>
        </div>
      </tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.confirmingAmount)}</span>
    }
  },
  {
    prop: 'confirmedAmount',
    label: '已确认金额',
    i18n: 'YIQUERENJINE',
    align: 'center',
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('YIQUERENJINE', '已确认金额')}>
        <div slot="tip">
          <p>
            {
              language(
                'GONGYINGSHANGYIQUERENDEBUCHAPINZHENG',
                '供应商已确认的补差凭证'
              )
            }
          </p>
          <p>
            {
              language(
                'JINEZONGHESHENPIZHONGJINE',
                '金额总和（审批中金额）'
              )
            }
          </p>
        </div>
      </tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.confirmedAmount)}</span>
    }
  },
  {
    prop: 'approvedAmount',
    label: '已批准金额',
    i18n: 'YIPIZHENGJINE',
    align: 'center',
    tooltip: true,
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('YIPIZHENGJINE', '已批准金额')} tip={language(
        'BUCHAPINZHENGSHENPITONGUOJINESHENPITONGGUOJINE',
        '补差凭证审批通过金额（审批通过金额）'
      )}></tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.approvedAmount)}</span>
    }
  },
  {
    prop: 'payedAmount',
    label: '已支付金额',
    i18n: 'YIZHIFUJINE',
    align: 'center',
    minWidth: 100,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('YIZHIFUJINE', '已支付金额')} tip={language(
        'BUCHAPINZHENGYIZHIFUJINE',
        '补差凭证已支付金额'
      )}></tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.payedAmount)}</span>
    }
  },
]
// 散件供应商
export const tableTitle2 = [
  {
    type: 'index',
    label: '#',
  }, {
    prop: 'supplierName',
    label: '一次件供应商',
    i18n: 'YICIJIANGONGYINGSHANG',
    align: 'center',
    minWidth: 150,
    emit: 'handleClickFsupplierName',
    customRender: (h, scope) => {
      return <span class="link">{scope.row.supplierName}</span>
    }
  }, {
    prop: 'toBeSubmitAmount',
    label: '待发起凭证',
    i18n: 'DAIFAQIPINZHENG',
    align: 'center',
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('DAIFAQIPINZHENG', '待发起凭证')} tip={language(
        'BUCHAJINEJIESUANZHONGSHANGWEIFAQIPINZHENGDEJINE',
        '补差金额（结算）中尚未发起凭证的金额'
      )}></tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.toBeSubmitAmount)}</span>
    }
  }, {
    prop: 'balanceAmount',
    label: '已发起凭证',
    i18n: 'YIFAQIPINZHENG',
    align: 'center',
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('YIFAQIPINZHENG', '已发起凭证')} tip={language(
        'BUCHAJINEJIESUANZHONGYIFAQIDEPINZHENGJINEZONGHE',
        '补差金额（结算）中已发起的凭证金额总和'
      )}></tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.balanceAmount)}</span>
    }
  }, {
    prop: 'actualMakeAmount',
    label: '实际补差金额',
    i18n: 'SHIJIBUCHAJINE',
    align: 'center',
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('SHIJIBUCHAJINE', '实际补差金额')}>
        <div slot="tip">
          <p>
            {
              language(
                'YIFAQIPINGZHENGZHONGSHIJIXIANGGONGYINGSHANGBUCHADEJINE',
                '已发起凭证中实际向供应商补差的金额；'
              )
            }
          </p>
          <p>
            {
              language(
                'SHIJIBUCHAJINEDAIQUERENJINEYIQUERENJINEYIPIZHUNJINEYIZHIFUJINE',
                '实际补差金额=待确认金额+已确认金额+ 已批准金额+已支付金额'
              )
            }
          </p>
        </div>
      </tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.actualMakeAmount)}</span>
    }
  }, {
    prop: 'confirmingAmount',
    label: '待确认金额',
    i18n: 'DAIQUERENJINE',
    align: 'center',
    tooltip: true,
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('DAIQUERENJINE', '待确认金额')}>
        <div slot="tip">
          <p>
            {
              language(
                'CAIGONGYUANFAQIBUCHAPINZHENGZHONGGONGYINGSHANGSHANGWEIQUERENDEJINE',
                '采购员发起补差凭证中供应商尚未确认的金额'
              )
            }
          </p>
          <p>
            {
              language(
                'CAOGAOGONGYINGSHANGQUERENZHONGJINE',
                '（草稿+供应商确认中金额）'
              )
            }
          </p>
        </div>
      </tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.confirmingAmount)}</span>
    }
  },
  {
    prop: 'confirmedAmount',
    label: '已确认金额',
    i18n: 'YIQUERENJINE',
    align: 'center',
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('YIQUERENJINE', '已确认金额')}>
        <div slot="tip">
          <p>
            {
              language(
                'GONGYINGSHANGYIQUERENDEBUCHAPINZHENG',
                '供应商已确认的补差凭证'
              )
            }
          </p>
          <p>
            {
              language(
                'JINEZONGHESHENPIZHONGJINE',
                '金额总和（审批中金额）'
              )
            }
          </p>
        </div>
      </tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.confirmedAmount)}</span>
    }
  },
  {
    prop: 'approvedAmount',
    label: '已批准金额',
    i18n: 'YIPIZHENGJINE',
    align: 'center',
    tooltip: true,
    minWidth: 150,
    headerRender: (h) => {
      return <tooltip effect="light" placement="top" content={language('YIPIZHENGJINE', '已批准金额')} tip={language(
        'BUCHAPINZHENGSHENPITONGUOJINESHENPITONGGUOJINE',
        '补差凭证审批通过金额（审批通过金额）'
      )}></tooltip>
    },
    customRender: (h, scope) => {
      return <span>{VueUtil.formatNumber(scope.row.approvedAmount)}</span>
    }
  },
]
// 供应商详情弹框查询-总览
export const searchFormData1Overview = [
  // {
  //   props: 'secondSupplier', name: '二次件供应商', key: 'ERCIJIANGONGYINGSHANG', type: 'input', selectOption: 'sSupplierDropDownData', optionLabel: 'message',
  //   optionValue: 'code', disabled:true
  // },
  { props: 'compDate', name: '补差时间段', key: 'BUCHASHIJIANDUAN', type: 'daterange' },
  // {
  //   props: 'departmentCode', name: '科室', key: 'KESHI', type: 'select', selectOption: 'departmentDropDownData', optionLabel: 'departNameEn',
  //   optionValue: 'departId'
  // },
  // {
  //   props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN', type: 'select', selectOption: 'linieDropDownData', optionLabel: 'message',
  //   optionValue: 'code'
  // },
  { props: 'agreementNo', name: '采购框架号', key: '采购框架号', type: 'input' }, // 字段待调整
  { props: 'primaryPartNum', name: '一次件零件号', key: 'YICIJIANLINGJIANHAO', type: 'iMultiLineInput' },
  { props: 'secondPartNum', name: '二次件零件号', key: 'ERCIJIANLINGJIANHAO', type: 'iMultiLineInput' },
]

// 供应商详情弹框查询
export const searchFormData1 = [
  // {
  //   props: 'secondSupplier', name: '二次件供应商', key: 'ERCIJIANGONGYINGSHANG', type: 'input', selectOption: 'sSupplierDropDownData', optionLabel: 'message',
  //   optionValue: 'code', disabled:true
  // },
  { props: 'compDate', name: '补差时间段', key: 'BUCHASHIJIANDUAN', type: 'daterange' },
  {
    props: 'departmentCode', name: '科室', key: 'KESHI', type: 'select', selectOption: 'departmentDropDownData', optionLabel: 'departNameEn',
    optionValue: 'departId'
  },
  {
    props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN', type: 'select', selectOption: 'linieDropDownData', optionLabel: 'message',
    optionValue: 'code'
  },
  { props: 'agreementNo', name: '采购框架号', key: '采购框架号', type: 'input' }, // 字段待调整
  { props: 'primaryPartNum', name: '一次件零件号', key: 'YICIJIANLINGJIANHAO', type: 'iMultiLineInput' },
  { props: 'secondPartNum', name: '二次件零件号', key: 'ERCIJIANLINGJIANHAO', type: 'iMultiLineInput' },
]

// 供应商详情弹框查询-散件总览
export const searchFormData2 = [
  { props: 'primaryPartNum', name: '零件号', key: 'LINGJIANHAO', type: 'iMultiLineInput' },
  { props: 'compDate', name: '补差时间段', key: 'BUCHASHIJIANDUAN', type: 'daterange' },
  {
    props: 'departmentCode', name: '科室', key: 'KESHI', type: 'select', selectOption: 'departmentDropDownData', optionLabel: 'departNameEn',
    optionValue: 'departId'
  },
  {
    props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN', type: 'select', selectOption: 'linieDropDownData', optionLabel: 'message',
    optionValue: 'code'
  },
  { props: 'agreementNo', name: '采购框架号', key: '采购框架号', type: 'input' }, // 字段待调整
]

// 一次件供应商详情弹框总览列表
export const tableTitle1Overview = [
  { props: 'primaryPartNum', name: '一次件零件号', key: 'YCJLJH', width: 150 },
  {
    props: 'primaryPartName',
    name: '一次件零件名称',
    key: 'YCJLJMC',
    width: 150
  },
  { props: 'secondPartNum', name: '二次件零件号', key: 'ECJLJH', width: 150 },
  {
    props: 'secondPartName',
    name: '二次件零件名称',
    key: 'ECJLJMC',
    width: 150
  },
  {
    props: 'secondSupplierName',
    name: '二次件供应商',
    key: 'ERCIJIANGONGYINGSHANG',
    width: 220,
  },
  // { props: 'departmentName', name: '科室', key: 'KESHI', width: 100 },
  // { props: 'ekName', name: '采购员', key: 'CAIGOUYUAN', width: 100 },
  {
    props: 'balanceAmount',
    name: '已发起凭证',
    key: 'YFQPZ',
    width: 120,
  },
  {
    props: 'actualMakeAmount', name: '实际补差金额', key: 'SJBCJE', width: 120,
  },
  {
    props: 'confirmingAmount', name: '待确认金额', key: 'DQRJE', width: 120,
  },
  {
    props: 'confirmedAmount', name: '已确认金额', key: 'YQRJE', width: 120,
  },
  {
    props: 'approvedAmount', name: '已批准金额', key: 'YPZJE', width: 120,
  },
  {
    props: 'payedAmount', name: '已支付金额', key: 'YZFJE', width: 120,
  },
]

// 供应商详情弹框明细列表
export const tableTitle1Detail = [
  { props: 'primaryPartNum', name: '一次件零件号', key: 'YCJLJH', width: 150 },
  {
    props: 'primarySupplierName',
    name: '一次件供应商',
    key: 'YICIJIANGONGYINGSHANG',
    align: 'center',
    minWidth: 150,
  }, {
    props: 'materialName',
    name: '原材料描述',
    key: '原材料描述',
    align: 'center',
    width: 150
  },
  { props: 'secondPartNum', name: '二次件零件号', key: 'ECJLJH', width: 150 },
  {
    props: 'secondSupplierName',
    name: '二次件供应商',
    key: 'ERCIJIANGONGYINGSHANG',
    width: 220
  },
  {
    props: 'secondPrimaryRatio',
    name: '二次件与一次件比例',
    width: '100px',
    align: 'center',
    key: '二次件与一次件比例',
    width: 150
  }, {
    props: 'ruleNo',
    name: '规则编号',
    key: 'GUIZEBIANHAO',
    align: 'center',
    width: 150
  }, {
    props: 'agreementNo',
    name: '采购框架',
    key: '采购框架',
    align: 'center',
    width: 150
  },
  {
    props: 'makeAmount',
    name: '补差金额',
    width: '100px',
    align: 'center',
    key: '补差金额',
    width: 150
  },
  {
    props: 'currency',
    name: '货币',
    align: 'center',
    key: 'HUOBI',
    width: 150
  },
  { props: 'exchangeRate', name: '汇率', align: 'center', key: 'HUILV' },
  { props: 'invoiceQuantity', name: '结算数量', key: '结算数量', width: 150 },
  { props: 'requestAmount', name: '应补金额', key: '应补金额', width: 150 },
  { props: 'actualMakeAmount', name: '实补金额', key: '实补金额', width: 150 },
  { props: 'balanceNo', name: '补差单编号', key: '补差单编号', width: 150 },
  { props: 'departmentCode', name: '科室', key: 'KESHI', width: 150 },
  { props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN', width: 150 },
]

// 散件供应商详情弹框总览列表
export const tableTitle2Overview = [
  { props: 'primaryPartNum', name: '零件号', key: 'LINGJIANHAO', width: 120 },
  {
    props: 'primaryPartName',
    name: '零件名称',
    key: 'LINGJIANMINGCHENG',
    width: 150
  },
  {
    props: 'supplierName',
    name: '供应商',
    key: 'GONGYINGSHANG',
    width: 220
  },
  // { props: 'departmentName', name: '科室', key: 'KESHI', width: 120 },
  // { props: 'ekName', name: '采购员', key: 'CAIGOUYUAN', width: 120 },
  {
    props: 'balanceAmount',
    name: '已发起凭证',
    key: 'YFQPZ',
    width: 150
  },
  { props: 'actualMakeAmount', name: '实际补差金额', key: 'SJBCJE', width: 150 },
  { props: 'confirmingAmount', name: '待确认金额', key: 'DQRJE', width: 150 },
  { props: 'confirmedAmount', name: '已确认金额', key: 'YQRJE', width: 150 },
  { props: 'approvedAmount', name: '已批准金额', key: 'YPZJE', width: 150 },
]
