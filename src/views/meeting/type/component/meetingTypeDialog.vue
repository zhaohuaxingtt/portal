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
                    :loading="uploadLoading"
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
          </div>
          <div class="input-box">
            <div class="form-row">
              <iFormItem
                label="类型名称"
                prop="name"
                :hideRequiredAsterisk="true"
              >
                <iLabel :label="$t('类型名称')" slot="label" required></iLabel>
                <iInput
                  v-model="ruleForm.name"
                  :disabled="
                    selectedTableData[0]
                      ? selectedTableData[0].name === 'Pre CSC' ||
                        selectedTableData[0].name === 'CSC'
                      : false
                  "
                ></iInput>
              </iFormItem>
              <iFormItem
                label="生成会议名称后缀"
                prop="meetingNameSuffix"
                :rules="
                  ruleForm.category == '01'
                    ? ''
                    : rules.meetingNameSuffixNoRequired
                "
              >
                <iLabel
                  :label="$t('生成会议名称后缀')"
                  slot="label"
                  :required="ruleForm.category == '01'"
                ></iLabel>
                <iInput
                  v-model="ruleForm.meetingNameSuffix"
                  :disabled="
                    selectedTableData[0]
                      ? selectedTableData[0].name === 'Pre CSC' ||
                        selectedTableData[0].name === 'CSC'
                      : false
                  "
                ></iInput>
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
                  @change="selectChanged"
                  :disabled="
                    selectedTableData[0]
                      ? selectedTableData[0].name === 'Pre CSC' ||
                        selectedTableData[0].name === 'CSC'
                      : false
                  "
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
            </div>
            <div class="form-row">
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
                <iSelect
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
                </iSelect>
              </iFormItem>
              <iFormItem
                label="会议属性"
                prop="meetingAttribute"
                :hideRequiredAsterisk="true"
                class="item"
                :rules="
                  ruleForm.category == '03' ? '' : meetingAttributeNoRequired
                "
              >
                <iLabel
                  :label="$t('会议属性')"
                  slot="label"
                  :required="ruleForm.category == '03'"
                ></iLabel>
                <iSelect
                  class="autoSearch"
                  v-model="ruleForm.meetingAttribute"
                  value-key="id"
                >
                  <el-option
                    v-for="item in meetingAttributeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>
            <div class="form-row" v-if="ruleForm.category != '01'">
              <iFormItem
                label="会议结论配置"
                prop="conclusionConfig"
                :hideRequiredAsterisk="true"
                class="item conclusion-config"
                :rules="
                  ruleForm.category != '01'
                    ? conclusionConfigRule
                    : conclusionConfigRuleNoRequired
                "
              >
                <iLabel
                  :label="$t('会议结论配置')"
                  slot="label"
                  :required="ruleForm.category != '01'"
                ></iLabel>
                <iSelect
                  class="autoSearch"
                  v-model="ruleForm.conclusionConfig"
                  value-key="id"
                  multiple
                >
                  <el-option
                    v-for="item in ruleForm.category == '02'
                      ? conclusionConfigList3
                      : conclusionConfigList2"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
              <iFormItem
                label="会议上下限金额"
                :hideRequiredAsterisk="true"
                class="itemLimit"
              >
                <iLabel
                  :label="$t('会议上下限金额')"
                  slot="label"
                  :required="ruleForm.category == '03'"
                ></iLabel>
                <el-col :span="12">
                  <iFormItem
                    prop="lowerLimitMoney"
                    :rules="
                      ruleForm.category == '03'
                        ? limitMoneyRequired
                        : limitMoney
                    "
                  >
                    <iInput
                      class="limitMoney"
                      placeholder="下限"
                      v-model.number="ruleForm.lowerLimitMoney"
                      type="number"
                    ></iInput>
                  </iFormItem>
                </el-col>
                <el-col :span="1">-</el-col>
                <el-col :span="7">
                  <iFormItem
                    prop="lowerLimitMoney"
                    :rules="
                      ruleForm.category == '03'
                        ? limitMoneyRequired
                        : limitMoney
                    "
                  >
                    <iInput
                      class="limitMoney"
                      placeholder="上限"
                      v-model.number="ruleForm.upperLimitMoney"
                      type="number"
                    ></iInput>
                  </iFormItem>
                </el-col>
              </iFormItem>
            </div>
            <div class="form-row" v-if="ruleForm.category != '01'">
              <iFormItem
                label="关联关系"
                prop="incidenceRelation"
                :hideRequiredAsterisk="true"
                class="item"
                :rules="
                  ruleForm.category == '03'
                    ? incidenceRelationRule
                    : incidenceRelationRuleNoRequired
                "
              >
                <iLabel
                  :label="$t('关联关系')"
                  slot="label"
                  :required="ruleForm.category == '03'"
                ></iLabel>
                <iSelect
                  class="autoSearch"
                  v-model="ruleForm.incidenceRelation"
                  multiple
                  filterable
                  collapse-tags
                  value-key="id"
                >
                  <el-option
                    v-for="item in incidenceRelationList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
              <iFormItem
                label="默认议题时长"
                :hideRequiredAsterisk="true"
                class="time"
                prop="duration"
              >
                <iLabel
                  :label="$t('默认议题时长')"
                  slot="label"
                  required
                ></iLabel>
                <div class="time-box">
                  <iInput
                    style="width: 180px"
                    v-model.number="ruleForm.duration"
                    type="number"
                  ></iInput>
                  <span>分钟</span>
                </div>
              </iFormItem>
            </div>
            <div class="form-row" v-if="ruleForm.category == '01'">
              <iFormItem
                label="会议上下限金额"
                :hideRequiredAsterisk="true"
                class="itemLimit"
              >
                <iLabel :label="$t('会议上下限金额')" slot="label"></iLabel>
                <el-col :span="12">
                  <iFormItem prop="lowerLimitMoney" :rules="limitMoney">
                    <iInput
                      class="limitMoney"
                      placeholder="下限"
                      v-model.number="ruleForm.lowerLimitMoney"
                      type="number"
                    ></iInput>
                  </iFormItem>
                </el-col>
                <el-col :span="1">-</el-col>
                <el-col :span="7">
                  <iFormItem prop="upperLimitMoney" :rules="limitMoney">
                    <iInput
                      class="limitMoney"
                      placeholder="上限"
                      v-model.number="ruleForm.upperLimitMoney"
                      type="number"
                    ></iInput>
                  </iFormItem>
                </el-col>
              </iFormItem>
              <iFormItem
                label="关联关系"
                :hideRequiredAsterisk="true"
                class="item"
                :rules="
                  ruleForm.category == '03'
                    ? incidenceRelationRule
                    : incidenceRelationRuleNoRequired
                "
              >
                <iLabel
                  :label="$t('关联关系')"
                  slot="label"
                  :required="ruleForm.category == '03'"
                ></iLabel>
                <iSelect
                  class="autoSearch"
                  v-model="ruleForm.incidenceRelation"
                  multiple
                  filterable
                  collapse-tags
                  value-key="id"
                >
                  <el-option
                    v-for="item in incidenceRelationList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>
            <div class="form-select" v-if="ruleForm.category == '01'">
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
              <div class="form-time-len">
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
              <div class="form-time-len" ref="selectProcess">
                <iFormItem label="审批流程" prop="approvalProcessId">
                  <iLabel
                    :label="$t('审批流程')"
                    slot="label"
                    required
                  ></iLabel>
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
        </div>
        <!-- <div class="word" v-show="showWord">
          <div class="word-content">建议使用16:9比例，图片最大15M</div>
        </div> -->
        <div class="button-list">
          <el-form-item>
            <iButton @click="clearDiolog" class="cancel"
              >{{ $t('LK_QUXIAO') }}
            </iButton>
            <iButton @click="handleSubmit">{{ $t('LK_BAOCUN') }}</iButton>
          </el-form-item>
        </div>
        <div class="error-node" :show="false">
          <div class="el-form-item__error padding-left14">必选</div>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import {
  iButton,
  iDialog,
  iFormItem,
  iInput,
  iLabel,
  iMessage,
  iSelect
} from 'rise'
// import { baseRules } from "./data";
import uploadIcon from '@/assets/images/upload-icon.svg'
import iEditForm from '@/components/iEditForm'
import {
  findMeetingTypesByProperties,
  saveMettingType,
  updateMettingType,
  uploadFile
} from '@/api/meeting/type'
// import { MOCK_FILE_URL } from '@/constants'
import { getListByParam, getUsers } from '@/api/usercenter/receiver.js'
// import { getFileByIds } from '@/api/file/filedownload.js'
import { getMeetingPropertyList } from '@/api/meeting/home'

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
    },
    approvalProcess: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    // const validateUpper = (rule, value, callback) => {
    //   if (this.ruleForm.upperLimitMoney == '') {
    //     callback(new Error('必填'))
    //   }
    // }
    const validateApprovalProcessId = (rule, value, callback) => {
      let approvalProcessId = value
      if (this.ruleForm.isTriggerApproval) {
        approvalProcessId = this.ruleForm.approvalProcessId
          ? this.ruleForm.approvalProcessId
          : this.approvalProcess.find((item) => {
              return item.name === this.ruleForm.approvalProcessName
            })
          ? this.ruleForm.approvalProcessId
            ? this.ruleForm.approvalProcessId
            : this.approvalProcess.find((item) => {
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
    const validateLimitiMoney = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (String(value).trim() === '' || Number(value) <= 0) {
          callback(new Error('必须正整数'))
        } else if (
          String(value).indexOf('.') !== -1 ||
          String(value).indexOf('-') !== -1
        ) {
          callback(new Error('必须正整数'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateLimitiMoneyRequired = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (String(value).trim() === '' || Number(value) <= 0) {
          callback(new Error('必须正整数'))
        } else if (
          String(value).indexOf('.') !== -1 ||
          String(value).indexOf('-') !== -1
        ) {
          callback(new Error('必须正整数'))
        } else {
          callback()
        }
      } else {
        callback('必填')
      }
    }
    const validateConclusionConfig = (rule, value, callback) => {
      console.log('value', value)
      if (!value) {
        callback(new Error('必选'))
        return
      }
      if (typeof value === 'object' && value.length === 0) {
        callback(new Error('必选'))
        return
      }
      callback()
    }
    const validateConclusionConfigNoRequired = (rule, value, callback) => {
      console.log('value', value)
      callback()
    }
    const validateIncidenceRelation = (rule, value, callback) => {
      console.log('value', value)
      if (!value) {
        callback(new Error('必选'))
        return
      }
      if (typeof value === 'object' && value.length === 0) {
        callback(new Error('必选'))
        return
      }
      callback()
    }
    const validateIncidenceRelationNoRequired = (rule, value, callback) => {
      callback()
    }
    return {
      incidenceRelationList: [],
      initSelectArr: [],
      selectUserArr: [],
      userDataAll: [],
      uploadLoading: false,
      uploadIcon,
      limitMoney: [
        { validator: validateLimitiMoney, trigger: ['blur', 'change'] }
      ],
      limitMoneyRequired: [
        { validator: validateLimitiMoneyRequired, trigger: ['blur', 'change'] }
      ],
      incidenceRelationRule: [
        { validator: validateIncidenceRelation, trigger: ['blur', 'change'] }
      ],
      incidenceRelationRuleNoRequired: [
        {
          validator: validateIncidenceRelationNoRequired,
          trigger: ['blur', 'change']
        }
      ],
      conclusionConfigRule: [
        { validator: validateConclusionConfig, trigger: ['blur', 'change'] }
      ],
      conclusionConfigRuleNoRequired: [
        {
          validator: validateConclusionConfigNoRequired,
          trigger: ['blur', 'change']
        }
      ],
      rules: {
        name: [
          { required: true, message: '必填', trigger: ['blur', 'change'] },
          {
            min: 1,
            max: 64,
            message: '最大长度 64 字符',
            trigger: ['blur', 'change']
          }
        ],
        meetingNameSuffix: [
          { required: true, message: '必填', trigger: ['blur', 'change'] },
          {
            min: 1,
            max: 64,
            message: '最大长度 64 字符',
            trigger: ['blur', 'change']
          }
        ],
        meetingNameSuffixNoRequired: [
          {
            min: 1,
            max: 64,
            message: '最大长度 64 字符',
            trigger: ['blur', 'change']
          }
        ],
        meetingInfoDesc: [
          {
            max: 255,
            message: '最大长度 255 字符',
            trigger: ['blur', 'change']
          }
        ],
        meetingAttribute: [
          { required: true, message: '必选', trigger: ['blur', 'change'] }
        ],
        meetingAttributeNoRequired: [
          { required: false, message: '必选', trigger: ['blur', 'change'] }
        ],
        duration: [
          { required: true, message: '必填', trigger: ['blur', 'change'] },
          {
            type: 'number',
            message: '最大长度3位，单位（分钟），必须正整数',
            trigger: ['blur', 'change']
          },
          {
            type: 'number',
            message: '最大长度3位，单位（分钟），必须正整数',
            trigger: ['blur', 'change'],
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
          { validator: validateApprovalCoverImage, trigger: ['blur', 'change'] }
        ],
        approvalProcessId: [
          { validator: validateApprovalProcessId, trigger: ['blur', 'change'] }
        ],
        isTriggerApproval: [
          { required: true, message: '必选', trigger: ['blur', 'change'] }
        ],
        userIds: [{ required: true, message: '必选', trigger: ['blur'] }],
        category: [
          { required: true, message: '必选', trigger: ['blur', 'change'] }
        ]
      },

      ruleForm: {
        name: '',
        meetingNameSuffix: '',
        meetingInfoDesc: '',
        duration: '',
        isTriggerApproval: false,
        approvalProcessId: '',
        coverImage: '',
        approvalProcessName: '',
        category: '01',
        meetingAttribute: '',
        incidenceRelation: '',
        conclusionConfig: '',
        userIds: '',
        lowerLimitMoney: '',
        upperLimitMoney: ''
      },
      isApprovalOption: [
        // {
        //   label: '是',
        //   value: true
        // },
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
      meetingAttributeList: [],
      conclusionConfigList2: [
        {
          id: '01',
          name: '待定'
        },
        {
          id: '08',
          name: '通过'
        },
        {
          id: '09',
          name: '预备会通过'
        },
        {
          id: '10',
          name: '不通过'
        },
        {
          id: '11',
          name: 'Last Call'
        },
        {
          id: '12',
          name: '分段定点'
        }
      ],
      conclusionConfigList3: [
        {
          id: '01',
          name: '待定'
        },
        {
          id: '02',
          name: '定点'
        },
        {
          id: '03',
          name: '发LOI'
        },
        {
          id: '04',
          name: '转TER/TOP-TER'
        },
        {
          id: '05',
          name: '下次Pre CSC'
        },
        {
          id: '06',
          name: '转CSC'
        },
        {
          id: '07',
          name: '关闭'
        }
      ],
      value: '',
      isTriggerApproval: false
    }
  },
  mounted() {
    this.quertMeetingPropertyList()
    if (this.editOrAdd === 'edit') {
      this.selectedTableData[0].incidenceRelation = this.selectedTableData[0]
        .incidenceRelation
        ? typeof this.selectedTableData[0].incidenceRelation === 'object'
          ? this.selectedTableData[0].incidenceRelation
          : this.selectedTableData[0].incidenceRelation.split(',')
        : []
      this.selectedTableData[0].conclusionConfig = this.selectedTableData[0]
        .conclusionConfig
        ? typeof this.selectedTableData[0].conclusionConfig === 'object'
          ? this.selectedTableData[0].conclusionConfig
          : this.selectedTableData[0].conclusionConfig.split(',')
        : []
      const userIdsArr = this.selectedTableData[0].userIds
        ? typeof this.selectedTableData[0].userIds === 'object'
          ? this.selectedTableData[0].userIds
          : this.selectedTableData[0].userIds.split(',')
        : []
      this.queryEdit(userIdsArr).then((currentSearchUserData) => {
        this.initSelectArr = [...currentSearchUserData]
        this.ruleForm = {
          ...this.selectedTableData[0],
          userIds: currentSearchUserData,
          //设置触发审批全部为否
          isTriggerApproval: false,
          approvalProcessName: ''
        }
        this.handleLoad()
      })
      findMeetingTypesByProperties({ id: this.selectedTableData[0].id }).then(
        (res) => {
          this.incidenceRelationList = res
        }
      )
    } else {
      findMeetingTypesByProperties({ id: '' }).then((res) => {
        this.incidenceRelationList = res
      })
    }
  },
  watch: {
    'ruleForm.isTriggerApproval': {
      handler(v) {
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
            (item) =>
              Number(item.id) === Number(this.ruleForm.approvalProcessId)
          ).name
        }
        let name = ''
        let id = ''
        if (v) {
          if (this.ruleForm.isTriggerApproval) {
            name = this.approvalProcess.find((item) => item.name === v).name
            id = this.approvalProcess.find((item) => item.name === v).id
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
            (item) => Number(item.id) === Number(v)
          ).name
          id = this.approvalProcess.find(
            (item) => Number(item.id) === Number(v)
          ).id
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
    quertMeetingPropertyList() {
      getMeetingPropertyList().then((res) => {
        this.meetingAttributeList = res.data
      })
    },
    selectChanged() {
      this.ruleForm.conclusionConfig = ''
    },
    async queryEdit(userIdsArr) {
      const res = await getUsers({ userIdList: [...userIdsArr] })
      return res.data
    },
    async query(val) {
      let param = {
        roleCode: process.env.VUE_APP_MEETING_ADMIN_ROLE_CODE,
        nameZh: val || ''
      }
      const res = await getListByParam(param)
      const { data } = res
      this.initSelectArr = [...data]
      return [...data]
    },
    async handleFocus() {
      return await this.remoteMethod()
    },
    async remoteMethod(queryString) {
      let currentSearchUserData = []
      currentSearchUserData = await this.query(queryString)
      this.selectUserArr = currentSearchUserData
      return currentSearchUserData
    },
    httpUpload(content) {
      this.uploadLoading = true
      let formData = new FormData()
      // formData.append("file", content.file);
      formData.append('multifile', content.file)
      formData.append('applicationName', 111)
      formData.append('businessId', 8025)
      formData.append('currentUserId', -1)
      formData.append('type', 1)
      uploadFile(formData)
        .then((res) => {
          this.ruleForm.coverImage = res.data[0].path
          this.$refs['ruleFormCoverImage'].$el.querySelector(
            '.el-form-item__error'
          ).style.display = 'none'
          iMessage.success(this.$t('上传成功'))
          this.uploadLoading = false
        })
        .catch(() => {
          this.uploadLoading = false
        })
      // const res = await uploadFile(formData)
      // // const infoById = await getFileByIds([res[0].id]);
      // console.log('res[0].path', res[0].path)
      // this.ruleForm.coverImage = res[0].path
      // // console.log(info);
      // this.$refs['ruleFormCoverImage'].$el.querySelector(
      //     '.el-form-item__error'
      // ).style.display = 'none'
      // iMessage.success(this.$t('上传成功'))
      // this.uploadLoading = false
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
      let errorNode = document.querySelector('.error-node>.el-form-item__error')
      document
        .querySelector('.conclusion-config>.el-form-item__content')
        .appendChild(errorNode)
      document.querySelector(
        '.conclusion-config .el-input__inner'
      ).style.borderColor = '#EF3737'
      console.log('this.ruleForm', this.ruleForm)
      // this.$confirm("是否保存该 会议类型?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      if (this.ruleForm.lowerLimitMoney > this.ruleForm.upperLimitMoney) {
        iMessage.error('下限金额不能大于上限金额！')
      } else {
        this.submitForm('ruleForm')
      }
      //});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userIdsStr = this.ruleForm.userIds
            .map((item) => {
              return item.id
            })
            .join(',')
          let incidenceRelationStr =
            this.ruleForm.incidenceRelation &&
            this.ruleForm.incidenceRelation
              .map((item) => {
                return item
              })
              .join(',')
          let conclusionConfigStr =
            this.ruleForm.conclusionConfig &&
            this.ruleForm.conclusionConfig
              .map((item) => {
                return item
              })
              .join(',')
          let formData = {
            ...this.ruleForm,
            userIds: userIdsStr,
            incidenceRelation: incidenceRelationStr,
            conclusionConfig: conclusionConfigStr
          }
          if (this.ruleForm.isTriggerApproval) {
            let approvalProcessId = this.ruleForm.approvalProcessId
              ? this.approvalProcess.find((item) => {
                  return item.id === this.ruleForm.approvalProcessId
                }).id
              : this.approvalProcess.find((item) => {
                  return item.name === this.ruleForm.approvalProcessName
                }).id
            formData = {
              ...this.ruleForm,
              approvalProcessId,
              userIds: userIdsStr,
              incidenceRelation: incidenceRelationStr,
              conclusionConfig: conclusionConfigStr
            }
          }
          if (this.editOrAdd === 'edit') {
            updateMettingType(formData)
              .then((data) => {
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
              .catch((err) => {
                console.log('err', err)
              })
          } else {
            saveMettingType(formData)
              .then((data) => {
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
              .catch((err) => {
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
    beforeAvatarUpload(file) {
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
    height: 162px;
    background-image: url('../../../../assets/images/imgBg.svg');
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

    .form-upload {
      width: 288px;
      display: flex;
      margin-top: 2.7rem;
      // flex-direction: column;
      height: 56px;
      flex-shrink: 0;
      flex-grow: 1;

      .upload-button {
        position: relative;
        /* border: 1px solid #d8dce6; */
        width: 288px;
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
  }

  .input-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .form-row {
      width: 640px;
      display: flex;
      margin-bottom: 1rem;
      justify-content: space-between;

      .el-form-item {
        width: 100%;
        /* height: 56px; */
      }

      .el-form-item + .el-form-item {
        margin-left: 40px;
      }

      .itemLimit {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .limitMoney {
          width: 140px;
        }
      }
    }

    // .form-row:last-child {
    //   transform: translateY(26px);
    // }
  }
}

// .select-box {
//   display: flex;
//   width: 100%;
//   margin-top: 40px;
//   padding-left: 20px;
// }

.form-select {
  width: 640px;
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;

  .el-form-item + .el-form-item {
    margin-left: 40px;
  }

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
