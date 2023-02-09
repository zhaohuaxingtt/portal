<!--
 * @Date: 2022-08-18 11:10:25
 * @LastEditors: caopeng
 * @LastEditTime: 2022-09-29 10:01:07
 * @FilePath: \front-order\src\views\ws2\productionCapacity\Bom\page\detail\contrast\index.vue
-->
<template>
  <div>
    <iSearch @sure="sure" @reset="handleSearchReset">
      <el-form>
        <el-form-item :label="$t('ROLE.TYPE')">
          <iSelect clearable :placeholder="$t('partsprocure.PLEENTER')" v-model="formData.businessType">
            <el-option v-for="(j, index) in typeList" :key="index" :value="j.code" :label="j.name">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_ZHUANGTAI')">
          <iSelect clearable :placeholder="$t('partsprocure.PLEENTER')" v-model="formData.status">
            <el-option v-for="(j, index) in statusList" :key="index" :value="j.code" :label="j.name">
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard style="margin-top: 20px">
      <template #header-control>
        <!-- <iButton @click="initiate">供应商导入模板下载</iButton> -->
        <!-- <iButton @click="update">CS科室打分权重设置</iButton>
        <iButton @click="exportFile">定时规则设置</iButton> -->
        <iButton @click="addVersion">创建版本</iButton>
      </template>
      <tableList openPageProps="dataTime" :openPageGetRowData="true" @openPage="handleOpenPage" border
        :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading">
        <template #modelType="scope">
          <span>{{
            scope.row.modelType != null
              ? typeList.find((val) => val.code == scope.row.modelType).name
              : ''
          }}</span>
        </template>
        <template #status="scope">
          <span>{{
            scope.row.status != null
              ? statusList.find((val) => val.code == scope.row.status).name
              : ''
          }}</span>
        </template>
        <template #caozuo="scope">
          <iButton type="text" @click="delRow(scope.row)">删除</iButton>

        </template>
      </tableList>
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize" :layout="page.layout" :current-page="page.currPage" :total="page.totalCount" />
    </iCard>
    <iDialog append-to-body :title="$t('创建绩效版本')" :visible.sync="addVersionDiolog" width="60%" @close="clearDiolog">
      <el-steps finish-status="success" align-center :active="active">
        <el-step title="基本信息"></el-step>
        <el-step title="确认统计周期"></el-step>
        <el-step title="确认供应商范围"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :disabled="active == 3" style="margin-top: 20px" :label-position="'left'" label-width="120px">
        <el-form-item v-if="active == 0 || active == 3" :label="$t('标题：')">
          <i-input style="width: 200px" :placeholder="$t('partsprocure.PLEENTER')" v-model="form.versionName">
          </i-input>
        </el-form-item>

        <el-form-item v-if="active == 0 || active == 3" :label="$t('数据日期：')">
          <el-date-picker value-format="yyyy-MM-dd" v-model="form.dataTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="active == 0 || active == 3" :label="$t('绩效模型版本：')">
          <i-input :disabled="true" style="width: 200px" :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form.modelVersion">
          </i-input>
          {{ '此版本包含手工指标' }}
        </el-form-item>
        <el-form-item v-if="active == 0 || active == 3" :label="$t('类型：')">
          <el-radio-group v-model="form.modelType">
            <el-radio v-for="item in typeList" :key="item" :label="item.code">{{
              item.name
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="active == 0 || active == 3" :label="$t('截止时间：')">
          <el-date-picker v-model="form.endDate" type="datetime" value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="active == 1" :label="$t('统计周期：')">
          <el-date-picker type="monthrange" v-model="dataTime" align="right" unlink-panels
            value-format="yyyy-MM-dd 00:00:00" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div v-if="active == 2">
        <div class="dialogButon">
          <iButton @click="addSupplier">添加</iButton>
          <iButton @click="delSupplier">移除</iButton>
          <iButton @click="exportFile">模板下载</iButton>
          <el-upload style="margin-left:10px" action="1" :accept="'.xlsx,.xls'" :before-upload="beforeAvatarUpload"
            :show-file-list="false" :http-request="httpUpload" :disabled="importLoading">
            <div>
              <i-button>{{ language('PILIANGDAORU', '批量导入') }}
              </i-button>
            </div>
          </el-upload>
        </div>
        <tableList style="margin-top: 20px" border :tableData="tableListData2" :tableTitle="tableTitle2"
          @handleSelectionChange="handleSelectionChange">
        </tableList>
      </div>

      <span slot="footer" class="dialog-footer">
        <iButton v-if="active != 3" @click="submit('canle')">{{
          $t('LK_QUXIAO')
        }}</iButton>
        <iButton v-if="active != 3" @click="submit('to')">{{
          $t('SUPPLIER_XIAYIBU')
        }}</iButton>
        <iButton v-if="active == 3" @click="submit('finish')">{{
          '完成'
        }}</iButton>
      </span>
    </iDialog>
    <supplier ref="supplier" @addsupplier="addsupplier" v-if="supplierDiolog" v-model="supplierDiolog"></supplier>
  </div>
</template>

<script>
import {
  getSupplierPerforManceModelPage,
  addSupplierPerforManceModel,
  addSupplierPerforManceModelRelation,
  modelList,
  getTemplate,
  supplierImport,
  delEditionTask
} from '@/api/supplierManagement/supplierIndexManage/index'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import supplier from './module/supplier'
import { tableTitle, pickerOptions, tableTitle2 } from './data'
import { cloneDeep } from 'lodash'
import { getDictByCode } from '@/api/dictionary'
import {
  iMessage,
  iMessageBox,
  iPagination,
  iCard,
  iSearch,
  iButton,
  iInput,
  iSelect,
  iDatePicker,
  iDialog
} from 'rise'
export default {
  mixins: [pageMixins],

  components: {
    supplier,
    iCard,
    iPagination,
    iSearch,
    iButton,
    iInput,
    iSelect,
    iDatePicker,
    tableList,
    iDialog
  },
  data() {
    return {
      importLoading: false,
      typeList: [],
      statusList: [],
      supplierDiolog: false,
      pickerOptions: pickerOptions,
      dataTime: [],
      active: 0,
      dateTime: ['2023-1-1', '2023-12-31'],
      form: {},
      addVersionDiolog: false,
      tableListData2: [],
      tableTitle2: cloneDeep(tableTitle2),
      tableLoading: false,
      tableListData: [],
      tableTitle: cloneDeep(tableTitle),
      formData: {},
      selectTableData: []
    }
  },
  created() {
    this.init()
    this.getTableList()
  },
  methods: {
    init() {
      getDictByCode('SUPPLIER_PERFORMANCE_MODEL_TYPE')
        .then((res) => {
          if (res.data) {
            this.typeList = res?.data[0]?.subDictResultVo
          }
        })
        .catch(() => { })
      getDictByCode('SUPPLIER_PERFORMANCE_MODEL_STATUS')
        .then((res) => {
          if (res.data) {
            this.statusList = res?.data[0]?.subDictResultVo
          }
        })
        .catch(() => { })
    },
    openPreDetail(item) {
      let routeUrl = this.$router.resolve({
        path: '/productionCapacity/PriceRetrospective/supplierDetail',
        query: {
          supplierSapCode: item.supplierSapCode,
          tmSupplierId: item.tmSupplierId,
          supplierShortNameZh: item.supplierShortNameZh
        }
      })
      window.open(routeUrl.href, '_blank')
    },
    handleOpenPage(item) {
          let routeUrl = this.$router.resolve({
            path: '/supplier/spiIndex/supplierVersionTable',
            query: {
              id: item.id,
            },
          })
          window.open(routeUrl.href, '_blank')
    },
    delRow(row) {
      delEditionTask(row.id).then(res => {
        if (res.code == 200) {
          this.getTableList()
        } else {
          this.$message.error(res.desZh)
        }
      })
    },
    sure() {
      console.log(this.tableTitle)
      this.getTableList()
    },
    addVersion() {
      modelList(true).then(res => {
        if (res.data && res.data.length > 0) {
          this.form.modelVersion = res.data[0].version
          this.form.modelId = res.data[0].modelId
          this.addVersionDiolog = true
          this.$message.success('删除成功')

        } else {
          iMessage.error('请先创建一个绩效模型')

        }

      })
    },
    handleSearchReset() {
      this.page.pageSize = 10
      this.page.currPage = 1
      this.dateTime = []
      this.formData = {}
      this.getTableList()
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    addSupplier() {
      this.supplierDiolog = true
    },
    // 上传前校验
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error(`上传文件大小不能超过10MB!`)
      }
      return isLt10M
    },
    //导入
    async httpUpload(info) {
      this.importLoading = true
      let formData = new FormData()
      formData.append('file', info.file)
      await supplierImport(formData).then((res) => {
        if (res.code == 200 && res) {
          this.importDialog = true
          this.tableListData2 = [...this.tableListData2, ...res.data]
          this.$message.success(this.language('DAORUCHENGGONG', '导入成功'))
        } else {
          this.$message.error(res.desZh)
        }
      })
      this.importLoading = false
    },
    //点击创建版本下一步
    submit(v) {
      if (v == 'to' && this.active != 4) {
        if (this.active == 2) {
          this.form.statisticsStartDate = this.dataTime[0]
          this.form.statisticsEndDate = this.dataTime[1]
          addSupplierPerforManceModel(this.form).then((res) => {
            if (res.code == '200') {
              this.active = 3
              this.tableListData2.forEach(val => {
                val.editionId = res.data.id
              })
              addSupplierPerforManceModelRelation({
                editionId: res.data.id,
                relationAddList: this.tableListData2
              }).then((val) => {
                if (val.code == '200') {
                  this.getTableList()
                } else {
                  iMessage.error(val.desZh)
                }
              })
            } else {
              iMessage.error(res.desZh)
            }
          })
        } else {
          this.active = this.active + 1
        }
      } else if (v == 'back' && this.active != 0) {
        this.active = this.active - 1
      } else if (v == 'canle' || v == 'finish') {
        this.clearDiolog()
        this.getTableList()
      }
    },
    //点击创建绩效版本供应商
    addsupplier(v) {
      this.tableListData2 = v.map((val) => {
        return {
          sapCode: val.sapCode,
          supplierId: val.subSupplierId,
          supplierName: val.shortNameZh
        }

      })
      console.log(this.tableListData2)

    },
    delSupplier() {
      if (this.selectTableData.length == 0) return iMessage.warn('未选择记录')

      this.selectTableData.forEach((item, j) => {
        this.tableListData2.forEach((val, i) => {
          if (val.index == item.index) {
            this.tableListData2.splice(i, 1)
          }
        })
      })
    },
    clearDiolog() {
      this.active = 0
      this.addVersionDiolog = false
      this.form = {}
    },

    getTableList() {
      this.tableLoading = true
      const parms = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.formData
      }
      getSupplierPerforManceModelPage(parms).then((res) => {
        if (res.code == '200') {
          this.tableLoading = false
          this.tableListData = res.data
          this.page.totalCount = res.total
        } else {
          this.tableLoading = false
        }
      })
    },
    //导出文件
    async exportFile() {
      getTemplate().then(res => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialogButon {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

.link {
  color: #1763f7;
  cursor: pointer;
}
</style>
