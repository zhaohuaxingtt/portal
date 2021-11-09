<template>
  <div class="card">
    <p class="go-back"><iButton @click="goBack">返回</iButton></p>
    <div class="title-info">
      <div class="header-content">
        <div>
          <p class="info-line-1">
            <!-- <span class="meeting-type">{{ typeObj[result.meetingTypeId] }}</span> -->
            <span class="meeting-type">{{ result.name }}</span>
            <span class="meeting-name">{{
              typeObj[result.meetingTypeId]
            }}</span>
          </p>
        </div>
        <div class="img-box" v-if="isSource02()">
          <img
            src="@/assets/images/download.svg"
            class="img"
            @click="handleDownLoadMinutes"
          />
        </div>
      </div>
      <p class="info-line-2">
        <span class="date-time-start">
          <img :src="timeClock" alt="" srcset="" />
          <span>{{
            result.startDate +
              " " +
              result.startTime +
              (result.endTime ? "~" + result.endTime : "")
          }}</span>
        </span>
        <span class="date-time-end">
          <img :src="positionMark" alt="" srcset="" />
          <span>{{ result.meetingPlace }}</span>
        </span>
      </p>
      <!-- <el-switch
        v-model="value"
        :active-text="switchStatus"
        class="switch-block"
        active-color="#1666ef"
        inactive-color="#1666ef"
      >
      </el-switch> -->
      <div class="turn-button">
        <div class="img-box-list" @click="handleTurnMode" v-if="!value">
          <img src="@/assets/images/list.svg" class="img" />
        </div>
        <div class="img-box-card" @click="handleTurnMode" v-else>
          <img src="@/assets/images/card.svg" class="img" />
        </div>
      </div>
    </div>
    <div v-if="value">
      <theLiveTable
        :data="dataTable"
        :total="data.length"
        :pageSize="pageSize"
        :pageNum="pageNum"
        @handleCurrentChange="handleCurrentChange"
        @query="query"
      />
    </div>
    <div v-else>
      <div v-if="data && data.length > 0" class="card-list-container">
        <div class="click-area">
          <div class="right" @click="handlePreClick">&lt;</div>
          <div class="left" @click="handleNextClick">&gt;</div>
        </div>
        <div class="swiper" ref="swiperRef">
          <div class="slide" v-for="(item, index) of data" :key="index">
            <cardBox
              :themen="item"
              :total="data.length"
              :num="index + 1"
              :startDate="result.startDate"
              :endDate="result.endDate"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardBox from "./cardBox.vue";
import { iButton, iMessage } from "rise";
import theLiveTable from "./theLiveTable.vue";
import { getMeetingDetail } from "@/api/meeting/home";
import { findMyThemens } from "@/api/meeting/myMeeting";
import { getMettingType } from "@/api/meeting/type";
import timeClock from "@/assets/images/time-clock.svg";
import positionMark from "@/assets/images/position-mark.svg";
import { MOCK_FILE_URL } from "@/constants";
import { download } from "@/utils/downloadUtil";

