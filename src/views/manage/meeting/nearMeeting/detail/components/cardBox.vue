<template>
  <div class="card-content">
    <iCard
      :class="
        themen.state === '02' ? 'card-border themen-blue-border' : 'card-border'
      "
    >
      <div class="title">
        <div :class="themen.state === '02' ? 'status up-blue' : 'status'">
          {{
            themen.state === "03"
              ? "FINISH"
              : themen.state === "02"
              ? "LIVE!"
              : "NEXT"
          }}
        </div>
        <div class="rate-progress">
          <div
            :class="themen.state === '02' ? 'up-number up-blue' : 'up-number'"
          >
            {{ num }}
          </div>
          <div class="divider"></div>
          <div class="total-number">{{ total }}</div>
        </div>
      </div>
      <div class="summary">{{ themen.topic }}</div>
      <el-divider></el-divider>
      <ul class="content-list">
        <li class="content-item">
          <span>Presenter</span>
          <span>
            <span>{{themen.presenter ? themen.presenter : ""}}</span>
            <span v-if="themen.presenter && themen.presenterNosys">/</span>
            <span>{{themen.presenterNosys ? themen.presenterNosys : ""}}</span>
          </span>
        </li>
        <li class="content-item">
          <span>Presenter Department</span>
          <span>
            <span>{{themen.presenterDept ? themen.presenterDept : ""}}</span>
            <span v-if="themen.presenterDept && themen.presenterDeptNosys">/</span>
            <span>{{themen.presenterDept ? themen.presenterDept : ""}}</span>
          </span>
        </li>
        <li class="content-item">
          <span>Supporter</span>
          <span>
            <span>{{themen.supporter ? themen.supporter : ""}}</span>
            <span v-if="themen.supporter && themen.supporterNosys">/</span>
            <span>{{themen.supporterNosys ? themen.supporterNosys : ""}}</span>
          </span>
        </li>
        <li class="content-item">
          <span>Supporter Department</span>
          <span>
            <span>{{themen.supporterDeptNosys ? themen.supporterDeptNosys : ""}}</span>
            <span v-if="themen.supporterDept && themen.supporterDeptNosys">/</span>
            <span>{{themen.supporterDeptNosys ? themen.supporterDeptNosys : ""}}</span>
          </span>
        </li>
        <li class="content-item" v-if="themen.state === '02'">
          <span>Time</span>
          <div>{{ nowTime }}<span>LIVE</span></div>
        </li>
        <li class="content-item" v-else>
          <span>Time</span
          ><span v-show="themen.state === '01'">{{
            `${startDate} ${themen.startTime}`
          }}</span
          ><span v-show="themen.state === '03'">{{
            `${endDate} ${themen.endTime}`
          }}</span>
        </li>
      </ul>
      <el-divider></el-divider>
    </iCard>
  </div>
</template>

<script>
import { iCard } from "rise";
import dayjs from "dayjs";
export default {
  components: { iCard },
  props: {
    themen: {
      type: Object,
      default: () => {
        return {};
      },
    },
    total: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    num: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    startDate: {
      type: String,
      default: () => {
        return "";
      },
    },
    endDate: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      nowTime: dayjs(new Date()).format("HH:mm:ss"),
      timer: "",
    };
  },
  mounted() {
    if (this.themen.state === "02") {
      this.timer = setInterval(() => {
        this.nowTime = this.getNowTime();
      }, 5000);
    }
  },
  methods: {
    getNowTime() {
      return dayjs(new Date()).format("HH:mm:ss");
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
.up-blue {
  color: #1666ef !important;
}
.title {
  display: flex;
  justify-content: space-between;
  .status {
    width: 118px;
    height: 41px;
    color: #999999;
    font-family: Arial;
    font-size: 36px;
    font-weight: 700;
    line-height: 41px;
  }
  .rate-progress {
    position: relative;
    width: 38px;
    .up-number {
      text-align: right;
      right: 16px;
      top: 0;
      position: absolute;
      width: 60px;
      height: 41px;
      font-family: Arial;
      font-size: 36px;
      font-weight: 700;
      line-height: 41px;
      transform: translateY(-20px);
    }
    .divider {
      width: 2px;
      position: absolute;
      background-color: #000;
      height: 40px;
      transform: rotate(45deg) translate(15px, -15px);
    }
    .total-number {
      right: 0;
      bottom: 0;
      position: absolute;
      width: 18px;
      height: 18px;
      font-family: Arial;
      font-size: 16px;
      font-weight: 700;
      line-height: 18px;
    }
  }
}

.summary {
  height: 35px;
  font-size: 16px;
  font-weight: 400;
  line-height: 35px;
  margin: 20px 0;
}
.el-divider {
  margin: 0;
}
.card-content {
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  flex-wrap: nowrap;
  /* width: 100%; */
  justify-content: space-between;
}
::v-deep .card-border {
  border: solid 1px #999999;
  border-radius: 4px;
  width: 100%;
  .cardBody {
    padding: 30px;
    position: relative;
  }
  .last {
    position: absolute;
    bottom: 2px;
    left: 0;
  }
}
::v-deep .themen-blue-border {
  border: solid 1px #1660f1;
}
.content-list {
  .content-item {
    height: 50px;
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    font-size: 16px;
    font-weight: 400;
    overflow: hidden;

    >span {
      display: block;

      &:nth-of-type(1) {
        min-width: 200px;
      }
      &:nth-of-type(2) {
        flex: 1;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    div {
      display: flex;
      span {
        display: block;
        color: #1666ef !important;
      }
    }
  }
  .content-item:nth-of-type(2n) {
    background-color: rgba(226, 240, 252, 0.3);
  }
}

::v-deep .el-carousel__indicators--horizontal {
  height: 60px;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
