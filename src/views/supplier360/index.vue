<!--
 * @Author: your name
 * @Date: 2021-04-13 14:54:11
 * @LastEditTime: 2023-01-09 12:32:55
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\supplier360\index.vue
-->
<template>
  <div class="height100">
    <navigation-bar @changeCurrent="changeCurrent"
                    :current="current"
                    :list="supplierTabList"
                    class="margin-bottom20" />
    <div class="height100 mainContent pb">
      <div v-for="item of supplierTabList"
           :key="item.current">
        <component v-if="current == item.current"
                   :is="item.component"
                   :ref="item.ref" />
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from '@/components/navigationBar'
import baseInfo from '../generalPage/baseInfo'
import history from '../generalPage/history'
import frm from '../generalPage/frm'
import factory from '../generalPage/factory'
import bank from '../generalPage/bank'
import company from '../generalPage/company'
import governance from '../generalPage/governance'
import businessProducts from '../generalPage/businessProducts'
import customer from '../generalPage/customer'
import mainSubSuppliersAndProductNames from '@/views/generalPage/mainSubSuppliersAndProductNames'
import historicalCooperationRecord from '@/views/generalPage/historicalCooperationRecord'
import majorIssues from '@/views/generalPage/majorIssues'
import contactsAndUsers from '@/views/generalPage/contactsAndUsers'
import relevantAttachments from '@/views/generalPage/relevantAttachments'

import purchaseClassification from "../generalPage/purchaseClassification"

