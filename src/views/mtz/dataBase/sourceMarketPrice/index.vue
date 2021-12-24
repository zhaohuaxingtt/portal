<template>
  <div class="mtz-select">
    <i-search @sure="handleSubmitSearch"
              @reset="handleSearchReset">
      <el-form>
        <el-form-item v-for="(item,index) in queryFormData"
                      :key="index"
                      :label="language(item.key,item.name)"
                      class="SearchOption">
          <custom-select v-model="searchForm[item.props]"
                         :user-options="dropDownData[item.dropDownTitle]"
                         multiple
                         filterable
                         collapse-tags
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
          <!-- <i-select
          multiple
          filterable
          collapse-tags
          v-model="searchForm[item.props]"
          :placeholder="language('QINGXUANZE', '请选择')">
            <el-option
            v-for="(x, ci) in dropDownData[item.dropDownTitle]" 
            :key="ci"
            :label="x"
            :value="x">
            </el-option>
          </i-select> -->
          <!-- <custom-select 
          v-model="searchForm[item.props]"
          :user-options="dropDownData[item.dropDownTitle]"
          multiple
          filterable
          collapse-tags
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="existShareNum"
          value-member="existShareId"
          value-key="existShareId" /> -->
        </el-form-item>
      </el-form>
    </i-search>

    <iCard class="OrganizationTable">
      <div class="export">
        <div class="tt">
          {{language('SHICHANGJIALAIYUANXIANGQING','市场价来源详情')}}
        </div>
        <div>
          <uploadButton style="marginLeft: 10px;"
                        ref="uploadButton"
                        :buttonText="language('SHANGCHUAN', '上传')"
                        :uploadByBusiness="true"
                        :hideButton="true"
                        :accept="'.xlsx'"
                        @uploadedCallback="handleUpload($event)" />
          <iButton v-if="!editMode"
                   @click="handleManualSync">{{language('SHOUGONGTONGBUSHUJU','手工同步数据')}}</iButton>
          <iButton v-if="!editMode"
                   @click="handleClickUpload">{{language('SHANGCHUAN','上传')}}</iButton>
          <iButton v-if="!editMode"
                   @click="handleEdit">{{language('BIANJI','编辑')}}</iButton>
          <iButton v-if="!editMode"
                   @click="handleExport">{{language('DAOCHU','导出')}}</iButton>
          <iButton v-if="editMode"
                   @click="handleSave">{{language('BAOCUN','保存')}}</iButton>
          <iButton v-if="editMode"
                   @click="handleCancel">{{language('QUXIAO','取消')}}</iButton>
        </div>
      </div>
      <div>
        <tableList :tableData="tableListData"
                   :tableTitle="tableSetting"
                   :tableLoading="loading"
                   :index="true"
                   @handleSelectionChange="handleSelectionChange">
          <!-- 市场价(F) -->
          <template #marketPriceSourceTypeValue="scope">
            <iSelect v-model="scope.row.marketPriceSourceTypeValue"
                     v-if="editMode"
                     :placeholder="language('QINGXUANZE', '请选择')"
                     @change="handleChangePriceSource($event, scope.row)">
              <el-option value="手工上传"
                         :label="language('SHOUGONGSHANGCHUAN', '手工上传')"></el-option>
              <el-option value="系统自动"
                         :label="language('XITONGZIDONG', '系统自动')"></el-option>
            </iSelect>
            <p v-if="!editMode">{{scope.row.marketPriceSourceTypeValue}}</p>
          </template>
          <!-- 外部市场价来源 -->
          <template #externalMarketPriceSource="scope">
            <iSelect v-if="editMode"
                     filterable
                     v-model="scope.row.externalMarketPriceSource"
                     :placeholder="language('QINGXUANZE', '请选择')">
              <el-option v-for="item in externalMaterialSelectList"
                         :key="item.externalMarketPriceSource"
                         :value="item.externalMarketPriceSource"
                         :label="item.externalMarketPriceSource">
              </el-option>
            </iSelect>
            <p v-if="!editMode">{{scope.row.externalMaterialCode}}</p>
          </template>
          <!-- 外部来源对应牌号 -->
          <template #externalMaterialCode="scope">
            <!-- <iInput v-if="editMode"
                    v-model="scope.row.externalMaterialCode"
                    :placeholder="language('QINGSHURU', '请输入')" />
            <p v-if="!editMode">{{scope.row.externalMaterialCode}}</p> -->
            <iSelect v-if="editMode"
                     filterable
                     v-model="scope.row.externalMaterialCode"
                     :placeholder="language('QINGXUANZE', '请选择')">
              <el-option v-for="item in externalMaterialSelectList"
                         :key="item.externalMaterialCode"
                         :value="item.externalMaterialCode"
                         :label="item.externalMaterialCode">
              </el-option>
            </iSelect>
          </template>
          <!-- 取价规则 -->
          <!-- <template #prPriceSourceTypeValue="scope">
            <div class="priceRuleDropDownData">
              <iSelect
              style="width: 450px;"
              v-if="editMode"
              v-model="scope.row.prPriceSourceTypeValue"
              :placeholder="language('QINGXUANZE', '请选择')">
                <el-option 
                v-for="(item, index) in priceRuleDropDownData" 
                :key="index" 
                :value="item.code" 
                :label="item.message">
                </el-option>
              </iSelect>
            </div>
            <p v-if="!editMode">{{scope.row.prPriceSourceTypeValue}}</p>
          </template> -->
        </tableList>
        <!-- 分页标签 -->
        <iPagination v-update
                     @size-change="handleSizeChange($event, handleSubmitSearch)"
                     @current-change="handleCurrentChange($event, getTableData)"
                     background
                     :current-page="page.currPage"
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :total="page.totalCount">
        </iPagination>
      </div>
    </iCard>
  </div>
