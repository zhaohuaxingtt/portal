<template>
  <iDialog
    title="问卷数据"
    :visible.sync="open"
    width="108.75rem"
    :close-on-click-modal="false"
    @close="close"
    ref="indexDialog"
  >
    <div class="conatiner">
      <div class="button-list">
        <iButton @click="exportAllDetails" class="margin-right20"
          >导出全部详情</iButton
        >
        <iButton @click="exportReport" class="margin0">导出报告</iButton>
      </div>
      <div class="header-title">
        <div class="replay-num">
          <div class="head">
            {{ surData.answeredNumber ? surData.answeredNumber : 0 }}
          </div>
          <div class="foot">回复问卷数</div>
        </div>
        <div class="replay-num">
          <div v-if="surData.putoutNumber == null" class="head head-total">
            0
          </div>
          <div v-else class="head head-total">{{ surData.putoutNumber }}</div>
          <div class="foot">总发放问卷数</div>
        </div>
        <div class="divider-line"></div>
        <div class="replay-num">
          <div class="head" v-if="surData.putoutNumber == null">0</div>
          <div class="head" v-else>
            {{
              ((surData.answeredNumber / surData.putoutNumber) * 100).toFixed(
                2
              )
            }}%
          </div>
          <div class="foot">完成率</div>
        </div>
      </div>
      <div class="scroll-question">
        <div
          v-for="(item, index) of showQuestions"
          :key="index"
          :class="getHeight(index)"
          ref="content"
        >
          <div
            class="section-single-choice"
            v-if="
              Number(item.questionType) === 1 ||
              Number(item.questionType) === 2 ||
              Number(item.questionType) === 4 ||
              Number(item.questionType) === 6
            "
          >
            <div class="header-content">
              <div class="left-content">
                <div class="single-choice-title">
                  {{ quetionType[Number(item.questionType) - 1] }}
                </div>
                <div class="single-choice-content">
                  {{ item.code }}.
                  {{ item.name }}
                </div>
                <div class="single-choice-charts">
                  <div
                    class="box"
                    @click="handleBrokenLineChart(item, item.outIndex)"
                  >
                    <img
                      :src="blueList3"
                      v-if="
                        'img1' + item.outIndex === activeImgs[item.outIndex]
                      "
                    />
                    <img :src="grayList3" v-else />
                  </div>
                  <div
                    class="box"
                    @click="handlePieChart(item, item.outIndex)"
                    v-if="Number(item.questionType) !== 2"
                  >
                    <img
                      :src="blueList2"
                      v-if="
                        'img2' + item.outIndex === activeImgs[item.outIndex]
                      "
                    />
                    <img :src="grayList2" v-else />
                  </div>
                  <div
                    class="box"
                    @click="handleColumnarChart(item, item.outIndex)"
                  >
                    <img
                      :src="blueList1"
                      v-if="
                        'img3' + item.outIndex === activeImgs[item.outIndex]
                      "
                    />
                    <img :src="grayList1" v-else />
                  </div>
                </div>
              </div>
              <iButton class="look-details" @click="handleSingleDetails(item)"
                >查看详细</iButton
              >
            </div>
            <div class="body-content">
              <div class="table-show">
                <el-table
                  :data="getDataNewType(item.answerReports)"
                  style="width: 100%"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column prop="name" label="选项"> </el-table-column>
                  <el-table-column prop="count" label="人数"> </el-table-column>
                  <el-table-column prop="percent" label="占比">
                  </el-table-column>
                </el-table>
              </div>
              <div class="charts-show">
                <div
                  v-if="'img1' + item.outIndex === activeImgs[item.outIndex]"
                  class="charts-box"
                >
                  <iEchartsML
                    class="echarts"
                    :width="559"
                    :height="441"
                    :option="
                      getOption(
                        item.answerReports &&
                          item.answerReports.slice(
                            0,
                            item.answerReports.length - 1
                          ),
                        activeImgs[item.outIndex]
                      )
                    "
                    v-if="'img1' + item.outIndex === activeImgs[item.outIndex]"
                    :index="item.outIndex"
                  ></iEchartsML>
                </div>
                <div
                  v-if="'img2' + item.outIndex === activeImgs[item.outIndex]"
                  class="charts-box"
                >
                  <iEchartsML
                    id="echartDom"
                    class="echarts"
                    :width="559"
                    :height="441"
                    :option="
                      getOption(
                        item.answerReports &&
                          item.answerReports.slice(
                            0,
                            item.answerReports.length - 1
                          ),
                        activeImgs[item.outIndex]
                      )
                    "
                    v-if="'img2' + item.outIndex === activeImgs[item.outIndex]"
                    :index="item.outIndex"
                  ></iEchartsML>
                </div>
                <div
                  v-if="'img3' + item.outIndex === activeImgs[item.outIndex]"
                  class="charts-box"
                >
                  <iEchartsML
                    class="echarts"
                    :width="559"
                    :height="441"
                    :option="
                      getOption(
                        item.answerReports &&
                          item.answerReports.slice(
                            0,
                            item.answerReports.length - 1
                          ),
                        activeImgs[item.outIndex]
                      )
                    "
                    v-if="'img3' + item.outIndex === activeImgs[item.outIndex]"
                    :index="item.outIndex"
                  ></iEchartsML>
                </div>
              </div>
            </div>
          </div>
          <div
            class="section-single-choice section-input-question"
            v-if="Number(item.questionType) === 3"
          >
            <div class="header-content">
              <div class="left-content">
                <div class="single-choice-title">
                  {{ quetionType[Number(item.questionType) - 1] }}
                </div>
                <div class="single-choice-content">
                  {{ item.code }}.
                  {{ item.name }}
                </div>
              </div>
              <iButton class="look-details" @click="handleBlankDetails(item)"
                >查看详细</iButton
              >
            </div>
            <div class="body-content">
              <span class="left-state">已提交</span>
              <span class="right-content">{{
                item.count == null ? 0 : item.count
              }}</span>
            </div>
          </div>
          <div
            class="section-single-choice section-input-question"
            v-if="Number(item.questionType) === 5"
          >
            <div class="header-content">
              <div class="left-content">
                <div class="single-choice-title">
                  {{ quetionType[Number(item.questionType) - 1] }}
                </div>
                <div class="single-choice-content">
                  {{ item.code }}.
                  {{ item.name }}
                </div>
              </div>
              <iButton class="look-details" @click="handleFileDetails(item)"
                >查看详细</iButton
              >
            </div>
            <div class="body-content">
              <span class="left-state">已提交</span>
              <span class="right-content">{{
                item.count == null ? 0 : item.count
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </iDialog>
</template>
<script>
import { iDialog, iButton, iMessage } from "rise";
import blueList1 from "@/assets/images/survey/blue-list1.svg";
import blueList2 from "@/assets/images/survey/blue-list2.svg";
import blueList3 from "@/assets/images/survey/blue-list3.svg";
import grayList1 from "@/assets/images/survey/gray-list1.svg";
import grayList2 from "@/assets/images/survey/gray-list2.svg";
import grayList3 from "@/assets/images/survey/gray-list3.svg";
import iEchartsML from "@/components/iEchartsML/index.vue";
import { exportFile } from "@/utils/exportFileUtil";
import borderTitleVue from "../../manage/survey/create/components/topicComponents/borderTitle.vue";
import store from '@/store'

export default {
  components: {
    iDialog,
    iButton,
    iEchartsML,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    surData: {
      type: Object,
      default() {
        return {};
      },
    },
    surveyId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      quetionType: [
        "单选题",
        "多选题",
        "填空题",
        "图片选择题",
        "文件上传题",
        "下拉题",
      ],
      option: {},
      blueList1,
      blueList2,
      blueList3,
      grayList1,
      grayList2,
      grayList3,
      activeImgs: [],
      showQuestions: [],
    };
  },
  watch: {
    surData: {
      handler(data) {
        console.log("data", data);
        let i = 0;
        data.questions.forEach((item) => {
          if (
            Number(item.questionType) === 1 ||
            Number(item.questionType) === 2 ||
            Number(item.questionType) === 4 ||
            Number(item.questionType) === 6 ||
            Number(item.questionType) === 3 ||
            Number(item.questionType) === 5
          ) {
            this.showQuestions.push(item);
          } else if (Number(item.questionType) === 9) {
            item.sonQuestionReports.forEach((it, ind) => {
              this.showQuestions.push(it);
            });
          }
        });
        this.showQuestions.forEach((item, index) => {
          if (
            Number(item.questionType) === 1 ||
            Number(item.questionType) === 2 ||
            Number(item.questionType) === 4 ||
            Number(item.questionType) === 6
          ) {
            this.activeImgs.push("img1" + i);
            this.showQuestions[index].outIndex = i;
            i++;
          }
        });
        console.log("showQuestions", this.showQuestions);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // getSummaries(param) {
    //   const { columns, data } = param;
    //   const sums = [];
    //   let count = 0;
    //   columns.forEach((column, index) => {
    //     if (index === 0) {
    //       sums[index] = "全部";
    //       return;
    //     }
    //     if (index === 1) {
    //       // const values = data.map((item) => Number(item[column.property]));
    //       // console.log("values",values)
    //       // if (!values.every((value) => isNaN(value))) {
    //       //   sums[index] = values.reduce((prev, curr) => {
    //       //     console.log("prev", prev);
    //       //     console.log("curr", curr);
    //       //     const value = Number(curr);
    //       //     if (!isNaN(value)) {
    //       //       return prev + curr;
    //       //     } else {
    //       //       return prev;
    //       //     }
    //       //   }, 0);
    //       // }
    //       const values = this.surData.questions.map((item) =>
    //         Number(item.count)
    //       );
    //       sums[index] = values.map((i) => {
    //         console.log("values[count]", values[count]);
    //         count++;
    //         return values[count];
    //       });
    //     }
    //     if (index === 2) {
    //       // const values = data.map((item) => item[column.property]);
    //       // sums[index] = values.reduce(
    //       //   (total, item) => total + parseFloat(item),
    //       //   0
    //       // );
    //       // if (sums[index] === 99.99) {
    //       sums[index] = "100%";
    //       // } else {
    //       //   sums[index] = sums[index].toFixed(2) * 1 + "%";
    //       // }
    //     }
    //   });
    //   return sums;
    // },
    getDataNewType(arr) {
      if (arr) {
        return arr.map((item) => {
          return {
            ...item,
            // percent: (item.percent * 100).toFixed(2) + "%",
            percent: item.percent * 100 + "%",
          };
        });
      }
      return [];
    },
    getHeight(index) {
      let hei;
      this.$nextTick(() => {
        hei = window.getComputedStyle(this.$refs["content"][index]).height;
        if (hei === "0px") {
          this.$refs["content"][index].classList.add("content-container");
        } else {
          this.$refs["content"][index].classList.add("content-box");
        }
      });
    },
    getOption(tableData, activeImg) {
      let option = {};
      if (!tableData) {
        tableData = [];
      }
      const active = activeImg.split("").slice(0, 4).join("");
      switch (active) {
        case "img1":
          option = {
            tooltip: {
              trigger: "item",
              // formatter: "{c}人 <br/>{d}%",
              formatter: function (params) {
                for (let i = 0; i < option.series[0].data.length; i++) {
                  return (
                    tableData[params.dataIndex].count +
                    "人" +
                    "<br/>" +
                    (tableData[params.dataIndex].percent * 100).toFixed(2) +
                    "%"
                  );
                }
              },
            },
            xAxis: {
              type: "category",
              data: tableData.slice(0, tableData.length).map((item) => {
                return item.name;
              }),
              show: true,
              axisLabel: {
                interval: 0,
                formatter: function (params) {
                  var newParamsName = ""; // 最终拼接成的字符串
                  var paramsNameNumber = params.length; // 实际标签的个数
                  var provideNumber = 5; // 每行能显示的字的个数
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                  if (paramsNameNumber > provideNumber) {
                    /** 循环每一行,p表示行 */
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = ""; // 表示每一次截取的字符串
                      var start = p * provideNumber; // 开始截取的位置
                      var end = start + provideNumber; // 结束截取的位置
                      // 此处特殊处理最后一行的索引值
                      if (p == rowNumber - 1) {
                        // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + "\n";
                      }
                      newParamsName += tempStr; // 最终拼成的字符串
                    }
                  } else {
                    // 将旧标签的值赋给新标签
                    newParamsName = params;
                  }
                  // 将最终的字符串返回
                  return newParamsName;
                },
              },
            },
            yAxis: {
              type: "value",
              show: true,
              // axisLabel: {
              //   show: true,
              //   interval: "auto",
              //   formatter: "{value}%",
              // },
            },
            series: [
              {
                data: tableData.slice(0, tableData.length).map((item) => {
                  return item.count;
                }),
                type: "line",
              },
            ],
          };
          break;
        case "img2":
          option = {
            tooltip: {
              trigger: "item",
              // formatter: "{b} : {c}%",
              formatter: function (params) {
                for (let i = 0; i < option.series[0].data.length; i++) {
                  return (
                    tableData[params.dataIndex].count +
                    "人" +
                    "<br/>" +
                    (tableData[params.dataIndex].percent * 100).toFixed(2) +
                    "%"
                  );
                }
              },
            },
            legend: {
              icon: "circle",
              left: "left",
              orient: "vertical",
              interval: 0,
              // bottom: 0,
              top: 0,
              // left:0,
              align: "left",
              data: [...tableData].slice(0, tableData.length).map((item) => {
                return item.name;
              }),
              formatter: function (params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 6; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                // 将最终的字符串返回
                return newParamsName;
              },
            },
            xAxis: [
              {
                type: "category",
                show: false,
              },
            ],
            yAxis: [
              {
                type: "value",
                show: false,
              },
            ],
            series: [
              {
                type: "pie",
                radius: "60%",
                data: [...tableData].slice(0, tableData.length).map((item) => {
                  return {
                    value: (item.percent * 100).toFixed(2),
                    name: item.name,
                  };
                }),
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      // formatter: "{b}人<br/>{c}%"
                      formatter: function (params) {
                        for (let i = 0; i < option.series[0].data.length; i++) {
                          return (
                            tableData[params.dataIndex].count +
                            "人" +
                            "\r\n" +
                            (tableData[params.dataIndex].percent * 100).toFixed(
                              2
                            ) +
                            "%"
                          );
                        }
                      },
                    },
                    labelLine: { show: true },
                  },
                },
              },
            ],
          };
          break;
        case "img3":
          option = {
            tooltip: {
              trigger: "item",
              // formatter: "{b}人 <br/>{c}%",
              formatter: function (params) {
                for (let i = 0; i < option.series[0].data.length; i++) {
                  return (
                    tableData[params.dataIndex].count +
                    "人" +
                    "<br/>" +
                    (tableData[params.dataIndex].percent * 100).toFixed(2) +
                    "%"
                  );
                }
              },
            },
            xAxis: {
              type: "category",
              data: tableData.slice(0, tableData.length).map((item) => {
                return item.name;
              }),
              show: true,
              // splitLine: {
              //   show: false,
              // },
              axisLabel: {
                interval: 0,
                formatter: function (params) {
                  var newParamsName = ""; // 最终拼接成的字符串
                  var paramsNameNumber = params.length; // 实际标签的个数
                  var provideNumber = 5; // 每行能显示的字的个数
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                  if (paramsNameNumber > provideNumber) {
                    /** 循环每一行,p表示行 */
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = ""; // 表示每一次截取的字符串
                      var start = p * provideNumber; // 开始截取的位置
                      var end = start + provideNumber; // 结束截取的位置
                      // 此处特殊处理最后一行的索引值
                      if (p == rowNumber - 1) {
                        // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + "\n";
                      }
                      newParamsName += tempStr; // 最终拼成的字符串
                    }
                  } else {
                    // 将旧标签的值赋给新标签
                    newParamsName = params;
                  }
                  // 将最终的字符串返回
                  return newParamsName;
                },
              },
            },
            yAxis: {
              type: "value",
              show: true,
              // axisLabel: {
              //   show: true,
              //   interval: "auto",
              //   formatter: "{value}%",
              // },
              // splitLine: {
              //   show: false,
              // },
            },
            series: [
              {
                type: "bar",
                data: tableData.slice(0, tableData.length).map((item) => {
                  return item.count;
                }),
              },
            ],
          };
          break;
        default:
          this.option = {};
          break;
      }
      return option;
    },
    handleFileDetails(item) {
      this.$emit("openFileDetails", item);
    },
    handleBlankDetails(item) {
      this.$emit("openBlankDetails", item);
    },
    handleSingleDetails(item) {
      this.$emit("openSingleDetails", item);
    },
    handleBrokenLineChart(item, index) {
      this.activeImgs.splice(index, 1, "img1" + index);
    },
    handlePieChart(item, index) {
      this.activeImgs.splice(index, 1, "img2" + index);
    },
    handleColumnarChart(item, index) {
      this.activeImgs.splice(index, 1, "img3" + index);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    close() {
      this.$emit("closeDialog");
    },
    exportReport() {
      console.log("导出报告");
      exportFile({
        url: process.env.VUE_APP_SURVEY+`/surveyService/exportSurveyReport?userId=`+store.state.permission.userInfo.id,
        // url: "/surveyApi/surveyService/exportSurveyReport",
        data: {
          // questionId: "",
          id: this.surveyId,
        },
        // callback: (e) => {
        //   if (!e) {
        //     iMessage.error("导出失败");
        //   }
        // },
      });
    },
    exportAllDetails() {
      exportFile({
        url: process.env.VUE_APP_SURVEY+`/surveyService/exportDetailReport?userId=`+store.state.permission.userInfo.id,
        // url: "/surveyApi/surveyService/exportDetailReport",
        data: {
          // questionId: "",
          id: this.surveyId,
        },
        // callback: (e) => {
        //   if (!e) {
        //     iMessage.error("导出失败");
        //   }
        // },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll-question {
  max-height: 987px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 27px;
}
.charts-box {
  padding: 14px 13px 13px;
}
.echarts {
  width: 100%;
  height: 100%;
}
.el-table .warning-row {
  background: #fff;
}
.el-table .el-table__header {
  background: #1660f1;
}
.el-table .success-row {
  background: #1660f1;
  opacity: 0.03;
}
::v-deep .el-table__row {
  height: 50px;
  td {
    text-align: center;
    width: 305px !important;
  }
}
::v-deep .is-leaf {
  height: 50px;
  width: 305px;
  text-align: center;
}
.conatiner {
  /* height: 1205px; */
  font-family: PingFangSC-Semibold, PingFang SC;
  padding-bottom: 40px;
  .body-content {
    margin-top: 20px;
    display: flex;
    .table-show {
      width: 1050px;
      height: 441px;
      overflow: auto;
      margin-right: 80px;
    }
    .charts-show {
      width: 585px;
      height: 468px;
    }
  }
  .content-box + .content-box {
    margin-top: 31px;
  }
  .content-container {
    display: none;
  }
  .section-single-choice {
    height: 593px;
    border-radius: 10px;
    border: 1px solid #e4e7ed;
    padding: 34px 40px 36px;
    /* margin-top: 31px; */
    /* margin-bottom: 31px; */
    .header-content {
      height: 35px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-content {
        display: flex;
        align-items: center;
        .single-choice-title {
          width: 105px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          margin-right: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #2f2f2f;
          background: #ffffff;
          box-shadow: 0px 0px 8px 0px rgba(124, 124, 124, 0.16);
          border-radius: 5px;
        }
        .single-choice-content {
          // width: 800px;
          margin-right: 30px;
          font-size: 16px;
          font-weight: 400;
          color: #000;
        }
        .single-choice-charts {
          display: flex;
          width: 100px;
          align-items: center;
          .box {
            width: 20px;
            height: 20px;
            margin-right: 20px;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
              object-fit: scale-down;
            }
          }
        }
      }
    }
  }
  .section-single-choice:last-of-type {
    margin-bottom: 0;
  }
  .section-input-question {
    padding-bottom: 40px;
    margin-top: 31px;
    height: 166px;
    .body-content {
      height: 35px;
      display: flex;
      align-items: center;
      font-weight: 400;
      line-height: 35px;
      color: #000000;
      .left-state {
        width: 64px;
        height: 35px;
        text-align: left;
        font-size: 16px;
        margin-right: 60px;
      }
      .right-content {
        text-align: center;
        height: 35px;
        width: 600px;
        background-color: #f8f8fa;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
  .button-list {
    position: absolute;
    width: 100%;
    height: 35px;
    right: 40px;
    text-align: right;
    transform: translate(-30px, -60px);
    .margin-right20 {
      width: 130px;
      margin-right: 20px;
    }
    .margin0 {
      width: 100px;
      margin: 0;
    }
  }
  .header-title {
    width: 100%;
    height: 159px;
    background-color: #f9f9f9;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-bottom: 27px; */
    .replay-num {
      width: 150px;
      height: 78px;
      margin-right: 10px;
      .head {
        width: 100%;
        height: 50px;
        font-size: 36px;
        text-align: center;
        font-weight: 600;
        color: #1660f1;
        line-height: 50px;
        margin-bottom: 8px;
      }
      .foot {
        text-align: center;
        width: 100%;
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        line-height: 20px;
      }
      .head-total {
        color: #000;
      }
    }
    .divider-line {
      width: 0;
      height: 78px;
      border-right: 1px solid #d8d8d8;
      margin-right: 10px;
    }
  }
}
</style>
