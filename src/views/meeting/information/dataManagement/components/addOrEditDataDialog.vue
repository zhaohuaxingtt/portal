<template>
  <iDialog
    :title="editOrAdd === 'add' ? $t('MT_TIANJIAZILIAO') : $t('MT_XIUGAIZILIAO')"
    :visible.sync="openDialog"
    width="24rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
      >
        <iFormItem label="资料类型" prop="type">
          <iLabel :label="$t('MT_ZILIAOLEIXING')" slot="label" required></iLabel>
          <iSelect v-model="ruleForm.type" :placeholder="$t('MT_QINGXUANZE')">
            <el-option
              v-for="(item, index) in dataType"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </iSelect>
        </iFormItem>

        <iFormItem label="资料标题" prop="name">
          <iLabel :label="$t('MT_ZILIAOBIAOTI')" slot="label" required></iLabel>
          <div class="form-row">
            <iInput v-model="ruleForm.name"></iInput>
          </div>
        </iFormItem>

        <div class="form-upload">
          <iFormItem label="添加附件" ref="image" prop="attachmentId">
            <iLabel :label="$t('MT_TIANJIAFUJIAN')" slot="label" required></iLabel>
            <!-- <el-upload
              action="1"
              :on-success="handleFileSuccess"
              :before-upload="beforeFileUpload"
              :on-remove="handleRemove"
              :limit="1"
              :file-list="fileList"
              :on-exceed="handleExceed"
              :http-request="httpUpload"
              :on-preview="downloadFile"
            >
              <iButton
                type="button"
                class="upload-button"
                :loading="uploadLoading"
              >
                请选择文件<span class="upload-text"
                  ><img :src="uploadIcon"
                /></span>
              </iButton>
              <div slot="tip" class="el-upload__tip">文件大小最大限制10MB</div>
            </el-upload> -->
            <div class="right-box">
              <div class="right-upload">
                <el-upload
                  action="1"
                  :accept="accept"
                  :before-upload="beforeAvatarUpload"
                  :show-file-list="false"
                  :http-request="httpUpload"
                  :disabled="uploadLoading"
                >
                  <div>
                    <iButton
                      type="button"
                      class="upload-button"
                      :disabled="uploadLoading"
                      :loading="uploadLoading"
                    >
                      {{ $t('MT_QINGXUANZEWENJIAN')
                      }}<span class="upload-text"
                        ><img :src="uploadIcon"
                      /></span>
                    </iButton>
                  </div>
                </el-upload>
                <span class="warn-text">{{ warnText }}</span>
              </div>
              <div class="el-upload__tip">
                {{ descText }}
              </div>
              <ul class="pic-list">
                <li
                  class="pic-item"
                  v-for="(item, index) in nameList"
                  :key="item + index"
                >
                  <span>{{ item.name }}</span>
                  <img
                    :src="clearDesc"
                    alt=""
                    srcset=""
                    @click="deleteItem(index)"
                  />
                </li>
              </ul>
            </div>
          </iFormItem>
        </div>
        <div class="button-list">
          <el-form-item>
            <iButton @click="close" plain class="cancel">{{
              $t('MT_QUXIAO')
            }}</iButton>
            <iButton @click="handleSubmit('ruleForm')" plain>{{
              $t('MT_BAOCUN')
            }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import {
  iDialog,
  iInput,
  iFormItem,
  iLabel,
  iButton,
  iSelect,
  iMessage
} from 'rise'
import { uploadFile } from '@/api/meeting/type'
import iEditForm from '@/components/iEditForm'
import uploadIcon from '@/assets/images/upload-icon.svg'
import { download } from '@/utils/downloadUtil'
import { saveDocument, updateDocument } from '@/api/meeting/information'
import { getFileByIds } from '@/api/file/filedownload'
import { baseRules } from './data'
import clearDesc from '@/assets/images/clear-desc.svg'
export default {
  components: {
    iDialog,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm,
    iSelect
  },
  props: {
    loading: { type: Boolean, default: false },
    openDialog: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    editOrAdd: {
      type: String,
      default: () => {
        return 'add'
      }
    },
    clickScope: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataType: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataTypeAll: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      clearDesc: clearDesc,
      fileList: [
        {
          name: '',
          id: ''
        }
      ],
      uploadLoading: false,
      uploadIcon,
      rules: baseRules,
      ruleForm: {
        type: '',
        name: '',
        attachmentId: ''
        // id: "",
      },
      // 附件信息
      attachment: '',
      id: '',
      nameList: []
    }
  },
  mounted() {
    if (this.editOrAdd === 'edit') {
      this.ruleForm.name = this.clickScope.name
      this.id = this.clickScope.id
      this.ruleForm.type = this.clickScope.documentType.name
      this.ruleForm.attachmentId = this.clickScope.attachmentId
      this.getFile(this.ruleForm.attachmentId)
    } else {
      this.fileList = []
    }
  },
  methods: {
    deleteItem(e) {
      this.nameList.splice(e, 1)
    },
    getFile() {
      getFileByIds([this.ruleForm.attachmentId]).then((data) => {
        this.fileList[0].name = data.data[0].name
        this.fileList[0].id = data.data[0].id
        this.nameList = [this.fileList[0]]
      })
    },
    // 移除附件
    handleRemove() {
      this.ruleForm.attachmentId = ''
    },
    // 文件上传
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
          this.ruleForm.attachmentId = fileData.id
          iMessage.success(this.$t('上传成功'))
          this.attachment = {
            attachmentId: fileData.id,
            attachmentName: fileData.name,
            attachmentUrl: fileData.path
          }
          this.deleteItem(0)
          this.nameList = [{ name: fileData.name, id: fileData.id }]
        })
      this.uploadLoading = false
    },
    // 文件下载
    downloadFile(item) {
      download({
        fileIds: item.id,
        filename: item.name,
        callback: (e) => {
          if (!e) {
            iMessage.error('下载失败')
          }
        }
      })
    },
    // 文件上传成功回调
    handleFileSuccess(_, file) {
      this.$refs.image.clearValidate()
      file.id = this.ruleForm.attachmentId
    },
    close() {
      this.$emit('closeDialog', false)
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let documentType = this.dataTypeAll.find((item) => {
            return item.name == this.ruleForm.type
          })

          if (this.editOrAdd === 'edit') {
            const formData = {
              attachmentId: this.ruleForm.attachmentId,
              documentType,
              name: this.ruleForm.name,
              // state: 2,
              id: this.id
            }
            updateDocument(formData)
              .then((data) => {
                if (data) {
                  this.close()
                  this.$message.success('保存成功！')
                  this.$emit('flushTable')
                }
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            const formData = {
              attachmentId: this.ruleForm.attachmentId,
              documentType,
              name: this.ruleForm.name,
              state: 2
              // id: this.ruleForm.id,
            }
            saveDocument(formData)
              .then((data) => {
                if (data) {
                  this.close()
                  this.$message.success('创建成功！')
                  this.$emit('flushTable')
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
      })
    },
    beforeFileUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('文件大小最大限制10MB！')
      }
      return isLt10M
    },
    handleExceed() {
      this.$message.error('仅可添加一个文件！')
    }
  }
}
</script>

