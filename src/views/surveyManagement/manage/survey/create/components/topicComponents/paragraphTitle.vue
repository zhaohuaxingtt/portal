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
          <h2>段落</h2>
        </div>
        <div>
          <iButton @click="complete()">完成编辑</iButton>
          <iButton @click="cancelComplete()">删除该题</iButton>
        </div>
      </div>
      <el-row class="form-row">
        <div class="form-item-row1-col3">
          <iFormItem label="题目编号" prop="index">
            <iLabel
              :label="$t('题目编号')"
              slot="label"
              style="width: 10rem"
            ></iLabel>
            <iInput v-model="info.code" class="form-item-index" disabled />
            <!-- <el-checkbox
              style="margin-left: 4rem"
              v-model="ruleForm.requiredQuestion"
              >必答</el-checkbox
            > -->
          </iFormItem>
        </div>
      </el-row>
      <el-row class="form-row">
        <div class="form-item-row1-col3">
          <iFormItem label="段落标题" prop="name">
            <iLabel
              :label="$t('段落标题')"
              slot="label"
              style="width: 10rem"
              required
            ></iLabel>
            <iInput
              placeholder="请输入题目内容"
              v-model="ruleForm.name"
              @keydown.native="keydownName($event)"
            />
          </iFormItem>
        </div>
      </el-row>
      <div class="draggle">
        <div class="empty"></div>
        <div class="row-draggle">
          <draggable
            class="dragArea list-group"
            :list="contentlistInner"
            v-bind="dragOptions"
            @change="handleContentDrag"
            @update="dragEnd"
            handle=".handle"
            @start="handleStart"
          >
            <transition-group>
              <div
                class="list-group-item"
                v-for="(i, index) in contentlistInner"
                :key="index"
              >
                <keep-alive>
                  <component
                    :is="`${typeObjArr[i.type - 1]}Title`"
                    :type="i.type"
                    :numberP="i.number"
                    :infoP="i"
                    :info="info"
                    :overEditor="overEditorP"
                    :actionBar="actionBarP"
                    :topicLengthP="contentlistInner.length"
                    :racialTopicLengthP="racialTopicLengthP"
                    :contentCopy="contentCopy"
                    @handleSaveDataP="handleSaveDataComp"
                    @handleDeleteP="handleDeleteComp"
                    @handleCopy="handleCopyComp"
                    @handleTop="handleTopComp"
                    @handleBottom="handleBottomComp"
                    @handleEnterEditor="handleEnterEditor"
                    @cancelCompleteP="cancelCompleteP"
                    :isParap="true"
                    :sortP="index + 1"
                    :sort="sort"
                    ref="childFIn"
                  />
                </keep-alive>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div class="draggle">
        <div class="empty"></div>
        <div class="row-draggle row-draggle-area">
          <borderTitle
            @drop="handleBorderDrop"
            :bodyHeight="contentlistInner"
            :isParap="true"
          ></borderTitle>
        </div>
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
        <iButton v-show="mouseOver" @click="enterEditor()">编辑</iButton>
        <iButton v-show="mouseOver" @click="handleCopy()">复制</iButton>
        <iButton v-show="mouseOver" @click="handlDelete()">删除</iButton>
        <iButton
          v-show="mouseOver"
          @click="handleTop()"
          :disabled="overEditor ? sort == 1 : true"
          >上移</iButton
        >
        <iButton
          v-show="mouseOver"
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
      <div>
        <div class="title">{{ info.code + ". " }} {{ ruleForm.name }}</div>
      </div>
      <div>
        <previewOperate
          v-for="item of contentlistInner"
          :key="item.number"
          @enterEditor="enterEditor"
          @handleCopy="handleCopy"
          @handlDelete="handlDelete"
          @handleTop="handlehandleTopCopy"
          @handleBottom="handleBottom"
          :ruleForm="item"
          :isParap="true"
          :sort="info.code"
          :name="ruleForm.name"
        />
      </div>
    </div>
  </el-form>
</template>