</template>

<script>
import {
  iSearch,
  iInput,
  iSelect,
  iPage,
  iCard,
  iButton,
  iPagination,
  iMessage
} from 'rise'
import tableList from '@/components/commonTable/index.vue'
import uploadButton from '@/components/uploadButton'
import { pageMixins } from '@/utils/pageMixins'
import { tableSetting, queryFormData } from './components/data'
import {
  fetchTableData,
  fetchDropDownData,
  fetchManualSync,
  fetchExport,
  fetchUpload,
  fetchEdit,
  fetchPriceRule,
  externalMaterialSelect
} from '@/api/mtz/database/sourceMarketPrice'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iPage,
    iCard,
    iButton,
    iPagination,
    tableList,
    uploadButton
  },
  mixins: [pageMixins],
  created () {
    this.initDropDown()
    this.externalMaterialSelect()
    this.initSearchData()
    this.getPriceRule()
    this.$nextTick(() => {
      this.getTableData()
    })
  },
  data () {
    return {
      searchForm: {}, //表单数据
      dropDownData: {},
      tableListData: [], //表格数据
      tableSetting,
      queryFormData,
      loading: false,
      editMode: false,
      backupData: [],
      priceRuleDropDownData: [],
      externalMaterialSelectList: []
    }
  },
  methods: {
    // 初始化下拉
    initDropDown () {
      this.queryFormData.map((item) => {
        this.$set(this.dropDownData, item['dropDownTitle'], [])
      })
      this.getDropDownData()
    },
    // 初始化检索条件
    initSearchData () {
      for (const key in this.searchForm) {
        this.searchForm[key] = []
      }
    },
    // 获取列表数据
    getTableData () {
      this.loading = true
      fetchTableData({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.searchForm
      }).then((res) => {
        this.loading = false
        if (res && res.code == 200) {
          this.tableListData = res.data
          this.page.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 获取筛选项数据
    getDropDownData () {
      this.dropDownData.dropDownMarketPriceSourceTypeData = [
        { message: '手工上传', code: 1 },
        { message: '系统自动', code: 2 }
      ]
      fetchDropDownData().then((res) => {
        if (res && res.code == 200) {
          for (let key in res.data) {
            switch (key) {
              case 'parentMaterialCategoryCodeList':
                // 原材料大类编号
                this.$set(
                  this.dropDownData,
                  'dropDownParentMaterialCategoryCodeData',
                  res.data[key]
                )
                break

              case 'externalMarketPriceSourceList':
                // 外部市场价来源
                this.$set(
                  this.dropDownData,
                  'dropDownExternalMarketPriceSourceData',
                  res.data[key]
                )
                break

              case 'materialCodeList':
                // 原材料牌号
                this.$set(
                  this.dropDownData,
                  'dropDownMaterialCodeData',
                  res.data[key]
                )
                break

              case 'materialElementShortList':
                // 材料大类-元素简称
                this.$set(
                  this.dropDownData,
                  'dropDownMaterialElementShortData',
                  res.data[key]
                )
                break

              case 'materialNameList':
                // 牌号名称
                this.$set(
                  this.dropDownData,
                  'dropDownMaterialNameData',
                  res.data[key]
                )
                break

              case 'materialCategoryCodeList':
                // 材料中类名称-中文
                this.$set(
                  this.dropDownData,
                  'dropDownMaterialNameZhData',
                  res.data[key]
                )
                break
              case 'materialCategoryDescList':
                // 材料中类描述
                this.$set(
                  this.dropDownData,
                  'dropDownMaterialCategoryDescData',
                  res.data[key]
                )
                break
              default:
                break
            }
          }
          console.log(this.dropDownData)
          console.log(res.data)
        } else iMessage.error(res.desZh)
      })
    },
    // 点击确定查询
    handleSubmitSearch (val) {
      this.page.currPage = 1
      this.getTableData()
    },
    // 点击重置查询
    handleSearchReset () {
      this.page.pageSize = 10
      this.initSearchData()
      this.handleSubmitSearch()
    },
    // 手工同步数据
    handleManualSync () {
      fetchManualSync().then((res) => {
        if (res && res.code) {
          iMessage.success(res.desZh)
          this.handleSubmitSearch()
        } else iMessage.error(res.desZh)
      })
    },
    // 点击上传
    handleClickUpload () {
      this.$refs.uploadButton.$refs.upload.$refs['upload-inner'].handleClick()
    },
    // 上传文件
    handleUpload (content) {
      let formdata = new FormData()
      formdata.append('file', content.file)
      formdata.append('userId', this.$store.state.permission.userInfo.id)
      fetchUpload(formdata).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.handleSubmitSearch()
        } else iMessage.error(res.desZh)
      })
    },
    // 编辑
    handleEdit () {
      this.editMode = true
      this.backupData = window._.cloneDeep(this.tableListData)
    },
    // 保存编辑
    handleSave () {
      if (
        this.tableListData.find(
          (item) =>
            item.marketPriceSourceTypeValue == '系统自动' &&
            !item.externalMarketPriceSource
        )
      ) {
        return iMessage.warn(
          this.language('QXZWBSCJLY', '请选择外部市场价来源')
        )
      }
      this.editMode = false
      fetchEdit(this.tableListData).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
    // 取消
    handleCancel () {
      this.editMode = false
      this.tableListData = window._.cloneDeep(this.backupData)
    },
    // 导出
    handleExport () {
      fetchExport(this.searchForm).then((res) => {
        if (res && res.code != 200) {
          iMessage.error(res.desZh)
        }
      })
    },
    // 取价规则
    getPriceRule () {
      fetchPriceRule().then((res) => {
        if (res && res.code == 200) {
          this.priceRuleDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 编辑状态-改变市场价事件
    handleChangePriceSource (val, row) {
      if (val == '手工上传') {
        this.$set(row, 'externalMarketPriceSource', null)
        // row.externalMarketPriceSource
      }
    },
    externalMaterialSelect () {
      externalMaterialSelect().then(res => {
        this.externalMaterialSelectList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.OrganizationTable {
  margin-top: 20px;
}
.export {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .tt {
    font-size: 18px;
    font-weight: bold;
  }
}
.SearchOption {
  margin-bottom: 20px !important;
}
.open-link-text {
  text-decoration: underline;
}
.mtz-select {
  margin-top: 25px;
}
::v-deep.customClass {
  .open-link-text {
    text-decoration: underline;
  }
}
.priceRuleDropDownData {
  width: 100%;
}
::v-deep .el-table .el-table__row .el-input {
  width: auto !important;
}
</style>
