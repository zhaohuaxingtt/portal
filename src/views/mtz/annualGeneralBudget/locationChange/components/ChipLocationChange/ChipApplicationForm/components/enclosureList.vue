<!--
 * @Author: your name
 * @Date: 2021-10-27 19:27:56
 * @LastEditTime: 2022-12-24 20:25:35
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\ChipLocationChange\ChipApplicationForm\components\enclosureList.vue
-->
<template>
  <iCard>
    <template slot="header">
      <span style="font-weight: bold">
        {{ language('SHENPIFUJIAN', '审批附件') }}
      </span>
      <div>
        <iButton @click="handleClickDel" :loading="btnLoading" v-if="canEdit"
          v-permission="PORTAL_CHIP_CHANGE_DETAIL_SHANCHUSHENPIFUJIAN">{{
          language('SHANCHU', '删除')
        }}</iButton>
        <uploadButton
          ref="uploadButtonAttachment"
          :buttonText="language('SHANGCHUAN', '上传')"
          :uploadButtonLoading="btnLoading"
          v-permission="PORTAL_CHIP_CHANGE_DETAIL_SHANGCHUANSHENPIFUJIAN"
          v-if="canEdit"
          @uploadedCallback="uploadSuccess"
          class="margin-left20"
        />
      </div>
    </template>
    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60"> </el-table-column>
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column :label="$t('LK_WENJIANMINGCHENG')" width="600">
        <template slot-scope="scope">
          <el-button type="text" @click="downFile(scope.row)">{{
            scope.row.attachmentName
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="updateDate" :label="$t('SUPPLIER_SHANGCHUQNRQI')">
      </el-table-column>
      <el-table-column
        prop="updateUserName"
        :label="$t('SUPPLIER_SHANGCHUANREN')"
      >
      </el-table-column>
    </el-table>
  </iCard>
</template>

<script>
import { iCard, iButton, iMessage, iMessageBox } from 'rise'
import uploadButton from '@/components/uploadButton'
import {
  attachList,
  uploadAttach,
  deleteAttach,
  getApprovalByChangeId
} from '@/api/mtz/annualGeneralBudget/chipChange'
import {
  deleteAtta,
  saveAtta,
  getAtta
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  data() {
    return {
      changeId: '',
      loading: false,
      btnLoading: false,
      tableData: [],
      mutileList: []
    }
  },
  components: {
    iCard,
    uploadButton,
    iButton
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  props: {
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    init() {
      this.changeId = this.$route.query.changeId
      this.getAttachList()
    },

    // 查询附件列表
    getAttachList() {
      this.loading = true
      getApprovalByChangeId(this.$route.query.changeId).then((res) => {
        if (res.code === '200') {
          this.tableData = res.data
          this.loading = false
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 上传
    uploadSuccess(data) {
      if (data) {
        this.btnLoading = true
        saveAtta({
          appId: this.changeId,
          fileId: data.id,
          fileType: 4 // 变更申请单审批附件
        })
          .then((res) => {
            console.log(res)
            if (res?.code == '200') {
              iMessage.success('上传成功')
              this.getAttachList()
            }
          })
          .finally(() => {
            this.btnLoading = false
          })
      }
    },
    // 点击删除
    handleClickDel() {
      if (this.mutileList.length < 1) {
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
        this.btnLoading = true
        deleteAtta(this.mutileList.map((item) => item.attachmentId))
          .then((res) => {
            if (res && res.code == 200) {
              iMessage.success(res.desZh)
              this.getAttachList()
            } else {
              iMessage.error(res.desZh)
            }
          })
          .finally(() => {
            this.btnLoading = false
          })
      })
    },
    handleSelectionChange(val) {
      this.mutileList = val
    },
    // 下载,预览
    downFile(val) {
      window.open(val.filePath)
    },
    // 下载
    openPage(val) {
      let link = document.createElement('a')
      link.href = val.filePath
      let fname = val.attachmentName
      link.setAttribute('download', fname)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      iMessage.success('下载成功！')
    }
  }
}
</script>

<style lang="sass" scoped>
</style>