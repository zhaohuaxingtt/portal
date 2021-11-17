<!--
 * @Author: your name
 * @Date: 2021-10-27 19:27:56
 * @LastEditTime: 2021-11-17 16:09:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\components\enclosureList.vue
-->
<template>
  <iCard>
    <template slot="header">
      <span style="font-weight:bold">
        {{language('SHENPIFUJIAN','审批附件')}}
      </span>
      <div>
        <iButton @click="del"
                 :disabled="disabled">{{language('SHANCHU','删除')}}</iButton>
        <uploadButton ref="uploadButtonAttachment"
                      :buttonText="language('SHANGCHUAN', '上传')"
                      :uploadByBusiness="true"
                      v-if="!isView"
                      :disabled="disabled"
                      @uploadedCallback="handleUploadForm($event)"
                      class="margin-left20" />
      </div>

    </template>
    <el-table ref="multipleTable"
              :data="tableData"
              v-loading="loading"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="60">
      </el-table-column>
      <el-table-column type="index"
                       label="#"
                       width="60">
      </el-table-column>
      <el-table-column label="文件名"
                       width="600">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="downFile(scope.row)">{{ scope.row.fileName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="uploadDate"
                       label="上传日期">
      </el-table-column>
      <el-table-column prop="uploadUser"
                       label="上传人">
      </el-table-column>
    </el-table>
  </iCard>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import uploadButton from '@/components/uploadButton';
import { attachList, uploadAttach, deleteAttach } from '@/api/mtz/annualGeneralBudget/mtzChange'
export default {
  data () {
    return {
      mtzAppId: "",
      loading: false,
      tableData: [],
      isView: false,
      mutileList: [],
      disabled: false
    }
  },
  components: {
    iCard,
    uploadButton,
    iButton
  },
  created () {
    this.init()
  },
  watch: {
    '$store.state.location.disabled': {
      handler (val) {
        console.log(val, '2222')
        this.disabled = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    init () {
      this.isView = JSON.parse(this.$route.query.isView)
      this.mtzAppId = this.$route.query.mtzAppId
      this.getAttachList()
    },
    handleUploadForm (val) {
      console.log(val)
      let params = {
        mtzAppId: this.mtzAppId,
        multifile: val.file
      }
      uploadAttach(params).then((res) => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
          this.getAttachList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    getAttachList () {
      attachList({
        mtzAppId: this.mtzAppId
      }).then(res => {
        if (res.code === '200') {
          this.tableData = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleSelectionChange (val) {
      this.mutileList = val
    },
    downFile (val) {
      window.open(val.fileUrl)
    },
    del () {
      deleteAttach({
        fileIdList: this.mutileList.map(item => item.fileId)
      }).then(res => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
          this.getAttachList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>