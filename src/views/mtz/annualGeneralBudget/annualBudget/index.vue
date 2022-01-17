<!--
 * @Author: youyuan
 * @Date: 2021-08-27 15:07:07
 * @LastEditTime: 2022-01-14 16:19:38
 * @LastEditors: Please set LastEditors
 * @Description: 年度预算总览
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\annualBudget\index.vue
-->
<template>
  <div>
    <budget ref="childBudget"
            @handleSubmitSearch="handleSubmitSearch"
            @handleSearchReset="handleSearchReset">
      <template v-slot:mainContent>
        <div class="buyerBox"
             v-if="isLinieOrDeptUser()">
          <iCard class="margin-top20">
            <div slot="header"
                 class="headBox">
              <p class="headTitle">{{language('XIANGQINGLIEBIAO', '详情列表')}} {{deptEnTitle}}</p>
              <el-tooltip :content="language('JINETISHI', '将鼠标移到金额上时会展示具体数字')"
                          placement="top"
                          effect="light">
                <i class="el-icon-warning-outline rotate"></i>
              </el-tooltip>
              <p class="headInfo">{{language('DANWEIBAIWANRENMINBI', '（单位：百万人民币）')}}</p>
              <span class="buttonBox"
                    v-if="userRoles.indexOf(buyUser) > -1">
                <iButton @click="handleReview">{{language('REVIEWDAXIE', 'Review')}}</iButton>
                <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
                <iButton @click="handleExport">{{language('DAOCHU', '导出')}}</iButton>
              </span>
              <span class="buttonBox"
                    v-if="userRoles.indexOf(deptBudgetUser) > -1">
                <iButton @click="handlePurchaseBudget">{{language('YUSUANZONGLAN', '预算总览')}}</iButton>
                <iButton @click="handleExport">{{language('DAOCHU', '导出')}}</iButton>
              </span>
            </div>
            <tableList class="margin-top20"
                       :tableData="tableListData"
                       :tableTitle="userRoles.indexOf(buyUser) > -1 ? tableTitleBuyer : tableTitleDepter"
                       :tableLoading="loading"
                       :index="true"
                       openPageProps="forecastTime"
                       @openPage="handleClickYear"
                       :openPageGetRowData="true"
                       @handleSelectionChange="handleSelectionChange">
              <template #endForecastAmount="scope">
                <el-tooltip :content="moneyInfo(scope.row['endForecastAmount'])"
                            placement="top"
                            effect="light">
                  <p>{{money(scope.row['endForecastAmount'])}}</p>
                </el-tooltip>
              </template>
            </tableList>
            <iPagination v-update
                         @size-change="handleSizeChange($event, () => {
                this.page.currPage = 1
                this.getTableData()
              })"
                         @current-change="handleCurrentChange($event, getTableData)"
                         background
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         :layout="page.layout"
                         :current-page='page.currPage'
                         :total="page.totalCount" />
          </iCard>
        </div>
        <div class="leaderBox"
             v-if="isLeader()">
          <iCard class="margin-top20">
            <div slot="header"
                 class="headBox">
              <p class="headTitle">{{language('XIANGQINGLIEBIAO', '详情列表')}}</p>
              <el-tooltip :content="language('JINETISHI', '将鼠标移到金额上时会展示具体数字')"
                          placement="top"
                          effect="light">
                <i class="el-icon-warning-outline rotate"></i>
              </el-tooltip>
              <p class="headInfo">{{language('DANWEIBAIWANRENMINBI', '（单位：百万人民币）')}}</p>
              <span class="buttonBox">
                <iButton @click="handleAdd">{{language('XINZENG', '新增')}}</iButton>
                <iButton @click="handleDel">{{language('SHANCHU', '删除')}}</iButton>
                <iButton @click="handleChangeLog">{{language('CHANGELOG', 'Change Log')}}</iButton>
                <iButton @click="handleLinie">{{language('TZLINIE', '通知Linie')}}</iButton>
                <iButton @click="handleExportAudit">{{language('DAOCHUYUSUANMINGXI', '导出预算明细')}}</iButton>
                <iButton @click="handleChangeLevel">{{language('GENGGAIYONGLIANGBANBEN', '更改用量版本')}}</iButton>
                <iButton @click="handleIssue">{{language('FABU', '发布')}}</iButton>
              </span>
            </div>
            <tableList class="margin-top20"
                       :tableData="tableListData"
                       :tableTitle="tableTitleLeader"
                       :tableLoading="loading"
                       :index="true"
                       @handleCurrentChange="handleClickRow"
                       :selection="false"
                       :highlightCurrentRow="true">
              <template #demandVersion="scope">
                <p>{{scope.row.demandType}} {{scope.row.demandType && scope.row.demandVersion ? '-' : ''}} {{scope.row.demandVersion}}</p>
              </template>
              <template #status="scope">
                <div v-if="scope.row.status == '计算失败'"
                     @click="handleClickRefresh(scope.row)">
                  {{scope.row.status}}
                  <icon class="margin-left5 refreshIcon"
                        symbol
                        name="iconmojukanbanshuaxin"></icon>
                </div>
                <div v-else>
                  {{scope.row.status}}
                </div>
              </template>
              <template #option="scope">
                <div class="openPage"
                     @click="handleEdit(scope.row)">编辑</div>
              </template>
              <template #startForecastAmount="scope">
                <el-tooltip :content="moneyInfo(scope.row['startForecastAmount'])"
                            placement="top"
                            effect="light">
                  <p>{{money(scope.row['startForecastAmount'])}}</p>
                </el-tooltip>
              </template>
              <template #endForecastAmount="scope">
                <el-tooltip :content="moneyInfo(scope.row['endForecastAmount'])"
                            placement="top"
                            effect="light">
                  <p>{{money(scope.row['endForecastAmount'])}}</p>
                </el-tooltip>
              </template>
            </tableList>
            <iPagination v-update
                         @size-change="handleSizeChange($event, () => {
                this.page.currPage = 1
                this.getTableData()
              })"
                         @current-change="handleCurrentChange($event, getTableData)"
                         background
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         :layout="page.layout"
                         :current-page='page.currPage'
                         :total="page.totalCount" />
          </iCard>
        </div>
      </template>
    </budget>
    <detail v-if="dialogParams.visible"
            :key="dialogParams.key"
            :forecastId="dialogParams.data"
            v-model="dialogParams.visible"
            @closeDialog="handleCloseDialog" />
    <purchaseBudget v-if="purchaseBudgetParams.visible"
                    :key="purchaseBudgetParams.key"
                    v-model="purchaseBudgetParams.visible"
                    :forecastId="purchaseBudgetParams.data"
                    @closeDialog="handleCloseDialog" />
    <addDialog :key="addModalParams.key"
               v-model="addModalParams.visible"
               @closeDiolog="closeDiolog"
               @handleSubmitAdd="handleSubmitAdd" />
    <linie :key="linieModalParams.key"
           v-model="linieModalParams.visible"
           @closeDiolog="closeDiolog"
           @handleSubmitLinie="handleSubmitLinie" />
    <changeLevel :key="changLevelParams.key"
                 v-model="changLevelParams.visible"
                 @closeDiolog="closeDiolog"
                 @handleSubmitChangeLevel="handleSubmitChangeLevel" />
    <!-- <changeLog :key="changLogParams.key" v-model="changLogParams.visible" @closeDiolog="closeDiolog"/> -->
    <!-- <iLog :show.sync="changLogParams.visible" :bizId="changLogParams.bizId"/> -->
    <iUserLog :show.sync="changLogParams.visible"
              :bizId="changLogParams.bizId"
              menuId="2"
              is-page />
  </div>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, icon, iMessageBox, iUserLog } from 'rise'
