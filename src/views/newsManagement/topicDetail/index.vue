<template>
  <iPage>
    <div class="topicTitle">
      <div class="topicName">{{ ruleForm.name }}</div>
      <iButton @click="handleClosePre">{{
        language('NEWS_FANHUI', '返回')
      }}</iButton>
    </div>
    <iCard>
      <div class="content">
        <div class="profile">
          <div class="summary">
            {{ ruleForm.summary }}
          </div>
          <div class="outline">
            <span class="source"
              >{{ ruleForm.source }}{{ ruleForm.publishDate }}</span
            >
            <span class="good"
              ><img
                class="thumbsUpNum"
                v-show="ruleForm.isThumbsUp == 0"
                :src="likeGray"
                @click="handleLike"
              /><img
                class="thumbsUpNum"
                v-show="ruleForm.isThumbsUp == 1"
                :src="likeRed"
                @click="handleLikeRed"
              />{{ ruleForm.thumbsUpNum }}</span
            >
            <span class="look el-icon-view">{{ ruleForm.pageviews }}</span>
            <span>
              <a
                :href="`mailto:?subject=RiSE${language(
                  'NEWS_YNFXYTXW',
                  '与您分享一条新闻'
                )}：${ruleForm.name}&body=${
                  ruleForm.summary
                }%0A%0D${mailtoShare}`"
              >
                <img class="share" :src="share" />
              </a>
            </span>
          </div>
        </div>
        <el-collapse class="collapse">
          <el-collapse-item v-for="(item, index) in cardsRuleForm" :key="index">
            <template #title>
              <div style="width: 100%">
                <div style="float: left">
                  <div class="providerName" v-if="item.providerName != ''">
                    {{ item.providerName }}
                  </div>
                  <div style="display: inline-block">{{ item.title }}</div>
                </div>
                <p align="right" class="time_number">
                  <span style="margin-right: 20px">{{ item.publishDate }}</span>
                  <span style="margin-right: 20px" class="el-icon-view">{{
                    item.pageviews
                  }}</span>
                </p>
              </div>
            </template>
            <div class="text">
              {{ item.summary }}
            </div>
            <a :href="item.linkUrl" target="_blank" class="link" @click="goDetail(item,index)">{{
              item.linkUrl
            }}</a>
            <!-- <div class="link" @click="clickLink(item.linkUrl)">
              {{ item.linkUrl }}
            </div> -->
            <div class="label">
              <div
                class="top-tags-item"
                v-for="(i, index) in item.tags"
                :key="index"
              >
                {{ i.content }}
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </iCard>
  </iPage>
</template>

<script>
import { iCard, iPage, iButton } from 'rise'
import { findTopicDetailById, findNewsCards, topicLikes, increasePageViews } from '@/api/news/news'
import likeGray from '@/assets/images/news/likeGray.svg'
import likeRed from '@/assets/images/news/likeRed.svg'
import share from '@/assets/images/news/share.svg'
// import enclosure from '@/assets/images/enclosure.svg'
import dayjs from 'dayjs'

export default {
  components: {
    iPage,
    iCard,
    iButton
  },
  props: {},
  data() {
    return {
      likeGray,
      likeRed,
      share,
      ruleForm: {},
      id: '',
      cardsRuleForm: []
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  mounted() {
    this.getTableList()
  },
  computed: {
    mailtoShare() {
      return window.location.href;
    },
  },
  methods: {
    // clickLink(url) {
    //   window.open(url, '_blank')
    // },
    goDetail(val,index){
      increasePageViews({ id: val.id });
      this.cardsRuleForm[index].pageviews+=1;
    },
    handleLike() {
      const id = this.id
      topicLikes({ id }).then(() => {
        this.$message.success(
          this.language('NEWS_DIANZANCHENGGONG', '点赞成功')
        )
        this.query()
      })
    },
    handleLikeRed() {
      const id = this.id
      topicLikes({ id }).then(() => {
        this.$message.warning(this.language('NEWS_QUXIAODIANZAN', '取消点赞'))
        this.query()
      })
    },
    // 查询
    getTableList() {
      this.query()
    },
    async query() {
      const params = { id: this.id }
      const topicId = { topicId: this.id }
      const res = await findTopicDetailById(params)
      const resCards = await findNewsCards(topicId)
      console.log('res', res)
      console.log('resCards', resCards)
      this.ruleForm = { ...this.ruleForm, ...res }
      this.ruleForm = {
        ...this.ruleForm,
        publishDate: dayjs(this.ruleForm?.publishDate).format('YYYY-MM-DD')
      }
      this.cardsRuleForm = resCards
      // this.cardsRuleForm = this.cardsRuleForm?.map((item) => {
      //   return {
      //     ...item,
      //     publishDate: dayjs(item.publishDate).format('YYYY-MM-DD')
      //   }
      // })
    },
    handleClosePre() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.topicTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .topicName {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
    opacity: 1;
  }
}
.content {
  padding: 30px 20px;
  .profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .summary {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: #5f6f8f;
    opacity: 1;
  }
  .outline {
    .source {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      color: #8f8f90;
      opacity: 1;
      margin-right: 50px;
    }
    .good {
      margin-right: 20px;
      cursor: pointer;
      color: #999999;
      .thumbsUpNum {
        margin-right: 6px;
        width: 14px;
        height: 14px;
      }
    }
    .look {
      margin-right: 20px;
      color: #999999;
    }
    .share {
      width: 14px;
      height: 14px;
    }
  }
  .collapse {
    margin-top: 1rem;
    .providerName {
      min-width: 72px;
      height: 25px;
      line-height: 25px;
      background: #f8f8fa;
      border-radius: 16px;
      text-align: center;
      color: #67C23A;
      font-weight: 500;
      font-family: PingFang SC;
      font-size: 12px;
      margin-right: 20px;
      display: inline-block;
      padding: 0 20px;
    }
    .time_number {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      color: #999999;
      opacity: 1;
    }
    .text {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 30px;
      color: #000000;
      opacity: 1;
    }
    .link {
      text-decoration: underline;
    }
    .label {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .top-tags-item {
        min-width: 88px;
        height: 20px;
        line-height: 20px;
        background: #ffffff;
        border: 1px solid #d9dee5;
        opacity: 1;
        border-radius: 16px;
        text-align: center;
        font-size: 12px;
        color: #5f6f8f;
        font-family: PingFangSC-Regular;
        margin-right: 20px;
        margin-top: 12px;
        padding: 0 20px;
      }
    }
  }
}
::v-deep {
  .el-collapse {
    box-sizing: border-box;
    border: none;
    .el-collapse-item__header.is-active {
      height: 75px;
      font-size: 18px;
      font-family: PingFangSC-Semibold;
      line-height: 30px;
      color: #000000;
      opacity: 1;
      border: none;
      // transition-delay: 2s;
      // -moz-transition-delay: 2s; /* Firefox 4 */
      // -webkit-transition-delay: 2s; /* Safari 和 Chrome */
      // -o-transition-delay: 2s; /* Opera */
    }
    .el-collapse-item__arrow::before {
      content: '\E6DC';
      color: #67C23A;
      font-size: 1.5rem;
    }
    // 点击后方向
    .el-collapse-item__arrow.is-active {
      transform: rotate(-90deg);
    }
    //  默认方向
    .el-collapse-item__arrow,
    .el-tabs__nav {
      transform: rotate(90deg);
    }
    .el-collapse-item__header {
      height: 75px;
      font-size: 18px;
      font-family: PingFangSC-Semibold;
      line-height: 30px;
      color: #000000;
      opacity: 1;
      border-bottom: 1px dashed #e0e6ed;
      // transition-delay: 2s;
      // -moz-transition-delay: 2s; /* Firefox 4 */
      // -webkit-transition-delay: 2s; /* Safari 和 Chrome */
      // -o-transition-delay: 2s; /* Opera */
    }
    .el-collapse-item__wrap {
      border-bottom: 1px dashed #e0e6ed;
      .el-collapse-item__content {
        padding-bottom: 20px;
      }
    }
  }
  .el-icon-view:before {
    padding-right: 6px !important;
    color: #8f8f90;
  }
}
</style>