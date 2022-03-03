<template>
  <div>
    <iCard class="form-content-icard">
      <div class="form-comtent-top">
        <div class="form-bottom-row2">
          <!-- <h2>车之窗 | 顶住“缺芯”压力，荣威iMAX8上险量继续保持高位！</h2> -->
          <span>{{ ruleForm.name }}</span>
        </div>
        <div class="form-bottom-row2-right">
          <div
            v-for="item in ruleForm.tags"
            :key="item.id"
            class="form-bottom-row2-right-list"
          >
            <div class="form-content-row4-content">
              <div class="form-content-row4-div">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-content-top2">
        <div class="form-bottom-row3">
          <div>{{ ruleForm.source }}</div>
          <div class="form-content-data">{{ ruleForm.publishDate }}</div>
        </div>
        <div class="form-content-row5-content">
          <div class="form-content-icon">
            <img
              src="@/assets/images/news/view.svg"
              alt=""
              class="form-content-icon-img"
            />
            <div class="form-content-icon-text">{{ ruleForm.pageviews }}</div>
          </div>
          <div class="form-content-icon">
            <img
              v-show="viewLinke"
              src="@/assets/images/news/likeGray.svg"
              alt=""
              class="form-content-icon-img-like"
              @click="handleLike"
            />
            <img
              v-show="!viewLinke"
              src="@/assets/images/news/likeRed.svg"
              alt=""
              class="form-content-icon-img-like"
              @click="handleLikeRed"
            />
            <div class="form-content-icon-text">{{ ruleForm.thumbsUpNum }}</div>
          </div>
          <div class="form-content-icon">
            <a :href="`mailto:?subject=RiSE${language('NEWS_YNFXYTXW','与您分享一条新闻')}：${ruleForm.title}&body=${ruleForm.summary}%0A%0D${mailtoShare}`">
              <img
                src="@/assets/images/news/share.svg"
                alt=""
                class="form-content-icon-img-like"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- 专题详情 -->
      <div class="form-bottom-cards" v-if="true">
        <div class="form-bottom-content">
          <newBottom v-model="cardsRuleForm" @handleBottom="handleBottom" />
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard } from "rise";
import newBottom from "./bottom.vue";
import { increasePageViews } from "@/api/news/news";

export default {
  name: "newContent",
  components: {
    iCard,
    newBottom,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    cardsRuleForm: {
      type: Object,
      default: () => [],
    },
    viewLinke: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
      },
    },
  },
  data() {
    return {
      ruleForm: {},
      openImg: false,
      newsAtlas: [],
      disabledClick: false,
      disabledClick2: false,
    };
  },
  mounted() {},
  computed: {
    mailtoShare() {
      return window.location.href;
    },
  },
  methods: {
    handleBottom(val) {
      if (val.type === 0 && val.linkUrl) {
        increasePageViews({ id: val.id });
        window.open(`${val.linkUrl}`, "_blank");
      } else {
        let { href } = this.$router.resolve({
          name: "newsDetails",
        });
        window.open(href + `?id=${val.id}`, "_blank");
      }
    },
    // 预览
    handlePreview() {
      this.openImg = true;
    },
    // 关闭预览
    closePrev() {
      this.openImg = false;
    },
    // 预览-轮播图移动
    arrowClick(val) {
      if (val === "next") {
        this.$refs.cardShow.next();
      } else {
        this.$refs.cardShow.prev();
      }
    },
    handleLike() {
      let time = "";
      if (this.disabledClick) {
        clearTimeout(time);
        return;
      }
      this.disabledClick = true;
      time = setTimeout(() => {
        this.disabledClick = false;
      }, 3000);
      this.$emit("handleLike");
    },
    handleLikeRed() {
      let time = "";
      if (this.disabledClick2) {
        clearTimeout(time);
        return;
      }
      this.disabledClick2 = true;
      time = setTimeout(() => {
        this.disabledClick2 = false;
      }, 3000);
      this.$emit("handleLikeRed");
    },
  },
};
</script>
<style lang="scss" scoped>
.form-content-icard {
  margin-bottom: 3rem;
}
::v-deep .news-card .bottom-card .form-bottom-icard {
  padding: 6px;
}
.form-comtent-top {
  display: flex;
  justify-content: space-between;
  .form-bottom-row2 {
    height: 28px;
    font-size: 20px;
    line-height: 30px;
    font-weight: bold;
  }
  .form-bottom-row2-right {
    display: flex;
    flex-wrap: wrap;
    margin-right: 3px;
    .form-bottom-row2-right-list {
      margin-left: 20px;
      margin-bottom: 2px;
      .form-content-row4-content {
        background-color: rgba(248, 248, 250);
        border-radius: 10px;
        line-height: 20px;
        height: 20px;
        .form-content-row4-div {
          text-align: center;
          color: #988d8d;
          padding: 0 23px;
        }
      }
    }
  }
}
.form-content-top2 {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;
  .form-bottom-row3 {
    display: flex;
    align-items: center;
    .form-content-data {
      margin-left: 1rem;
      color: #988d8d;
    }
  }
  .content {
    padding: 0 5px;
    cursor: pointer;
  }
  .form-content-row5-content {
    display: flex;
    margin-right: 2px;
    .form-content-icon {
      /* width: 3rem;
      height: 1.5rem; */
      width: 14px;
      height: 14px;
      margin-left: 23px;
      display: flex;
      align-items: center;
      .form-content-icon-img {
        width: 100%;
        height: 100%;
        margin-right: 6px;
      }
      .form-content-icon-img-like {
        width: 100%;
        height: 100%;
        margin-right: 6px;
        cursor: pointer;
      }
      .form-content-icon-text {
        color: #988d8d;
        /* padding: 0 0.5rem; */
      }
    }
  }
}
.form-content-video-div {
  margin-top: 20px;
  height: 855px;
  .form-content-img {
    width: 100%;
    height: 100%;
  }
}
.form-content-img-div {
  margin-top: 1.5rem;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  /* margin-right: -2rem; */
  margin-right: -40px;
  .form-content-img-container {
    margin-bottom: 19px;
    flex: 0 0 25%;
    padding-right: 33px;
    width: 308px;
    height: 173px;
    opacity: 1;
    border-radius: 4px;
    .form-content-img {
      width: 100%;
      height: 100%;

      cursor: pointer;
    }
  }
}

.form-tem-contentImg {
  .form-item-imgContent {
    /* padding: 2rem 0; */
    /* margin-top: 20px; */
    ::v-deep p {
      margin: 20px 0;
      img {
        height: 1320px;
        width: 100%;
        /* margin-bottom: 20px; */
      }
    }
  }
  .form-item-imgContent-div {
    /* height: 1320px; */
    width: 100%;
    .form-imgContent-img {
      width: 100%;
      height: 100%;
    }
  }
}

.form-bottom-cards {
  display: flex;
  flex-wrap: wrap-reverse;
  margin-left: -28px;
  width: 100%;
  // .form-bottom-content {
  //   flex: 0.32;
  // }
}

/* 预览 */
.picPreview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  .prev,
  .next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer;
  }
  .carousel {
    position: relative;
    width: 1390px;
    // height: 280px;
    height: 100%;
    margin: 0 20px;
    // background-color: cornflowerblue;
    .el-carousel__item ::v-deep {
      display: flex;
      align-content: flex-start;
      justify-content: center;
    }
    .close {
      z-index: 9999;
      color: #fff;
      font-size: 24px;
      border-radius: 50%;
      position: absolute;
      right: 0;
      margin: 5px 5px 0 0;
      cursor: pointer;
    }
  }
}
.over {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 999;
  background: #000000;
}
</style>