<script>
import { iLabel, iInput, iFormItem, iButton } from "rise";
import surveyMobile from "@/assets/images/survey/survey-mobile.svg";
import radioTitle from "./radioTitle.vue";
import borderTitle from "./borderTitle.vue";
import selectTitle from "./selectTitle.vue";
import pullTitle from "./pullTitle.vue";
import blankTitle from "./blankTitle.vue";
import imgTitle from "./imgTitle.vue";
import fileTitle from "./fileTitle.vue";
import remarkTitle from "./remarkTitle.vue";
import dividerTitle from "./divider.vue";
import previewOperate from "../previewOperate.vue";
import draggable from "vuedraggable";
import { iMessage } from "rise";
export default {
  props: [
    "id",
    "type",
    "number",
    "topicLength",
    "contentCopy",
    "sort",
    "info",
    "overEditor",
    "racialTopicLength",
    // "contentlistP",
  ],
  components: {
    iLabel,
    iInput,
    iFormItem,
    iButton,
    draggable,
    radioTitle,
    borderTitle,
    selectTitle,
    pullTitle,
    blankTitle,
    imgTitle,
    fileTitle,
    previewOperate,
    // remarkTitle,
    // dividerTitle,
    remarkTitle,
    dividerTitle,
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

    const length100 = {
      maxLength: 200,
    };
    return {
      typeObjArr: [
        "radio",
        "select",
        "blank",
        "img",
        "file",
        "pull",
        "remark",
        "divider",
      ],
      dragOptions() {
        return {
          animation: 400,
          group: "description",
          disabled: false,
          ghostClass: "ghost",
        };
      },
      //  contentCopy: {},
      racialTopicLengthP: 0,
      contentlistInner: [],
      surveyMobile,
      mouseOver: false,
      editor: this.info.editor,
      overEditorP: false,
      actionBarP: false,
      operate: false,
      ruleForm: {
        editor: true,
        // topicType: this.type,
        // id: this.id,
        id: "",
        name: "", // 问题名称
        // code: this.number, // 问题编号
        number: this.number, // 问题序号
        type: 9, // 问题类型
        requiredQuestion: "", // 是否必答
        sonQuestions: [],
      },
      rules: {
        name: [
          { required: true, message: "必填", trigger: ["blur", "change"] },
          // {
          //   min: 1,
          //   max: 100,
          //   message: "最大长度 100 字符",
          //   trigger: ["blur", "change"],
          // },
          {
            validator: validLength.bind(length100),
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  watch: {
    contentlistInner: {
      handler(list) {
        if (!this.operate) {
          return;
        }
        let bol = false;
        this.overEditorP = list.every((item) => {
          if (item.options) {
            item.options.forEach((item) => {
              if (item.action) {
                bol = true;
              }
            });
          }
          // if (item.actionItem) {
          //   bol = true;
          // }
          if (item.actionItem && item.actionItem.value) {
            bol = true;
          }
          return !item.editor;
        });
        this.actionBarP = bol;
      },
      immediate: true,
    },
    "info.number": {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.ruleForm = { ...this.ruleForm, ...this.info };
        }
      },
    },
  },
  mounted() {
    // this.overEditorP = true;
    this.ruleForm = { ...this.ruleForm, ...this.info };
    console.log("this.ruleForm", this.ruleForm);
    this.contentlistInner = [...this.ruleForm.sonQuestions];
    this.contentlistInner = this.contentlistInner.map((item, index) => {
      return {
        ...item,
        number: index + 1,
        type: item.type,
      };
    });
    this.contentlistInner = this.handleCheckCode(this.contentlistInner);
    console.log("this.contentlistInner", this.contentlistInner);
  },
  methods: {
    //设置code的函数
    handleCheckCode(arr) {
      let curCode = 0;
      arr = arr.map((item) => {
        if (Number(item.type) !== 7 && Number(item.type) !== 8) {
          curCode++;
          return {
            ...item,
            code: curCode,
          };
        }
        return {
          ...item,
          code: "",
        };
      });
      this.racialTopicLengthP = curCode;
      return arr;
    },
    // 删除该题
    cancelComplete() {
      this.$emit("cancelComplete", this.ruleForm);
    },
    cancelCompleteP(data) {
      let index = data.number - 1;
      this.contentlistInner.splice(index, 1);
      this.contentlistInner = this.contentlistInner.map((item, index) => {
        return {
          ...item,
          number: index + 1,
        };
      });
      this.contentlistInner = this.handleCheckCode(this.contentlistInner);
    },
    handleStart(data) {
      const obj = this.contentlistInner[data.oldIndex];
      if (this.actionBarP && Number(obj.type) !== 8 && Number(obj.type) !== 7) {
        this.$confirm("拖拽将清空跳题设置，确认是否拖拽？", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        }).then(() => {
          this.actionBarP = false;
        });
      }
    },
    handleEnterEditor(data) {
      this.overEditorP = false;
      let index = data.number - 1;
      this.contentlistInner.splice(index, 1, { ...data });
      this.contentlistInner = this.handleCheckCode(this.contentlistInner);
    },
    keydownName(e) {
      if (e.keyCode == 32 && this.ruleForm.name == "") {
        e.returnValue = false;
      }
    },
    moveInArray(arr, from, to) {
      // 确保是有效数组
      if (Object.prototype.toString.call(arr) !== "[object Array]") {
        throw new Error("Please provide a valid array");
      }
      // 删除当前的位置
      var item = arr.splice(from, 1);
      // 确保还剩有元素移动
      if (!item.length) {
        throw new Error("There is no item in the array at index " + from);
      }
      // 移动元素到指定位置
      arr.splice(to, 0, item[0]);
      return arr;
    },
    // handleContentDrag(data) {
    //   console.log("data", data);
    // },
    handleContentDrag(data) {
      let arr = this.moveInArray(
        this.contentlistInner,
        data.oldIndex,
        data.newIndex
      );
      this.contentlistInner = arr.map((item, index) => {
        return {
          ...item,
          number: index + 1,
        };
      });
      if (
        Number(data.moved.element.type) !== 8 &&
        Number(data.moved.element.type) !== 7
      ) {
        this.contentlistInner = this.contentlistInner.map((item) => {
          if (item.options) {
            item.options = item.options.map((it) => {
              return {
                ...it,
                action: "",
              };
            });
            return {
              ...item,
              actionItem: "",
            };
          }
          return {
            ...item,
            actionItem: "",
          };
        });
      }
      this.contentlistInner = this.handleCheckCode(this.contentlistInner);
    },
    handleBorderDrop(e) {
      let type = e.dataTransfer.getData("type");
      if (type) {
        this.handleAddType(type);
      }
    },
    handleCompleteAdd(str, str2) {
      let bol = false;
      if (this.$refs.childFIn) {
        this.$refs.childFIn.forEach((item, index) => {
          if (!bol) {
            bol = item.complete();
          } else {
            item.complete();
          }
        });
        // if (bol) {
        //   iMessage.warn(this.$t("请完成编辑后再添加！"));
        //   return;
        // }
      }
      if (!bol) {
        if ("haha" !== str) {
          this.complete();
        }
        if (str2 === "para") {
          return this.complete();
        }
      }

      return bol;
    },
    handleAddType(type) {
      let bol = this.handleCompleteAdd("haha");
      if (bol) {
        iMessage.warn("请完成编辑后再添加!");
        return;
      }
      if (
        this.contentlistInner.sonQuestions &&
        this.contentlistInner.sonQuestions.length !== 0
      ) {
        this.contentlistInner.sonQuestions.push({
          // id: this.contentlist.length + 1,
          type: type,
          number: this.contentlistInner.length + 1,
          editor: true,
        });
      } else {
        this.contentlistInner.push({
          // id: this.contentlist.length + 1,
          type: type,
          number: this.contentlistInner.length + 1,
          editor: true,
          name: "",
        });
      }
      this.contentlistInner = this.handleCheckCode(this.contentlistInner);
    },
    // 保存数据
    handleSaveDataComp(data) {
      let index = this.contentlistInner.findIndex((item) => {
        return item.number === data.number;
      });
      if (index >= 0) {
        this.contentlistInner.splice(index, 1, data);
      }
      this.contentlistInner = this.handleCheckCode(this.contentlistInner);
      this.operate = true;
      // this.ruleForm.sonQuestions = [...this.contentlist];
      // this.$emit("handleSaveData", data);
    },
    // 删除
    handleDeleteComp(data) {
      this.contentlistInner = this.contentlistInner.filter((item) => {
        return item.number !== data.number;
      });
      this.contentlistInner = this.contentlistInner.map((item, index) => {
        // item.number = this.contentlist.indexOf(item) + 1;
        return {
          ...item,
          number: index + 1,
        };
      });
      this.contentlistInner = this.handleCheckCode(this.contentlistInner);
    },

    // 数组元素互换位置
    swapArrayComp(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      arr.map((item, index) => {
        return (item.number = index + 1);
      });
      return arr;
    },
    // 复制
    handleCopyComp(data) {
      this.contentCopy = { ...data };
      if (this.actionBarP) {
        if (Number(data.type) === 8 || Number(data.type) === 7) {
          this.contentCopy.id = "";
          let index = data.number - 1;
          // this.contentCopy.actionItem = "";
          this.contentlistInner.splice(index, 0, this.contentCopy);
          this.contentlistInner = this.contentlistInner.map((item, index) => {
            return {
              ...item,
              number: index + 1,
              // actionItem: "",
            };
          });
          if (Number(data.type) !== 8 && Number(data.type) !== 7) {
            this.contentlistInner = this.contentlistInner.map((item) => {
              if (item.options) {
                item.options = item.options.map((it) => {
                  return {
                    ...it,
                    action: "",
                  };
                });
                return {
                  ...item,
                  actionItem: "",
                };
              }
              return {
                ...item,
                actionItem: "",
              };
            });
          }
          this.contentlistInner = this.handleCheckCode(this.contentlistInner);
        } else {
          this.$confirm("复制将清空跳转,是否复制", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning",
          }).then(() => {
            this.contentCopy.id = "";
            let index = data.number - 1;
            // this.contentCopy.actionItem = "";
            this.contentlistInner.splice(index, 0, this.contentCopy);
            this.contentlistInner = this.contentlistInner.map((item, index) => {
              return {
                ...item,
                number: index + 1,
                // actionItem: "",
              };
            });
            if (Number(data.type) !== 8 && Number(data.type) !== 7) {
              this.contentlistInner = this.contentlistInner.map((item) => {
                if (item.options) {
                  item.options = item.options.map((it) => {
                    return {
                      ...it,
                      action: "",
                    };
                  });
                  return {
                    ...item,
                    actionItem: "",
                  };
                }
                return {
                  ...item,
                  actionItem: "",
                };
              });
            }
            this.contentlistInner = this.handleCheckCode(this.contentlistInner);
          });
        }
      } else {
        this.contentCopy.id = "";
        let index = data.number - 1;
        this.contentCopy.actionItem = "";
        this.contentlistInner.splice(index, 0, this.contentCopy);
        this.contentlistInner = this.contentlistInner.map((item, index) => {
          return {
            ...item,
            number: index + 1,
            actionItem: "",
          };
        });
        this.contentlistInner = this.handleCheckCode(this.contentlistInner);
      }
    },
    clearSetJump() {
      this.contentlistInner = this.contentlistInner.map((item) => {
        if (item.options) {
          item.options = item.options.map((it) => {
            return {
              ...it,
              action: "",
            };
          });
          return {
            ...item,
            actionItem: "",
          };
        }
        return {
          ...item,
          actionItem: "",
        };
      });
      this.actionBarP = false;
      this.ruleForm.sonQuestions = [...this.contentlistInner];
    },
    // 上移
    handleTopComp(data) {
      this.actionBarP = false;
      // let index = data.number - 1;
      // this.swapArrayComp(this.contentlist, index - 1, index);
      data.id = data.number;
      let index = data.number - 1;
      this.contentlistInner[index] = { ...data };
      this.contentlistInner = this.swapArray(
        [...this.contentlistInner],
        index - 1,
        index
      );
      this.contentlistInner = this.handleCheckCode(this.contentlistInner);
      // this.contentlistInner = this.clearSetJump(this.contentlistInner);
      if (Number(data.type) !== 8 && Number(data.type) !== 7) {
        this.contentlistInner = this.contentlistInner.map((item) => {
          if (item.options) {
            item.options = item.options.map((it) => {
              return {
                ...it,
                action: "",
              };
            });
            return {
              ...item,
              actionItem: "",
            };
          }
          return {
            ...item,
            actionItem: "",
          };
        });
      }
      this.ruleForm.sonQuestions = [...this.contentlistInner];
    },
    // 下移
    handleBottomComp(data) {
      this.actionBarP = false;
      // let index = data.number - 1;
      // this.swapArrayComp(this.contentlist, index, index + 1);
      data.id = data.number;
      let index = data.number - 1;
      this.contentlistInner[index] = { ...data };
      this.contentlistInner = this.swapArray(
        [...this.contentlistInner],
        index,
        index + 1
      );
      this.contentlistInner = this.handleCheckCode(this.contentlistInner);
      // this.contentlistInner = this.clearSetJump(this.contentlistInner);
      if (Number(data.type) !== 8 && Number(data.type) !== 7) {
        this.contentlistInner = this.contentlistInner.map((item) => {
          if (item.options) {
            item.options = item.options.map((it) => {
              return {
                ...it,
                action: "",
              };
            });
            return {
              ...item,
              actionItem: "",
            };
          }
          return {
            ...item,
            actionItem: "",
          };
        });
      }
      this.ruleForm.sonQuestions = [...this.contentlistInner];
    },
    // 完成编辑
    complete() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.editor = false;
          this.ruleForm.editor = this.editor;
          this.ruleForm = {
            ...this.ruleForm,
            sonQuestions: [...this.contentlistInner],
          };
          let obj = {};
          this.ruleForm.sonQuestions = this.ruleForm.sonQuestions.reduce(
            (cur, next) => {
              if (!obj[next.number]) {
                obj[next.number] = true;
                cur.push(next);
              }
              return cur;
            },
            []
          );
          this.ruleForm.sonQuestions = this.handleCheckCode(
            this.ruleForm.sonQuestions
          );
          this.contentlistInner = this.handleCheckCode(this.contentlistInner);
          this.operate = true;
          this.$emit("handleSaveData", this.ruleForm);
        }
      });
      return this.editor;
    },
    // 添加一个选项
    add(scope) {
      this.ruleForm.options.splice(scope.number, 0, {
        number: "",
        type: 1,
        name: "",
        action: "",
      });
      this.ruleForm.options.map((item) => {
        item.number = this.ruleForm.options.indexOf(item) + 1;
      });
    },
    // 减去一个选项
    minus(scope) {
      this.ruleForm.options = this.ruleForm.options.filter((item) => {
        return scope.number !== item.number;
      });
      this.ruleForm.options.map((item) => {
        item.number = this.ruleForm.options.indexOf(item) + 1;
      });
    },
    // 向上移动
    moveUp(item) {
      let index = this.ruleForm.options.indexOf(item);
      this.ruleForm.options = this.swapArray(
        this.ruleForm.options,
        index - 1,
        index
      );
    },
    // 向下移动
    moveDown(item) {
      let index = this.ruleForm.options.indexOf(item);
      this.ruleForm.options = this.swapArray(
        this.ruleForm.options,
        index,
        index + 1
      );
    },
    // 数组元素互换位置
    swapArray(arr, index1, index2) {
      // arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      // arr.map((item) => {
      //   item.number = arr.indexOf(item) + 1;
      // });
      // return arr;
      let item1 = arr[index1];
      let item2 = arr[index2];
      arr = arr.map((item, index) => {
        if (index === index1) {
          item = item2;
        }
        if (index === index2) {
          item = item1;
        }
        return {
          ...item,
          id: index + 1,
          number: index + 1,
        };
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
      this.ruleForm = { ...this.ruleForm, ...this.info };
      this.overEditorP = true;
      this.editor = true;
      this.ruleForm.editor = true;
      // 完成编辑后再进行编辑
      this.contentlistInner = [...this.ruleForm.sonQuestions];
      this.contentlistInner = this.contentlistInner.map((item, index) => {
        return {
          ...item,
          number: index + 1,
          type: item.type,
        };
      });
      this.contentlistInner = this.handleCheckCode(this.contentlistInner);
      this.$emit("handleEnterEditor", this.ruleForm);
    },

    // 复制
    handleCopy() {
      this.$emit("handleCopy", this.ruleForm, this.actionBarP);
    },
    // 删除
    handlDelete() {
      this.$emit("handleDelete", this.ruleForm);
    },
    // 上移
    handleTop() {
      if (this.actionBar) {
        this.$confirm("上下移动将清空跳题设置，确认是否移动？", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        }).then(() => {
          // this.contentlistP = this.contentlistP.map((item) => {
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
          this.ruleForm.editor = this.editor;
          this.$emit("handleTop", this.ruleForm);
        });
      } else {
        this.ruleForm.editor = this.editor;
        this.$emit("handleTop", this.ruleForm);
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
          // this.contentlistP = this.contentlistP.map((item) => {
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
          this.ruleForm.editor = this.editor;
          this.$emit("handleBottom", this.ruleForm);
        });
      } else {
        this.ruleForm.editor = this.editor;
        this.$emit("handleBottom", this.ruleForm);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.draggle {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .empty {
    width: 164px;
    flex-shrink: 0;
    flex-grow: 1;
  }
  .row-draggle {
    width: 1123.5px;
    flex-shrink: 0;
    flex-grow: 1;
  }
}

.form-box {
  border: 0.05rem solid #ddd;
  border-radius: 10px;
  padding: 25px 25px 20px 25px;
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

        &:focus {
          border: 0;
        }
      }
    }
  }
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
    margin-bottom: 33px;
  }
  .operation-btn {
    // position: absolute;
    // right: 2.5rem;
    height: 2rem;
    float: right;
    text-align: right;
  }
}
::v-deep .el-radio__input .el-radio__inner {
  width: 22px;
  height: 22px;
  border: 1px solid #1660f1;
  margin: 0 20px;
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
