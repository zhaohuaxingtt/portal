<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2023-01-09 16:49:51
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipReplenishmentOverview\components\theTable.vue
-->
<template>
  <div>
    <iCard>
      <template v-slot:header>
        <div class="showMe">
          <span>{{ language('只看自己 ') }}</span>
          <el-switch
            v-model="onlySeeMySelf"
            class="margin-right10"
            @change="showOnlyMyselfData($event)"
            active-color="#1660F1"
            inactive-color="#cccccc"
          >
          </el-switch>
          <el-radio-group v-model="type" @change="change">
            <el-radio-button label="1">{{$t('一次件补差')}}</el-radio-button>
            <el-radio-button label="2">{{$t('散件补差')}}</el-radio-button>
          </el-radio-group>
        </div>
        <el-dropdown
          class="btndropdown margin-left10 margin-right10"
          size="mini"
          @command="handleCommand"
        >
          <iButton v-permission="PORTAL_MTZ_FAQIBUCHA"
            >{{ $t('FAQIBUCHA')
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </iButton>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Tier-1">{{
              $t('一次件供应商')
            }}</el-dropdown-item>
            <el-dropdown-item command="Tier-2">{{
              $t('散件供应商')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <el-table
        :data="tableData"
        ref="moviesTable"
        tooltip-effect="light"
        v-loading="loading"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" fixed width="50"> </el-table-column>
        <el-table-column label="#" fixed type="index" width="50">
        </el-table-column>
        <el-table-column
          prop="fsupplierName"
          align="center"
          show-overflow-tooltip
          minWidth="240"
        >
          <template slot="header">
            <div>{{ language('YICIJIANGONGYINGSHANG', '一次件供应商') }}</div>
          </template>
          <template slot-scope="scope">
            <p class="openPage" @click="handleClickFsupplierName(scope.row)">
              {{ scope.row.firstSupplierName }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="waitLaunchedDocMoney"
          align="center"
          show-overflow-tooltip
          minWidth="180"
          :formatter="formatterNumber"
        >
          <template slot="header">
            <div>
              <span>{{ language('DAIFAQIPINZHENG', '待发起凭证') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  {{
                    language(
                      'BUCHAJINEJIESUANZHONGSHANGWEIFAQIPINZHENGDEJINE',
                      '补差金额（结算）中尚未发起凭证的金额'
                    )
                  }}
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
            <!-- <div>{{language('DAIBUCHAJINE','（待补差金额）')}}</div> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="hasLaunchedDocMoney"
          align="center"
          show-overflow-tooltip
          minWidth="180"
          :formatter="formatterNumber"
        >
          <template slot="header">
            <div>
              <span>{{ language('YIFAQIPINZHENG', '已发起凭证') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  {{
                    language(
                      'BUCHAJINEJIESUANZHONGYIFAQIDEPINZHENGJINEZONGHE',
                      '补差金额（结算）中已发起的凭证金额总和'
                    )
                  }}
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="trueCompMoney"
          align="center"
          show-overflow-tooltip
          minWidth="180"
          :formatter="formatterNumber"
        >
          <template slot="header">
            <div>
              <span>{{ language('SHIJIBUCHAJINE', '实际补差金额') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  <p>
                    {{
                      language(
                        'YIFAQIPINGZHENGZHONGSHIJIXIANGGONGYINGSHANGBUCHADEJINE',
                        '已发起凭证中实际向供应商补差的金额；'
                      )
                    }}
                  </p>
                  <p>
                    {{
                      language(
                        'SHIJIBUCHAJINEDAIQUERENJINEYIQUERENJINEYIPIZHUNJINEYIZHIFUJINE',
                        '实际补差金额=待确认金额+已确认金额+ 已批准金额+已支付金额'
                      )
                    }}
                  </p>
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="waitVerifyMoney"
          align="center"
          show-overflow-tooltip
          minWidth="180"
          :formatter="formatterNumber"
        >
          <template slot="header">
            <div>
              <span>{{ language('DAIQUERENJINE', '待确认金额') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  <p>
                    {{
                      language(
                        'CAIGONGYUANFAQIBUCHAPINZHENGZHONGGONGYINGSHANGSHANGWEIQUERENDEJINE',
                        '采购员发起补差凭证中供应商尚未确认的金额'
                      )
                    }}
                  </p>
                  <p>
                    {{
                      language(
                        'CAOGAOGONGYINGSHANGQUERENZHONGJINE',
                        '（草稿+供应商确认中金额）'
                      )
                    }}
                  </p>
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
            <!-- <div>{{language('DENGDAIGONGYINGSHANGQUERENJINE','（等待供应商确认金额）')}}</div> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="hasVerifyMoney"
          align="center"
          show-overflow-tooltip
          minWidth="140"
          :formatter="formatterNumber"
        >
          <template slot="header">
            <div>
              <span>{{ language('YIQUERENJINE', '已确认金额 ') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  <p>
                    {{
                      language(
                        'GONGYINGSHANGYIQUERENDEBUCHAPINZHENG',
                        '供应商已确认的补差凭证'
                      )
                    }}
                  </p>
                  <p>
                    {{
                      language(
                        'JINEZONGHESHENPIZHONGJINE',
                        '金额总和（审批中金额）'
                      )
                    }}
                  </p>
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="hasRatifyMoney"
          align="center"
          show-overflow-tooltip
          minWidth="140"
          :formatter="formatterNumber"
        >
          <template slot="header">
            <div>
              <span>{{ language('YIPIZHENGJINE', '已批准金额 ') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  {{
                    language(
                      'BUCHAPINZHENGSHENPITONGUOJINESHENPITONGGUOJINE',
                      '补差凭证审批通过金额（审批通过金额）'
                    )
                  }}
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="hasPayMoney"
          align="center"
          show-overflow-tooltip
          minWidth="140"
          :formatter="formatterNumber"
        >
          <template slot="header">
            <div>
              <span>{{ language('YIZHIFUJINE', '已支付金额') }}</span>
              <el-tooltip effect="light" placement="top">
                <div slot="content">
                  {{
                    language('BUCHAPINZHENGYIZHIFUJINE', '补差凭证已支付金额')
                  }}
                </div>
                <i
                  class="el-icon-warning-outline margin-left10"
                  style="color: blue"
                ></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
      </iPagination>
    </iCard>
    <detailDialog
      v-model="detailParams.visible"
      v-if="detailParams.visible"
      :key="detailParams.key"
      :params="detailParams.data"
      @handleCloseDialog="handleCloseDialog"
      @handleRedeploy="handleRedeploy"
    />
    <redeployDialog
      v-model="redeployParams.visible"
      :key="redeployParams.key"
      @handleReturnDetail="handleReturnDetail"
      @handleSubmitAssign="handleSubmitAssign"
    />
  </div>
</template>

<script>
import { iCard, iButton, iPagination, icon, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import detailDialog from './detailDialog'
import redeployDialog from './redeployDialog'
import { pageMTZCompOverview } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import { fetchAssign } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview/detail'
export default {
  name: 'Search',
  componentName: 'theTable',
  components: {
    iCard,
    iButton,
    iPagination,
    icon,
    detailDialog,
    redeployDialog
  },
  watch: {},
  mixins: [pageMixins],
  data() {
    return {
      type: 1,
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
  created() {
    this.getTableList()
  },
  methods: {
    //仅看自己
    showOnlyMyselfData(val) {
      this.onlySeeMySelf = val
      this.getTableList()
    },
    // 参照
    handleCommand(command) {
      // 一次件
      if (command == 'Tier-1') {
        this.openDialogOfIntending = true
      }
      // 二次件/散件
      if (command == 'Tier-2') {
        this.openDialogOfFrameworkport = true
      }
    },
    formatterNumber(row, column, cellValue, index) {
      return VueUtil.formatNumber(cellValue)
    },
    change(e){
      console.log(e);
    },
    add() {
      let params = {
        dialogVisible: true,
        selectData: this.handleSelectArr,
        flag: true,
        date: this.$parent.$refs.searchBox.value1
      }
      this.$emit('dialog', params)
    },
    getTableList() {
      this.loading = true
      let search = []
      search = this.$parent.$refs.searchBox.searchForm
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...search
      }
      pageMTZCompOverview(params).then((res) => {
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
    handleClickFsupplierName(val) {
      console.log(val)
      this.$nextTick((_) => {
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
    handleCloseDialog() {
      this.detailParams.visible = false
      this.redeployParams.visible = false
    },
    // 跳转转派弹窗
    handleRedeploy(idList) {
      this.detailIdList = idList
      // this.$set(this.detailParams, 'visible', false)
      this.$set(this.redeployParams, 'key', Math.random())
      this.$nextTick((_) => {
        this.$set(this.redeployParams, 'visible', true)
      })
    },
    // 返回详情
    handleReturnDetail() {
      // this.$set(this.redeployParams, 'visible', false)
      // this.$set(this.detailParams, 'key', Math.random())
      // this.$nextTick(_ => {
      //   this.$set(this.detailParams, 'visible', true)
      // })
    },
    // 转派
    handleSubmitAssign(list) {
      var data = list
      let linieName = data.message.split('-')[1]
      let linieId = data.code
      fetchAssign({
        keyList: this.detailIdList,
        linieName,
        linieId
      }).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.$set(this.redeployParams, 'visible', false)
        } else iMessage.error(res.desZh)
      })
      this.$set(this.detailParams, 'key', Math.random())
    },
    handleSelectionChange(val) {
      console.log(val)
      if (val.length > 1) {
        var duoxuans = val.pop()
        this.handleSelectArr = val.pop()
        //清除所有选中
        this.$refs.moviesTable.clearSelection()
        //给最后一个加上选中
        this.$refs.moviesTable.toggleRowSelection(duoxuans)
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
::v-deep .el-table__fixed-header-wrapper,
.el-table__fixed-body-wrapper {
  background-color: #fff;
  z-index: 1000;
}
</style>
<style lang="scss">
.el-table__fixed,
.el-table__fixed-right {
  background: #fff;
}
</style>
