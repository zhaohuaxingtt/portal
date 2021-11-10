<template>
  <!--转派-->
  <iDialog
    :title="
      editOrAdd === 'add'
        ? '新增议题'
        : editOrAdd === 'look'
        ? '查看议题'
        : '修改议题'
    "
    :visible.sync="dialogStatusManageObj.openAddTopicDialog"
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
        <div class="row" v-show="editOrAdd === 'look'">
          <iFormItem
            label="Count"
            prop="count"
            :hideRequiredAsterisk="true"
            class="count"
          >
            <iLabel :label="$t('Count')" slot="label"></iLabel>
            <iInput v-model="ruleForm.count" disabled></iInput>
          </iFormItem>
          <iFormItem
            label="Topic"
            prop="topic"
            :hideRequiredAsterisk="true"
            class="topic"
          >
            <iLabel :label="$t('Topic')" slot="label" required></iLabel>
            <iInput v-model="ruleForm.topic" disabled></iInput>
          </iFormItem>
          <iFormItem label="Duration" prop="duration" class="time">
            <iLabel :label="$t('Duration')" slot="label" required></iLabel>
            <div class="time-box">
              <iInput
                v-model="ruleForm.duration"
                type="number"
                disabled
              ></iInput>
              <span>mins</span>
            </div>
          </iFormItem>
        </div>
        <div class="row" v-show="editOrAdd !== 'look'">
          <iFormItem
            label="Count"
            prop="count"
            :hideRequiredAsterisk="true"
            class="count"
          >
            <iLabel :label="$t('Count')" slot="label"></iLabel>
            <iInput
              v-model="ruleForm.count"
              :disabled="ruleForm.state === '02'"
            ></iInput>
          </iFormItem>
          <iFormItem
            label="Topic"
            prop="topic"
            :hideRequiredAsterisk="true"
            class="topic"
          >
            <iLabel :label="$t('Topic')" slot="label" required></iLabel>
            <iInput
              v-model="ruleForm.topic"
              :disabled="ruleForm.state === '02'"
            ></iInput>
          </iFormItem>
          <iFormItem label="Duration" prop="duration" class="time">
            <iLabel :label="$t('Duration')" slot="label" required></iLabel>
            <div class="time-box">
              <iInput v-model="ruleForm.duration" type="number"></iInput>
              <span>mins</span>
            </div>
          </iFormItem>
        </div>
        <div class="row-box" v-if="editOrAdd !== 'look'">
          <iFormItem
            label="Presenter"
            prop="presenter"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Presenter')" slot="label"></iLabel>
            <!-- <iInput
              v-model="ruleForm.presenter"
            ></iInput> -->
            <!-- <el-autocomplete
              class="autoSearch"
              v-model="ruleForm.presenter"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect"
            ></el-autocomplete> -->
            <el-select
              class="autoSearch"
              v-model="ruleForm.presenter"
              multiple
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
                :value="item"
              >
              </el-option>
            </el-select>
          </iFormItem>
          <iFormItem
            label="Presenter Department"
            prop="presenterDept"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Presenter Department')" slot="label"></iLabel>
            <iInput v-model="ruleForm.presenterDept" disabled></iInput>
          </iFormItem>
          <iFormItem
            label="Presenter (Not System User)"
            prop="presenterNosys"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel
              :label="$t('Presenter (Not System User)')"
              slot="label"
            ></iLabel>
            <iInput
              v-model="ruleForm.presenterNosys"
              :disabled="ruleForm.state === '02'"
            ></iInput>
          </iFormItem>
          <iFormItem
            label="Presenter Department (Not System User)"
            prop="presenterDeptNosys"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel
              :label="$t('Presenter Department (Not System User)')"
              slot="label"
            ></iLabel>
            <iInput
              v-model="ruleForm.presenterDeptNosys"
              :disabled="ruleForm.state === '02'"
            ></iInput>
          </iFormItem>
          <iFormItem
            label="Supporter"
            prop="supporter"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Supporter')" slot="label"></iLabel>
            <el-select
              class="autoSearch"
              v-model="ruleForm.supporter"
              multiple
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
                :value="item"
              >
              </el-option>
            </el-select>
          </iFormItem>
          <iFormItem
            label="Supporter Department"
            prop="supporterDept"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Supporter Department')" slot="label"></iLabel>
            <iInput v-model="ruleForm.supporterDept" disabled></iInput>
          </iFormItem>

          <iFormItem
            label="Supporter (Not System User)"
            prop="supporterNosys"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel
              :label="$t('Supporter (Not System User)')"
              slot="label"
            ></iLabel>
            <iInput
              v-model="ruleForm.supporterNosys"
              :disabled="ruleForm.state === '02'"
            ></iInput>
          </iFormItem>

          <iFormItem
            label="Supporter Department (Not System User)"
            prop="supporterDeptNosys"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel
              :label="$t('Supporter Department (Not System User)')"
              slot="label"
            ></iLabel>
            <iInput
              v-model="ruleForm.supporterDeptNosys"
              :disabled="ruleForm.state === '02'"
            ></iInput>
          </iFormItem>
        </div>
        <div class="row-box" v-else>
          <iFormItem
            label="Presenter"
            prop="presenter"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Presenter')" slot="label"></iLabel>
            <iInput v-model="ruleForm.presenter" disabled></iInput>
          </iFormItem>
          <iFormItem
            label="Presenter Department"
            prop="presenterDept"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Presenter Department')" slot="label"></iLabel>
            <iInput v-model="ruleForm.presenterDept" disabled></iInput>
          </iFormItem>

          <iFormItem
            label="Presenter (Not System User)"
            prop="presenterNosys"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel
              :label="$t('Presenter (Not System User)')"
              slot="label"
            ></iLabel>
            <iInput v-model="ruleForm.presenterNosys" disabled></iInput>
          </iFormItem>
          <iFormItem
            label="Presenter Department (Not System User)"
            prop="presenterDeptNosys"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel
              :label="$t('Presenter Department (Not System User)')"
              slot="label"
            ></iLabel>
            <iInput v-model="ruleForm.presenterDeptNosys" disabled></iInput>
          </iFormItem>

          <iFormItem
            label="Supporter"
            prop="supporter"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Supporter')" slot="label"></iLabel>
            <iInput v-model="ruleForm.supporter" disabled></iInput>
          </iFormItem>
          <iFormItem
            label="Supporter Department"
            prop="supporterDept"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel :label="$t('Supporter Department')" slot="label"></iLabel>
            <iInput v-model="ruleForm.supporterDept" disabled></iInput>
          </iFormItem>
          <iFormItem
            label="Supporter (Not System User)"
            prop="supporterNosys"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel
              :label="$t('Supporter (Not System User)')"
              slot="label"
            ></iLabel>
            <iInput v-model="ruleForm.supporterNosys" disabled></iInput>
          </iFormItem>
          <iFormItem
            label="Supporter Department (Not System User)"
            prop="supporterDeptNosys"
            :hideRequiredAsterisk="true"
            class="item"
          >
            <iLabel
              :label="$t('Supporter Department (Not System User)')"
              slot="label"
            ></iLabel>
            <iInput v-model="ruleForm.supporterDeptNosys" disabled></iInput>
          </iFormItem>
        </div>
        <div class="row-upload">
          <div class="upload">
            <div class="upload-container">
              <iFormItem label="Attachment" prop="attachmentUrl">
                <iLabel :label="$t('Attachment')" slot="label"></iLabel>
                <el-upload
                  action="1"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :show-file-list="false"
                  :http-request="httpUpload"
                  :file-list="fileList"
                  disabled
                  v-show="editOrAdd === 'look'"
                >
                  <iButton
                    type="button"
                    class="upload-button"
                    :loading="uploadLoading"
                    disabled
                  >
                    请选择文件<span class="upload-text"
                      ><img :src="uploadIcon"
                    /></span>
                  </iButton>
                  <!-- <div slot="tip" class="el-upload__tip">
                  文件大小最大限制10M
                </div> -->
                </el-upload>
                <el-upload
                  action="1"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :show-file-list="false"
                  :http-request="httpUpload"
                  :file-list="fileList"
                  v-show="editOrAdd !== 'look'"
                  :disabled="ruleForm.state === '02'"
                >
                  <iButton
                    type="button"
                    class="upload-button"
                    :loading="uploadLoading"
                    :disabled="ruleForm.state === '02'"
                  >
                    请选择文件<span class="upload-text"
                      ><img :src="uploadIcon"
                    /></span>
                  </iButton>
                  <!-- <div slot="tip" class="el-upload__tip">
                  文件大小最大限制10M
                </div> -->
                </el-upload>
              </iFormItem>
              <div class="el-upload-text">文件大小最大限制30M</div>
            </div>
            <ul class="file-list">
              <li v-for="(item, index) of attachments" :key="index">
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
          </div>
          <div class="remark">
            <iFormItem
              label="Remark"
              prop="remark"
              :hideRequiredAsterisk="true"
            >
              <iLabel :label="$t('Remark')" slot="label"></iLabel>
              <iInput
                v-model="ruleForm.remark"
                v-show="editOrAdd !== 'look'"
                :disabled="ruleForm.state === '02'"
              ></iInput>
              <iInput
                v-model="ruleForm.remark"
                v-show="editOrAdd === 'look'"
                disabled
              ></iInput>
            </iFormItem>
          </div>
        </div>
      </el-form>
    </iEditForm>
    <div class="button-list">
      <iButton @click="clearDiolog" class="cancel" v-show="editOrAdd !== 'look'"
        >{{ $t('LK_QUXIAO') }}
      </iButton>
      <iButton
        @click="handleSubmit"
        class="save"
        v-show="editOrAdd !== 'look'"
        :loading="loading"
        >{{ $t('LK_BAOCUN') }}
      </iButton>
    </div>
  </iDialog>
