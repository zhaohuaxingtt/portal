<template>
  <div class="form">
    <el-row :gutter="30">
      <el-col :span="4" class="form-topic fixed">
        <div>
          <div class="form-topic-title">
            <img :src="surveyTopic" />
            <h2 style="margin-left: 1rem">{{language('题型')}}</h2>
          </div>
          <div class="list-group">
            <div
              class="list-group-item"
              v-for="element in list"
              :key="element.id"
              draggable="true"
              @dragstart="handleOnDragStart($event, element)"
              @click="handleChoose(element)"
            >
              <img
                :src="element.icon"
                style="width: 10px; margin-right: 1rem"
              />
              <span class="item-text">{{ element.name }}</span>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="20">
        <div class="form-title">
          <!-- <h3>题目内容</h3> -->
          <draggable
            class="dragArea list-group"
            v-bind="dragOptions"
            @change="handleContentDrag"
            @update="dragEnd"
            @start="handleStart"
            handle=".handle"
            :list="contentlist"
          >
            <transition-group>
              <div
                class="list-group-item"
                v-for="(i, index) of contentlist"
                :key="index"
              >
                <component
                  :is="`${typeObjArr[i.type - 1]}Title`"
                  :info="i"
                  :type="i.type"
                  :number="i.number"
                  :sort="index + 1"
                  :overEditor="overEditor"
                  :topicLength="contentlist.length"
                  :racialTopicLength="racialTopicLength"
                  :contentCopy="contentCopy"
                  :copyTopic="copyTopic"
                  :actionBar="actionBar"
                  :contentlist="contentlist"
                  :contentlistP="contentlist"
                  @handleSaveData="handleSaveData"
                  @handleDelete="handleDelete"
                  @handleCopy="handleCopy"
                  @handleTop="handleTop"
                  @handleBottom="handleBottom"
                  @changeCopyTopic="changeCopyTopic"
                  @handleEnterEditor="handleEnterEditor"
                  @cancelComplete="cancelComplete"
                  ref="childF"
                />
              </div>
            </transition-group>
          </draggable>

          <borderTitle
            @drop="handleBorderDrop"
            :bodyHeight="contentlist"
          ></borderTitle>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import radioTitle from "./topicComponents/radioTitle.vue";
