<template>
  <div>
    <el-form
      :model="basicRuleForm"
      ref="basicRuleForm"
      :rules="basicRules"
      :hideRequiredAsterisk="true"
      class="form-box"
    >
      <div>
        <el-row class="input-box">
          <div class="form-row">
            <div class="form-item-row1-col3">
              <iFormItem label="问卷模块" prop="surveyModel">
                <iLabel
                  :label="$t('QN_WENJUANMOKUAI')"
                  slot="label"
                  required
                  style="width: 7.75rem"
                ></iLabel>
                <iSelect
                  v-model="basicRuleForm.surveyModel"
                  :placeholder="language('QN_QINGXUANZE')"
                  style="width: 15rem"
                >
                  <el-option
                    v-for="(item, index) in surveyTypeList"
                    :key="index.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>
            <div class="form-item-row1-col3">
              <iFormItem label="问卷类型" prop="type">
                <iLabel
                  :label="$t('QN_WENJUANLEIXING')"
                  slot="label"
                  required
                  style="width: 7.75rem"
                ></iLabel>
                <iSelect
                  v-model="basicRuleForm.type"
                  :placeholder="language('QN_QINGXUANZE')"
                  style="width: 15rem"
                >
                  <el-option
                    v-for="(item, index) in surveyType"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>
            <div class="form-item-row1-col3">
              <iFormItem label="问卷截止时间" prop="endTime">
                <iLabel
                  :label="language('问卷截止时间')"
                  slot="label"
                  required
                  style="width: 9.75rem"
                ></iLabel>
                <!-- <iDatePicker
                  value-format="yyyy-MM-dd"
                  type="date"
                  v-model="basicRuleForm.endTime"
                  :picker-options="pickerOptions"
                  placeholder="请选择"
                /> -->
                <el-date-picker
                  v-model="basicRuleForm.endTime"
                  :picker-options="pickerOptions"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm"
                  :placeholder="language('QN_QINGXUANZE')"
                  default-time="23:59:59"
                  style="width: 322px"
                  @change="handle"
                ></el-date-picker>
              </iFormItem>
            </div>
          </div>
        </el-row>

        <el-row class="input-box">
          <div class="form-row">
            <div class="form-item-row1-col3">
              <iFormItem label="问卷名称" prop="name">
                <iLabel
                  :label="$t('QN_WENJUANMINGCHENG')"
                  slot="label"
                  required
                  style="width: 7.75rem"
                ></iLabel>
                <iInput
                  v-model="basicRuleForm.name"
                  @keydown.native="keydown($event)"
                />
              </iFormItem>
            </div>
          </div>
        </el-row>

        <div class="form-row">
          <div class="form-item-row1-col3">
            <iFormItem label="问卷说明" prop="surveyDescription">
              <iLabel
                :label="language('问卷说明')"
                slot="label"
                style="width: 7.75rem"
              ></iLabel>
              <iInput
                type="textarea"
                :rows="3"
                placeholder=""
                v-model="basicRuleForm.surveyDescription"
                resize="none"
              />
            </iFormItem>
          </div>
        </div>

        <div class="form-row">
          <div class="form-item-row1-col3">
            <iFormItem label="结束语" prop="closing">
              <iLabel
                :label="language('结束语')"
                slot="label"
                style="width: 7.75rem"
              ></iLabel>
              <iInput
                type="textarea"
                :rows="3"
                placeholder=""
                v-model="basicRuleForm.closing"
                resize="none"
              />
            </iFormItem>
          </div>
        </div>

        <el-row class="inputSixty">
          <div class="form-row">
            <div class="form-item-row1-col3">
              <iFormItem label="投放范围" prop="putoutRange">
                <iLabel
                  :label="language('投放范围')"
                  slot="label"
                  style="width: 7.75rem"
                  required
                ></iLabel>
                <div
                  class="item--input"
                  v-if="
                    basicRuleForm.groupIds != '' &&
                    basicRuleForm.groupIds != null
                  "
                  @click="handleClickUserGroup"
                >
                  <iInput
                    :title="basicRuleForm.groupNames"
                    disabled
                    v-model="basicRuleForm.groupNames"
                  >
                  </iInput>
                </div>
                <iSelect
                  v-else
                  class="autoSearch"
                  v-model="basicRuleForm.putoutRange"
                  @input="handleChangePublishRange"
                >
                  <el-option
                    v-for="item in putOutRange"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>
          </div>
        </el-row>
        <el-row class="inputSixty">
          <iFormItem label="上传封面" prop="surveyCover">
            <iLabel
              :label="language('上传封面')"
              slot="label"
              required
              style="width: 7.75rem"
            ></iLabel>
            <div class="upload-content">
              <el-upload
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
                accept="image/png,image/jpeg,image/gif,image/jpg"
                :http-request="httpUpload"
                :disabled="upLoading"
              >
                <div class="image-box">
                  <img
                    ref="img"
                    :src="basicRuleForm.surveyCover"
                    class="avatar"
                    @error="handleError"
                    @load="handleLoad"
                  />
                </div>
              </el-upload>
              <!-- :src="
                    basicRuleForm.surveyCover.substr(
                      0,
                      basicRuleForm.surveyCover.indexOf('&')
                    )
                  " -->
              <div>
                <el-upload
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :show-file-list="false"
                  accept="image/png,image/jpeg,image/gif,image/jpg"
                  :http-request="httpUpload"
                  :disabled="upLoading"
                >
                  <iButton
                    type="button"
                    class="upload-button"
                    :uploadLoading="uploadLoading"
                  >
                    {{ language('QN_SHANGCHUANTUPIAN') }}
                  </iButton>
                  <div slot="tip" class="el-upload__tip">
                    {{
                      language(
                        '建议使用宽16:9的图片｜单张图片最大不超过15M容量'
                      )
                    }}
                  </div>
                </el-upload>
                <div
                  class="el-upload-list el-upload-list--text"
                  v-if="this.basicRuleForm.surveyCover !== ''"
                  style="width: 25rem"
                >
                  <li tabindex="0" class="el-upload-list__item is-success">
                    <a class="el-upload-list__item-name">
                      <i class="el-icon-paperclip">
                        {{ this.basicRuleForm.coverName }}
                      </i>
                    </a>
                    <label class="el-upload-list__item-status-label">
                      <i
                        class="el-icon-upload-success el-icon-circle-check"
                      ></i>
                    </label>
                    <i
                      @click="handleDeleteAccessory()"
                      class="el-icon-close"
                    ></i>
                    <i class="el-icon-close-tip"></i>
                  </li>
                </div>
              </div>
            </div>
          </iFormItem>
        </el-row>
      </div>
    </el-form>
    <iDialog
      :title="$t('QN_ZIDINGYIYONGHUZUXUANZE')"
      :visible.sync="customDialogVisible"
      width="20%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="custom--dialog">
        <iInput
          :placeholder="$t('QN_SOUSUOYONGHUZU')"
          v-model="searchGroupInputVal"
          @keyup.enter.native="handleKeyupEnter"
        >
          <i
            @click="handleKeyupEnter(searchGroupInputVal)"
            slot="suffix"
            class="el-input__icon el-icon-search"
            style="color: #1763f7; cursor: pointer"
          ></i>
        </iInput>
        <div class="custom--checkbox">
          <el-checkbox-group
            :value="groupCheckList"
            @input="handleGroupCheckList"
          >
            <el-checkbox
              v-for="item in groupList"
              :key="item.id"
              :label="item.id"
              >{{ item.groupName }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <iButton @click="handleClose">{{ $t('QN_QUXIAO') }}</iButton>
        <iButton @click="handleConfirm">{{ $t('QN_QUEDING') }}</iButton>
      </span>
    </iDialog>
  </div>
</template>
<script>
import {
  iLabel,
  iInput,
  iFormItem,
  iButton,
  iSelect,
  iMessage,
  iDialog
} from 'rise'
import { surveyType } from './data'
import { uploadFile } from '@/api/survey/uploadFile.js'
import {
  findPutoutRange,
  findAdminPermission,
  findGroupList
} from '@/api/survey/survey'
export default {
  // name: "Basis",
  components: {
    iLabel,
    iInput,
    iFormItem,
    iSelect,
    iButton,
    iDialog
  },
  watch: {
    'basicRuleForm.groupIds': function () {
      if (this.basicRuleForm.groupIds != '') {
        this.groupCheckList = this.basicRuleForm.groupIds.split(',')
        this.groupCheckList = this.groupCheckList.map((item) => {
          return Number(item)
        })
      }
    }
  },
  mounted() {
    this.queryUser().then(() => {
      const id = this.$route.query.id
      if (id) {
        this.query({ id: this.$route.query.id })
      }
    })
    // this.surveyTypeList = [
    //   { label: '采购问卷', value: 1, code: 7 },
    //   { label: '物流问卷', value: 2, code: 8 },
    //   { label: '质保问卷', value: 3, code: 9 }
    // ]
    findAdminPermission().then((res) => {
      this.surveyTypeList = res?.filter((item) => {
        return item.code > 6 && item.code < 10
      })
    })
  },
  props: {
    basicRuleForm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    putoutRangeCopy: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    const validLength = function (rule, value, callback) {
      function getStrLength(str) {
        return str.replace(/[^x00-xff]/g, 'xx').length
      }
      if (!value) {
        callback()
      } else if (getStrLength(value) <= this.maxLength) {
        callback()
      } else {
        return callback(
          new Error(
            `${this.$t('QN_ZUIDACHANGDUZHONGWEN')} ${
              this.maxLength / 2
            } ${this.$t('QN_ZIFU')}，${this.$t('QN_YINGWEN')} ${
              this.maxLength
            } ${this.$t('QN_ZIFU')}`
          )
        )
      }
    }

    const length20 = {
      maxLength: 40
    }
    const length30 = {
      maxLength: 60
    }
    const length200 = {
      maxLength: 400
    }

    return {
      copyFile: '',
      customDialogVisible: false,
      // curPutOutUserArr: "",
      searchGroupInputVal: '',
      basicRules: {
        surveyModel: [
          {
            required: true,
            message: this.$t('QN_BITIAN'),
            trigger: ['blur', 'change']
          }
        ],
        type: [
          {
            required: true,
            message: this.$t('QN_BITIAN'),
            trigger: ['blur', 'change']
          }
        ],
        endTime: [
          {
            required: true,
            message: this.$t('QN_BITIAN'),
            trigger: ['blur', 'change']
          }
        ],
        putoutRange: [
          {
            required: true,
            message: this.$t('QN_BITIAN'),
            trigger: ['blur', 'change']
          }
        ],
        name: [
          {
            required: true,
            message: this.$t('QN_BITIAN'),
            trigger: ['blur', 'change']
          },
          // {
          //   min: 1,
          //   max: 20,
          //   message: "最大长度 20 字符",
          //   trigger: ["blur", "change"],
          // },
          {
            validator: validLength.bind(length20),
            trigger: ['blur', 'change']
          }
        ],
        surveyDescription: [
          // {
          //   min: 1,
          //   max: 200,
          //   message: "最大长度 200 字符",
          //   trigger: ["blur", "change"],
          // },
          {
            validator: validLength.bind(length200),
            trigger: ['blur', 'change']
          }
        ],
        closing: [
          // {
          //   min: 1,
          //   max: 30,
          //   message: "最大长度 30 字符",
          //   trigger: ["blur", "change"],
          // },
          {
            validator: validLength.bind(length30),
            trigger: ['blur', 'change']
          }
        ],
        surveyCover: [
          {
            required: true,
            message: this.$t('QN_BITIAN'),
            trigger: ['blur', 'change']
          }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 // 选当前时间之后的时间
        }
      },
      surveyType,
      surveyTypeList: [],
      putOutRange: [],
      groupList: [],
      groupCheckList: [],
      // 弹框选中的自定义项
      userGroup: [],
      upLoading: false
    }
  },
  // watch: {
  // curPutOutUserArr: {
  //   handler(v) {
  //     // this.basicRuleForm.putoutRange = v.map((item) => {
  //     //   return item.code;
  //     // });
  //     this.basicRuleForm.putoutRange = v
  //   },
  //   immediate: true,
  //   deep: true,
  // },
  // },
  methods: {
    // validateTextLength(value) {
    //   //中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
    //   let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
    //   let mat = value.match(cnReg);
    //   let length = 0;
    //   if (mat) {
    //     return (length = mat.length + (value.length - mat.length) * 0.5);
    //   } else {
    //     return (length = value.length * 0.5);
    //   }
    // },

    handleGroupCheckList(val) {
      this.groupCheckList = val
    },

    // 获取自定义接口的内容
    getGroupList(e) {
      findGroupList(e).then((res) => {
        this.groupList = res
      })
    },

    // 点击input框
    handleClickUserGroup() {
      this.getGroupList({ category: this.basicRuleForm.surveyModel })
      this.customDialogVisible = true
      // this.groupCheckList = this.basicRuleForm.groupNames;
    },

    // 选中的投放范围code
    handleChangePublishRange(val) {
      this.basicRuleForm.putoutRange = val
      if (val == 16) {
        if (this.basicRuleForm.surveyModel == '') {
          this.basicRuleForm.putoutRange = null
          iMessage.error(this.$t('QN_QINGXUANZEWENJUANMOKUAI'))
          return
        } else {
          this.getGroupList({ category: this.basicRuleForm.surveyModel })
          this.customDialogVisible = true
        }
        // this.groupCheckList =
        //   this.ruleForm.userGroup?.map((item) => item.id) || [];
      } else {
        this.basicRuleForm.groupIds = ''
        this.basicRuleForm.groupNames = ''
      }
    },

    // 弹框-确认
    handleConfirm() {
      this.basicRuleForm.groupIds = ''
      this.basicRuleForm.groupNames = ''
      this.userGroup =
        this.groupList.length > 0
          ? this.groupList.filter((item) => {
              return this.groupCheckList.includes(item.id)
            })
          : null
      this.userGroup.map((i) => {
        if (this.basicRuleForm.groupIds == '') {
          this.basicRuleForm.groupIds = i.id
          this.basicRuleForm.groupNames = i.groupName
        } else {
          this.basicRuleForm.groupIds += ',' + i.id
          this.basicRuleForm.groupNames += ',' + i.groupName
        }
      })
      this.customDialogVisible = false
      this.searchGroupInputVal = ''
      if (this.userGroup === null || this.userGroup.length === 0) {
        this.basicRuleForm.putoutRange = null
      }
    },

    // 弹框-关闭
    handleClose() {
      this.customDialogVisible = false
      if (this.userGroup === null || this.userGroup?.length === 0) {
        this.basicRuleForm.putoutRange = null
      }
      this.searchGroupInputVal = ''
    },
    // 弹框-用户组选择
    handleKeyupEnter() {
      this.getGroupList({
        category: this.basicRuleForm.surveyModel,
        groupName: this.searchGroupInputVal
      })
    },

    handle: function () {
      let startAt = (new Date(this.basicRuleForm.endTime) * 1000) / 1000
      if (startAt < Date.now()) {
        iMessage.warn(this.$t('QN_JIEZHISHIJIANBUNENGXIAOYUDANGQIANSHIJIAN'))
      }
    },
    keydown(e) {
      if (e.keyCode == 32 && this.basicRuleForm.name == '') {
        e.returnValue = false
      }
    },
    // query(e) {
    //   findById(e).then((res) => {
    //     console.log("REsssssssss",res)
    //     this.curPutOutUserArr = res.putoutRange;
    //   });
    // },
    // getPutOutUserArr(str) {
    //   if (typeof str === "string") {
    //     let arr = str ? str.split(",") : [];
    //     arr = arr.map((item) => {
    //       return {
    //         code: item,
    //       };
    //     });
    //     return arr;
    //   }
    //   return str;
    // },
    async queryUser() {
      const res = await findPutoutRange()
      this.putOutRange = res
    },
    beforeAvatarUpload(file) {
      const fileName = file.name.substring(file.name.length - 50)
      this.copyFile = new File([file], fileName)
      if (!file.type.includes('image/')) {
        this.$message.error(this.$t('QN_QINGSHANGCHUANTUPIANWENJIAN'))
        return false
      }
      const isLt15M = file.size / 1024 / 1024 < 15
      if (!isLt15M) {
        this.$message.error(this.$t('QN_SHANGCHUANWENJIANBUNENGCHAOGUO15M'))
      }
      return isLt15M
    },
    handleLoad() {
      this.$refs['img'].classList.remove('error')
    },
    handleError() {
      this.$refs['img'].classList.add('error')
    },
    async httpUpload() {
      this.upLoading = true
      let formData = new FormData()
      formData.append('file', this.copyFile)
      await uploadFile(formData)
        .then((res) => {
          this.basicRuleForm.surveyCover = res.path
          this.basicRuleForm.coverName = res.name
          iMessage.success(this.$t('QN_SHANGCHUANCHENGGONG'))
        })
        .catch(() => {
          iMessage.error(this.$t('QN_SHANGCHUANSHIBAI'))
        })
      this.upLoading = false
    },
    handleDeleteAccessory() {
      this.basicRuleForm.surveyCover = ''
    }
  }
}
</script>
<style scoped lang="scss">
.custom--dialog {
  min-height: 300px;
  ::v-deep .el-input {
    width: 100%;
  }
  .custom--checkbox {
    margin-top: 10px;
    width: 100%;
    ::v-deep .el-checkbox-group {
      display: flex;
      flex-direction: column;
      width: 100%;
      .el-checkbox {
        display: flex;
        margin-top: 10px;
        width: 100%;
        .el-checkbox__input {
          margin-top: 3px;
        }
        .el-checkbox__label {
          display: inline-block;
          width: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      }
    }
  }
}
.item--input ::v-deep {
  .el-input .el-input__inner {
    width: 55.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.input-box {
  width: 83rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.inputSixty {
  width: 55.25rem;
  ::v-deep .el-select .el-input .el-select__caret::before {
    content: '\e723';
  }
  .upload-content {
    display: flex;
    .image-box {
      width: 20rem;
      height: 180px;
      background-image: url('../../../../../../assets/images/survey/survey-back.svg');
      background-repeat: no-repeat;
      background-color: #f9f9f9;
      background-position: center;
      margin-right: 2rem;
      position: relative;
      .el-avatar {
        display: block;
        display: none;
      }
      .avatar {
        width: 320px;
        height: 100%;
        display: block;
        object-fit: scale-down;
      }
      .error {
        visibility: hidden;
      }
    }
    .upload-button {
      position: relative;
      width: 25rem;
      height: 35px;
      padding: 0;
      color: #fff;
      background-color: #1660f1;
    }
    .el-upload__tip {
      font-size: 0.75rem;
      font-weight: 400;
      color: #000000;
      text-align: center;
      width: 26rem;
    }
  }
}
.form-row {
  display: flex;
  justify-content: space-between;
  .form-item-row1-col3 {
    flex: 1;
    ::v-deep .el-form-item__content {
      display: flex;
    }
  }
}
</style>
