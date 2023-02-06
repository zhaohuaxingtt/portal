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
          <iSelect
            clearable
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="formData.businessType"
          >
            <el-option
              v-for="(j, index) in infoList"
              :key="index"
              :value="j.id"
              :label="j.nameZh"
            >
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_ZHUANGTAI')">
          <iSelect
            clearable
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="formData.status"
          >
            <el-option
              v-for="(j, index) in infoList"
              :key="index"
              :value="j.id"
              :label="j.nameZh"
            >
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard style="margin-top: 20px">
      <template #header-control>
        <iButton @click="initiate">供应商导入模板下载</iButton>
        <iButton @click="update">CS科室打分权重设置</iButton>
        <iButton @click="exportFile">定时规则设置</iButton>
        <iButton @click="addVersion">创建版本</iButton>
      </template>
      <tableList
        border
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
      >
      </tableList>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <iDialog
      append-to-body
      :title="$t('创建绩效版本')"
      :visible.sync="addVersionDiolog"
      width="60%"
      @close="clearDiolog"
    >
      <el-steps align-center :active="active">
        <el-step title="基本信息"></el-step>
        <el-step title="确认统计周期"></el-step>
        <el-step title="确认供应商范围"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :disabled="active == 3"
        style="margin-top: 20px"
        :label-position="'left'"
        label-width="120px"
      >
        <el-form-item v-if="active == 0 || active == 3" :label="$t('标题：')">
          <i-input
            style="width: 200px"
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form.versionName"
          >
          </i-input>
        </el-form-item>
        <el-form-item
          v-if="active == 0 || active == 3"
          :label="$t('数据日期：')"
        >
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.dataTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          v-if="active == 0 || active == 3"
          :label="$t('绩效模型版本：')"
        >
          <i-input
            style="width: 200px"
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form.modelVersion"
          >
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
        <el-form-item
          v-if="active == 0 || active == 3"
          :label="$t('截止时间：')"
        >
          <el-date-picker
            v-model="form.endDate"
            type="datetime"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="active == 1" :label="$t('统计周期：')">
          <el-date-picker
            v-model="dataTime"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div v-if="active == 2">
        <div class="dialogButon">
          <iButton @click="addSupplier">添加</iButton>
          <iButton @click="update">移除</iButton>
          <iButton @click="exportFile">模板下载</iButton>
          <iButton @click="addVersion">批量导入</iButton>
        </div>
        <tableList
          style="margin-top: 20px"
          border
          :tableData="tableListData2"
          :tableTitle="tableTitle2"
          :tableLoading="tableLoading2"
          @handle-selection-change="handleSelectionChange"
        >
        </tableList>
      </div>

      <span slot="footer" class="dialog-footer">
        <iButton @click="submit('back')">{{
          $t('SUPPLIER_SHANGYIBU')
        }}</iButton>
        <iButton @click="submit('to')">{{ $t('SUPPLIER_XIAYIBU') }}</iButton>
      </span>
    </iDialog>
    <supplier
      @addsupplier="addsupplier"
      v-if="supplierDiolog"
      v-model="supplierDiolog"
    ></supplier>
  </div>
</template>

<script>
import {
  getSupplierPerforManceModelPage,
  addSupplierPerforManceModel,
  addSupplierPerforManceModelRelation
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
      typeList: [],
      supplierDiolog: false,
      pickerOptions: pickerOptions,
      dataTime: [],
      active: 0,
      dateTime: ['2023-1-1', '2023-12-31'],
      form: {},
      addVersionDiolog: false,
      tableLoading2: false,
      tableListData2: [],
      tableTitle2: cloneDeep(tableTitle),
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
        .catch(() => {})
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
    sure() {
      console.log(this.tableTitle)
      this.getTableList()
    },
    addVersion() {
      this.addVersionDiolog = true
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
    //点击创建版本下一步
    submit(v) {
      if (v == 'to' && this.active != 3) {
        this.active = this.active + 1

        if (this.active == 1) {
          this.form.statisticsStartDate = this.dataTime[0]
          this.form.statisticsEndDate = this.dataTime[1]
          addSupplierPerforManceModel(this.form).then((res) => {
            if (res.code == '200') {
              this.tableLoading2 = true
              iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
              addSupplierPerforManceModelRelation({ modelId: res.data }).then(
                (val) => {
                  if (res.code == '200') {
                    this.tableLoading2 = false
                    this.tableListData2 = val.data
                  } else {
                    this.tableLoading2 = false
                    iMessage.error(res.desZh)
                  }
                }
              )
            } else {
              iMessage.error(res.desZh)
            }
          })
        } else {
        }
      } else if (v == 'back' && this.active != 0) {
        this.active = this.active - 1
      }
    },
    //点击创建绩效版本供应商
    addsupplier(v) {
      this.tableListData2 = [...this.tableListData2, ...v]
    },
    clearDiolog() {
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
          this.tableListData = res.data.data
          this.page.totalCount = res.data.total
        } else {
          this.tableLoading = false
        }
      })
    },
    //导出文件
    async exportFile() {
      const parms = {
        ...this.formData
      }
      exportSupplierByPage(parms)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialogButon {
  text-align: right;
}
.link {
  color: #1763f7;
  cursor: pointer;
}
</style>
