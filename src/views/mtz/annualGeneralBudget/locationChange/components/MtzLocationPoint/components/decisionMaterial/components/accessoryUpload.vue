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
        <p class="headTitle">{{ language('FUJIANXIANGQING', '附件详情') }}</p>
        <span class="buttonBox">
          <!-- <uploadButton
          style="marginLeft: 10px;"
          ref="uploadButton"
          :buttonText="language('SHANGCHUAN', '上传')"
          :uploadByBusiness="true"
          :hideButton="true"
          :accept="'.xlsx'"
          @uploadedCallback="handleUpload($event)"/> -->
          <iButton
            @click="handleClickDel"
            v-if="isEditNew"
            >{{ language('SHANCHU', '删除') }}</iButton
          >
          <!-- <iButton @click="handleClickUpload" v-if="appStatus == '草稿' || appStatus == '未通过'" >{{language('SHANGCHUAN', '上传')}}</iButton> -->
          <el-upload
            v-if="isEditNew"
            class="upload-demo"
            style="margin-left: 10px"
            multiple
            accept=".xlsx"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-progress="uploadProgress"
            :data="uploadData"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :headers="{
              token: getToken()
            }"
          >
            <el-tooltip
              content="文件大小不超过20MB"
              placement="top"
              effect="light"
            >
              <iButton>{{ language('SHANGCHUAN', '上传') }}</iButton>
            </el-tooltip>
          </el-upload>
        </span>
      </div>
      <tableList
        class="margin-top20"
        :tableData="tableListData"
        :tableTitle="uploadTableTitle"
        :tableLoading="loading"
        :index="true"
        @handleSelectionChange="handleSelectionChange"
      >
        <template slot="fileName" slot-scope="scope">
          <p class="openPage" @click="openPage(scope.row)">
            {{ scope.row.fileName }}
          </p>
        </template>
      </tableList>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, handleSubmitSearch)"
        @current-change="handleCurrentChange($event, getTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iMessage, iMessageBox } from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { uploadTableTitle } from './data'
import {
  fetchAppNomiDecisionDataPage,
  fetchAppNomiDecisionDataSave,
  fetchAppNomiDecisionDataDel
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import uploadButton from '@/components/uploadButton'
import { uploads, uploadAttach } from '@/api/file/upload'
import { getToken } from '@/utils'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    uploadButton
  },
  props: ['appStatus','flowType'],
  data() {
    return {
      tableListData: [],
      uploadTableTitle,
      loading: false,
      selection: [],
      uploadUrl:
        process.env.VUE_APP_MTZ + '/web/mtz/mtzBasePriceChange/uploadAttach',
      uploadData: {
        mtzAppId: '',
        userId: '',
        userName: ''
      }
    }
  },
  computed: {
    mtzObject() {
      return this.$store.state.location.mtzObject
    },
    isEditNew: function () {
      return ((this.appStatus == '草稿' || this.appStatus == '未通过')||((this.flowType=='SIGN'||this.flowType=='FILING')&&this.appStatus=='已提交'))
    }
  },
  watch: {
    mtzObject(newVlue, oldValue) {}
  },
  created() {
    ;(this.uploadData = {
      mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
      userId: JSON.parse(window.sessionStorage.getItem('userInfo')).id,
      userName: JSON.parse(window.sessionStorage.getItem('userInfo')).nameZh
    }),
      this.$nextTick((e) => {
        this.getTableData()
      })
  },
  methods: {
    getToken,
    openPage(val) {
      let link = document.createElement('a')
      link.href = val.fileUrl
      let fname = val.fileName
      link.setAttribute('download', fname)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      iMessage.success('下载成功！')
    },
    uploadSuccess(data) {
      if (data.code == '200' && data.result) {
        iMessage.success(data.desZh)
        this.handleSubmitSearch()
        // fetchAppNomiDecisionDataSave({
        //   mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        //   fileId: data.data.fileId,
        //   fileName: data.data.fileName,
        //   fileUrl: data.data.fileUrl
        // }).then(res => {
        //   if(res && res.code == 200){
        //     iMessage.success(res.desZh)
        //     this.handleSubmitSearch()
        //   } else iMessage.error(res.desZh)
        // })
      } else return iMessage.error(data.desZh)
    },
    uploadProgress(res) {
      console.log(res)
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 20MB!')
      }
      return isLt2M
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    // 获取数据
    getTableData() {
      this.loading = true
      fetchAppNomiDecisionDataPage({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId
      }).then((res) => {
        if (res && res.code == 200) {
          this.tableListData = res.data
          this.page.totalCount = res.total
          this.loading = false
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
      if (this.selection.length < 1) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      iMessageBox(
        this.language('SHIFOUSHANCHU', '是否删除？'),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      ).then((res) => {
        fetchAppNomiDecisionDataDel({
          idList: this.selection.map((item) => item.id)
        }).then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableData()
          } else iMessage.error(res.desZh)
        })
      })
    }
    // 点击上传
    // handleClickUpload() {
    //   this.$refs.uploadButton.$refs.upload.$refs['upload-inner'].handleClick();
    // },
    // 上传文件
    // handleUpload(content) {
    // uploadAttach({multifile: content.file}).then(res=>{
    //   console.log(res);
    // })
    // uploads({
    //   multifile: content.file
    // }).then(res => {
    //   if(res && res.code == 200) {
    //     const data = res.data[0]
    //     fetchAppNomiDecisionDataSave({
    //       mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
    //       fileId: data.id,
    //       fileName: data.name,
    //       fileSize: data.size,
    //       fileUrl: data.path
    //     }).then(res => {
    //       if(res && res.code == 200){
    //         iMessage.success(res.desZh)
    //         this.handleSubmitSearch()
    //       } else iMessage.error(res.desZh)
    //     })
    //   } else iMessage.error(res.desZh)
    // })
    // },
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
    display: flex;
  }
}
.openPage {
  position: relative;
  color: $color-blue;
  font-size: 14px;
  cursor: pointer;
}
</style>
