<template>
  <iDialog
    :visible.sync="isView"
    width="800px"
    class="alarmList"
    :before-close="handleDialog"
  >
    <div slot="title" class="header">
      <span class="title">{{ language('报警信', '报警信') }}</span>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60"> </el-table-column>
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column label="文件名" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="downFile(scope.row)">{{
            scope.row.fileName
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="fileSize"
        :label="language('DAXIAO_B', '大小 (B)')"
      >
      </el-table-column>
      <el-table-column
        prop="uploadBy"
        :label="language('SHANGCHUANREN', '上传人')"
      >
      </el-table-column>
    </el-table>
  </iDialog>
</template>

<script>
import { iCard, iButton, iMessage, iDialog } from 'rise'
import uploadButton from '@/components/uploadButton'

import { getLetterFileList } from '@/api/capacityManagement/index.js'
import { download } from '@/utils/downloadUtil'
export default {
  data() {
    return {
      mtzAppId: '',
      loading: false,
      tableData: [],
      mutileList: []
    }
  },
  components: {
    iCard,
    uploadButton,
    iButton,
    iDialog
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  props: {
    isView: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleDialog() {
      this.$emit('update:isView', false)
    },
    init() {
      this.getLetterFileList()
    },
    getLetterFileList() {
      const row = JSON.parse(this.$route.query.row)
      let letterId = row.id
      let type = 1
      if (row.source == 'CAPACITY_RED_LIGHT') {
        // 其它,待发送报警信页面跳转过来携带的是warningLetterId
        letterId = row.id
        type = 1
      } else if (row.source == 'OTHER') {
        // 其它,待发送报警信页面跳转过来携带的是warningLetterId
        letterId = row.id || row.warningLetterId
        type = 2
      } else if (!row.source) {
        // Ntier 事件跳转进来
        letterId = this.$route.query.id
        type = 3
      }
      getLetterFileList({ letterId, type }).then((res) => {
        if (res?.code == '200') {
          this.tableData = res.data || []
          this.$emit('checkPdf', this.tableData.length)
        }
      })
    },
    handleSelectionChange(val) {
      this.mutileList = val
    },
    downFile(val) {
      let url = `${origin}/fileApi/fileud/getFileByFileId?fileId=${val.uploadId}`
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.alarmList {
  ::v-deep .el-dialog {
    padding-bottom: 25px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    align-items: center;
    .title {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>