import borderTitle from "./topicComponents/borderTitle.vue";
import selectTitle from "./topicComponents/selectTitle.vue";
import pullTitle from "./topicComponents/pullTitle.vue";
import blankTitle from "./topicComponents/blankTitle.vue";
import imgTitle from "./topicComponents/imgTitle.vue";
import fileTitle from "./topicComponents/fileTitle.vue";
import paragraphTitle from "./topicComponents/paragraphTitle.vue";
import remarkTitle from "./topicComponents/remarkTitle.vue";
import dividerTitle from "./topicComponents/divider.vue";
// 图片
import surveyRadio from "@/assets/images/survey/survey-radio.svg";
import surveySelect from "@/assets/images/survey/survey-select.svg";
import surveyPull from "@/assets/images/survey/survey-pull.svg";
import surveyBlank from "@/assets/images/survey/survey-blank.svg";
import surveyImg from "@/assets/images/survey/survey-img.svg";
import surveyUpload from "@/assets/images/survey/survey-upload.svg";
import surveyTopic from "@/assets/images/survey/survey-topic.svg";
import surveyParagraph from "@/assets/images/survey/survey-paragraph.svg";
import surveyRemark from "@/assets/images/survey/survey-remark.svg";
import surveyDivider from "@/assets/images/survey/survey-divider.svg";
import { iMessage } from "rise";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
    radioTitle,
    borderTitle,
    selectTitle,
    pullTitle,
    blankTitle,
    imgTitle,
    fileTitle,
    paragraphTitle,
    remarkTitle,
    dividerTitle,
  },
  props: {
    questions: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
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
        "paragraph",
      ],
      list: [
        {
          name: "单选题",
          // type: "radio",
          type: 1,
          id: 1,
          content: "内容内容内容",
          icon: surveyRadio,
        },
        {
          name: "多选题",
          id: 2,
          // type: "select",
          type: 2,
          content: "内容内容内容",
          icon: surveySelect,
        },
        {
          name: "下拉题",
          id: 3,
          // type: "pull",
          type: 6,
          content: "内容内容内容",
          icon: surveyPull,
        },
        {
          name: "填空题",
          id: 4,
          // type: "blank",
          type: 3,
          content: "内容内容内容",
          icon: surveyBlank,
        },
        {
          name: "图片选择",
          id: 5,
          // type: "img",
          type: 4,
          content: "内容内容内容",
          icon: surveyImg,
        },
        {
          name: "文件上传",
          id: 6,
          type: 5,
          // type: "file",
          content: "内容内容内容",
          icon: surveyUpload,
        },
        {
          name: "段落",
          id: 7,
          // type: "paragraph",
          type: 9,
          content: "内容内容内容",
          icon: surveyParagraph,
        },
        {
          name: "备注说明",
          id: 8,
          // type: "remark",
          type: 7,
          content: "内容内容内容",
          icon: surveyRemark,
        },
        {
          name: "分割线",
          id: 9,
          // type: "divider",
          type: 8,
          content: "内容内容内容",
          icon: surveyDivider,
        },
      ],
      contentlist: [],
      contentCopy: {},
      surveyTopic,
      fixed: false,
      copyTopic: false,
      contentlistDrag: [],
      operate: false,
      overEditor: false,
      actionBar: false,
      racialTopicLength: 0,
      isCopy: false,
      // racialTopicLengthM: "",
    };
  },
  mounted() {
    this.overEditor = true;
    this.contentlist = [...this.questions];
    this.contentlist = this.contentlist.map((item, index) => {
      return {
        ...item,
        number: index + 1,
        type: item.type,
      };
    });
    this.contentlist = this.handleCheckCode(this.contentlist);
  },
  watch: {
    contentlist: {
      handler(list) {
        let bol = false;
        this.overEditor = list.every((item) => {
          if (item.options) {
            item.options.forEach((item) => {
              if (item.action) {
                bol = true;
              }
            });
          }
          if (item.actionItem && item.actionItem.value) {
            bol = true;
          }
          // if (item.actionItem) {
          //   bol = true;
          // }
          return !item.editor;
        });
        this.actionBar = bol;
        this.isCopy = false;
      },
      immediate: true,
    },
    // questions: {
    //   handler(quest) {
    //     if (this.operate) {
    //       return;
    //     }
    //     console.log("contentlist2", this.contentlist);

    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  methods: {
    //设置code的函数
    handleCheckCode(arr) {
      let curCode = 0;
      arr = arr.map((item) => {
        if (
          Number(item.type) !== 7 &&
          Number(item.type) !== 8 &&
          Number(item.type) !== 9
        ) {
          curCode++;
          return {
            ...item,
            code: curCode,
          };
        }
        if (Number(item.type) === 9) {
          curCode++;
          let innerCurCode = 0;
          item.sonQuestions = item.sonQuestions
            ? item.sonQuestions.map((it) => {
                if (Number(it.type) !== 7 && Number(it.type) !== 8) {
                  innerCurCode++;
                  return {
                    ...it,
                    code: innerCurCode,
                  };
                }
                return it;
              })
            : [];
          return {
            ...item,
            code: curCode,
          };
        }
        return item;
      });
      this.racialTopicLength = curCode;
      return arr;
    },
    handleStart(data) {
      const obj = this.contentlist[data.oldIndex];
      if (this.actionBar && Number(obj.type) !== 8 && Number(obj.type) !== 7) {
        this.$confirm("拖拽将清空跳题设置，确认是否拖拽？", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        }).then(() => {
          this.actionBar = false;
        });
      }
    },
    handleEnterEditor(data) {
      let index = data.number - 1;
      this.contentlist.splice(index, 1, { ...data });
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
        this.contentlist,
        data.oldIndex,
        data.newIndex
      );
      this.contentlist = arr.map((item, index) => {
        return {
          ...item,
          number: index + 1,
        };
      });
      if (
        Number(data.moved.element.type) !== 8 &&
        Number(data.moved.element.type) !== 7
      ) {
        this.contentlist = this.clearJump(this.contentlist);
      }
      this.contentlist = this.handleCheckCode(this.contentlist);
      this.$emit("handleSortDrag", [...this.contentlist]);
    },
    cancelComplete(data) {
      let index = data.number - 1;
      this.contentlist.splice(index, 1);
      this.contentlist = this.contentlist.map((item, index) => {
        return {
          ...item,
          number: index + 1,
        };
      });
    },
    // 保存数据
    handleSaveData(data) {
      let index = this.contentlist.findIndex((item) => {
        return item.number === data.number;
      });
      if (index >= 0) {
        this.contentlist.splice(index, 1, data);
      }
      this.operate = true;
      this.contentlist = this.handleCheckCode(this.contentlist);
      this.$emit("handleSaveData", [...this.contentlist]);
    },
    handleSort() {
      this.contentlist = this.contentlist.map((item, index) => {
        // item.number = this.contentlist.indexOf(item) + 1;
        return {
          ...item,
          number: index + 1,
        };
      });
      this.contentlist = this.handleCheckCode(this.contentlist);
    },
    // 删除
    handleDelete(data) {
      this.contentlist = this.contentlist
        .filter((item) => {
          return item.number !== data.number;
        })
        .map((item, index) => {
          return {
            ...item,
            number: index + 1,
          };
        });
      // if (Number(data.type) !== 8 && Number(data.type) !== 7) {
      //   this.contentlist = this.clearJump(this.contentlist);
      // }
      this.contentlist = this.handleCheckCode(this.contentlist);
      this.$emit("handleDeleteData", data, [...this.contentlist]);
    },
    clearJump(list) {
      return list.map((item) => {
        if (Number(item.type) !== 9) {
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
        }
        if (Number(item.type) === 9) {
          item.sonQuestions = item.sonQuestions.map((el) => {
            if (el.options) {
              el.options = el.options.map((e) => {
                return {
                  ...e,
                  action: "",
                };
              });
              return {
                ...el,
                actionItem: "",
              };
            }
            return {
              ...el,
              actionItem: "",
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
    },
    // 复制
    handleCopy(data, bol) {
      this.contentCopy = { ...data };
      if (this.actionBar || bol) {
        if (Number(data.type) === 8 || Number(data.type) === 7) {
          this.contentCopy.id = "";
          // this.contentCopy.actionItem = "";
          let index = data.number - 1;
          this.contentlist.splice(index, 0, this.contentCopy);
          this.contentlist = this.contentlist.map((item, index) => {
            return {
              ...item,
              number: index + 1,
              // actionItem: "",
            };
          });
          if (Number(data.type) !== 8 && Number(data.type) !== 7) {
            this.contentlist = this.clearJump(this.contentlist);
          }
          this.isCopy = true;
          this.actionBar = false;
          this.contentlist = this.handleCheckCode(this.contentlist);
          this.$emit("handleCopy", [...this.contentlist]);
        } else {
          this.$confirm("复制将清空跳转,是否复制", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning",
          }).then(() => {
            this.contentCopy.id = "";
            // this.contentCopy.actionItem = "";
            let index = data.number - 1;
            this.contentlist.splice(index, 0, this.contentCopy);
            this.contentlist = this.contentlist.map((item, index) => {
              return {
                ...item,
                number: index + 1,
                // actionItem: "",
              };
            });
            if (Number(data.type) !== 8 && Number(data.type) !== 7) {
              this.contentlist = this.clearJump(this.contentlist);
            }
            this.isCopy = true;
            this.actionBar = false;
            this.contentlist = this.handleCheckCode(this.contentlist);
            this.$emit("handleCopy", [...this.contentlist]);
          });
        }
      } else {
        this.contentCopy.id = "";
        let index = data.number - 1;
        this.contentlist.splice(index, 0, this.contentCopy);
        this.contentlist = this.contentlist.map((item, index) => {
          return {
            ...item,
            number: index + 1,
          };
        });
        this.contentlist = this.handleCheckCode(this.contentlist);
        this.$emit("handleCopy", [...this.contentlist]);
      }
    },
    changeCopyTopic() {
      this.copyTopic = false;
    },
    // 添加topic
    handleAddType(type) {
      //bol 为false 代表 编辑完成  ture 为编辑未完成
      let bol = false;
      if (this.$refs.childF) {
        this.$refs.childF.forEach((item) => {
          if (!bol) {
            if (item.ruleForm.type === 9) {
              bol = item.handleCompleteAdd("", "para");
              bol = item.complete();
            } else {
              bol = item.complete();
            }
          } else {
            if (item.ruleForm.type === 9) {
              item.handleCompleteAdd();
              item.complete();
            } else {
              item.complete();
            }
          }
        });
        if (bol) {
          iMessage.warn(this.$t("请完成编辑后再添加!"));
          return;
        } else {
          this.contentlist.push({
            // id: this.contentlist.length + 1,
            type: type,
            number: this.contentlist.length + 1,
            editor: true,
          });
        }
      } else {
        this.contentlist.push({
          // id: this.contentlist.length + 1,
          type: type,
          number: this.contentlist.length + 1,
          editor: true,
        });
      }
      this.contentlist = this.handleCheckCode(this.contentlist);
    },

    // 上移
    handleTop(data) {
      this.actionBar = false;
      // data.id = data.number;
      let index = data.number - 1;
      this.contentlist[index] = { ...data };
      this.contentlist = this.swapArray(this.contentlist, index - 1, index);
      this.contentlist = this.handleCheckCode(this.contentlist);
      if (Number(data.type) !== 8 && Number(data.type) !== 7) {
        this.contentlist = this.clearJump(this.contentlist);
      }
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
      // this.$refs.childF.forEach((item) => {
      //   if (item.ruleForm.type === 9) {
      //     item.clearSetJump();
      //   }
      // });
      this.$emit("handleSortTop", data, [...this.contentlist]);
    },
    // 下移
    handleBottom(data) {
      this.actionBar = false;
      // data.id = data.number;
      let index = data.number - 1;
      this.contentlist[index] = { ...data };
      this.contentlist = this.swapArray(this.contentlist, index, index + 1);
      this.contentlist = this.handleCheckCode(this.contentlist);
      if (Number(data.type) !== 8 && Number(data.type) !== 7) {
        this.contentlist = this.clearJump(this.contentlist);
      }
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
      // this.$refs.childF.forEach((item) => {
      //   if (item.ruleForm.type === 9) {
      //     item.clearSetJump();
      //   }
      // });
      this.$emit("handleSortBottom", data, [...this.contentlist]);
    },
    // 数组元素互换位置
    swapArray(arr, index1, index2) {
      let item1 = { ...arr[index1] };
      let item2 = { ...arr[index2] };
      arr = arr.map((item, index) => {
        if (index === index1) {
          item = item2;
        }
        if (index === index2) {
          item = item1;
        }
        return {
          ...item,
          // id: index + 1,
          number: index + 1,
        };
      });
      return arr;
      // arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      // console.log("arr2", arr);
      // return arr;
    },

    handleOnDragStart(e, item) {
      e.dataTransfer.setData("type", item.type);
    },
    handleBorderDrop(e) {
      let type = e.dataTransfer.getData("type");
      if (type) {
        this.handleAddType(type);
      }
    },
    handleChoose(e) {
      if (e.type) {
        this.handleAddType(e.type);
      }
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 400,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  position: relative;
}
.form-topic {
  width: 12.75rem;
  height: 38.5rem;
  background: #f9f9f9;
  border-radius: 10px;
  margin-left: 1rem;
  text-align: center;
  // box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  display: flex;
  flex-direction: column;
  align-items: center;

  &-title {
    display: flex;
    /* margin-left: 4rem; */
    margin-top: 1.875rem;
    align-items: center;
    flex-direction: row;
    img {
      width: 1.3rem;
    }
  }
  .list-group {
    padding-bottom: 10rem;
  }
  .list-group-item {
    margin-top: 1.25rem;
    /* margin-left: 3.6rem; */
    border: 1px solid #1660f1;
    border-radius: 1.5625rem;
    width: 7.75rem;
    height: 2.1875rem;
    background-color: #fff;
    /* padding-top: 0.4rem; */
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 0.9rem;
    cursor: pointer;
    img {
      width: 1.5rem !important;
    }
    .item-text {
      // width: 4.25rem;
      // text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #424242;
      line-height: 22px;
    }
  }
}
.form-button {
  display: flex;
}

.fixed {
  position: sticky;
  top: -5px;
}
</style>
