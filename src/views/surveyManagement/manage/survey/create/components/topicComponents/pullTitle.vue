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
          <h2>{{ $t('QN_XIALATI') }}</h2>
        </div>
        <div>
          <iButton @click="complete()">{{ $t('QN_WANCHENGBIANJI') }}</iButton>
          <iButton @click="cancelComplete()">{{ $t('QN_SHANCHUGAITI') }}</iButton>
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
            <iInput
              :placeholder="$t('QN_QINGSHURUTIMUBIANHAO')"
              :value="getSort()"
              class="form-item-index"
              disabled
            />
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
              v-model="ruleForm.name"
              @keydown.native="keydownName($event)"
            />
          </iFormItem>
        </div>
      </el-row>

      <!-- 选项 -->
      <el-row class="form-row">
        <div class="form-item-row1-col3">
          <iFormItem
            v-for="(item, index) in ruleForm.options"
            :key="item.number"
            :rules="rules.options"
            :prop="`options.${index}.name`"
          >
            <iLabel
                         :label="getChoiceName(index + 1)"
              required
              slot="label"
              style="width: 10rem"
            ></iLabel>
            <iInput
              :placeholder="$t('QN_QINGSHURUXUANXIANGNEIRONG')"
              v-model="item.name"
              @keydown.native="keydownContent($event, item)"
            />
            <div style="width: 280px">
              <iButton
                @click="add(item)"
                class="el-icon-plus form-icon"
              ></iButton>
              <iButton
                @click="minus(item)"
                class="el-icon-minus form-icon"
                :disabled="ruleForm.options.length <= 2"
              ></iButton>
            </div>
            <div class="form-option">{{ $t('QN_TIAOZHUAN') }}</div>
            <iSelect
              v-model="item.action"
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
           $t('QN_FUZHU')
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
      <iSelect :placeholder="$t('QN_QINGXUANZE')" class="i-select">
        <el-option
          v-for="item in ruleForm.options"
          :key="item.number"
          :label="item.name"
          :value="item.number"
        >
        </el-option>
      </iSelect>
    </div>
  </el-form>
</template>

<script>
import { iLabel, iInput, iFormItem, iSelect, iButton } from 'rise'
import surveyMobile from '@/assets/images/survey/survey-mobile.svg'

export default {
  props: [
    'copyTopic',
    'sort',
    'type',
    'number',
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
    iSelect,
    iButton
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
            `${this.$t('QN_ZUIDACHANGDUZHONGWEN')} ${this.maxLength / 2} ${this.$t(
              'QN_ZIFU'
            )}，${this.$t('QN_YINGWEN')} ${this.maxLength} ${this.$t('QN_ZIFU')}`
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
      mouseOver: false,
      surveyMobile,
      editor: this.isParap ? this.infoP.editor : this.info.editor,
      ruleForm: {
        editor: true,
        // topicType: this.type,
        // id: this.id,
        id: '',
        name: '', // 问题名称
        code: this.isParap ? this.numberP : this.number, // 问题编号
        number: this.isParap ? this.numberP : this.number, // 问题序号
        type: 6, // 问题类型
        requiredQuestion: true, // 是否必答
        options: [
          {
            number: 1, // 选项序号
            type: 1, // 选项类型
            name: '', // 选项名称
            action: '' // 跳题事件
          },
          {
            number: 2, // 选项序号
            type: 1, // 选项类型
            name: '', // 选项名称
            action: '' // 跳题事件
          }
        ] // 问题选项
      },
      optionsList: [],
      optionsListP: [],
      rules: {
        name: [
          {
            required: true,
            message: this.$t('QN_BITIAN'),
            trigger: ['blur', 'change']
          },
          // {
          //   min: 1,
          //   max: 200,
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
          //   max: 60,
          //   message: "最大长度 30 字符",
          //   trigger: ["blur", "change"],
          // },
          {
            validator: validLength.bind(length30),
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
    //         value: item.action,
    //         label: "第" + item.action + "题",
    //       },
    //     };
    //   });
    // this.ruleForm.options =
    //   this.ruleForm.options &&
    //   this.ruleForm.options.map((item) => {
    //     return {
    //       ...item,
    //       action: this.generateObj(item.action),
    //     };
    //   });
    // console.log("this.ruleForm.options", this.ruleForm.options);
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
            value: Number(i + 1)
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
    // 完成编辑
    complete() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.editor = false
          this.ruleForm.editor = this.editor
          this.ruleForm.options = this.ruleForm.options.map((item) => {
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
        type: 1,
        name: '',
        action: ''
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
      this.$emit('handleCopy', { ...this.ruleForm })
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
          this.$t('QN_SHANGXIAYIDONGJIANGQINGKONGTIAOTISHEZHIQUERENSHIFOUYIDONG'),
          this.$t('QN_TISHI'),
          {
            confirmButtonText: this.$t('QN_SHI'),
            cancelButtonText: this.$t('QN_FOU'),
            type: 'warning'
          }
        ).then(() => {
          //   this.contentlist = this.contentlist.map((item) => {
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
          this.$t('QN_SHANGXIAYIDONGJIANGQINGKONGTIAOTISHEZHIQUERENSHIFOUYIDONG:'),
          this.$t('QN_TISHI'),
          {
            confirmButtonText: this.$t('QN_SHI'),
            cancelButtonText: this.$t('QN_FOU'),
            type: 'warning'
          }
        ).then(() => {
          // this.contentlist = this.contentlist.map((item) => {
          //         if (item.options) {
          //           item.options = item.options.map((it) => {
          //             return {
          //               ...it,
          //               action: "",
          //             };
          //           });
          //           return {
          //             ...item,
          //             actionItem: "",
          //           };
          //         }
          //         return {
          //           ...item,
          //           actionItem: "",
          //         };
          //       });
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
  width: 280px;
  height: 35px;
  align-items: center;
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
    margin: 0;
    height: 1rem;
    border-top: 2.2rem solid #d8d8d8;
    border-right: 2.2rem solid transparent;
    position: absolute;
    top: 0;
    left: 0;
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
  .i-select {
    margin: 40px 0 20px 20px;
    width: 350px;
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
