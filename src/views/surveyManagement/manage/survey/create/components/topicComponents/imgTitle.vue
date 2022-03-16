<template>
  <el-form
    :model="ruleForm"
    ref="ruleForm"
    :rules="rules"
    :hideRequiredAsterisk="true"
    class="form-box"
  >
    <!-- 背景左上角图片 -->
    <div class="form-border handle" v-if="overEditor">
      <div class="form-img">
        <img :src="surveyMobile" />
      </div>
    </div>
    <div class="form-border" v-else>
      <div class="form-img">
        <img :src="surveyMobile" />
      </div>
    </div>

    <div style="margin-top: 1.25rem; margin-left: 1rem" v-show="editor">
      <!-- 文字+按钮 -->
      <div class="form-top">
        <div>
          <h2>{{ $t('QN_TUPIANXUANZETI') }}</h2>
        </div>
        <div>
          <iButton @click="complete()">{{ $t('QN_WANCHENGBIANJI') }}</iButton>
          <iButton @click="cancelComplete()">{{
            $t('QN_SHANCHUGAITI')
          }}</iButton>
        </div>
      </div>
      <el-row class="form-row">
        <div class="form-item-row1-col3">
          <iFormItem label="题目编号">
            <iLabel
              :label="$t('QN_TIMUBIANHAO')"
              slot="label"
              style="width: 10rem"
            ></iLabel>
            <iInput :value="getSort()" class="form-item-index" disabled />
            <div class="form-option" style="margin-left: 4rem">
              {{ $t('QN_PAIBUFANGSHI') }}
            </div>
            <iSelect
              style="width: 290px"
              v-model="ruleForm.pictureRule"
              :placeholder="$t('QN_QINGXUANZE')"
            >
              <el-option
                v-for="(item, index) in picStyle"
                :key="index"
                :label="$t(item.i18n)"
                :value="item.value"
              >
              </el-option>
            </iSelect>
            <el-checkbox
              style="margin-left: 4rem"
              v-model="ruleForm.requiredQuestion"
              >{{ $t('QN_BIDA') }}</el-checkbox
            >
          </iFormItem>
        </div>
      </el-row>
      <el-row class="form-row">
        <div class="form-item-row1-col3">
          <iFormItem label="题目标题" prop="name">
            <iLabel
              :label="$t('QN_TIMUBIAOTI')"
              required
              slot="label"
              style="width: 10rem"
            ></iLabel>
            <iInput
              :placeholder="$t('QN_QINGSHURUTIMUBIAOTI')"
              @keydown.native="keydownName($event)"
              v-model="ruleForm.name"
            />
          </iFormItem>
        </div>
      </el-row>
      <!-- 选项 -->
      <div v-for="(item, index) in ruleForm.options" :key="item.number">
        <el-row class="form-row">
          <div class="form-item-row1-col3">
            <iFormItem :rules="rules.options" :prop="`options.${index}.name`">
              <iLabel
                :label="getChoiceName(index + 1)"
                required
                slot="label"
                style="width: 10rem"
              ></iLabel>
              <iInput
                :placeholder="$t('QN_QINGSHURUXUANXIANGNEIRONG')"
                style="width: 37.5rem"
                @keydown.native="keydownContent($event, item)"
                v-model="item.name"
              />
              <div class="add-minus">
                <iButton
                  @click="add(item)"
                  class="el-icon-plus form-icon"
                ></iButton>
                <iButton
                  @click="minus(item)"
                  :disabled="ruleForm.options.length <= 2"
                  class="el-icon-minus form-icon"
                ></iButton>
              </div>
              <div class="form-option">{{ $t('QN_TIAOZHUAN') }}</div>
              <iSelect
                v-model="item.action"
                :class="isParap ? 'width-p' : 'width-po'"
                @focus="
                  () => {
                    if (isParap) {
                      selectOptionP()
                    } else {
                      selectOption()
                    }
                  }
                "
                :placeholder="$t('QN_QINGXUANZE')"
                value-key="value"
              >
                <el-option
                  v-for="(item, index) in isParap ? optionsListP : optionsList"
                  :key="index"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </iSelect>
              <div class="add-minus">
                <iButton
                  @click="moveDown(item)"
                  :disabled="index + 1 == ruleForm.options.length"
                  class="el-icon-bottom form-icon"
                ></iButton>
                <iButton
                  @click="moveUp(item)"
                  :disabled="index == 0"
                  class="el-icon-top form-icon"
                ></iButton>
              </div>
            </iFormItem>
          </div>
        </el-row>
        <el-row class="form-row">
          <div class="card--body--item__file">
            <iFormItem
              :prop="`options.${index}.imageUrl`"
              :rules="rules.imageUrl"
              ref="ruleFormCoverImage"
            >
              <el-upload
                accept="image/png,image/jpeg,image/gif,image/jpg"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :http-request="httpUpload"
                :show-file-list="false"
              >
                <iButton
                  type="button"
                  class="upload-button"
                  :loading="uploadLoading"
                  @click="uploadClick(item)"
                >
                  {{ $t('QN_SHANGCHUANFUJIAN')
                  }}<span class="upload-text"><img :src="uploadIcon" /></span>
                </iButton>
                <span
                  slot="tip"
                  style="padding-left: 2rem; margin-top: 0.5rem; width: 20rem"
                  >{{ $t('QN_WENJIANDAXIAOZUIDAXIANZHI15M') }}</span
                >
              </el-upload>
            </iFormItem>
            <div
              class="el-upload-list el-upload-list--text"
              style="width: 18.75rem"
              v-if="item.imageUrl !== ''"
            >
              <li tabindex="0" class="el-upload-list__item is-success">
                <a class="el-upload-list__item-name">
                  <i style="color: #909399">
                    {{
                      item.coverName
                        ? item.coverName
                        : item.imageUrl.split('/')[
                            item.imageUrl.split('/').length - 1
                          ] + '.jpg'
                    }}
                  </i>
                </a>
                <label class="el-upload-list__item-status-label">
                  <i class="el-icon-upload-success el-icon-circle-check"></i>
                </label>
                <i
                  @click="handleDeleteAccessory(item.imageUrl)"
                  class="el-icon-close"
                ></i>
                <i class="el-icon-close-tip"></i>
              </li>
            </div>
          </div>
        </el-row>
      </div>
    </div>
    <div
      v-show="!editor"
      style="
        margin-top: 1.25rem;
        margin-left: 1rem;
        width: 100%;
        height: 100%;
        padding-right: 1.5rem;
      "
      class="item__content"
      @mouseover="enter()"
      @mouseout="leave()"
    >
      <div class="operation-btn">
        <iButton v-show="mouseOver == true" @click="enterEditor()">{{
          $t('QN_BIANJI')
        }}</iButton>
        <iButton v-show="mouseOver == true" @click="handleCopy()">{{
          $t('QN_FUZHI')
        }}</iButton>
        <iButton v-show="mouseOver == true" @click="handlDelete()">{{
          $t('QN_SHANCHU')
        }}</iButton>
        <iButton
          v-show="mouseOver == true"
          @click="handleTop()"
          :disabled="overEditor ? (isParap ? sortP == 1 : sort == 1) : true"
          >{{ $t('QN_SHANGYI') }}</iButton
        >
        <iButton
          v-show="mouseOver == true"
          @click="handleBottom()"
          :disabled="
            overEditor
              ? isParap
                ? sortP == topicLengthP
                : sort == topicLength
              : true
          "
          >{{ $t('QN_XIAYI') }}</iButton
        >
      </div>
      <div class="title">
        <span v-if="ruleForm.requiredQuestion" style="color: red">* </span>
        {{ isParap ? info.code + '.' + infoP.code : info.code + '. '
        }}{{ ruleForm.name }}
      </div>
      <div v-if="ruleForm.pictureRule == 1" class="onepic">
        <el-radio-group
          class="option"
          v-for="(item, index) in ruleForm.options"
          :key="index"
        >
          <!-- <el-radio :label="item.name"> </el-radio> -->
          <el-radio label=""> </el-radio>
          <div class="image-box">
            <img :src="item.imageUrl" class="avatar" />
          </div>
        </el-radio-group>
      </div>
      <div v-if="ruleForm.pictureRule == 2" class="twoPic">
        <el-radio-group
          class="option"
          v-for="(item, index) in ruleForm.options"
          :key="index"
        >
          <!-- <el-radio :label="item.name"> </el-radio> -->
          <el-radio label=""> </el-radio>
          <div class="image-box">
            <img :src="item.imageUrl" class="avatar" />
          </div>
        </el-radio-group>
      </div>
      <div v-if="ruleForm.pictureRule == 4" class="fourPic">
        <el-radio-group
          class="option"
          v-for="(item, index) in ruleForm.options"
          :key="index"
        >
          <!-- <el-radio :label="item.name"> </el-radio> -->
          <el-radio label=""> </el-radio>
          <div class="image-box">
            <img :src="item.imageUrl" class="avatar" />
          </div>
        </el-radio-group>
      </div>
    </div>
  </el-form>
