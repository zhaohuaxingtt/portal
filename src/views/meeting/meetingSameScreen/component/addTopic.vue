<template>
  <!--转派-->
  <iDialog
    :title="editOrAdd === 'add' ? $t('MT_XINZENGSHOUGONGYITI') : $t('MT_XIUGAISHOUGONGYITI')"
    :visible.sync="openDialog"
    width="58.25rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm class="form-edit">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        class="form"
      >
        <div class="row-box" v-if="editOrAdd !== 'look'">
          <iFormItem label="议题类型" :hideRequiredAsterisk="true" class="item">
            <iLabel :label="$t('MT_YITILEIXING')" slot="label"></iLabel>
            <iInput class="disabledAll" value="手工议题" disabled></iInput>
          </iFormItem>
          <iFormItem
            label="Items Name"
            prop="topic"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Items Name')" slot="label" required></iLabel>
            <iInput v-model="ruleForm.topic"></iInput>
          </iFormItem>
          <!-- <iFormItem
            v-if="editOrAdd !== 'edit'"
            label="Duration"
            prop="duration"
            :hideRequiredAsterisk="true"
            class="item"
          > -->
          <iFormItem
            label="Duration"
            prop="duration"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Duration')" slot="label" required></iLabel>
            <iInput v-model="ruleForm.duration"></iInput>
          </iFormItem>
          <iFormItem
            label="Sourcing No."
            :hideRequiredAsterisk="true"
            prop="sourcingNo"
            class="item"
          >
            <iLabel :label="$t('Sourcing No.')" slot="label"></iLabel>
            <iInput v-model="ruleForm.sourcingNo"></iInput>
          </iFormItem>
          <iFormItem
            label="TNR"
            :hideRequiredAsterisk="true"
            prop="tnr"
            class="item"
          >
            <iLabel :label="$t('TNR')" slot="label"></iLabel>
            <iInput v-model="ruleForm.tnr"></iInput>
          </iFormItem>
          <iFormItem
            label="BEN(CN)"
            prop="benCn"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('BEN(CN)')" slot="label" required></iLabel>
            <iInput v-model="ruleForm.benCn"></iInput>
          </iFormItem>

          <iFormItem
            label="BEN(DE)"
            :hideRequiredAsterisk="true"
            prop="benDe"
            class="item"
          >
            <iLabel :label="$t('BEN(DE)')" slot="label"></iLabel>
            <iInput v-model="ruleForm.benDe"></iInput>
          </iFormItem>

          <iFormItem
            label="Carline"
            :hideRequiredAsterisk="true"
            prop="carline"
            class="item"
          >
            <iLabel :label="$t('Carline')" slot="label"></iLabel>
            <iInput v-model="ruleForm.carline"></iInput>
          </iFormItem>

          <iFormItem
            label="Sourcing Buyer"
            prop="supporter"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel
              :label="$t('Sourcing Buyer')"
              slot="label"
              required
            ></iLabel>
            <iSelect
              ref="supporterSelect"
              class="autoSearch"
              v-model="ruleForm.supporter"
              filterable
              :filter-method="remoteMethod"
              @focus="handleFocus"
              value-key="id"
              :disabled="ruleForm.state === '02'"
            >
              <el-option
                v-for="item in selectUserArr.length > 0
                  ? selectUserArr
                  : currentSearchUserData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem
            label="Linie Buyer"
            prop="presenter"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Linie Buyer')" slot="label" required></iLabel>
            <iSelect
              class="autoSearch"
              v-model="ruleForm.presenter"
              filterable
              :filter-method="remoteMethod"
              @focus="handleFocus"
              value-key="id"
              :disabled="ruleForm.state === '02'"
            >
              <el-option
                v-for="item in selectUserArr.length > 0
                  ? selectUserArr
                  : currentSearchUserData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </iSelect>
          </iFormItem>
          <iFormItem
            label="EP"
            :hideRequiredAsterisk="true"
            prop="ep"
            class="item"
          >
            <iLabel :label="$t('EP')" slot="label"></iLabel>
            <iInput v-model="ruleForm.ep"></iInput>
          </iFormItem>
          <iFormItem label="议题资料" :hideRequiredAsterisk="true" class="item">
            <iLabel :label="$t('MT_YITIZILIAO')" slot="label"></iLabel>
            <el-upload
              class="upload-file"
              action="1"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :show-file-list="false"
              :http-request="httpUpload"
              :file-list="fileList"
            >
              <iButton
                type="button"
                class="upload-button"
                :uploadLoading="uploadLoading"
              >
                <span class="upload-text"><img :src="uploadIcon" /></span>
                <span class="upload-text-content">{{$t('MT_XUANZEWENJIAN')}}</span>
              </iButton>
              <div slot="tip" class="el-upload__tip">{{$t('MT_WENJIANDAXIAOZUIDAXIANZHI')}}30M</div>
            </el-upload>
            <ul class="file-list">
              <li v-for="(item, index) of ruleForm.attachments" :key="index">
                <div
                  class="download"
                  @click="
                    () => {
                      handleDownload(item)
                    }
                  "
                >
                  {{ item.attachmentName }}
                </div>
                <div
                  class="delete"
                  @click="handleDeleteFile(item)"
                  v-if="editOrAdd === 'add' || editOrAdd === 'edit'"
                >
                  <i class="el-icon-close"></i>
                </div>
              </li>
            </ul>
          </iFormItem>
        </div>
      </el-form>
    </iEditForm>
    <div class="button-list">
      <iButton
        @click="clearDiolog"
        class="cancel"
        v-show="editOrAdd !== 'look'"
        :disabled="subButtonFlag"
        >{{ $t('LK_QUXIAO') }}</iButton
      >
      <iButton
        @click="handleSubmit"
        class="save"
        v-show="editOrAdd !== 'look'"
        :disabled="subButtonFlag"
        >{{ $t('LK_BAOCUN') }}</iButton
      >
    </div>
  </iDialog>
