<!--
 * @Author: your name
 * @Date: 2021-10-27 19:29:09
 * @LastEditTime: 2021-10-29 18:23:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\components\dosageDetails.vue
-->
<template>
  <div>
    <iTabsList v-model="tabsValue"
               @tab-click="tableChange"
               type="card"
               slot="components"
               calss="iTabsList">
      <el-tab-pane :name="1"
                   :label="language('WEIHULINGJIANYUANCAILIAOYONGLIANG','维护零件原材料用量')">
        <iCard>
          <template slot="header">
            <span>
              {{language('YONGLIANGXIANGQING','用量详情')}}
            </span>
            <div class="opration">
              <div v-show="!editFlag">
                <uploadButton ref="uploadButtonAttachment"
                              :buttonText="language('YONGLIANGXIANGQING','上传原材料用量变更')"
                              :uploadByBusiness="true"
                              @uploadedCallback="uploadBasePriceChange($event)"
                              class="margin-right20" />
                <iButton @click="downFile"> {{language('XIAZAIMUBAN','下载模板')}}</iButton>
                <iButton @click="del"> {{language('SHANCHU','删除')}}</iButton>
                <iButton @click="add"> {{language('XINZENG','新增')}}</iButton>
                <iButton @click="edit"> {{language('BIANJI','编辑')}}</iButton>
              </div>
              <div v-show="editFlag">
                <iButton @click="edit"> {{language('QUXIAO','取消')}}</iButton>
                <iButton @click="save"> {{language('BAOCUN','保存')}}</iButton>
              </div>
            </div>
          </template>
          <div class="table-wrapper">
            <iTableCustom :ref="'paramsTable'"
                          :loading="tableLoading"
                          :data="tableList"
                          :columns="TABLE_COLUMNS"
                          highlight-current-row
                          @handle-selection-change="handleSelectionChange">
            </iTableCustom>
            <iPagination v-update
                         @size-change="handleSizeChange($event, getBasePriceChangePageList)"
                         @current-change="handleCurrentChange($event, getBasePriceChangePageList)"
                         background
                         :current-page="page.currPage"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         :layout="page.layout"
                         :total="page.totalCount" />
          </div>
        </iCard>
      </el-tab-pane>
      <el-tab-pane :name="2"
                   :label="language('SHENPIJILU','审批记录')">
        <iCard>
          <template slot="header">
            <span>
              {{language('SHENPIXIANGQING','审批详情')}}
            </span>
            <div class="opration">
              <iButton> {{language('JIESHI','解释')}}</iButton>
            </div>
          </template>
          <div class="table-wrapper">
            <iTableCustom :ref="'SPTable'"
                          :loading="tableLoading"
                          :data="tableList"
                          :columns="TABLE_COLUMNS1"
                          highlight-current-row
                          @handle-selection-change="handleSelectionChange">
            </iTableCustom>
            <iPagination v-update
                         @size-change="handleSizeChange($event, getDictList)"
                         @current-change="handleCurrentChange($event, getDictList)"
                         background
                         :current-page="page.currPage"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         :layout="page.layout"
                         :total="page.totalCount" />
          </div>
        </iCard>
      </el-tab-pane>
    </iTabsList>
  </div>
</template>

<script>
import { iButton, iTabsList, iCard, iPagination, iMessage } from "rise";
import uploadButton from '@/components/uploadButton';
import { basePriceChangePageList, uploadBasePriceChange, priceChangeExport, basePriceChangeDelete, updateBasePriceChange } from '@/api/mtz/annualGeneralBudget/mtzChange'
import iTableCustom from '@/components/iTableCustom'
import { TABLE_COLUMNS, TABLE_COLUMNS1 } from './data'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: {
    iButton,
    iCard,
    iTabsList,
    iTableCustom,
    iPagination,
    uploadButton
  },
  mixins: [pageMixins],
  data () {
    return {
      tabsValue: 1,
      TABLE_COLUMNS,
      TABLE_COLUMNS1,
      tableList: [],
      muliteList: [],
      mtzAppId: "",
      editFlag: false,
      tableLoading: false
    }
  },
  created () {
    this.init()
  },

  watch: {

  },
  methods: {
    init () {
      this.mtzAppId = this.$route.query.mtzAppId
      this.getBasePriceChangePageList()
    },
    getBasePriceChangePageList () {
      this.tableLoading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzAppId: this.mtzAppId
      }
      basePriceChangePageList(params).then((res) => {
        if (res && res.code === '200') {
          this.tableList = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.tableList.forEach(item => {
            this.$set(item, 'editRow', false);
          })
          this.tableLoading = false
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    add () {
      let routerPath = this.$router.resolve({
        path: `/mtz/annualGeneralBudget/newMtzLocationChange`,
        query: {
          addFlag: true,
          mtzAppId: this.mtzAppId
        }
      })
      window.open(routerPath.href, '_blank')
    },
    edit () {
      if (this.muliteList.length === 0) {
        iMessage.error('请选择数据')
        return
      }
      this.muliteList.forEach(item => {
        item.editRow = true
      })
      this.editFlag = true
    },
    handleSelectionChange (val) {
      this.muliteList = val
    },
    save () {
      this.muliteList.forEach(item => {
        item.editRow = false
      })
      this.editFlag = false
      let editList = this.muliteList.map(item => {
        return {
          dosage: item.newDosage,
          endDate: item.endDate,
          id: item.id,
          startDate: item.startDate
        }
      })
      updateBasePriceChange({
        changeList: editList,
        isDeptLead: true,
        mtzAppId: this.mtzAppId
      }).then((res) => {
        this.getBasePriceChangePageList()
      })
    },
    uploadBasePriceChange (val) {
      console.log(val)
      let params = {
        multifile: val.file,
        mtzAppId: this.mtzAppId
      }
      uploadBasePriceChange(params).then((res) => {
        if (res.code === '200') {
          iMessage.success(res.desZh)
        }
      })
    },
    downFile () {
      priceChangeExport({
        mtzAppId: this.mtzAppId
      }).then(res => {

      })
    },
    del () {
      let ids = this.muliteList.map(item => {
        return item.id
      })
      let params = {
        id: ids
      }
      basePriceChangeDelete(params).then(res => {
        if (res && res.code === '200') {
          this.getBasePriceChangePageList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    }
  },

}
</script>

<style lang="sass" scoped>
</style>