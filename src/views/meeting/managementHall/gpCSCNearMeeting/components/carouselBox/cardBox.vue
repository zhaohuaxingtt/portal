<template>
  <div class="card-content">
    <iCard
      :class="
        themen.state === '04' ? 'card-border themen-blue-border' : 'card-border'
      "
    >
      <div class="title">
        <div :class="themen.state === '04' ? 'status up-blue' : 'status'">
          {{
            themen.state === "01" || themen.state === "02" || themen.state === "03"
              ? "NEXT"
              : themen.state === "04"
              ? "LIVE!"
              : "FINISH"
          }}
        </div>
        <div class="rate-progress">
          <div
            :class="themen.state === '04' ? 'up-number up-blue' : 'up-number'"
          >
            {{ num }}
          </div>
          <div class="divider"></div>
          <div class="total-number">{{ total }}</div>
        </div>
      </div>
      <div class="summary">
        <span>{{themen.name}}</span>
        <iButton @click="goToDetail(themen.id)">MORE</iButton>
      </div>
      <el-divider></el-divider>
      <ul class="content-list">
        <li class="content-item">
          <span></span
          ><span></span>
        </li>
        <li class="content-item">
          <span>{{$t('MT_HUIYISHIJIAN')}}</span
          ><span>{{
            `${themen.startDate} ${themen.startTime}`
          }}</span>
        </li>
        <li class="content-item">
          <span>{{$t('MT_HUIYIDIDIAN')}}</span
          ><span>{{ themen.meetingPlace }}</span>
        </li>
        <li class="content-item">
          <span>{{$t('MT_BUMEN')}}</span><span>{{ themen.dept }}</span>
        </li>
        <li class="content-item">
          <span></span
          ><span></span>
        </li>
      </ul>
      <el-divider></el-divider>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton } from "rise";
import dayjs from "dayjs";
// import webStorage from '@/utils/storageManager';
export default {
  components: { iCard, iButton },
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
      timer: '',
      presenterDept: '',
    };
  },
  mounted() {
    // this.presenterDept = webStorage.get('userInfo').presenterDept;
    if (this.themen.state === "04") {
      this.timer = setInterval(() => {
        this.nowTime = this.getNowTime();
      }, 5000);
    }
  },
  methods: {
    getNowTime() {
      return dayjs(new Date()).format("HH:mm:ss");
    },
    goToDetail(e) {
      this.$router.push({
        path: '/meeting/near-meeting/detail',
        query: {
          id: e,
        }
      })
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
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
  display: flex;
  justify-content: space-between;
  span:nth-of-type(1) {
    max-width: 300px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
    padding: 0 20px;
    span {
      display: block;
    }
    span:nth-of-type(1) {
      width: 80px;
    }
    span:nth-of-type(2) {
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: right;
      padding-left: 40px;
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
