<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:财务分析
 -->
<template>
  <div>
    <!-- 提示信息 -->
    <iCard title="提示信息"
           collapse
           class="margin-top20">
      <iInput :disabled="isDisabled"
              type='textarea'
              :autosize='rowRange'
              placeholder="请输入"
              v-model="info.promptInfo"
              maxlength="120"
              show-word-limit></iInput>
    </iCard>
    <!-- 财报分析 -->
    <iCard title="财报分析"
           collapse
           class="margin-top20">
      <tableList :tableData="info.list"
                 :tableTitle="tableTitle"
                 :tableLoading="tableLoading"
                 :index="true"
                 :selection="false"
                 @handleSelectionChange="handleSelectionChange">
        <template #status="scope">
          <iInput :disabled="isDisabled"
                  v-model="scope.row.status"
                  @change="updateData(scope.row,'status', $event)"></iInput>
        </template>
        <template #comment="scope">
          <iInput :disabled="isDisabled"
                  v-model="scope.row.comment"
                  type='textarea'
                  maxlength="120"
                  show-word-limit
                  :autosize='{minRows:1}'
                  @change="updateData(scope.row,'comment', $event)"></iInput>
        </template>
      </tableList>
    </iCard>
本报告仅供上汽大众内部商务决策参考之用。请对所述供应商所有信息严格保密，不得向任何其他第三方透露本报告的任何内容，请在公司内部谨慎合理使用所述信息。本报告不得作为法律诉讼的依据，上汽大众不承担任何责任。  </div>

</template>

<script>
import { iCard, iInput } from 'rise';
import tableList from '@/components/commonTable';
import { finAnalysis } from '../data';
import { getFinancialAnalysis, postFinancialAnalysis } from '@/api/frmRating/depthRating/depthReport.js'
import { getDictByCode } from '@/api/dictionary'
// import {setWaterMark,removeWatermark} from 'rise/utils/watermark'
export default {
  components: { iCard, iInput, tableList },
  data () {
    return {
      rowRange: { minRows: 3, maxRows: 6 },
      tableListData: [{ '5': 1, a: 'haha', e: '备注', f: '附件', ft: '查看' }],
      tableTitle: finAnalysis,
      tableLoading: false,
      info: {
        promptInfo: '',
        list: []
      },
      supplierId: ""
    }
  },
  props: {
    isDisabled: { type: Boolean, default: false }
  },
  mounted () {
    console.log(this.userInfo)
    // setWaterMark(this.userInfo.nameZh+this.userInfo.id+this.userInfo.deptDTO.deptNum+'仅供CS内部使用',1000,700)
    this.id = this.$route.query.id;
    this.supplierId = this.$route.query.supplierId;
    this.getOverView()
  },
  destroyed () {
    // removeWatermark()
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),

  },
  methods: {
    getOverView () {
      getFinancialAnalysis(this.id).then((result) => {
        if (result.data) {
          this.info = result.data
          this.info.deepCommentSupplierId = this.id
          if (!result.data.list || result.data.list.length == 0) {
            getDictByCode('FINANCIAL_TO_CASE_TYPE').then((res) => {
              // console.log(res)
              this.info.list = res.data[0].subDictResultVo.map((r) => {
                return {
                  indexName: r.name,
                  indexCode: r.code
                }
              })
            })
          }
        }
      }).catch((err) => {

      });
    },
    postOverView () {
      postFinancialAnalysis({
        ...this.info,
        deepCommentSupplierId: this.id
      }).then((result) => {
        if (result.code == 200) {
          this.$message.success(result.desZh)
          this.getOverView()
        } else {
          this.$message.error(result.desZh)
        }
      }).catch((err) => {

      });
    },
    updateData (all, type, value) {
      console.log(all, type, value)
      const newList = window._.cloneDeep(this.info.list)
      const obj = newList[all.index]
      obj[type] = value
      newList.splice(all.index, 1, obj)
      this.info = {
        ...this.info,
        list: newList
      }
    },
  },
}
</script>

<style lang="scss" scoped="scoped">
.title {
  font-weight: bold;
  font-size: 18px;
  color: $color-black;
  margin: 20px 0;
}
.remark {
  margin-top: 15px;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  line-height: 18px;
     color: #e30b0d;
}
</style>
