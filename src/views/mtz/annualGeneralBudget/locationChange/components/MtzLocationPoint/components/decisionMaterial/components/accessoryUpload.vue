<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:46:11
 * @LastEditTime: 2021-11-10 11:25:19
 * @LastEditors: Please set LastEditors
 * @Description: 附件上传
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\accessory.vue
-->
<template>
  <div>
    <iCard class="margin-top20">
      <div slot="header" class="headBox">
        <p class="headTitle">{{language('FUJIANXIANGQING', '附件详情')}}</p>
        <span class="buttonBox">
          <uploadButton
          style="marginLeft: 10px;"
          ref="uploadButton"
          :buttonText="language('SHANGCHUAN', '上传')"
          :uploadByBusiness="true"
          :hideButton="true"
          :accept="'.xlsx'"
          @uploadedCallback="handleUpload($event)"/>
          <iButton @click="handleClickDel">{{language('SHANCHU', '删除')}}</iButton>
          <iButton @click="handleClickUpload">{{language('SHANGCHUAN', '上传')}}</iButton>
        </span>
      </div>
      <tableList
        class="margin-top20"
        :tableData="tableListData"
        :tableTitle="uploadTableTitle"
        :tableLoading="loading"
        :index="true"
        @handleSelectionChange="handleSelectionChange"
        openPageProps="fileName" 
        @openPage="openPage">
      </tableList>
      <iPagination
      v-update
      @size-change="handleSizeChange($event, handleSubmitSearch)"
      @current-change="handleCurrentChange($event, getTableData)"
      background 
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page='page.currPage'
      :total="page.totalCount"/>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { uploadTableTitle } from './data'
import { fetchAppNomiDecisionDataPage, fetchAppNomiDecisionDataSave, fetchAppNomiDecisionDataDel } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import uploadButton from '@/components/uploadButton';
import { uploads } from '@/api/file/upload'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    uploadButton
  },
  data () {
    return {
      tableListData: [],
      uploadTableTitle,
      loading: false,
      selection: []
    }
  },
  computed:{
      mtzObject(){
        return this.$store.state.location.mtzObject;
      }
  },
  watch: {
    mtzObject(newVlue,oldValue){
      
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    // 获取数据
    getTableData() {
      fetchAppNomiDecisionDataPage({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId
      }).then(res => {
         if(res && res.code == 200) {
          this.tableListData = res.data
          this.page.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 点击确定查询
    handleSubmitSearch() {
      this.page.currPage = 1
      this.getTableData()
    },
    // 选中项发生改变
    handleSelectionChange(val) {
      this.selection = val
    },
    // 点击删除
    handleClickDel() {
      fetchAppNomiDecisionDataDel({
        idList: this.selection.map(item => item.id)
      }).then(res => {
         if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
    // 点击上传
    handleClickUpload() {
      this.$refs.uploadButton.$refs.upload.$refs['upload-inner'].handleClick();
    },
    // 上传文件
    handleUpload(content) {
      uploads({
        multifile: content.file
      }).then(res => {
        if(res && res.code == 200) {
          const data = res.data[0]
          fetchAppNomiDecisionDataSave({
            mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
            fileId: data.id,
            fileName: data.name,
            fileSize: data.size,
            fileUrl: data.path
          }).then(res => {
            if(res && res.code == 200){
              iMessage.success(res.desZh)
              this.handleSubmitSearch()
            } else iMessage.error(res.desZh)
          })
        } else iMessage.error(res.desZh)
      })
    },
  }
}
</script>

<style lang='scss' scoped>
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
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
 
</style>
