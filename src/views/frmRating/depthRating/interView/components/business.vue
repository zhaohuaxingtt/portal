<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:业务上下游
 -->
<template>
  <div>
    <!-- 集团、股东、实际控制人（详见股权结构图） -->
    <iCard :title="$t('SPR_FRM_DEP_ZYCPJZBCPGY')"
           collapse
           class="margin-top20">
      <template slot="header">
        <div class="flex-end-center"
             style="width:100%">
          <iButton @click="addProdProp">{{language('XINZENG','新增')}}</iButton>
          <iButton @click="delProdProp">{{language('SHANCHU','删除')}}</iButton>
        </div>
      </template>
      <tableList :tableData="interViewData.prodPropList"
                 :tableTitle="mainProduct"
                 :tableLoading="tableLoading"
                 :index="true"
                 ref="table1"
                 :input-props="inputProduct"
                 @handleSelectionChange="handleSelectionProduct">
      </tableList>
      <!-- 主要业务模式和加工深度务 -->
      <div class="title">{{$t('SPR_FRM_DEP_ZYYWMSHJGSD')}}</div>
      <iInput type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_INPUT')"
              v-model='interViewData.mainBusinessProcessingDepth'></iInput>
      <!-- 设备投资、原材料、进出口业务 -->
      <div class="title">{{$t('SPR_FRM_DEP_SBTZYCLJCKYW')}}</div>
      <iInput type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_INPUT')"
              v-model='interViewData.business'></iInput>
      <!-- 会议纪要 -->
      <div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
      <iInput type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_INPUT')"
              v-model='interViewData.productsProportionMeeting'></iInput>
    </iCard>
    <!-- 主要客户 -->
    <iCard title='主要客户'
           collapse
           class="margin-top20">
      <template slot="header">
        <div class="flex-end-center"
             style="width:100%">
          <iButton @click="addCustomer">{{language('XINZENG','新增')}}</iButton>
          <iButton @click="delCustomer">{{language('SHANCHU','删除')}}</iButton>
        </div>
      </template>
      <tableList :tableData="interViewData.customerList"
                 :tableTitle="mainCustomers"
                 :tableLoading="tableLoading"
                 :index="true"
                 ref="table2"
                 :input-props="inputCustomers"
                 @handleSelectionChange="handleSelectionCustomers">
      </tableList>
      <!-- 会议纪要 -->
      <div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
      <iInput type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_INPUT')"
              v-model='interViewData.customersMeetingMinutes'></iInput>
    </iCard>
    <!-- SVW业务情况 -->
    <iCard :title="$t('SPR_FRM_DEP_SVWYWQK')"
           collapse
           class="margin-top20">
      <!-- 合作时间 -->
      <div class="flex-align-center cooperation">
        <span>{{$t('SPR_FRM_DEP_HZSJ')}}</span>
        <iInput :placeholder="$t('SPR_FRM_DEP_INPUT')"
                v-model='interViewData.cooperationTime'></iInput>
      </div>
      <!-- 供货产品 -->
      <div class="title">{{$t('SUPPLIER_GONGHUOCHANPIN')}}</div>
      <iInput type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_INPUT')"
              v-model='interViewData.supplyProduct'></iInput>
      <!-- 过去，现在及未来的项目情况 -->
      <div class="title">{{$t('SPR_FRM_DEP_GQXZJWLDXMQK')}}</div>
      <iInput type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_INPUT')"
              v-model='interViewData.projectSituation'></iInput>
      <!-- 会议纪要 -->
      <div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
      <iInput type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_INPUT')"
              v-model='interViewData.svwBusinessSituationMeetingMinutes'></iInput>
    </iCard>
    <!-- 业务发展及投资 -->
    <iCard :title="$t('SPR_FRM_DEP_YWFZJTZ')"
           collapse
           class="margin-top20">
      <iInput v-model='interViewData.businessDevelopmentInvestment'
              type='textarea'
              :autosize='rowRange'
              placeholder='当年销售预测、未来三年销售预测（关联数据：营业收入）、固定资产投入（关联数据：固定资产、在建工程、无形资产、长期待摊费用、购建固定资产、无形资产和其他长期资产支付的现金）、投资与业务情况比较…'></iInput>
    </iCard>
    <!-- 主要供应商 -->
    <iCard :title="$t('SPR_FRM_DEP_ZYGYS')"
           collapse
           class="margin-top20">
      <template slot="header">
        <div class="flex-end-center"
             style="width:100%">
          <iButton @click="addSupplier">{{language('XINZENG','新增')}}</iButton>
          <iButton @click="delSupplier">{{language('SHANCHU','删除')}}</iButton>
        </div>
      </template>
      <tableList :tableData="interViewData.supplierList"
                 :tableTitle="mainSupplier"
                 :tableLoading="tableLoading"
                 :index="true"
                 ref="table3"
                 :input-props="inputSupplier"
                 @handleSelectionChange="handleSelectionSupplier">
      </tableList>
      <!-- 会议纪要 -->
      <div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
      <iInput v-model='interViewData.supplierMeetingMinutes'
              type='textarea'
              :autosize='rowRange'
              placeholder='是否进口、是否强势（关联指标：预付账款）…'></iInput>
    </iCard>
    <!-- 产能情况 -->
    <iCard :title="$t('SPR_FRM_DEP_CNQK')"
           collapse
           class="margin-top20">
      <iInput v-model='interViewData.productionCapacity'
              type='textarea'
              :autosize='rowRange'
              placeholder='计划产能、实际产能、已使用产能（开工率）…'></iInput>
    </iCard>
    <!-- 业务&上下游-补充 -->
    <iCard :title="$t('SPR_FRM_DEP_YWSXYBC')"
           collapse
           class="margin-top20">
      <iInput v-model='interViewData.upDownSupplement'
              type='textarea'
              :autosize='rowRange'
              placeholder='模具、土地租用/自有（关联数据：无形资产）…'></iInput>
    </iCard>
  </div>