export default {
  components: {
    cardBox,
    iButton,
    theLiveTable,
  },
  data() {
    return {
      value: true,
      // switchStatus: "卡片",
      timeClock,
      positionMark,
      data: [],
      dataTable: [],
      result: {},
      typeObj: {},
      pageSize: 10,
      pageNum: 1,
      curIndex: 1,
    };
  },
  mounted() {
    this.getTypeList();
    this.query();
  },
  methods: {
    isSource02() {
      const themen = this.result;
      if (
        themen.attachments.length > 0 &&
        themen.attachments.some((item) => {
          return item.source === "02";
        })
      ) {
        return true;
      }
      return false;
    },
    handleDownLoadMinutes() {
      const themen = this.result;
      if (!themen.attachments) {
        iMessage.error("没有要下载的附件!");
        return;
      }
      const file = themen.attachments.find((item) => {
        return item.source === "02";
      });
      file &&
        download({
          fileIds: file.attachmentId,
          filename: file.attachmentName,
          callback: (e) => {
            if (!e) {
              iMessage.error("下载失败");
            }
          },
        });
    },
    handleTurnMode() {
      console.log("1111111111");
      this.value = !this.value;
    },
    // 获取会议类型列表
    getTypeList() {
      let param = {
        pageSize: 1000,
        pageNum: 1,
      };
      let obj = {};
      getMettingType(param).then((res) => {
        res.data.forEach((item) => {
          obj[item.id] = item.name;
        });
        this.typeObj = obj;
      });
    },
    // 获取详细信息
    async query(obj) {
      let param = {
        meetingId: this.$route.query.id,
        presentItem: "02",
        pageNum: 1,
        pageSize: 999,
      };
      const res = await getMeetingDetail(this.$route.query);
      this.result = res;
      const res2 = await findMyThemens(param);
      this.data = res2.data;
      this.dataTable = res2.data.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
      obj.following = false;
      this.initMoveCard();
    },
    // 页码切换
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.currentChangePage(this.data, this.pageNum);
    },
    // 分页方法
    currentChangePage(data, pageNum) {
      let from = (pageNum - 1) * this.pageSize;
      let to = pageNum * this.pageSize;
      this.dataTable = data.slice(from, to);
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    // 点击上一个轮播图
    handlePreClick() {
      if (this.data.length > 3) {
        if (this.curIndex > 1) {
          this.curIndex--;
        }
        this.translateX(this.$refs.swiperRef, this.curIndex);
      }
    },
    // 点击下一个轮播图
    handleNextClick() {
      if (this.data.length > 3) {
        if (this.curIndex < this.data.length - 2) {
          this.curIndex++;
        }
        this.translateX(this.$refs.swiperRef, this.curIndex);
      }
    },
    //移动
    // translateX(refDom, curIndex) {
    //   // if (refDom && curIndex != 0) {
    //   //   refDom.style.transform = `translateX(${(1 - curIndex) * 35}rem)`;
    //   // }
    //   if (refDom && curIndex != 0 && curIndex != this.data.length - 1) {
    //     refDom.style.transform = `translateX(${(1 - curIndex) * 35}rem)`;
    //   } else if (refDom && curIndex == this.data.length - 1) {
    //     refDom.style.transform = `translateX(${(2 - curIndex) * 35}rem)`;
    //   }
    // },
    //移动
    translateX(refDom, curIndex) {
      if (
        refDom &&
        (curIndex == 0 ||
          curIndex == 1 ||
          (curIndex == 2 && this.data.length == 3))
      ) {
        // 初始化展示
        refDom.style.transform = `translateX(0)`;
      } else if (refDom && curIndex > 1 && curIndex != this.data.length - 1) {
        refDom.style.transform = `translateX(${(1 - curIndex) * 35}rem)`;
      }
    },
    // 初始化移动至高亮项
    initMoveCard() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].state == "02") {
          if (i >= this.data.length - 2) {
            this.curIndex = this.data.length - 2;
          } else if (i == 0) {
            this.curIndex = 1;
          } else {
            this.curIndex = i;
          }
          setTimeout(() => {
            this.translateX(this.$refs.swiperRef, i);
          }, 4);
          return;
        }
      }
    },
  },
  // watch: {
  //   value(val) {
  //     if (val) {
  //       this.switchStatus = "卡片";
  //       return;
  //     }
  //     this.switchStatus = "列表";
  //     this.curIndex = 1;
  //     this.initMoveCard();
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.go-back {
  margin-bottom: 20px;
  text-align: right;
}
/* ::v-deep .switch-block {
  position: absolute;
  right: 33px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 16px;
  .el-switch__core {
    width: 100px !important;
    height: 36px;
    border-radius: 36px;
  }
  .el-switch__label {
    position: absolute;
    transform: translateX(35px);
    z-index: 1;
    color: #fff;
    font-size: 16px;
  }
  .el-switch__core::after {
    width: 30px;
    height: 30px;
    z-index: 10;
    transform: translateY(1px);
  }
} */
::v-deep .is-checked {
  .el-switch__core::after {
    transform: translate(-13px, 1px);
  }
  .el-switch__label {
    position: absolute;
    transform: translateX(20px);
    z-index: 1;
    color: #fff;
    font-size: 16px;
  }
}
.card {
  padding: 40px 40px 1px;
  background-color: #fff;
  width: 100%;

  .no-live {
    margin-bottom: 40px;
    width: 1740px;
    height: 105px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
    line-height: 105px;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    text-align: center;
  }

  .box-title {
    position: relative;
    width: 100%;
    height: 127px;
    background-color: rgba(226, 240, 252, 0.3);
    border-radius: 4px;
    /* opacity: 0.09; */
    border: 1px solid #e4e7ed;
    margin-bottom: 35px;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    .up {
      color: #000;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 21px;
      .common {
        width: 150px;
        color: #1763f7;
        font-family: "PingFangSC-Regular";
        font-size: 14px;
        font-weight: 400;
        line-height: 35px;
        text-align: center;
        background-color: #fff;
      }
      .meeting {
        width: 337px;
        height: 35px;
        font-family: "PingFangSC-Semibold";
        font-size: 16px;
        font-weight: 400;
        line-height: 35px;
        margin-left: 20px;
        white-space: nowrap;
      }
    }
    .bottom {
      color: #000;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      .address {
        margin-left: 40px;
        font-size: 16px;
        line-height: 50px;
      }
      .time {
        margin-left: 10px;
      }
      .location {
        margin-left: 10px;
      }
    }
  }

  .card-list-container {
    position: relative;
    padding-bottom: 40px;
    overflow: hidden;
    width: 1660px;

    .swiper {
      display: flex;
      justify-content: start;
      transition: 0.5s;
      position: relative;
      .slide {
        width: 540px;
        height: 427px;
        flex-shrink: 0;
        flex-grow: 0 !important;
        z-index: 1;
        transition: 0.5s;
      }
      .slide + .slide {
        margin-left: 20px;
      }
    }
    .warn {
      height: 15px;
      color: #999999;
      font-family: "PingFangSC-Semibold";
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
      margin-left: auto;
      text-align: right;
      margin-top: 30px;
    }
    .click-area {
      top: 0;
      height: 427px;
      opacity: 0.5;
      position: absolute;
      width: 100%;
      z-index: 100;
      .left,
      .right {
        display: none;
      }
    }
    .click-area:hover {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left,
      .right {
        display: block;
        width: 50px;
        height: 50px;
        background-color: #000;
        color: #fff;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 102;
      }
    }
  }
}
::v-deep .el-carousel__indicators--outside {
  height: 60px;
  line-height: 60px;
}

