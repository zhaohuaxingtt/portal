<template>
  <iPage class="news-hall">
    <div class="news-hall-left">
      <div class="carousel">
        <newContent
          v-model="ruleForm"
          :cardsRuleForm="cardsRuleForm"
          @handleLike="handleLike"
          @handleLikeRed="handleLikeRed"
          :viewLinke="viewLinke"
        />
      </div>
      <div class="news-hall-left-tab">
        <div class="news-hall-left-bgi">
          <div class="nav flex-align-center margin-bottom20 lev1">
            <div class="news-hall-left-text">{{language('NEWS_NKNTYXH','你可能同样喜欢')}}</div>
          </div>
        </div>
        <newBottom v-model="fondRuleForm" @handleBottom="handleBottom" />
      </div>
    </div>
    <div class="news-hall-right">
      <newsRightCard
        class="hotCard"
        :title="language('NEWS_ZUIRE','最热')"
        v-model="hotRuleForm"
        @goDetail="goDetail"
      >
        <span slot-scope="slotProps">{{ slotProps.item.pageviews }}{{language('NEWS_RENYUEDU','人阅读')}}</span>
      </newsRightCard>
      <newsRightCard
        class="newCard"
        :title="language('NEWS_ZUIXIN','最新')"
        v-model="testRuleForm"
        @goDetail="goDetail"
      >
        <span slot-scope="slotProps">{{ slotProps.item.publishDate }}</span>
      </newsRightCard>
    </div>
  </iPage>
</template>

<script>
import { iPage } from "rise";
import newBottom from "./components/bottom.vue";
import newsRightCard from "./components/newsRightCard.vue";
import newContent from "./components/content.vue";
import dayjs from "dayjs";

import {
  findNewsDetails,
  findLatestNews,
  findHotNews,
  findFondNews,
  likes,
  increasePageViews,
} from "@/api/news/news";

export default {
  components: {
    iPage,
    newBottom,
    newContent,
    newsRightCard,
  },
  data() {
    return {
      ruleForm: {},
      hotRuleForm: [],
      testRuleForm: [],
      fondRuleForm: [],
      id: "",
      cardsRuleForm: [],
      viewLinke: true,
    };
  },
  computed: {},
  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
  },
  mounted() {
    this.getTableList();
  },

  methods: {
    getTableList() {
      this.query();
    },
    goDetail(val) {
      if (val.type === 0 && val.linkUrl) {
        increasePageViews({ id: val.id });
        window.open(`${val.linkUrl}`, "_blank");
      } else {
        this.$router.push({
          path: `/news/details?id=${val.id}`,
        });
      }
    },
    compart(val) {
      return function (a, b) {
        let temp1 = a[val];
        let temp2 = b[val];
        return temp1 - temp2;
      };
    },
    handleBottom(val) {
      if (val.type === 0 && val.linkUrl) {
        increasePageViews({ id: val.id });
        window.open(`${val.linkUrl}`, "_blank");
      } else {
        this.$router.push({
          path: `/news/details?id=${val.id}`,
        });
      }
    },
    handleLike() {
      const id = this.id;
      likes({ id }).then((res) => {
        console.log(this.ruleForm.isThumbsUp);
        this.$message.success(this.language('NEWS_DIANZANCHENGGONG','点赞成功'));
        this.ruleForm.thumbsUpNum += 1;
        this.viewLinke = false;
      });
    },
    handleLikeRed() {
      const id = this.id;
      likes({ id }).then((res) => {
        this.$message.warning(this.language('NEWS_QUXIAODIANZAN','取消点赞'));
        this.viewLinke = true;
        this.ruleForm.thumbsUpNum -= 1;
      });
    },
    async query() {
      const params = { id: this.id };
      const res = await findNewsDetails(params);
      this.ruleForm = { ...this.ruleForm, ...res };
      this.ruleForm = {...this.ruleForm,publishDate: dayjs(this.ruleForm?.publishDate).format("YYYY-MM-DD")}

      let tagIds = res.tags.map((item) => {
        return item.id;
      });
      if (res.isThumbsUp === 0) {
        this.viewLinke = true;
      } else {
        this.viewLinke = false;
      }
      // 最热
      findHotNews().then((res) => {
        console.log(res);
        this.hotRuleForm = res;
      });
      // 最新
      findLatestNews().then((res) => {
        console.log(res);
        this.testRuleForm = res;
        this.testRuleForm = this.testRuleForm?.map((item) => {
          return {
            ...item,
            publishDate: dayjs(item.publishDate).format("YYYY-MM-DD"),
          };
        });
      });
      // 你最喜欢
      const data = { tagIds, id: this.id, category: this.ruleForm.category };
      findFondNews(data).then((res) => {
        console.log(res);
        this.fondRuleForm = res;
        this.fondRuleForm = this.fondRuleForm?.map((item) => {
          return {
            ...item,
            publishDate: dayjs(item.publishDate).format("YYYY-MM-DD"),
          };
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.tab-list-box {
  display: flex;
  justify-content: space-between;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.news-hall {
  display: flex;
  justify-content: space-between;
  .news-hall-left {
    flex: 1;
    .carousel ::v-deep {
      max-width: 1382px;
      .el-carousel {
        min-width: 1382px;
        height: 278px;
        .el-carousel__container {
          width: 100%;
          height: 100%;
        }
        .el-carousel__indicators--horizontal {
          left: 1.5%;
          transform: none;
        }
        .is-active button {
          width: 2rem;
          opacity: 1;
        }
        .el-carousel__button {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 0.25rem;
        }
      }
      .carousel-none {
        // width: 1390px;
        height: 278px;
        line-height: 278px;
        text-align: center;
      }
    }
    .news-hall-left-tab {
      margin-top: 20px;
      .news-hall-left-bgi {
        height: 4.5rem;
        background-image: url("~@/assets/images/news/hearts.svg");
        background-size: 80% 80%;
        background-repeat: no-repeat;
        background-position: center center;
      }
      ::v-deep .nav {
        height: 3.1rem;
        border-bottom: solid 1px rgba(22, 96, 241, 0.10196078431372549);
        div {
          margin-left: 0px;
        }
        .news-hall-left-text {
          width: 100%;
          text-align: center;
          margin-left: 15rem;
          font-weight: bolder;
          font-size: 20px;
          color: #5f6f8f;
        }
      }
    }
  }
  .news-hall-right {
    .hotCard ::v-deep {
      background-image: url("~@/assets/images/news/hot.svg"),
        url("~@/assets/images/news/five.svg");
      background-repeat: no-repeat;
      background-position: 90% 3px, 94% 3px;
    }
    .newCard ::v-deep {
      background-image: url("~@/assets/images/news/new.svg"),
        url("~@/assets/images/news/five.svg");
      background-repeat: no-repeat;
      background-position: 80% 5px, 96% 4px;
    }
  }
}
.nav {
  .name {
    cursor: pointer;
    opacity: 1;
    border-radius: 0.3125rem;
    position: relative;
    padding: 0 !important;
    margin-right: 3.125rem;
    font-size: 18px;
  }
  .name::after {
    position: absolute;
    left: 0;
    top: 1.75rem;
    transition: all 0.5s;
    content: "";
    background-color: #1763f7;
    height: 0.1875rem;
  }
  .active {
    font-weight: bold;
  }
  .active::after {
    opacity: 1;
    width: 100%;
  }
}
</style>