</template>

<script>
import { iCard, iInput, iButton } from 'rise';
import tableList from '@/components/commonTable';
import { mainProduct, mainCustomers, mainSupplier } from '../data';
import { interviewUpDownMessage, interviewUpDownInfo } from '@/api/frmRating/depthRating/interView';
import resultMessageMixin from '@/mixins/resultMessageMixin';
export default {
  mixins: [resultMessageMixin],
  components: { iCard, iInput, tableList, iButton },
  data () {
    return {
      rowRange: { minRows: 3, maxRows: 6 },
      mainProduct,
      mainCustomers,
      mainSupplier,
      tableLoading: false,
      interViewData: {},
      selectProps: [],
      inputProduct: [],
      inputCustomers: [],
      inputSupplier: [],
      selectionProduct: [],
      selectionCustomers: [],
      selectionSupplier: []
    }
  },
  props: {
    id: { type: String }
  },
  created () {
    this.getData()
    this.setInputProps()
  },
  methods: {
    // 获取获取访谈清单
    setInputProps () {
      this.inputProduct = []
      this.inputCustomers = []
      this.inputSupplier = []
      this.mainProduct.map(item => {
        if (!this.selectProps.includes(item.props)) {
          this.inputProduct.push(item.props)
        }
      })
      this.mainCustomers.map(item => {
        if (!this.selectProps.includes(item.props)) {
          this.inputCustomers.push(item.props)
        }
      })
      this.mainSupplier.map(item => {
        if (!this.selectProps.includes(item.props)) {
          this.inputSupplier.push(item.props)
        }
      })
    },
    getData () {
      interviewUpDownMessage({ deepCommentSupplierId: this.id }).then(res => {
        if (res.data) {
          this.interViewData = res.data
          if (!this.interViewData.prodPropList) {
            this.interViewData.prodPropList = []
          }
          if (!this.interViewData.customerList) {
            this.interViewData.customerList = []
          }
          if (!this.interViewData.supplierList) {
            this.interViewData.supplierList = []
          }

        }
      })
    },
    // 保存
    save () {
      this.interViewData.deepCommentSupplierId = this.id
      interviewUpDownInfo(this.interViewData).then(res => {
        this.resultMessage(res, () => {
          this.getData()
        })
      })
    },
    addProdProp () {
      let obj = {}
      let arr = this.mainProduct.map(item => item.props)
      for (let key in arr) { //这里key索引
        obj[arr[key]] = ""
      }
      let rand = Math.random()
      obj.addId = Math.round(rand * 999)
      this.interViewData.prodPropList.push(obj)
    },
    delProdProp () {
      for (let i = 0; i < this.selectionProduct.length; i++) {
        let val = this.selectionProduct
        val.forEach((val, index) => {
          if (val.id) {
            this.interViewData.prodPropList.forEach((v, i) => {
              if (val.id === v.id) {
                this.interViewData.prodPropList.splice(i, 1)
              }
            })
          } else {
            this.interViewData.prodPropList.forEach((v, i) => {
              if (val.addId === v.addId) {
                this.interViewData.prodPropList.splice(i, 1)
              }
            })
          }
        })
      }
    },
    addCustomer () {
      let obj = {}
      let arr = this.mainCustomers.map(item => item.props)
      for (let key in arr) { //这里key索引
        obj[arr[key]] = ""
      }
      let rand = Math.random()
      obj.addId = Math.round(rand * 999)
      this.interViewData.customerList.push(obj)
    },
    delCustomer () {
      for (let i = 0; i < this.selectionCustomers.length; i++) {
        let val = this.selectionCustomers
        val.forEach((val, index) => {
          if (val.id) {
            this.interViewData.customerList.forEach((v, i) => {
              if (val.id === v.id) {
                this.interViewData.customerList.splice(i, 1)
              }
            })
          } else {
            this.interViewData.customerList.forEach((v, i) => {
              if (val.addId === v.addId) {
                this.interViewData.customerList.splice(i, 1)
              }
            })
          }
        })
      }
    },
    addSupplier () {
      let obj = {}
      let arr = this.mainSupplier.map(item => item.props)
      for (let key in arr) { //这里key索引
        obj[arr[key]] = ""
      }
      let rand = Math.random()
      obj.addId = Math.round(rand * 999)
      this.interViewData.supplierList.push(obj)
    },
    delSupplier () {
      for (let i = 0; i < this.selectionSupplier.length; i++) {
        let val = this.selectionSupplier
        val.forEach((val, index) => {
          if (val.id) {
            this.interViewData.supplierList.forEach((v, i) => {
              if (val.id === v.id) {
                this.interViewData.supplierList.splice(i, 1)
              }
            })
          } else {
            this.interViewData.supplierList.forEach((v, i) => {
              if (val.addId === v.addId) {
                this.interViewData.supplierList.splice(i, 1)
              }
            })
          }
        })
      }
    },
    handleSelectionProduct (val) {
      this.selectionProduct = val
    },
    handleSelectionCustomers (val) {
      this.selectionCustomers = val
    },
    handleSelectionSupplier (val) {
      this.selectionSupplier = val
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.title {
  font-weight: bold;
  font-size: 16px;
  color: $color-black;
  margin: 20px 0;
}
.cooperation {
  > span {
    width: 115px;
    font-weight: bold;
    font-size: 16px;
    color: $color-black;
  }
}
</style>
