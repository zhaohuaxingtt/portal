<template>
  <iPage>
    <pageHeader class="title">{{ language('报表') }}</pageHeader>
    <iCard class="report">
      <div class="report-box">
        <div class="flex">
          <span>{{ language('搜索') }}</span>
          <iInput
            v-model="keyword"
            @keydown.enter.native="handleIconClick"
            class="search"
          >
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              @click="handleIconClick"
            >
            </i>
          </iInput>
          <iButton @click="handleBack">{{ language('返回') }}</iButton>
        </div>
        <el-row :gutter="20" class="cards" v-loading="loading">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="6"
            class="card-item"
            v-for="(item, index) in cardsList"
            :key="index"
            @click.native="handleClick(item)"
          >
            <div class="top">
              <div class="bell" v-if="item.isRead">
                <i class="icon el-icon-message-solid"></i>
              </div>
              <img class="img" :src="item.cover" alt="" />
              <div class="info">
                <span>{{$t('共{count}份',{count:item.reportCount||'0'})}}</span>
                <span class="new" v-if="item.isNew">NEW</span>
              </div>
            </div>
            <div class="title">{{ $getLabel(item.name,item.enName) }}</div>
          </el-col>
        </el-row>
      </div>
    </iCard>
  </iPage>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { iPage, iInput, iCard, iButton } from 'rise'
import { getSectionList } from '@/api/reportForm'
export default {
  components: {
    pageHeader,
    iPage,
    iInput,
    iCard,
    iButton
  },
  data() {
    return {
      pageParams: {
        size: 12,
        page: 0
      },
      keyword: '',
      cardsList: [],
      loading: false
    }
  },
  mounted() {
    this.getCardList()
  },
  methods: {
    async getCardList() {
      this.pageParams.keyword = ''
      if (this.keyword) {
        this.pageParams.keyword = this.keyword
      }
      try {
        this.loading = true
        await getSectionList(this.pageParams).then((res) => {
          if (res) {
            this.cardsList = res || []
          }
        })
      } finally {
        this.loading = false
      }
    },
    handleIconClick() {
      this.getCardList()
    },
    handleClick(item) {
      if (!item.categoryIds)
        return this.$message({
          type: 'warning',
          message: '该报表暂时还没有内容'
        })
      this.$router.push({
        path: '/reportForm/web/reportCardsDetail',
        query: {
          categoryIds: item.categoryIds || [],
          name: item.name,
          sectionId: item.id
        }
      })
    },
    handleBack() {
      this.keyword = ''
      this.getCardList()
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.flex-1 {
  flex: 1;
}

.report {
  height: 100%;
  overflow: hidden;
  ::v-deep > div {
    height: 100%;
  }
  ::v-deep .cardBody {
    height: 100%;
  }
}
.report-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search {
  flex: 1;
  margin: 0 10px;
}
.cards {
  flex: 1;
  padding-right: 10px;
  overflow-y: auto;

  .card-item {
    margin-bottom: 20px;

    .top {
      position: relative;
      width: 100%;
      height: 200px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
    }
    .bell {
      position: absolute;
      right: -50px;
      top: -50px;
      transform: rotate(-45deg);
      font-size: 14px;
      border: 50px solid #1763f7;
      border-top-color: transparent;
      border-right-color: transparent;
      border-bottom-color: transparent;
      .icon {
        position: absolute;
        right: 16px;
        bottom: -10px;
        transform: rotate(90deg);
        color: #fff;
      }
    }
    .img {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.08);
      }
    }
    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      padding-left: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
    }
    .new {
      display: inline-block;
      height: 100%;
      line-height: 40px;
      padding: 0 10px;
      font-weight: bold;
      background-color: rgb(253, 174, 39);
    }

    .title {
      margin-top: 10px;
      text-align: center;
      font-size: 18px;
      font-weight: normal;
      color: #333;
    }
  }
}
</style>