import materialGroup from '@/views/generalPage/materialGroup'
import systemModificationHistory from '@/views/generalPage/systemModificationHistory'
import financialBigNumbers from '@/views/generalPage/financialBigNumbers'
import financialData from '@/views/generalPage/financialData'
import supplyCompany from '@/views/generalPage/supplyCompany'
import clauseSignRecord from '@/views/generalPage/clauseSignRecord'
// import relatedTasks from '@/views/generalPage/relatedTasks'
import approvalRecords from '@/views/generalPage/approvalRecords'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    navigationBar,
    baseInfo,
    history,
    frm,
    factory,
    bank,
    company,
    governance,
    businessProducts,
    customer,
    mainSubSuppliersAndProductNames,
    historicalCooperationRecord,
    majorIssues,
    contactsAndUsers,
    relevantAttachments,
    materialGroup,
    systemModificationHistory,
    financialBigNumbers,
    financialData,
    supplyCompany,
    purchaseClassification,
    clauseSignRecord,
    // relatedTasks,
    approvalRecords
  },
  data () {
    return {
      current: 1,
      list: [
        {
          current: '1',
          title: '基本信息',
          ref: 'baseInfo',
          component: 'baseInfo',
          key: 'SUPPLIER_JIBENXINXI',
          permission: 'SUPPLIER_BASEINFO'
        },
        {
          current: '2',
          title: '历史沿革',
          ref: 'history',
          component: 'history',
          key: 'SUPPLIER_LISHIYANGE',
          permission: 'SUPPLIER_ENTERPRISEHISTORY'
        },
        {
          current: '3',
          title: 'FRM评级',
          ref: 'frm',
          component: 'frm',
          key: 'SUPPLIER_FRMPINGJI',
          permission: 'SUPPLIER_FRM'
        },
        {
          current: '4',
          title: '工厂信息',
          ref: 'factory',
          component: 'factory',
          key: 'SUPPLIER_GONGCHANGXINXI',
          permission: 'SUPPLIER_FACTORY'
        },
        {
          current: '5',
          title: '授信银行信息',
          ref: 'bank',
          component: 'bank',
          key: 'SUPPLIER_SHOUXINYINHANGXINXIN',
          permission: 'SUPPLIER_BAKN'
        },
        {
          current: '6',
          title: '股东、集团与关联公司',
          ref: 'company',
          component: 'company',
          key: 'SUPPLIER_GUDONGJITUANYUGUANLIANGONGSI',
          permission: 'SUPPLIER_COMPANY_'
        },
        {
          current: '7',
          title: '人员及公司治理情况',
          ref: 'governance',
          component: 'governance',
          key: 'SUPPLIER_RENYUANJIGONGSIZHILIQINGKUANG',
          permission: 'SUPPLIER_GOVERNANCE'
        },
        {
          current: '8',
          title: '主要业务及产品',
          ref: 'businessProducts',
          component: 'businessProducts',
          key: 'SUPPLIER_ZHUYAOYEWUJICHANPIN',
          permission: 'SUPPLIER_MAINPRODUCT'
        },
        {
          current: '9',
          title: '主要客户',
          ref: 'customer',
          component: 'customer',
          key: 'SUPPLIER_ZHUYAOKEHU',
          permission: 'SUPPLIER_NAMEOFCUSTOMERS'
        },
        {
          current: '10',
          title: '主要分供方名称及产品',
          ref: 'mainSubSuppliersAndProductNames',
          component: 'mainSubSuppliersAndProductNames',
          key: 'SUPPLIER_ZHUYAOFANGGONGFANGMINGCHENGJICHANPIN',
          permission: 'SUPPLIER_SUBSUPPLIERANDPRODUCT'
        },
        {
          current: '11',
          title: '历年合作记录',
          ref: 'historicalCooperationRecord',
          component: 'historicalCooperationRecord',
          key: 'SUPPLIER_LISHIHEZUOJILU',
          permission: 'SUPPLIER_HISTORY'
        },
        {
          current: '12',
          title: '重大事项',
          ref: 'majorIssues',
          component: 'majorIssues',
          key: 'SUPPLIER_ZHONGDASHIXIANG',
          permission: 'SUPPLIER_SIGNIFICANTEVENTS'
        },
        {
          current: '13',
          title: '联系人与用户',
          ref: 'contactsAndUsers',
          component: 'contactsAndUsers',
          key: 'SUPPLIER_LIANXIRENYUYONGHU',
          permission: 'SUPPLIER_SUPPLIERCONTACT'
        },
        {
          current: '14',
          title: '相关附件',
          ref: 'relevantAttachments',
          component: 'relevantAttachments',
          key: 'SUPPLIER_XIANGGUANFUJIAN',
          permission: 'SUPPLIER_RELATEDACCESSORY'
        },
        {
          current: '15',
          title: '材料组',
          ref: 'materialGroup',
          component: 'materialGroup',
          key: 'SUPPLIER_CAILIAOZU',
          permission: 'SUPPLIER_MATERIALGROUP'
        },
        {
          current: '16',
          title: '系统修改历史',
          ref: 'systemModificationHistory',
          component: 'systemModificationHistory',
          key: 'SUPPLIER_XITONGXIUGAILISHI',
          permission: 'SUPPLIER_CHANGEHISTORY'
        },
        {
          current: '17',
          title: '财务大数',
          ref: 'financialBigNumbers',
          component: 'financialBigNumbers',
          key: 'SUPPLIER_CAIWUDASHU',
          permission: 'SUPPLIER_KEYFINANCIALFIGURE'
        },
        {
          current: '18',
          title: '财务数据',
          ref: 'financialData',
          component: 'financialData',
          key: 'SUPPLIER_CAIWUSHUJU',
          permission: 'SUPPLIER_FINANCIALDATA'
        },
        {
          current: '19',
          title: '供货公司',
          ref: 'supplyCompany',
          component: 'supplyCompany',
          key: 'SUPPLIER_GONGHUOGONGSI',
          permission: 'SUPPLIER_SUPPLYCOMPANY'
        },
        {
          current: '20',
          title: '条款签署记录',
          ref: 'clauseSignRecord',
          component: 'clauseSignRecord',
          key: '条款签署记录',
          permission: 'SUPPLIER_SUPPLYCOMPANY'
          // permission: 'SUPPLIER_CLAUSE_SIGN_RECORD'
        },
        // {
        //   current: '21',
        //   title: '相关任务',
        //   ref: 'relatedTasks',
        //   component: 'relatedTasks',
        //   key: '相关任务',
        //   permission: 'SUPPLIER_SUPPLYCOMPANY'
        //   // permission: 'SUPPLIER_RELATED_TASKS'
        // },
        {
          current: '22',
          title: '审批记录',
          ref: 'approvalRecords',
          component: 'approvalRecords',
          key: '审批记录',
          permission: 'SUPPLIER_SUPPLYCOMPANY'
          // permission: 'SUPPLIER_APPROVAL_RECORDS'
        }
      ],
      listGP: [
        {
          current: '1',
          title: '基本信息',
          ref: 'baseInfo',
          component: 'baseInfo',
          key: 'SUPPLIER_JIBENXINXI',
          permission: 'SUPPLIER_BASEINFO_GP'
        },
        {
          current: '2',
          title: '历史沿革',
          ref: 'history',
          component: 'history',
          key: 'SUPPLIER_LISHIYANGE',
          permission: 'SUPPLIER_ENTERPRISEHISTORY_GP'
        },
        {
          current: '3',
          title: 'FRM评级',
          ref: 'frm',
          component: 'frm',
          key: 'SUPPLIER_FRMPINGJI',
          permission: 'SUPPLIER_FRM_GP'
        },
        {
          current: '4',
          title: '授信银行信息',
          ref: 'bank',
          component: 'bank',
          key: 'SUPPLIER_SHOUXINYINHANGXINXIN',
          permission: 'SUPPLIER_BAKN_GP'
        },
        {
          current: '5',
          title: '股东、集团与关联公司',
          ref: 'company',
          component: 'company',
          key: 'SUPPLIER_GUDONGJITUANYUGUANLIANGONGSI',
          permission: 'SUPPLIER_COMPANY_GP'
        },
        {
          current: '6',
          title: '人员及公司治理情况',
          ref: 'governance',
          component: 'governance',
          key: 'SUPPLIER_RENYUANJIGONGSIZHILIQINGKUANG',
          permission: 'SUPPLIER_GOVERNANCE_GP'
        },
        {
          current: '7',
          title: '主要业务及产品',
          ref: 'businessProducts',
          component: 'businessProducts',
          key: 'SUPPLIER_ZHUYAOYEWUJICHANPIN',
          permission: 'SUPPLIER_MAINPRODUCT_GP'
        },
        {
          current: '8',
          title: '主要客户',
          ref: 'customer',
          component: 'customer',
          key: 'SUPPLIER_ZHUYAOKEHU',
          permission: 'SUPPLIER_NAMEOFCUSTOMERS_GP'
        },
        {
          current: '9',
          title: '主要分供方名称及产品',
          ref: 'mainSubSuppliersAndProductNames',
          component: 'mainSubSuppliersAndProductNames',
          key: 'SUPPLIER_ZHUYAOFANGGONGFANGMINGCHENGJICHANPIN',
          permission: 'SUPPLIER_SUBSUPPLIERANDPRODUCT_GP'
        },
        {
          current: '10',
          title: '历年合作记录',
          ref: 'historicalCooperationRecord',
          component: 'historicalCooperationRecord',
          key: 'SUPPLIER_LISHIHEZUOJILU',
          permission: 'SUPPLIER_HISTORY_GP'
        },
        {
          current: '11',
          title: '重大事项',
          ref: 'majorIssues',
          component: 'majorIssues',
          key: 'SUPPLIER_ZHONGDASHIXIANG',
          permission: 'SUPPLIER_SIGNIFICANTEVENTS_GP'
        },
        {
          current: '12',
          title: '联系人与用户',
          ref: 'contactsAndUsers',
          component: 'contactsAndUsers',
          key: 'SUPPLIER_LIANXIRENYUYONGHU',
          permission: 'SUPPLIER_SUPPLIERCONTACT_GP'
        },
        {
          current: '13',
          title: '相关附件',
          ref: 'relevantAttachments',
          component: 'relevantAttachments',
          key: 'SUPPLIER_XIANGGUANFUJIAN',
          permission: 'SUPPLIER_RELATEDACCESSORY_GP'
        },
        {
          current: '14',
          title: '采购分类',
          ref: 'purchaseClassification',
          component: 'purchaseClassification',
          key: 'SUPPLIER_CAIGOUFENLEI',
          permission: 'SUPPLIER_PURCHASE_GP'
        },
        {
          current: '15',
          title: '系统修改历史',
          ref: 'systemModificationHistory',
          component: 'systemModificationHistory',
          key: 'SUPPLIER_XITONGXIUGAILISHI',
          permission: 'SUPPLIER_CHANGEHISTORY_GP'
        },
        {
          current: '16',
          title: '财务大数',
          ref: 'financialBigNumbers',
          component: 'financialBigNumbers',
          key: 'SUPPLIER_CAIWUDASHU',
          permission: 'SUPPLIER_KEYFINANCIALFIGURE_GP'
        },
        {
          current: '17',
          title: '财务数据',
          ref: 'financialData',
          component: 'financialData',
          key: 'SUPPLIER_CAIWUSHUJU',
          permission: 'SUPPLIER_FINANCIALDATA_GP'
        },
        {
          current: '18',
          title: '供货公司',
          ref: 'supplyCompany',
          component: 'supplyCompany',
          key: 'SUPPLIER_GONGHUOGONGSI',
          permission: 'SUPPLIER_SUPPLYCOMPANY_GP'
        },
        {
          current: '19',
          title: '条款签署记录',
          ref: 'clauseSignRecord',
          component: 'clauseSignRecord',
          key: '条款签署记录',
          permission: 'SUPPLIER_CLAUSE_SIGN_RECORD'
        },
        // {
        //   current: '20',
        //   title: '相关任务',
        //   ref: 'relatedTasks',
        //   component: 'relatedTasks',
        //   key: '相关任务',
        //   permission: 'SUPPLIER_RELATED_TASKS'
        // },
        {
          current: '21',
          title: '审批记录',
          ref: 'approvalRecords',
          component: 'approvalRecords',
          key: '审批记录',
          permission: 'SUPPLIER_APPROVAL_RECORDS'
        }
      ],
      refData: [],

    }
  },
  computed: {
    supplierTabList () {
      if(this.$route.query.subSupplierType == "GP"){
        return this.listGP
      }else{
        return this.list
      }
    }
  },
  methods: {
    changeCurrent (index) {
      this.current = index
    },
    getRefNameData () {
      this.refData = this.list.map((item) => {
        return item.ref
      })
    }
  },
  created () {
    this.$store.dispatch('setValiCode', this.$route.query.supplierToken)
    if (this.$route.query.current) {
      this.current = Number(this.$route.query.current)
    }
    this.getRefNameData()
  }
}
</script>

<style scoped lang="scss">
.height100 {
  height: 100%;
}

.mainContent {
  box-sizing: border-box;
  overflow-y: auto;
}

.pbLarge {
  padding-bottom: 190px;
}

.pb {
  padding-bottom: 140px;
}
</style>