</template>

<script>
import { iButton, iDialog, iFormItem, iInput, iLabel, iMessage } from 'rise'
import iEditForm from '@/components/iEditForm'
import uploadIcon from '@/assets/images/upload-icon.svg'
import {
  addThemenAttachment,
  findTheThemenById,
  saveThemen,
  updateThemen
} from '@/api/meeting/details'
import { getReceiverById, uploadFile } from '@/api/meeting/type'
import { download } from '@/utils/downloadUtil'

export default {
  components: {
    iDialog,
    iFormItem,
    iInput,
    iLabel,
    iEditForm,
    iButton
  },
  props: {
    lookThemenObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
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
    },
    editOrAdd: {
      type: String,
      default: () => {
        return 'add'
      }
    }
  },
  data() {
    const validateSupporter = (rule, value, callback) => {
      if (
        (value === '' || value.length === 0) &&
        this.ruleForm.supporterNosys === ''
      ) {
        callback(new Error('系统用户和非系统用户不能同时为空'))
      } else {
        if (value && value.length > 255) {
          callback(new Error('最大不能超过255字符'))
        }
        callback()
      }
    }
    const validateSupporterNosys = (rule, value, callback) => {
      if (
        !value.trim() &&
        (this.ruleForm.supporter === '' || this.ruleForm.supporter.length === 0)
      ) {
        callback(new Error('系统用户和非系统用户不能同时为空'))
      } else {
        if (value && value.length > 255) {
          callback(new Error('最大不能超过255字符'))
        }
        callback()
      }
    }
    const validatePresenter = (rule, value, callback) => {
      if (
        (value === '' || value.length === 0) &&
        this.ruleForm.presenterNosys === ''
      ) {
        callback(new Error('系统用户和非系统用户不能同时为空'))
      } else {
        if (value && value.length > 255) {
          callback(new Error('最大不能超过255字符'))
        }
        callback()
      }
    }
    const validatePresenterNosys = (rule, value, callback) => {
      if (
        !value.trim() &&
        (this.ruleForm.presenter === '' || this.ruleForm.presenter.length === 0)
      ) {
        callback(new Error('系统用户和非系统用户不能同时为空'))
      } else {
        if (value && value.length > 255) {
          callback(new Error('最大不能超过255字符'))
        }
        callback()
      }
    }
    const validateTopic = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('必填'))
      } else {
        if (value && value.length > 255) {
          callback(new Error('最大不能超过255字符'))
        }
        callback()
      }
    }
    return {
      loading: false,
      uploadLoading: false,
      showWord: true,
      uploadIcon,
      supporterIdArr: [],
      presenterIdArr: [],
      selectUserArr: [],
      ruleForm: {
        topic: '',
        duration: '',
        count: '',
        presenter: [],
        presenterDept: '',
        presenterDeptNosys: '',
        presenterNosys: '',
        remark: '',
        supporter: [],
        supporterDept: '',
        supporterDeptNosys: '',
        supporterNosys: ''
      },
      presenterStr: '',
      supporterStr: '',
      attachment: {},
      attachments: [],
      rules: {
        // topic: [
        //   { required: true, message: "必填", trigger: "blur" },
        //   { min: 1, max: 255, message: "最大长度 255 字符", trigger: "blur" },
        // ],
        topic: [
          {
            trigger: 'blur',
            validator: validateTopic
          }
        ],
        remark: [{ max: 255, message: '最大长度 255 字符', trigger: 'blur' }],
        supporter: [{ validator: validateSupporter, trigger: 'blur' }],
        presenter: [{ validator: validatePresenter, trigger: 'blur' }],
        supporterDept: [
          { max: 255, message: '最大长度 255 字符', trigger: 'blur' }
        ],
        supporterDeptNosys: [
          { max: 255, message: '最大长度 255 字符', trigger: 'blur' }
        ],
        supporterNosys: [
          {
            // max: 255,
            // message: "最大长度 255 字符000",
            trigger: 'blur',
            validator: validateSupporterNosys
          }
        ],
        // presenter: [{ max: 255, message: "最大长度 255 字符", trigger: "blur" }],
        presenterDept: [
          { max: 255, message: '最大长度 255 字符', trigger: 'blur' }
        ],
        presenterDeptNosys: [
          { max: 255, message: '最大长度 255 字符', trigger: 'blur' }
        ],
        presenterNosys: [
          {
            // max: 255,
            // message: "最大长度 255 字符000",
            trigger: 'blur',
            validator: validatePresenterNosys
          }
        ],
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
        count: [
          {
            type: 'number',
            message: '最大长度3位',
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
        ]
      },
      userData: [],
      currentSearchUserData: [],
      timeout: null
    }
  },
  mounted() {
    let duration = 0
    if (this.editOrAdd === 'edit') {
      this.ruleForm = { ...this.selectedTableData[0] }
      this.attachments = [...this.selectedTableData[0].attachments]
      duration = this.selectedTableData[0].duration
      this.queryThemen()
      this.getUsersByResponse()
    }
    if (this.editOrAdd === 'add') {
      duration = this.meetingInfo.duration
      this.getUsersByResponse()
    }
    if (this.editOrAdd === 'look') {
      this.ruleForm = this.lookThemenObj
      this.attachments = [...this.lookThemenObj.attachments]
      return
    }
    this.ruleForm = {
      ...this.ruleForm,
      duration
    }
  },
  computed: {
    supporterIdArrAndCurrentSearchUserData() {
      return {
        currentSearchUserData: this.currentSearchUserData,
        supporterIdArr: this.supporterIdArr,
        presenterIdArr: this.presenterIdArr
      }
    }
  },
  watch: {
    supporterIdArrAndCurrentSearchUserData: {
      handler(newV) {
        this.ruleForm.supporter = newV.currentSearchUserData.filter((item) => {
          return newV.supporterIdArr.some((it) => {
            return Number(item.id) === Number(it)
          })
        })
        this.ruleForm.presenter = newV.currentSearchUserData.filter((item) => {
          return newV.presenterIdArr.some((it) => {
            return Number(item.id) === Number(it)
          })
        })
      },
      deep: true
    },
    presenterIdArr: {
      handler() {}
    },
    lookThemenObj: {
      handler() {
        // console.log(newV);
      },
      immediate: true,
      deep: true
    },
    'ruleForm.count': {
      handler(newV) {
        this.ruleForm = {
          ...this.ruleForm,
          count: newV ? newV : null
        }
      }
    },
    'ruleForm.presenter': {
      handler: function (newV) {
        let arr = newV.map((item) => {
          return item.id
        })
        let arrStr = arr.join(',')
        if (typeof arrStr === 'string') {
          this.presenterStr = arrStr
        }
        if (this.editOrAdd !== 'look') {
          this.ruleForm.presenterDept = Array.from(
            new Set(
              this.currentSearchUserData
                .filter((item) => {
                  return arr.some((it) => {
                    return it === item.id
                  })
                })
                .map((item) => {
                  return item.department
                })
            )
          ).join(',')
        }
      },
      immediate: true
    },
    'ruleForm.supporter': {
      handler: function (newV) {
        let arr = newV.map((item) => {
          return item.id
        })
        let arrStr = arr.join(',')
        if (typeof arrStr === 'string') {
          this.supporterStr = arrStr
        }
        if (this.editOrAdd !== 'look') {
          this.ruleForm.supporterDept = Array.from(
            new Set(
              this.currentSearchUserData
                .filter((item) => {
                  return arr.some((it) => {
                    return it === item.id
                  })
                })
                .map((item) => {
                  return item.department
                })
            )
          ).join(',')
        }
      },
      immediate: true
    }
    // supporterStr: {
    //   handler(v) {
    //     if (v) {
    //       let arr = v.split(",");
    //       this.ruleForm.supporter = arr;
    //     }
    //   },
    // },
    // presenterStr: {
    //   handler(v) {
    //     if (v) {
    //       let arr = v.split(",");
    //       this.ruleForm.presenter = arr;
    //     }
    //   },
    // },
    // currentSearchUserData: {
    //   handler(v) {
    //     if (this.editOrAdd !== "look") {
    //       this.ruleForm.supporterDept = Array.from(
    //         new Set(
    //           v
    //             .filter((item) => {
    //               return this.ruleForm.supporter.some((it) => {
    //                 return it === item.name;
    //               });
    //             })
    //             .map((item) => {
    //               return item.dept;
    //             })
    //         )
    //       ).join(",");
    //       this.ruleForm.presenterDept = Array.from(
    //         new Set(
    //           v
    //             .filter((item) => {
    //               return this.ruleForm.presenter.some((it) => {
    //                 return it === item.name;
    //               });
    //             })
    //             .map((item) => {
    //               return item.dept;
    //             })
    //         )
    //       ).join(",");
    //     }
    //   },
    // },
  },
  methods: {
    handleDeleteFile(file) {
      // console.log(file);
      this.attachments = this.attachments.filter((item) => {
        return item.attachmentId !== file.attachmentId
      })
    },
    queryThemen() {
      const data = {
        themenId: this.ruleForm.id,
        meetingId: this.meetingInfo.id
      }
      findTheThemenById(data).then((res) => {
        this.supporterIdArr = res.supporter.split(',')
        this.presenterIdArr = res.presenter.split(',')
      })
    },
    handleDownload(row) {
      download({
        fileIds: row.attachmentId,
        filename: row.attachmentName,
        callback: (e) => {
          if (!e) {
            iMessage.error('下载失败')
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
      this.shouldUploadAttachments = this.attachments
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
      // console.log(this.shouldUploadAttachments);
      // if (this.editOrAdd === "add") {
      //   return;
      // }
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
    //后端查询所有的presenter和supporter(获取用户信息)
    // getUsersByResponse() {
    //   const data = {
    //     pageNum: 1,
    //     pageSize: 1000,
    //   };
    //   getUsers(data).then((res) => {
    //     this.userData = res.data;
    //     console.log(this.userData);
    //     this.currentSearchUserData = [...this.userData];
    //   });
    // },
    getUsersByResponse() {
      const data = {
        // pageNum: 1,
        // pageSize: 1000,
        id: this.meetingInfo.receiverId
      }
      getReceiverById(data).then((res) => {
        this.userData = res.employeeDTOS
        this.currentSearchUserData = [...res.employeeDTOS]
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return state.name
          .toLowerCase()
          .toString()
          .includes(queryString.toLowerCase().toString())
      }
    },
    handlePresenterSelect(val) {
      this.hanldeSelect(val, 'pre')
    },
    handleSupporterSelect(val) {
      this.hanldeSelect(val, 'sup')
    },
    hanldeSelect(val, str) {
      if (str === 'pre') {
        this.ruleForm = {
          ...this.ruleForm,
          presenterDept: this.handleSelectData(val)
        }
        // this.ruleForm.presenterDept = this.handleSelectData(val);
      }
      if (str === 'sup') {
        this.ruleForm = {
          ...this.ruleForm,
          supporterDept: this.handleSelectData(val)
        }
        // this.ruleForm.supporterDept = this.handleSelectData(val);
      }
    },
    handleSelectData(val) {
      return this.currentSearchUserData
        .filter((item) => {
          return item.name === val
        })
        .map((item) => {
          return item.dept
        })
        .join(';')
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload(file) {
      const isLt30M = file.size / 1024 / 1024 < 30
      if (!isLt30M) {
        this.$message.error('文件大小最大限制30M!')
      }
      return isLt30M
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
      this.attachment.attachmentId = res[0].id
      // this.attachment.attachmentUrl = res.url;
      this.attachment.attachmentUrl = res[0].path
      this.attachment.attachmentName = res[0].name
      this.attachments.push({ ...this.attachment })
      iMessage.success(this.$t('上传成功'))
      this.uploadLoading = false
    },
    close() {
      this.$emit('input', false)
      this.$emit('closeDialog', false)
      this.$emit('flushTable')
    },
    clearDiolog(sub) {
      if (sub === 'submit') {
        this.close()
      } else {
        // this.$confirm("是否取消编辑?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        this.close()
        // });
      }
    },
    handleSubmit() {
      // this.$confirm("是否保存议题？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      this.submitForm('ruleForm')
      // });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let inputPresenterStr = this.ruleForm.presenter
            .map((item) => {
              return item.id
            })
            .join(',')
          let inputSupporterStr = this.ruleForm.supporter
            .map((item) => {
              return item.id
            })
            .join(',')
          //开始保存
          if (this.editOrAdd === 'edit') {
            this.handleUploadFile()
            const formData = {
              ...this.ruleForm,
              meetingId: this.meetingInfo.id,
              id: this.selectedTableData[0].id,
              presenter: inputPresenterStr,
              supporter: inputSupporterStr,
              attachments: this.attachments
            }
            console.log('formData', formData)
            updateThemen(formData)
              .then((data) => {
                this.loading = false;
                if (data) {
                  iMessage.success('修改成功')
                } else {
                  iMessage.error('error')
                }
                this.close()
              })
              .catch((err) => {
                this.loading = false;
                console.log('err', err)
              })
          } else {
            this.attachments = this.attachments.map((item) => {
              if (!item.source) {
                return {
                  ...item,
                  source: '04'
                }
              }
              return {
                ...item
              }
            })
            this.ruleForm = {
              ...this.ruleForm,
              attachments: this.attachments,
              presenter: inputPresenterStr,
              supporter: inputSupporterStr
            }
            const formData = {
              themen: {
                ...this.ruleForm,
                id: '',
                meetingId: this.meetingInfo.id,
                isBreak: false
              }
            }
            saveThemen(formData)
              .then((data) => {
                this.loading = false;
                if (data) {
                  iMessage.success('保存成功')
                } else {
                  iMessage.error('error')
                }
                this.close()
              })
              .catch((err) => {
                this.loading = false;
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
  min-height: 608px;
  max-height: 678px;
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

.upload {
  width: 200px;
  display: flex;
  /* flex-direction: column; */
  /* height: 56px; */
  flex-shrink: 0;
  flex-grow: 1;

  .upload-button {
    position: relative;
    /* border: 1px solid #d8dce6; */
    width: 200px;
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
  width: 848px;
  /* height: 365px; */
  border-radius: 10px;
  background: #f9f9f9;
  padding: 31px 66px 30px 67px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;

  .item {
    flex-grow: 1;
    flex-shrink: 0;
    width: 300px;

    .autoSearch {
      width: 300px;
    }
  }

  .item:nth-of-type(2n) {
    margin-left: 115px;
  }
}

::v-deep .row-upload {
  display: flex;
  width: 100%;
  /* height: 131px; */
  margin-top: 20px;
  flex-direction: column;
  padding-bottom: 2px;

  .upload {
    width: 200px;
    flex-shrink: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .upload-container {
      display: flex;

      .el-upload-text {
        color: #919191;
        flex-shrink: 0;
        flex-grow: 1;
        font-size: 12px;
        width: 181px;
        line-height: 14px;
        white-space: nowrap;
        height: 14px;
        transform: translateY(35px);
        text-align: center;
      }
    }

    .file-list {
      flex-shrink: 0;
      flex-grow: 1;
      width: 100%;
      transform: translateY(-10px);

      li {
        height: 20px;
        font-size: 12px;
        margin-bottom: 5px;
        line-height: 20px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .download {
          cursor: pointer;
          color: #1660f1;
          white-space: nowrap;
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
  }

  .remark {
    width: 379px;
    height: 59px;

    .textareac {
      height: 105px !important;
      /* resize: none; */
      .el-textarea__inner {
        height: 105px !important;
        resize: none;
        box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
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