</template>
<script>
import { iLabel, iInput, iFormItem, iSelect, iButton, iMessage } from 'rise'
import uploadIcon from '@/assets/images/upload-icon.svg'
import surveyMobile from '@/assets/images/survey/survey-mobile.svg'
import { uploadFile } from '@/api/survey/uploadFile.js'

export default {
  // name: "Basis",
  props: [
    'copyTopic',
    'type',
    'number',
    'sort',
    'topicLength',
    'contentCopy',
    'isParap',
    'sortP',
    'topicLengthP',
    'numberP',
    'info',
    'infoP',
    'overEditor',
    'actionBar',
    'contentlist',
    'racialTopicLength',
    'racialTopicLengthP'
  ],
  components: {
    iLabel,
    iInput,
    iFormItem,
    iButton,
    iSelect
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

    const length100 = {
      maxLength: 200
    }
    const length30 = {
      maxLength: 60
    }

    return {
      copyFile: '',
      radio: '',
      mouseOver: false,
      surveyMobile,
      uploadIcon,
      editor: this.isParap ? this.infoP.editor : this.info.editor,
      ruleForm: {
        editor: true,
        // topicType: this.type,
        // id: this.id,
        name: '', // 问题名称
        code: this.isParap ? this.numberP : this.number, // 问题编号
        number: this.isParap ? this.numberP : this.number, // 问题序号
        type: 4, // 问题类型
        requiredQuestion: true, // 是否必答
        options: [
          {
            uploadLoading: false,
            number: 1, // 选项序号
            type: 2, // 选项类型
            name: '', // 选项名称
            imageUrl: '', // 图片链接
            coverName: ''
          },
          {
            uploadLoading: false,
            number: 2, // 选项序号
            type: 2, // 选项类型
            name: '', // 选项名称
            imageUrl: '', // 图片链接
            coverName: ''
          }
        ], // 问题选项
        pictureRule: 1 // 图片题规则
      },
      clickNumber: 0, // 上传图片时点击的item
      optionsList: [],
      optionsListP: [],
      picStyle: [
        { label: '每行1个', value: 1, i18n: 'QN_MEIHANGYIGE' },
        { label: '每行2个', value: 2, i18n: 'QN_MEIHANGLIANGGE' },
        { label: '每行4个', value: 4, i18n: 'QN_MEIHANGSIGE' }
      ],
      rules: {
        name: [
          {
            required: true,
            message: this.$t('QN_BITIAN'),
            trigger: ['blur', 'change']
          },
          // {
          //   min: 1,
          //   max: 100,
          //   message: "最大长度 100 字符",
          //   trigger: ["blur", "change"],
          // },
          {
            validator: validLength.bind(length100),
            trigger: ['blur', 'change']
          }
        ],
        options: [
          {
            required: true,
            message: this.$t('QN_BITIAN'),
            trigger: ['blur', 'change']
          },
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
        imageUrl: [
          {
            required: true,
            message: this.$t('QN_BITIAN'),
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  mounted() {
    if (this.isParap) {
      this.selectOptionP()
    } else {
      this.selectOption()
    }
    let obj = this.isParap ? { ...this.infoP } : { ...this.info }
    this.ruleForm = { ...this.ruleForm, ...obj }
    // this.ruleForm.options =
    //   this.ruleForm.options &&
    //   this.ruleForm.options.map((item) => {
    //     return {
    //       ...item,
    //       action: {
    //         // value: this.isParap ? item.action : Number(item.action),
    //         value: item.action,
    //         label: "第" + item.action + "题",
    //       },
    //     };
    //   });
    // if (this.ruleForm.name !== "") {
    //   this.ruleForm.options =
    //     this.ruleForm.options &&
    //     this.ruleForm.options.map((item) => {
    //       return {
    //         ...item,
    //         action:
    //           Number(item.action) == -1
    //             ? "结束答题"
    //             : item.action
    //             ? "第" + item.action + "题"
    //             : "",
    //       };
    //     });
    // }
    // if (this.ruleForm.name !== "") {
    //   this.ruleForm.options =
    //     this.ruleForm.options &&
    //     this.ruleForm.options.map((item) => {
    //       return {
    //         ...item,
    //         action: this.generateObj(item.action),
    //       };
    //     });
    // }
    if (this.copyTopic == true) {
      this.ruleForm = this.contentCopy
      this.$emit('changeCopyTopic')
    }
  },
  watch: {
    'info.number': {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          if (!this.isParap) {
            this.ruleForm = { ...this.ruleForm, ...this.info }
          }
        }
      }
    },
    'infoP.number': {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          if (this.isParap) {
            this.ruleForm = { ...this.ruleForm, ...this.infoP }
          }
        }
      }
    }
  },
  methods: {
    getChoiceName(index) {
      return `${this.$t('QN_XUANXIANG')}${index}`
    },
    // 删除该题
    cancelComplete() {
      if (this.isParap) {
        this.$emit('cancelCompleteP', this.ruleForm)
      } else {
        this.$emit('cancelComplete', this.ruleForm)
      }
    },
    keydownName(e) {
      if (e.keyCode == 32 && this.ruleForm.name == '') {
        e.returnValue = false
      }
    },
    keydownContent(e, i) {
      if (e.keyCode == 32 && i.name == '') {
        e.returnValue = false
      }
    },
    // getSort() {
    //   if (this.isParap) {
    //     return this.sort + "." + this.sortP;
    //   } else {
    //     return this.sort;
    //   }
    // },
    getSort() {
      if (this.isParap) {
        return this.info.code + '.' + this.infoP.code
      } else {
        return this.info.code
      }
    },
    uploadClick(item) {
      this.clickNumber = this.ruleForm.options.indexOf(item)
    },
    selectOption() {
      this.optionsList = []
      if (this.info.code == this.racialTopicLength) {
        this.optionsList = []
      } else {
        // this.optionsList.push({
        //   label: "第" + this.sort + 1 + "题",
        //   value: this.sort + 1,
        // });
        for (let i = this.info.code; i < this.racialTopicLength; i++) {
          this.optionsList.push({
            label: this.$t('QN_DI') + (i + 1) + this.$t('QN_TI'),
            value: i + 1
          })
        }
      }
      this.optionsList.push({
        label: this.$t('QN_JIESHUDATI'),
        value: -1
      })
    },
    selectOptionP() {
      this.optionsListP = []
      if (this.infoP.code == this.racialTopicLength) {
        this.optionsListP = []
      } else {
        // this.optionsListP.push({
        //   label: "第" + this.sortP + 1 + "题",
        //   value: this.sortP + 1,
        // });
        for (let i = this.infoP.code; i < this.racialTopicLengthP; i++) {
          this.optionsListP.push({
            label: `${this.$t('QN_DI')} ${this.info.code}.${i + 1} ${this.$t(
              'QN_TI'
            )}`,
            value: `${this.info.code}.${i + 1}`
          })
        }
      }
      this.optionsListP.push({
        label: this.$t('QN_JIESHUDATI'),
        value: -1
      })
    },
    handleDeleteAccessory(imageUrl) {
      this.ruleForm.options.map((item) => {
        if (item.imageUrl == imageUrl) {
          item.imageUrl = ''
          this.$refs['ruleFormCoverImage'][this.clickNumber].$el.querySelector(
            '.el-form-item__error'
          ).style.display = 'block'
        }
      })
    },
    //上传图片
    async httpUpload() {
      // console.log("clickNumber", this.clickNumber);
      this.ruleForm.options[this.clickNumber].uploadLoading = true
      let formData = new FormData()
      formData.append('file', this.copyFile)
      await uploadFile(formData)
        .then((res) => {
          this.ruleForm.options[this.clickNumber].coverName = res.name
          this.ruleForm.options[this.clickNumber].imageUrl = res.path
          this.$refs['ruleFormCoverImage'][this.clickNumber].$el.querySelector(
            '.el-form-item__error'
          ).style.display = 'none'
          iMessage.success(this.$t('QN_SHANGCHUANCHENGGONG'))
        })
        .catch(() => {
          // iMessage.error("上传失败");
        })
      this.ruleForm.options[this.clickNumber].uploadLoading = false
    },
    // 限制上传图片大小
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
    // 完成编辑
    complete() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.editor = false
          this.ruleForm.editor = this.editor
          this.ruleForm.options = this.ruleForm.options.map((item) => {
            console.log('item', item)
            return {
              ...item,
              action:
                typeof item.action === 'object'
                  ? item.action.value
                  : item.action
            }
          })
          if (this.isParap) {
            this.$emit('handleSaveDataP', this.ruleForm)
          } else {
            this.$emit('handleSaveData', this.ruleForm)
          }
        }
      })
      return this.editor
    },
    // 添加一个选项
    add(scope) {
      this.ruleForm.options.splice(scope.number, 0, {
        number: '',
        type: 2,
        name: '',
        imageUrl: '',
        uploadLoading: false
      })
      this.ruleForm.options.map((item) => {
        item.number = this.ruleForm.options.indexOf(item) + 1
      })
    },
    // 减去一个选项
    minus(scope) {
      this.ruleForm.options = this.ruleForm.options.filter((item) => {
        return scope.number !== item.number
      })
      this.ruleForm.options.map((item) => {
        item.number = this.ruleForm.options.indexOf(item) + 1
      })
    },
    // 向上移动
    moveUp(item) {
      let index = this.ruleForm.options.indexOf(item)
      this.swapArray(this.ruleForm.options, index - 1, index)
    },
    // 向下移动
    moveDown(item) {
      let index = this.ruleForm.options.indexOf(item)
      this.swapArray(this.ruleForm.options, index, index + 1)
    },
    // 数组元素互换位置
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      arr.map((item) => {
        item.number = arr.indexOf(item) + 1
      })
      return arr
    },

    // 展示一列按钮
    enter() {
      this.mouseOver = true
    },
    // 鼠标离开
    leave() {
      this.mouseOver = false
    },
    generateObj(action) {
      let obj = {}
      obj = {
        value: action
          ? action.toString().includes('.')
            ? action.toString()
            : Number(action)
          : '',
        label:
          Number(action) == -1
            ? this.$t('QN_JIESHUDATI')
            : Number(action)
            ? this.$t('QN_DI') + action + this.$t('QN_TI')
            : ''
      }
      return obj
    },
    // 编辑
    enterEditor() {
      this.editor = true
      this.ruleForm.editor = true
      this.ruleForm.options = this.ruleForm.options.map((item) => {
        return {
          ...item,
          action: this.generateObj(item.action)
        }
      })
      this.$emit('handleEnterEditor', this.ruleForm)
    },

    // 复制
    handleCopy() {
      this.ruleForm.options = this.ruleForm.options.map((item) => {
        return {
          ...item,
          action: ''
        }
      })
      this.$emit('handleCopy', this.ruleForm)
    },
    // 删除
    handlDelete() {
      if (this.isParap) {
        this.$emit('handleDeleteP', this.ruleForm)
      } else {
        this.$emit('handleDelete', this.ruleForm)
      }
    },
    // 上移
    handleTop() {
      if (this.actionBar) {
        this.$confirm(
          this.$t(
            'QN_SHANGXIAYIDONGJIANGQINGKONGTIAOTISHEZHIQUERENSHIFOUYIDONG'
          ),
          this.$t('QN_TISHI'),
          {
            confirmButtonText: this.$t('QN_SHI'),
            cancelButtonText: this.$t('QN_FOU'),
            type: 'warning'
          }
        ).then(() => {
          // this.contentlist = this.contentlist.map((item) => {
          //   if (item.options) {
          //     item.options = item.options.map((it) => {
          //       return {
          //         ...it,
          //         action: "",
          //       };
          //     });
          //     return {
          //       ...item,
          //       actionItem: "",
          //     };
          //   }
          //   return {
          //     ...item,
          //     actionItem: "",
          //   };
          // });
          this.ruleForm.editor = this.editor
          this.$emit('handleTop', this.ruleForm)
        })
      } else {
        this.ruleForm.editor = this.editor
        this.$emit('handleTop', this.ruleForm)
      }
    },
    // 下移
    handleBottom() {
      if (this.actionBar) {
        this.$confirm(
          this.$t(
            'QN_SHANGXIAYIDONGJIANGQINGKONGTIAOTISHEZHIQUERENSHIFOUYIDONG'
          ),
          this.$t('QN_TISHI'),
          {
            confirmButtonText: this.$t('QN_SHI'),
            cancelButtonText: this.$t('QN_FOU'),
            type: 'warning'
          }
        ).then(() => {
          // this.contentlist = this.contentlist.map((item) => {
          //   if (item.options) {
          //     item.options = item.options.map((it) => {
          //       return {
          //         ...it,
          //         action: "",
          //       };
          //     });
          //     return {
          //       ...item,
          //       actionItem: "",
          //     };
          //   }
          //   return {
          //     ...item,
          //     actionItem: "",
          //   };
          // });
          this.ruleForm.editor = this.editor
          this.$emit('handleBottom', this.ruleForm)
        })
      } else {
        this.ruleForm.editor = this.editor
        this.$emit('handleBottom', this.ruleForm)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.add-minus {
  display: flex;
  width: 120px;
  height: 35px;
  align-items: center;
}
.width-po {
  width: 18.74rem;
}
.form-box {
  border: 0.05rem solid #ddd;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  &:active {
    border: 0.1rem dashed #1763f7;
  }
  /* 左上角背景图片 */
  /* .form-border {
    width: 1rem;
    height: 1rem;
    border-top: 2.2rem solid #d8d8d8;
    border-right: 2.2rem solid transparent;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    cursor: grab;
    .form-img {
      position: relative;
      top: -2.2rem;

      img {
        width: 1.2rem;
      }
    }

    &:active {
      border-top: 2.2rem solid #1763f7;
      cursor: grabbing;
    }
  } */
  /* 左上角背景图片 */
  .form-border {
    width: 1rem;
    height: 1rem;
    border-top: 2.2rem solid #d8d8d8;
    border-right: 2.2rem solid transparent;
    position: absolute;
    top: 0;
    left: 0;

    .form-img {
      position: relative;
      top: -2.2rem;

      img {
        width: 1.2rem;
      }
    }
    /* &:active {
      border-top: 2.2rem solid #1763f7;
      cursor: grabbing;
    } */
  }
  .handle {
    cursor: grab;
    border-top: 2.2rem solid #1763f7;

    &:active {
      border-top: 2.2rem solid #1763f7;
      cursor: grabbing;
    }
  }
  /* 文字+按钮 */
  .form-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  .form-row {
    display: flex;
    /* 横线 */
    .form-line {
      background-color: #d8d8d8;
      height: 2px;
      width: 100%;
      margin-bottom: 20px;
    }
    /* 上传图片样式 */
    .card--body--item__file {
      display: flex;
      width: 100%;
      margin-left: 10.5rem;
      margin-bottom: 13.784px;
      div {
        display: flex;
        ::v-deep .el-upload-list {
          // box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
          // border-color: transparent;
          // background-color: #f7f7f7;
          // border-radius: 20px;
          width: 28rem;
          li a {
            padding-bottom: 0.5rem;
          }
        }
      }

      .upload-button {
        position: relative;
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
    .form-item-row1-col3 {
      flex: 1;
      ::v-deep .el-form-item__content {
        display: flex;
      }
      .form-option {
        display: inline-block;
        width: 120px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
      }
      .form-icon {
        border-radius: 5.625rem;
        font-size: 1.5rem;
        font-weight: bolder;
        margin: 0 0.625rem;
        width: 2.3rem;
        padding: 0;
        min-width: auto;
        height: 2.3rem;
      }
    }
    .el-input {
      height: 35px;
      width: 100%;

      ::v-deep .el-input__inner {
        height: 35px !important;
        box-shadow: 0 0 3px rgb(0 38 98 / 0.15);
        border-color: transparent;

        // &:focus {
        //   border: 0;
        // }
      }
    }
  }
}

.form-item-index {
  width: 110px !important;

  ::v-deep .el-input__inner {
    text-align: center;

    // &:focus {
    //   border: 0;
    // }
  }
}

.item__content {
  display: flex;
  flex-direction: column;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
  }
  .onepic {
    display: flex;
    flex-direction: column;
    width: 50%;
    .option {
      margin-top: 20px;
      .image-box {
        margin: 10px 0;
        width: 25%;
        height: auto;
        .avatar {
          margin: 10px 0;
          width: 100%;
          height: 100%;
          display: block;
          margin-left: 55px;
        }
      }
    }
  }
  .twoPic {
    .option {
      margin-top: 20px;
      width: 50%;
      .image-box {
        margin: 10px 0;
        width: 25%;
        height: auto;
        .avatar {
          margin: 10px 0;
          width: 100%;
          height: 100%;
          display: block;
          margin-left: 55px;
        }
      }
    }
  }
  .fourPic {
    .option {
      margin-top: 20px;
      width: 25%;
      .image-box {
        margin: 10px 0;
        width: 50%;
        height: auto;
        .avatar {
          // float: left;
          margin: 10px 0;
          width: 100%;
          height: 100%;
          display: block;
          margin-left: 55px;
        }
      }
    }
  }
  .operation-btn {
    // position: absolute;
    // right: 2.5rem;
    height: 2rem;
    float: right;
    text-align: right;
  }
}

::v-deep .el-checkbox__input .el-checkbox__inner {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1.25rem;
  border-radius: 5px;
}
::v-deep .el-checkbox__label {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 22px;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000000;
}
::v-deep .el-checkbox__input .el-checkbox__inner::after {
  // 对号
  position: absolute;
  margin: 1px;
  border: 2px solid #fff;
  // 不覆盖下面的 会 导致对号变形
  box-sizing: content-box;
  content: '';
  border-left: 0;
  border-top: 0;
}
</style>
