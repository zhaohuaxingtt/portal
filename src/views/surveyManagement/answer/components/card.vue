<template>
  <div class="inner" @click="handleToSurvey">
    <div class="img-box">
      <img :src="info.surveyCover" />
    </div>
    <div v-if="info.state == '3'" class="state finish">
      {{ stateObj[info.state] }}
    </div>
    <div class="state" v-else>
      {{ stateObj[info.state] }}
    </div>
    <div class="foot">
      <div class="title">{{ info.name }}</div>
      <div class="info">
        <span
          >有效期 ｜ {{ getDate(info.updateDate) }} 至
          {{ getDate(info.endTime) }} ｜ {{ typeObj[info.surveyModel] }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
// import img from "@/"
import dayjs from "dayjs";
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      stateObj: {
        1: "未发布",
        2: "进行中",
        3: "已过期",
        4: "已统计",
        5: "已完成",
      },
      typeObj: {
        7: "采购问卷",
        8: "物流问卷",
        9: "质保问卷",
      },
    };
  },
  methods: {
    getDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    handleToSurvey() {
      this.$router.push({
        // path: `/survey/answer/detail/${this.info.id}?state=${this.info.state}`,
        name: "detail",
        params: {
          id: this.info.id,
          name: this.info.name,
          state: this.info.state,
          closing: this.info.closing,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.inner {
  position: relative;
  cursor: pointer;
  .state {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 100px;
    height: 35px;
    background: #1660f1;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    line-height: 35px;
    text-align: center;
  }
  .finish {
    background: rgb(190, 215, 239);
    color: rgb(80, 120, 200);
  }
  .img-box {
    width: 100%;
    height: 216px;
    img {
      width: 100%;
      height: 100%;
      /* object-fit: cover; */
    }
  }
  .foot {
    width: 100%;
    height: 84px;
    padding: 10px 20px 20px;
    .title {
      height: 22px;
      font-size: 16px;
      font-weight: 600;
      color: #000000;
      line-height: 22px;
    }
    .info {
      display: flex;
      align-items: center;
      width: 323px;
      justify-content: space-between;
      height: 20px;
      margin-top: 12px;
      font-size: 14px;
      font-weight: 400;
      color: #747474;
      line-height: 20px;
      white-space: nowrap;
    }
  }
}
@media screen and (max-width: 1440px) {
  .inner {
    .foot {
      padding: 10px 0;
    }
  }
  // .info {
  // font-size: 14px;
  //  -webkit-transform: scale(0.75);
  //}
}
</style>
