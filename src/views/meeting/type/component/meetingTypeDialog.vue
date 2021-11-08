<template>
  <!--转派-->
  <iDialog
    :title="editOrAdd === 'add' ? '创建会议类型' : '编辑会议类型'"
    :visible.sync="openDialog"
    width="65.5rem"
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
        <div class="form">
          <div class="image-box">
            <img
              ref="img"
              :src="ruleForm.coverImage"
              class="avatar"
              alt=""
              @error="handleError"
              @load="handleLoad"
            />
          </div>
          <div class="input-box">
            <div class="form-row">
              <iFormItem
                label="类型名称"
                prop="name"
                :hideRequiredAsterisk="true"
              >
                <iLabel :label="$t('类型名称')" slot="label" required></iLabel>
                <iInput v-model="ruleForm.name"></iInput>
              </iFormItem>
              <iFormItem label="生成会议名称后缀" prop="meetingNameSuffix">
                <iLabel
                  :label="$t('生成会议名称后缀')"
                  slot="label"
                  required
                ></iLabel>
                <iInput v-model="ruleForm.meetingNameSuffix"></iInput>
              </iFormItem>
            </div>
            <div class="form-row">
              <iFormItem label="会议信息描述" prop="meetingInfoDesc">
                <iLabel :label="$t('会议信息描述')" slot="label"></iLabel>
                <iInput v-model="ruleForm.meetingInfoDesc"></iInput>
              </iFormItem>
              <iFormItem label="所属分类" prop="category">
                <iLabel :label="$t('所属分类')" slot="label" required></iLabel>
                <iSelect
                  v-model="ruleForm.category"
                  placeholder="请选择"
                  value-key="id"
                >
                  <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
              <iFormItem
                label="会议管理员"
                prop="userIds"
                :hideRequiredAsterisk="true"
                class="item"
              >
                <iLabel
                  :label="$t('会议管理员')"
                  slot="label"
                  required
                ></iLabel>
                <el-select
                  class="autoSearch"
                  v-model="ruleForm.userIds"
                  multiple
                  filterable
                  :filter-method="remoteMethod"
                  @focus="handleFocus"
                  value-key="id"
                >
                  <el-option
                    v-for="item in showSelectArr"
                    :key="item.id"
                    :label="item.nameZh"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </iFormItem>
            </div>
          </div>
        </div>
        <div class="select-box">
          <div class="form-upload">
            <iFormItem
              label="上传封面图片"
              prop="coverImage"
              ref="ruleFormCoverImage"
            >
              <iLabel
                :label="$t('上传封面图片')"
                slot="label"
                required
              ></iLabel>
              <el-upload
                action="1"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
                :http-request="httpUpload"
              >
                <iButton
                  type="button"
                  class="upload-button"
                  :uploadLoading="uploadLoading"
                >
                  请选择文件<span class="upload-text"
                    ><img :src="uploadIcon"
                  /></span>
                </iButton>
                <div slot="tip" class="el-upload__tip">
                  建议使用16:9比例，图片最大15M
                </div>
              </el-upload>
            </iFormItem>
          </div>

          <div class="form-select">
            <div class="form-time-len">
              <iFormItem label="默认议题时长" class="time" prop="duration">
                <iLabel
                  :label="$t('默认议题时长')"
                  slot="label"
                  required
                ></iLabel>
                <div class="time-box">
                  <iInput
                    v-model.number="ruleForm.duration"
                    type="number"
                  ></iInput>
                  <span>分钟</span>
                </div>
              </iFormItem>
            </div>
            <div class="select-trigger">
              <iFormItem label="是否触发审批" prop="isTriggerApproval">
                <iLabel
                  :label="$t('是否触发审批')"
                  slot="label"
                  required
                ></iLabel>
                <iSelect
                  v-model="ruleForm.isTriggerApproval"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in isApprovalOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>
            <div class="select-process" ref="selectProcess">
              <iFormItem label="审批流程" prop="approvalProcessId">
                <iLabel :label="$t('审批流程')" slot="label" required></iLabel>
                <iSelect
                  v-model="ruleForm.approvalProcessName"
                  placeholder="请选择"
                  :disabled="!ruleForm.isTriggerApproval"
                >
                  <el-option
                    v-for="(item, index) in approvalProcess"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>
          </div>
        </div>
        <!-- <div class="word" v-show="showWord">
          <div class="word-content">建议使用16:9比例，图片最大15M</div>
        </div> -->
        <div class="button-list">
          <el-form-item>
            <iButton @click="clearDiolog" class="cancel">{{
              $t('LK_QUXIAO')
            }}</iButton>
            <iButton @click="handleSubmit">{{ $t('LK_BAOCUN') }}</iButton>
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
// import { baseRules } from "./data";
import uploadIcon from '@/assets/images/upload-icon.svg'
import iEditForm from '@/components/iEditForm'
import {
  saveMettingType,
  updateMettingType,
  uploadFile
} from '@/api/meeting/type'
import { MOCK_FILE_URL } from '@/constants'
import {
  // getPageListByParam,
  getUsers,
  getListByParam
} from '@/api/usercenter/receiver.js'
import { getFileByIds } from '@/api/file/filedownload.js'

