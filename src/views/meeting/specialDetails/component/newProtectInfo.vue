<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_WEIHUZILIAO')"
    :visible.sync="dialogStatusManageObj.openProtectInfoDialog"
    width="43rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm class="container-content">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        class="form"
      >
        <iFormItem prop="coverImage" class="upload" id="upload">
          <el-upload
            action="1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="httpUpload"
            :disabled="uploadLoading"
            :file-list="fileList"
            class="upload-box"
          >
            <iButton
              type="button"
              class="upload-button1"
              :loading="uploadLoading"
            >
              {{ $t('MT_QINGXUANZEWENJIAN')
              }}<span class="upload-text1"
                ><img :src="uploadIcon" class="img1"
              /></span>
            </iButton>
            <div slot="tip" class="el-upload__tip">
              {{ $t('MT_WENJIANDAXIAOZUIDAXIANZHI') }}10M
            </div>
          </el-upload>
        </iFormItem>
        <div class="container">
          <i-table-custom
            :loading="tableLoading"
            :data="tableData"
            :columns="tableColumns"
          />
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iDialog, iFormItem, iButton, iMessage } from 'rise'
import iEditForm from '@/components/iEditForm'
import uploadIcon from '@/assets/images/upload-icon.svg'
import iTableCustom from '@/components/iTableCustom'
import { uploadFile } from '@/api/meeting/type'
import {
  addThemenAttachment,
  deleteThemenAttachment
} from '@/api/meeting/details'
import { download } from '@/utils/downloadUtil'

export default {
  components: {
    iDialog,
    iFormItem,
    iEditForm,
    iButton,
    iTableCustom
  },
  props: {
    dialogStatusManageObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    meetingInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedTableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      uploadIcon,
      tableLoading: false,
      tableData: [],
      uploadLoading: false,
      currentThemen: {},
      tableColumns: [
        {
          prop: 'fileId',
          label: '序号',
          i18n: 'MT_XUHAO3',
          // width: 68,
          tooltip: false
        },
        {
          prop: 'attachmentName',
          label: '文件名称',
          i18n: 'MT_WENJIANMINGCHENG',
          align: 'left',
          // width: 300,
          tooltip: false
        },
        {
          label: '操作',
          i18n: 'MT_CAOZUO2',
          customRender: (h, scope) => {
            return h('span', [
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    color: '#67C23A'
                  },
                  class: 'el-icon-delete open-link-text',

                  on: {
                    click: () => {
                      this.deleFileInfo(scope.row)
                    }
                  }
                },
                this.$t('MT_SHANCHU')
              ),
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    color: '#67C23A'
                  },
                  class: 'open-link-text'
                },
                '|'
              ),
              h(
                'a',
                {
                  style: {
                    cursor: 'pointer',
                    color: '#67C23A'
                  },
                  class: 'el-icon-download open-link-text',
                  on: {
                    click: () => {
                      this.downLoadFileInfo(scope.row)
                    }
                  }
                },
                this.$t('MT_XIAZAI')
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.currentThemen = { ...this.selectedTableData[0] }
    this.tableData = [...this.currentThemen.attachments]
    // console.log(this.currentThemen);
    this.generateTableNum()
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error(`${this.$t('MT_WENJIANDAXIAOZUIDAXIANZHI')}10M!`)
      }
      return isLt10M
    },
    //生成序号
    generateTableNum() {
      this.tableData = this.tableData.map((item, index) => {
        return {
          ...item,
          fileId: index + 1
        }
      })
    },
    async deleFileInfo(row) {
      const data = {
        themenId: this.currentThemen.id,
        meetingId: this.meetingInfo.id,
        id: row.id
      }
      await deleteThemenAttachment(data)
        .then((res) => {
          this.tableData = [...res.attachments]
          iMessage.success(this.$t('MT_SHANCHUCHENGGONG'))
          this.generateTableNum()
        })
        .catch((err) => {
          console.log('删除失败: ' + err)
        })
    },
    //文件下载
    downLoadFileInfo(row) {
      // download({
      //   url: MOCK_FILE_URL + row.attachmentId,
      //   filename: row.attachmentName,
      //   callback: (e) => {
      //     if (!e) {
      //       iMessage.error("下载失败");
      //     }
      //   },
      // });
      download({
        fileIds: row.attachmentId,
        filename: row.attachmentName,
        callback: (e) => {
          if (!e) {
            iMessage.error(this.$t('MT_XIAZAISHIBAI'))
          }
        }
      })
    },
    createAnchorLink(href, filename = '') {
      const a = document.createElement('a')
      a.download = filename
      a.setAttribute('crossOrigin', 'anonymous')
      a.href = href
      document.body.appendChild(a)
      a.click()
      a.remove()
      // let $eleForm = document.createElement("form");
      // $eleForm.setAttribute("action", href);
      // $eleForm.setAttribute("method", "get");
      // document.body.append($eleForm);
      // //提交表单，实现下载
      // $eleForm.submit();
    },
    //文件上传
    async httpUpload(content) {
      this.uploadLoading = true
      let formData = new FormData()
      // formData.append("file", content.file);
      formData.append('multifile', content.file)
      formData.append('applicationName', 111)
      formData.append('businessId', 8025)
      formData.append('currentUserId', -1)
      formData.append('type', 1)
      await uploadFile(formData)
        .then((res) => {
          return {
            ...res.data[0]
          }
        })
        .then((fileData) => {
          const nowAttachment = {
            attachmentId: fileData.id,
            attachmentName: fileData.name,
            attachmentUrl: fileData.path
          }
          const data = {
            themenId: this.currentThemen.id,
            attachment: nowAttachment,
            meetingId: this.meetingInfo.id
          }
          addThemenAttachment(data).then((res) => {
            this.tableData = [...res.attachments]
            this.generateTableNum()
            iMessage.success(this.$t('MT_SHANGCHUANCHENGGONG'))
          })
        })
        .catch((err) => {
          iMessage.error('上传失败 ' + err)
        })
      this.uploadLoading = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    close() {
      this.$emit('input', false)
      this.$emit('flushTable')
    }
  }
}
</script>

<style scoped lang="scss">
/* ::v-deep .open-link-text {
  color: #67C23A;
} */
.container-content {
  padding-bottom: 40px;
  .container {
    max-height: 460px;
    overflow-y: auto;
  }
  .upload {
    .upload-box {
      display: flex;
      .upload-button1 {
        position: relative;
        display: block;
        width: 300px;
        height: 35px;
        line-height: 35px;
        padding: 0;
        color: #fff;
        background-color: #67C23A;
        flex-shrink: 0;
        flex-grow: 1;
        .upload-text1 {
          position: absolute;
          right: 15px;
          top: 3px;
          .img1 {
            width: 23.85px;
            height: 17.69px;
          }
        }
      }
      .el-upload__tip {
        /* transform: translateX(-127px); */
        /* float: right; */
        display: block;
        flex-shrink: 0;
        flex-grow: 1;
        /* width: 181px; */
        margin: 0;
        margin-left: 20px;
        text-align: left;
        font-size: 12px;
        color: #000;
        line-height: 35px;
        white-space: nowrap;
      }
    }
  }
}
</style>
