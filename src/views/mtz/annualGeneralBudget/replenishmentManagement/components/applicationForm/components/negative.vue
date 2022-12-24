<template>
  <div style="padding-bottom: 5px">
    <el-input
      type="textarea"
      :rows="8"
      placeholder="请输入拒绝原因…"
      v-model="textarea"
    ></el-input>
    <el-divider class="margin-top20"></el-divider>
    <div class="BtnTitle">
      <span>上传附件</span>
      <div>
        <iButton @click="del">{{ language('SHANCHU', '删除') }}</iButton>
        <el-upload
          class="upload-demo"
          multiple
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
          <el-tooltip content="文件大小不超过20MB" placement="bottom">
            <iButton>{{ language('SHANGCHUANFUJIAN', '上传附件') }}</iButton>
          </el-tooltip>
        </el-upload>
      </div>
    </div>
    <tableList
      class="margin-top20"
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="loading"
      v-on:handleSelectionChange="handleSelectionChange"
      :index="true"
    >
    </tableList>
    <div class="BtnTitle">
      <span></span>
      <div>
        <iButton @click="funReturn">{{ language('FANHUI', '返回') }}</iButton>
        <iButton @click="funBingo">{{ language('QUEREN', '确认') }}</iButton>
      </div>
    </div>
  </div>
</template>

<script>
import { iButton, iMessageBox, iMessage } from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { tableTitleNegative } from './data'
import {
  getRejectReasonAndFile,
  deleteRejectReasonAttach,
  saveRejectReason
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details'
import { getToken } from '@/utils'
export default {
  name: 'negative',
  props: ['mtzDocId'],
  components: {
    iButton,
    tableList
  },
  data() {
    return {
      uploadUrl:
        process.env.VUE_APP_MTZ +
        '/web/mtz' +
        '/mtzBalance/uploadRejectReasonAttach',
      uploadForm: {},
      textarea: '',
      tableListData: [],
      tableTitle: tableTitleNegative,
      loading: true,
      uploadData: {},
      delAray: []
    }
  },
  created() {
    this.uploadData = {
      mtzDocId: this.mtzDocId,
      userId: JSON.parse(window.sessionStorage.getItem('userInfo')).id,
      userName: JSON.parse(window.sessionStorage.getItem('userInfo')).userName
    }
    this.getData()
  },
  methods: {
    getToken,
    handleSelectionChange(val) {
      var delAray = []
      val.forEach((e) => {
        delAray.push(e.fileId)
      })
      this.delAray = delAray
    },
    getData() {
      this.loading = true
      getRejectReasonAndFile(this.mtzDocId)
        .then((res) => {
          this.textarea = res.data.rejectReason
          this.tableListData = res.data.fileList
        })
        .then((red) => {
          this.loading = false
        })
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 20MB!')
      }
      return isLt2M
    },
    uploadSuccess(res, file) {
      this.getData()
    },
    funReturn() {
      this.$emit('closeTc', '')
    },
    funBingo() {
      saveRejectReason({
        id: this.mtzDocId,
        rejectReason: this.textarea
      }).then((res) => {
        iMessage.success(res.data)
        this.$emit('closeTc', '')
      })
    },
    del() {
      if (this.delAray.length < 1) {
        iMessage.warning('请选择需要删除的信息附件。')
      } else {
        iMessageBox(`是否删除？`)
          .then(() => {
            deleteRejectReasonAttach({
              fileIdList: this.delAray
            }).then((res) => {
              iMessage.success('删除成功！')
              this.getData()
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
$tabsInforHeight: 35px;

.BtnTitle {
  margin-top: 30px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    font-size: 18px;
    font-weight: bold;
  }
  div {
    display: flex;
  }
}
.tabsBoxInfor {
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  .inforDiv {
    width: 27%;
    height: $tabsInforHeight;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
    span {
    }
    .inforText {
      width: 60%;
      background: #f8f8fa;
      text-align: center;
      height: $tabsInforHeight;
      line-height: $tabsInforHeight;
    }
  }
}
.tableTitle {
  display: inline;
  font-weight: bold;
  font-size: 16px;
  color: #000;
  margin: 0 10px;
}
button {
  float: right;
  z-index: 100;
  margin-bottom: 20px;
  margin-left: 10px;
}
</style>
