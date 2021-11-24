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
          <h2>多选题</h2>
        </div>
        <div>
          <iButton @click="complete()">完成编辑</iButton>
          <iButton @click="cancelComplete()">删除该题</iButton>
        </div>
      </div>
      <el-row class="form-row">
        <div class="form-item-row1-col3">
          <iFormItem label="题目编号" prop="code">
            <iLabel
              :label="$t('题目编号')"
              slot="label"
              style="width: 10rem"
            ></iLabel>
            <iInput :value="getSort()" class="form-item-index" disabled />
            <iFormItem
              label="最多选项个数"
              prop="most"
              :class="isParap ? 'more-select-P' : 'more-select'"
            >
              <!-- <iLabel
                :label="$t('最多选项个数')"
                slot="label"
                style="width: 7rem"
              ></iLabel> -->
              <!-- <iInput placeholder="" v-model="ruleForm.multipleRule.most" /> -->
              <iSelect v-model="ruleForm.most">
                <el-option label="不限制" value=""></el-option>
                <el-option
                  v-for="(item, index) in mostOptionList"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </iSelect>
            </iFormItem>
            <iFormItem
              label="最少选项个数"
              prop="least"
              :class="isParap ? 'more-select-P' : 'more-select'"
            >
              <!-- <iLabel
                :label="$t('最少选项个数')"
                slot="label"
                style="width: 7rem"
              ></iLabel> -->
              <!-- <iInput placeholder="" v-model="ruleForm.multipleRule.least" /> -->
              <iSelect v-model="ruleForm.least">
                <el-option
                  v-for="(item, index) in leastOptionList"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </iSelect>
            </iFormItem>
            <iFormItem
              label="跳转"
              :class="isParap ? 'more-select-P' : 'more-select'"
              ><iSelect
                v-model="ruleForm.actionItem"
                placeholder="请选择"
                @focus="
                  () => {
                    if (isParap) {
                      selectOptionP();
                    } else {
                      selectOption();
                    }
                  }
                "
                :class="isParap ? 'choose-select-P' : 'choose-select'"
                value-key="value"
              >
                <el-option
                  v-for="(item, index) in isParap ? optionsListP : optionsList"
                  :key="index"
                  :label="item.label"
                  :value="item"
                >
                </el-option> </iSelect
            ></iFormItem>
            <el-checkbox
              :class="isParap ? 'more-select-P' : 'more-select'"
              v-model="ruleForm.requiredQuestion"
              >必答</el-checkbox
            >
          </iFormItem>
        </div>
      </el-row>
      <el-row class="form-row">
        <div class="form-item-row1-col3">
          <iFormItem label="题目标题" prop="name">
            <iLabel
              :label="$t('题目标题')"
              required
              slot="label"
              style="width: 10rem"
            ></iLabel>
            <iInput
              placeholder="请输入题目标题"
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
              :label="$t('选项' + (index + 1))"
              required
              slot="label"
              style="width: 10rem"
            ></iLabel>
            <iInput
              placeholder="请输入选项内容"
              v-model="item.name"
              @keydown.native="keydownContent($event, item)"
            />
            <div class="add-minus">
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
        <iButton v-show="mouseOver == true" @click="enterEditor()"
          >编辑</iButton
        >
        <iButton v-show="mouseOver == true" @click="handleCopy()">复制</iButton>
        <iButton v-show="mouseOver == true" @click="handlDelete()"
          >删除</iButton
        >
        <iButton
          v-show="mouseOver == true"
          @click="handleTop()"
          :disabled="overEditor ? (isParap ? sortP == 1 : sort == 1) : true"
          >上移</iButton
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
          >下移</iButton
        >
      </div>
      <div class="title">
        <span v-if="ruleForm.requiredQuestion" style="color: red">* </span>
        {{ isParap ? info.code + "." + infoP.code : info.code + ". "
        }}{{ ruleForm.name }}
        <span class="text" style="margin-left: 10px; color: #999999">
          <span v-if="ruleForm.least">最少选择{{ ruleForm.least }}项；</span
          ><span v-if="ruleForm.most">最多选择{{ ruleForm.most }}项；</span>
        </span>
      </div>
      <el-checkbox-group
        class="option"
        v-model="checkList"
        v-for="(item, index) in ruleForm.options"
        :key="index"
        :max="0"
      >
        <el-checkbox :label="item.name + index" class="radioItem">{{
          String.fromCharCode("A".charCodeAt(0) + index) + ". " + item.name
        }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </el-form>
</template>

<script>
import { iLabel, iSelect, iInput, iFormItem, iButton } from "rise";
import surveyMobile from "@/assets/images/survey/survey-mobile.svg";

export default {
  props: [
    "copyTopic",
    "sort",
    "type",
    "number",
    "topicLength",
    "contentCopy",
    "isParap",
    "sortP",
    "topicLengthP",
    "numberP",
    "info",
    "infoP",
    "overEditor",
    "actionBar",
    "contentlist",
    "racialTopicLength",
    "racialTopicLengthP",
    // "racialTopicLengthM",
  ],
  components: {
    iLabel,
    iInput,
    iFormItem,
    iSelect,
    iButton,
  },
  data() {
    const validLength = function (rule, value, callback) {
      function getStrLength(str) {
        return str.replace(/[^x00-xff]/g, "xx").length;
      }
      if (!value) {
        callback();
      } else if (getStrLength(value) <= this.maxLength) {
        callback();
      } else {
        return callback(new Error(`最大长度 ${this.maxLength / 2} 字符`));
      }
    };

    const length30 = {
      maxLength: 60,
    };
    const length100 = {
      maxLength: 200,
    };
    return {
      // currentIndex: 0,
      checkList: [],
      mouseOver: false,
      editor: this.isParap ? this.infoP.editor : this.info.editor,
      ruleForm: {
        editor: true,
        // topicType: this.type,
        // id: this.id,
        id: "",
        name: "", // 问题名称
        code: this.isParap ? this.numberP : this.number, // 问题编号
        number: this.isParap ? this.numberP : this.number, // 问题序号
        type: 2, // 问题类型
        requiredQuestion: true, // 是否必答
        // multipleRule: {
        //   most: "",
        //   least: 1,
        // }, // 多选题规则
        most: "",
        least: 1,
        options: [
          {
            number: 1, // 选项序号
            type: 1, // 选项类型
            name: "", // 选项名称
            action: "", // 跳题事件
          },
          {
            number: 2, // 选项序号
            type: 1, // 选项类型
            name: "", // 选项名称
            action: "", // 跳题事件
          },
          // {
          //   number: 3, // 选项序号
          //   type: 1, // 选项类型
          //   name: "", // 选项名称
          //   action: "", // 跳题事件
          // },
        ], // 问题选项
        actionItem: {
          value: "",
          label: "",
        },
      },
      rules: {
        name: [
          { required: true, message: "必填", trigger: ["blur", "change"] },
          // {
          //   min: 1,
          //   max: 200,
          //   message: "最大长度 100 字符",
          //   trigger: ["blur", "change"],
          // },
          {
            validator: validLength.bind(length100),
            trigger: ["blur", "change"],
          },
        ],
        options: [
          { required: true, message: "必填", trigger: ["blur", "change"] },
          // {
          //   min: 1,
          //   max: 60,
          //   message: "最大长度 30 字符",
          //   trigger: ["blur", "change"],
          // },
          {
            validator: validLength.bind(length30),
            trigger: ["blur", "change"],
          },
        ],
      },
      // actionItem: "", // 跳题选择
      optionsList: [],
      optionsListP: [],
      surveyMobile,
      mostOptionList: [], // 最多选择个数
      leastOptionList: [],
    };
  },
  mounted() {
    if (this.isParap) {
      this.selectOptionP();
    } else {
      this.selectOption();
    }
    let obj = this.isParap ? { ...this.infoP } : { ...this.info };
    this.ruleForm = { ...this.ruleForm, ...obj };
    // this.ruleForm.options =
    //   this.ruleForm.options &&
    //   this.ruleForm.options.map((item) => {
    //     return {
    //       ...item,
    //       action: {
    //         value: this.isParap ? item.action : Number(item.action),
    //         label: "第" + item.action + "题",
    //       },
    //     };
    //   });
    // this.ruleForm.actionItem = this.ruleForm.options[0].action
    //   ? Number(this.ruleForm.options[0].action)
    //   : "";
    // this.actionItem = {
    //   value: Number(this.ruleForm.options[0].action),
    //   label:
    //     Number(this.ruleForm.options[0].action) == -1
    //       ? "结束答题"
    //       : this.ruleForm.options[0].action
    //       ? "第" + this.ruleForm.options[0].action + "题"
    //       : "",
    // }
    this.ruleForm.actionItem = this.generateObj(
      this.ruleForm.options[0] ? this.ruleForm.options[0].action : ""
    );
    if (this.obj && this.obj.multipleRule) {
      let mulObj = this.obj.multipleRule;
      this.ruleForm.most = mulObj ? (mulObj.most ? mulObj.most : "") : "";
      this.ruleForm.least = mulObj ? (mulObj.least ? mulObj.least : 1) : 1;
    }
    if (this.copyTopic == true) {
      this.ruleForm = this.contentCopy;
      this.$emit("changeCopyTopic");
    }
  },
  watch: {
    "ruleForm.actionItem": {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          if (this.isParap) {
            if (
              Number(this.ruleForm.code.toString().split(".")[1]) &&
              Number(val.value) !== -1
            ) {
              this.ruleForm.actionItem = "";
            }
          } else {
            if (Number(this.ruleForm.code) > val && Number(val.value) !== -1) {
              this.ruleForm.actionItem = "";
            }
          }
        }
      },
    },
    "info.number": {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.ruleForm = {
            ...this.ruleForm,
            ...this.info,
            most: this.info.multipleRule.most
              ? this.info.multipleRule.most
              : "",
            least: this.info.multipleRule.least
              ? this.info.multipleRule.least
              : 1,
          };
        }
      },
    },
    "infoP.number": {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.ruleForm = {
            ...this.ruleForm,
            ...this.infoP,
            most: this.infoP.multipleRule.most
              ? this.infoP.multipleRule.most
              : "",
            least: this.infoP.multipleRule.least
              ? this.infoP.multipleRule.least
              : 1,
          };
        }
      },
    },
    "ruleForm.most": {
      handler(val) {
        let arr = [];
        if (val) {
          this.ruleForm.options.forEach((item, index) => {
            if (index + 1 <= val) {
              arr.push(index + 1);
            }
          });
        } else {
          this.ruleForm.options.forEach((item, index) => {
            arr.push(index + 1);
          });
        }
        this.leastOptionList = arr;
      },
      immediate: true,
      deep: true,
    },
    "ruleForm.least": {
      handler(val) {
        let arr = [];
        if (val) {
          this.ruleForm.options.forEach((item, index) => {
            if (index + 1 >= val) {
              arr.push(index + 1);
            }
          });
        } else {
          this.ruleForm.options.forEach((item, index) => {
            arr.push(index + 1);
          });
        }
        this.mostOptionList = arr;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    generateObj(action) {
      let obj = {};
      obj = {
        value: action
          ? action.toString().includes(".")
            ? action.toString()
            : Number(action)
          : "",
        label:
          Number(action) == -1
            ? "结束答题"
            : Number(action)
            ? "第" + action + "题"
            : "",
      };
      return obj;
    },
    // 删除该题
    cancelComplete() {
      if (this.isParap) {
        this.$emit("cancelCompleteP", this.ruleForm);
      } else {
        this.$emit("cancelComplete", this.ruleForm);
      }
    },
    // 最多选择个数
    // mostOption() {
    //   this.mostOptionList = [];
    //   this.mostOptionList.push({ label: "不限制", value: "999" });
    //   for (let i = 1; i <= this.ruleForm.options.length; i++) {
    //     this.mostOptionList.push({
    //       label: i,
    //       value: i,
    //     });
    //   }
    // },
    // 最少选择个数
    // leastOption() {
    //   this.leastOptionList = [];
    //   for (let i = 1; i <= this.ruleForm.options.length; i++) {
    //     this.leastOptionList.push({
    //       label: i,
    //       value: i,
    //     });
    //   }
    // },
    keydownName(e) {
      if (e.keyCode == 32 && this.ruleForm.name == "") {
        e.returnValue = false;
      }
    },
    keydownContent(e, i) {
      if (e.keyCode == 32 && i.name == "") {
        e.returnValue = false;
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
        return this.info.code + "." + this.infoP.code;
      } else {
        return this.info.code;
      }
    },
    selectOption() {
      this.optionsList = [];
      if (this.info.code == this.racialTopicLength) {
        this.optionsList = [];
      } else {
        // this.optionsList.push({
        //   label: "第" + this.sort + 1 + "题",
        //   value: this.sort + 1,
        // });
        for (let i = this.info.code; i < this.racialTopicLength; i++) {
          this.optionsList.push({
            label: "第" + (i + 1) + "题",
            value: i + 1,
          });
        }
      }
      this.optionsList.push({
        label: "结束答题",
        value: -1,
      });
    },
    selectOptionP() {
      // this.racialTopicLengthP = this.racialTopicLengthM
      //   ? this.racialTopicLengthM
      //   : this.racialTopicLengthP;
      this.optionsListP = [];
      if (this.infoP.code == this.racialTopicLengthP) {
        this.optionsListP = [];
      } else {
        // this.optionsListP.push({
        //   label: "第" + this.sortP + 1 + "题",
        //   value: this.sortP + 1,
        // });
        for (let i = this.infoP.code; i < this.racialTopicLengthP; i++) {
          this.optionsListP.push({
            label: `第 ${this.info.code}.${i + 1} 题`,
            value: `${this.info.code}.${i + 1}`,
          });
        }
      }
      this.optionsListP.push({
        label: "结束答题",
        value: -1,
      });
    },
    // 完成编辑
    complete() {
      this.$refs["ruleForm"] &&
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            this.ruleForm.options = this.ruleForm.options.map((item) => {
              return {
                ...item,
                action: this.ruleForm.actionItem.value,
              };
            });
            this.editor = false;
            this.ruleForm.editor = this.editor;
            this.ruleForm.multipleRule = {
              most: this.ruleForm.most,
              least: this.ruleForm.least,
            };
            this.ruleForm.options = this.ruleForm.options.map((item) => {
              return {
                ...item,
                action:
                  typeof item.action === "object"
                    ? item.action.value
                    : item.action,
              };
            });
            if (this.isParap) {
              this.$emit("handleSaveDataP", this.ruleForm);
            } else {
              this.$emit("handleSaveData", this.ruleForm);
            }
          }
        });
      return this.editor;
    },
    // 添加一个选项
    add(scope) {
      let arr = [];
      this.ruleForm.options.splice(scope.number, 0, {
        number: "",
        type: 1,
        name: "",
        action: "",
      });
      this.ruleForm.options.map((item) => {
        item.number = this.ruleForm.options.indexOf(item) + 1;
      });
      this.ruleForm.most = "";
      this.ruleForm.least = 1;
      this.ruleForm.options.forEach((item, index) => {
        arr.push(index + 1);
      });
      this.mostOptionList = arr;
      this.leastOptionList = arr;
    },
    // 减去一个选项
    minus(scope) {
      let arr = [];
      this.ruleForm.options = this.ruleForm.options.filter((item) => {
        return scope.number !== item.number;
      });
      this.ruleForm.options.map((item) => {
        item.number = this.ruleForm.options.indexOf(item) + 1;
      });
      this.ruleForm.most = "";
      this.ruleForm.least = 1;
      this.ruleForm.options.forEach((item, index) => {
        arr.push(index + 1);
      });
      this.mostOptionList = arr;
      this.leastOptionList = arr;
    },
    // 向上移动
    moveUp(item) {
      let index = this.ruleForm.options.indexOf(item);
      this.swapArray(this.ruleForm.options, index - 1, index);
    },
    // 向下移动
    moveDown(item) {
      let index = this.ruleForm.options.indexOf(item);
      this.swapArray(this.ruleForm.options, index, index + 1);
    },
    // 数组元素互换位置
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      arr.map((item) => {
        item.number = arr.indexOf(item) + 1;
      });
      return arr;
    },

    // 展示一列按钮
    enter() {
      this.mouseOver = true;
    },
    // 鼠标离开
    leave() {
      this.mouseOver = false;
    },
    // 编辑
    enterEditor() {
      this.editor = true;
      this.ruleForm.editor = true;
      this.$emit("handleEnterEditor", this.ruleForm);
    },

    // 复制
    handleCopy() {
      this.ruleForm.options = this.ruleForm.options.map((item) => {
        return {
          ...item,
          action: "",
        };
      });
      this.$emit("handleCopy", { ...this.ruleForm });
    },
    // 删除
    handlDelete() {
      if (this.isParap) {
        this.$emit("handleDeleteP", this.ruleForm);
      } else {
        this.$emit("handleDelete", this.ruleForm);
      }
    },
    // 上移
    handleTop() {
      if (this.actionBar) {
        this.$confirm("上下移动将清空跳题设置，确认是否移动？", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        }).then(() => {
          if (!this.isParap) {
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
          }
          this.ruleForm.editor = this.editor;
          this.$emit("handleTop", this.ruleForm, this.contentlist);
        });
      } else {
        this.ruleForm.editor = this.editor;
        this.$emit("handleTop", this.ruleForm, this.contentlist);
      }
    },
    // 下移
    handleBottom() {
      if (this.actionBar) {
        this.$confirm("上下移动将清空跳题设置，确认是否移动？", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        }).then(() => {
          if (!this.isParap) {
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
          }
          this.ruleForm.editor = this.editor;
          this.$emit("handleBottom", this.ruleForm, this.contentlist);
        });
      } else {
        this.ruleForm.editor = this.editor;
        this.$emit("handleBottom", this.ruleForm, this.contentlist);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.add-minus {
  display: flex;
  width: 140px;
  height: 35px;
  align-items: center;
}
.text {
  font-size: 12px;
  display: inline-block;
  -webkit-transform: scale(0.75);
}

.choose-select {
  width: 18.75rem;
}
.choose-select-p {
  width: auto;
}
.more-select-P {
  margin-left: 20px;
}
.more-select {
  margin-left: 3.75rem;
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
  content: "";
  border-left: 0;
  border-top: 0;
}
</style>
