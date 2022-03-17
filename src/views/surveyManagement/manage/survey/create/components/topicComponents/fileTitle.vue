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
          <h2>{{ $t('QN_WENJIANSHANGCHUANTI') }}</h2>
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
            <iInput :value="getSort()" class="form-item-index" disabled />
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
          <iFormItem :label="$t('QN_TIMUBIAOTI')" prop="name">
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
      <el-row class="form-row">
        <div class="form-item-row1-col3">
          <iFormItem :label="$t('上传格式设置')" prop="file">
            <iLabel
              :label="$t('QN_SHANGCHUANGESHISHEZHI')"
              slot="label"
              :class="isParap ? 'file-show-p' : 'file-show'"
            ></iLabel>
            <div class="uploadSet" v-if="isParap == fasle">
              <div class="title">{{ $t('QN_XIANZHISHANGCHUANWENJIANLEIXING') }}</div>
              <div v-for="item in uploadOptions" :key="item.name">
                <el-form-item :label="$t(item.i18n) + '：'" class="fileItem">
                  <el-checkbox
                    :indeterminate="item.isIndeterminate"
                    v-model="item.selected"
                    class="item"
                    @change="allCheckboxGroup($event, item, item.list)"
                    >{{ $t('QN_QUANXUAN') }}
                  </el-checkbox>
                  <el-checkbox
                    v-model="i.selected"
                    v-for="i in item.list"
                    :key="i"
                    class="item"
                    @change="checkOneBox(item, item.list)"
                  >
                    {{ i.label }}
                  </el-checkbox>
                </el-form-item>
                <div
                  v-if="uploadOptions.indexOf(item) + 1 == uploadOptions.length"
                ></div>
                <div v-else class="divider"></div>
              </div>
            </div>
            <div class="uploadSetP" v-else>
              <div class="titleP">{{ $t('QN_XIANZHISHANGCHUANWENJIANLEIXING') }}</div>
              <div v-for="item in uploadOptions" :key="item.name">
                <el-form-item :label="$t(item.i18n) + '：'" class="fileItemP">
                  <el-checkbox
                    :indeterminate="item.isIndeterminate"
                    v-model="item.selected"
                    class="itemP"
                    @change="allCheckboxGroup($event, item, item.list)"
                    >{{ $t('QN_QUANXUAN') }}
                  </el-checkbox>
                  <el-checkbox
                    v-model="i.selected"
                    v-for="i in item.list"
                    :key="i"
                    class="itemP"
                    @change="checkOneBox(item, item.list)"
                  >
                    {{ i.label }}
                  </el-checkbox>
                </el-form-item>
                <div
                  v-if="uploadOptions.indexOf(item) + 1 == uploadOptions.length"
                ></div>
                <div v-else class="dividerP"></div>
              </div>
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
      <div>
        <div class="upload-demo">
          <iButton type="button" class="upload-button" :loading="uploadLoading">
            {{ $t('QN_SHANGCHUANFUJIAN')
            }}<span class="upload-text"><img :src="uploadIcon" /></span>
          </iButton>
          <p class="upload-limit">
            {{ $t('QN_WENJIANDAXIAOWUXIANZHIZUIDUOSHANGCHUANYIGEWENJIAN') }}
          </p>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { iLabel, iInput, iFormItem, iButton } from 'rise'