export default {
  components: {
    iDialog,
    iSelect,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm
  },
  props: {
    // value: {type: Boolean},
    loading: { type: Boolean, default: false },
    selectOptionsList: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectTableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    openDialog: {
      type: Boolean,
      default: () => {
        return false
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
    // approvalProcess: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   },
    // },
  },
  data() {
    const validateApprovalProcessId = (rule, value, callback) => {
      let approvalProcessId = value
      if (this.ruleForm.isTriggerApproval) {
        approvalProcessId = this.ruleForm.approvalProcessId
          ? this.ruleForm.approvalProcessId
          : this.approvalProcess.find(item => {
              return item.name === this.ruleForm.approvalProcessName
            })
          ? this.ruleForm.approvalProcessId
            ? this.ruleForm.approvalProcessId
            : this.approvalProcess.find(item => {
                return item.name === this.ruleForm.approvalProcessName
              }).id
          : ''
      }

      if (approvalProcessId === '' && this.ruleForm.isTriggerApproval) {
        // console.log(11111);
        callback(new Error('必选'))
      }
      callback()
      // if (!this.ruleForm.isTriggerApproval) {
      //   callback(new Error(" "));
      // }
    }
    const validateApprovalCoverImage = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'))
      }
      callback()
    }
    // const validateIsTriggerApproval = (rule, value, callback) => {
    //   console.log(value);
    //   if (value === "") {
    //     callback(new Error("必选"));
    //   }
    // };
    return {
      initSelectArr: [],
      selectUserArr: [],
      userDataAll: [],
      uploadLoading: false,
      uploadIcon,
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 1, max: 64, message: '最大长度 64 字符', trigger: 'blur' }
        ],
        meetingNameSuffix: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 1, max: 64, message: '最大长度 64 字符', trigger: 'blur' }
        ],
        meetingInfoDesc: [
          { max: 255, message: '最大长度 255 字符', trigger: 'blur' }
        ],
        duration: [
          { required: true, message: '必填', trigger: 'blur' },
          {
            type: 'number',
            message: '最大长度3位，单位（分钟），必须正整数',
            trigger: 'blur'
          },
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
        coverImage: [
          // {
          //   required: true,
          //   message: "必填",
          //   trigger: "change",
          // },
          { validator: validateApprovalCoverImage, trigger: 'change' }
        ],
        approvalProcessId: [
          { validator: validateApprovalProcessId, trigger: 'change' }
        ],
        isTriggerApproval: [
          { required: true, message: '必选', trigger: 'change' }
        ],
        userIds: [{ required: true, message: '必选', trigger: 'blur' }],
        category: [{ required: true, message: '必选', trigger: 'change' }]
      },

      ruleForm: {
        name: '',
        meetingNameSuffix: '',
        meetingInfoDesc: '',
        duration: '',
        isTriggerApproval: '',
        approvalProcessId: '',
        coverImage: '',
        approvalProcessName: '',
        category: '',
        userIds: ''
      },
      isApprovalOption: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ],
      categoryList: [
        {
          id: '01',
          name: '通用会议'
        },
        {
          id: '02',
          name: '生产采购CSC'
        },
        {
          id: '03',
          name: '一般采购CSG'
        }
      ],
      approvalProcess: [
        {
          name: 'CW 通用会议审批',
          id: 1
        },
        {
          name: 'CV 一般会议审批',
          id: 2
        }
      ],
      value: '',
      isTriggerApproval: ''
      // showWord: true,
    }
  },
  mounted() {
    if (this.editOrAdd === 'edit') {
      const userIdsArr = this.selectedTableData[0].userIds
        ? this.selectedTableData[0].userIds.split(',')
        : []
      // this.handleFocus().then(() => {
      //   console.log(this.selectUserArr);
      // });
      this.queryEdit(userIdsArr).then(currentSearchUserData => {
        this.initSelectArr = [...currentSearchUserData]
        this.ruleForm = {
          ...this.selectedTableData[0],
          userIds: currentSearchUserData
        }
        this.handleLoad()
      })
    }
  },
  // computed: {
  //   editName: function() {
  //     return {
  //       approvalProcessName: this.ruleForm.approvalProcessName,
  //       approvalProcessId: this.ruleForm.approvalProcessId,
  //     };
  //   },
  // },
  watch: {
    'ruleForm.isTriggerApproval': {
      handler(v) {
        // console.log(v);
        if (!v) {
          this.ruleForm = {
            ...this.ruleForm,
            approvalProcessName: '',
            approvalProcessId: ''
          }
        }
        this.$nextTick(() => {
          this.$refs.selectProcess.querySelector(
            '.el-form-item__error'
          ).style.display = 'none'
        })
      },
      immediate: true
    },
    //approvalProcessName approvalProcessId
    'ruleForm.approvalProcessName': {
      handler(v) {
        if (!v) {
          v = this.approvalProcess.find(
            item => Number(item.id) === Number(this.ruleForm.approvalProcessId)
          ).name
        }
        let name = ''
        let id = ''
        if (v) {
          if (this.ruleForm.isTriggerApproval) {
            name = this.approvalProcess.find(item => item.name === v).name
            id = this.approvalProcess.find(item => item.name === v).id
          }
          this.ruleForm = {
            ...this.ruleForm,
            approvalProcessId: id,
            approvalProcessName: name
          }
        }
      }
    },
    immediate: true
  },
  'ruleForm.approvalProcessId': {
    handler(v) {
      let name = ''
      let id = ''
      if (v) {
        if (this.isTriggerApproval) {
          name = this.approvalProcess.find(
            item => Number(item.id) === Number(v)
          ).name
          id = this.approvalProcess.find(item => Number(item.id) === Number(v))
            .id
        }
        console.log(name, id)

        this.ruleForm = {
          ...this.ruleForm,
          approvalProcessId: id,
          approvalProcessName: name
        }
      }
    },
    immediate: true
  },
  // "ruleForm.coverImage": {
  //   handler(v) {
  //     console.log(v);
  //     this.$refs["ruleFormCoverImage"].validate((valid) => {
  //       console.log(valid);
  //     });
  //   },
  // },
  computed: {
    showSelectArr() {
      return [...this.initSelectArr]
    }
  },
  methods: {
    async queryEdit(userIdsArr) {
      const res = await getUsers({ userIdList: [...userIdsArr] })
      return res.data
    },
    async query(val) {
      let param
      if (val) {
        param = {
          roleCode: 'MEETINGADMIN',
          nameZh: val
        }
      } else {
        param = {
          roleCode: 'MEETINGADMIN',
          nameZh: ''
        }
      }
      const res = await getListByParam(param)
      const { data } = res
      this.initSelectArr = [...data]
      return [...data]
    },
    async handleFocus() {
      const data = await this.remoteMethod()
      return data
    },
    async remoteMethod(queryString) {
      let currentSearchUserData = []
      currentSearchUserData = await this.query(queryString)
      this.selectUserArr = currentSearchUserData
      return currentSearchUserData
    },
    async httpUpload(content) {
      this.uploadLoading = true
      let formData = new FormData()
      // formData.append("file", content.file);
      formData.append('multifile', content.file)
      formData.append('applicationName', 111)
      formData.append('businessId', 8025)
      formData.append('currentUserId', -1)
      formData.append('type', 1)
      const res = await uploadFile(formData)
      // const infoById = await getFileByIds([res[0].id]);
      console.log('res[0].path', res[0].path)
      this.ruleForm.coverImage = res[0].path
      // console.log(info);
      this.$refs['ruleFormCoverImage'].$el.querySelector(
        '.el-form-item__error'
      ).style.display = 'none'
      iMessage.success(this.$t('上传成功'))
      this.uploadLoading = false
    },
    handleLoad() {
      this.$refs['img'].classList.remove('error')
    },
    handleError() {
      this.$refs['img'].classList.add('error')
    },
    close() {
      this.$emit('input', false)
      this.$emit('closeDialog', false)
    },
    clearDiolog(sub) {
      if (sub === 'submit') {
        this.$emit('input', false)
        this.$emit('closeDialog', false)
      } else {
        // this.$confirm("是否取消编辑?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        this.$emit('input', false)
        this.$emit('closeDialog', false)
        // });
      }
    },
    handleSubmit() {
      // this.$confirm("是否保存该 会议类型?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      this.submitForm('ruleForm')
      //});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userIdsStr = this.ruleForm.userIds
            .map(item => {
              return item.id
            })
            .join(',')
          let formData = {
            ...this.ruleForm,
            userIds: userIdsStr
          }
          if (this.ruleForm.isTriggerApproval) {
            let approvalProcessId = this.ruleForm.approvalProcessId
              ? this.approvalProcess.find(item => {
                  return item.id === this.ruleForm.approvalProcessId
                }).id
              : this.approvalProcess.find(item => {
                  return item.name === this.ruleForm.approvalProcessName
                }).id
            formData = {
              ...this.ruleForm,
              approvalProcessId,
              userIds: userIdsStr
            }
          }
          if (this.editOrAdd === 'edit') {
            updateMettingType(formData)
              .then(data => {
                // console.log("data", data);
                if (data) {
                  this.clearDiolog('submit')
                  iMessage.success('更新成功')
                  this.$emit('flushTable')
                } else {
                  this.clearDiolog('submit')
                  // iMessage.error("会议类型名称重复");
                  this.$emit('flushTable')
                }
              })
              .catch(err => {
                console.log('err', err)
              })
          } else {
            saveMettingType(formData)
              .then(data => {
                if (data) {
                  this.clearDiolog('submit')
                  iMessage.success('保存成功')
                  this.$emit('flushTable')
                } else {
                  this.clearDiolog('submit')
                  // iMessage.error("会议类型名称重复");
                  this.$emit('flushTable')
                }
              })
              .catch(err => {
                console.log('err', err)
              })
          }
        } else {
          // if (object.coverImage) {
          //   this.showWord = false;
          // } else {
          //   this.showWord = true;
          // }
          return false
        }
      })
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload(file, fileList) {
      if (!file.type.includes('image/')) {
        this.$message.error('请上传图片文件')
        return false
      }
      const isLt15M = file.size / 1024 / 1024 < 15
      if (!isLt15M) {
        this.$message.error('上传头像图片大小不能超过 15MB!')
      }
      return isLt15M
    }
  }
}
</script>

