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
      <ul class="content-list" v-if="!themen.isBreak">
        <li class="content-item">
          <span>Presenter</span><span>{{ themen.presenter }}</span>
        </li>
        <li class="content-item">
          <span>Presenter Department</span
          ><span>{{ themen.presenterDept }}</span>
        </li>
        <li class="content-item">
          <span>Supporter</span><span>{{ themen.supporter }}</span>
        </li>
        <li class="content-item">
          <span>Supporter Department</span
          ><span>{{ themen.supporterDept }}</span>
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
      <div v-else class="my-box">
        <div class="img-box">
          <img src="@/assets/images/rest.svg" />
        </div>
      </div>
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
    meetingName: {
      type: String,
      default: () => {
        return "";
      },
    },
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
      timer: "",
      nowTime: dayjs(new Date()).format("HH:mm:ss"),
    };
  },
  created() {
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
.my-box {
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  .img-box {
    width: 128px;
    height: 128px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
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
      left: 0;
      top: 0;
      position: absolute;
      width: 40px;
      height: 41px;
      font-family: Arial;
      font-size: 36px;
      font-weight: 700;
      line-height: 41px;
      text-align: center;
      transform: translate(-10px, -20px);
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
  border: solid 1px #67C23A;
}
.content-list {
  .content-item {
    height: 50px;
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    font-size: 16px;
    font-weight: 400;
    span {
      display: block;
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