import surveyMobile from '@/assets/images/survey/survey-mobile.svg'
import uploadIcon from '@/assets/images/upload-icon.svg'
export default {
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
    'racialTopicLength'
  ],
  components: {
    iLabel,
    iInput,
    iFormItem,
    // iSelect,
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

    return {
      editor: this.isParap ? this.infoP.editor : this.info.editor,
      uploadIcon,
      uploadLoading: false,
      mouseOver: false,
      surveyMobile,
      attachments: [], // 完成编辑页，附件
      ruleForm: {
        editor: true,
        // topicType: this.type,
        name: '', // 问题名称
        code: this.isParap ? this.numberP : this.number, // 问题编号
        number: this.isParap ? this.numberP : this.number, // 问题序号
        type: 5, // 问题类型
        requiredQuestion: true, // 是否必答
        uploadRule: {} // 上传题规则,
      },
      uploadOptions: [
        {
          isIndeterminate: false,
          selected: true,
          list: [
            { value: 1, label: '.gif', selected: true },
            { value: 2, label: '.png', selected: true },
            { value: 3, label: '.jpg', selected: true },
            { value: 4, label: '.jpeg', selected: true },
            { value: 5, label: '.bmp', selected: true }
          ],
          name: '图片文件',
          i18n: 'QN_TUPIANWENJIAN',
          type: 'pic'
        },
        {
          isIndeterminate: false,
          selected: true,
          list: [
            { value: 6, label: '.doc', selected: true },
            { value: 7, label: '.docx', selected: true },
            { value: 8, label: '.pdf', selected: true },
            { value: 9, label: '.xls', selected: true },
            { value: 10, label: '.xlsx', selected: true },
            { value: 11, label: '.ppt', selected: true },
            { value: 12, label: '.pptx', selected: true },
            { value: 13, label: '.txt', selected: true }
          ],
          name: '文档文件',
          i18n: 'QN_WENDANGWENJIAN',
          type: 'doc'
        },
        {
          isIndeterminate: false,
          selected: true,
          list: [
            { value: 14, label: '.rar', selected: true },
            { value: 15, label: '.zip', selected: true }
          ],
          name: '压缩文件',
          i18n: 'QN_YASUOWENJIAN',
          type: 'zip'
        },
        {
          isIndeterminate: false,
          selected: true,
          list: [{ value: 16, label: '.mp4', selected: true }],
          name: '视频文件',
          i18n: 'QN_SHIPINWENJIAN',
          type: 'mp4'
        },
        {
          isIndeterminate: false,
          selected: true,
          list: [{ value: 17, label: '.mp3', selected: true }],
          name: '音频文件',
           i18n: 'QN_YINPINWENJIAN',
          type: 'mp3'
        }
      ],
      rules: {
        name: [
          { required: true, message: this.$t('QN_BITIAN'), trigger: ['blur', 'change'] },
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
        ]
      }
    }
  },
  mounted() {
    let obj = this.isParap ? { ...this.infoP } : { ...this.info }
    this.ruleForm = { ...this.ruleForm, ...obj }
    if (this.copyTopic == true) {
      this.ruleForm = this.contentCopy
      this.$emit('changeCopyTopic')
    }
    let isRule = this.ruleForm.uploadRule?.split(',')
    this.uploadOptions = this.uploadOptions.filter((item) => {
      return item.list.map((i) => {
        let isCheck = isRule.includes(i.label)
        i.selected = isCheck
        this.checkOneBox(item, item.list)
      })
    })
  },
  watch: {
    attachments: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log(val)
      }
    },
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
    // 是否全选
    allCheckboxGroup(e, preList, sonList) {
      if (e) {
        // 这里的e就是一级菜单的selected
        if (sonList) {
          // 不论子菜单是否被选中，只要一级菜单被选中，让该子菜单的selected都=true；
          for (let i = 0; i < sonList.length; i++) {
            sonList[i].selected = true
          }
          // 因为在选中部分子菜单的情况下，再点击全选按钮。这种情况也能使一级菜单的selected=true，
          // 此时一级菜单的isIndeterminate=true（且这种情况只有 子菜单存在 才能发生）。
          // 但是只要被全选，一级菜单的isIndeterminate就要=false。
          preList.isIndeterminate = false
        }
      } else {
        // 因为让一级菜单的selected=false只有在全部都被选中的情况下发生，所以一级菜单的isIndetermainate是一直=false的
        if (sonList) {
          for (let i = 0; i < sonList.length; i++) {
            sonList[i].selected = false
          }
        }
      }
      // 要知道，让一级菜单的isIndeterminate=true，都是必须要操作子菜单才能做到的
    },
    // 单个选择
    checkOneBox(preList, sonList) {
      // tickCount选了的总量，unTickCount没选数量 这里的 e就是当前复选框的selected值
      var tickCount = 0,
        unTickCount = 0,
        len = sonList.length
      for (let i = 0; i < len; i++) {
        if (sonList[i].selected == true) tickCount++
        if (sonList[i].selected == false) unTickCount++
      }
      if (tickCount == len) {
        // 选中数量=子级总数，全选
        preList.selected = true
        preList.isIndeterminate = false
      } else if (unTickCount == len) {
        // 未选中数量=子级总数，未全选
        preList.selected = false
        preList.isIndeterminate = false
      } else {
        // 其他情况是不确定状态
        preList.selected = false
        preList.isIndeterminate = true
      }
    },

    // 完成编辑
    complete() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.ruleForm.uploadRule = ''
          this.editor = false
          this.ruleForm.editor = this.editor
          this.uploadOptions = this.uploadOptions.filter((item) => {
            return item.list.map((i) => {
              if (i.selected === true) {
                if (JSON.stringify(this.ruleForm.uploadRule) !== '{}') {
                  let isRule = this.ruleForm.uploadRule?.split(',')
                  if (!isRule.includes(i.label)) {
                    this.ruleForm.uploadRule += ',' + i.label
                  }
                } else {
                  this.ruleForm.uploadRule = i.label
                  //   this.ruleForm.uploadRule += i.label;
                  // } else {
                  //   this.ruleForm.uploadRule = i.label;
                }
              }
            })
          })
          // let arr = this.ruleForm.uploadRule.split(".");
          // arr = Array.from(new Set(arr));
          // arr.shift();
          // let str = arr.join(",.");
          // str = "." + str;
          // this.ruleForm.uploadRule = str;
          if (this.isParap) {
            this.$emit('handleSaveDataP', this.ruleForm)
          } else {
            this.$emit('handleSaveData', this.ruleForm)
          }
          // this.$emit("handleSaveData", this.ruleForm);
        }
      })
      return this.editor
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
      this.$emit('handleEnterEditor', this.ruleForm)
    },

    // 复制
    handleCopy() {
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
        this.$confirm(this.$t('QN_SHANGXIAYIDONGJIANGQINGKONGTIAOTISHEZHIQUERENSHIFOUYIDONG'), this.$t('QN_TISHI'), {
          confirmButtonText: this.$t('QN_SHI'),
          cancelButtonText: this.$t('QN_FOU'),
          type: 'warning'
        }).then(() => {
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
        this.$confirm(this.$t('QN_SHANGXIAYIDONGJIANGQINGKONGTIAOTISHEZHIQUERENSHIFOUYIDONG'), this.$t('QN_TISHI'), {
          confirmButtonText: this.$t('QN_SHI'),
          cancelButtonText: this.$t('QN_FOU'),
          type: 'warning'
        }).then(() => {
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
.file-show-p {
  width: 10rem;
}
.file-show {
  width: 10rem;
}
.upload-limit {
  display: inline;
  margin-left: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 17px;
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
    .form-img {
      position: relative;
      top: -2.2rem;

      img {
        width: 1.2rem;
      }
    }

    &:active {
      border-top: 2.2rem solid #1763f7;
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
    .form-item-row1-col3 {
      flex: 1;
      ::v-deep .el-form-item__content {
        display: flex;
      }
      .form-option {
        display: inline-block;
        width: 150px;
        max-height: 35px;
        align-self: center;
        text-align: center;
        background-color: #f8f8fa;
      }
      .form-icon {
        border-radius: 5.625rem;
        font-size: 18px;
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
    height: 35px !important;
    box-shadow: 0 0 3px rgb(0 38 98 / 0.15);
    border-color: transparent;
    text-align: center;

    // &:focus {
    //   border: 0;
    // }
  }
}
.upload-demo {
  .upload-button {
    position: relative;
    width: 18.75rem;
    height: 35px;
    padding: 0;
    color: #fff;
    background-color: #1660f1;
    margin: 30px 0 20px 0;
    .upload-text {
      position: absolute;
      right: 20px;
      img {
        width: 24px;
        height: 18px;
      }
    }
  }
  .upload-limit {
    display: inline;
    margin-left: 20px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 17px;
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
  .option {
    margin-top: 20px;
    .radioItem {
      margin: 20px 0;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
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

.uploadSet {
  width: 77rem;
  height: 24.125rem;
  background: #f8f8fa;
  border-radius: 4px;
  padding: 30px 40px 40px 40px;
  .title {
    margin: 10px 0;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 22px;
  }
  .fileItem {
    margin: 10px 0;
    .item {
      float: left;
      margin-right: 2.5rem;
      width: 4rem;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      // line-height: 22px;
    }
  }
  .divider {
    width: 64rem;
    height: 1px;
    background: #d8d8d8;
  }
}
.uploadSetP {
  width: 56rem;
  height: 24.125rem;
  background: #f8f8fa;
  border-radius: 4px;
  padding: 30px 40px 40px 40px;
  ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
    margin-left: -20px;
  }
  ::v-deep .el-checkbox__label {
    margin-left: -20px;
  }
  .fileItemP {
    margin: 8px 0;
    .itemP {
      float: left;
      margin-right: 2rem;
      width: 3rem;
      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      // line-height: 22px;
    }
  }
  .dividerP {
    width: 52rem;
    height: 1px;
    background: #d8d8d8;
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