/* meeting-show 展示页面样式 */
.header {
  font-size: 18px;
  font-weight: bold;
}
.turn-button {
  right: 33px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  position: absolute;
  /* right: 0;
  top: 0; */
  /* transform: translate(-20px, 20px); */
  cursor: pointer;
  .img-box {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.title-info {
  background: rgba(22, 96, 241, 0.09);
  border-radius: 4px;
  padding: 20px 0 22px;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  .header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    .img-box {
      width: 16px;
      height: 16px;
      margin-left: 16px;
      cursor: pointer;
      .img {
        width: 16px;
        height: 16px;
        object-fit: scale-down;
      }
    }
  }
  .info-line-1 {
    line-height: 35px;
    display: flex;
    justify-content: center;

    .meeting-type {
      display: inline-block;
      padding: 0 20px;
      min-width: 150px;
      line-height: 35px;
      height: 35px;
      background: white;
      color: #1763f7;
      box-shadow: 0 0 8px 0 rgba(124, 124, 124, 0.16);
      border-radius: 5px;
      text-align: center;
      margin-right: 20px;
    }
    .meeting-name {
      font-size: 16px;
      display: inline-block;
      line-height: 35px;
      height: 35px;
    }
  }
  .info-line-2 {
    display: flex;
    justify-content: center;

    .date-time-start {
      display: flex;
      line-height: 50px;
      margin-right: 40px;

      span {
        margin-left: 10px;
        font-size: 16px;
      }
    }
    .date-time-end {
      display: flex;
      line-height: 50px;
      span {
        margin-left: 10px;
        font-size: 16px;
        display: inline-block;
        max-width: 800px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
