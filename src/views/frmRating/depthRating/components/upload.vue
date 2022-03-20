<template>
  <!--附件上传-->
  <iDialog :title="$t('SUPPLIER_FUJIANSHANGCHUAN')"
           :visible.sync="value"
           width="90%"
           @close="clearDiolog">
    <div class="content">
      <div class="flex-align-center navBtn">
        <!--删除-->
        <iButton class="margin-right10"
                 @click="depAttachmentDel">{{ $t('LK_SHANCHU') }}</iButton>
        <!--附件上传-->
        <el-upload class="upload"
                   :show-file-list="false"
                   name="multipartFile"
                   with-credentials
                   :on-success="handleAvatarSuccess"
                   :http-request="myUpload">
          <iButton>{{ $t('LK_SHANGCHUANFUJIAN') }}</iButton>
        </el-upload>
      </div>
      <tableList :tableData="tableListData"
                 :tableTitle="tableTitle"
                 :tableLoading="tableLoading"
                 :index="true"
                 @handleSelectionChange="handleSelectionChange">
        <template #name="scope">
          <span @click="downFile(scope.row.fileId)"
                class="down">{{scope.row.name}}</span>
        </template>
      </tableList>
      <iPagination v-update
                   @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page='page.currPage'
                   :total="page.totalCount" />
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iPagination, iMessage } from 'rise';
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import { uploadTitle } from './data';
import { depAttachmentPage, depAttachmentInfo, depAttachmentDel } from '@/api/frmRating/depthRating';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import { downloadUdFile } from '@/api/file';
export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iDialog,
    iButton,
    iPagination,
    tableList,
  },
  props: {
    value: {
      type: Boolean
    },
  },
  data () {
    return {
      tableListData: [],
      tableTitle: uploadTitle,
      tableLoading: false,
      deepCommentSupplierId: "",
      currentSelect: []
    };
  },
  methods: {
    handleSelectionChange (currentSelect) {
      this.currentSelect = currentSelect
    },
    clearDiolog () {
      this.$emit('input', false);
    },
    getTableList (id) {
      if (!this.deepCommentSupplierId) this.deepCommentSupplierId = id
      let data = {
        deepCommentSupplierId: this.deepCommentSupplierId,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      depAttachmentPage(data).then(res => {
        if (res.data) {
          this.page.currPage = res.pageNum;
          this.page.totalCount = res.total;
          this.tableListData = res.data
        }
      })
    },
    //上传
    async myUpload (content) {
      try {
        this.tableLoading = true
        const formData = new FormData();
        formData.append('file', content.file);
        formData.append('deepCommentSupplierId', this.deepCommentSupplierId);
        const res = await depAttachmentInfo(formData);
        this.tableLoading = false
        this.resultMessage(res, () => {
          this.getTableList()
        })
      } catch (e) {
        //
      }
    },
    // 删除
    depAttachmentDel () {
      if (this.currentSelect.length < 1) {
        return iMessage.warn(this.language("QZSXZYTSJ", "请至少选中一条数据"));
      }
      let ids = []
      this.currentSelect.map(res => {
        ids.push(res.id)
      })
      depAttachmentDel({ ids: ids }).then(res => {
        this.resultMessage(res, () => {
          this.getTableList()
        })
      })
    },
    // 下载
    downFile (fileId) {
      // const req = {
      // 	applicationName: 'rise',
      // 	fileList: [fileName]
      // }
      downloadUdFile(fileId)
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 20px;
}
.navBtn {
  justify-content: flex-end;
  margin-bottom: 20px;
}
.down {
  color: $color-blue;
  text-decoration: underline;
  cursor: pointer;
}
.margin-right10 {
  margin-right: 10px;
}
</style>