</template>

<script>
import {
  iDialog,
  iInput,
  iFormItem,
  iLabel,
  iButton,
  iMessage,
  iSelect
} from 'rise'
import iEditForm from '@/components/iEditForm'
import uploadIcon from '@/assets/images/upload-icon.svg'
import {
  saveThemen,
  updateThemen,
  addThemenAttachment,
  findTheThemenById
} from '@/api/meeting/details'
import { uploadFile, getReceiverById } from '@/api/meeting/type'
import { download } from '@/utils/downloadUtil'
export default {
  components: {
    iDialog,
    iFormItem,
    iInput,
    iLabel,
    iEditForm,
    iButton,
    iSelect
  },
  props: {
    lookThemenObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    openDialog: { type: Boolean, default: false },
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
    },
    editOrAdd: {
      type: String,
      default: () => {
        return 'add'
      }
    }
  },
  data() {
    const validateTopic = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error(this.$t('必填')))
      } else {
        if (value && value.length > 255) {
          callback(new Error(this.$t('最大不能超过255字符')))
        }
        callback()
      }
    }
    return {
      uploadLoading: false,
      showWord: true,
      uploadIcon,
      supporterIdArr: [],
      presenterIdArr: [],
      selectUserArr: [],
      ruleForm: {
        type: '06',
        topic: '',
        duration: '',
        sourcingNo: '',
        tnr: '',
        benCn: '',
        benDe: '',
        carline: '',
        supporter: '',
        presenter: '',
        ep: '',
        attachments: [],
        presenterDept: '',
        supporterDept: ''
      },
      presenterStr: '',
      supporterStr: '',
      rules: {
        topic: [
          {
            trigger: 'blur',
            validator: validateTopic
          }
        ],
        supporter: [{ required: true, message: '必选', trigger: 'blur' }],
        presenter: [{ required: true, message: '必选', trigger: 'blur' }],
        duration: [
          { required: true, message: '必填', trigger: 'blur' },
          {
            type: 'number',
            message: '最大长度3位，单位（分钟），必须正整数',
            trigger: 'blur',
            transform(value) {
              if (value !== null && value !== '') {
                if (
                  String(value).trim() === '' ||
                  Number(value) <= 0 ||
                  Number(value) >= 1000
                ) {
                  return false
                } else if (
                  String(value).indexOf('.') !== -1 ||
                  String(value).indexOf('-') !== -1
                ) {
                  return false
                } else {
                  return Number(value)
                }
              } else {
                return null
              }
            }
          }
        ],
        benCn: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 255, message: '最大长度 255 字符', trigger: 'blur' }
        ],
        sourcingNo: [
          { max: 255, message: '最大长度 255 字符', trigger: 'blur' }
        ],
        tnr: [{ max: 255, message: '最大长度 255 字符', trigger: 'blur' }],
        benDe: [{ max: 255, message: '最大长度 255 字符', trigger: 'blur' }],
        carline: [{ max: 255, message: '最大长度 255 字符', trigger: 'blur' }],
        ep: [{ max: 255, message: '最大长度 255 字符', trigger: 'blur' }]
      },
      subButtonFlag: false
    }
  },
  mounted() {
    // let duration = 0
    if (this.editOrAdd === 'edit') {
      this.ruleForm = { ...this.selectedTableData[0] }
      // duration = this.selectedTableData[0].duration;
      this.queryThemen()
      this.getUsersByResponse()
    }
    if (this.editOrAdd === 'add') {
      this.ruleForm.duration = this.meetingInfo.duration
      this.getUsersByResponse()
    }
    if (this.editOrAdd === 'look') {
      this.ruleForm = this.lookThemenObj
      // this.attachments = [...this.lookThemenObj.attachments];
      return
    }
  },
  computed: {
    // supporterIdArrAndCurrentSearchUserData() {
    //   return {
    //     currentSearchUserData: this.currentSearchUserData,
    //     supporterIdArr: this.supporterIdArr,
    //     presenterIdArr: this.presenterIdArr,
    //   };
    // },
  },
  watch: {
    // supporterIdArrAndCurrentSearchUserData: {
    //   handler(newV) {
    //     this.ruleForm.supporter = newV.currentSearchUserData.filter((item) => {
    //       return newV.supporterIdArr.some((it) => {
    //         return Number(item.id) === Number(it);
    //       });
    //     });
    //     this.ruleForm.presenter = newV.currentSearchUserData.filter((item) => {
    //       return newV.presenterIdArr.some((it) => {
    //         return Number(item.id) === Number(it);
    //       });
    //     });
    //   },
    //   deep: true,
    // },
    // presenterIdArr: {
    //   handler(newV) {},
    // },
    // lookThemenObj: {
    //   handler(newV) {
    //     // console.log(newV);
    //   },
    //   immediate: true,
    //   deep: true,
    // },
    // "ruleForm.count": {
    //   handler(newV) {
    //     this.ruleForm = {
    //       ...this.ruleForm,
    //       count: newV ? newV : null,
    //     };
    //   },
    // },
    // "ruleForm.presenter": {
    //   handler: function (newV) {
    //     let arr = newV.map((item) => {
    //       return item.id;
    //     });
    //     let arrStr = arr.join(",");
    //     if (typeof arrStr === "string") {
    //       this.presenterStr = arrStr;
    //     }
    //     if (this.editOrAdd !== "look") {
    //       this.ruleForm.presenterDept = Array.from(
    //         new Set(
    //           this.currentSearchUserData
    //             .filter((item) => {
    //               return arr.some((it) => {
    //                 return it === item.id;
    //               });
    //             })
    //             .map((item) => {
    //               return item.department;
    //             })
    //         )
    //       ).join(",");
    //     }
    //   },
    //   immediate: true,
    // },
    // "ruleForm.supporter": {
    //   handler: function (newV) {
    //     let arr = newV.map((item) => {
    //       return item.id;
    //     });
    //     let arrStr = arr.join(",");
    //     if (typeof arrStr === "string") {
    //       this.supporterStr = arrStr;
    //     }
    //     if (this.editOrAdd !== "look") {
    //       this.ruleForm.supporterDept = Array.from(
    //         new Set(
    //           this.currentSearchUserData
    //             .filter((item) => {
    //               return arr.some((it) => {
    //                 return it === item.id;
    //               });
    //             })
    //             .map((item) => {
    //               return item.department;
    //             })
    //         )
    //       ).join(",");
    //     }
    //   },
    //   immediate: true,
    // },
  },
  methods: {
    handleDeleteFile(file) {
      // console.log(file);
      this.ruleForm.attachments = this.ruleForm.attachments.filter((item) => {
        return item.attachmentId !== file.attachmentId
      })
    },
    queryThemen() {
      const data = {
        themenId: this.ruleForm.id,
        meetingId: this.meetingInfo.id
      }
      findTheThemenById(data).then((res) => {
        this.ruleForm.supporter = res.supporter
        this.ruleForm.presenter = res.presenter
      })
    },
    handleDownload(row) {
      download({
        fileIds: row.attachmentId,
        filename: row.attachmentName,
        callback: (e) => {
          if (!e) {
            iMessage.error(this.$t('下载失败'))
          }
        }
      })
    },
    handleFocus() {
      this.remoteMethod()
    },
    remoteMethod(queryString) {
      let currentSearchUserData = []
      currentSearchUserData = queryString
        ? this.userData.filter(this.createStateFilter(queryString))
        : this.userData
      this.selectUserArr = currentSearchUserData
    },

    //编辑和添加时的文件上传
    handleUploadFile() {
      const sourceAttachments = this.selectedTableData[0]
        ? [...this.selectedTableData[0].attachments]
        : []
      //需要上传的文件
      this.shouldUploadAttachments = this.ruleForm.attachments
        .filter((item) => {
          return !sourceAttachments.find((it) => {
            return it.attachmentId === item.attachmentId
          })
        })
        .map((item) => {
          return {
            ...item,
            source: '04'
          }
        })
      this.saveAllNewThemen(this.shouldUploadAttachments)
    },
    saveAllNewThemen(shouldUploadAttachments) {
      let promiseArr = []
      shouldUploadAttachments.forEach((item) => {
        let data
        if (this.editOrAdd === 'edit') {
          data = {
            themenId: this.selectedTableData[0]
              ? this.selectedTableData[0].id
              : null,
            attachment: item,
            meetingId: this.meetingInfo.id
          }
        } else {
          data = {
            attachment: item,
            meetingId: this.meetingInfo.id
          }
        }
        const p = new Promise((resolve, reject) => {
          addThemenAttachment(data)
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
        promiseArr.push(p)
      })
      Promise.all(promiseArr).catch((err) => {
        console.log(err)
      })
    },

    getUsersByResponse() {
      const data = {
        id: this.meetingInfo.receiverId
      }
      //查询收件人
      getReceiverById(data).then((res) => {
        this.userData = res.employeeDTOS.filter((e) => e.id !== null)
        this.currentSearchUserData = [...res.employeeDTOS]
        this.remoteMethod()
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return state?.name
          ?.toLowerCase()
          .toString()
          .includes(queryString.toLowerCase().toString())
      }
    },

    beforeAvatarUpload(file) {
      const isLt30M = file.size / 1024 / 1024 < 30
      if (!isLt30M) {
        this.$message.error(this.$t('文件大小最大限制30M!'))
      }
      return isLt30M
    },
    httpUpload(content) {
      this.uploadLoading = true
      let formData = new FormData()
      formData.append('multifile', content.file)
      formData.append('applicationName', 111)
      formData.append('businessId', 8025)
      formData.append('currentUserId', -1)
      formData.append('type', 1)
      uploadFile(formData)
        .then((res) => {
          let attachment = {
            attachmentId: res.data[0].id,
            attachmentUrl: res.data[0].path,
            attachmentName: res.data[0].name
          }
          this.ruleForm.attachment.push(attachment)
          iMessage.success(this.$t('上传成功'))
          this.uploadLoading = false
        })
        .catch((err) => {
          console.log(err)
          this.uploadLoading = false
        })
    },
    close() {
      this.$emit('input', false)
      this.$emit('closeDialog', false)
      this.$emit('flushTable')
    },
    clearDiolog() {
      this.$confirm(this.$t('是否取消编辑?'), this.$t('提示'), {
        confirmButtonText: this.$t('是'),
        cancelButtonText: this.$t('否'),
        type: 'warning'
      }).then(() => {
        this.close()
      })
    },
    handleSubmit() {
      this.$confirm(this.$t('是否保存议题？'), this.$t('提示'), {
        confirmButtonText: this.$t('是'),
        cancelButtonText: this.$t('否'),
        type: 'warning'
      }).then(() => {
        this.submitForm('ruleForm')
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.subButtonFlag = true
          //开始保存
          if (this.editOrAdd === 'edit') {
            this.handleUploadFile()
            const formData = {
              ...this.ruleForm,
              meetingId: this.meetingInfo.id,
              id: this.selectedTableData[0].id,
              presenterDept:
                this.userData.filter((e) => e.id === this.ruleForm.presenter)[0]
                  .department || '',
              supporterDept:
                this.userData.filter((e) => e.id === this.ruleForm.supporter)[0]
                  .department || ''
            }
            // console.log(671,this.userData,formData)
            updateThemen(formData)
              .then((data) => {
                if (data) {
                  iMessage.success(this.$t('修改成功'))
                } else {
                  iMessage.error('error')
                }
                this.subButtonFlag = false
                this.close()
              })
              .catch((err) => {
                this.subButtonFlag = false
                console.log('err', err)
              })
          } else {
            const formData = {
              themen: {
                ...this.ruleForm,
                id: '',
                meetingId: this.meetingInfo.id,
                isBreak: false,
                presenterDept: this.userData.filter(
                  (e) => e.id === this.ruleForm.presenter
                )[0].department,
                supporterDept: this.userData.filter(
                  (e) => e.id === this.ruleForm.supporter
                )[0].department
              }
            }
            saveThemen(formData)
              .then((data) => {
                if (data) {
                  iMessage.success(this.$t('保存成功'))
                } else {
                  iMessage.error('error')
                }
                this.subButtonFlag = false
                this.close()
              })
              .catch((err) => {
                this.subButtonFlag = false
                console.log('err', err)
              })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-icon-close {
  cursor: pointer;
}
::-webkit-scrollbar {
  width: 4px;
}
.form-edit {
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 508px;
}
.form {
  width: 848px;
  padding-left: 1px;
}
::v-deep .flex-align-center {
  white-space: nowrap;
}
.button-list {
  margin-top: 28px;
  /* margin-top: 30px; */
  /* height: 65px; */
  padding-bottom: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-left: 628px;
  .save {
    display: block;
    width: 100px;
    flex-grow: 1;
    flex-shrink: 0;
    margin-left: 20px;
  }
  .cancel {
    display: block;
    width: 100px;
    flex-grow: 1;
    flex-shrink: 0;
    margin-left: auto;
  }
}
.el-upload__tip {
  text-align: center;
}
.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .count {
    width: 160px;
  }
  .topic {
    width: 400px;
  }
  .time {
    display: flex;
    flex-direction: column;
    width: 152px;
    .time-box {
      display: flex;
      align-items: center;
      span {
        width: 28px;
        font-size: 14px;
        margin-left: 20px;
        flex-shrink: 0;
        flex-grow: 1;
        display: block;
        white-space: nowrap;
        transform: translateX(-4px);
      }
    }
  }
}
::v-deep .row-box {
  width: 100%;
  /* height: 365px; */
  // border-radius: 10px;
  // background: #f9f9f9;
  // padding: 31px 66px 30px 67px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;

  .item {
    flex-grow: 1;
    flex-shrink: 0;
    width: 300px;
    .autoSearch {
      width: 100%;
    }
  }
  .item:nth-of-type(2n) {
    margin-left: 95px;
  }
}

.disabledAll ::v-deep {
  .el-input__inner {
    text-align: center;
    color: #000;
  }
}
.upload-file {
  width: 100%;
  display: flex;
  align-items: center;
  ::v-deep .upload-button {
    position: relative;
    width: 128px;
    height: 35px;
    line-height: 35px;
    padding: 0;
    color: #fff;
    background-color: #1660f1;
    .upload-text {
      position: absolute;
      left: 13px;
      top: 3px;
      img {
        width: 23.85px;
        height: 17.69px;
      }
    }
    .upload-text-content {
      margin-left: 20px;
    }
  }
  .el-upload__tip {
    margin-left: 20px;
  }
}
.file-list {
  margin-top: 15px;
  flex-shrink: 0;
  flex-grow: 1;
  width: 100%;
  max-width: 400px;
  transform: translateY(-10px);
  li {
    font-size: 12px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .download {
      cursor: pointer;
      color: #1660f1;
      white-space: nowrap;
      border-bottom: #1660f1 solid 1px;
    }
    .delete {
      height: 100%;
      width: 35px;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(2px);
      border-radius: 50%;
    }
  }
}
</style>
