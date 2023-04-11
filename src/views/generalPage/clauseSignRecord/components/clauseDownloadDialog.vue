<template>
  <iDialog
    :title="$t('TM_FEITIAOKUANXIAZAI')"
    :visible.sync="openDialog"
    append-to-body="true"
    width="95%"
    top="5vh"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <iTableML
      style="min-height: 50rem; margin-top: 2rem"
      tooltip-effect="light"
      :data="tableListData"
      :tableLoading="tableLoading"
    >
      <el-table-column
        :label="$t('TM_XUHAO')"
        type="index"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column show-overflow-tooltip align="center" :label="$t('TM_WENJIANMING')"
        ><template slot-scope="scope">
          <span
            class="open-link-text"
            style="margin-right: 8px"
            @click="
              handleDownloadFile(
                scope.row.attachmentId,
                scope.row.attachmentName
              )
            "
            >{{ scope.row['attachmentName'] }}</span
          >
          <span
            class="el-icon-download open-link-text"
            style="font-size: 12px"
          ></span> </template
      ></el-table-column>
      <el-table-column align="center" :label="$t('TM_SHANGCHUANRIQI')"
        ><template slot-scope="scope">
          <span>{{
            scope.row['uploadDate'] && scope.row['uploadDate'].substring(0, 10)
          }}</span>
        </template></el-table-column
      >
      <el-table-column align="center" :label="$t('TM_SHANGCHUANREN')"
        ><template slot-scope="scope">
          <span>{{ scope.row['createBy'] }}</span>
        </template></el-table-column
      >
      <el-table-column align="center" :label="$t('TM_DAXIAO')"
        ><template slot-scope="scope">
          <span>{{ scope.row['attachmentSize'] }}</span>
        </template></el-table-column
      >
    </iTableML>
  </iDialog>
</template>

<script>
import { iDialog, iMessage } from 'rise'
// import iTableCustom from "@/components/iTableCustom";
import iTableML from '@/components/iTableML'
import { getUnStandard } from '@/api/terms/terms'
import { download } from '@/utils/downloadUtil'

export default {
  components: {
    iDialog,
    iTableML
  },
  props: {
    openDialog: { type: Boolean, default: false },
    id: { type: Number, default: -1 },
    supplierId: { type: Number, default: -1 }
  },
  data() {
    return {
      tableListData: [],
      // tableListDataSub: [],
      // typeObject: {},
      // form: {
      //   termsId: this.id,
      // },
      openUploadFileDialog: false
      // supplierId: -1,
      // attachmentId: "",
      // attachmentName: "",
    }
  },
  mounted() {
    let param = {
      termsId: this.id,
      supplierId: this.supplierId,
      isExclude: false
    }
    this.query(param)
  },
  methods: {
    clearDiolog() {
      this.$emit('closeDialog', false)
    },
    query(e) {
      getUnStandard(e).then((res) => {
        this.tableListData = res.attachments
      })
    },
    handleDownloadFile(id, name) {
      download({
        fileIds: id,
        filename: name,
        callback: (e) => {
          if (!e) {
            iMessage.error(this.$t('TM_XIAZAISHIBAI'))
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
