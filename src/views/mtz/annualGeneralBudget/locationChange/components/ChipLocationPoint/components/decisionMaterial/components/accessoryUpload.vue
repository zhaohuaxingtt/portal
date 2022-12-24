<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:46:11
 * @LastEditTime: 2022-12-24 13:02:16
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 附件上传
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\ChipLocationPoint\components\decisionMaterial\components\accessoryUpload.vue
-->
<template>
  <div>
    <iCard class="margin-top20">
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language('FUJIANXIANGQING', '附件详情') }}</p>
        <span class="buttonBox">
          <iButton
            @click="handleClickDel"
            v-permission="PORTAL_CHIP_POINT_JUECEDATA_SHANCHU"
            v-if="appStatus == '草稿' || appStatus == '未通过'"
            >{{ language('SHANCHU', '删除') }}</iButton
          >
          <uploadButton
            class="margin-left10"
            v-permission="PORTAL_CHIP_POINT_JUECEDATA_SHANGCHUAN"
            ref="uploadButtonAttachment"
            :buttonText="language('SHANGCHUAN', '上传')"
            @uploadedCallback="uploadSuccess"
          />
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
        <template slot="attachmentName" slot-scope="scope">
          <p class="openPage" @click="openPage(scope.row)">
            {{ scope.row.attachmentName }}
          </p>
        </template>
      </tableList>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iMessage, iMessageBox } from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { uploadTableTitle } from './data'
import {
  deleteAtta,
  saveAtta,
  getAtta
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import uploadButton from '@/components/uploadButton'
import { uploads, uploadAttach } from '@/api/file/upload'
export default {
  components: {
    iCard,
    iButton,
    tableList,
    uploadButton
  },
  props: ['appStatus'],
  data() {
    return {
      tableListData: [],
      uploadTableTitle,
      loading: false,
      selection: [],
      uploadUrl: process.env.VUE_APP_COMMON + '/upload',
      uploadData: {
        appId: '',
        userId: '',
        userName: ''
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.permission.userInfo
    }
  },
  created() {
    this.uploadData = {
      appId: this.$route.query.appId,
      userId: this.userInfo.id,
      userName: this.userInfo.nameZh
    }
    this.$nextTick((e) => {
      this.getTableData()
    })
  },
  methods: {
    openPage(val) {
      let link = document.createElement('a')
      link.href = val.filePath
      let fname = val.attachmentName
      link.setAttribute('download', fname)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      iMessage.success('下载成功！')
    },
    uploadSuccess(data) {
      console.log(data)
      if (data) {
        saveAtta({
          appId: this.$route.query.appId,
          fileId: data.id,
          fileType: 2 // 申请单审批附件
        }).then((res) => {
          console.log(res)
          if (res?.code == '200') {
            iMessage.success('上传成功')
            this.getTableData()
          }
        })
      }
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
      getAtta({
        appId: this.$route.query.appId,
        fileType: 2
      })
        .then((res) => {
          if (res && res.code == 200) {
            this.tableListData = res.data
            this.loading = false
          } else {
            iMessage.error(res.desZh)
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 点击确定查询
    handleSubmitSearch() {
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
        deleteAtta(this.selection.map((item) => item.attachmentId)).then(
          (res) => {
            if (res && res.code == 200) {
              iMessage.success(res.desZh)
              this.getTableData()
            } else iMessage.error(res.desZh)
          }
        )
      })
    }
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
