<template>
  <!--查看模型-->
  <iDialog :title="$t('SPR_FRM_FRMGL_CKMX')"
           :visible.sync="value"
           width="90%"
           @close="clearDiolog"
           :close-on-click-modal="false">
    <div class="content">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <!--保存-->
          <iButton @click="saveInitialCommentModel(true, true)"
                   :loading="saveButtonLoading"
                   v-permission="PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_MODEL_SAVE">{{
              $t('LK_BAOCUN')
            }}
          </iButton>
          <!--新增-->
          <iButton @click="addTableItem" v-permission="PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_MODEL_ADD">{{ $t('LK_XINZENG') }}</iButton>
          <!--删除-->
          <iButton @click="handleDeleteButtonClick" v-permission="PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_MODEL_DEL">{{
            $t('delete')
          }}</iButton>
          <!-- <el-popconfirm
              :title="$t('LK_SHIFOUQUERENSHANCHU')"
              @confirm="handleDeleteButtonClick"
          >
            <iButton slot="reference" class="margin-left10">{{ $t('delete') }}</iButton>
          </el-popconfirm> -->
        </div>
      </div>
      <tableList :tableData="tableListData"
                 :tableTitle="tableTitle"
                 :tableLoading="tableLoading"
                 :index="true"
                 @handleSelectionChange="handleSelectionChange"
                 :selectProps="['supplierType', 'modelType']"
                 :inputProps="['modelName']"
                 customSelectValueKey="name"
                 :selectPropsOptionsObject="selectPropsOptionsObject">
        <template #upload="scope">
          <uploadButton v-if="scope.row.id"
                        :uploadButtonLoading="uploadButtonLoading"
                        @uploadedCallback="handleUploadedCallback($event,scope.row)"
                        button-text="LK_SHANGCHUAN" />
        </template>
        <template #download="scope">
          <div class="link"
               @click="handleFileDownload(scope.row)"
               v-if="scope.row.id">
            {{ $t('LK_XIAZAI') }}
          </div>
        </template>
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise';
import tableList from '@/components/commonTable';
import { viewModelTableTitle } from './data';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins';
import uploadButton from './viewModelUploadButton';
import { downloadFile, downloadUdFile } from '@/api/file';
import { getInitialCommentModelList } from '../../../../api/frmRating/frmIntegratedManagement';
import { selectDictByKeys } from '@/api/dictionary';
import {
  uploadInitialCommentModelExcel,
  saveInitialCommentModel,
  deleteInitialCommentModel,
} from '../../../../api/frmRating/frmIntegratedManagement';
import { NewMessageBox,NewMessageBoxClose } from '@/components/newMessageBox/dialogReset.js'

export default {
  mixins: [generalPageMixins],
  components: {
    iDialog,
    iButton,
    tableList,
    uploadButton,
  },
  props: {
    value: { type: Boolean },
  },
  data () {
    return {
      tableListData: [],
      tableTitle: viewModelTableTitle,
      tableLoading: false,
      selectTableData: [],
      selectPropsOptionsObject: {},
      saveButtonLoading: false,
      uploadButtonLoading:false
    };
  },
  methods: {
    clearDiolog () {
      this.$emit('input', false);
    },
    handleSelectionChange (val) {
      this.selectTableData = val;
    },
    async getTableList () {
      this.tableLoading = true;
      this.tableListData = [];
      try {
        const req = {
          pageNo: 1,
          pageSize: 999,
        };
        const res = await getInitialCommentModelList(req);
        if (res.result) {
          this.tableListData = res.data.modelList;
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    async handleUploadedCallback (content, row) {
      this.uploadButtonLoading = true
      const formData = new FormData();
      formData.append('file', content.file);
      formData.append('id', row.id);
      formData.append('modelType', row.modelType);
      const res = await uploadInitialCommentModelExcel(formData);
      this.uploadButtonLoading = false
      this.resultMessage(res, () => {
        this.saveInitialCommentModel();
      });
    },
    async handleFileDownload (row) {
      console.log(row)

      // eslint-disable-next-line no-undef
      await downloadUdFile(row.fileId);
    },
    async getAllSelectList () {
      const data = [
        'purchase_supplier_type',
        'model_type',
      ];
      let req = 'keys=';
      req = req + data.join('&keys=');
      const res = await selectDictByKeys(req);
      this.selectPropsOptionsObject = {
        'supplierType': res.data.purchase_supplier_type,
        'modelType': res.data.model_type,
      };
    },
    async saveInitialCommentModel (showMesaage = false, showButtonLoading = false) {
      if (showButtonLoading) {
        this.saveButtonLoading = true;
      }
      const req = {
        modelDTOList: this.tableListData,
      };
      const res = await saveInitialCommentModel(req);
      if (showMesaage) {
        this.resultMessage(res, () => {
          this.getTableList();
        });
      } else {
        this.getTableList();
      }
      this.saveButtonLoading = false;
    },
    handleDeleteButtonClick () {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'));
      }

      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIFOUSHANCHU', '是否删除？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认'),
      }).then(() => {
        try {
          this.tableLoading = true;
          let ids = [], times = [];
          this.selectTableData.map(item => {
            if (item.id) {
              ids.push(item.id);
            }
            if (item.time) {
              times.push(item.time);
            }
          });
          if (times.length !== 0) {
            this.tableListData = this.tableListData.filter(item => {
              return !times.includes(item.time);
            });
            if (ids.length === 0) {
              iMessage.success(this.$t('LK_CAOZUOCHENGGONG'));
            }
          }
          if (ids.length !== 0) {
            const req = {
              ids: ids,
            };
            deleteInitialCommentModel(req).then(res => {
              this.resultMessage(res, () => {
                this.tableListData = this.tableListData.filter(item => {
                  return !ids.includes(item.id);
                });
              });
            });
          }
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }).catch(() => {

      })
    },
    checkSelect () {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'));
      }
    },
  },
  watch: {
    value (val) {
      if (val) {
        this.getAllSelectList();
        this.getTableList();
      }
    },
  },
  destroyed () {
    NewMessageBoxClose();
  }
};
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 20px;
}

::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}

.link {
  color: $color-blue;
  text-decoration: underline;
}
</style>
