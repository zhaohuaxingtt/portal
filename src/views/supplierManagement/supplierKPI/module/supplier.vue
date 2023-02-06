<!--
 * @Date: 2022-09-29 11:07:00
 * @LastEditors: caopeng
 * @LastEditTime: 2022-09-29 17:39:22
 * @FilePath: \front-order\src\views\ws2\productionCapacity\Bom\page\detail\components\relevancy.vue
-->
<!-- 版本对比弹窗 -->
<template>
    <iDialog :title="'供应商列表'" :visible.sync="value" width="60%" @close="clearDiolog">
      <iSearch @sure="sure" @reset="handleSearchReset">
        <el-form>
          <el-form-item :label="$t('供应商名称')">
            <i-input :placeholder="$t('partsprocure.PLEENTER')" class="margin-bottom20" v-model="formData.supplierName"> </i-input>
          </el-form-item>
          <el-form-item :label="$t('GONGYINGSHANGBIANHAO')">
            <i-input :placeholder="$t('partsprocure.PLEENTER')" class="margin-bottom20" v-model="formData.sapCode"> </i-input>
          </el-form-item>
        </el-form>
      </iSearch>
      <tableList    :tableLoading="tableLoading" ref="table" @handleSelectionChange="handleSelectionChange" style="margin: 20px 0" border :tableData="tableListData" :tableTitle="tableTitle"> </tableList>
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page="page.currPage" :total="page.totalCount" />
  
      <div class="footer" style="padding: 20px 0">
        <iButton @click="submit">{{ $t('partsignLanguage.QueRen') }}</iButton>
        <iButton @click="clearDiolog">{{ $t('QUXIAO') }}</iButton>
      </div>
    </iDialog>
  </template>
  
  <script>
  import { getBasicList} from '@/api/basic/basic'
  import { tableTitleSupplier } from './data'
  import tableList from '@/components/commonTable'
  import { iMessage, iMessageBox, iPagination, iCard, iSearch, iButton, iInput, iSelect, iDatePicker, iDialog, iMultiLineInput } from 'rise'
  import { pageMixins } from '@/utils/pageMixins'
  
  export default {
    mixins: [pageMixins],
  
    components: {
      iDialog,
      iCard,
      iPagination,
      iSearch,
      iButton,
      iInput,
      iSelect,
      iDatePicker,
      iMultiLineInput,
      tableList,
    },
    props: {
      value: { type: Boolean, default: false },
      supplierItem: { type: Object, default: () => {} },
    },
    data() {
      return {
        tableLoading: false,
        tableTitle: tableTitleSupplier,
        formData: {},
        selectTableData: [],
        tableListData: [],
      }
    },
    watch: {},
    created() {
      this.getTableList()
    },
  
    methods: {
      handleSelectionChange(val) {
        this.selectTableData = val
        console.log(this.selectTableData)
      },
      getTableList() {
        this.tableLoading = true
  
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...this.formData,
        }
        getBasicList(req).then((res) => {
          if (res.code == '200') {
            this.page.currPage = res.pageNum
            this.page.pageSize = res.pageSize
            this.page.totalCount = res.total
            this.tableLoading = false
            this.tableListData = res.data
          } else {
            this.tableLoading = false
            return iMessage.error(res.desZh)
          }
        })
      },
      sure() {
        this.getTableList()
      },
      handleSearchReset() {
        this.formData = {}
        this.getTableList()
      },
  
      submit() {
        if (this.selectTableData.length == 0) return iMessage.warn('未选择记录')
        this.clearDiolog()
        this.$emit('addsupplier',this.selectTableData)
      },
      // 关闭弹窗
      clearDiolog() {
        this.$emit('input', false)
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .footer {
    text-align: right;
  }
  </style>
  