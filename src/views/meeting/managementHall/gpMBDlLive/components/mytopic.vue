<template>
  <div class="container">
    <div class="header">{{$t('MT_WODEYITI')}}</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('MT_WEIWANCHENG')" name="first">
        <iCard class="my-topics-all">
          <unfinish
            :meetingInfo="meetingInfo"
            :unFinishedData="unFinishedData"
            @findMyGpThemens="findMyGpThemens"
            @findMyGpThemensByCondition="findMyGpThemensByCondition"
          />
        </iCard>
      </el-tab-pane>
      <el-tab-pane :label="$t('MT_YIWANCHENG')" name="second">
        <iCard class="my-topics-all">
          <finished
            :meetingInfo="meetingInfo"
            :finishedData="finishedData"
            @findMyGpThemens="findMyGpThemens"
            @findMyGpThemensByCondition="findMyGpThemensByCondition"
          />
        </iCard>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { iCard } from "rise";
import finished from "./finished.vue";
import unfinish from "./unfinish.vue";
import { findMyGpThemens } from "@/api/meeting/live";
// findMyThemens 全局替换 findMyGpThemens

export default {
  components: {
    iCard,
    finished,
    unfinish,
  },
  props: {
    meetingInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    curMeetingId: {
      type: Number,
      default: () => {
        return -1;
      },
    },
  },
  data() {
    return {
      meetingId: "",
      timer: "",
      activeName: "first",
      allFollowThemen: [],
      finishedData: [],
      unFinishedData: [],
      // refresh: false,
    };
  },

  mounted() {
    //往下走
    this.meetingId = this.$route.query.meetingInfoId;
    this.meetingTypeId = this.$route.query.id;
    this.query();
    this.queryunFinishedData();
    //往上走
    this.queryMeeting();
    // this.timer = setInterval(() => {
    //   this.queryMeeting();
    // }, 5000);
  },
  methods: {
    findMyGpThemens() {
      this.query();
    },
    async queryMeeting() {
      if (this.meetingId) {
        const params = {
          presentItem: "02",
          pageNum: 1,
          pageSize: 9999,
          meetingId: this.curMeetingId ? this.curMeetingId : this.meetingId,
          meetingTypeId: this.meetingTypeId,
        };
        let res = await findMyGpThemens(params).catch(() => {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.queryMeeting();
          }, 5000);
        });
        this.$emit("getMyTopics", res.data);
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.queryMeeting();
        }, 5000);
      }
    },
    async query() {
      const params = {
        category:'03',
        presentItem: "03",
        pageNum: 1,
        pageSize: 9999,
        meetingTypeId: this.meetingTypeId,
      };
      let res = await findMyGpThemens(params);
      let arrObj = [];
      // let arrObjUn = [];
      res.data.forEach((item) => {
        if (item.state === "03") {
          arrObj.push(item);
        } else {
          // arrObjUn.push(item);
        }
      });
      // this.$emit("getMyTopics", res.data);
      this.finishedData = arrObj.filter((item) => {
        return !item.isBreak;
      });
      // this.unFinishedData = arrObjUn.filter((item) => {
      //   return !item.isBreak;
      // });
      return "over";
    },
    async queryunFinishedData() {
      let arrObjUn = [];
      const params = {
        category:'03',
        presentItem: "04",
        pageNum: 1,
        pageSize: 9999,
        meetingTypeId: this.meetingTypeId,
      };
      let res = await findMyGpThemens(params);

      res.data.forEach((item) => {
        if (item.state === "03") {
          // arrObj.push(item);
        } else {
          arrObjUn.push(item);
        }
      });
      this.unFinishedData = arrObjUn.filter((item) => {
        return !item.isBreak;
      });
    },
    findMyGpThemensByCondition(form) {
      // this.refresh = false;
      const params = {
        ...form,
        presentItem: "03",
        // meetingId: this.meetingInfo.id,
        pageNum: 1,
        pageSize: 9999,
        meetingTypeId: this.meetingTypeId,
        category:'03'
      }; 
      findMyGpThemens(params).then((res) => {
        let arrObj = [];
        let arrObjUn = [];
        // const data = res.data.filter((item) => {
        //   return !item.isBreak;
        // });
        res.data.forEach((item) => {
          // if (item.state !== "03") {
          //   arrObj.push(item);
          // }
          if (item.state === "03") {
            arrObj.push(item);
          } else {
            arrObjUn.push(item);
          }
        });
        this.finishedData = arrObj;
        this.unFinishedData = arrObjUn;
        // this.refresh = true;
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 1731px;
}

.header {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  letter-spacing: 0;
  line-height: 27px;
  margin: 40px 0 20px;
}

::v-deep .el-tabs__header {
  margin-bottom: 20px;

  .el-tabs__nav-wrap {
    &::after {
      height: 0px !important;
    }
    .el-tabs__item {
      font-size: 18px;
      color: #727272;
      letter-spacing: 0;
      text-align: center;
      height: 30px;
      line-height: 25px;
    }
    .is-active {
      color: #1763f7;
    }
    .el-tabs__active-bar {
      height: 3px;
    }
  }
}

.container {
  /* width: 1740px;
  margin: 0 auto; */
  .header {
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    letter-spacing: 0;
    line-height: 27px;
    margin: 40px 0 30px;
  }

  .my-topics-all {
    width: 100%;

    ::v-deep .el-tabs__nav-wrap {
      &::after {
        height: 0px !important;
      }
      .el-tabs__item {
        font-size: 18px;
        color: #727272;
        letter-spacing: 0;
        text-align: center;
        height: 30px;
        line-height: 25px;
      }
      .is-active {
        color: #1763f7;
      }
      .el-tabs__active-bar {
        height: 3px;
      }
    }
  }
}

::v-deep .el-table {
  width: 1660px;
}
</style>