<style scoped lang="scss">
/* .word {
  position: absolute;
  padding-left: 20px;
  transform: translateY(-16px);
  .word-content {
    position: relative;
    width: 268px;
    font-size: 12px;
    text-align: center;
  }
} */
.el-upload__tip {
  text-align: center;
}
.button-list {
  display: flex;
  height: 115px;
  justify-content: flex-end;
  align-items: center;
  .el-form-item {
    margin-bottom: 0;
    .el-button {
      height: 35px;
      width: 100px;
    }
    .cancel {
      margin-left: 20px;
    }
  }
}

.form {
  display: flex;
  justify-content: space-between;
  width: 162px;
  .image-box {
    width: 288px;
    background-image: url('~@/assets/images/imgBg.svg');
    background-repeat: no-repeat;
    background-color: #eee;
    background-position: center;
    margin-right: 40px;
    position: relative;
    .el-avatar {
      display: block;
      display: none;
    }
    .avatar {
      width: 288px;
      height: 162px;
      display: block;
      object-fit: scale-down;
    }
    .error {
      visibility: hidden;
    }
  }
  .input-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .form-row {
      width: 640px;
      display: flex;
      justify-content: space-between;
      .el-form-item {
        width: 100%;
        /* height: 56px; */
      }
      .el-form-item + .el-form-item {
        margin-left: 40px;
      }
    }
    .form-row:last-child {
      transform: translateY(26px);
    }
  }
}
.select-box {
  display: flex;
  width: 100%;
  margin-top: 40px;
  padding-left: 20px;
  .form-upload {
    width: 268px;
    display: flex;
    /* flex-direction: column; */
    height: 56px;
    flex-shrink: 0;
    flex-grow: 1;
    .upload-button {
      position: relative;
      /* border: 1px solid #d8dce6; */
      width: 268px;
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
  }

  .form-select {
    margin-left: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .form-time-len {
      width: 180px;
      .time {
        display: flex;
        flex-direction: column;
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
          }
        }
      }
    }
  }
}

/* ::v-deep .is-required {
  .flex-align-center {
    position: relative;
    .start {
      position: absolute;
      display: block;
      width: 10px;
      height: 10px;
      background: #e30d0d;
      border-radius: 5px;
      left: -20px;
      overflow: hidden;
    }
  }
} */
</style>
