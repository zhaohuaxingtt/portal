<template>
  <div class="news-hall">
    <div class="news-hall-left">
      <div class="carousel">
        <el-carousel v-if="KVImgs.length > 0" :interval="5000" :autoplay="true">
          <el-carousel-item v-for="item in KVImgs" :key="item">
            <el-image :src="item.picUrl" />
          </el-carousel-item>
        </el-carousel>
        <div v-else class="carousel-none">{{language('NEWS_ZANWUSHUJU','暂无数据')}}</div>
      </div>
      <div class="news-hall-left-tab">
        <div class="nav flex-align-center margin-bottom20 lev1">
          <div>
            <span
              class="name"
              @click="changeIndex(0)"
              :class="{ active: activeIndex === 0 }"
              >{{language('NEWS_TOUTIAOXINWEN','头条新闻')}}</span
            >
          </div>
          <div>
            <span
              class="name"
              @click="changeIndex(1)"
              :class="{ active: activeIndex === 1 }"
              >{{language('NEWS_GONGYINGJIANXUN','供应简讯')}}</span
            >
          </div>
          <div>
            <span
              class="name"
              @click="changeIndex(2)"
              :class="{ active: activeIndex === 2 }"
              >{{language('NEWS_GONGYINGSHANGXINWEN','供应商新闻')}}</span
            >
          </div>
          <div>
            <span
              class="name"
              @click="changeIndex(3)"
              :class="{ active: activeIndex === 3 }"
              >{{language('NEWS_YINGXIANGZHUANQU','影像专区')}}</span
            >
          </div>
        </div>
        <newsBottomCard
          ref="newsBottomCard"
          v-loading="loading"
          :ruleForm="ruleForm"
          :tagActiveIndex="tagActiveIndex"
          :loading="loadingCard"
          :moreFlag="moreFlag"
          :boxFlag="boxFlag"
          @handleRearch="handleSearchByTagId"
          @goDetail="handleOpenNewsDetail"
        />
      </div>
    </div>
    <div class="news-hall-right">
      <newsRightCard
        class="hotCard"
        :title="language('NEWS_ZUIRE','最热')"
        v-model="hotNews"
        @goDetail="handleOpenNewsDetails"
      >
        <template v-slot="slotProps"
          >{{ slotProps.item.pageviews }}{{language('NEWS_RENYUEDU','人阅读')}}</template
        >
      </newsRightCard>
      <newsRightCard
        class="newCard"
        :title="language('NEWS_ZUIXIN','最新')"
        v-model="latestNews"
        @goDetail="handleOpenNewsDetails"
      >
        <template v-slot="slotProps">{{ slotProps.item.publishDate }}</template>
      </newsRightCard>
    </div>
  </div>
</template>

<script>
import newsRightCard from "./components/newsRightCard.vue";
import newsBottomCard from "./components/newsBottomCard.vue";
import {
  findKVs,
  findLatestNews,
  findHotNews,
  findNewsTopicCards,
  increasePageViews,
} from "@/api/news/news";
import dayjs from "dayjs";

export default {
  components: {
    newsRightCard,
    newsBottomCard,
  },
  data() {
    return {
      activeIndex: 0,
      tagActiveIndex: "",
      loading: false,
      loadingCard: false,
      KVImgs: [],
      ruleForm: {
        tags: [],
        newsCard: [],
      },
      latestNews: [],
      hotNews: [],
      moreFlag:false,
      activeIndexFlag:false,
    };
  },
  mounted() {
    findKVs().then((res) => {
      this.KVImgs = res;
    });
    this.queryLatesAndHot();
    this.handleRearch();
  },
  methods: {
    handleRearch(e) {
      let param = {
        category: this.activeIndex,
        tagId: this.tagActiveIndex,
        ...e,
      };
      this.query(param);
    },
    async handleSearchByTagId(e) {
      this.loadingCard = true;
      this.tagActiveIndex = e;
      const newsCard = await findNewsTopicCards({
        category: this.activeIndex,
        tagId: this.tagActiveIndex,
      });
      this.ruleForm.newsCard = newsCard?.newsDTOList;
      this.loadingCard = false;
    },
    changeIndex(e) {
      console.log(145,this.boxFlag)
      if(this.activeIndex === e){
        this.activeIndexFlag=true;
      }else{
        this.activeIndexFlag=false;
      }
      this.tagActiveIndex = "";
      this.activeIndex = e;
      this.handleRearch();
     
    },
    handleOpenNewsDetail(val) {
      let { href } = this.$router.resolve({
        name: val.topicId ? "newsProjectDetails" : "newsDetails",
      });
      if (val.topicId) {
        window.open(href + `?id=${val.topicId}`, "_blank");
      } else {
        if (val.category === 0 && val.linkUrl) {
          increasePageViews({ id: val.id });
          window.open(val.linkUrl, "_blank");
        } else {
          window.open(href + `?id=${val.id}`, "_blank");
        }
      }
    },
    handleOpenNewsDetails(val) {
      let { href } = this.$router.resolve({
        name: "newsDetails",
      });
      if (val.category === 0 && val.linkUrl) {
        increasePageViews({ id: val.id });
        window.open(val.linkUrl, "_blank");
      } else {
        window.open(href + `?id=${val.id}`, "_blank");
      }
    },
    async query(e) {
      this.loading = true;
      const newsTopicCards = await findNewsTopicCards(e);
      this.ruleForm.newsCard = newsTopicCards?.newsDTOList;
      this.ruleForm.newsCard = this.ruleForm.newsCard?.map(item => {
        return {
          ...item,
          publishDate: dayjs(item.publishDate).format("YYYY-MM-DD"),
        };
      })
      this.ruleForm.tags = newsTopicCards?.tagDTOList;
      this.loading = false;
      this.$nextTick(()=>{
        // console.log(144,this.$refs.newsBottomCard.$refs.tagsBox.offsetHeight)
          if(this.activeIndexFlag && this.moreFlag){
            return;
          }
          if(this.$refs.newsBottomCard.$refs.tagsBox.offsetHeight>30){
            this.moreFlag=true;
          }else{
            this.moreFlag=false;
          }
     });
    },
    async queryLatesAndHot() {
      const latestNews = await findLatestNews();
      const hotNews = await findHotNews();
      this.hotNews = hotNews;
      this.latestNews = latestNews;
      this.latestNews = this.latestNews?.map((item) => {
        return {
          ...item,
          publishDate: dayjs(item.publishDate).format("YYYY-MM-DD"),
        };
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
      .el-carousel {
        height: 278px;
        .el-carousel__container {
          width: 100%;
          height: 100%;
          .el-image {
            width: 100%;
            img {
              width: 100%;
            }
          }
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
        height: 278px;
        line-height: 278px;
        text-align: center;
        color: #ccc;
        background-color: #fff;
      }
    }
    .news-hall-left-tab {
      margin-top: 20px;
      ::v-deep .nav {
        color: #727272;
        min-height: 2.3rem;
        border-bottom: 1px solid #e3e3e3;
        div {
          margin-left: 0px;
          .name{
            margin-right: 3.125rem;
          }
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
    color: black;
    font-weight: bold;
  }
  .active::after {
    opacity: 1;
    width: 100%;
  }
}
</style>
