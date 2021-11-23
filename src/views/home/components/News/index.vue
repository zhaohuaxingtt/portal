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
            <icon
              symbol
              class="icon"
              name="iconyuangong"
            />{{ firstNews.publisher }}
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
      <div class="icon_title"></div>
      <div class="news-title multi-ellipsis">{{ item.title }}</div>
      <div class="news-abs multi-ellipsis">{{ item.summary }}</div>
      <div class="news-user-time">
        <div class="news-user">
          <icon symbol class="icon" name="iconyuangong" />
          {{ item.publisher }}
        </div>
        <div class="news-time">{{ item.publishDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
import { getNewsList } from '@/api/home'
import { mapState } from 'vuex'
export default {
  components: {
    Icon
  },
  data() {
    return {
      firstNews: {},
      newsList: [],
      middleListL:[],
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
    goNewsDetail (item) {
      if (item.linkUrl) {
        window.open(item.linkUrl, '_blank')
      } else {
        // window.location.href=`/portal/news/#/news/details?id=${item.id}`
        window.open(`/portal/news/#/news/details?id=${item.id}`, '_blank')
      }
    },
    async getNewsList() {
      const res = await getNewsList(this.query, this.id)
      if (res.data.length > 0 && res) {
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
  padding-left: 20px;
  padding-right: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 520px;
  .news-card {
    margin-bottom: 30px;
    cursor: pointer;
    position: relative;
    .icon_title {
      position: absolute;
      left: -5%;
      top: 6%;
      width: 10px;
      height: 10px;
      z-index: 10;
      border-radius: 50%;
      background-color: #1763f7;
    }
    > .news-title {
      color: #222222;
      font-weight: bold;
      margin-bottom: 6px;
      font-size: 14px;
    }
    > .news-abs {
      color: #707070;
      font-size: 12px;
      margin-bottom: 10px;
    }
    > .news-user-time {
      color: #09152c;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
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
      }
      > .news-abs {
        color: #707070;
        font-size: 12px;
        margin-bottom: 6px;
        width: 200px;
      }
      > .news-user-time {
        color: #09152c;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
