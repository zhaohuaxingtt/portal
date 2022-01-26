<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:财务
 -->
<template>
  <div>
    <!-- 盈利能力 -->
    <iCard :title="$t('SPR_FRM_DEP_YLNL')"
           collapse
           class="margin-top20">
      <iInput v-model='interViewData.profitability'
              type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_YLNLPLACE')"></iInput>
    </iCard>
    <!-- 营运能力 -->
    <iCard :title="$t('SPR_FRM_DEP_YYNL')"
           collapse
           class="margin-top20">
      <iInput v-model='interViewData.operatingCapacity'
              type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_YYNLPLACE')"></iInput>
    </iCard>
    <!-- 偿债能力 -->
    <iCard :title="$t('SPR_FRM_DEP_CZNL')"
           collapse
           class="margin-top20">
      <iInput v-model='interViewData.solvency'
              type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_CZNLPLACE')"></iInput>
    </iCard>
    <!-- 资金与融资渠道 -->
    <iCard :title="$t('SPR_FRM_DEP_ZJYRZQD')"
           collapse
           class="margin-top20">
      <template slot="header">
        <div class="flex-end-center"
             style="width:100%">
          <iButton @click="add">{{language('XINZENG','新增')}}</iButton>
          <iButton @click="del">{{language('SHANCHU','删除')}}</iButton>
        </div>
      </template>
      <tableList :tableData="interViewData.bankList"
                 :tableTitle="tableTitle"
                 :tableLoading="tableLoading"
                 :index="true"
                 :input-props="inputProps"
                 @handleSelectionChange="handleSelectionChange">
        <template slot-scope="scope"
                  slot="creditAmount">
          <div>
            <el-input-number v-model="scope.row.creditAmount"
                             :controls="false"
                             :precision="2"
                             :step="0.1"></el-input-number>
          </div>
        </template>
        <template slot-scope="scope"
                  slot="creditDateStart">
          <div>
            <el-date-picker v-model="scope.row.creditDateStart"
                            align="right"
                            type="date"
                            style="width:100%"
                            :placeholder="language('QINGXUANZE','请选择')">
            </el-date-picker>
          </div>
        </template>
        <template slot-scope="scope"
                  slot="interestRate">
          <div>
            <el-input-number v-model="scope.row.interestRate"
                             :controls="false"
                             :precision="2"
                             :step="0.1"></el-input-number>
          </div>
        </template>
      </tableList>
      <div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
      <iInput v-model="interViewData.capitalMinutesMeeting"
              type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_HYJYPLACE')"></iInput>
    </iCard>
    <!-- 财务补充 -->
    <iCard :title="$t('SPR_FRM_DEP_CWBC')"
           collapse
           class="margin-top20">
      <iInput v-model='interViewData.financialSupplement'
              type='textarea'
              :autosize='rowRange'
              :placeholder="$t('SPR_FRM_DEP_CWBCPLACE')"></iInput>
    </iCard>
  </div>
</template>

<script>
import { iCard, iInput, iButton } from 'rise';
import tableList from '@/components/commonTable';
import { CapitalFinancing } from '../data';
import { interviewFinanceMessage, interviewFinanceInfo } from '@/api/frmRating/depthRating/interView';
import resultMessageMixin from '@/mixins/resultMessageMixin';
export default {
  mixins: [resultMessageMixin],
  components: { iCard, iInput, tableList, iButton },
  props: {
    id: { type: String }
  },
  data () {
    return {
      rowRange: { minRows: 3, maxRows: 6 },
      tableTitle: CapitalFinancing,
      tableLoading: false,
      interViewData: {},
      inputProps: [],
      selectProps: [],
      selectList: []
    }
  },
  created () {
    this.getData()
    this.setInputProps()
  },
  methods: {
    // 获取获取访谈清单
    setInputProps () {
      this.inputProps = []
      this.tableTitle.map(item => {
        if (item.props !== 'creditAmount' && item.props !== 'interestRate' && item.props !== 'creditDateStart') {
          this.inputProps.push(item.props)
        }
      })
    },
    getData () {
      this.tableLoading = true
      interviewFinanceMessage({ deepCommentSupplierId: this.id }).then(res => {
        if (res.data) {
          this.interViewData = res.data
          if (!this.interViewData.bankList) {
            this.interViewData.bankList = []
          }
          this.tableLoading = false
        }
      })
    },
    // 保存
    save () {
      this.interViewData.deepCommentSupplierId = this.id
      interviewFinanceInfo(this.interViewData).then(res => {
        this.resultMessage(res, () => {
          this.getData()
        })
      })
    },
    add () {
      let obj = {}
      let arr = this.tableTitle.map(item => item.props)
      for (let key in arr) { //这里key索引
        obj[arr[key]] = ""
      }
      let rand = Math.random()
      obj.addId = Math.round(rand * 999)
      this.interViewData.bankList.push(obj)
    },
    edit () {

    },
    del () {
      for (let i = 0; i < this.selectList.length; i++) {
        let val = this.selectList
        val.forEach((val, index) => {
          if (val.id) {
            this.interViewData.bankList.forEach((v, i) => {
              if (val.id === v.id) {
                this.interViewData.bankList.splice(i, 1)
              }
            })
          } else {
            this.interViewData.bankList.forEach((v, i) => {
              if (val.addId === v.addId) {
                this.interViewData.bankList.splice(i, 1)
              }
            })
          }
        })
      }
    },
    handleSelectionChange (val) {
      this.selectList = val

    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.title {
  font-weight: bold;
  font-size: 18px;
  color: $color-black;
  margin: 20px 0;
}
</style>
<style lang="scss">
.el-table .el-table__row .el-input {
  width: 100px !important;
}
</style>