import budget from '@/views/mtz/annualGeneralBudget/annualBudget/components/budget'
import detail from '@/views/mtz/annualGeneralBudget/annualBudget/components/detail'
import purchaseBudget from './components/purchaseBudget'
import addDialog from './components/addDialog'
import linie from './components/linie'
import changeLog from './components/changeLog'
import changeLevel from './components/changeLevel'
import { tableTitleBuyer, tableTitleDepter, tableTitleLeader } from './components/data'
import { pageMixins } from '@/utils/pageMixins';
import tableList from '@/components/commonTable/index.vue'
import { fetchTableDataOfBuyer, fetchReviewOrSubmit, fetchExport, fetchTableDataOfLeader, fetchAddBudgetLeader, fetchExportFinance, fetchEditDemand, fetchRecount, fetchPublish, fetchCheckAdd, fetchDel, fetchCheckPublish } from '@/api/mtz/annualGeneralBudget/annualBudget.js'
import { fetchNoticeLinie } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import { getMoney, getMoneyInfo } from '@/views/mtz/moneyComputation'
export default {
  mixins: [pageMixins],
  components: {
    budget,
    detail,
    iCard,
    iButton,
    iPagination,
    tableList,
    purchaseBudget,
    addDialog,
    linie,
    changeLog,
    iUserLog,
    changeLevel,
    icon
  },
  data () {
    return {
      annualBudgetEdit: '/mtz/annualBudgetEdit',
      searchForm: {},
      tableTitleBuyer,
      tableTitleDepter,
      tableTitleLeader,
      tableListData: [],
      selection: [],
      loading: false,
      loginUserInfo: null,
      userRoles: [],
      buyUser: 'LINIE',
      deptBudgetUser: 'MTZKSYSFZR',
      deptBudgetLeader: 'MTZNDYSFZR',
      dialogParams: {
        key: 0,
        visible: false,
        data: null
      },
      purchaseBudgetParams: {
        key: 0,
        visible: false,
        data: null
      },
      addModalParams: {
        key: 0,
        visible: false
      },
      linieModalParams: {
        key: 0,
        visible: false
      },
      changLogParams: {
        key: 0,
        visible: false,
        bizId: 'MEK0000001'
      },
      changLevelParams: {
        key: 0,
        visible: false
      },
      deptEnTitle: ''
    }
  },
  created () {
    this.loginUserInfo = this.$store.state.permission.userInfo
    this.deptEnTitle = this.loginUserInfo.deptDTO.nameEn
    this.loginUserInfo.positionList.map(item => {
      item.roleDTOList.map(roleItem => this.userRoles.push(roleItem.code))
    })
    // this.test()
  },
  mounted () {
    this.$nextTick(_ => {
      this.initSearch()
      this.getTableData()
    })
  },
  computed: {
    money () {
      return function (val) {
        let res = ''
        if (val) {
          // res = Number(val/1000000).toFixed(2)
          res = getMoney(val)
        }
        return res
      }
    },
    moneyInfo () {
      return function (val) {
        let res = ''
        if (val) {
          res = getMoneyInfo(val)
        }
        return res
      }
    }
  },
  methods: {
    // 当前登录用户是否包含采购员 or 科室调解人
    isLinieOrDeptUser () {
      return this.userRoles.indexOf(this.buyUser) > -1 || this.userRoles.indexOf(this.deptBudgetUser) > -1
    },
    // 当前登录用户是为年度预算负责人
    isLeader () {
      return this.userRoles.indexOf(this.deptBudgetLeader) > -1
    },
    // 初始化检索条件
    initSearch () {
      this.searchForm = this.$refs.childBudget.searchForm
    },
    // 获取数据  
    getTableData () {
      return new Promise(resolve => {
        this.loading = true
        const params = {
          userId: 1,
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...this.searchForm
          // demandVersion: this.searchForm.demandVersion || null,
          // forecastTime: this.searchForm.forecastTime || null,
          // status: this.searchForm.status || null,
        }
        if (this.isLinieOrDeptUser()) {
          fetchTableDataOfBuyer(params).then(res => {
            this.loading = false
            if (res && res.code == 200) {
              this.page.totalCount = res.total
              this.tableListData = res.data
              resolve(res.data)
            } else iMessage.error(res.desZh)
          })
        }
        if (this.isLeader()) {
          fetchTableDataOfLeader(params).then(res => {
            this.loading = false
            if (res && res.code == 200) {
              this.tableListData = res.data
              this.page.totalCount = res.total
              resolve(res.data)
            } else iMessage.error(res.desZh)
          })
        }
      })
    },
    // 选中数据发生改变
    handleSelectionChange (val) {
      this.selection = val
    },
    // 点击确定查询
    handleSubmitSearch (data) {
      console.log(data);
      this.page.currPage = 1
      this.$set(this, 'searchForm', data)
      // this.searchForm = data
      this.getTableData()
    },
    // 点击重置查询
    handleSearchReset () {
      this.initSearch()
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData()
    },
    // review
    handleReview () {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      const data = this.selection.map(item => { return { id: item.confirmId, forecastId: item.id } })
      fetchReviewOrSubmit({
        tag: '2',
        list: data
      }).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
    // 确认
    handleSure () {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      const data = this.selection.map(item => { return { id: item.confirmId, forecastId: item.id } })
      fetchReviewOrSubmit({
        tag: '1',
        list: data
      }).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
    // 导出
    handleExport () {
      console.log('searchForm', this.searchForm)
      const params = {
        demandVersion: this.searchForm.demand || null,
        forecastTime: this.searchForm.forecastTime || null,
        status: this.searchForm.status || null,
      }
      fetchExport(params).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    // 预算总览 
    handlePurchaseBudget () {
      if (this.selection.length != 1) {
        return iMessage.warn(this.language('QINGXUANZEYITIAOSHUJU', '请选择一条数据'))
      }
      this.dialogParams.visible = false
      this.$nextTick(_ => {
        this.purchaseBudgetParams = {
          ...this.purchaseBudgetParams,
          key: Math.random(),
          visible: true,
          data: this.selection[0].id
        }
      })
    },
    // 点击预算年份
    handleClickYear (val) {
      this.purchaseBudgetParams.visible = false
      this.$nextTick(_ => {
        this.dialogParams = {
          ...this.dialogParams,
          key: Math.random(),
          visible: true,
          data: val.id
        }
      })
    },
    // 关闭年度预算明细弹窗
    handleCloseDialog () {
      this.dialogParams = {
        ...this.dialogParams,
        visible: false
      }
      this.purchaseBudgetParams = {
        ...this.purchaseBudgetParams,
        visible: false
      }
    },
    // 选中数据
    handleClickRow (val) {
      this.selection = val
    },
    // 删除
    handleDel () {
      if (!this.selection) {
        return iMessage.warn(this.language('QINGXUANZHONGYAOCAOZUODESHUJU', '请选中要操作的数据'))
      }
      if (this.selection.status != '草稿' && this.selection.status != '计算失败') {
        return iMessage.warn(this.language('ZNSCCGJSSBZTDYSBB', '只能删除草稿、计算失败状态的预算版本'))
      }
      iMessageBox(this.language('QRSCGBBNDYS', '确认删除该版本年度预算？'), this.language('LK_WENXINTISHI', '温馨提示')).then(() => {
        fetchDel({
          id: this.selection.id
        }).then(res => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableData()
          } else iMessage.error(res.desZh)
        })
      })
    },
    // 新增
    handleAdd () {
      this.addModalParams = {
        ...this.addModalParams,
        key: Math.random(),
        visible: true
      }
    },
    // 校验新增数据
    checkAdd (data) {
      return new Promise(resolve => {
        fetchCheckAdd(data).then(res => {
          if (res && res.code == 200) {
            if (res.data > 0) {
              this.addModalParams.visible = false
              iMessageBox(this.language('YCZXTYLBBYSSJSFCXJS', '已存在相同用量版本预算数据，是否重新计算？'), this.language('LK_WENXINTISHI', '温馨提示')).then(() => {
                resolve()
              })
            } else {
              this.addModalParams.visible = false
              resolve()
            }
          }
        })
      })
    },
    // 提交新增数据
    handleSubmitAdd (val) {
      this.checkAdd(val).then(_ => {
        // this.addModalParams.visible = false
        fetchAddBudgetLeader(val).then(res => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableData()
          } else iMessage.error(res.desZh)
        })
      })
    },
    // changeLog
    handleChangeLog () {
      if (!this.selection) {
        return iMessage.warn(this.language('QINGXUANZHONGYAOCAOZUODESHUJU', '请选中要操作的数据'))
      }
      this.changLogParams = {
        ...this.changLogParams,
        key: Math.random(),
        visible: true
      }
    },
    // 通知linie
    handleLinie () {
      if (!this.selection) {
        iMessage.warn(this.language('QINGXUANZHONGYAOCAOZUODESHUJU', '请选中要操作的数据'))
        return
      }
      if (this.selection.status != '草稿' && this.selection.status != '正式') {
        return iMessage.warn(this.language('QXZCGZSZTSJJXTZCZ', '请选择草稿/正式状态数据进行通知操作'))
      }
      this.linieModalParams = {
        ...this.linieModalParams,
        key: Math.random(),
        visible: true
      }
    },
    // 提交linie数据
    handleSubmitLinie (val) {
      const params = {
        listConfirm: [{ forecastId: this.selection.id }],
        requireTime: val.date
      }
      fetchNoticeLinie(params).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
      this.linieModalParams.visible = false
    },
    // 导出财务审批
    handleExportAudit () {
      if (!this.selection) {
        return iMessage.warn(this.language('QINGXUANZHONGYAOCAOZUODESHUJU', '请选中要操作的数据'))
      }
      fetchExportFinance({ forecastId: this.selection.id }).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    // 更改用量版本
    handleChangeLevel () {
      if (!this.selection) {
        return iMessage.warn(this.language('QINGXUANZHONGYAOCAOZUODESHUJU', '请选中要操作的数据'))
      }
      this.changLevelParams = {
        ...this.changLevelParams,
        key: Math.random(),
        visible: true
      }
    },
    // 提交更改用量版本数据
    handleSubmitChangeLevel (data) {
      fetchEditDemand({
        id: this.selection.id,
        forecastTime: this.selection.forecastTime,
        demandVersion: data.demandVersion,
        demandType: data.demandType,
      }).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
          this.changLevelParams.visible = false
        } else iMessage.error(res.desZh)
      })
    },
    // 发布前检测
    checkPublish () {
      return new Promise(resolve => {
        fetchCheckPublish({
          // forecastDTOS: [this.selection],
          demandVersion: this.selection.demandVersion,
          forecastTime: this.selection.forecastTime,
          status: this.selection.status
        }).then(res => {
          if (res && res.code == 200) {
            if (res.data > 0) {
              iMessageBox(this.language('YFBGZSYSBBSFZCFB', '已发布过正式预算版本，是否再次发布？'), this.language('LK_WENXINTISHI', '温馨提示')).then(() => {
                resolve()
              })
            } else {
              resolve()
            }
          }
        })
      })
    },
    // 发布
    handleIssue () {
      if (!this.selection) {
        return iMessage.warn(this.language('QINGXUANZHONGYAOCAOZUODESHUJU', '请选中要操作的数据'))
      }
      if (this.selection.status != '草稿' && this.selection.status != '正式') {
        return iMessage.warn(this.language('NDYSJSWWCWFFB', '年度预算计算未完成，无法发布'))
      }
      this.checkPublish().then(_ => {
        fetchPublish({
          forecastDTOS: [this.selection]
        }).then(res => {
          if (res && res.code == 200) {
            iMessage.success(this.language('NDYSZZBFBCG', '年度预算最终版发布成功！'))
            this.getTableData()
          } else iMessage.error(res.desZh)
        })
      })
    },
    // 编辑
    handleEdit (row) {
      this.$router.push({
        path: this.annualBudgetEdit,
        query: {
          version: row.forecastVersion,
          useVersion: row.demandVersion,
          forecastId: row.id,
          forecastTime: row.forecastTime
        }
      })
    },
    // 关闭弹窗
    closeDiolog () {
      this.addModalParams.visible = false
      this.linieModalParams.visible = false
      this.changLogParams.visible = false
      this.changLevelParams.visible = false
    },
    // 计算失败-刷新
    handleClickRefresh (data) {
      fetchRecount({
        id: data.id,
        forecastTime: data.forecastTime,
        demandVersion: data.demandVersion,
        demandType: data.demandType,
      }).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.leaderBox {
  ::v-deep .el-table__body tr.current-row > td {
    background: #77cbff;
    font-weight: bold;
  }
  ::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: #77cbff;
    font-weight: bold;
  }
}
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .headInfo {
    display: inline-block;
    font-family: Arial;
    color: #727272;
    opacity: 1;
    font-size: 16px;
  }
  .rotate {
    transform: rotate(180deg);
    color: #a0bffc;
    margin-left: 10px;
    font-size: 24px;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
.openPage {
  position: relative;
  color: $color-blue;
  font-size: 14px;
  cursor: pointer;
}
.refreshIcon {
  font-size: 16px;
  cursor: pointer;
}
</style>