<template>
  <el-form
    :model="ruleForm"
    ref="ruleForm"
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
          <h2>{{ $t('QN_FENGEXIAN') }}</h2>
        </div>
        <div>
          <!-- <iButton @click="complete()">完成编辑</iButton> -->
        </div>
      </div>
      <!-- 横线 -->
      <el-row class="form-row">
        <div class="form-line"></div>
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
        <!-- <iButton v-show="mouseOver == true" @click="enterEditor()"
          >编辑</iButton
        > -->
        <iButton v-show="mouseOver == true" @click="handleCopy()">{{
          $t('QN_FUZHI')
        }}</iButton>
        <iButton v-show="mouseOver == true" @click="handlDelete()">{{
          $t('QN_SHANCHU')
        }}</iButton>
        <iButton
          v-show="mouseOver == true"
          @click="handleTop()"
          :disabled="overEditor ? sort == 1 : true"
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
      <el-row class="form-row">
        <div class="form-line"></div>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import { iButton } from 'rise'
import surveyMobile from '@/assets/images/survey/survey-mobile.svg'

export default {
  props: [
    'copyTopic',
    'sort',
    'type',
    'number',
    'topicLength',
    'contentCopy',
    'sortP',
    'topicLengthP',
    'numberP',
    'info',
    'infoP',
    'overEditor',
    'isParap'
  ],
  components: {
    iButton
  },
  data() {
    return {
      editor: false,
      mouseOver: false,
      surveyMobile,
      ruleForm: {
        editor: false,
        // topicType: this.type,
        name: '', // 问题名称
        code: this.isParap ? this.numberP : this.number, // 问题编号
        number: this.isParap ? this.numberP : this.number, // 问题序号
        type: 8 // 问题类型
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
    this.complete()
  },
  watch: {
    info: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          if (!this.isParap) {
            this.ruleForm = { ...this.ruleForm, ...val }
          }
        }
      }
    },
    infoP: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          if (!this.isParap) {
            this.ruleForm = { ...this.ruleForm, ...val }
          }
        }
      }
    }
  },
  methods: {
    // 完成编辑
    complete() {
      // this.editor = false;
      this.ruleForm.editor = this.editor
      if (this.isParap) {
        this.$emit('handleSaveDataP', this.ruleForm)
      } else {
        this.$emit('handleSaveData', this.ruleForm)
      }
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
      // this.ruleForm.editor = this.editor;
      this.$emit('handleTop', this.ruleForm)
    },
    // 下移
    handleBottom() {
      // this.ruleForm.editor = this.editor;
      this.$emit('handleBottom', this.ruleForm)
    }
  }
}
</script>
<style scoped lang="scss">
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
  }
}
::v-deep .el-button {
  background: #e8effe;
  color: #1763f7;
}

.form-item-index {
  width: 110px !important;

  ::v-deep .el-input__inner {
    text-align: center;

    &:focus {
      border: 0;
    }
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
  .operation-btn {
    // position: absolute;
    // right: 2.5rem;
    height: 2rem;
    float: right;
    text-align: right;
    margin-bottom: 20px;
  }
}
</style>
