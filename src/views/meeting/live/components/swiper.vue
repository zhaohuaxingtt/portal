<template>
  <div class="card-list-container">
    <div class="swiper" ref="swiperRef">
      <div class="slide" v-for="(item, index) of resThemeData" :key="index">
        <slot
          :themen="item"
          :total="resThemeData.length"
          :num="index + 1"
        ></slot>
      </div>
    </div>
    <div class="click-area">
      <div class="right" @click="handlePreClick">&lt;</div>
      <div class="left" @click="handleNextClick">&gt;</div>
    </div>
    <div class="warn">会议直播进程将每5秒自动刷新，请耐心等待。</div>
  </div>
</template>

<script>
export default {
  props: {
    resThemeData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      curIndex: 0,
    };
  },
  mounted() {
    this.curIndex = this.getCurrentLiveIndex();
  },
  methods: {
    getCurrentLiveIndex() {
      let liveIndex = -1;
      this.resThemeData.forEach((item, index) => {
        if (item.state === "02") {
          liveIndex = index;
        }
      });
      return liveIndex;
    },
    handlePreClick() {
      if (this.curIndex > 1) {
        this.curIndex--;
      }
      this.translateX(this.$refs.swiperRef, this.curIndex);
    },
    handleNextClick() {
      if (this.curIndex < this.resThemeData.length - 2) {
        this.curIndex++;
      }
      this.translateX(this.$refs.swiperRef, this.curIndex);
    },
    //移动
    translateX(refDom, curIndex) {
      refDom.style.transform = `translateX(${(1 - curIndex) * 560}px)`;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .swiper {
  display: flex;
  justify-content: space-between;
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
.card-list-container {
  position: relative;
  padding-bottom: 40px;
  overflow: hidden;
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
  }
  .click-area:hover {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left,
    .right {
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
</style>
