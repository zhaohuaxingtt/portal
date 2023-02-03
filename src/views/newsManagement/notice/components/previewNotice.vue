<template>
  <iPage>
    <div class="returnButton">
      <iButton @click="handleClosePre">{{
        language('NEWS_FANHUI', '返回')
      }}</iButton>
    </div>
    <iCard>
      <div class="preview">
        <p class="title">{{ this.list.title }}</p>
        <p class="first">
          <span class="author">{{ this.list.publisher }}</span>
          <span class="time">{{ this.list.publishDate }}</span>
        </p>
        <p class="look el-icon-view">{{ this.list.clicks }}</p>
        <p class="paragraph" v-html="this.list.content"></p>
        <el-divider></el-divider>
        <div class="attachmentList" v-if="isAttachments">
          <span class="attachment"
            >{{ language('NEWS_FUJIAN', '附件') }}：</span
          >
          <ul>
            <li
              v-for="item in this.list.attachments"
              :key="item.id"
              class="open-link-text enclosure-item margin-bottom20"
              @click="
                downloadEnclosure(item.attachmentUrl)
              "
            >
              <img :src="enclosure" alt="" srcset="" class="img" />
              <span class="attachmentLink">{{ item.attachmentTitle }}</span>
            </li>
          </ul>
        </div>
      </div>
    </iCard>
  </iPage>
</template>

<script>
import { iCard, iPage, iButton } from 'rise'
import { getNoticeById } from '@/api/news/notice.js'
import enclosure from '@/assets/images/enclosure.svg'
import { createAnchorLink } from '@/utils/downloadUtil'

export default {
  components: {
    iPage,
    iCard,
    iButton
  },
  props: {},
  mounted() {
    this.query()
  },
  data() {
    return {
      enclosure,
      list: {}
    }
  },
  computed: {
    isAttachments() {
      return this.list.attachments?.length
    }
  },
  methods: {
    // 查询
    query() {
      const id = this.$route.query.id
      this.getNotice(id)
    },
    getNotice(id) {
      const data = { id }
      getNoticeById(data).then((res) => {
        console.log('res', res)
        this.list = res
        this.list = { ...this.list }
      })
    },
    handleClosePre() {
      this.$router.go(-1)
    },
    // 预览页-下载附件
    downloadEnclosure(url) {
        return window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.returnButton {
  flex: 1;
  text-align: right;
  margin-bottom: 20px;
}
.preview {
  .title {
    font-size: 28px;
    font-family: PingFangSC-Semibold;
    line-height: 30px;
    color: #000000;
    text-align: center;
    font-weight: bold;
    margin-top: 40px;
  }
  .first {
    text-align: center;
    margin-top: 20px;
    .author {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      line-height: 17px;
      color: #000000;
      margin-right: 10px;
    }
    .time {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      line-height: 17px;
      color: #999999; 
    }
  }
  .look {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    line-height: 17px;
    color: #999999;
    margin: 30px 0;
  }
  .paragraph {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    line-height: 24px;
    color: #000000;
    margin-top: 20px;
  }
  .attachmentList {
    display: flex;
    // align-items: center;
    .attachment {
      font-size: 16px;
      font-family: Hiragino Sans GB;
      font-weight: normal;
      // line-height: 27px;
      color: #001847;
      margin-right: 10px;
    }
    .img {
      margin-right: 8px;
      width: 15px;
      height: 16px;
    }
    .attachmentLink {
      font-size: 16px;
      font-family: Hiragino Sans GB;
      font-weight: normal;
      // line-height: 27px;
      color: #1660f1;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .el-divider--horizontal {
    border-top: 1px dashed #f7faff;
  }
}
</style>
