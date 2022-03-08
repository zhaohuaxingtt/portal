<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2022-03-08 10:20:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <div>
    <iCard>
      <template v-slot:header>
        <span>
          {{language('BUCHAXIANGQING','补差详情')}}
        </span>
        <iButton @click="add"
                 v-permission="PORTAL_MTZ_FAQIBUCHA">{{language('FAQIBUCHA','发起补差')}}</iButton>
      </template>
      <el-table :data="tableData"
                ref="moviesTable"
                tooltip-effect="light"
                v-loading="loading"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="60">
        </el-table-column>
        <el-table-column label="#"
                         type="index"
                         width="60">
        </el-table-column>
        <el-table-column prop="fsupplierName"
                         align="center"
                         show-overflow-tooltip
                         width="240">
          <template slot="header">
            <div>{{language('YICIJIANGONGYINGSHANG','一次件供应商')}}</div>
          </template>
          <template slot-scope="scope">
            <p class="openPage"
               @click="handleClickFsupplierName(scope.row)">
              {{scope.row.firstSupplierName}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="compMoney1"
                         align="center"
                         show-overflow-tooltip
                         width="180"
                         :formatter="formatterNumber">
          <template slot="header">
            <div>
              <span>{{language('BUCHAJINE','补差金额 ')}}</span>
              <el-tooltip effect="light"
                          content=""
                          placement="top">
                <div slot="content">{{language('BUCHASHIJIANDUANNEIGENGJUGUIZELINGJIANSHOUHUOSHULIANGJISUANDEBUCHAJIEGUO','补差时间段内根据规则&零件收货数量计算的补差结果')}}</div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
            <div>{{language('SHOUHUOSHULIANGJISUANJIEGUO','（收货数量计算结果）')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="compMoney2"
                         align="center"
                         show-overflow-tooltip
                         width="180"
                         :formatter="formatterNumber">
          <template slot="header">
            <div>
              <span>{{language('BUCHAJINE','补差金额')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">{{language('BUCHASHIJIANDUANNEISHOUHUOSHULIANGDUIYINGDEJIESUANSHULIANGBUCHAJISUANJIEGUO','补差时间段内收货数量对应的结算数量补差计算结果')}}</div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
            <div>{{language('JIESUANSHULIANGJISUANJIEGUO','（结算数量计算结果）')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="waitLaunchedDocMoney"
                         align="center"
                         show-overflow-tooltip
                         width="180"
                         :formatter="formatterNumber">
          <template slot="header">
            <div>
              <span>{{language('DAIFAQIPINZHENG','待发起凭证')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">{{language('BUCHAJINEJIESUANZHONGSHANGWEIFAQIPINZHENGDEJINE','补差金额（结算）中尚未发起凭证的金额')}}</div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
            <!-- <div>{{language('DAIBUCHAJINE','（待补差金额）')}}</div> -->
          </template>
        </el-table-column>
        <el-table-column prop="hasLaunchedDocMoney"
                         align="center"
                         show-overflow-tooltip
                         width="140"
                         :formatter="formatterNumber">
          <template slot="header">
            <div>
              <span>{{language('YIFAQIPINZHENG','已发起凭证')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">{{language('BUCHAJINEJIESUANZHONGYIFAQIDEPINZHENGJINEZONGHE','补差金额（结算）中已发起的凭证金额总和')}}</div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="trueCompMoney"
                         align="center"
                         show-overflow-tooltip
                         width="140"
                         :formatter="formatterNumber">
          <template slot="header">
            <div>
              <span>{{language('SHIJIBUCHAJINE','实际补差金额')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">
                  <p>{{language('YIFAQIPINGZHENGZHONGSHIJIXIANGGONGYINGSHANGBUCHADEJINE','已发起凭证中实际向供应商补差的金额；')}} </p>
                  <p>{{language('SHIJIBUCHAJINEDAIQUERENJINEYIQUERENJINEYIPIZHUNJINEYIZHIFUJINE','实际补差金额=待确认金额+已确认金额+ 已批准金额+已支付金额')}}</p>
                </div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="waitVerifyMoney"
                         align="center"
                         show-overflow-tooltip
                         width="180"
                         :formatter="formatterNumber">
          <template slot="header">
            <div>
              <span>{{language('DAIQUERENJINE','待确认金额')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">
                  <p>{{language('CAIGONGYUANFAQIBUCHAPINZHENGZHONGGONGYINGSHANGSHANGWEIQUERENDEJINE','采购员发起补差凭证中供应商尚未确认的金额')}}</p>
                  <p>{{language('CAOGAOGONGYINGSHANGQUERENZHONGJINE','（草稿+供应商确认中金额）')}}</p>
                </div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
            <!-- <div>{{language('DENGDAIGONGYINGSHANGQUERENJINE','（等待供应商确认金额）')}}</div> -->
          </template>
        </el-table-column>
        <el-table-column prop="hasVerifyMoney"
                         align="center"
                         show-overflow-tooltip
                         width="180"
                         :formatter="formatterNumber">
          <template slot="header">
            <div>
              <span>{{language('YIQUERENJINE','已确认金额 ')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">
                  <p>{{language('GONGYINGSHANGYIQUERENDEBUCHAPINZHENG','供应商已确认的补差凭证')}}</p>
                  <p>{{language('JINEZONGHESHENPIZHONGJINE','金额总和（审批中金额）')}}</p>
                </div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
            <!-- <div>{{language('GONGYINGSHANGQUERENJINE','（供应商确认金额）')}}</div> -->
          </template>
        </el-table-column>
        <el-table-column prop="hasRatifyMoney"
                         align="center"
                         show-overflow-tooltip
                         width="180"
                         :formatter="formatterNumber">
          <template slot="header">
            <div>
              <span>{{language('YIPIZHENGJINE','已批准金额 ')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">{{language('BUCHAPINZHENGSHENPITONGUOJINESHENPITONGGUOJINE','补差凭证审批通过金额（审批通过金额）')}}</div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
            <!-- <div>{{language('BUCHAPINZHENGSHENPITONGUOJINE','（补差凭证审批通过金额）')}}</div> -->
          </template>
        </el-table-column>
        <el-table-column prop="hasPayMoney"
                         align="center"
                         show-overflow-tooltip
                         width="180"
                         :formatter="formatterNumber">
          <template slot="header">
            <div>
              <span>{{language('YIZHIFUJINE','已支付金额')}}</span>
              <el-tooltip effect="light"
                          placement="top">
                <div slot="content">{{language('BUCHAPINZHENGYIZHIFUJINE','补差凭证已支付金额')}}</div>
                <i class="el-icon-warning-outline margin-left10"
                   style="color:blue"></i>
              </el-tooltip>
            </div>
            <!-- <div>{{language('BUCHAPINZHENGYIZHIFUJINE','（补差凭证已支付金额）')}}</div> -->
          </template>
        </el-table-column>
      </el-table>
      <iPagination @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :current-page="page.currPage"
                   :total="page.totalCount"
                   :layout="page.layout">
      </iPagination>
    </iCard>
    <detailDialog v-model="detailParams.visible"
                  v-if="detailParams.visible"
                  :key="detailParams.key"
                  :params="detailParams.data"
                  @handleCloseDialog="handleCloseDialog"
                  @handleRedeploy="handleRedeploy" />
    <redeployDialog v-model="redeployParams.visible"
                    :key="redeployParams.key"
                    @handleReturnDetail="handleReturnDetail"
                    @handleSubmitAssign="handleSubmitAssign" />
  </div>
</template>

<script>
import { iCard, iButton, iPagination, icon, iMessage } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import detailDialog from './detailDialog'
import redeployDialog from './redeployDialog'
import { pageMTZCompOverview } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import { fetchAssign } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview/detail'
export default {
  name: "Search",
  componentName: "theTable",
  components: {
    iCard,
    iButton,
    iPagination,
    icon,
    detailDialog,
    redeployDialog
  },
  watch: {
  },
  mixins: [pageMixins],
  data () {
    return {
      detailParams: {
        key: 0,
        visible: false,
        data: {}
      },
      redeployParams: {
        key: 0,
        visible: false
      },
      handleSelectArr: [],
      detailIdList: [],
      tableData: [],
      loading: false
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    formatterNumber (row, column, cellValue, index) {
      return VueUtil.formatNumber(cellValue);
    },
    add () {
      if (this.handleSelectArr.length === 0) {
        iMessage.error('请选择数据')
        return
      }
      let params = {
        dialogVisible: true,
        selectData: this.handleSelectArr,
        flag: true,
        date: this.$parent.$refs.searchBox.value1
      }
      this.$emit('dialog', params);
    },
    getTableList () {
      this.loading = true
      let search = []
      search = this.$parent.$refs.searchBox.searchForm
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...search
      }
      pageMTZCompOverview(params).then(res => {
        if (res.code === '200') {
          this.tableData = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.loading = false
        } else {
          this.loading = false
        }

      })
    },
    // 点击名称，打开弹窗
    handleClickFsupplierName (val) {
      console.log(val)
      this.$nextTick(_ => {
        this.detailParams = {
          ...this.detailParams,
          key: Math.random(),
          visible: true,
          data: {
            firstSupplierId: val.firstSupplierId,
            name: val.firstSupplierName,
            time: this.$parent.$refs.searchBox.value1
          }
        }
      })
    },
    // 关闭弹窗
    handleCloseDialog () {
      this.detailParams.visible = false
      this.redeployParams.visible = false
    },
    // 跳转转派弹窗
    handleRedeploy (idList) {
      this.detailIdList = idList
      // this.$set(this.detailParams, 'visible', false)
      this.$set(this.redeployParams, 'key', Math.random())
      this.$nextTick(_ => {
        this.$set(this.redeployParams, 'visible', true)
      })
    },
    // 返回详情
    handleReturnDetail () {
      // this.$set(this.redeployParams, 'visible', false)
      // this.$set(this.detailParams, 'key', Math.random())

      // this.$nextTick(_ => {
      //   this.$set(this.detailParams, 'visible', true)
      // })
    },
    // 转派
    handleSubmitAssign (list) {
      var data = list;
      let linieName = data.message.split("-")[1]
      let linieId = data.code
      fetchAssign({
        keyList: this.detailIdList,
        linieName,
        linieId
      }).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.$set(this.redeployParams, 'visible', false)
        } else iMessage.error(res.desZh)
      })
      this.$set(this.detailParams, 'key', Math.random())
    },
    handleSelectionChange (val) {
      console.log(val)
      if (val.length > 1) {
        var duoxuans = val.pop();
        this.handleSelectArr = val.pop();
        //清除所有选中
        this.$refs.moviesTable.clearSelection();
        //给最后一个加上选中
        this.$refs.moviesTable.toggleRowSelection(duoxuans);
      } else {
        this.handleSelectArr = val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.openPage {
  position: relative;
  color: $color-blue;
  font-size: 14px;
  cursor: pointer;
  width: 90%;
}
</style>