<style lang="scss" scoped>
.pic-list {
  .pic-item {
    border-radius: 16px;
    font-size: 14px;
    letter-spacing: 0;
    color: #909399;
    background: #f7f7f7;
    width: 300px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 20px;
    margin-bottom: 5px;

    span {
      line-height: 32px;
    }

    img {
      width: 10px;
      height: 10px;
      margin-top: 10px;
      cursor: pointer;
    }
  }
}
.upload-button {
  transition: 0.2s;
  position: relative;
  width: 300px;
  height: 35px;
  line-height: 35px;
  padding: 0;
  color: #fff;
  background-color: #1660f1;

  .upload-text {
    position: absolute;
    right: 15px;
    top: 3px;
    img {
      width: 23.85px;
      height: 17.69px;
    }
  }
}
.el-upload__tip {
  width: 300px;
  text-align: center;
}
.button-list {
  display: flex;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  .el-form-item {
    margin-bottom: 15px;
    .el-button {
      height: 35px;
      width: 100px;
    }
    .cancel {
      margin-left: 20px;
    }
  }
}
.form-upload {
  width: 305px;
  display: flex;
  height: 125px;
  flex-shrink: 0;
  flex-grow: 1;
  display: block;
  .upload-button {
    position: relative;
    width: 305px;
    height: 35px;
    line-height: 35px;
    padding: 0;
    color: #fff;
    background-color: #1660f1;
    .upload-text {
      position: absolute;
      right: 15px;
      top: 3px;
      img {
        width: 23.85px;
        height: 17.69px;
      }
    }
  }
  .el-upload__tip {
    // position: absolute;
    text-align: center;
  }
}
::v-deep .el-upload-list__item.is-success.focusing .el-icon-close-tip {
  display: none !important;
}
</style>
