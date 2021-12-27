<template>
  <div class="news-container" @scroll="scrollHandler($event)">
    <div class="news-img-card" @click="goNewsDetail(firstNews)">
      <div class="news-banner">
        <img :src="firstNews.picUrl" alt="加载失败" />
      </div>
      <div class="news-content">
        <div class="news-title multi-ellipsis">{{ firstNews.title }}</div>
        <div class="news-abs multi-ellipsis">{{ firstNews.summary }}</div>
        <div class="news-user-time">
          <div class="news-user">
            <!-- <icon
              symbol
              class="icon"
              name="iconyuangong"
            /> -->
            <i class="el-icon-user-solid" style="color: #f1f5ff"></i>
            {{ firstNews.publisher }}
          </div>
          <div class="news-time">
            {{ firstNews.publishDate }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="news-card"
      v-for="item in middleListL"
      :key="item.id"
      @click="goNewsDetail(item)"
    >
      <div class="icon_title" style="width: 6px; height: 6px"></div>
      <div class="news-title multi-ellipsis">{{ item.title }}</div>
      <div class="news-abs multi-ellipsis">{{ item.summary }}</div>
      <div class="news-user-time">
        <div class="news-user">
          <!-- <icon symbol class="icon" name="iconyuangong" /> -->
          <i class="el-icon-user-solid" style="color: #f1f5ff"></i>
          {{ item.publisher }}
        </div>
        <div class="news-time">{{ item.publishDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from '@/api/home'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      firstNews: {},
      newsList: [],
      middleListL: [],
      falg: true,
      page: undefined,
      query: {
        pageSize: 6,
        pageNum: 1
      }
    }
  },
  computed: {
    ...mapState({
      id: (id) => id.permission.userInfo.id
    })
  },
  mounted() {
    this.getNewsList()
  },
  methods: {
    goNewsDetail(item) {
      if (item.linkUrl) {
        window.open(item.linkUrl, '_blank')
      } else {
        // window.location.href=`/portal/news/#/news/details?id=${item.id}`
        window.open(`/portal/news/#/news/details?id=${item.id}`, '_blank')
      }
    },
    async getNewsList() {
      const res = await getNewsList(this.query, this.id)
      if (res && res.data && res.data.length > 0) {
        res.data.forEach((item) => {
          item.publishDate = item.publishDate.split(/\s+/)[0]
        })
      }
      if (Object.keys(this.firstNews).length == 0 && res.data.length > 0) {
        this.firstNews = res.data[0]
      }
      if (res.data.length > 0 && res) {
        this.page = res.pages
        this.newsList = [...this.newsList, ...res.data]
        this.middleListL = this.newsList.slice(1)
        this.falg = false
      }
    },
    //获取数据函数
    scrollHandler(e) {
      let Scroll = e.target
      let scrollHeight = Scroll.scrollHeight - Scroll.clientHeight
      if (scrollHeight - Scroll.scrollTop < 100 && !this.falg) {
        this.falg = true
        this.query.pageNum++
        if (this.query.pageNum == this.page + 1) return
        this.getNewsList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.multi-ellipsis {
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.news-container {
  // padding-left: 20px;
  padding-right: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 520px;
  width: calc(100% + 10px);
  .news-card {
    margin-left: 20px;
    margin-bottom: 10px;
    padding-bottom: 15px;
    cursor: pointer;
    position: relative;
    border-bottom: 1px solid #f8f9fa;

    &:last-child {
      border: none;
    }
    .icon_title {
      position: absolute;
      left: -15px;
      top: 6%;
      // width: 10px;
      // height: 10px;
      z-index: 10;
      border-radius: 50%;
      background-color: #1763f7;
    }
    > .news-title {
      color: #222222;
      font-weight: bold;
      margin-bottom: 6px;
      font-size: 14px;
      opacity: 0.65;
    }
    > .news-abs {
      color: #707070;
      font-size: 12px;
      margin-bottom: 10px;
      opacity: 0.7;
    }
    > .news-user-time {
      color: #09152c;
      display: flex;
      align-items: center;
      justify-content: space-between;
      opacity: 0.65;

      > .news-user {
        > .icon {
          font-size: 16px;
          margin-right: 5px;
          color: #1660f1;
        }
      }
    }
  }
  .news-img-card {
    padding: 10px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid #f8f9fa;
    .icon {
      font-size: 16px;
      margin-right: 5px;
      color: #1660f1;
    }
    > .news-banner {
      margin-right: 14px;
      width: 350px;
      > img {
        width: 100%;
        border-radius: 6px;
      }
    }
    > .news-content {
      > .news-title {
        color: #222222;
        font-weight: bold;
        margin-bottom: 6px;
        font-size: 14px;
        width: 200px;
        opacity: 0.65;
      }
      > .news-abs {
        color: #707070;
        font-size: 12px;
        margin-bottom: 6px;
        width: 200px;
        opacity: 0.7;
      }
      > .news-user-time {
        color: #09152c;
        display: flex;
        align-items: center;
        justify-content: space-between;
        opacity: 0.65;
      }
    }
  }
}
</style>
